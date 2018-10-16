require('path');


module.exports = (() => {
  const { readdirSync, } = require('fs');
  const { logger, } = require('../../../../utility');
  const reservedResolverNames = [];
  return readdirSync(__dirname)
    .filter(fileName => fileName !== 'index.js')
    .reduce((total, fileName) => {
      const resolvers = require(`./${fileName}`);
      for (const resolverName of Object.keys(resolvers)) {
        if (reservedResolverNames.includes(resolverName)) {
          logger.warn(`Resolver name ${resolverName} was defined more than once. Skipping resolver.`);
        }
        reservedResolverNames.push(resolverName);
      }
      return { ...total, ...resolvers, };
    }, {});
})();
