const express = require('express');
const userRoute = express.Router();


const models = require('../models');


const apiPath = '/api/snd/user';


userRoute.post(apiPath, (req, res) => {
  console.log(req.body);
  res.send('post');
});

userRoute.delete(`${apiPath}/:id`, (req, res) => {
  console.log('delete');
  res.send(['delete']);
});

userRoute.get(`${apiPath}/:id`, (req, res) => {
  models.User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Snd get error: ${err}`);
    });
});


module.exports = userRoute;
