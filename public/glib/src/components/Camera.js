import Component from './Component';
import { Mat4, Vec3, Quat, } from 'math';
const { PI, } = Math;


export default class Camera extends Component {

  constructor (node) {
    super(node, 'Camera');
    this.active = true;
    this.inControl = true;
    const aspectRatio = window.innerWidth / window.innerHeight;
    this._perspective = Mat4.perspective(PI * 0.25, aspectRatio, 0.01, 1000);
    this._ortographic = Mat4.orthographic(-aspectRatio, aspectRatio, -1, 1, 0.01, 1000);
  }

  get view () { return this.node.transform.worldTransform; }

  //set perspective (perspective) { this._perspective = perspective; }
  get perspective () { return this._perspective.clone; }

  //set ortographic (ortographic) { this._ortographic = ortographic; }
  get ortographic () { return this._ortographic.clone; }

  resize () {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this._perspective = Mat4.perspective(PI * 0.25, aspectRatio, 0.01, 1000);
    this._ortographic = Mat4.orthographic(-aspectRatio, aspectRatio, -1, 1, 0.01, 1000);
  }

  update () {

  }

  remove () {
    this.node.removeComponent(this);
  }

}
