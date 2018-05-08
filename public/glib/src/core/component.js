
class Component {

  constructor (node) {
    this.node = node;
  }

  remove () {
    this.node.removeComponent(this);
  }

}


export default Component;
