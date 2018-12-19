const jwt = require('jsonwebtoken');
module.exports = (secret) => {
    function sign(payload) {
        return jwt.sign(payload, secret);
    }

    function decode(token) {
        return jwt.decode(token);
    }

    function verify(token) {
        return jwt.verify(token);
    }
    return {
        sign,
        verify,
        decode
    };
};
