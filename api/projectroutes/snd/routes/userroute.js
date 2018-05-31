const express = require('express');
const userRoute = express.Router();


const models = require('../models');


const emailCheck = email => new Promise((resolve, reject) => {
  if (!email) {
    resolve({ name: 'email', result: 0, status: 'Email not specified', });
    return;
  }
  models.User.find({ email, })
    .then(([ user, ]) => {
      if (user) {
        resolve({ name: 'email', result: 0, status: 'Email in use', });
        return;
      }
      resolve({ name: 'email', result: 1, staus: 'Ok', });
    })
    .catch(err => {
      if (err) {
        logger.err(`Snd error while getting email ${err}`);
        reject({ result: -1, status: 'Internal server error', });
      }
    });
});


const usernameCheck = username => new Promise((resolve, reject) => {
  if (!username) {
    resolve({ name: 'username', result: 0, status: 'Username not specified', });
  }
  models.User.find({ username, })
    .then(([ user, ]) => {
      if (user) {
        resolve({ name: 'username', result: 0, status: 'Username in use', });
        return;
      }
      resolve({ name: 'username', result: 1, status: 'Ok' });
    })
    .catch(err => {
      if (err) {
        logger.err(`Snd error while getting username ${err}`);
        reject({ result: -1, status: 'Internal server error', });
      }
    });
});


const passwordCheck = password => new Promise((resolve) => {
  if (!password) {
    resolve({ name: 'password', result: 0, status: 'Password not specified', });
  } else if (password.length < 6) {
    resolve({ name: 'password', result: 0, status: 'Password must be at least 6 characters long', });
  } else {
    resolve({ name: 'password', result: 1, status: 'Ok', });
  }
});


userRoute.post('/user', (req, res) => {
  const inputs = { ...req.body, };
  Promise.all([
    emailCheck(inputs.email),
    usernameCheck(inputs.username),
    passwordCheck(inputs.password),
  ])
    .then((results) => {
      let failure = false;
      for (const result of results) {
        if (result.result === -1) {
          res.send({result});
          return;
        } else if (result.result === 0) {
          failure = true;
        }
        inputs[result.name] = result;
      }
      if (failure) {
        res.send(inputs);
        return;
      }
      models.User.create({ email, username, password, })
        .then(user => {
          logger.log(`Success at creating user: ${user}`);
          res.send({ result: 1, status: 'Creating user success', });
        })
        .catch(err => {
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


module.exports = userRoute;
