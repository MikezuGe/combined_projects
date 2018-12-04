require('path');


module.exports = (() => {
  const { logger, } = require('../../../../utility');
  const { readdirSync, readFileSync, } = require('fs');

  const scalars = [];
  const types = {};
  const inputs = {};
  const queries = [];
  const mutations = [];
  let currentType = null;

  const functionNameRegex = /[a-z]+/i;
  const parseLine = line => {
    if (currentType) {
      if (line.trim() === '}') {
        currentType = null
        return;
      }
      const { type, name, } = currentType;
      if (type === 'type') {
        if (name === 'Query') {
          const queryName = line.match(functionNameRegex)[0];
          if (queries.includes(queryName)) {
            logger.err(`Graphql query ${queryName} is defined more than once`);
          }
          queries.push(line);
        } else if (name === 'Mutation') {
          const mutationName = line.match(functionNameRegex)[0];
          if (mutations.includes(mutationName)) {
            logger.err(`Graphql query ${mutationName} is defined more than once`);
          }
          mutations.push(line);
        } else {
          types[name].push(line);
        }
      } else if (type === 'input') {
        inputs[name].push(line);
      }
    } else {
      const [ s0, s1, ] = line.trim().split(' ');
      currentType = { type: s0, name: s1, };
      if (s0 === 'scalar') {
        currentType = null;
        if (!scalars.includes(s1)) {
          scalars.push(s1);
        }
      } else if (s0 === 'type') {
        if (s1 !== 'Query' && s1 !== 'Mutation') {
          if (types[s1]) {
            logger.err(`Graphql type ${s1} is defined more than once`);
          }
          types[s1] = [];
        }
      } else if (s0 === 'input') {
        if (inputs[s1]) {
          logger.err(`Graphql type ${s1} is defined more than once`);
        }
        inputs[s1] = [];
      } else {
        logger.err(`Unknown graphql type ${s0}`);
      }
    }
  };

  const gqlFileRegex = /\.graphqls$/;
  readdirSync(__dirname)
    .filter(fileName => gqlFileRegex.test(fileName))
    .forEach(fileName => {
      const nextLineRegex = /^.+$/gm;
      const file = readFileSync(`${__dirname}/${fileName}`, 'utf-8');
      let line = null;
      while ((line = nextLineRegex.exec(file))) {
        parseLine(line[0]);
      }
    });
    
  return [
    ...scalars.map(scalar => `scalar ${scalar}`),
    ...Object.entries(types).map(([ key, values, ]) => `type ${key} {\n${values.join('\n')}\n}`),
    ...Object.entries(inputs).map(([ key, values, ]) => `input ${key} {\n${values.join('\n')}\n}`),
    `type Query {\n${queries.join('\n')}\n}`,
    `type Mutation {\n${mutations.join('\n')}\n}`,
  ].join('\n\n');
})();
