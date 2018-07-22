import Component from './Component';


export default class Model extends Component {

  constructor (node) {
    super(node);
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
    return this.materials.length ? this.materials : null;
  }

  removeReferences () {
    this.mesh = null;
    this.materials.length = 0;
  }

}
