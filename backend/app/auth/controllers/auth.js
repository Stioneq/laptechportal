const UserModel = require('../models/users.js');
const logger = require('../../logging/winston');
const config = require('@laptechportal/config');
const jwt = require('../../../utils/jwt')(config.app.auth.jwt.secret);
const bcrypt = require('bcryptjs');
const {
    Roles
} = require('../constants/roles');

exports.login = (req, res, next) => {
    const _user = req.body;
    UserModel.findByUsername(_user.username).then((user) => {
        if (user) {
            bcrypt.hash(_user.password, 11).then((hash) => {
                bcrypt.compare(user.password, hash);
            }).then(() => {
                res.send(jwt.sign({
                    username: user.username,
                    roles: user.roles || []
                }));
            });
        } else {
            res.status(401).send('Unauthorized');
        }
    }).catch((err) => {
        next(err);
    });
};

exports.register = (req, res, next) => {
    const user = req.body;
    bcrypt.hash(user.password, 11).then((hash) => {
        user.password = hash;
        user.roles = [Roles.USER];
        UserModel.insertOne(user).then(() => {
            res.status(201).send('Created');
        }).catch((err) => {
            next(err);
        });
    }).catch((err) => {
        console.error(err);
    });
};
