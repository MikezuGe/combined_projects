const express = require('express');
const router = express.Router();


const glibRouter = require('./projectroutes/glib');
const imagesRouter = require('./projectroutes/images');
const sndRouter = require('./projectroutes/snd');
const yourbudgetRouter = require('./projectroutes/yourbudget');


router
  .use('/glib', glibRouter)
  .use('/images', imagesRouter)
  .use('/snd', sndRouter)
  .use('/yourbudget', yourbudgetRouter);


module.exports = router;
