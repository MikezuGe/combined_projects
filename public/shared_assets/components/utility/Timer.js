const Timer = ({ callback, timeLeft, }) => {
  if (!callback) {
    throw new Error(`No 'callback' supplied to Timer constructor`);
  } else if (typeof callback !== 'function') {
    throw new Error(`Parameter 'callback' supplied to Timer constructor must be a function`);
  } else if (!timeLeft) {
    throw new Error(`No 'timeLeft' supplied to Timer constructor`);
  } else if (typeof timeLeft !== 'number') {
    throw new Error(`Parameter 'timeLeft' supplied to Timer constructor must be a number`);
  }
  const initialTimeLeft = timeLeft;
  let timeoutId = null;
  let timerStartAt = null;
  let timerStopAt = null;
  let timerDoneAt = null;

  const getIsRunning = () => !!timeoutId || timeoutId === 0;
  const getTimeLeft = () => timerDoneAt ? timerDoneAt - (timerStopAt || Date.now()) : initialTimeLeft;
  const getTimePassed = () => initialTimeLeft - getTimeLeft();
  const getPercentDone = () => getTimePassed() / initialTimeLeft;
  const restart = () => {
    const timeLeft = initialTimeLeft;
    timeoutId = setTimeout(callback, timeLeft);
    timerStartAt = Date.now();
    timerStopAt = null;
    timerDoneAt = timerStartAt + timeLeft;
  };
  const start = () => {
    const timeLeft = getTimeLeft();
    timeoutId = setTimeout(callback, timeLeft);
    timerStartAt = Date.now();
    timerStopAt = null;
    timerDoneAt = timerStartAt + timeLeft;
  };
  const stop = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
    timerStopAt = Date.now();
  };
  const toggle = () => getIsRunning() ? stop() : start();

  return {
    getIsRunning,
    getTimeLeft,
    getTimePassed,
    getPercentDone,
    restart,
    start,
    stop,
    toggle,
  };
};


export default Timer;
