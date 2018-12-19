const UserModel = require('../models/users');
const logger = require('../../logging/winston');

exports.get = async function(req, res) {
    const user = await UserModel.findByUsername(req.user.username);
    res.json(user);
};
