const express = require('express');
const fs = require('fs');
const testRouter = express.Router();


testRouter.post('/', (req, res) => {
  try {
    const fileNames = fs.readdirSync('./public/tests/src')
      .filter(fileName => fileName !== 'app.js');
    res.json(fileNames);
  } catch (err) {
    res.status(404).send('Unable to read files');
  }
});


module.exports = testRouter;
