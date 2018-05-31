const express = require('express');
const budgetRoute = express.Router();


const models = require('../models');


budgetRoute.post('/budget', (req, res) => {
  models.Budget.create(req.body)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send('Failed to save budget data'); });
  
});

budgetRoute.delete('/budget', (req, res) => {
  console.log('delete');
  res.send(['delete']);
});

budgetRoute.get('/budget', (req, res) => {
  models.Budget.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Budget get error: ${err}`);
    });
});


module.exports = budgetRoute;
