/**
 * 参考文档《加解密方案说明》https://work.weixin.qq.com/api/doc#90000/90139/90968
 * 企业微信消息加解密处理库
 * @author Evan<redwolf0302@gmail.com>
 * @version 1.0
 */
const Buffer = require("buffer").Buffer;
const jsSHA = require("jssha");
const aesjs = require("aes-js");
const xml2js = require("xml2js");
const base64 = require('base64-js');
const WXBizMsgCryptError = require("./WXBizMsgCryptError");
const getRandomStr = require('./Random');
const {
    decode: PKCS7_decode,
    encode: PKCS7_encode
} = require("./PKCS7Encoder");

const {
    decode: aes_decode,
    encode: aes_encode
} = require("./AesUtils");

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
 * 消息密文解密
 * @param {*} aesKey 
 * @param {*} text 
 * @param {*} receiveId 
 */
function decrypt(aesKey, text, receiveId) {
    // 解密密文
    const plainText = aes_decode(aesKey, [...Buffer.from(text, "base64")]);
    // 去除PKCS7的padding字节
    plainText = PKCS7_decode(plainText);
    // 还原消息长度值
    let msgLen = NetworkByteOrder.ntohl([...plainText.slice(16, 20)]);
    let xmlContent = Buffer.from(plainText.slice(20, 20 + msgLen)).toString("utf8");
    let fromReceiveId = Buffer.from(plainText.slice(20 + msgLen)).toString("utf8");
    if (fromReceiveId !== receiveId) {
        throw WXBizMsgCryptError.ValidateCorpid_Error;
    }
    return xmlContent;
}

/**
 * 企业微信消息加解密处理库
 ```javascript
 const wxBizMsgCrypt = WXBizMsgCrypt('your token', 'your encodingAesKey', 'your corpId');
 wxBizMsgCrypt.verifyUrl()
 wxBizMsgCrypt.decryptMessage()
 wxBizMsgCrypt.encryptMessage()
 ```
 * @param {string} token 令牌
 * @param {string} encodingAesKey 已加密的AES秘钥
 * @param {string} receiveId 企业应用的回调，表示corpid，第三方事件的回调，表示suiteid
 */
function WXBizMsgCrypt(token, encodingAesKey, receiveId) {
    let aesKey = Buffer.from(encodingAesKey + "=", "base64");
    /**
     * 验证URL函数
     * @param {string} msgSignature 从接收消息的URL中获取的msg_signature参数
     * @param {string} timestamp 从接收消息的URL中获取的timestamp参数
     * @param {string} nonce 从接收消息的URL中获取的nonce参数
     * @param {string} echostr 从接收消息的URL中获取的echostr参数。注意，此参数必须是urldecode后的值
     * @returns {string} 解密后的明文消息内容，用于回包。注意，必须原样返回，不要做加引号或其它处理
     */
    function verifyUrl(msgSignature, timestamp, nonce, echostr) {
        let signature = sha1(token, timestamp, nonce, echostr);
        if (msgSignature !== signature) {
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

    }
    /**
     * 加密函数
     * @param {string} replyMessage 返回的消息体原文
     * @param {string} timestamp 时间戳，调用方生成
     * @param {string} nonce 随机数，调用方生成
     * @returns {string} 用于返回的密文，以xml组织，参见被动回复消息格式
     */
    function encryptMessage(replyMessage, timestamp, nonce) {

    }
    return {
        verifyUrl,
        decryptMessage,
        encryptMessage
    }
}

module.exports = WXBizMsgCrypt;