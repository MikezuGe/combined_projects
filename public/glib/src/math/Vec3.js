const { sqrt, } = Math;


export default class Vec3 {

  static get zero () { return new Vec3(0, 0, 0 ); }
  static get up () { return new Vec3(0, 1, 0); }
  static get down () { return new Vec3(0, -1, 0); }
  static get left () { return new Vec3(-1, 0, 0); }
  static get right () { return new Vec3(1, 0, 0); }
  static get forward () { return new Vec3(0, 0, 1); }
  static get backward () { return new Vec3(0, 0, -1); }
  static get one () { return new Vec3(1, 1, 1); }

  static fromArray (a) { return new Vec3(...a); }

  static fromQuat (q) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const qx = q.x;
    const qy = q.y;
    const qz = q.z;
    const qw = q.w;
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;
    return new Vec3(
      ix * qw + iw * -qx + iy * -qz - iz * -qy,
      iy * qw + iw * -qy + iz * -qx - ix * -qz,
      iz * qw + iw * -qz + ix * -qy - iy * -qx
    );
  }

  static fromMat4 (m) {
    return new Vec3(
      m.a14 + m.a11 * this.x + m.a12 * this.y + m.a13 * this.z,
      m.a24 + m.a21 * this.x + m.a22 * this.y + m.a23 * this.z,
      m.a34 + m.a31 * this.x + m.a32 * this.y + m.a33 * this.z
    );
  }

  constructor (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  get forward () { return this.normalize; }
  get backward () { return this.normalize.invert; }
  get left () { return this.normalize.cross(Vec3.up).normalize; }
  get right () { return this.normalize.cross(Vec3.up).normalize.invert; }
  get down () { return this.normalize.cross(this.left).normalize; }
  get up () { return this.normalize.cross(this.left).normalize.invert; }

  get toArray () { return [ this.x, this.y, this.z, ]; }

  get toFloat32Array () { return new Float32Array([ this.x, this.y, this.z, ]); }

  get clone () { return new Vec3(this.x, this.y, this.z); }

  get len () { return sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }

  get lenSqrt() { return this.x * this.x + this.y * this.y + this.z * this.z; }

  get normalize () {
    let r = sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (r > 0) {
      r = 1 / r;
      return new Vec3(this.x * r, this.y * r, this.z * r);
    }
    return new Vec3(0, 0, 0);
  }

  get invert () { return new Vec3(-this.x, -this.y, -this.z); }
  
  add (v) { return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z); }

  sub (v) { return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z); }

  scale (f) { return new Vec3(this.x * f, this.y * f, this.z * f); }

  dot (v) { return this.x * v.x + this.y * v.y + this.z * v.z; }

  cross (v) {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  lerp (v, t) {
    return new Vec3(
      this.x + (v.x - this.x) * t,
      this.y + (v.y - this.y) * t,
      this.z + (v.z - this.z) * t
    )
  }

  getNormal (b, c) { return this.sub(b).cross(this.sub(c)).normalize; }

  getAngle (v) { return this.normalize.dot(v.normalize); }

}
