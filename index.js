const { isProduction, PORT, httpsCert, httpsKey, } = require('./config');
const { createHTML, logger } = require('./utility');
const apiRouter = require('./api');
const gitHandlerRouter = require('./githandler');

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();


if (isProduction) {
  logger.log('Running in production mode');
  // Redirect from 80 to 443
  require('http').createServer((req, res) => {
    res.writeHead(301, { 'Location': `https://www.kontioweb.fi${req.url}`, });
    res.end();
  }).listen(80, () => {
    logger.log('Redirecting connections to https. Listening to port 80');
  });
} else {
  logger.log('Running in development mode');
}


const server = isProduction
? require('https').createServer({ cert: httpsCert, key: httpsKey, }, app)
: require('http').createServer(app);
const io = require('socket.io')(server);


app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(cookieParser());

if (isProduction) {
  // Redirect from https://kontioweb.fi to https://www.kontioweb.fi
  app.all('*', (req, res, next) => {
    if (req.hostname.slice(0, 3) !== 'www') {
      res.writeHead(301, { 'Location': `https://www.kontioweb.fi${req.url}`, });
      res.end();
      return;
    }
    logger.log(`${req.connection.remoteAddress} ${req.method} ${req.url}`);
    next();
  });
  app.use(gitHandlerRouter);
} else {
  app.all('*', (req, res, next) => {
    logger.log(`${req.connection.remoteAddress} ${req.method} ${req.url}`);
    next();
  });
}
app.use((express.static(path.resolve('./public'))));


app.use('/api', apiRouter);
app.get('/', (req, res) => {
  const files = fs.readdirSync('./public').filter(file => fs.lstatSync(`./public/${file}`).isDirectory() && fs.readdirSync(`./public/${file}`).includes('index.html'));
  res.send(createHTML(files));
});


app.get('*', (req, res) => {
  const directory = req.path.split('/')[1];
  const reqUrl = path.resolve('./public', directory, 'index.html');
  fs.access(reqUrl, fs.constants.F_OK, err => {
    if (!err) {
      res.sendFile(reqUrl);
    } else {
      res.redirect('/');
    }
  });
});


server.listen(PORT, () => {
  logger.log(`Listening to port ${PORT}`);
});
