const express = require('express');
const router = express.Router();


const glibRouter = require('./projectroutes/glib');
const imageRouter = require('./projectroutes/images');
const sndRouter = require('./projectroutes/snd');
const yourbudgetRouter = require('./projectroutes/yourbudget');


router
  .use(glibRouter)
  .use(imageRouter)
  .use(sndRouter)
  .use(yourbudgetRouter);


module.exports = router;
