const express = require('express');
const budgetRoute = express.Router();


const mongoose = require('mongoose');


budgetRoute

  .post('/api/yourbudget/budget', (req, res) => {
    console.log('post');
    res.send(['post']);
  })

  .delete('/api/yourbudget/budget', (req, res) => {
    console.log('delete');
    res.send(['delete']);
  })

  .get('/api/yourbudget/budget', (req, res) => {
    mongoose.models.BudgetModel.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('Budget get error: ', err);
      })
  });


module.exports = budgetRoute;