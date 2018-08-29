const express = require('express');
const expressGraphql = require('express-graphql');
/*
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');
*/

const { buildSchema, } = require('graphql')

const { Fund, } = require('../mongoose/models/yourbudget');

const graphqlRoute = express.Router();


const schema = buildSchema(`
  type Fund {
    _id: ID
    name: String
    amount: Float
    date: String
    isIncome: Boolean
  }

  type Query {
    fund(_id: ID!): Fund
    funds: [Fund]
  }
  

  input FundInput {
    name: String!
    amount: Float!
    date: String!
    isIncome: Boolean!
  }
  
  input FundUpdate {
    name: String
    amount: Float
    date: String
    isIncome: Boolean
  }

  type Mutation {
    createFund(input: FundInput!): Fund
    updateFund(_id: ID!, input: FundUpdate!): Fund
    removeFund(_id: ID!): Fund
  }
`);


const Query = {
  fund: async args => await Fund.findOne(args),
  funds: async () => await Fund.find(),
}


const Mutations = {
  createFund: async ({ input, }) => await Fund.create(input),
  updateFund: async ({ _id, input, }) => await Fund.findByIdAndUpdate({ _id, }, input),
  removeFund: async args => await Fund.findByIdAndRemove(args),
}


const rootValue = {
  ...Query,
  ...Mutations,
};


graphqlRoute.use('/', expressGraphql({
  schema,
  rootValue,
  graphiql: true,
}));


module.exports = graphqlRoute;



/*
mutation createFund($input: FundInput!) {
  createFund(input: $input) {
    name,
    amount,
    date,
    isIncome,
  }
}
{
  "input": {
    "name": "Nakki",
    "amount": 5,
    "date": "2018-08-29T13:59:19.576Z",
    "isIncome": false
  }
}
query {
  funds {
    _id
    name,
    amount,
    date,
    isIncome
  }
}
mutation deleteFund($_id: ID!) {
  deleteFund(_id: $_id) {
    _id,
    name,
    amount,
    isIncome,
    date
  }
}
{
  "_id": "5b86a800a4839b2998d8303d"
}
*/