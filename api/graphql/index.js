const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema, } = require('graphql');
const { GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLID } = require('graphql/type');

const graphqlRoute = express.Router();
const { Funds, } = require('../mongoose/models/yourbudget');


const BudgetType = new GraphQLObjectType({
  name: 'budget',
  description: 'Incomes and expenses',
  fields: () => ({
    _id: {
      type 
    },
    name: {
      type: GraphQLString,
      description: 'The source or destination of income or expense',
    },
    amount: {
      type: GraphQLInt,
      description: 'The amount of income or expense, always positive',
    },
    isIncome: {
      type: GraphQLBoolean,
      description: 'Indicates if the entry is income or expense',
    },
    date: {
      type: GraphQLString,
      description: 'Date the income or expense has happened'
    },
  }),
});


graphqlRoute.use('/', expressGraphql({
  //schema: schema,
  graphiql: true,
  rootValue: root,
}));


module.exports = graphqlRoute;
