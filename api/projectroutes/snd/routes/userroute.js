const express = require('express');

const models = require('../models');


const userRoute = express.Router();


userRoute.post('/user', (req, res) => {
  Promise.all([
    emailCheck(req.body.email),
    usernameCheck(req.body.username),
    passwordCheck(req.body.password),
  ]).then(results => {
    let failure = false;
    for (const result of results) {
      if (result.result === 0) {
        errors[result.name] = result;
      }
    }
    if (Object.keys(errors)) {
      return res.send(errors);
    }
  }).then(() => {
    models.User.create({ email, username, password, }).then(user => {
      logger.log(`Successfully created snd user: ${user}`);
      res.send({ result: 1, status: 'Creating user success', });
    }).catch(err => {
      logger.warn(`Snd error while creating user`);
      res.status(500).send({ result: -1, status: 'Internal server error', });
    });
  })
  .catch(err => {
    logger.warn(err);
    res.send(err);
  });
});


userRoute.delete('user/:id', (req, res) => {
  console.log('delete');
  res.send(['delete']);
});


userRoute.get('user/:id', (req, res) => {
  models.User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      logger.warn(`Snd error while getting user data: ${err}`);
      res.status(500).send('Internal server error');
    });
});


const emailCheck = email => new Promise((resolve, reject) => {
  if (!email) {
    resolve({ name: 'email', result: 0, status: 'Email not specified', });
    return;
  }
  models.User.findOne({ email, }).then(user => {
    if (user) {
      return resolve({ name: 'email', result: 0, status: 'Email in use', });
    }
    resolve({ name: 'email', result: 1, staus: 'Ok', });
  }).catch(err => {
    logger.err(`Snd error while getting email ${err}`);
    reject({ result: -1, status: 'Internal server error', });
  });
});


const usernameCheck = username => new Promise((resolve, reject) => {
  if (!username) {
    resolve({ name: 'username', result: 0, status: 'Username not specified', });
  }
  models.User.findOne({ username, }).then(user => {
    if (user) {
      return resolve({ name: 'username', result: 0, status: 'Username in use', });
    }
    resolve({ name: 'username', result: 1, status: 'Ok' });
  }).catch(err => {
    logger.err(`Snd error while getting username ${err}`);
    reject({ result: -1, status: 'Internal server error', });
  });
});


const passwordCheck = password => new Promise(resolve => {
  if (!password) {
    resolve({ name: 'password', result: 0, status: 'Password not specified', });
  } else if (password.length < 6) {
    resolve({ name: 'password', result: 0, status: 'Password must be at least 6 characters long', });
  } else {
    resolve({ name: 'password', result: 1, status: 'Ok', });
  }
});


module.exports = userRoute;
