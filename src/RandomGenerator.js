function getRandomText(max) {
    let base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomStr = '';
    for (let i = 0; i < 16; i++) {
        randomStr += base.charAt(Math.floor(Math.random() * Math.floor(max)));
    }
    return randomStr;
}

module.exports = {
    getRandomText
};