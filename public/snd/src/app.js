import io from 'socket.io-client';

import { ctx, canvas, } from './ctx';
import time from './time';
import Me from './me';

import './style.css';


class Game {

  constructor ({ myId, players, }) {
    this.myId = myId;

    this.me = new Me(players[myId]);
    this.playersCurrent = players;
    this.playersNext = players;

    this.frame = () => {
      requestAnimationFrame(this.frame);
      time.update();
      this.update();
      this.render();
    };
    
    this.playersCurrent[myId] = null;
    this.playersNext[myId] = null;
    canvas.resize();
  }

  updatePlayersNext (players) {
    const plc = this.playersCurrent.length;
    const pl = players.length;

    players[this.myId] = null;
    if (pl < plc) {
      this.playersCurrent.splice(pl - 1, plc - pl);
      this.playersNext.splice(pl - 1, plc - pl);
    }

    for (let i = 0; i < pl; i += 1) {
      this.playersNext[i] = players[i];
    }
  }

  updatePlayersCurrent () {
    const { playersCurrent, playersNext, } = this;
    const pl = playersCurrent.length;
    for (let i = 0; i < pl; i += 1) {
      if (playersCurrent[i] === null) {
        continue;
      }
      const pc = playersCurrent[i];
      const pn = playersNext[i];
      const dx = pn.x - pc.x;
      const dy = pn.x - pc.x;
      const dr = pn.x - pc.x;
      pc.x = Math.abs(dx) < 1 ? pn.x : dx * 0.02;
      pc.y = Math.abs(dy) < 1 ? pn.y : dy * 0.02;
      pc.r = Math.abs(dy) < 1 ? pn.r : dr * 0.02;
    }
  }

  update () {
    this.updatePlayersCurrent();
    this.me.update();
  }

  playersRender () {
    const nonNullPlayers = this.playersCurrent.filter(player => player !== null);
    if (nonNullPlayers.length > 0) {
      ctx.beginPath()
      ctx.fillStyle = 'black';
      for (const p of nonNullPlayers) {
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      }
      ctx.fill();
    }
  }

  render () {
    this.me.render();
    this.playersRender();
  }
  
}


let game;


/* Socket.io */
const socket = io.connect(window.location.origin);


socket.on('startInfo', data => {
  game = new Game(data);
  requestAnimationFrame(game.frame);
});


socket.on('update', players => {
  const { me, } = game;
  socket.emit('update', {
    x: me.x,
    y: me.y,
    r: me.r,
  });
  game.updatePlayersNext(players);
});
