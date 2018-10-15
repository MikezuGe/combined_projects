require('dotenv').config()

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { indexRoute, fallbackRoute, logger, } = require('./utility');
const apiRouter = require('./api');
const gitHandlerRouter = require('./githandler');


const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const server = require('http').createServer(app);
//const io = require('socket.io')(server);


logger.log(`\nApplication initiated, running in ${process.env.NODE_ENV}\n`);
logger.warn(`\nApplication initiated, running in ${process.env.NODE_ENV}\n`);
!isProduction && require('./test');


app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(cookieParser());


app.all('*', (req, res, next) => {
  logger.log(`${req.connection.remoteAddress} ${req.method} ${req.url}`);
  next();
});


isProduction && app.use(gitHandlerRouter);
app.use((express.static(path.resolve('./public'))));
app.use('/api', apiRouter);
app.use(indexRoute);
app.use(fallbackRoute);


server.listen(process.env.PORT, () => {
  logger.log(`Listening to port ${process.env.PORT}`);
});
