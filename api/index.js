const express = require('express');
const router = express.Router();

// Custom router imports
const imageRouter = require('./projectroutes/images');


router

.get('/api/*', (req, res, next) => {
  console.log('Requesting api');
  console.log(req.path);
  next();
})

.use(imageRouter);


module.exports = router;