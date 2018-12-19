require('dotenv').config();
const app = require('./app');
const config = require('@laptechportal/config');

const server = app.listen(config.app.port, config.app.address, () => {
    console.log(`${config.app.name} started on ${server.address().port} port`);
});


process.on('uncaughtException', (err) => {
    console.error(err);
    process.exit(1);
});
