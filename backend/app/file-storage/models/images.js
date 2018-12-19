const mongoUtils = require('../../../utils/mongo');
const mongoClient = require('../../db');

const dbName = 'auth';
const gridfs = mongoUtils.gridfs(mongoClient, dbName);

async function findImageByName(res, name) {
    await gridfs.downloadFile(res, name);
}
async function uploadImage(inputStream, name) {
    await gridfs.uploadFile(inputStream, name);
}
module.exports = {
    findImageByName,
    uploadImage
};