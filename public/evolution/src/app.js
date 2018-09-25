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
  width: 100%;
  height: 100%;
  background: gray;
}
`;


const world = new World(3, 3);
const renderer = new Renderer(world);
