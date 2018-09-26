import Component from './Component';
import { Mat4, Vec3, Quat, } from '../math';
import { windowResizeEvent } from '../core/Event';
import input from '../core/Input';


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
    if (!this.inControl) {
      return;
    }

    const keys = input.getKeys();
    const dx = keys.includes('d') ? 0.1 : keys.includes('a') ? -0.1 : 0.0
    const dy = keys.includes('e') ? 0.1 : keys.includes('q') ? -0.1 : 0.0
    const dz = keys.includes('s') ? 0.1 : keys.includes('w') ? -0.1 : 0.0

    const { transform, } = this.node;
    if (dx !== 0 || dy !== 0 || dz !== 0) {
      const translation = transform.forward.scale(dz).add(transform.right.scale(dx)).add(transform.up.scale(dy));
      transform.translateTo(translation);
    }

    const mouse = input.getMouse();
    if (mouse.dx !== 0 || mouse.dy !== 0) {
      const qx = Quat.fromAxisAngle(transform.right, - mouse.dy * 0.005);
      const qy = Quat.fromAxisAngle(Vec3.up, mouse.dx * 0.005)
      transform.rotateTo(qx.mul(qy));
    }

  }

  remove () {
    this.node.removeComponent(this);
  }

}
