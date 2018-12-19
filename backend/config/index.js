// config.js
const env = process.env.NODE_ENV || 'dev';
const _ = require('lodash');

const commonConfig = {
    app: {
        name: 'Laptech portal backend',
        auth: {
            jwt: {
                secret: process.env.JWT_SECRET
            }
        }
    }
};

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 8080
    },
    db: {
        uri: process.env.DEV_DB_URI || 'mongodb+srv://admin:admin@localhost:27017/?retryWrites=true'
    }
};
const test = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT) || 8080
    },
    db: {
        uri: process.env.TEST_DB_URI || 'mongodb+srv://admin:admin@localhost:27017/?retryWrites=true'
    }
};

const config = {
    dev,
    test
};

module.exports = _.merge(commonConfig, config[env]);
