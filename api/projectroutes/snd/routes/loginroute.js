const express = require('express');
const loginRoute = express.Router();


const models = require('../models');


const apiPath = '/api/snd';


loginRoute.post(`${apiPath}/login`, (req, res) => {
  models.User.find({ username: req.body.username, password: req.body.password, })
    .then(([ user, ]) => {
      if (user) {
        res.send({ result: 1, status: 'OK' });
        return;
      }
      res.send({ result: 0, status: 'Wrong username or password', });
    })
    .catch(err => {
      console.error(`Login failure: ${err}`);
      res.send({ result: -1, status: 'Internal server error', });
    });
});


loginRoute.get(`${apiPath}/logout`, (req, res) => {
  models.User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Snd get error: ${err}`);
    });
});


module.exports = loginRoute;
