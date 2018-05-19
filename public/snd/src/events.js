
class Events {

  constructor () {
    this.events = new Map();
  }

  addEvent (name, event) {
    if (!(event instanceof Event)) {
      throw new Error(`Can't add event, event not an instance of Event: ${name} ${event}`);
    }
    if (this.events.has(name)) {
      throw new Error(`Can't add event, event name already exists: ${name}`);
    }
    if (!event.invoker || typeof event.invoker !== 'function') {
      throw new Error(`Can't add event, no event invoker defined: ${name} ${event.invoker}`);
    }
    this.events.set(name, event);
  }

  removeEvent (name) {
    if (!this.events.has(name)) {
      throw new Error(`Can't remove event, no such event: ${name}`);
    }
    this.events.delete(name);
  }

  subscribeTo (name, ...subscribers) {
    const event = this.events.get(name);
    if (!event) {
      throw new Error(`Can't subscribe to event, no such event: ${name}`);
    }
    subscribers.forEach(subscriber => {
      if (typeof subscriber !== 'function') {
        throw new Error(`Can't subscribe to event, subscriber not a function: ${subscriber}`);
      }
      event.subscribe(subscriber);
    });
  }

  unSubscribeFrom (name, ...subscribers) {
    const event = this.events.get(name);
    if (!event) {
      throw new Error(`Can't unsubscribe from event, no such event: ${name}`);
    }
    subscribers.forEach(subscriber => {
      if (typeof subscriber !== 'function') {
        throw new Error(`Can't unsubscribe from event, subscriber not a function: ${subscriber}`);
      }
      event.subscribe(subscriber);
    });
  }

  startEvent (name) {
    const event = this.events.get(name);
    if (!event) {
      throw new Error(`Can't start event, no such event: ${name}`);
    }
    event.startEvent();
  }

  stopEvent (name) {
    const event = this.events.get(name);
    if (!event) {
      throw new Error(`Can't stop event, no such event: ${name}`);
    }
    event.stopEvent();
  }

  startAllEvents () {
    this.events.forEach(event => event.startEvent());
  }

  stopAllEvents () {
    this.events.forEach(event => event.stopEvent());
  }

}


class Event {

  constructor (type, element, preventDefault, stopPropagation) {
    this.type = type || null;
    this.element = type && (element || window) || null;
    this.active = false;

    this.subscribers = [];
    this.invoker = null;
    this.enableInvoke = this.type === null;
    this.createInvoker(preventDefault || false, stopPropagation || false);
  }

  createInvoker (preventDefault, stopPropagation) {
    if (this.enableInvoke) {
      this.invoker = (...args) => this.subscribers.forEach(fn => { fn(...args) });
      this.active = true;
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
      this.invoker = event => {
        this.subscribers.forEach(fn => { fn(event) });
      }
    }
  }

  invoke () {
    if (this.enableInvoke) {
      this.invoker();
    }
  }

  subscribe (subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe (subscriber) {
    const subscriberIndex = this.subscribers.indexOf(subscriber);
    if (subscriberIndex !== -1) {
      this.subscribers.splice(subscriberIndex, 1);
    }
  }

  startEvent () {
    if (!this.active) {
      this.element.addEventListener(this.type, this.invoker, false);
    }
  }

  stopEvent () {
    if (this.active) {
      this.element.removeEventListener(this.type, this.invoker, false);
    }
  }

}


const events = new Events();


events.addEvent('windowResize', new Event('resize', window, true, true));
// Preventing default (second to last boolean) -> f5 key won't refresh
events.addEvent('windowKeyDown', new Event('keydown', window, false, true));
events.addEvent('windowKeyUp', new Event('keyup', window, true, true));
// Preventing default (second to last boolean) -> can't click some elements (eg. form inputs)
events.addEvent('windowMouseDown', new Event('mousedown', window, true, true));
events.addEvent('windowMouseUp', new Event('mouseup', window, true, true));
events.addEvent('windowMouseMove', new Event('mousemove', window, true, true));
// Preventing default (second to last boolean) -> Mouse wheel stops working
events.addEvent('windowWheel', new Event('wheel', window, false, true));
// Preventing default (second to last boolean) -> right click won't display context menu
events.addEvent('windowContextMenu', new Event('contextmenu', window, false, true));


export { Event, };
export default events;
