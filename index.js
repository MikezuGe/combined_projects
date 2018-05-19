const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
// Custom router imports
const apiRouter = require('./api');
// Utility imports
const createHTML = require('./utility/createhtml');


const isProduction = process.env.NODE_ENV !== 'development';
const PORT = isProduction ? 443 : 80;


if (isProduction) {
  // Redirect from 80 to 443
  let redirectNumber = 0;
  require('http').createServer((req, res) => {
    redirectNumber += 1;
    console.log(`Redirect http to https. Redirected ${redirectNumber} times`);
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(80, () => {
    console.log('Redirect listening to port 80');
  });
}


const server = isProduction
? require('https').createServer({
  cert: fs.readFileSync('./sslcert/fullchain.pem'),
  key: fs.readFileSync('./sslcert/privkey.pem')
}, app)
: require('http').createServer(app);
const io = require('socket.io')(server);


// Setup
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Log middleware
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(apiRouter);
app.use(express.static(path.join(__dirname + '/public')));

// Main page
app.get('/', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) {
      console.error(err);
      res.send('Unable to read public');
    }
    res.send(createHTML(files.filter(file => fs.readdirSync(`./public/${file}`).includes('index.html'))));
  });
});

// Anything else
app.get('/*', (req, res) => {
  // Favicon
  if (req.path.slice(0, req.path.indexOf('/', 1)) === '/favico') {
    res.sendFile(path.resolve('./public/shared_assets', `./${req.path}`));
    return;
  }
  // Other
  res.sendFile(path.resolve('./public' + req.path.slice(0, req.path.indexOf('/', 1)), 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});





/* Game handler */
class Player {

  constructor () {
    this.x = (Math.random() * 458) | 0 + 42;
    this.y = (Math.random() * 458) | 0 + 42;
    this.r = 10; // Radius
  }

}

const players = [];
const addPlayer = () => {
  let id = players.findIndex(arrPos => arrPos === null);
  if (id < 0) {
    id = players.length;  
  }
  players[id] = new Player();
  console.log(players);
  return id;
}
const removePlayer = id => {
  players[id] = null;
  let length = players.length - 1;
  // OPTIMISE THIS LATER
  while (players[length] === null) {
    players.splice(length, 1);
    length -= 1;
  }
  console.log(players);
}


/* Socket.io app */
io.on('connect', socket => {
  socket.playerId = addPlayer();
  console.log(`Socket connected, playerId: ${socket.playerId}`);


  socket.emit('startInfo', { myId: socket.playerId, players, });


  socket.on('disconnect', () => {
    console.log(`Socket disconnected, playerId: ${socket.playerId}`);
    removePlayer(socket.playerId);
  });
  

  /* Updates */
  // Sends clients latest info. This also triggers a request for clients to send their current info (position and radius)
  setInterval(() => {
    socket.emit('update', players);
  }, 34);


  // Clients send update that contains position and radius. Id is in the socket
  socket.on('update', data => {
    const player = players[socket.playerId];
    player.x = data.x;
    player.y = data.y;
    player.r = data.r;
  });

});

