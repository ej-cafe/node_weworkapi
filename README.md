# 企业微信 API（Node 版本）

参考企业微信[加解密方案说明](https://work.weixin.qq.com/api/doc#90000/90139/90968)

## 使用方式

npm 安装 node_weworkapi

```shell
npm install node_weworkapi
```

yarn 安装 node_weworkapi

```shell
yarn add node_weworkapi
```

调用 verifyUrl 函数

```javascript
const WXBizMsgCrypt = require("node_weworkapi");

//您的企业ID
const corpId = "wx5823bf96d3bd56c7";
//接收消息的Token
const token = "QDG6eK";
//接收消息的私钥
const encodingAesKey = "jWmYm7qr5nMoAUwZRjGtBxmz3KA1tkAj3ykkR6q2B2C";
const wxBizMsgCrypt = WXBizMsgCrypt(token, encodingAesKey, corpId);

let msg_signature = "477715d11cdb4164915debcba66cb864d751f3e6";
let timestamp = "1409659813";
let nonce = "1372623149";
let echostr =
    "RypEvHKD8QQKFhvQ6QleEB4J58tiPdvo+rtK1I9qca6aM/wvqnLSV5zEPeusUiX5L5X/0lWfrf0QADHHhGd3QczcdCUpj911L3vg3W/sYYvuJTs3TUUkSUXxaccAS0qhxchrRYt66wiSpGLYL42aM6A8dTT+6k4aSknmPj48kzJs8qLjvd4Xgpue06DOdnLxAUHzM6+kDZ+HMZfJYuR+LtwGc2hgf5gsijff0ekUNXZiqATP7PF5mZxZ3Izoun1s4zG4LUMnvw2r+KqCKIw+3IQH03v+BCA9nMELNqbSf6tiWSrXJB3LAVGUcallcrw8V2t9EL4EhzJWrQUax5wLVMNS0+rUPA3k22Ncx4XXZS9o0MBH27Bo6BpNelZpS+/uh9KsNlY6bHCmJU9p8g7m3fVKn28H3KDYA5Pl/T8Z1ptDAVe0lXdQ2YoyyH2uyPIGHBZZIs2pDBS8R07+qN+E7Q==";

let result = wxBizMsgCrypt.verifyUrl(msg_signature, timestamp, nonce, echostr);
```

解密消息

```javascript
let postData =
    "<xml><ToUserName><![CDATA[wx5823bf96d3bd56c7]]></ToUserName><Encrypt><![CDATA[RypEvHKD8QQKFhvQ6QleEB4J58tiPdvo+rtK1I9qca6aM/wvqnLSV5zEPeusUiX5L5X/0lWfrf0QADHHhGd3QczcdCUpj911L3vg3W/sYYvuJTs3TUUkSUXxaccAS0qhxchrRYt66wiSpGLYL42aM6A8dTT+6k4aSknmPj48kzJs8qLjvd4Xgpue06DOdnLxAUHzM6+kDZ+HMZfJYuR+LtwGc2hgf5gsijff0ekUNXZiqATP7PF5mZxZ3Izoun1s4zG4LUMnvw2r+KqCKIw+3IQH03v+BCA9nMELNqbSf6tiWSrXJB3LAVGUcallcrw8V2t9EL4EhzJWrQUax5wLVMNS0+rUPA3k22Ncx4XXZS9o0MBH27Bo6BpNelZpS+/uh9KsNlY6bHCmJU9p8g7m3fVKn28H3KDYA5Pl/T8Z1ptDAVe0lXdQ2YoyyH2uyPIGHBZZIs2pDBS8R07+qN+E7Q==]]></Encrypt><AgentID><![CDATA[218]]></AgentID></xml>";
let signature = "477715d11cdb4164915debcba66cb864d751f3e6";
let timestamps = "1409659813";
let nonce = "1372623149";

let result = wxBizMsgCrypt.decryptMessage(
    signature,
    timestamps,
    nonce,
    postData
);
```

加密消息

```javascript
let replyMsg =
    "<xml><ToUserName>ww1436e0e65a779aee</ToUserName><FromUserName>ChenJiaShun</FromUserName><CreateTime>1476422779</CreateTime><MsgType>text</MsgType><Content>你好</Content><MsgId>1456453720</MsgId><AgentID>1000002</AgentID></xml>";
let timestamp = "1476422779";
let nonce = "1597212914";

let message = wxBizMsgCrypt.encryptMessage(replyMsg, timestamp, nonce);
```

## API

### WXBizMsgCrypt(token, encodingAesKey, receiveId)

**企业微信消息加解密处理库**

_@param_ `token` {string} — 令牌

_@param_ `encodingAesKey` {string} — 已加密的 AES 秘钥

_@param_ `receiveId` {string} — 企业应用的回调，表示 corpid，第三方事件的回调，表示 suiteid

### verifyUrl(msgSignature, timestamp, nonce, echostr)

**验证 URL 函数**

_@param_ `msgSignature` {string} — 从接收消息的 URL 中获取的 msg_signature 参数

_@param_ `timestamp` {string} — 从接收消息的 URL 中获取的 timestamp 参数

_@param_ `nonce` {string} — 从接收消息的 URL 中获取的 nonce 参数

_@param_ `echostr` {string} — 从接收消息的 URL 中获取的 echostr 参数。注意，此参数必须是 urldecode 后的值

_@returns_ {string} — 解密后的明文消息内容，用于回包。注意，必须原样返回，不要做加引号或其它处理

### decryptMessage(msgSignature, timestamp, nonce, postData)

解密函数

_@param_ `msgSignature` {string} — 从接收消息的 URL 中获取的 msg_signature 参数

_@param_ `timestamp` {string} — 从接收消息的 URL 中获取的 timestamp 参数

_@param_ `nonce` {string} — 从接收消息的 URL 中获取的 nonce 参数

_@param_ `postData` {string} — 从接收消息的 URL 中获取的整个 post 数据

_@returns_ {string} — 用于返回解密后的 msg，以 xml 组织，参见普通消息格式和事件消息格式

### encryptMessage(replyMessage, timestamp, nonce)

加密函数

_@param_ `replyMessage` {string} — 返回的消息体原文

_@param_ `timestamp` {string} — 时间戳，调用方生成

_@param_ `nonce` {string} — 随机数，调用方生成

_@returns_ {string} — 用于返回的密文，以 xml 组织，参见被动回复消息格式
