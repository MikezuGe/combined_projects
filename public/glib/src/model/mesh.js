import Resource from '../core/resource';
import Geometry from './geometry';
import { Vec3, Vec2, } from '../math';


const generateGeometries = ind => {
  const geometries = [];
  let count = 0;
  const regex = /[a-z_]+(?:\.\w+)?/i;
  geometries.push(new Geometry(0, null));
  if (regex.test(ind[0])) {
    ind.splice(0, 1);
  }
  for (let i = 0; i < ind.length; i += 1) {
    if (regex.test(ind[i])) {
      ind.splice(i, 1);
      geometries[geometries.length - 1].vertexCount = count * 3;
      geometries.push(new Geometry(i * 3, null));
      count = 0;
      i -= 1;
      continue;
    }
    count += 1;
  }
  geometries[geometries.length - 1].count = count * 3;
  return geometries;
}
const generateNormals = (vertices, indices, hasTexCoords) => {
  const normals = [];
  const newIndices = [];
  if (indices) {
    const il = indices.length;
    if (hasTexCoords) {
      for (let i = 0; i < il; i += 6) {
        const normal = vertices[indices[i + 0]].getNormal(vertices[indices[i + 2]], vertices[indices[i + 4]]);
        normals.push(normal, normal, normal);
        newIndices.push(
          indices[i + 0],
          indices[i + 1],
          i / 2 + 0,
          indices[i + 2],
          indices[i + 3],
          i / 2 + 1,
          indices[i + 4],
          indices[i + 5],
          i / 2 + 2
        );
      }
    } else {
      for (let i = 0; i < il; i += 3) {
        const normal = vertices[indices[i + 0]].getNormal(vertices[indices[i + 1]], vertices[indices[i + 2]]);
        normals.push(normal, normal, normal);
        newIndices.push(
          indices[i + 0],
          normalIndice, i + 0,
          indices[i + 1],
          normalIndice, i + 1, indices[i + 2], normalIndice, i + 2
        );
      }
    }
  } else {
    const vl = vertices.length;
    for (let i = 0; i < vl; i += 3) {
      const normal = vertices[i + 0].getNormal(vertices[i + 1], vertices[i + 2]);
      normals.push(normal, normal, normal);
    }
  }
  return { normals, indices: newIndices};
}


class Mesh extends Resource {

  static parse (resource, data) {
    const vertices = [];
    const texCoords = [];
    const normals = [];
    const indices = [];

    const nextLine = /^(\w+) (.+)$/gm;
    const allFloats = /-?\d+\.\d+/g;
    const allInts = /\d+/g;
    let line = '';
    while ((line = lineRegEx.exec(nextLine))) {
      switch (line[1]) {
        // Vertice
        case 'v': vertices.push(new Vec3(...line[2].match(allFloats).map(parseFloat))); break;
        // Texturecoordinate
        case 'vt': texCoords.push(new Vec2(...line[2].match(allFloats).map(parseFloat))); break;
        // Normal
        case 'vn': normals.push(new Vec3(...line[2].match(allFloats).map(parseFloat))); break;
        // Indices for next 3 vertices
        case 'f': indices.push(...line[2].match(allInts).map(num => parseInt(num, 10) - 1)); break;
        // Point where material usage starts
        case 'g': indices.push(line[2]); break;
        // Comment
        case '#': break;
        // Object name
        case 'o': break;
        // Name to switch to at this point of indices
        case 'usemtl': break;
        // Smooth shading 1 (on) or off (off)
        case 's': break;
        // Materials library and filename
        case 'mtllib': break;
        // For now log if there is unknown line start
        default: throw new Error(row);
      }
    }

    const geometries = generateGeometries(indices);

    if (vertices.length > 0) {
      attributes.push('a_position');
    }
    const hasTexCoords = texCoords.length > 0;
    if (hasTexCoords) {
      attributes.push('a_texcoord');
    }
    if (normals.length === 0) {
      normals.push(generateNormals(vertices, indices.length > 0 ? indices : null, hasTexCoords));
    }
    attributes.push('a_normal');
  }

  constructor (url) {
    super(url);
    this.vertexBuffer = null;
    this.indexBuffer = null;
  }

}


export default Mesh;
