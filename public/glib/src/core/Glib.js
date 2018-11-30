import input from './Input';
import Scene from './Scene';
import ResourceManager from './ResourceManager';
import Renderer from '../rendering/Renderer';
import { windowResizeEvent, } from './Event';


const scene = new Scene();
const resourceManager = new ResourceManager();
const renderer = new Renderer(resourceManager);


const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');


export default class Glib {

  constructor ({ elementId, canvasId, }) {
    canvas.id = canvasId || 'canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    windowResizeEvent.subscribe(({ target: { innerWidth, innerHeight, }, }) => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      gl.viewport(0, 0, innerWidth, innerHeight);
    });
    const element = document.getElementById(elementId || 'root');
    element.appendChild(canvas);
  }
  
  createScene (url) {
    resourceManager.getResource(url, sceneResource => {
      scene.buildFromResource(sceneResource, resourceManager);
      const frame = () => {
        const nextFrame = requestAnimationFrame(frame); // eslint-disable-line
        scene.update();
        input.update();
        renderer.renderScene(scene);
      }
      requestAnimationFrame(frame);
      /*
      resourceManager.onLoadDone = () => {
        renderer.renderScene(scene);
      }
      */
      console.log(scene); // eslint-disable-line
    });
  }

}


export {
  gl,
};
