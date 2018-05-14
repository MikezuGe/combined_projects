
export default class Event {

  constructor (type, element, preventDefault, stopPropagation) {
    this.type = type || null;
    this.element = type && (element || window) || null;
    this.listener = null;

    this.subscribers = [];
    this.invoker = null;
    this.disableInvoke = this.type !== null;
    this.createListener(preventDefault || false, stopPropagation || false);
  }

  createListener = function (preventDefault, stopPropagation) {
    if (!this.disableInvoke) {
      this.invoker = (...args) => this.subscribers.forEach(fn => fn(...args));
      return;
    } else if (preventDefault && stopPropagation) {
      this.invoker = event => {
        event.preventDefault();
        event.stopPropagation();
        this.subscribers.forEach(fn => fn(event));
      };
    } else if (preventDefault) {
      this.invoker = event => {
        event.preventDefault();
        this.subscribers.forEach(fn => fn(event));
      };
    } else if (stopPropagation) {
      this.invoker = event => {
        event.stopPropagation();
        this.subscribers.forEach(fn => fn(event));
      };
    } else {
      this.invoker = (...args) => this.subscribers.forEach(fn => fn(...args));
    }
    this.listener = this.element.addEventListener(this.type, this.invoker, false);
  }

  invoke = function () {
    !this.disableInvoke && this.invoker();
  }

  subscribe = function (...subscribers) {
    this.subscribers.push(...subscribers);
  }

  unsubscribe = function (...subscribers) {
    for (const subscriber of subscribers) {
      const subscriberIndex = this.subscribers.indexOf(subscriber);
      if (subscriberIndex !== -1) {
        this.subscribers.splice(subscriberIndex, 1);
      }
    }
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
