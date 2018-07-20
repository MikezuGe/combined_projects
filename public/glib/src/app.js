import 'style.css';

import resourceLoader from 'core/ResourceLoader';
//import Renderer from 'renderer';


//resourceLoader.getScene('scene.cnf');
const plane = resourceLoader.createShape('Plane', 10, 10);
console.log(plane);
