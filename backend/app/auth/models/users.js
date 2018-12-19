const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');
const [dbName, collection] = ['auth', 'users'];
const dao = mongoUtils.crudify(mongoClient, dbName, collection);
dao.findByUsername = async function (username) {
    const client = await mongoClient;
    return client.db(dbName).collection(collection)
        .findOne({
            username
        });
}
module.exports = dao;