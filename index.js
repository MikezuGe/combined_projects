const { isProduction, PORT, httpsCert, httpsKey, } = require('./config');
const { createHTML, logger } = require('./utility');
const apiRouter = require('./api');

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


if (isProduction) {
  // Redirect from 80 to 443
  let redirectNumber = 0;
  require('http').createServer((req, res) => {
    redirectNumber += 1;
    logger.log(`Redirect: ${req.connection.remoteAddress} ${req.method} ${req.url}. Total redirects: ${redirectNumber}`);
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url, });
    res.end();
  }).listen(80, () => {
    logger.log('Redirecting connections to https. Listening to port 80');
  });
}


const server = isProduction
? require('https').createServer({ cert: httpsCert, key: httpsKey, }, app)
: require('http').createServer(app);
const io = require('socket.io')(server);


app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));


app.all('*', (req, res, next) => {
  logger.log(`${req.connection.remoteAddress} ${req.method} ${req.url}`);
  next();
});
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
