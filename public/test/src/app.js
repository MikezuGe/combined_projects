import io from 'socket.io-client';
import './style.css';


/* Canvas */
const canvas = document.getElementById('canvas');
canvas.resize = function () {
  canvas.width = Math.floor(window.innerWidth / 2);
  canvas.height = Math.floor(window.innerHeight / 2);
}
canvas.resize();
const ctx = canvas.getContext('2d');


/* Keyup event */
document.body.addEventListener('keyup', e => {
  e.preventDefault();
  game.updateMe(e.key);
})


/* Game */
const frame = () => {
  requestAnimationFrame(frame);
  game.render();
};

class Game {

  constructor ({ myId, players, }) {
    this.myId = myId;
    this.me = players[myId];
    this.players = players;
    this.players[myId] = null;
    console.log(this.players, this.me);
  }

  updateMe (key) {
    const { me, } = this;
    switch (key) {
      case 'w': me.y -= 10; break;
      case 's': me.y += 10; break;
      case 'a': me.x -= 10; break;
      case 'd': me.x += 10; break;
      default: break;
    }
  }

  updatePlayers (latestPlayers) {
    const pl = this.players.length;
    const lpl = latestPlayers.length;

    latestPlayers[this.myId] = null;
    if (lpl < pl) {
      this.players.splice(lpl - 1, pl - lpl);
    }

    for (let i = 0; i < lpl; i += 1) {
      this.players[i] = latestPlayers[i];
    }
  }

  render () {
    const { me, players, } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'lime';
    ctx.moveTo(me.x + me.r / 2, me.y);
    ctx.arc(me.x, me.y, me.r, 0, 2 * Math.PI);
    ctx.fill();

    const nonNullPlayers = players.filter(player => player !== null);
    if (nonNullPlayers.length > 0) {
      ctx.beginPath()
      ctx.fillStyle = 'black';
      for (const p of nonNullPlayers) {
        ctx.moveTo(p.x + p.r / 2, p.y);
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      }
      ctx.fill();
    }
  }
  
}


let game;


/* Socket.io */
const socket = io.connect(window.location.origin);


socket.on('startInfo', data => {
  game = new Game(data);
  requestAnimationFrame(frame);
});


socket.on('update', players => {
  socket.emit('update', { ...game.me });
  game.updatePlayers(players);
});
