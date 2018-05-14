import { canvas, ctx, } from './ctx';
import time from './time';
import input from './input';


export default class Me {

  constructor ({x, y, r}) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.velocity = 0;
    this.acceleration = 1.5;
    this.maxVelocity = 2;
    this.reverseAcceleration = 0.5;
    this.maxReverseVelocity = -2;
    this.breakAcceleration = 4;
    this.naturalDeceleration = 0.3;

    this.direction = 0; // From 0 to 2 * Math.PI
    this.turnVelocity = 0;
    this.turnAcceleration = 0.1;
    this.turnDeceleration = 0.3;
    this.naturalTurnDeceleration = 0.1;
    this.maxTurnVelocity = 0.03;
  }

  outsideofScreen (width, height) {
    const { x, y, r, } = this;
    return x + r < 0 || x - r > width || y + r < 0 || y - r > height;
  }

  update () {
    const { keys, } = input;
    const { deltaTime, } = time;
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
        this.turnVelocity += this.turnDeceleration * deltaTime;
        if (this.turnVelocity > 0) {
          this.turnVelocity = 0;
        }
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
        this.turnVelocity -= this.turnDeceleration * deltaTime;
        if (this.turnVelocity < 0) {
          this.turnVelocity = 0;
        }
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
        this.turnVelocity += this.naturalTurnDeceleration * deltaTime;
        if (this.turnVelocity > 0) {
          this.turnVelocity = 0;
        }
      } else if (this.turnVelocity > 0) {
        this.turnVelocity -= this.naturalTurnDeceleration * deltaTime;
        if (this.turnVelocity < 0) {
          this.turnVelocity = 0;
        }
      }
    }

    if (this.velocity !== 0) {
      this.direction += this.velocity > 0
       ? this.turnVelocity
       : -this.turnVelocity;
    } else {
      this.turnVelocity = 0;
    }

    // Direction correction
    if (this.direction > 2 * Math.PI) {
      this.direction -= Math.PI * 2;
    } else if (this.direction < 0) {
      this.direction += Math.PI * 2;
    }

    // Position
    if (this.velocity !== 0) {
      this.x += Math.cos(this.direction) * this.velocity;
      this.y += Math.sin(this.direction) * this.velocity;
    }

  }

  render () {
    const { width, height, } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.fillStyle = 'lime';
    ctx.moveTo(this.x + this.r, this.y);
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.r * Math.cos(this.direction), this.y + this.r * Math.sin(this.direction));
    if (this.outsideofScreen(width, height)) {
      const middleX = (width / 2) | 0;
      const middleY = (height / 2) | 0;
      const dirX = this.x - middleX;
      const dirY = this.y - middleY;
      const len = Math.sqrt(dirX * dirX + dirY * dirY);
      const normalizedX = dirX / len;
      const normalizedY = dirY / len;
      ctx.moveTo(middleX, middleY);
      ctx.lineTo(middleX + normalizedX * 50, middleY + normalizedY * 50);
    }
    ctx.fill();
    ctx.stroke();
  }

}
