const express = require('express');
const router = express.Router();


const imageRouter = require('./projectroutes/images');
const yourbudgetRouter = require('./projectroutes/yourbudget');


router

  .use('/api', (req, res, next) => {
    console.log('----- Requesting api');
    console.log(req.originalUrl);
    next();
  })

  .use(imageRouter)
  .use(yourbudgetRouter);


module.exports = router;