/**
 * https://en.wikipedia.org/wiki/Endianness
 * @author Evan<redwolf0302@gmail.com>
 * @version 1.0
 */

/**
 * Network Byte Order to Host Byte Order
 * @param {Array} x 需要转换成HBO的字节数组
 */
function ntohl(x) {
    let sourceNumber = 0;
    (x || []).forEach(e => {
        sourceNumber <<= 8;
        sourceNumber |= e & 0xff;
    });
    return sourceNumber;
}

/**
 * Host Byte Order to Network Byte Order
 * @param {int} x 需要转换成NBO的整数
 */
function htonl(x) {
    let orderBytes = new ArrayBuffer(4);
    orderBytes[3] = x & 0xff;
    orderBytes[2] = (x >> 8) & 0xff;
    orderBytes[1] = (x >> 16) & 0xff;
    orderBytes[0] = (x >> 24) & 0xff;
    return orderBytes;
}

module.exports = {
    ntohl,
    htonl
};
