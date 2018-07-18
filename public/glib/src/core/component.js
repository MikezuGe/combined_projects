
export default class Component {

  constructor (node) {
    this.node = node;
  }

  remove () {
    this.node.removeComponent(this);
  }

}
