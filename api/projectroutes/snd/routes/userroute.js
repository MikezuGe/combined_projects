const express = require('express');
const userRoute = express.Router();


const models = require('../models');


const apiPath = '/api/snd/user/:id';


userRoute.post(apiPath, (req, res) => {
  console.log('post');
  res.send(['post']);
});

userRoute.delete(apiPath, (req, res) => {
  console.log('delete');
  res.send(['delete']);
});

userRoute.get(apiPath, (req, res) => {
  models.User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(`Snd get error: ${err}`);
    });
});


module.exports = userRoute;
