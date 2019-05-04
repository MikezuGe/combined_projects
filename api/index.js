const express = require('express');
const apiRouter = express.Router();


apiRouter
  .use('/graphql', require('./graphql'))
  .use('/glib', require('./routes/glib'))
  .use('/test', require('./routes/test'))
  .all('*', (req, res) => res.send('No such api route'));


module.exports = apiRouter;
