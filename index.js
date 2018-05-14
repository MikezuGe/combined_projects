const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Custom router imports
const apiRouter = require('./api');


const createHTML = require('./utility/createhtml');


app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(apiRouter);

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) {
      console.error(err);
      res.send('Unable to read public');
    }
    res.send(createHTML(files.filter(file => fs.readdirSync(`./public/${file}`).includes('index.html'))));
  });
});

app.get('/*', (req, res) => {
  if (req.path.slice(0, req.path.indexOf('/', 1)) === '/favico') {
    res.sendFile(path.resolve('./public/shared_assets', `./${req.path}`));
    return;
  }
  res.sendFile(path.resolve('./public' + req.path.slice(0, req.path.indexOf('/', 1)), 'index.html'));
});

server.listen(80, () => {
  console.log('Listening to port 80');
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

