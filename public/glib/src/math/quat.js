import { Vec3, Mat3, } from '.';


const { sin, cos, acos, abs, sqrt, } = Math;


export default class Quat {

  static get identity () { return new Quat(1.000, 0.000, 0.000, 0.000); }
  static get up () { return new Quat(0.707, 0.707, 0.000, 0.000); }
  static get down () { return new Quat(0.707, -0.707, 0.000, 0.000); }
  static get left () { return new Quat(0.707, 0.000, 0.707, 0.000); }
  static get right () { return new Quat(0.707, 0.000, -0.707, 0.000); }
  static get backward () { return new Quat(0.000, 0.000, 1.000, 0.000); }
  static get upsideDown () { return new Quat(0.000, 0.000, 0.000, 1.000); }
  static get tiltLeft () { return new Quat(0.707, 0.000, 0.000, 0.707); }
  static get tiltRight () { return new Quat(0.707, 0.000, 0.000, -0.707); }

  static fromArray (a) { return new Quat(...a); }

  static fromEulers (x, y, z) {
    const c1 = cos(y * 0.5);
    const c2 = cos(z * 0.5);
    const c3 = cos(x * 0.5);
    const s1 = sin(y * 0.5);
    const s2 = sin(z * 0.5);
    const s3 = sin(x * 0.5);
    return new Quat(
      c1 * c2 * c3 - s1 * s2 * s3,
      c1 * c2 * s3 + s1 * s2 * c3,
      s1 * c2 * c3 + c1 * s2 * s3,
      c1 * s2 * c3 - s1 * c2 * s3,
    ).normalize;
  }

  static fromAxisAngle (axis, angle) {
    const r = 1 / axis.len;
    const s = sin(angle / 2);
    return new Quat(cos(angle / 2), s * axis.x * r, s * axis.y * r, s * axis.z * r).normalize;
  }

  static fromRotation (v1, v2) {
    // https://stackoverflow.com/a/1171995
    const half = v1.add(v2);
    const axis = v1.cross(half);
    const angle = v1.dot(half);
    return new Quat(angle, axis.x, axis.y, axis.z).normalize;
  }

  constructor (w, x, y, z) {
    this.w = w || 0.0;
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
  }

  get clone () { return new Quat(this.w, this.x, this.y, this.z); }

  get toArray () { return [ this.w, this.x, this.y, this.z, ]; }

  get toMat3 () {
    const { w, x, y, z, } = this;
    const xw = x * w;
    const xx = x * x;
    const xy = x * y;
    const xz = x * z;
    const yw = y * w;
    const yy = y * y;
    const yz = y * z;
    const zw = z * w;
    const zz = z * z;
    return new Mat3(
      1 - 2 * (yy + zz), 2 * (xy - zw), 2 * (xz + yw),
      2 * (xy + zw), 1 - 2 * (xx + zz), 2 * (yz - xw),
      2 * (xz - yw), 2 * (yz + xw), 1 - 2 * (xx + yy)
    );
  }

  get toMat4 () { return this.toMat3.toMat4; }

  get toEulers () { throw new Error('Quaternion toEuler not implemented'); }

  get len () { return sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z); }

  get lenSqrt () { return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z; }

  get conjugate () { return new Quat(this.w, -this.x, -this.y, -this.z); }

  get normalize () {
    let r = sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
    if (r > 0) {
      r = 1 / r;
      return new Quat(this.w * r, this.x * r, this.y * r, this.z * r);
    }
    return new Quat(1.0, 0.0, 0.0, 0.0);
  }

  get invert () {
    const r = 1 / this.len;
    return new Quat(this.w * r, -this.x * r, -this.y * r, -this.z * r);
  }

  mul (q) {
    const aw = this.w;
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    const bw = q.w;
    const bx = q.x;
    const by = q.y;
    const bz = q.z;
    return new Quat(
      aw * bw - ax * bx - ay * by - az * bz,
      ax * bw + aw * bx + ay * bz - az * by,
      ay * bw + aw * by + az * bx - ax * bz,
      az * bw + aw * bz + ax * by - ay * bx
    ).normalize;
  }
  dot (q) { return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z; }

  cross (q) { throw new Error(`Quaternion cross not implemented ${q}`); }

  scaleRotation (t) {
    // Redundant multiplication
    const angle = acos(this.w) * t;
    const axis = new Vec3(this.x, this.y, this.z).scale(sin(angle));
    return new Quat(cos(angle), axis.x, axis.y, axis.z);
  }

  lerp (q, t) { return t >= 1.0 ? q : this.scaleRotation(1 - t).multiply(q.scaleRotation(t)); }

  nlerp (q, t) { return this.lerp(q, t).normalize; }

  slerp (q, t) {
    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
    if (t <= 0.0) {
      return this;
    } else if (t >= 1.0) {
      return q;
    }
    // Calculate angle between a and b
    let cosHalfTheta = this.dot(q);
    // if a=b or a=-b then theta = 0 and we can return a
    if (abs(cosHalfTheta) >= 1.0) {
      return this;
    }

    if (cosHalfTheta < 0.0) {
      q.w = -q.w; q.x = -q.x; q.y = -q.y; q.z = -q.z;
      cosHalfTheta = -cosHalfTheta;
    }

    // Calculate temporary values
    const sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    // if theta = 180 degrees then result is not fully defined, we could rotate around any axis normal to a or b
    if (abs(sinHalfTheta) < 0.001) {
      return new Quat(
        (this.w + q.w) * 0.5,
        (this.x + q.x) * 0.5,
        (this.y + q.y) * 0.5,
        (this.z + q.z) * 0.5
      ).normalize;
    }

    const halfTheta = acos(cosHalfTheta);
    const ratioA = sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = sin(t * halfTheta) / sinHalfTheta;
    return new Quat(
      this.w * ratioA + q.w * ratioB,
      this.x * ratioA + q.x * ratioB,
      this.y * ratioA + q.y * ratioB,
      this.z * ratioA + q.z * ratioB
    ).normalize;
  }

}
