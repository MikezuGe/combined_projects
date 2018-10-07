require('path');
const { readdirSync, } = require('fs');

const { logger, } = require('../../../../utility');


module.exports = (() => {
  const reservedResolverNames = [];
  return readdirSync(__dirname)
    .filter(fileName => fileName !== 'index.js')
    .map(fileName => {
      const resolvers = require(`./${fileName}`);
      for (const resolverName of Object.keys(resolvers)) {
        if (reservedResolverNames.includes(resolverName)) {
          logger.warn(`Resolver name ${resolverName} was defined more than once. Skipping resolver.`);
        }
        reservedResolverNames.push(resolverName);
      }
      return resolvers;
    }).reduce((total, current) => ({ ...total, ...current, }), {});
})();
