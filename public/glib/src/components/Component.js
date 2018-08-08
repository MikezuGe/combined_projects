
export default class Component {

  constructor (node, type) {
    this.node = node;
    this.type = type;
  }

  update () {
    throw new Error(`No update method implemented for a component type ${this.type}`);
  }

  remove () {
    throw new Error(`No remove method implemented for a component type ${this.type}`);
  }

}
