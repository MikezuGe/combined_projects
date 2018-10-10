require('path');
const fs = require('fs');

const { logger, } = require('../utility');


logger.log('Inserting mock data into development database');


module.exports = fs.readdirSync(__dirname)
  .filter(file =>
    fs.lstatSync(`${__dirname}/${file}`).isDirectory()
    || /^.+\.js$/.test(file))
  .map(file => require(`./${file}`));
