
class Time {

  constructor () {
    this._currentFrame = performance.now();
    this._deltaTime = 0;
    this._lastFrame = performance.now();
  }

  get deltaTime () {
    return this._deltaTime;
  }

  update () {
    this._currentFrame = performance.now();
    this._deltaTime = (this._currentFrame - this._lastFrame) / 1000; // In seconds
    this._lastFrame = this._currentFrame;
  }

}


const time = new Time();


export default time;
