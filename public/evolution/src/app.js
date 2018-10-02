import { injectGlobal, } from 'styled-components';

import World from './World';
import { Renderer, } from './Renderer';


injectGlobal`
* {
  font-family: 'Ubuntu', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}

html body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#root {
  width: 100%;
  height: 100%;
}

canvas {
  //width: 100%;
  //height: 100%;
  background: gray;
}
`;


const world = new World(10, 10);
const renderer = new Renderer();
renderer.setupWorldRender(world);
const frame = () => {
  requestAnimationFrame(frame);
  world.update();
  renderer.renderWorld(world);
}
//requestAnimationFrame(frame);
setInterval(frame, 1000);
