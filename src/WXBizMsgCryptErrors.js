// https://work.weixin.qq.com/api/doc#90000/90138/90307
// 加解密库的返回码一览表
const Errors = {
    OK: 0,
    ValidateSignature_Error: -40001,
    ParseXml_Error: -40002,
    ComputeSignature_Error: -40003,
    IllegalAesKey: -40004,
    ValidateCorpid_Error: -40005,
    EncryptAES_Error: -40006,
    DecryptAES_Error: -40007,
    IllegalBuffer: -40008,
    EncodeBase64_Error: -40009,
    DecodeBase64_Error: -40010,
    GenReturnXml_Error: -40011
};

module.exports.Errors = Errors;

module.exports.ErrorDescriptions = {
    [Errors.OK]: "成功",
    [Errors.ValidateSignature_Error]: "签名校验错误",
    [Errors.ParseXml_Error]: "XML解析错误",
    [Errors.ComputeSignature_Error]: "计算签名错误",
    [Errors.IllegalAesKey]: "非法AES秘钥",
    [Errors.ValidateCorpid_Error]: "Corpid校验错误",
    [Errors.EncryptAES_Error]: "AES加密错误",
    [Errors.DecryptAES_Error]: "AES解密错误",
    [Errors.IllegalBuffer]: "非法缓冲区",
    [Errors.EncodeBase64_Error]: "Base64加密错误",
    [Errors.DecodeBase64_Error]: "Base64解密错误",
    [Errors.GenReturnXml_Error]: "生成XML错误"
};
