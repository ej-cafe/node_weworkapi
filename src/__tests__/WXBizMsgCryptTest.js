const jsSHA = require("jssha");
const WXBizMsgCrypt = require("../WXBizMsgCrypt");


describe("WXBizMsgCrypt TestSuite", () => {
    describe("verifyUrl TestCase", () => {
        it("Test WXBizMsgCrypt", () => {
            const corpId = 'wx5823bf96d3bd56c7';
            const token = 'QDG6eK';
            const encodingAesKey = 'jWmYm7qr5nMoAUwZRjGtBxmz3KA1tkAj3ykkR6q2B2C';
            const {
                msg_signature,
                timestamp,
                nonce,
                echostr
            } = {
                msg_signature: '477715d11cdb4164915debcba66cb864d751f3e6',
                timestamp: '1409659813',
                nonce: '1372623149',
                echostr: 'RypEvHKD8QQKFhvQ6QleEB4J58tiPdvo+rtK1I9qca6aM/wvqnLSV5zEPeusUiX5L5X/0lWfrf0QADHHhGd3QczcdCUpj911L3vg3W/sYYvuJTs3TUUkSUXxaccAS0qhxchrRYt66wiSpGLYL42aM6A8dTT+6k4aSknmPj48kzJs8qLjvd4Xgpue06DOdnLxAUHzM6+kDZ+HMZfJYuR+LtwGc2hgf5gsijff0ekUNXZiqATP7PF5mZxZ3Izoun1s4zG4LUMnvw2r+KqCKIw+3IQH03v+BCA9nMELNqbSf6tiWSrXJB3LAVGUcallcrw8V2t9EL4EhzJWrQUax5wLVMNS0+rUPA3k22Ncx4XXZS9o0MBH27Bo6BpNelZpS+/uh9KsNlY6bHCmJU9p8g7m3fVKn28H3KDYA5Pl/T8Z1ptDAVe0lXdQ2YoyyH2uyPIGHBZZIs2pDBS8R07+qN+E7Q=='
            }
            let wxBizMsgCrypt = WXBizMsgCrypt(token, encodingAesKey, corpId);
            let content = wxBizMsgCrypt.verifyUrl(msg_signature, timestamp, nonce, echostr);
            expect(content).toMatchSnapshot();
        });
    });
});