const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');
module.exports = mongoUtils.crudify(mongoClient, 'app', 'todo');