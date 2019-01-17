/**
 * AES工具类
 * https://en.wikipedia.org/wiki/Advanced_Encryption_Standard
 * @author Evan<redwolf0302@gmail.com>
 * @version 1.0
 */
const aesjs = require("aes-js");
/**
 * 明文加密
 * @param {Array} aesKey
 * @param {string|Array} text
 * @returns {Array} 密文字节数组
 */
function encrypt(aesKey, text) {
    const aesCbc = new aesjs.ModeOfOperation.cbc(
        [...aesKey],
        [...aesKey.slice(0, 16)]
    );
    return aesCbc.encrypt(text);
}

/**
 * 密文解密
 * @param {Array} aesKey AES秘钥字节数组
 * @param {string|Array} text
 * @returns {Array} 明文字节数组
 */
function decrypt(aesKey, text) {
    const aesCbc = new aesjs.ModeOfOperation.cbc(
        [...aesKey],
        [...aesKey.slice(0, 16)]
    );
    return aesCbc.decrypt(text);
}

module.exports = {
    encrypt,
    decrypt
};
