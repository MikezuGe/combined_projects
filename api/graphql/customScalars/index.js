require('path');


module.exports = (() => {
  const { logger, } = require('../../../utility');
  const { GraphQLScalarType, } = require('graphql');
  const { readdirSync, } = require('fs');
  return readdirSync(__dirname)
    .filter(fileName => fileName !== 'index.js')
    .reduce((scalars, fileName) => {
      const scalar = require(`./${fileName}`);
      if (scalars[scalar.name]) {
        logger.warn(`Graphql custom scalar ${scalar.name} is defined more than once`);
        return scalars;
      }
      scalars = { ...scalars, [scalar.name]: new GraphQLScalarType(scalar), };
      return scalars;
    }, {});
})();
