/**
 * 参考文档：https://en.wikipedia.org/wiki/Padding_(cryptography)
 * 用于PKCS7模式padding
 * @author Evan<redwolf0302@gmail.com>
 * @version 1.0
 */
const Buffer = require('buffer').Buffer;
//https://work.weixin.qq.com/api/doc#90000/90139/90968
//AES采用CBC模式，数据采用PKCS#7填充至32字节的倍数；
const BLOCK_SIZE = 32;
/**
 * 添加PKCS7格式的padding
 * @param {*} count 
 * @returns 补位以后的Buffer结果
 */
function encode(count) {
    let amountToPad = BLOCK_SIZE - (count % BLOCK_SIZE);
    if (amountToPad === 0) {
        amountToPad = BLOCK_SIZE;
    }
    let padByte = amountToPad & 0xFF;
    let paddings = new Uint8Array(amountToPad);
    for (let i = 0; i < amountToPad; i++) {
        paddings[i] = padByte;
    }
    return paddings;
}

module.exports.encode = encode;

/**
 * 去除PKCS7格式的padding
 * @param {ArrayBuffer|Array|Buffer} decrypted 
 * @returns 无填充数据
 */
function decode(decrypted) {
    if (!decrypted) {
        return decrypted;
    }
    if (!Array.isArray(decrypted) && !(decrypted.buffer)) {
        throw new Error('参数必须是数组');
    }
    let pad = decrypted.slice(decrypted.byteLength - 1);
    if (pad < 1 || pad > BLOCK_SIZE) {
        pad = 0;
    }
    return decrypted.slice(0, decrypted.byteLength - pad);
}

module.exports.decode = decode;