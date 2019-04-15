import World from './World';
import { Renderer, } from './Renderer';

import { setGlobalStyle, } from './utility';

setGlobalStyle(`
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
`);


window.addEventListener('keyup', e => {
  if (e.key === 'p') {
    updTime += updTime < 20 ? 1 : 0;
  } else if (e.key === 'o') {
    updTime -= updTime > 0 ? 1 : 0;
  }
}, false)
let updTime = 3;

const world = new World(/*190, 75*/50, 50);
const renderer = new Renderer();
renderer.setupWorldRender(world);
//renderer.renderWorld(world);
const frame = () => { // eslint-disable-line
  requestAnimationFrame(frame);
  for (let i = 0; i < updTime; i++)
    world.update();
  renderer.renderWorld(world);
}
requestAnimationFrame(frame);
//setInterval(frame, 1000);
