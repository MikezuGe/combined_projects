import { Transform, } from 'misc';


export default class SceneNode {

  constructor (scene, parent) {
    this.scene = scene || null;
    this.parent = parent || null;
    this.transform = new Transform(this);
    this.children = [];
    this.components = [];
  }

  addChild () {
    const node = new SceneNode(this.scene, this);
    this.children.push(node);
    return node;
  }

  removeChild (node) {
    node.scene = null;
    node.parent = null;
    this.children.splice(this.children.indexOf(node), 1);
  }

  addComponent (Type) {
    const component = new Type(this);
    this.components.push(component);
    return component;
  }

  removeComponent (component) {
    this.components.splice(this.components.indexOf(component), 1);
  }

  remove () {
    const { children, components, } = this;
    while (children.length > 0) {
      children[children.length - 1].remove();
    }
    while (components.length > 0) {
      components[components.length - 1].remove();
    }
    this.scene = null;
    this.parent = null;
    this.transform.node = null;
    this.transform = null;
    this.parent.removeChild(this);
  }

  walkEnabled (fn) {
    for (const child of this.children) {
      child.walkEnabled(fn);
    }
    fn(this);
  }

}
