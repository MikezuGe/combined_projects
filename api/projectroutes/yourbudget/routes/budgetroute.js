const express = require('express');
const budgetRoute = express.Router();

const logger = require('../../../../utility/logger');

const models = require('../models');


budgetRoute.post('/budget', (req, res) => {
  models.Budget.create(req.body)
    .then(data => { res.send(data); })
    .catch(err => { logger.warn(err); res.status(500).send(`Failed to save budget data: ${err}`); });
  
});

budgetRoute.delete('/budget', (req, res) => {
  models.Budget.findOneAndDelete(req.body)
    .then(data => { res.send(data); })
    .catch(err => { logger.warn(err); res.status(500).send(`Failed to delete budget data: ${err}`); });
});

budgetRoute.get('/budget', (req, res) => {
  models.Budget.find()
    .then(data => { res.send(data); })
    .catch(err => { logger.warn(err); res.status(500).send(`Failed to get budget data: ${err}`); });
});


module.exports = budgetRoute;
