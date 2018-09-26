const { isProduction, logfilePath, logfileName } = require('../config');
const fs = require('fs');

const parseDate = require('./parsedate');


class ProductionLogger {

  constructor () {
    this.logfile = '';

    if (logfilePath.length === 0) {
      throw new Error('Logger requires a logfilepath to be specified');
    } else if (!/[\.\/]|[a-z]?/gi.test(logfilePath)) {
      throw new Error(`Not a valid filepath: ${logfilePath}`);
    }

    this.logfile = logfilePath
      .split('/')
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
      }) + '/' + logfileName;
    const toConsole = `\nProgram initiated at ${parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss')}\n`;
    try {
      fs.appendFileSync(this.logfile, toConsole);
      console.log(toConsole);
    } catch (err) {
      if (err) {
        throw new Error(`Failed to write to logfile' ${err}`);
      }
    }
  }

  log (msg, ...other) {
    const time = parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss');
    const content = `Log\t${time} - ${msg}\n`;
    fs.appendFile(this.logfile.replace('/', ''), content, err => {
      if (err) {
        throw new Error(`Failed to write to logfile ${err} ${content}`);
      }
    });
  }

  warn (msg, ...other) {
    const time = parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss');
    const content = `Warn\t${time} - ${msg}\n`;
    fs.appendFile(this.logfile, content, err => {
      if (err) {
        throw new Error(`Failed to write to logfile ${err} ${content}`);
      }
    });
  }

  err (msg, ...other) {
    const time = parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss');
    const toConsole = `Err - ${time} - ${msg}`;
    const content = `Err\t${time} - ${msg}\n`;
    fs.appendFile(this.logfile, content, err => {
      if (err) {
        throw new Error(`Failed to write to logfile ${err} ${content}`);
      }
    });
    throw new Error(toConsole);
  }

}


class DevelopmentLogger {

  constructor () {
    this.logfile = '';

    if (logfilePath.length === 0) {
      throw new Error('Logger requires a logfilepath to be specified');
    } else if (!/[\.\/]|[a-z]?/gi.test(logfilePath)) {
      throw new Error(`Not a valid filepath: ${logfilePath}`);
    }

    this.logfile = logfilePath
      .split('/')
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
      }) + '/' + logfileName;
    const toConsole = `\nProgram initiated at ${parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss')}\n`;
    try {
      fs.appendFileSync(this.logfile, toConsole);
      console.log(toConsole);
    } catch (err) {
      if (err) {
        throw new Error(`Failed to write to logfile' ${err}`);
      }
    }
  }

  log (msg, ...other) {
    const time = parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss');
    const toConsole = `Log - ${time} - ${msg}`;
    const content = `Log\t${time} - ${msg}\n`;
    fs.appendFile(this.logfile.replace('/', ''), content, err => {
      if (err) {
        throw new Error(`Failed to write to logfile ${err} ${content}`);
      }
    });
    console.log(toConsole);
  }

  warn (msg, ...other) {
    const time = parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss');
    const toConsole = `Warn - ${time} - ${msg}`;
    const content = `Warn\t${time} - ${msg}\n`;
    fs.appendFile(this.logfile, content, err => {
      if (err) {
        throw new Error(`Failed to write to logfile ${err} ${content}`);
      }
    });
    console.warn(toConsole);
  }

  err (msg, ...other) {
    const time = parseDate(new Date(), 'DD.MM.YYYY hh:mm:ss');
    const toConsole = `Err - ${time} - ${msg}`;
    const content = `Err\t${time} - ${msg}\n`;
    fs.appendFile(this.logfile, content, err => {
      if (err) {
        throw new Error(`Failed to write to logfile ${err} ${content}`);
      }
    });
    throw new Error(toConsole);
  }

}


const logger = isProduction ? new ProductionLogger() : new DevelopmentLogger;


module.exports = logger;
