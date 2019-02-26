require('dotenv').config()

const path = require('path');
const express = require('express');

const { indexRoute, fallbackRoute, logger, } = require('./utility');
const apiRouter = require('./api');
const gitHandlerRouter = require('./githandler');


if (!process.env.PORT) {
  logger.warn('No port defined in .env file, using default of 3000');
  process.env.PORT = 3000;
}


const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const server = require('http').createServer(app);
//const io = require('socket.io')(server);


!isProduction && require('./test');


app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));


app.all('*', (req, res, next) => {
  logger.info(`${req.connection.remoteAddress} ${req.method} ${req.url}`);
  next();
});


isProduction && app.use(gitHandlerRouter);
app.use((express.static(path.resolve('./public'))));
app.use('/api', apiRouter);
app.use(indexRoute);
app.use(fallbackRoute);


server.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
});
