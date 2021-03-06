import { Vec3, Quat, Mat4, } from '../math';


export default class Transform {

  constructor (node) {
    this.node = node || null;

    this._targetTranslation = null;
    this._targetRotation = null;
    this._targetScale = null;
    this._origin = Vec3.zero;

    this._rotateAroundOrigin = false;

    this._localTranslation = Vec3.zero;
    this._localScale = Vec3.one;
    this._localRotation = Quat.identity;
    this._localTransformUnscaled = Mat4.identity;
    this._localTransform = Mat4.identity;

    this._worldTransformUnscaled = Mat4.identity;
    this._worldTransform = Mat4.identity;
    this._worldTransformDirty = true;
  }

  translateTo (translation) {
    this._targetTranslation = this._targetTranslation
      ? this._targetTranslation.add(translation)
      : this._localTranslation.add(translation);
  }

  rotateTo (rotation) {
    this._targetRotation = this._targetRotation
      ? this._targetRotation.mul(rotation)
      : this._localRotation.mul(rotation);
  }

  get right () {
    const { m00, m01, m02, } = this.worldTransform;
    return new Vec3(m00, m01, m02);
  }

  get up () {
    const { m10, m11, m12, } = this.worldTransform;
    return new Vec3(m10, m11, m12);
  }

  get forward () {
    const { m20, m21, m22, } = this.worldTransform;
    return new Vec3(m20, m21, m22);
  }

  set translation (translation) {
    this.setWorldTransformDirty();
    this._localTranslation = new Vec3(translation.x, translation.y, translation.z);
  }

  set rotation (rotation) {
    this.setWorldTransformDirty();
    this._localRotation = new Quat(rotation.w, rotation.x, rotation.y, rotation.z);
  }

  set scale (scale) {
    this.setWorldTransformDirty();
    this._localScale = new Vec3(scale.x, scale.y, scale.z);
  }

  set origin (origin) {
    this._rotateAroundOrigin = origin.lenSqrt !== 0;
    this._origin = origin;
  }

  // Local transformation getters
  get translation () {
    return this._targetTranslation || this._localTranslation;
  }

  get rotation () {
    return this._localRotation;
  }

  get scale () {
    return this._localScale;
  }

  get origin () {
    return this._origin;
  }

  // Only for getting 4x4 matrix of worldTransform (global) for rendering
  get worldTransform () {
    if (this._worldTransformDirty) {
      this.updateWorldTransform();
    }
    return this._worldTransform.clone;
  }

  get worldTransformUnscaled () {
    if (this._worldTransformDirty) {
      this.updateWorldTransform();
    }
    return this._worldTransformUnscaled.clone;
  }

  translate (translation) {
    this.setWorldTransformDirty();
    this._localTranslation = this._localTranslation.add(translation);
  }

  rotate (rotation) {
    this.setWorldTransformDirty();
    this._localRotation = this._localRotation.mul(rotation);
  }

  setWorldTransformDirty () {
    if (!this._worldTransformDirty) {
      this.node.walkEnabled(node => { node.transform._worldTransformDirty = true; });
    }
  }

  updateLocalTransform () {
    const transform = Mat4.identity;
    const translation = this._localTranslation;
    const rotation = this._localRotation.toMat3;
    const scale = this._localScale;
    transform.m00 = rotation.m00;
    transform.m01 = rotation.m01;
    transform.m02 = rotation.m02;
    transform.m10 = rotation.m10;
    transform.m11 = rotation.m11;
    transform.m12 = rotation.m12;
    transform.m20 = rotation.m20;
    transform.m21 = rotation.m21;
    transform.m22 = rotation.m22;
    if (this._rotateAroundOrigin) {
      const { x, y, z, } = this._origin;
      transform.m30 = x * rotation.m00 + y * rotation.m10 + z * rotation.m20 + translation.x;
      transform.m31 = x * rotation.m01 + y * rotation.m11 + z * rotation.m21 + translation.y;
      transform.m32 = x * rotation.m02 + y * rotation.m12 + z * rotation.m22 + translation.z;
    } else {
      transform.m30 = translation.x;
      transform.m31 = translation.y;
      transform.m32 = translation.z;
    }
    this._localTransformUnscaled = transform.clone;
    transform.m00 *= scale.x;
    transform.m01 *= scale.x;
    transform.m02 *= scale.x;
    transform.m10 *= scale.y;
    transform.m11 *= scale.y;
    transform.m12 *= scale.y;
    transform.m20 *= scale.z;
    transform.m21 *= scale.z;
    transform.m22 *= scale.z;
    this._localTransform = transform;
  }

  updateWorldTransform () {
    this.updateLocalTransform();
    if (this.node.parent) {
      this._worldTransformUnscaled = this.node.parent.transform.worldTransformUnscaled.mul(this._localTransformUnscaled);
      this._worldTransform = this.node.parent.transform.worldTransformUnscaled.mul(this._localTransform);
    } else {
      this._worldTransformUnscaled = this._localTransformUnscaled.clone;
      this._worldTransform = this._localTransform.clone;
    }
    this._worldTransformDirty = false;
  }

  update () {
    let shouldSetWorldTransformDirty = false;
    if (this._targetTranslation) {
      shouldSetWorldTransformDirty = true;
      this._localTranslation = this._localTranslation.lerp(this._targetTranslation, 0.1);
      if (this._targetTranslation.sub(this._localTranslation).lenSqrt < 0.000001) {
        this._localTranslation = this._targetTranslation;
        this._targetTranslation = null;
      }
    }
    if (this._targetRotation) {
      shouldSetWorldTransformDirty = true;
      this._localRotation = this._localRotation.nlerp(this._targetRotation, 0.1);
      if (this._targetRotation.dot(this._localRotation) > 0.999999) {
        this._localRotation = this._targetRotation;
        this._targetRotation = null;
      }
    }
    if (shouldSetWorldTransformDirty) {
      this.setWorldTransformDirty();
    }
  }

}
