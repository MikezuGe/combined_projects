import io from 'socket.io-client';
import input from './input';
import { windowResizeEvent, } from './event';
import './style.css';


/* Canvas */
const canvas = document.getElementById('canvas');
canvas.resize = function () {
  canvas.width = (window.innerWidth / 2) | 0;
  canvas.height = (window.innerHeight / 2) | 0;
}
canvas.resize();
const ctx = canvas.getContext('2d');


/* Time */
let startTime = performance.now();
let lastFrame = performance.now();
let currentFrame = performance.now();
let deltaTime = 0;


/* Events */
windowResizeEvent.subscribe(canvas.resize);


/* Game */
const frame = () => {
  requestAnimationFrame(frame);

  currentFrame = performance.now();
  deltaTime = (currentFrame - lastFrame) / 1000; // In seconds
  lastFrame = currentFrame;

  game.update();
  game.render();
};


class Game {

  constructor ({ myId, players, }) {
    this.myId = myId;

    this.velocity = 0;
    this.acceleration = 1.5;
    this.maxVelocity = 2;
    this.reverseAcceleration = 0.5;
    this.maxReverseVelocity = -2;
    this.breakAcceleration = 4;
    this.naturalDeceleration = 0.5;

    this.direction = 0; // From 0 to 2 * Math.PI
    this.turnVelocity = 0;
    this.turnAcceleration = 0.1;
    this.turnDeceleration = 0.5;
    this.maxTurnVelocity = 0.03;

    this.me = players[myId];
    this.playersCurrent = players;
    this.playersNext = players;
    this.input = input;
    
    this.playersCurrent[myId] = null;
    this.playersNext[myId] = null;
  }

  meOutsideofScreen (width,height) {
    const { x, y, r, } = this.me;
    return x + r < 0 || x - r > width || y + r < 0 || y - r > height;
  }

  updateMe () {
    const { keys, } = this.input;

    // Forward/backward velocity logic
    if (keys.includes('w')) { // Break and accelerate
      if (this.velocity < 0) { // Stop if going backwards
        this.velocity += this.breakAcceleration * deltaTime;
        if (this.velocity > 0) {
          this.velocity = 0;
        }
      } else { // Acceleration from 0 to max
        if (this.velocity < this.maxVelocity) {
          this.velocity += this.acceleration * deltaTime;
          if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity
          }
        }
      }
    } else if (keys.includes('s')) { // Break and decelerate
      if (this.velocity > 0) { // Stops if going forward
        this.velocity -= this.breakAcceleration * deltaTime;
        if (this.velocity < 0) {
          this.velocity = 0;
        }
      } else { // Decelerate from 0 to max
        if (this.maxReverseVelocity < this.velocity) {
          this.velocity -= this.reverseAcceleration * deltaTime;
          if (this.maxReverseVelocity > this.velocity) {
            this.velocity = this.maxReverseVelocity;
          }
        }
      }
    } else { // Naturally slow down and halt
      if (this.velocity > 0) { // Going forward, naturally slow down
        this.velocity -= this.naturalDeceleration * deltaTime;
        if (this.velocity < 0) {
          this.velocity = 0;
        }
      } else if (this.velocity < 0) {
        this.velocity += this.naturalDeceleration * deltaTime;
        if (this.velocity > 0) {
          this.velocity = 0;
        }
      }
    }


    // Turning velocity logic
    if (keys.includes('d')) {
      if (this.turnVelocity < 0) {
        this.turnVelocity += this.turnDeceleration * 3 * deltaTime;
      } else {
        if (this.turnVelocity < this.maxTurnVelocity) {
          this.turnVelocity += this.turnAcceleration * deltaTime;
          if (this.turnVelocity > this.maxTurnVelocity) {
            this.turnVelocity = this.maxTurnVelocity;
          }
        }
      }
    } else if (keys.includes('a')) {
      if (this.turnVelocity > 0) {
        this.turnVelocity -= this.turnDeceleration * 3 * deltaTime;
      } else {
        if (-this.maxTurnVelocity < this.turnVelocity) {
          this.turnVelocity -= this.turnAcceleration * deltaTime;
          if (-this.maxTurnVelocity > this.turnVelocity) {
            this.turnVelocity = -this.maxTurnVelocity;
          }
        }
      }
    } else {
      if (this.turnVelocity < 0) {
        this.turnVelocity += this.turnDeceleration * 0.33 * deltaTime;
        if (this.turnVelocity > 0) {
          this.turnVelocity = 0;
        }
      } else if (this.turnVelocity > 0) {
        this.turnVelocity -= this.turnDeceleration * 0.33 * deltaTime;
        if (this.turnVelocity < 0) {
          this.turnVelocity = 0;
        }
      }
    }


    // Direction correction
    this.direction += this.turnVelocity;
    // Direction correction
    if (this.direction > 2 * Math.PI) {
      this.direction -= Math.PI * 2;
    } else if (this.direction < 0) {
      this.direction += Math.PI * 2;
    }

    // Position
    if (this.velocity !== 0) {
      this.me.x += Math.cos(this.direction) * this.velocity;
      this.me.y += Math.sin(this.direction) * this.velocity;
    }

  }

  updatePlayers (players) {
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

  updateOthers () {
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
      this.playersCurrent[i].x = Math.abs(dx) < 1 ? pn.x : dx * 0.25;
      this.playersCurrent[i].y = Math.abs(dy) < 1 ? pn.y : dy * 0.25;
      this.playersCurrent[i].r = Math.abs(dy) < 1 ? pn.r : dr * 0.25;
    }
  }

  update () {
    this.updateOthers();
    this.updateMe();
  }

  render () {
    const { me, playersCurrent, } = this;
    const { width, height, } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.fillStyle = 'lime';
    ctx.moveTo(me.x + me.r, me.y);
    ctx.arc(me.x, me.y, me.r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.moveTo(me.x, me.y);
    ctx.lineTo(me.x + me.r * Math.cos(this.direction), me.y + me.r * Math.sin(this.direction));
    if (this.meOutsideofScreen(width, height)) {
      const middleX = (width / 2) | 0;
      const middleY = (height / 2) | 0;
      const dirX = me.x - middleX;
      const dirY = me.y - middleY;
      const len = Math.sqrt(dirX * dirX + dirY * dirY);
      const normalizedX = dirX / len;
      const normalizedY = dirY / len;
      console.log(normalizedX, normalizedY);
      ctx.moveTo(middleX, middleY);
      ctx.lineTo(middleX + normalizedX * 50, middleY + normalizedY * 50);
    }
    ctx.fill();
    ctx.stroke();

    const nonNullPlayers = playersCurrent.filter(player => player !== null);
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
