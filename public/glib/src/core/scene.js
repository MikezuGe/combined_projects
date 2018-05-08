import SceneNode from './scenenode';
import ResourceLoader from './resourceloader';


class Scene extends SceneNode {

  constructor () {
    super();
    this.resourceLoader = new ResourceLoader();
    this.scene = this;
    this.nodeRegister = [];
    this.componentRegister = [];
  }

  getResource (url) {
    return this.resourceLoader.getResource(url);
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
