const express = require('express');
const { exec, } = require('child_process');
const { lstat, } = require('fs');

const logger = require('./utility/logger');


const gitHandlerRouter = express.Router();


gitHandlerRouter.post('/', (req, res, next) => {
  if (!req.header('User-Agent')
    || !req.header('X-GitHub-Event')
    || !(req.header('X-GitHub-Event') === 'push')
    || !req.header('X-GitHub-Delivery')) {
      next();
  } else {
    if (!(req.body.ref === 'refs/heads/master')) {
      logger.info(`Git upgraded on branch '${req.body.ref}', no actions taken`);
      res.send(`Git upgraded on branch '${req.body.ref}', no actions taken`);
      return;
    }
    lstat('./githook.sh', (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          logger.warn('Error, no executable file found');
          res.send('Error, no executable file found');
        } else {
          logger.warn(`Error: ${err.code}`);
          res.send(`Error: ${err.code}`);
        }
        return;
      }
      if (!stats.isFile()) {
        logger.warn('Error, no executable file found');
        res.send('Error, no executable file found');
        return;
      }
      logger.info('Attempting pulling from git and restarting, due to git webhook activation');
      res.send('Attempting pulling from git and restarting, due to git webhook activation');
      exec('./githook.sh', (err, stdout, stderr) => {
        if (err) {
          logger.warn('Unable to run githook.sh');
        }
      });
    });
  }
});


module.exports = gitHandlerRouter;
