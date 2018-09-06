const mongoose = require('mongoose');
const config = require('../../../config');
const { logger, } = require('../../../utility');


const db = mongoose.createConnection(config.yourbudgetConnectionString, { useNewUrlParser: true });
db.on('error', err => {
  logger.err(`Unable to connect to yourbudget ${err}`);
});
db.once('open', () => {
  logger.log('Connected to yourbudget database on kontioweb.fi');
});


module.exports = db;
