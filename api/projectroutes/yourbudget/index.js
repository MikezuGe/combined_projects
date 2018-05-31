const express = require('express');
const yourbudgetRouter = express.Router();


const routes = require('./routes');


for (const route of routes) {
  yourbudgetRouter.use(route);
}


module.exports = yourbudgetRouter;
