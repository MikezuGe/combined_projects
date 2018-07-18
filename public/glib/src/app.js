import 'style.css';

import Scene from 'core/Scene';
import ResourceLoader from 'core/ResourceLoader';
//import Renderer from 'renderer';
import * as components from 'components';


const scene = Scene.createScene('configFileNameHere.txt');
let node = scene.addChild();
let component = node.addComponent(components.Model, 'monkey.png');
//const renderer = new Renderer(new ResourceLoader());
const resourceLoader = new ResourceLoader();
resourceLoader.getResource('puppy.png');
resourceLoader.getResource('monkey.obj');
