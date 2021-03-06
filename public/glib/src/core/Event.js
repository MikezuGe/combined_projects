export default class Event {

  constructor (preventDefault = false, stopPropagation = false) {
    // Contains functions that are called when invoke is called
    this.subscribers = [];
    this.invoke = this.getInvoker(preventDefault, stopPropagation);
  }

  subscribe (subscriber) {
    if (!this.subscribers.includes(subscriber)) {
      this.subscribers.push(subscriber);
    }
  }

  unsubscribe (subscriber) {
    if (this.subscribers.includes(subscriber)) {
      this.subscribers.splice(this.subscribers.indexOf(subscriber));
    }
  }

  getInvoker (preventDefault, stopPropagation) {
    if (preventDefault && stopPropagation) {
      return e => {
        e.preventDefault();
        e.stopPropagation();
        this.subscribers.forEach(subscriber => subscriber(e));
      }
    } else if (preventDefault) {
      return e => {
        e.preventDefault();
        this.subscribers.forEach(subscriber => subscriber(e));
      }
    } else if (stopPropagation) {
      return e => {
        e.stopPropagation();
        this.subscribers.forEach(subscriber => subscriber(e));
      }
    } else {
      return e => {
        this.subscribers.forEach(subscriber => subscriber(e));
      }
    }
  }

}


const windowResizeEvent = new Event();
const windowKeyupEvent = new Event(true, true);
const windowKeydownEvent = new Event(false, true);
const windowMouseupEvent = new Event(true, true);
const windowMousedownEvent = new Event(true, true);
const windowMousemoveEvent = new Event(true, true);


window.addEventListener('resize', windowResizeEvent.invoke, false);
window.addEventListener('keyup', windowKeyupEvent.invoke, false);
window.addEventListener('keydown', windowKeydownEvent.invoke, false);
window.addEventListener('mouseup', windowMouseupEvent.invoke, false);
window.addEventListener('mousedown', windowMousedownEvent.invoke, false);
window.addEventListener('mousemove', windowMousemoveEvent.invoke, false);


export {
  windowResizeEvent,
  windowKeyupEvent,
  windowKeydownEvent,
  windowMouseupEvent,
  windowMousedownEvent,
  windowMousemoveEvent,
};
