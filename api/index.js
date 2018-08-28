const express = require('express');
const router = express.Router();


router
  .use('/graphql', require('./graphql'))
  .use('/glib', require('./projectroutes/glib'));


module.exports = router;
