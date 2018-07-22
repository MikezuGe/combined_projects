import Transform from 'misc/Transform';


class SceneNode {

  constructor (scene, parent) {
    this.children = [];
    this.components = [];
    this.transform = new Transform(this);
    this.scene = scene || null;
    this.parent = parent || null;
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
    node.transfrom.node = null;
    node.transfrom = null;
    this.scene.removeFromNodeRegister(node);
    this.children.splice(this.children.indexOf(node), 1);
  }

  addComponent (Component) {
    const component = new Component(this);
    this.scene.addToComponentRegister(component);
    this.components.push(component);
    return component;
  }

  removeComponent (component) {
    component.node = null;
    this.scene.removeFromComponentRegister(component);
    this.components.splice(this.components.indexOf(component), 1);
  }

  remove () {
    const { children, components, parent, } = this;
    while (children.length) {
      children[children.length - 1].remove();
    }
    while (components.length) {
      components[components.length - 1].remove();
    }
    parent.removeChild(this);
  }

  walkEnabled (fn) {
    for (const child of this.children) {
      child.walkEnabled(fn);
      fn(this);
    }
  }

}


export default SceneNode;
