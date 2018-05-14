import { windowResizeEvent, } from './event';


const canvas = document.getElementById('canvas');
canvas.resize = function () {
  this.width = (window.innerWidth / 2) | 0;
  this.height = (window.innerHeight / 2) | 0;
}
const ctx = canvas.getContext('2d');


windowResizeEvent.subscribe(canvas.resize);


export {
  canvas,
  ctx,
};
