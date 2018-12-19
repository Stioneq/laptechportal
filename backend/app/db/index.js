const client = require('mongodb').MongoClient;
const Logger = require('mongodb').Logger;
const config = require('@laptechportal/config');
module.exports = client.connect(config.db.uri, {
    useNewUrlParser: true
});
