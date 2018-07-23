import 'style.css';
import ResourceLoader from 'core/ResourceLoader';
import Scene from 'core/Scene';
import Renderer from 'renderer/renderer';


const resourceLoader = new ResourceLoader();
resourceLoader.getResource('scene.cnf', sceneSource => {
  const scene = Scene.createScene(sceneSource, resourceLoader);
  const renderer = new Renderer();
  const animFrame = function () {
    //requestAnimationFrame(animFrame);
    renderer.renderScene(scene);
  }
  //requestAnimationFrame(animFrame);
  setInterval(animFrame, 500);
});
