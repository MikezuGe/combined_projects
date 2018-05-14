const express = require('express');
const budgetRoute = express.Router();


const models = require('../models');


budgetRoute.post('/api/yourbudget/budget', (req, res) => {
  console.log('post');
  res.send(['post']);
});

budgetRoute.delete('/api/yourbudget/budget', (req, res) => {
  console.log('delete');
  res.send(['delete']);
});

budgetRoute.get('/api/yourbudget/budget', (req, res) => {
  models.Budget.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Budget get error: ${err}`);
    });
});


module.exports = budgetRoute;