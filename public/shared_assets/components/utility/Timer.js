
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
    this.initialTimeLeft = timeLeft;
    this.callback = callback;
    this.timeoutId = null;
    this.timerStartAt = null;
    this.timerStopAt = null;
    this.timerDoneAt = null;
  }

  getIsRunning = () => !!this.timeoutId || this.timeoutId === 0
  getTimeLeft = () => this.timerDoneAt
    ? this.timerDoneAt - (this.timerStopAt || Date.now())
    : this.initialTimeLeft
  getTimePassed = () => this.initialTimeLeft - this.getTimeLeft()
  getPercentDone = () => this.getTimePassed() / this.initialTimeLeft;

  restart = () => {
    const timeLeft = this.initialTimeLeft;
    this.timeoutId = setTimeout(this.callback, timeLeft);
    this.timerStartAt = Date.now();
    this.timerStopAt = null;
    this.timerDoneAt = this.timerStartAt + timeLeft;
  }

  start = () => {
    const timeLeft = this.getTimeLeft();
    this.timeoutId = setTimeout(this.callback, timeLeft);
    this.timerStartAt = Date.now();
    this.timerStopAt = null;
    this.timerDoneAt = this.timerStartAt + timeLeft;
  }

  stop = () => {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
    this.timerStopAt = Date.now();
  }

  toggle = () => this.getIsRunning()
    ? this.stop()
    : this.start()

}
