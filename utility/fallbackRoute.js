const fs = require('fs');
const path = require('path');
const fallbackRoute = require('express').Router();
const logger = require('./logger');


fallbackRoute.all('*', (req, res) => {
  const reqUrl = path.resolve('./public', req.path.split('/')[1], 'index.html');
  fs.access(reqUrl, fs.constants.F_OK, err => {
    if (err) {
      logger.warn(`Unable to find application ${reqUrl}`, err);
      return res.redirect('/');
    }
    res.sendFile(reqUrl);
  });
});


module.exports = fallbackRoute;
