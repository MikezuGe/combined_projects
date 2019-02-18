
export default class Timer {

  constructor (callback, timeLeft) {
    if (!callback) {
      throw new Error(`No 'callback' supplied to Timer constructor`);
    } else if (typeof callback !== 'function') {
      throw new Error(`Parameter 'callback' supplied to Timer constructor must be a function`);
    } else if (!timeLeft) {
      throw new Error(`No 'timeLeft' supplied to Timer constructor`);
    } else if (typeof timeLeft !== 'number') {
      throw new Error(`Parameter 'timeLeft' supplied to Timer constructor must be a number`);
    }
    this.startTime = Date.now();
    this.initialTimeLeft = timeLeft;
    this.timeLeft = timeLeft;
    this.timerOver = false;
    this.callback = () => {
      this.timerOver = true;
      callback();
    };
    this.id = setTimeout(this.callback, this.timeLeft);
  }

  isRunning = () => !!this.id

  timeLeft = () => this.startTime + this.timeLeft - Date.now()

  restart = () => {
    this.timeLeft = this.initialTimeLeft;
    this.timerOver = false;
  }

  start = () => {
    if (this.timerOver || this.id) {
      return;
    }
    this.id = setTimeout(this.callback, this.timeLeft);
    this.startTime = Date.now();
  }

  stop = () => {
    if (!this.id) {
      return;
    }
    clearTimeout(this.id);
    this.id = null;
    this.timeLeft = this.startTime + this.timeLeft - Date.now();
    this.startTime = null;
  }

  toggle = () => this.id
    ? this.stop()
    : this.start()

}
