const fs = require('fs');


const isProduction = process.env.NODE_ENV === 'production';
const config = {
  isProduction: isProduction,
  PORT: 3000,
  logfilePath: './',
  logfileName: 'log.txt',
  mongodb: {
    address: isProduction ? '127.0.0.1' : 'kontioweb.fi',
    port: '27017',
    connectionStrings: {},
  },
};


try {
  const { address, port, connectionStrings, } = config.mongodb;
  JSON.parse(fs.readFileSync('./connectionstrings.json', { encoding: 'utf-8', }))
    .forEach(({ db, user, secret, }) => {
      connectionStrings[db] = `mongodb://${user}:${secret}@${address}:${port}/${db}`;
    });
} catch (err) {
  console.error(`Unable to get connectionstrings: ${err}`);
}


module.exports = config;
