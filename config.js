const fs = require('fs');


const config = {};

const isProduction = process.env.NODE_ENV === 'production';
config.isProduction = isProduction;

config.logfilePath = './';
config.logfileName = 'log.txt';

try {
  const connectionStrings = JSON.parse(fs.readFileSync('./connectionstrings.json', { encoding: 'utf-8', }));
  for (const [ key, value, ] of Object.entries(connectionStrings)) {
    config[key] = value;
  }
} catch (err) {
  console.error(`Unable to get connectionstrings: ${err}`);
}

if (isProduction) {
  // Production
  config.PORT = 443;
  try {
    config.httpsCert = fs.readFileSync(fs.readlinkSync('./sslcert/fullchain.pem'));
    config.httpsKey = fs.readFileSync(fs.readlinkSync('./sslcert/privkey.pem'));
  } catch (err) {
    console.error(`Unable to get certificate files: ${err}`);
  }
} else {
  // Development
  config.PORT = 3000;
}


module.exports = config;
