import Component from './Component';
import { Mat4, Vec3 } from 'math';
const { PI, } = Math;


export default class Camera extends Component {

  constructor (node) {
    super(node, 'Camera');
    this.active = true;
    this.inControl = true;
    this.node.transform.translation = new Vec3(0.0, 0.0, 5.0);
    //const ar = window.innerWidth / window.innerHeight;
    //this._perspective = Mat4.orthographic(-ar, ar, -1, 1, 0.01, 1000);
    this._perspective = Mat4.perspective(PI * 0.25, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.resize = () => {
      this.perspective = Mat4.perspective(PI * 0.25, window.innerWidth / window.innerHeight, 0.01, 1000);
    }
  }

  get view () {
    return this.node.transform.worldTransform;
  }

  set perspective (perspective) {
    this._perspective = perspective;
  }

  get perspective () {
    return this._perspective.clone;
  }

  update = () => {
    
  }

  remove () {
    this.node.removeComponent(this);
    this.node = null;
  }

}
