const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Custom router imports
const apiRouter = require('./api');


const createHTML = files => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Kontioweb</title>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <link rel="icon" type="image/gif" href="shared_assets/favicon/favicogifslow.gif">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          height: 100vh;
          width: 100vw;
        }

        #root {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
        }

        .links {
          flex: 1 0 150px;
          background-color: lightgray;
          height: 200px;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div id='root'>
        ${files.map(file => `<a class='links' href='${file}'>${file}</a>`).join('')}
      </div>
    </body>
  </html>
`;


app.use(apiRouter);
app.use(express.static(path.join(__dirname + '/public')));
app.get('/', (req, res) => {
  console.log('----- Requesting mainpage');
  fs.readdir('./public', (err, files) => {
    if (err) {
      console.error(err);
      res.send('Unable to read public');
    }
    res.send(createHTML(files.filter(file => fs.readdirSync(`./public/${file}`).includes('index.html'))));
  });
});
app.get('/*', (req, res) => {
  console.log('----- Requesting subpage');
  console.log(req.originalUrl);
  res.sendFile(path.resolve('./public' + req.path.slice(0, req.path.indexOf('/', 1)), 'index.html'));
});
server.listen(80, () => {
  console.log('Listening to port 80');
});





/* Game handler */
class Player {

  constructor () {
    this.x = Math.floor(Math.random() * 458) + 42;
    this.y = Math.floor(Math.random() * 458) + 42;
    this.r = 10;
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


  socket.emit('startInfo', { myId: socket.playerId, players });


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

