const {
    Errors,
    ErrorDescriptions
} = require('./WXBizMsgCryptErrors');
/**
 * 加解密错误封装
 * @param {*} code 错误码
 */
function WXBizMsgCryptError(code) {
    this.code = code;
    this.message = ErrorDescriptions[code];
}
/**
 * 错误码
 */
WXBizMsgCryptError.prototype.code = Errors.OK;
/**
 * 错误描述
 */
WXBizMsgCryptError.prototype.message = ErrorDescriptions[Errors.OK];
/**
 * 格式化错误信息
 */
WXBizMsgCryptError.prototype.toString = function () {
    return `${this.message}(${this.code})`;
}

WXBizMsgCryptError.OK = function () {
    return new WXBizMsgCryptError(Errors.OK)
}
WXBizMsgCryptError.ValidateSignature_Error = function () {
    return new WXBizMsgCryptError(Errors.ValidateSignature_Error)
}
WXBizMsgCryptError.ParseXml_Error = function () {
    return new WXBizMsgCryptError(Errors.ParseXml_Error)
}
WXBizMsgCryptError.ComputeSignature_Error = function () {
    return new WXBizMsgCryptError(Errors.ComputeSignature_Error)
}
WXBizMsgCryptError.IllegalAesKey = function () {
    return new WXBizMsgCryptError(Errors.IllegalAesKey)
}
WXBizMsgCryptError.ValidateCorpid_Error = function () {
    return new WXBizMsgCryptError(Errors.ValidateCorpid_Error)
}
WXBizMsgCryptError.EncryptAES_Error = function () {
    return new WXBizMsgCryptError(Errors.EncryptAES_Error)
}
WXBizMsgCryptError.DecryptAES_Error = function () {
    return new WXBizMsgCryptError(Errors.DecryptAES_Error)
}
WXBizMsgCryptError.IllegalBuffer = function () {
    return new WXBizMsgCryptError(Errors.IllegalBuffer)
}
WXBizMsgCryptError.EncodeBase64_Error = function () {
    return new WXBizMsgCryptError(Errors.EncodeBase64_Error)
}
WXBizMsgCryptError.DecodeBase64_Error = function () {
    return new WXBizMsgCryptError(Errors.DecodeBase64_Error)
}
WXBizMsgCryptError.GenReturnXml_Error = function () {
    return new WXBizMsgCryptError(Errors.GenReturnXml_Error)
}
module.exports = WXBizMsgCryptError;