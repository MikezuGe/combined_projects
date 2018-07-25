
export default class Component {

  constructor (node) {
    this.node = node;
  }

  remove () {
    throw new Error(`Implement 'remove' method for component: ${this.constructor.name}.`);
  }

}
