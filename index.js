const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();


const { isProduction, PORT, httpsCert, httpsKey, } = require('./config');
const { createHTML, logger } = require('./utility');
const apiRouter = require('./api');


if (isProduction) {
  // Redirect from 80 to 443
  let redirectNumber = 0;
  require('http').createServer((req, res) => {
    redirectNumber += 1;
    logger.log(`Redirect http to https. Redirected ${redirectNumber} times`);
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
    res.end();
  }).listen(80, () => {
    logger.log('Redirect listening to port 80');
  });
}


const server = isProduction
? require('https').createServer({ cert: httpsCert, key: httpsKey, }, app)
: require('http').createServer(app);
const io = require('socket.io')(server);


app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  logger.log(`Request: ${req.method} ${req.url} Host: ${req.hostname}`);
  next();
});
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname + '/public')));
app.get('/', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) {
      logger.warn(err);
      res.send('Unable to read public');
      return;
    }
    res.send(createHTML(files.filter(file => fs.readdirSync(`./public/${file}`).includes('index.html'))));
  });
});
app.get('/*', (req, res) => {
  // Favicon
  if (req.path.slice(0, req.path.indexOf('/', 1)) === '/favico') {
    res.sendFile(path.resolve('./public/shared_assets', `./${req.path}`));
    return;
  }
  // Everything else
  res.sendFile(path.resolve('./public' + req.path.slice(0, req.path.indexOf('/', 1)), 'index.html'));
});

server.listen(PORT, () => {
  logger.log(`Listening to port ${PORT}`);
});
