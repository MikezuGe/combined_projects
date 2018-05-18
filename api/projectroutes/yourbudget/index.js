const express = require('express');
const yourbudgetRouter = express.Router();


const routes = require('./routes');


for (const route in routes) {
  yourbudgetRouter.use(routes[route]);
}


module.exports = yourbudgetRouter;
