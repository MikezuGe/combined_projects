require('path');
const { logger, } = require('../../../../utility');


module.exports = (() => {
  const { readdirSync, readFileSync, } = require('fs');
  const types = {};
  const inputs = {};
  const queries = {};
  const mutations = {};
  const nameRegExp = /(\w+)(?:.+)/gi;
  const checkType = (typeLine, block) => {
    const [ type, name ] = typeLine.split(' ');
    if (type === 'input') {
      if (inputs[name]) {
        logger.err(new Error(`Type ${name} is used more than once.`));
      }
      inputs[name] = block;
    } else if (type === 'type') {
      if (name === 'Query') {
        let match = null;
        while ((match = nameRegExp.exec(block))) {
          if (queries[match[1]]) {
            logger.err(new Error(`Query ${name} is used more than once`));
          }
          queries[match[1]] = match[0];
        }
      } else if (name === 'Mutation') {
        let match = null;
        while ((match = nameRegExp.exec(block))) {
          if (mutations[match[1]]) {
            logger.err(new Error(`Query ${name} is used more than once`));
          }
          mutations[match[1]] = match[0];
        }
      } else {
        if (types[name]) {
          logger.err(new Error(`Type ${name} is used more than once.`));
        }
        types[name] = block;
      }
    }
  }
  let start = null;
  let end = null;
  const regExp = /\w+ *\w+ *\{|\}/gi;
  readdirSync(__dirname)
    .filter(fileName => /^.+\.graphqls$/.test(fileName))
    .map(fileName => readFileSync(`${__dirname}/${fileName}`, 'utf-8'))
    .forEach(file => {
      while ((result = regExp.exec(file))) {
        if (start === null) {
          start = result.index;
          end = start + result[0].length;
        } else {
          checkType(file.slice(start, end), file.slice(end, result.index));
          start = null;
          end = null;
        }
      }
    });
  return [
    `${Object.entries(types).map(([ name, block ]) => `type ${name} {${block}}\n\n`).join('')}`,
    `${Object.entries(inputs).map(([ name, block ]) => `input ${name} {${block}}\n\n`).join('')}`,
    `type Query {\n${Object.values(queries).map(query => `  ${query}\n`).join('')}}\n\n`,
    `type Mutation {\n${Object.values(mutations).map(mutation => `  ${mutation}\n`).join('')}}\n\n`,
  ].join('').replace(/\r/g, ' ');
})();
