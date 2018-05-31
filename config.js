const fs = require('fs');


const config = {};

const isProduction = process.env.NODE_ENV !== 'development';
config.isProduction = isProduction;

config.logfilePath = './';
config.logfileName = 'log.txt';

const connectionStrings = JSON.parse(fs.readFileSync('./connectionstrings.json', { encoding: 'utf-8', }));
config.sndConnectionString = connectionStrings.sndConnectionString;
config.yourbudgetConnectionString = connectionStrings.yourbudgetConnectionString;

if (isProduction) {
  // Production
  config.PORT = 443;
  config.httpsCert = fs.readFileSync('./sslcert/fullchain.pem');
  config.httpsKey = fs.readFileSync('./sslcert/privkey.pem');
} else {
  // Development
  config.PORT = 80;
}


module.exports = config;
