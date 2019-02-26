require('dotenv').config();
const mongoose = require('mongoose');

const { logger, } = require('../../utility');


let getConnectionString = null;
if (process.env.NODE_ENV === 'production') {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  getConnectionString = dbName => `${connectionString}/${dbName}`;
} else {
  const MongodbMemoryServer = require('mongodb-memory-server');
  const mongodbServer = new MongodbMemoryServer.default({});
  getConnectionString = async dbName => await mongodbServer.getConnectionString(dbName);
}


const connections = {};


module.exports = dbName => {
  if (!dbName) {
    logger.err(new Error('dbName not defined for getting mongodb connection'));
  }
  if (connections[dbName]) return connections[dbName];
  const db = mongoose.createConnection();
  connections[dbName] = db;
  db.once('open', () => logger.info(`Connected to ${dbName} at 127.0.0.1`));
  db.on('error', err => logger.err('Unable to create connection', err));
  (async () => {
    try {
      const connectionString = await getConnectionString(dbName);
      db.openUri(connectionString, { useNewUrlParser: true });
    } catch (err) {
      logger.err('Unable to open connection', err);
    }
  })();
  return db;
};
