module.exports = {
    sha1Encode: (str) => {
        var sha1 = require('sha1');
        return sha1(str);
    },
    generateRandomToken: (length) => {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var token = '';
        for (var i = 0; i < length; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    }
}