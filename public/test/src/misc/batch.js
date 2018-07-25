
export class GeometryBatch {

  constructor (geometry, material, worldTransform) {
    // Geometry of this batch
    this.geometry = geometry || null;
    // Material of this batch
    this.material = material || null;
    // Transforms of where to render this geometry
    this.worldTransforms = [ worldTransform, ];
  }

}


export class LightBatch {

  constructor (type, color, range, diffuseStrength, specularStrength, shininess, worldTransform) {
    // The type of lightsource
    this.type = type || null;
    // Color of light
    this.color = [ color, ];
    // Maximum range of light
    this.range = [ range, ];
    // Strength of light
    this.diffuseStrength = [ diffuseStrength, ];
    this.specularStrength = [ specularStrength, ];
    this.shininess = [ shininess, ];
    // Location and rotation of light
    this.worldTransforms = [ worldTransform, ];
  }

}