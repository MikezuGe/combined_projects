import { windowResizeEvent, } from './Event';


let canvas = document.getElementById('canvas');
if (!canvas) {
  canvas = document.createElement('canvas');
  document.getElementById('root').appendChild(canvas);
}
const gl = canvas.getContext('webgl2');
(canvas.resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})();
(gl.resize = () => {
  gl.viewport(0, 0, window.innerWidth, window.innerHeight);
})();
windowResizeEvent.subscribe(canvas.resize, gl.resize);


export { canvas, };

export default gl;
