export default class Easing {

  // no easing, no acceleration
  static linear (t) { return t; }
  // accelerating from zero velocity
  static easeInQuad (t) { return t * t; }
  // decelerating to zero velocity
  static easeOutQuad (t) { return t * (2 - t); }
  // acceleration until halfway, then deceleration
  static easeInOutQuad (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
  // accelerating from zero velocity
  static easeInCubic (t) { return t * t * t; }
  // decelerating to zero velocity
  static easeOutCubic (t) { return (t -= 1) * t * t + 1; }
  // acceleration until halfway, then deceleration
  static easeInOutCubic (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
  // accelerating from zero velocity
  static easeInQuart (t) { return t * t * t * t; }
  // decelerating to zero velocity
  static easeOutQuart (t) { return 1 - (t -= 1) * t * t * t; }
  // acceleration until halfway, then deceleration
  static easeInOutQuart (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t -= 1) * t * t * t; }
  // accelerating from zero velocity
  static easeInQuint (t) { return t * t * t * t * t; }
  // decelerating to zero velocity
  static easeOutQuint (t) { return 1 + (t -= 1) * t * t * t * t; }
  // acceleration until halfway, then deceleration
  static easeInOutQuint (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t -= 1) * t * t * t * t }

  constructor() {
    throw new Error('You should not use Easing contructor...');
  }

}
