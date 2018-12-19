const client = require('mongodb').MongoClient;
const Logger = require('mongodb').Logger;
const config = require('../../config');
// Logger.setLevel('debug');
module.exports = client.connect(config.db.uri, {
    useNewUrlParser: true
});
