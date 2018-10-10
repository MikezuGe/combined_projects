require('path');
const fs = require('fs');


module.exports = fs.readdirSync(__dirname)
  .filter(file =>
    fs.lstatSync(`${__dirname}/${file}`).isDirectory()
    || /^.+\.js$/.test(file))
  .map(file => require(`./${file}`));
