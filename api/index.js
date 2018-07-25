const express = require('express');
const router = express.Router();


const glibRouter = require('./projectroutes/glib');
const imagesRouter = require('./projectroutes/images');
const sndRouter = require('./projectroutes/snd');
const yourbudgetRouter = require('./projectroutes/yourbudget');
const testRouter = require('./projectroutes/test');


router
  .use('/glib', glibRouter)
  .use('/images', imagesRouter)
  .use('/snd', sndRouter)
  .use('/yourbudget', yourbudgetRouter)
  .use('/test', testRouter);


module.exports = router;
