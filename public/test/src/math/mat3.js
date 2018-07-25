import { Mat4, Quat, } from '.';


const { sqrt, } = Math


export default class Mat3 {

  static get identity () {
    return new Mat3(
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,
    );
  }

  static fromArray = m => new Mat3(...m);

  constructor (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    this.m00 = m00; this.m01 = m01; this.m02 = m02;
    this.m10 = m10; this.m11 = m11; this.m12 = m12;
    this.m20 = m20; this.m21 = m21; this.m22 = m22;
  }

  get clone () {
    return new Mat3(
      this.m00, this.m01, this.m02,
      this.m10, this.m11, this.m12,
      this.m20, this.m21, this.m22,
    );
  }

  get toArray () {
    return [
      this.m00, this.m01, this.m02,
      this.m10, this.m11, this.m12,
      this.m20, this.m21, this.m22,
    ];
  }

  get toFloat32Array () {
    return new Float32Array([
      this.m00, this.m01, this.m02,
      this.m10, this.m11, this.m12,
      this.m20, this.m21, this.m22,
    ]);
  }

  get toMat4 () {
    return new Mat4(
        this.m00, this.m01, this.m02, 0.0,
        this.m10, this.m11, this.m12, 0.0,
        this.m20, this.m21, this.m22, 0.0,
        0.0, 0.0, 0.0, 1.0,
    );
  }

  get toQuat () {
    const trace = this.m00 + this.m11 + this.m22;
    let s;
    if (trace > 0) {
      s = 0.5 / sqrt(trace + 1.0);
      return new Quat(0.25 / s, (this.m21 - this.m12) * s, (this.m02 - this.m20) * s);
    }
    if (this.m00 > this.m11 && this.m00 > this.m22) {
      s = 2.0 * sqrt(1.0 + this.m00 - this.m11 - this.m22);
      return new Quat((this.m21 - this.m12) / s, 0.25 * s, (this.m01 + this.m10) / s, (this.m02 + this.m20) / s);
    } else if (this.m11 > this.m22) {
      s = 2.0 * sqrt(1.0 + this.m11 - this.m00 - this.m22);
      return new Quat((this.m02 - this.m20) / s, (this.m01 + this.m10) / s, 0.25 * s, (this.m12 + this.m21) / s);
    }
    s = 2.0 * sqrt(1.0 + this.m22 - this.m00 - this.m11);
    return new Quat((this.m10 - this.m01) / s, (this.m02 + this.m20) / s, (this.m12 + this.m21) / s);
  }

  multiplyVector (v) {
    return new Mat3(
      this.m00 * v.x + this.m01 * v.y + this.m02 * v.z,
      this.m10 * v.x + this.m11 * v.y + this.m12 * v.z,
      this.m20 * v.x + this.m21 * v.y + this.m22 * v.z,
    );
  }

  add (m) {
    return new Mat3(
      this.m00 + m.m00, this.m01 + m.m01, this.m02 + m.m02,
      this.m10 + m.m10, this.m11 + m.m11, this.m12 + m.m12,
      this.m20 + m.m20, this.m21 + m.m21, this.m22 + m.m22,
    );
  }

  sub (m) {
    return new Mat3(
      this.m00 - m.m00, this.m01 - m.m01, this.m02 - m.m02,
      this.m10 - m.m10, this.m11 - m.m11, this.m12 - m.m12,
      this.m20 - m.m20, this.m21 - m.m21, this.m22 - m.m22,
    );
  }

  mul (m) {
    const a00 = this.m01; const a01 = this.m02; const a02 = this.m03;
    const a10 = this.m11; const a11 = this.m12; const a12 = this.m13;
    const a20 = this.m21; const a21 = this.m22; const a22 = this.m23;
    const b00 = m.m01; const b01 = m.m02; const b02 = m.m03;
    const b10 = m.m11; const b11 = m.m12; const b12 = m.m13;
    const b20 = m.m21; const b21 = m.m22; const b22 = m.m23;
    return new Mat3(
      a00 * b00 + a01 * b10 + a02 * b20,
      a00 * b01 + a01 * b11 + a02 * b21,
      a00 * b02 + a01 * b12 + a02 * b22,
      a10 * b00 + a11 * b10 + a12 * b20,
      a10 * b01 + a11 * b11 + a12 * b21,
      a10 * b02 + a11 * b12 + a12 * b22,
      a20 * b00 + a21 * b10 + a22 * b20,
      a20 * b01 + a21 * b11 + a22 * b21,
      a20 * b02 + a21 * b12 + a22 * b22,
    );
  }

}
