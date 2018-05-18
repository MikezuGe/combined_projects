const express = require('express');
const budgetRoute = express.Router();


const models = require('../models');


const apiPath = '/api/yourbudget/budget'


budgetRoute.post(apiPath, (req, res) => {
  console.log('post');
  res.send(['post']);
});

budgetRoute.delete(apiPath, (req, res) => {
  console.log('delete');
  res.send(['delete']);
});

budgetRoute.get(apiPath, (req, res) => {
  models.Budget.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Budget get error: ${err}`);
    });
});


module.exports = budgetRoute;
