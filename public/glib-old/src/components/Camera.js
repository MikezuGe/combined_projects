import Component from './Component';
import { Mat4, } from 'math';
import { windowResizeEvent, } from 'core/event';


export default class Camera extends Component {

  constructor (node) {
    super(node);
    this.active = true;
    this.inControl = true;
    //const ar = window.innerWidth / window.innerHeight;
    //this._perspective = Mat4.orthographic(-ar, ar, -1, 1, 0.01, 1000);
    this._perspective = Mat4.perspective(Math.PI * 0.25, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.resize = () => {
      this.perspective = Mat4.perspective(Math.PI * 0.25, window.innerWidth / window.innerHeight, 0.01, 1000);
    }
    windowResizeEvent.subscribe(this.resize);
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
    /*
    if (!this.inControl) {
      return;
    }

    let tz = input["s"] ? 1.0 : (input["w"] ? -1.0 : 0.0);
    let tx = input["d"] ? 1.0 : (input["a"] ? -1.0 : 0.0);
    let ty = input["e"] ? 1.0 : (input["q"] ? -1.0 : 0.0);
    let transform = this.node.transform;
    // transform.translate --> this.node.transform
    transform.translate(
        Vec3.multiple(Vec3.add,
            Vec3.scale(transform.forward, tz * 0.05),
            Vec3.scale(transform.right, tx * 0.05),
            Vec3.scale(transform.up, ty * 0.05)));
    //if(input["Mouse1"]) {
    //    transform.rotate(Quat.mul(
    //        Quat.fromAxisAngle(transform.right, input["MouseDeltaY"] * 0.05),
    //        Quat.fromAxisAngle(Vec3.up, input["MouseDeltaX"] * 0.05)));
    //}
    let qTarget;
    if(input["Mouse1"]) {
        qTarget = Quat.multiple(Quat.mul,
            Quat.fromAxisAngle(transform.right, input["MouseDeltaY"] * 0.05),
            Quat.fromAxisAngle(Vec3.up, input["MouseDeltaX"] * 0.05),
            this.qTo
            );
    }
    //if(qTarget) {
    //    console.log(Quat.dot(qTarget, Quat.up));
    //}
    if(qTarget && Math.abs(Quat.dot(qTarget, Quat.up)) < 0.99) {
        this.qTo = qTarget;
        // transform.rotation --> this.node.transform.rotation
        transform.rotation = qTarget;
    }
    */
  }

  removeReferences () {
    windowResizeEvent.unsubscribe(this.resize);
  }

}