const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');
const [dbName, collection] = ['auth', 'users'];
const dao = mongoUtils.crudify(mongoClient, dbName, collection);
dao.findByUsername = async function(username) {
    const client = await mongoClient;
    return client.db(dbName).collection(collection)

        .findOne({
            username
        }, {
            projection: {
                username: 1,
                firstname: 1,
                lastname: 1,
                roles: 1,
                email: 1
            }
        });
};
module.exports = dao;
