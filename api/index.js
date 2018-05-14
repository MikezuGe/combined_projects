const express = require('express');
const router = express.Router();


const imageRouter = require('./projectroutes/images');
const yourbudgetRouter = require('./projectroutes/yourbudget');
const glib = require('./projectroutes/glib');


router
  .use(imageRouter)
  .use(yourbudgetRouter)
  .use(glib);


module.exports = router;