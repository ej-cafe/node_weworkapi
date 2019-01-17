/**
 * 参考文档《加解密方案说明》https://work.weixin.qq.com/api/doc#90000/90139/90968
 * 企业微信消息加解密处理库
 * @author Evan<redwolf0302@gmail.com>
 * @version 1.0
 */
const Buffer = require("buffer").Buffer;
const jsSHA = require("jssha");
const base64 = require("base64-js");
const xmldoc = require("xmldoc");
const WXBizMsgCryptError = require("./WXBizMsgCryptError");
const { getRandomText } = require("./RandomGenerator");
const PKCS7Encoder = require("./PKCS7Encoder");
const AesUtils = require("./AesUtils");
const NetworkByteOrder = require("./NetworkByteOrder");

/**
 * SHA指纹
 * @param {*} token
 * @param {*} timestamp
 * @param {*} nonce
 * @param {*} encrypt
 */
function sha1(token, timestamp, nonce, encrypt) {
    let sha1 = new jsSHA("SHA-1", "TEXT");
    sha1.update([token, timestamp, nonce, encrypt].sort().join(""));
    return sha1.getHash("HEX");
}

/**
 * 消息密文解密函数
 * @param {*} aesKey
 * @param {*} text
 * @param {*} receiveId
 */
function decrypt(aesKey, text, receiveId) {
    // 解密密文和去除PKCS7的padding字节
    let plainText = PKCS7Encoder.decode(
        AesUtils.decrypt(aesKey, [...Buffer.from(text, "base64")])
    );
    // 还原消息长度值
    let msgLen = NetworkByteOrder.ntohl([...plainText.slice(16, 20)]);
    // 取得XML内容
    let xmlContent = Buffer.from([
        ...plainText.slice(20, 20 + msgLen)
    ]).toString("utf8");
    // 取得receiveID内容
    let fromReceiveId = Buffer.from([...plainText.slice(20 + msgLen)]).toString(
        "utf8"
    );
    if (fromReceiveId !== receiveId) {
        throw WXBizMsgCryptError.ValidateCorpid_Error();
    }
    return xmlContent;
}

/**
 * 消息明文加密函数
 * @param {*} aesKey
 * @param {*} random
 * @param {*} text
 * @param {*} receiveId
 */
function encrypt(aesKey, random, text, receiveId) {
    let randomBytes = Buffer.from(random);
    let NBO = Buffer.from(NetworkByteOrder.htonl(text.length));
    let textBytes = Buffer.from(text);
    let receiveIdBytes = Buffer.from(receiveId);
    let plainText = Buffer.concat([
        randomBytes,
        NBO,
        textBytes,
        receiveIdBytes
    ]);
    plainText = Buffer.concat([
        plainText,
        PKCS7Encoder.encode(plainText.byteLength)
    ]);
    return base64.fromByteArray(AesUtils.encrypt(aesKey, plainText));
}

/**
 * 企业微信消息加解密处理库
 * @param {string} token 令牌
 * @param {string} encodingAesKey 已加密的AES秘钥
 * @param {string} receiveId 企业应用的回调，表示corpid，第三方事件的回调，表示suiteid
 * @returns {verifyUrl,decryptMessage,encryptMessage}
 */
function WXBizMsgCrypt(token, encodingAesKey, receiveId) {
    let aesKey = base64.toByteArray(encodingAesKey + "=");
    /**
     * 验证URL函数
     * @param {string} msgSignature 从接收消息的URL中获取的msg_signature参数
     * @param {string} timestamp 从接收消息的URL中获取的timestamp参数
     * @param {string} nonce 从接收消息的URL中获取的nonce参数
     * @param {string} echostr 从接收消息的URL中获取的echostr参数。注意，此参数必须是urldecode后的值
     * @returns {string} 解密后的明文消息内容，用于回包。注意，必须原样返回，不要做加引号或其它处理
     */
    function verifyUrl(msgSignature, timestamp, nonce, echostr) {
        // 计算内容数字签名
        let signature = sha1(token, timestamp, nonce, echostr);
        if (msgSignature !== signature) {
            // 数字签名不一致，可能传输过程中内容发生篡改
            throw WXBizMsgCryptError.ValidateSignature_Error();
        }
        let replyEchoStr = decrypt(aesKey, echostr, receiveId);
        return replyEchoStr;
    }
    /**
     * 解密函数
     * @param {string} msgSignature 从接收消息的URL中获取的msg_signature参数
     * @param {string} timestamp 从接收消息的URL中获取的timestamp参数
     * @param {string} nonce 从接收消息的URL中获取的nonce参数
     * @param {string} postData 从接收消息的URL中获取的整个post数据
     * @returns {string} 用于返回解密后的msg，以xml组织，参见普通消息格式和事件消息格式
     */
    function decryptMessage(msgSignature, timestamp, nonce, postData) {
        // 解析XML，获取Encrypt标签内容
        let document = new xmldoc.XmlDocument(postData);
        let encryptedContent = document.childNamed("Encrypt").val;
        // 计算内容数字签名
        let signature = sha1(token, timestamp, nonce, encryptedContent);
        if (msgSignature !== signature) {
            // 数字签名不一致，可能传输过程中内容发生篡改
            throw WXBizMsgCryptError.ValidateSignature_Error();
        }
        // 解密内容
        return decrypt(aesKey, encryptedContent, receiveId);
    }
    /**
     * 加密函数
     * @param {string} replyMessage 返回的消息体原文
     * @param {string} timestamp 时间戳，调用方生成
     * @param {string} nonce 随机数，调用方生成
     * @returns {string} 用于返回的密文，以xml组织，参见被动回复消息格式
     */
    function encryptMessage(replyMessage, timestamp, nonce) {
        let random = getRandomText(16);
        let encrypted = encrypt(aesKey, random, replyMessage, receiveId);
        let signature = sha1(token, timestamp, nonce, encrypted);
        return `<xml>
<Encrypt><![CDATA[${encrypted}]]></Encrypt>
<MsgSignature><![CDATA[${signature}]]></MsgSignature>
<TimeStamp>${timestamp}</TimeStamp>
<Nonce><![CDATA[${nonce}]]></Nonce>
</xml>`;
    }
    return {
        verifyUrl,
        decryptMessage,
        encryptMessage
    };
}

module.exports = WXBizMsgCrypt;
