module.exports = (secret, key) => (req, res, next) => {
    const jwt = require('../jwt')(secret);
    const token = req.headers.authorization;
    if (token) {
        req[key] = jwt.decode(token.split(/BEARER\s/i)[1])[key];
    }
    next();
};
