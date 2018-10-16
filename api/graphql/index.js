require('path');
const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema, } = require('graphql');

const { logger, } = require('../../utility');
const { types, resolvers, } = require('./yourbudget');
const customScalars = require('./customScalars');


const graphqlRoute = express.Router();


graphqlRoute.use('/', expressGraphql((req, res) => ({
  schema: buildSchema(types),
  rootValue: { ...resolvers, ...customScalars, },
  context: { req, res, },
  graphiql: true,
  formatError: err => logger.warn(err),
})));


module.exports = graphqlRoute;
