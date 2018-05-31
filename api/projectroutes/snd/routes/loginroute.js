const express = require('express');
const loginRoute = express.Router();


const models = require('../models');
const { logger, } = require('../../../../utility');


loginRoute.post('/login', (req, res) => {
  models.User.find({ username: req.body.username, password: req.body.password, })
    .then(([ user, ]) => {
      if (user) {
        res.send({ result: 1, status: 'OK' });
        return;
      }
      res.send({ result: 0, status: 'Wrong username or password', });
    })
    .catch(err => {
      logger.warn(`Snd user login failure: ${err}`);
      res.send({ result: -1, status: 'Internal server error', });
    });
});


loginRoute.get('/logout', (req, res) => {
  models.User.find({})
    .then(data => {
      logger.log(`Snd user logout (not implemented): ${data}`);
      res.send(data);
    })
    .catch(err => {
      logger.warn(`Snd get error: ${err}`);
    });
});


module.exports = loginRoute;
