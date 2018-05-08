
class SceneNode {

  constructor (scene, parent) {
    this.children = [];
    this.components = [];
    this.scene = scene;
    this.parent = parent;
  }

  addChild () {
    const node = new SceneNode(this.scene, this);
    this.scene.addToNodeRegister(node);
    this.children.push(node);
    return node;
  }

  removeChild (node) {
    node.scene = null;
    node.parent = null;
    this.scene.removeFromNodeRegister(node);
    this.children.splice(this.children.indexOf(node), 1);
  }

  addComponent (type) {
    const component = new [type]();
    this.scene.addToComponentRegister(component);
    this.components.push(component);
    return component;
  }

  removeComponent (component) {
    this.scene.removeFromComponentRegister(component);
    this.components.splice(this.components.indexOf(component), 1);
  }

  remove () {
    for (const child of this.children) {
      child.remove();
    }
    while (this.components.length > 0) {
      this.components[this.components.length - 1].remove();
    }
    this.parent.removeChild(this);
  }

  walkEnabled (fn) {
    for (const child of this.children) {
      child.walkEnabled(fn);
      fn(this);
    }
  }

}


export default SceneNode;
