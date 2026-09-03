module.exports = {
    sha1Encode: (str) => {
        var sha1 = require('sha1');
        return sha1(str);
    }
}