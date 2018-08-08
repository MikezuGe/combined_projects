import Scene from 'core/Scene';
import ResourceManager from 'core/ResourceManager';
import Renderer from 'rendering/Renderer';


const scene = new Scene();
const resourceManager = new ResourceManager();
const renderer = new Renderer(resourceManager);


const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');


export default class Glib {

  constructor ({ elementId, canvasId, width, height, }) {
    canvas.id = canvasId || 'canvas';
    canvas.width = width || window.innerWidth;
    canvas.height = height || window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    const element = document.getElementById(elementId || 'root');
    element.appendChild(canvas);
  }
  
  createScene (url) {
    resourceManager.getResource(url, sceneResource => {
      scene.buildFromResource(sceneResource, resourceManager);
      const frame = () => {
        const nextFrame = requestAnimationFrame(frame);
        scene.update();
        renderer.renderScene(scene);
      }
      requestAnimationFrame(frame);
      /*
      setTimeout(() => {
        renderer.renderScene(scene);
      }, 2000);
      */
      console.log(scene); // eslint-disable-line
    });
  }

}


export {
  gl
};
