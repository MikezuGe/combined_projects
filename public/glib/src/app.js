import Scene from './core/scene';
import './style.css';


const scene = new Scene();
let node = scene.addChild();
scene.getResource('monkey.obj');
scene.getResource('puppy.png');
