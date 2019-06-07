require('dotenv').config();
require('path');
const express = require('express');
const expressGraphql = require('express-graphql');
const { readFileSync, } = require('fs');
const glob = require('glob');
const { buildSchema, GraphQLScalarType, } = require('graphql');

const { logger, } = require('../../utility');


const customScalars = (() => {
  return glob.sync(`${__dirname}/customScalars/*.js`).reduce((customScalars, fileName) => {
    const scalar = require(fileName);
    customScalars[scalar.name] ?
      logger.warn(`Graphql custom scalar ${scalar.name} is defined more than once`) :
      customScalars = { ...customScalars, [scalar.name]: new GraphQLScalarType(scalar), };
    return customScalars;
  }, {});
})();


const types = (() => {
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

  glob.sync(`${__dirname}/*/types/*.graphqls`).forEach(fileName => {
    const nextLineRegex = /^.+$/gm;
    const file = readFileSync(fileName, 'utf-8');
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


const resolvers = (() => {
  const reservedResolverNames = [];
  return glob.sync(`${__dirname}/*/resolvers/*.js`).reduce((total, fileName) => {
    const resolvers = require(fileName);
    for (const resolverName of Object.keys(resolvers)) {
      if (reservedResolverNames.includes(resolverName)) {
        logger.warn(`Resolver name ${resolverName} was defined more than once. Skipping resolver.`);
      }
      reservedResolverNames.push(resolverName);
    }
    return { ...total, ...resolvers, };
  }, {});
})();


const graphqlRoute = express.Router();

graphqlRoute.use('/', expressGraphql((req, res) => ({
  schema: buildSchema(types),
  rootValue: { ...resolvers, ...customScalars, },
  context: { req, res, },
  graphiql: process.env.NODE_ENV !== 'production',
  formatError: err => {
    logger.warn(err);
    return err.message;
  },
})));


module.exports = graphqlRoute;
