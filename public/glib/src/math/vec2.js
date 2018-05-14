const { sqrt, } = Math;


export default class Vec2 {

  static get zero () { return new Vec2(0, 0); }
  static get up () { return new Vec2(0, 1); }
  static get down () { return new Vec2(0, -1); }
  static get left () { return new Vec2(-1, 0); }
  static get right () { return new Vec2(1, 0); }

  static fromArray (a) { return new Vec2(...a); }

  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  get toArray () { return [ this.x, this.y, ]; }
  get toFloat32Array () { return new Float32Array([ this.x, this.y, ]); }
  get clone () { return new Vec2(this.x, this.y); }
  get len () { return sqrt(this.x * this.x + this.y * this.y); }
  get lenSqrt () { return this.x * this.x + this.y * this.y; }
  get normalize () {
    let r = sqrt(this.x * this.x + this.y * this.y);
    if (r > 0) {
      r = 1 / r;
      return new Vec2(this.x * r, this.y * r);
    }
    return new Vec2(0, 0);
  }

  add (v) { return new Vec2(this.x + v.x, this.y + v.y); }
  sub (v) { return new Vec2(this.x - v.x, this.y - v.y); }
  scale (f) { return new Vec2(this.x * f, this.y * f); }
  dot (v) { return this.x * v.x + this.y * v.y; }
  getAngle (v) { return this.normalize.dot(v.normalize); }
  invert () { return new Vec2(-this.x, -this.y); }

}
