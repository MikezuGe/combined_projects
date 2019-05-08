const { pow, sqrt, } = Math;


/**
 * @param {Object} props
 * @param {number} [props.x=0] X-coordinate
 * @param {number} [props.y=0] Y-coordinate
 * @returns
 */
const Vec2 = ({ x = 0, y = 0, }) => ({
  x,
  y,

  add: function ({ x, y, }) {
    return Vec2({ x: this.x + x, y: this.y + y, });
  },

  sub: function ({ x, y, }) {
    return Vec2({ x: this.x - x, y: this.y - y, });
  },

  scale: function (f) {
    return Vec2({ x: this.x * f, y: this.y * f, });
  },

  dot: function ({ x, y, }) {
    return this.x * x + this.y * y;
  },

  dist: function ({ x, y, }) {
    return sqrt(pow(this.x - x, 2) + pow(this.y - y, 2));
  },

  distSqrt: function ({ x, y, }) {
    return pow(this.x - x, 2) + pow(this.y - y, 2);
  },

  angleBetween: function ({ x, y, }) {
    let nx = this.x;
    let ny = this.y;
    let r = sqrt(nx * nx + ny * ny);
    if (r > 0) {
      r = 1 / r;
      nx *= r;
      ny *= r;
    } else {
      nx = 0;
      ny = 0;
    }
    let nxx = x;
    let nyy = y;
    r = sqrt(nxx * nxx + nyy * nyy);
    if (r > 0) {
      r = 1 / r;
      nxx *= r;
      nyy *= r;
    } else {
      nxx = 0;
      nyy = 0;
    }
    return nx * nxx + ny * nyy;
  },

  get toFloat32Array () {
    return new Float32Array([ this.x, this.y, ]);
  },

  get lenSqrt () {
    return this.x * this.x + this.y * this.y;
  },

  get len () {
    return sqrt(this.x * this.x + this.y * this.y);
  },

  get normalize () {
    let r = sqrt(this.x * this.x + this.y * this.y);
    if (r > 0) {
      r = 1 / r;
      return Vec2(this.x * r, this.y * r);
    }
    return Vec2(0, 0);
  },

  get invert () {
    return Vec2(-this.x, -this.y);
  },

});


export default Vec2;

/**
 * @method add
 * @param {Vec2|Object}
 * @returns {Vec2}
 */

/**
 * @method sub
 * @param {Vec2|Object}
 * @returns {Vec2}
 */

/**
 * @method scale
 * @param {number}
 * @returns {Vec2}
 */

/**
 * @method dot
 * @param {Vec2|Object}
 * @returns {number}
 */

/**
 * @method dist
 * @param {Vec2|Object}
 * @returns {number}
 */

/**
 * @method distSqrt
 * @param {Vec2|Object}
 * @returns {number}
 */

/**
 * @method angleBetween
 * @param {Vec2|Object}
 * @returns {number}
 */


/**
 * @typedef Vec2
 * @prop {add} add
 * @prop {sub} sub
 * @prop {scale} scale
 * @prop {dot} dot
 * @prop {dist} dist
 * @prop {distSqrt} distSqrt
 * @prop {angleBetween} angleBetween
 */
