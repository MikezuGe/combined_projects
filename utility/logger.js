require('dotenv').config();
const fs = require('fs');

const parseDate = require('./parsedate');


const notProduction = process.env.NODE_ENV !== 'production';


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
}

const appendFile = (file, content) => {
  fs.appendFile(file, content, err => {
    if (err) throw new Error(`Failed to write to logfile ${err} ${content}`);
  });
}


class Logger {

  constructor () {
    this.debugfile = createFileAndGetUrl(process.env.DEBUGFILE_PATH, 'debug_log.txt')
    this.logfile = createFileAndGetUrl(process.env.LOGFILE_PATH, 'log.txt');
  }

  log (msg, ...other) {
    const content = `Log\t${getTimeNow()} - ${msg}\n${other || !other.length ? '' : `${JSON.stringify(other)}\n`}`;
    appendFile(this.logfile, content);
    notProduction && console.log(content.replace(/\s/gi, ' '));
  }

  warn (msg, ...other) {
    const time = getTimeNow();
    const logMsg = `Warn\t${time} - Error logged into debugfile\n}`;
    const content = `Warn\t${time} - ${msg}\n${other || !other.length ? '' : `${JSON.stringify(other)}\n`}`;
    appendFile(this.logfile, logMsg);
    appendFile(this.debugfile, content);
    console.warn(content);
  }

  err (msg, ...other) {
    const content = `Err\t${getTimeNow()} - ${msg}\n${other || !other.length ? '' : `${JSON.stringify(other)}\n`}`;
    appendFile(this.debugfile, content);
    throw new Error(content);
  }

}


const logger = new Logger;


module.exports = logger;
