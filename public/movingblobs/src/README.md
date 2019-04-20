
We're going to use the latest conventions of React, react-hooks

FYI:
Socket.io - realtime client-server connection express.js plugin (npm package/dependency)

Server
- Listens for socket.io connections
- Doesn't update game state unless players are connected through socket.io (No unnecessary work done)
- Up to 4 players may connect (for now)
  - Exceeding connections are rejected
- Game is initialized when a player connects
- Game is unitinialized when last player disconnects
- Sends game state to each client every 1/60th second
- Updates game state every 1/60th second
  - Keeps state of what buttons each player are holding
  - Does necessary calculations based on held buttons
  - e.g. calculates x and y positions of players

React function (class) - Controller
- Connects client to server through socket.io
- Receives game state from server
- Sends client player state to server every 1/60th second
- Renders some defined area for players to occupy
- Uses class Player to render a player
- Sends necessary information to "Player"s as props
  - Gives each player their position

React function (class) - Player
 - Keeps a state of what keyboard buttons the player is pressing
 - Sends said information to controller, which send it to server using socket.io
  - Information is sent whenever react state is changed (i.e. player starts or stops holding a button)
 - Renders players
 - 


