import gl from 'core/gl'
import { Vec3, Vec2, } from 'math';
import Resource from './Resource';
import Geometry from 'renderer/Geometry';


const getAttributeInfo = attributes => {
  const attr = [];
  let offset = 0;
  attributes.forEach(attribute => {
    switch (attribute) {
      case 'a_position': attr.push({ name: 'a_position', vertices: 3, offset, }); offset += 3; break;
      case 'a_texcoord': attr.push({ name: 'a_texcoord', vertices: 2, offset, }); offset += 2; break;
      case 'a_normal': attr.push({ name: 'a_normal', vertices: 3, offset, }); offset += 3; break;
      case 'a_tangent': attr.push({ name: 'a_tangent', vertices: 3, offset, }); offset += 3; break;
      case 'a_bitangent': attr.push({ name: 'a_bitangent', vertices: 3, offset, }); offset += 3; break;
      default: throw new Error(`Unknown mesh attribute name: ${attribute}`);
    }
  });
  return attr;
}


const calculateVertexSize = attributes => {
  let size = 0;
  attributes.forEach(attribute => {
    switch (attribute) {
      case 'a_position': size += 3; break;
      case 'a_texcoord': size += 2; break;
      case 'a_normal': size += 3; break;
      case 'a_tangent': size += 3; break;
      case 'a_bitangent': size += 3; break;
      default: throw new Error(`Unknown mesh attribute: ${attribute}`);
    }
  });
  return size;
}


const generateGeometries = (geometries, indices, hasTexCoords) => {
  // Expects indices to contain indices for position and normals, optionally for texturecoordinates
  // Geometries are expected to be split at vertice that can be divided by 3
  let count = 0;
  const increment = hasTexCoords ? 9 : 6;
  const isWordRegEx = /[a-z_]+(?:\.\w+)?/i;
  geometries.push(new Geometry(0, null));
  if (isWordRegEx.test(indices[0])) {
    indices.splice(0, 1);
  }
  for (let i = 0; i < indices.length; i += increment) {
    if (isWordRegEx.test(indices[i])) {
      indices.splice(i, 1);
      geometries[geometries.length - 1].vertexCount = count * 3;
      geometries.push(new Geometry(i * 3, null));
      count = 0;
      i -= 1;
      continue;
    }
    count += 1;
  }
  geometries[geometries.length - 1].vertexCount = count * 3;
};


const generateNormals = (normals, indices, vertices, hasTexCoords) => {
  if (indices && indices.length > 0) {
    if (hasTexCoords) {
      const newil = indices.length / 2 * 3;
      for (let i = 0; i < newil; i += 9) {
        const normalIndice = i / 9;
        normals.push(vertices[indices[i + 0]].getNormal(vertices[indices[i + 2]], vertices[indices[i + 4]]));
        indices.splice(i + 2, 0, normalIndice);
        indices.splice(i + 5, 0, normalIndice);
        indices.splice(i + 8, 0, normalIndice);
      }
    } else {
      const newil = indices.length * 2;
      for (let i = 0; i < newil; i += 6) {
        const normalIndice = i / 6;
        normals.push(vertices[indices[i + 0]].getNormal(vertices[indices[i + 1]], vertices[indices[i + 2]]));
        indices.splice(i + 1, 0, normalIndice);
        indices.splice(i + 3, 0, normalIndice);
        indices.splice(i + 5, 0, normalIndice);
      }
    }
  } else {
    const vl = vertices.length;
    for (let i = 0; i < vl; i += 3) {
      const normal = vertices[i + 0].getNormal(vertices[i + 1], vertices[i + 2]);
      normals.push(normal, normal, normal);
    }
  }
};


const generateTanAndBitan = (tangents, bitangents, vertices, texCoords, indices) => {
  // Expects indices to contain indices for position, texturecoordinates and normals
  const newil = indices.length / 3 * 5;
  for (let i = 0; i < newil; i += 15) {
    const v1 = vertices[indices[i + 0]];
    const v2 = vertices[indices[i + 3]];
    const v3 = vertices[indices[i + 6]];
    const w1 = texCoords[indices[i + 1]];
    const w2 = texCoords[indices[i + 4]];
    const w3 = texCoords[indices[i + 7]];

    const x1 = v2.x - v1.x;
    const x2 = v3.x - v1.x;
    const y1 = v2.y - v1.y;
    const y2 = v3.y - v1.y;
    const z1 = v2.z - v1.z;
    const z2 = v3.z - v1.z;

    const s1 = w2.x - w1.x;
    const s2 = w3.x - w1.x;
    const t1 = w2.y - w1.y;
    const t2 = w3.y - w1.y;

    const r = 1.0 / (s1 * t2 - s2 * t1);
    const tan = new Vec3((t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r).normalize;
    const bitan = new Vec3((s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r).normalize;

    tangents.push(tan);
    bitangents.push(bitan);
    const newIndice = i / 15;
    indices.splice(i + 3, 0, newIndice, newIndice);
    indices.splice(i + 8, 0, newIndice, newIndice);
    indices.splice(i + 13, 0, newIndice, newIndice);
  }
}


const uploadToGPU = (vertexData, indices) => {
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
  const indiceBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  return { vertexBuffer, indiceBuffer, };
}


class Mesh extends Resource {

  static parse(resource, data) {
    const vertices = [];
    const texCoords = [];
    const normals = [];
    const tangents = [];
    const bitangents = [];
    const indices = [];

    const geometries = [];
    const attributes = [];
    const vertexData = [];

    const nextLine = /^(\w+) (.+)$/gm;
    const allFloats = /-?\d+\.\d+/g;
    const allInts = /\d+/g;
    let row = '';

    if (typeof data === 'object') {
      // Generated vertexdata, must have texturecoordinates
      const vertexDataLength = data.vertexData.length;
      for (let i = 0; i < vertexDataLength; i += 2) {
        vertices.push(data.vertexData[i + 0]);
        texCoords.push(data.vertexData[i + 1]);
      }
      indices.push(...data.indices);
    } else {
      // From file
      const parseRow = {
        'v': aRow => { vertices.push(new Vec3(...aRow[2].match(allFloats).map(parseFloat))); }, // Vertice
        'vt': aRow => { texCoords.push(new Vec2(...aRow[2].match(allFloats).map(parseFloat))); }, // Texturecoordinate
        'vn': aRow => { normals.push(new Vec3(...aRow[2].match(allFloats).map(parseFloat))); }, // Normal
        'f': aRow => { indices.push(...aRow[2].match(allInts).map(num => parseInt(num, 10) - 1)); }, // Indices for next 3 vertices
        'g': aRow => { indices.push(aRow[2]); }, // Point where material usage starts
        '#': aRow => { aRow }, // Comment
        'o': aRow => { aRow }, // Object name
        'usemtl': aRow => { aRow }, // Material to switch to at this point of indices
        's': aRow => { aRow }, // Smooth shading 1 (on) or off (off)
        'mtllib': aRow => { aRow }, // Materials library and filename
      }
      while ((row = nextLine.exec(data))) {
        try {
          parseRow[row[1]](row);
        } catch (err) {
          // For now throw if there is an unknown row start
          throw new Error('Failed at parsing mesh file row.', row, err);
        }
      }
    }

    if (vertices.length) {
      attributes.push('a_position');
    }
    const hasTexCoords = !!texCoords.length;
    if (hasTexCoords) {
      attributes.push('a_texcoord');
    }

    generateGeometries(geometries, indices, hasTexCoords);
    geometries.forEach(g => { g.mesh = resource; });

    if (!normals.length) {
      generateNormals(normals, indices, vertices, hasTexCoords);
    }
    attributes.push('a_normal');

    if (hasTexCoords) {
      generateTanAndBitan(tangents, bitangents, vertices, texCoords, indices);
      attributes.push('a_tangent', 'a_bitangent');
    }

    if (texCoords) {
      const il = indices.length;
      for (let i = 0; i < il; i += 5) {
        vertexData.push(...vertices[indices[i + 0]].toArray);
        vertexData.push(...texCoords[indices[i + 1]].toArray);
        vertexData.push(...normals[indices[i + 2]].toArray);
        vertexData.push(...tangents[indices[i + 3]].toArray);
        vertexData.push(...bitangents[indices[i + 4]].toArray);
      }
    } else {
      const il = indices.length;
      for (let i = 0; i < il; i += 2) {
        vertexData.push(...vertices[indices[i + 0]].toArray);
        vertexData.push(...normals[indices[i + 2]].toArray);
      }
    }

    const buffers = uploadToGPU(new Float32Array(vertexData), new Int16Array(indices));

    resource.geometries = geometries;
    resource.attributes = getAttributeInfo(attributes);
    resource.vertexSize = calculateVertexSize(attributes);
    resource.vertexBuffer = buffers.vertexBuffer;
    resource.indiceBuffer = buffers.indiceBuffer;
  }

  constructor(url) {
    super(url);
    this.geometries = [];
    this.attributes = [];
    this.vertexSize = null;
    this.vertexBuffer = null;
    this.indiceBuffer = null;
  }

}


export default Mesh;
