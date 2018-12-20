const {
    encode,
    decode
} = require('../PKCS7Encoder');

describe('PKCS7Encoder TestSuite', () => {
    describe('encode TestSuite', () => {
        it('less than block size', () => {
            let plainText = new Uint8Array(12);
            plainText.fill(60);
            let encrypted = encode(plainText.byteLength)
            expect(encrypted.byteLength).toEqual(20)
        });
        it('equal block size', () => {
            let plainText = new Uint8Array(64);
            plainText.fill(60);
            let encrypted = encode(plainText.byteLength);
            expect(encrypted.byteLength).toEqual(32);
        });
    });

    describe('decode TestSuite', () => {
        it('test decode', () => {
            let encrypted = new Uint8Array(32);
            encrypted.fill(60, 0, 12);
            encrypted.fill(20, 12);
            let decrypted = decode(encrypted);
            expect(decrypted.byteLength).toEqual(12);
        });
    });
});