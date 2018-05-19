import events from './events';


let canvas = document.getElementsByTagName('canvas')[0];
if (canvas) {
  canvas.remove();
} else {
  canvas = document.createElement('canvas');
}
canvas.resize = function () {
  canvas.width = (window.innerWidth / 2) | 0;
  canvas.height = (window.innerHeight / 2) | 0;
}
canvas.insertToRoot = function () {
  let root = document.getElementById('root');
  root.insertBefore(canvas, root.firstChild || null);
}
const ctx = canvas.getContext('2d');


events.subscribeTo('windowResize', canvas.resize);


export {
  canvas,
  ctx,
};
