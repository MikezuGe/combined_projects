import Component from './Component';
import { Mat4, Vec3, Quat, } from 'math';
import { windowResizeEvent } from 'core/Event';
import input from 'core/Input';


const { PI, } = Math;


export default class Camera extends Component {

  constructor (node) {
    super(node, 'Camera');
    this.active = true;
    this.inControl = true;
    const aspectRatio = window.innerWidth / window.innerHeight;
    this._perspective = Mat4.perspective(PI * 0.25, aspectRatio, 0.01, 1000);
    this._ortographic = Mat4.orthographic(-aspectRatio, aspectRatio, -1, 1, 0.01, 1000);
    windowResizeEvent.subscribe(this.resize)
  }

  get view () { return this.node.transform.worldTransform; }

  //set perspective (perspective) { this._perspective = perspective; }
  get perspective () { return this._perspective.clone; }

  //set ortographic (ortographic) { this._ortographic = ortographic; }
  get ortographic () { return this._ortographic.clone; }

  resize = ({ target: { innerWidth, innerHeight, }}) => {
    const aspectRatio = innerWidth / innerHeight;
    this._perspective = Mat4.perspective(PI * 0.25, aspectRatio, 0.01, 1000);
    this._ortographic = Mat4.orthographic(-aspectRatio, aspectRatio, -1, 1, 0.01, 1000);
  }

  update () {
    const keys = input.getKeys();
    const { transform, } = this.node;
    if (keys.includes('w')) {
      transform.translate(transform.forward.scale(-0.1));
    } else if (keys.includes('s')) {
      transform.translate(transform.forward.scale(0.1));
    }
    if (keys.includes('d')) {
      transform.translate(transform.right.scale(0.1));
    } else if (keys.includes('a')) {
      transform.translate(transform.right.scale(-0.1));
    }
    if (keys.includes('e')) {
      transform.translate(transform.up.scale(0.1));
    } else if (keys.includes('q')) {
      transform.translate(transform.up.scale(-0.1));
    }

    const mouse = input.getMouse();

    const rotation = transform.rotation;
    transform.rotation = rotation.mul(Quat.fromEulers(
      0.0,
      mouse.dx * 0.005,
      0.0,
    ));
    

  }

  remove () {
    this.node.removeComponent(this);
  }

}
