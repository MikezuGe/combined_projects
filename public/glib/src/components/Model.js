import Component from './Component';
import { Vec3, Quat, } from 'math';


export default class Model extends Component {

  constructor (node) {
    super(node, 'Model');
    this.mesh = null;
    this.materials = [];
  }

  addMesh (mesh) {
    this.mesh = mesh;
  }

  addMaterial (material) {
    this.materials.push(material);
  }

  getGeometries () {
    return (this.mesh && this.mesh.geometries) || null;
  }
  
  getMaterials () {
    return (this.materials.length && this.materials) || null;
  }

  update () {
    
  }

  remove () {
    this.node.removeComponent(this);
    this.mesh = null;
    this.materials.length = 0;
  }

}
