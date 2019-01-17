const jsSHA = require("jssha");
const WXBizMsgCrypt = require("../WXBizMsgCrypt");
jest.mock("../RandomGenerator");

describe("WXBizMsgCrypt TestSuite", () => {
    describe("verifyUrl TestCase", () => {
        it("Test WXBizMsgCrypt", () => {
            const corpId = "wx5823bf96d3bd56c7";
            const token = "QDG6eK";
            const encodingAesKey =
                "jWmYm7qr5nMoAUwZRjGtBxmz3KA1tkAj3ykkR6q2B2C";
            const { msg_signature, timestamp, nonce, echostr } = {
                msg_signature: "477715d11cdb4164915debcba66cb864d751f3e6",
                timestamp: "1409659813",
                nonce: "1372623149",
                echostr:
                    "RypEvHKD8QQKFhvQ6QleEB4J58tiPdvo+rtK1I9qca6aM/wvqnLSV5zEPeusUiX5L5X/0lWfrf0QADHHhGd3QczcdCUpj911L3vg3W/sYYvuJTs3TUUkSUXxaccAS0qhxchrRYt66wiSpGLYL42aM6A8dTT+6k4aSknmPj48kzJs8qLjvd4Xgpue06DOdnLxAUHzM6+kDZ+HMZfJYuR+LtwGc2hgf5gsijff0ekUNXZiqATP7PF5mZxZ3Izoun1s4zG4LUMnvw2r+KqCKIw+3IQH03v+BCA9nMELNqbSf6tiWSrXJB3LAVGUcallcrw8V2t9EL4EhzJWrQUax5wLVMNS0+rUPA3k22Ncx4XXZS9o0MBH27Bo6BpNelZpS+/uh9KsNlY6bHCmJU9p8g7m3fVKn28H3KDYA5Pl/T8Z1ptDAVe0lXdQ2YoyyH2uyPIGHBZZIs2pDBS8R07+qN+E7Q=="
            };
            let wxBizMsgCrypt = WXBizMsgCrypt(token, encodingAesKey, corpId);
            let content = wxBizMsgCrypt.verifyUrl(
                msg_signature,
                timestamp,
                nonce,
                echostr
            );
            expect(content).toMatchSnapshot();
        });
    });
    describe("decryptMessage TestCase", () => {
        it("Test decryptMessage", async () => {
            let corpId = "wx5823bf96d3bd56c7",
                token = "QDG6eK",
                encodingAesKey = "jWmYm7qr5nMoAUwZRjGtBxmz3KA1tkAj3ykkR6q2B2C",
                postData = `<xml>
            <ToUserName><![CDATA[wx5823bf96d3bd56c7]]></ToUserName><Encrypt><![CDATA[RypEvHKD8QQKFhvQ6QleEB4J58tiPdvo+rtK1I9qca6aM/wvqnLSV5zEPeusUiX5L5X/0lWfrf0QADHHhGd3QczcdCUpj911L3vg3W/sYYvuJTs3TUUkSUXxaccAS0qhxchrRYt66wiSpGLYL42aM6A8dTT+6k4aSknmPj48kzJs8qLjvd4Xgpue06DOdnLxAUHzM6+kDZ+HMZfJYuR+LtwGc2hgf5gsijff0ekUNXZiqATP7PF5mZxZ3Izoun1s4zG4LUMnvw2r+KqCKIw+3IQH03v+BCA9nMELNqbSf6tiWSrXJB3LAVGUcallcrw8V2t9EL4EhzJWrQUax5wLVMNS0+rUPA3k22Ncx4XXZS9o0MBH27Bo6BpNelZpS+/uh9KsNlY6bHCmJU9p8g7m3fVKn28H3KDYA5Pl/T8Z1ptDAVe0lXdQ2YoyyH2uyPIGHBZZIs2pDBS8R07+qN+E7Q==]]></Encrypt>
            <AgentID><![CDATA[218]]></AgentID>
            </xml>`,
                signature = "477715d11cdb4164915debcba66cb864d751f3e6",
                timestamps = "1409659813",
                nonce = "1372623149";
            let wxBizMsgCrypt = WXBizMsgCrypt(token, encodingAesKey, corpId);
            let message = await wxBizMsgCrypt.decryptMessage(
                signature,
                timestamps,
                nonce,
                postData
            );
            expect(message).toMatchSnapshot();
        });
    });
    describe("encryptMessage TestCase", () => {
        it("Test encryptMessage", () => {
            let corpId = "ww1436e0e65a779aee";
            let token = "hJqcu3uJ9Tn2gXPmxx2w9kkCkCE2EPYo";
            let encodingAesKey = "6qkdMrq68nTKduznJYO1A37W2oEgpkMUvkttRToqhUt";
            let signature = "0c3914025cb4b4d68103f6bfc8db550f79dcf48e";
            let timestamp = "1476422779";
            let nonce = "1597212914";
            let replyMsg =
                "<xml><ToUserName>ww1436e0e65a779aee</ToUserName><FromUserName>ChenJiaShun</FromUserName><CreateTime>1476422779</CreateTime><MsgType>text</MsgType><Content>你好</Content><MsgId>1456453720</MsgId><AgentID>1000002</AgentID></xml>";
            debugger;
            let wxBizMsgCrypt = WXBizMsgCrypt(token, encodingAesKey, corpId);
            let message = wxBizMsgCrypt.encryptMessage(
                replyMsg,
                timestamp,
                nonce
            );
            expect(message).toMatchSnapshot();
        });
    });
});
