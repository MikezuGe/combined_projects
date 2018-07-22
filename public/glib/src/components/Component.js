
export default class Component {

  constructor (node) {
    this.node = node;
  }

  remove () {
    this.removeReferences();
    this.node.removeComponent(this);
  }

}
