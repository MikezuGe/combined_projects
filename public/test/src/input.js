import { windowKeyDownEvent, windowKeyUpEvent, windowMouseUpEvent, windowMouseDownEvent, windowMouseMoveEvent, windowWheelEvent, } from './event';

const btns = [ 'Mouse0', 'Mouse1', 'Mouse2', ];

class Input {

  constructor () {
    for (const btn of btns) {
      this[btn] = {};
      this[btn].pressed = false;
      this[btn].drag = false;
      this[btn].startX = null;
      this[btn].startY = null;
      this[btn].endX = null;
      this[btn].endY = null;
      this[btn].minX = null;
      this[btn].minY = null;
      this[btn].maxX = null;
      this[btn].maxY = null;
    }
    this.mouseBtnPressed = false;
    this.mouseCurrentX = null;
    this.mouseCurrentY = null;
    this.mouseScroll = 0;
    this.mouseDeltaX = 0;
    this.mouseDeltaY = 0;
    this.keys = [];
  }

  handleMouseDown = event => {
    this[`Mouse${event.button}`].pressed = true;
    this.mouseBtnPressed = true;
  }

  handleMouseUp = event => {
    const btn = `Mouse${event.button}`;
    this[btn].pressed = false;
    if (!this.Mouse0.pressed && !this.Mouse2.pressed && !this.Mouse1.pressed) {
      this.mouseBtnPressed = false;
    }
  }

  handleMouseMove = event => {
    const { clientX, clientY, } = event;
    if (this.mouseDeltaX === null) {
      this.mouseDeltaX = clientX - this.mouseCurrentX;
      this.mouseDeltaY = this.mouseCurrentY - clientY;
    } else {
      this.mouseDeltaX += clientX - this.mouseCurrentX;
      this.mouseDeltaY += this.mouseCurrentY - clientY;
    }
    this.mouseCurrentX = clientX;
    this.mouseCurrentY = clientY;
    if (!this.mouseBtnPressed) {
      return;
    }
    btns.forEach(btn => {
      if (!this[btn].pressed) {
        return;
      }
      if (this[btn].startX === null) {
        this[btn].startX = clientX;
        this[btn].startY = clientY;
      } else {
        this[btn].endX = clientX;
        this[btn].endY = clientY;
      }
      if (this[btn].drag || Math.abs(this[btn].startX - clientX) > 20 || Math.abs(this[btn].startY - clientY) > 20) {
        this[btn].minX = this[btn].startX < this[btn].endX ? (this[btn].maxX = this[btn].endX, this[btn].startX) : (this[btn].maxX = this[btn].startX, this[btn].endX);
        this[btn].minY = this[btn].startY < this[btn].endY ? (this[btn].maxY = this[btn].endY, this[btn].startY) : (this[btn].maxY = this[btn].startY, this[btn].endY);
        this[btn].drag = true;
      }
    });
  }

  handleMouseWheel = event => {
    this.mouseScroll = this.mouseScroll === null ? event.deltaY : this.mouseScroll + event.deltaY;
  }

  handleKeyDown = event => {
    if (!this.keys.includes(event.key)) {
      this.keys.push(event.key);
    }
  }

  handleKeyUp = event => {
    if (this.keys.includes(event.key)) {
      this.keys.splice(this.keys.indexOf(event.key), 1);
    }
  }

  clear () {
    btns.forEach(btn => {
      if (!this[btn].pressed) {
        this[btn].drag = false;
        this[btn].startX = null;
        this[btn].startY = null;
        this[btn].endX = null;
        this[btn].endY = null;
        this[btn].minX = null;
        this[btn].minY = null;
        this[btn].maxX = null;
        this[btn].maxY = null;
      }
    });
    this.mouseDeltaX = 0;
    this.mouseDeltaY = 0;
    this.mouseScroll = 0;
  }

}

const input = new Input();

windowMouseDownEvent.subscribe(input.handleMouseDown);
windowMouseUpEvent.subscribe(input.handleMouseUp);
windowMouseMoveEvent.subscribe(input.handleMouseMove);
windowWheelEvent.subscribe(input.handleMouseWheel);
windowKeyDownEvent.subscribe(input.handleKeyDown);
windowKeyUpEvent.subscribe(input.handleKeyUp);

export default input;
