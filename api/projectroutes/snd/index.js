const express = require('express');
const sndRouter = express.Router();


const routes = require('./routes');


for (const route in routes) {
  sndRouter.use(routes[route]);
}


module.exports = sndRouter;
