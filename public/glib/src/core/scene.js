import SceneNode from './scenenode';


class Scene extends SceneNode {

  static createScene (configFileUrl) {
    const scene = new Scene();
    if (!configFileUrl) {
      throw new Error('No configuration file defined!');
    }
    /* Load configuration from server and configure scene with it */
    return scene;
  }

  constructor () {
    super();
    this.scene = this;
    this.nodeRegister = [];
    this.componentRegister = [];
  }

  addToNodeRegister (node) {
    this.nodeRegister.push(node);
  }

  removeFromNodeRegister (node) {
    this.nodeRegister.splice(this.nodeRegister.indexOf(node), 1);
  }

  addToComponentRegister (component) {
    this.componentRegister.push(component);
  }

  removeFromComponentRegister (component) {
    this.componentRegister.splice(this.componentRegister.indexOf(component), 1);
  }

  remove () {
    for (const child of this.children) {
      child.remove();
    }
    while (this.components.length > 0) {
      this.components[this.components.length - 1].remove();
    }
  }

}


export default Scene;
