require('dotenv').config();
const fs = require('fs');

const parseDate = require('./parsedate');


const notProduction = process.env.NODE_ENV !== 'production';


const { isArray, } = Array;
const { stringify, } = JSON;
const { log, warn, } = console;
const getTimeNow = () => parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss');


const createFileAndGetUrl = (path, fileName) => {
  if (path.length === 0) {
    throw new Error('Logger requires a logfilepath to be specified');
  } else if (!/[\.\/]|[a-z]?/gi.test(path)) {
    throw new Error(`Not a valid filepath: ${path}`);
  }

  return path.split('/')
  .reduce((str, folder) => {
    str += `/${folder}`;
    try {
      fs.mkdirSync(str);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw new Error(`Unable to create logfile folder ${str}`);
      }
    }
    return str;
  }) + fileName;
};


let replacerIteration = 0;
const replacer = (key, value) =>
  (++replacerIteration && replacerIteration < 3 && value)
  || (typeof value !== 'object' && value)
  || (isArray(value) && '[Array]')
  || '{Object}';


class Logger {

  constructor () {
    const options = {
      flags: 'a',
      encoding: 'utf8',
    };
    this.infoStream = fs.createWriteStream(createFileAndGetUrl(process.env.INFOFILE_PATH, 'info.txt'), options);
    this.debugStream = fs.createWriteStream(createFileAndGetUrl(process.env.DEBUGFILE_PATH, 'debug.txt'), options);
    this.errorStream = fs.createWriteStream(createFileAndGetUrl(process.env.ERRORFILE_PATH, 'error.txt'), options);
    const content = `\nLog    ${getTimeNow()} - Application initiated, running in ${process.env.NODE_ENV}\n`;
    this.infoStream.write(content);
    notProduction && log(content.replace(/[^\n\S]/gi, ' '));
  }

  info (msg, ...other) {
    replacerIteration = 0;
    const content = `Log    ${getTimeNow()} - ${msg}\n${!other.length ? '' : `${stringify(other, replacer, 2)}\n`}`;
    this.infoStream.write(content);
    notProduction && log(content.replace(/\s/gi, ' '));
  }

  warn (msg, ...other) {
    replacerIteration = 0;
    const content = `Warn   ${getTimeNow()} - ${msg}\n${!other.length ? '' : `${stringify(other, replacer, 2)}\n`}`;
    this.infoStream.write(content);
    this.debugStream.write(content);
    notProduction && warn(content.replace(/\s/gi, ' '));
  }

  err (msg, ...other) {
    replacerIteration = 0;
    const content = `Err    ${getTimeNow()} - ${msg}\n${!other.length ? '' : `${stringify(other, replacer, 2)}\n`}`;
    this.infoStream.write(content);
    this.errorStream.write(content);
    throw new Error(content);
  }

}


const logger = new Logger;


module.exports = logger;
