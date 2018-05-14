
export default class Event {

  constructor (type, element, preventDefault, stopPropagation) {
    this.type = type || null;
    this.element = type && (element || window) || null;
    this.listener = null;

    this.subscribers = [];
    this.invoker = null;
    this.enableInvoke = this.type === null;
    this.createListener(preventDefault || false, stopPropagation || false);
  }

  createListener (preventDefault, stopPropagation) {
    if (this.enableInvoke) {
      this.invoker = (...args) => this.subscribers.forEach(fn => { fn(...args) });
      return;
    } else if (preventDefault && stopPropagation) {
      this.invoker = event => {
        event.preventDefault();
        event.stopPropagation();
        this.subscribers.forEach(fn => { fn(event) });
      };
    } else if (preventDefault) {
      this.invoker = event => {
        event.preventDefault();
        this.subscribers.forEach(fn => { fn(event) });
      };
    } else if (stopPropagation) {
      this.invoker = event => {
        event.stopPropagation();
        this.subscribers.forEach(fn => { fn(event) });
      };
    } else {
      this.invoker = (...args) => this.subscribers.forEach(fn => { fn(...args) });
    }
    this.element.addEventListener(this.type, this.invoker, false);
  }

  invoke () {
    if (this.enableInvoke) {
      this.invoker();
    }
  }

  subscribe (...subscribers) {
    subscribers.forEach(subscriber => {
      this.subscribers.push(subscriber);
    });
  }

  unsubscribe (...subscribers) {
    subscribers.forEach(subscriber => {
      const subscriberIndex = this.subscribers.indexOf(subscriber);
      if (subscriberIndex !== -1) {
        this.subscribers.splice(subscriberIndex, 1);
      }
    });
  }

}

const windowResizeEvent = new Event('resize', window, true, true);
// Preventing default (second to last boolean) -> f5 key won't refresh
const windowKeyDownEvent = new Event('keydown', window, false, true);
const windowKeyUpEvent = new Event('keyup', window, true, true);
const windowMouseDownEvent = new Event('mousedown', window, true, true);
const windowMouseUpEvent = new Event('mouseup', window, true, true);
const windowMouseMoveEvent = new Event('mousemove', window, true, true);
// Preventing default (second to last boolean) -> Mouse wheel stops working
const windowWheelEvent = new Event('wheel', window, false, true);
// Preventing default (second to last boolean) -> right click won't display context menu
const windowContextMenuEvent = new Event('contextmenu', window, false, true);


export {
  windowResizeEvent,
  windowKeyDownEvent,
  windowKeyUpEvent,
  windowMouseDownEvent,
  windowMouseUpEvent,
  windowMouseMoveEvent,
  windowWheelEvent,
  windowContextMenuEvent,
};
