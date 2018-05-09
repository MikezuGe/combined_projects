/**
 * Create DOM or custom event
 * @example <caption>Creating DOM event</caption>
 * const domEvent = new Event('resize', document.getElementById('canavs'), true, true);
 * @example <caption>Creating custom event</caption>
 * const customEvent = new Event();
 * @example <caption>Subscribing to any event</caption>
 * customEvent.subscribe(boundFunction);
 * @example <caption>Invoking custom event</caption>
 * customEvent.invoke();
 * @example <caption>Unsubscriping from event</caption>
 * customEvent.unsubscribe(subscribedBoundFunction);
 */

export default class Event {

/**
 * @param {string} type - String of DOM event type. If supplied, creates a DOM event listener, otherwise create custom event
 * @param {DOM element} element - DOM element to attach the event to. If not supplied, the event is attached to global window
 * @param {boolean} preventDefault - Boolean for if default action of DOM event listener should be prevented
 * @param {boolean} stopPropagation - Boolean for if propagation of DOM event listener should be prevented
 * @property {string} type Container for DOM event type
 * @property {DOM element} element Container for DOM element
 * @property {DOM event listener} listener Contains the event listener that is created if type is supplied
 * @property {array} subscribers Array of functions that are called when invoker is called
 * @property {function} invoker Is the function that is called when DOM event triggers or can be called manually if no DOM event exists
 * @property {boolean} disableInvoke Invoking manually disabled if type exists (DOM event exists)
 */

  constructor (type, element, preventDefault, stopPropagation) {
    this.type = type || null;
    this.element = type && (element || window) || null;
    this.listener = null;

    this.subscribers = [];
    this.invoker = null;
    this.disableInvoke = this.type !== null;
    this.createListener(preventDefault || false, stopPropagation || false);
  }

  /**
   * Creates DOM event listener if type is supplied
   * Creates invokeable event if no type is supplied
   * @returns No return value
   * @property {boolean} preventDefault Prevent default action of DOM event listener
   * @property {boolean} stopPropagation Prevent bubbling of DOM event listener
   */

  createListener = (preventDefault, stopPropagation) => {
    if (!this.disableInvoke) {
      // Create custom event (Not a DOM event, that's why return)
      this.invoker = (...args) => this.subscribers.forEach(fn => fn(...args));
      return;
    } else if (preventDefault && stopPropagation) {
      // DOM event with both preventdefault and stoppropagation
      this.invoker = event => {
        event.preventDefault();
        event.stopPropagation();
        this.subscribers.forEach(fn => fn(event));
      };
    } else if (preventDefault) {
      // DOM event with only preventdefault
      this.invoker = event => {
        event.preventDefault();
        this.subscribers.forEach(fn => fn(event));
      };
    } else if (stopPropagation) {
      // DOM event with only stoppropagation
      this.invoker = event => {
        event.stopPropagation();
        this.subscribers.forEach(fn => fn(event));
      };
    } else {
      // DOM event without preventdefault and stoppropagation
      this.invoker = (...args) => this.subscribers.forEach(fn => fn(...args));
    }
    this.listener = this.element.addEventListener(this.type, this.invoker, false);
  }

  /**
   * Calls invoker when called
   * Disabled if type is supplied (DOM event listener exists)
   * @return No return value
   */

  invoke = () => !this.disableInvoke && this.invoker();

  /**
   * @return No return value
   */

  subscribe = subscriber => this.subscribers.push(subscriber);

  /**
   * @return No return value
   */

  unsubscribe = subscriber => {
    const subscriberIndex = this.subscribers.indexOf(subscriber);
    if (subscriberIndex !== -1) {
      this.subscribers.splice(subscriberIndex, 1);
    }
  }

}

/**
 * Create and export some basic DOM event listeners
 * Import needed events and add a function with subscribe that should be called whenever the event triggers
 */

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
