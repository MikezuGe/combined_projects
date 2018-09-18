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

config.PORT = 3000;
if (isProduction) {
  // Production
} else {
  // Development
}


module.exports = config;
