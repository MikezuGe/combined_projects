const { isProduction, PORT, } = require('./config');
const { indexRoute, fallbackRoute, logger, } = require('./utility');
const apiRouter = require('./api');
const gitHandlerRouter = require('./githandler');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();


const server = require('http').createServer(app);
//const io = require('socket.io')(server);


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


server.listen(PORT, () => {
  logger.log(`Listening to port ${PORT}`);
});
