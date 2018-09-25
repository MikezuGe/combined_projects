import {
  windowKeydownEvent,
  windowKeyupEvent,
  windowMouseupEvent,
  windowMousedownEvent,
  windowMousemoveEvent,
} from './Event';


const { abs, } = Math;


class Input {

  constructor () {
    this.mouse = {
      press: false,
      x: null,
      y: null,
      dx: 0,
      dy: 0,
    };
    this.mouse0 = {};
    this.mouse1 = {};
    this.mouse2 = {};
    for (let i = 0; i < 3; i++) {
      this[`mouse${i}`].press = false;
      this[`mouse${i}`].hold = false;
      this[`mouse${i}`].drag = false;
      this[`mouse${i}`].sx = null;
      this[`mouse${i}`].sx = null;
      this[`mouse${i}`].dx = null;
      this[`mouse${i}`].dy = null;
    }
    this.keys = [];
  }

  getKeys () {
    return this.keys;
  }

  getMouse () {
    return this.mouse;
  }

  getMouse0 () {
    return this.mouse0;
  }

  getMouse1 () {
    return this.mouse1;
  }

  getMouse2 () {
    return this.mouse2;
  }

  keyup = e => {
    if (this.keys.includes(e.key)) {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
  }

  keydown = e => {
    if (!this.keys.includes(e.key)) {
      this.keys.push(e.key);
    }
  }

  mouseup = e => {
    this[`mouse${e.button}`].press = false;
    this[`mouse${e.button}`].hold = false;
    this[`mouse${e.button}`].drag = false;
    this[`mouse${e.button}`].sx = null;
    this[`mouse${e.button}`].sx = null;
    this[`mouse${e.button}`].dx = null;
    this[`mouse${e.button}`].dy = null;
    for (let i = 0; i < 3; i++) {
      if (this[`mouse${i}`].press) {
        return;
      }
    }
    this.mouse.press = false;
  }

  mousedown = e => {
    this.mouse.press = true;
    this[`mouse${e.button}`].press = true;
    this[`mouse${e.button}`].sx = e.clientX;
    this[`mouse${e.button}`].sy = e.clientY;
  }

  mousemove = ({ clientX, clientY, }) => {
    const m = this.mouse;
    m.dx = clientX - m.x;
    m.dy = m.y - clientY;
    m.x = clientX;
    m.y = clientY;
    if (!this.mouse.press) {
      return;
    }
    for (let i = 0; i < 3; i++) {
      const m = this[`mouse${i}`];
      if (m.press) {
        m.hold = true;
        m.dx = clientX - m.sx;
        m.dy = clientY - m.sy;
        if (!m.drag && (abs(m.dx) > 20 || abs(m.dy) > 20)) {
          m.drag = true;
        }
      }
    }
  }

  update () {
    const m = this.mouse;
    m.dx = 0;
    m.dy = 0;
  }
  
}


const input = new Input();


windowKeydownEvent.subscribe(input.keydown);
windowKeyupEvent.subscribe(input.keyup);
windowMouseupEvent.subscribe(input.mouseup);
windowMousedownEvent.subscribe(input.mousedown);
windowMousemoveEvent.subscribe(input.mousemove);


export default input;
