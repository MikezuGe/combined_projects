import Component from './Component';
import { Color, } from 'math';


export default class Light extends Component {

  constructor (node) {
    super(node);
    this.type = 'POINTLIGHT';
    this.color = Color.white;
    // 0 === Unlimited
    this.range = 0;
    this.diffuseStrength = 1.0;
    this.specularStrength = 1.0;
    this.shininess = 32.0;
    // TEMPORARY
    this.debug = false;
  }

  setAttributes (options) {
    for (let [ key, value, ] of Object.entires(options)) {
      if (this[key]) {
        this[key] = value;
      }
    }
  }

  removeReferences () {
    
  }

}
