const express = require('express');
const authRoute = express.Router();

const logger = require('../../../../utility/logger');

const models = require('../models');


authRoute.post('/user', (req, res) => {
  models.User.findOne({ email: req.body.email, username: req.body.username, })
    .then(user => {
      if (user) {
        const error = {};
        if (user.email === email) { error.email = 'Email in use'; }
        if (user.username === username) { error.username = 'Username in use'; }
        if (error.email || error.username) {
          res.send(error);
          return;
        }
        return models.User.create(req.body);
      }
    })
    .then(() => { res.send('OK'); })
    .catch(err => { logger.warn(err); res.status(500).send('Failed to create user'); });
});

authRoute.post('/login', (req, res) => {
  models.User.findOne({ username: req.body.username, })
    .then(user => {
      if (!user) {
        res.send('No user found');
      } else if (user.password !== req.body.password) {
        res.send('Incorrect password');
      } else {
        return models.Auth.create({ userId: user._id, sessionIp: req.connection.remoteAddress, });
      }
    })
    .then(auth => { res.send({ sessionId: auth._id, }); })
    .catch(err => { logger.warn(err); res.status(500).send('Failed to login'); });
  
});

authRoute.post('/logout', (req, res) => {
  models.Auth.findOneAndDelete(req.body)
    .then(() => { res.send('OK'); })
    .catch(err => { logger.warn(err); res.status(500).send(`Failed to logout: ${err}`); });
});


module.exports = authRoute;
