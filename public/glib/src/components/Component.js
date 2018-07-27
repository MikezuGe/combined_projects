
export default class Component {

  constructor (node, type) {
    this.node = node;
    this.type = type;
  }

  remove () {
    throw new Error(`Implement 'remove' method for component: ${this.constructor.name}.`);
  }

}
