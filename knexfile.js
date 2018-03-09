const config = require('config');
const driver = config.get('database.driver');

module.exports = config.get('database.' + driver);
