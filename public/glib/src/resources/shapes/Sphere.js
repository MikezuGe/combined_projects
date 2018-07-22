import Mesh from '../Mesh';
import { Vec2, Vec3, } from 'math';

export default class Sphere extends Mesh {

  static generate = (resource, { radius, }) => {
    /*
    width /= 2;
    depth /= 2;
    let vertexData = [];
    let indices = [];
    let cInd = 0;
    for (let z = -depth; z < depth - 1; z += 1) {
      for (let x = -width; x < width - 1; x += 1) {
        // Bottom left triangle
        vertexData.push(new Vec3(x, 0.0, z));
        vertexData.push(new Vec2(0.0, 0.0));
        indices[cInd] = cInd;
        cInd += 1;
        vertexData.push(new Vec3(x, 0.0, z + 1));
        vertexData.push(new Vec2(0.0, 1.0));
        indices[cInd] = cInd;
        cInd += 1;
        vertexData.push(new Vec3(x + 1, 0.0, z + 1));
        vertexData.push(new Vec2(1.0, 1.0));
        indices[cInd] = cInd;
        cInd += 1;
        // Top right triangle
        vertexData.push(new Vec3(x, 0.0, z));
        vertexData.push(new Vec2(0.0, 0.0));
        indices[cInd] = cInd;
        cInd += 1;
        vertexData.push(new Vec3(x + 1, 0.0, z + 1));
        vertexData.push(new Vec2(1.0, 1.0));
        indices[cInd] = cInd;
        cInd += 1;
        vertexData.push(new Vec3(x + 1, 0.0, z));
        vertexData.push(new Vec2(1.0, 0.0));
        indices[cInd] = cInd;
        cInd += 1;
      }
    }
    resource.constructor.parse(resource, { vertexData, indices });
    */
  }

}