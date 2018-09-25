const fs = require('fs');
const path = require('path');
const fallbackRoute = require('express').Router();
const logger = require('./logger');


fallbackRoute.all('*', (req, res) => {
  const reqUrl = path.resolve('./public', req.path.split('/')[1], 'index.html');
  fs.access(reqUrl, fs.constants.F_OK, err => {
    if (!err) {
      res.sendFile(reqUrl);
    } else {
      logger.warn(err);
      res.redirect('/');
    }
  });
});


module.exports = fallbackRoute;
