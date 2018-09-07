require('path');
const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema, } = require('graphql');

const { types, resolvers, } = require('./yourbudget');


const graphqlRoute = express.Router();


graphqlRoute.use('/', expressGraphql((req, res) => ({
  schema: buildSchema(types),
  rootValue: resolvers,
  context: { req, res, },
  graphiql: true,
})));


module.exports = graphqlRoute;
