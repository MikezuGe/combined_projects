import Component from 'core/Component';


export default class Model extends Component {

  constructor (node) {
    super(node);
    this.mesh = null;
    this.materials = [];
  }

  addMaterial (material) {
    this.materials.push(material);
  }

}
