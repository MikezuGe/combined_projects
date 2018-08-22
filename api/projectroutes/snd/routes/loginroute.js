const express = require('express');

const models = require('../models');
const { logger, } = require('../../../../utility');

const loginRoute = express.Router();


loginRoute.post('/login', (req, res) => {
  models.User.find({ $or: [
    { username: req.body.username, },
    { password: req.body.password, },
  ], }).then(([ user, ]) => {
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
  logger.log(`Snd user logout (not implemented): ${data}`);
  res.send('Unable to log out, not implemented');
  /*
  models.User.find({}).then(data => {
    res.send(data);
  })
  .catch(err => {
    logger.warn(`Snd get error: ${err}`);
  });
  */
});


module.exports = loginRoute;
