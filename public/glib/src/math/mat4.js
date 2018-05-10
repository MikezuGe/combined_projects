import { Vec3, Mat3, } from './';


const { sin, cos, tan, } = Math;


export default class Mat4 {

  static get identity () {
    return new Mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    );
  }
  static fromArray (a) { return new Mat4(...a); }

  static perspective (fovrad, aspectRatio, near, far) {
    const f = 1.0 / tan(fovrad / 2);
    const rangeInv = 1 / (near - far);
    return new Mat4(
      f / aspectRatio, 0.0, 0.0, 0.0,
      0.0, f, 0.0, 0.0,
      0.0, 0.0, (near + far) * rangeInv, -1.0,
      0.0, 0.0, near * far * rangeInv * 2, 0.0,
    );
  }
  static orthographic (left, right, bottom, top, near, far) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    return new Mat4(
      2 * lr, 0, 0, 0,
      0, 2 * bt, 0, 0,
      0, 0, 2 * nf, 0,
      (left + right) * lr, (top + bottom) * bt, (far + near) * nf, 1,
    );
  }
  static lookAt (camPos, target, up) {
    const zAxis = camPos.sub(target).normalize;
    const xAxis = up.cross(zAxis);
    const yAxis = zAxis.cross(xAxis);
    return new Mat4(
      xAxis.x, xAxis.y, xAxis.z, 0.0,
      yAxis.x, yAxis.y, yAxis.z, 0.0,
      zAxis.x, zAxis.y, zAxis.z, 0.0,
      camPos.x, camPos.y, camPos.z, 1.0,
    );
  }
  static translate (x, y, z) {
    return new Mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      x, y, z, 1.0,
    );
  }
  static scale (w, h, d) {
    return new Mat4(
      w, 0.0, 0.0, 0.0,
      0.0, h, 0.0, 0.0,
      0.0, 0.0, d, 0.0,
      0.0, 0.0, 0.0, 1.0,
    );
  }
  static rotateX (angle) {
    const cos = cos(angle);
    const sin = sin(angle);
    return new Mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, cos, -sin, 0.0,
      0.0, sin, cos, 0.0,
      0.0, 0.0, 0.0, 1.0,
    );
  }
  static rotateY (angle) {
    const cos = cos(angle);
    const sin = sin(angle);
    return new Mat4(
      cos, 0.0, sin, 0.0,
      0.0, 1.0, 0.0, 0.0,
      -sin, 0.0, cos, 0.0,
      0.0, 0.0, 0.0, 1.0,
    );
  }
  static rotateZ (angle) {
    const cos = cos(angle);
    const sin = sin(angle);
    return new Mat4(
      cos, -sin, 0.0, 0.0,
      sin, cos, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    );
  }

  constructor (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    this.m00 = m00 || 0; this.m01 = m01 || 0; this.m02 = m02 || 0; this.m03 = m03 || 0;
    this.m10 = m10 || 0; this.m11 = m11 || 0; this.m12 = m12 || 0; this.m13 = m13 || 0;
    this.m20 = m20 || 0; this.m21 = m21 || 0; this.m22 = m22 || 0; this.m23 = m23 || 0;
    this.m30 = m30 || 0; this.m31 = m31 || 0; this.m32 = m32 || 0; this.m33 = m33 || 0;
  }

  get clone () {
    return new Mat4(
      this.m00, this.m01, this.m02, this.m03,
      this.m10, this.m11, this.m12, this.m13,
      this.m20, this.m21, this.m22, this.m23,
      this.m30, this.m31, this.m32, this.m33,
    );
  }
  get toArray () {
    return [
      this.m00, this.m01, this.m02, this.m03,
      this.m10, this.m11, this.m12, this.m13,
      this.m20, this.m21, this.m22, this.m23,
      this.m30, this.m31, this.m32, this.m33,
    ];
  }
  get toFloat32Array () {
    return new Float32Array([
      this.m00, this.m01, this.m02, this.m03,
      this.m10, this.m11, this.m12, this.m13,
      this.m20, this.m21, this.m22, this.m23,
      this.m30, this.m31, this.m32, this.m33,
    ]);
  }
  get toMat3 () {
    return new Mat3(
      this.m00, this.m01, this.m02,
      this.m10, this.m11, this.m12,
      this.m20, this.m21, this.m22,
    );
  }
  get toQuat () { return this.toMat3.toQuat; }

  add (v) {
    return new Mat4(
      this.m00 + v.m00, this.m01 + v.m01, this.m02 + v.m02, this.m03 + v.m03,
      this.m10 + v.m10, this.m11 + v.m11, this.m12 + v.m12, this.m13 + v.m13,
      this.m20 + v.m20, this.m21 + v.m21, this.m22 + v.m22, this.m23 + v.m23,
      this.m30 + v.m30, this.m31 + v.m31, this.m32 + v.m32, this.m33 + v.m33,
    );
  }
  sub (v) {
    return new Mat4(
      this.m00 - v.m00, this.m01 - v.m01, this.m02 - v.m02, this.m03 - v.m03,
      this.m10 - v.m10, this.m11 - v.m11, this.m12 - v.m12, this.m13 - v.m13,
      this.m20 - v.m20, this.m21 - v.m21, this.m22 - v.m22, this.m23 - v.m23,
      this.m30 - v.m30, this.m31 - v.m31, this.m32 - v.m32, this.m33 - v.m33,
    );
  }
  mul (v) {
    return new Mat4(
      v.m00 * this.m00 + v.m01 * this.m10 + v.m02 * this.m20 + v.m03 * this.m30,
      v.m00 * this.m01 + v.m01 * this.m11 + v.m02 * this.m21 + v.m03 * this.m31,
      v.m00 * this.m02 + v.m01 * this.m12 + v.m02 * this.m22 + v.m03 * this.m32,
      v.m00 * this.m03 + v.m01 * this.m13 + v.m02 * this.m23 + v.m03 * this.m33,

      v.m10 * this.m00 + v.m11 * this.m10 + v.m12 * this.m20 + v.m13 * this.m30,
      v.m10 * this.m01 + v.m11 * this.m11 + v.m12 * this.m21 + v.m13 * this.m31,
      v.m10 * this.m02 + v.m11 * this.m12 + v.m12 * this.m22 + v.m13 * this.m32,
      v.m10 * this.m03 + v.m11 * this.m13 + v.m12 * this.m23 + v.m13 * this.m33,

      v.m20 * this.m00 + v.m21 * this.m10 + v.m22 * this.m20 + v.m23 * this.m30,
      v.m20 * this.m01 + v.m21 * this.m11 + v.m22 * this.m21 + v.m23 * this.m31,
      v.m20 * this.m02 + v.m21 * this.m12 + v.m22 * this.m22 + v.m23 * this.m32,
      v.m20 * this.m03 + v.m21 * this.m13 + v.m22 * this.m23 + v.m23 * this.m33,

      v.m30 * this.m00 + v.m31 * this.m10 + v.m32 * this.m20 + v.m33 * this.m30,
      v.m30 * this.m01 + v.m31 * this.m11 + v.m32 * this.m21 + v.m33 * this.m31,
      v.m30 * this.m02 + v.m31 * this.m12 + v.m32 * this.m22 + v.m33 * this.m32,
      v.m30 * this.m03 + v.m31 * this.m13 + v.m32 * this.m23 + v.m33 * this.m33,
    );
  }
  get invert () {
    const { m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33 } = this;
    const a00 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
    const a10 = -m10 * m22 * m33 + m10 * m23 * m32 + m20 * m12 * m33 - m20 * m13 * m32 - m30 * m12 * m23 + m30 * m13 * m22;
    const a20 = m10 * m21 * m33 - m10 * m23 * m31 - m20 * m11 * m33 + m20 * m13 * m31 + m30 * m11 * m23 - m30 * m13 * m21;
    const a30 = -m10 * m21 * m32 + m10 * m22 * m31 + m20 * m11 * m32 - m20 * m12 * m31 - m30 * m11 * m22 + m30 * m12 * m21;

    let det = m00 * a00 + m01 * a10 + m02 * a20 + m03 * a30;
    if (det === 0) {
      throw new Error(`Cannot invert matrix: ${m}`);
    }
    det = 1.0 / det;

    return new Mat4(
      det * a00,
      det * -m01 * m22 * m33 + m01 * m23 * m32 + m21 * m02 * m33 - m21 * m03 * m32 - m31 * m02 * m23 + m31 * m03 * m22,
      det * m01 * m12 * m33 - m01 * m13 * m32 - m11 * m02 * m33 + m11 * m03 * m32 + m31 * m02 * m13 - m31 * m03 * m12,
      det * -m01 * m12 * m23 + m01 * m13 * m22 + m11 * m02 * m23 - m11 * m03 * m22 - m21 * m02 * m13 + m21 * m03 * m12,
      det * a10,
      det * m00 * m22 * m33 - m00 * m23 * m32 - m20 * m02 * m33 + m20 * m03 * m32 + m30 * m02 * m23 - m30 * m03 * m22,
      det * -m00 * m12 * m33 + m00 * m13 * m32 + m10 * m02 * m33 - m10 * m03 * m32 - m30 * m02 * m13 + m30 * m03 * m12,
      det * m00 * m12 * m23 - m00 * m13 * m22 - m10 * m02 * m23 + m10 * m03 * m22 + m20 * m02 * m13 - m20 * m03 * m12,
      det * a20,
      det * -m00 * m21 * m33 + m00 * m23 * m31 + m20 * m01 * m33 - m20 * m03 * m31 - m30 * m01 * m23 + m30 * m03 * m21,
      det * m00 * m11 * m33 - m00 * m13 * m31 - m10 * m01 * m33 + m10 * m03 * m31 + m30 * m01 * m13 - m30 * m03 * m11,
      det * -m00 * m11 * m23 + m00 * m13 * m21 + m10 * m01 * m23 - m10 * m03 * m21 - m20 * m01 * m13 + m20 * m03 * m11,
      det * a30,
      det * m00 * m21 * m32 - m00 * m22 * m31 - m20 * m01 * m32 + m20 * m02 * m31 + m30 * m01 * m22 - m30 * m02 * m21,
      det * -m00 * m11 * m32 + m00 * m12 * m31 + m10 * m01 * m32 - m10 * m02 * m31 - m30 * m01 * m12 + m30 * m02 * m11,
      det * m00 * m11 * m22 - m00 * m12 * m21 - m10 * m01 * m22 + m10 * m02 * m21 + m20 * m01 * m12 - m20 * m02 * m11,
    );
  }
  get transpose () {
    return new Mat4(
      this.m00, this.m10, this.m20, this.m30,
      this.m01, this.m11, this.m21, this.m31,
      this.m02, this.m12, this.m22, this.m32,
      this.m03, this.m13, this.m23, this.m33,
    );
  }

  get translation () {
    return new Vec3(this.m30, this.m31, this.m32);
  }
  get scale () {
    return new Vec3(
      new Vec3(this.m00, this.m10, this.m20).len,
      new Vec3(this.m01, this.m11, this.m21).len,
      new Vec3(this.m02, this.m12, this.m22).len
    );
  }
  get rotation () {
    return new Mat3(
      this.m00, this.m01, this.m02,
      this.m10, this.m11, this.m12,
      this.m20, this.m21, this.m22,
    );
  }

}
