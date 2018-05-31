const express = require('express');
const sndRouter = express.Router();


const routes = require('./routes');


for (const route of routes) {
  sndRouter.use(route);
}


module.exports = sndRouter;
