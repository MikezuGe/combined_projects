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
    logger.log(`Redirect request: ${req.method} ${req.url}, Host: ${req.hostname}. Total redirects: ${redirectNumber}.`);
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
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
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  if (!req.hostname) {
    logger.warn(`Undefined host: Request: ${req.method} ${req.url}, Host: ${req.hostname}`);
    res.send('Client cannot be identified');
    return;
  }
  logger.log(`Request: ${req.method} ${req.url}, Host: ${req.hostname}`);
  next();
});


app.use('/api', apiRouter);
app.get('/', (req, res) => {
  const files = fs.readdirSync('./public').filter(file => fs.lstatSync(`./public/${file}`).isDirectory() && fs.readdirSync(`./public/${file}`).includes('index.html'));
  res.send(createHTML(files));
});
app.use((express.static(path.resolve(__dirname, 'public'))))
app.get('/*', (req, res) => {
  // Favicon
  if (req.path.slice(0, req.path.indexOf('/', 1)) === '/favico') {
    res.sendFile(path.resolve('./public/shared_assets', req.path.slice(1)));
    return;
  }
  // Everything else
  const slashPos = req.path.indexOf('/', 1);
  const reqUrl = path.resolve('./public', (slashPos < 0 ? req.path : req.path.slice(0, slashPos)).slice(1), 'index.html');
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
