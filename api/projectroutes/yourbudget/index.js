const express = require('express');
const router = express.Router();

require('./models');
const routes = require('./routes');

router

  .use('/api/yourbudget', (req, res, next) => {
    console.log('ur budget');
    next();
  })

  .use(routes.budgetRoute);


module.exports = router;
