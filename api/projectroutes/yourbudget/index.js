const express = require('express');
const router = express.Router();

require('./models');
const routes = require('./routes');

router
  .use(routes.budgetRoute);


module.exports = router;
