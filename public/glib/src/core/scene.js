import resourceLoader from './ResourceLoader';
import SceneNode from './scenenode';
import { Model, Camera, } from 'components';
import { Vec3, } from 'math';


const parseModel = () => {

}


const parseDataNodes = (dataNodes, parentNode) => {
  dataNodes.forEach(dataNode => {
    const sceneNode = parentNode.addChild();
    if (dataNode.transform) {
      for (let key in dataNode.transform) {
        const { x, y, z, } = dataNode.transform[key];
        sceneNode.transform[key] = new Vec3(x || 0, y || 0, z || 0);
      }
    }
    if (dataNode.components) {
      for (let key in dataNode.components) {
        let component;
        switch (key) {
          case 'model':
            component = sceneNode.addComponent(Model);
            component.addMesh(resourceLoader.getResource(dataNode.components[key].mesh));
            dataNode.components[key].materials.forEach(material => {
              component.addMaterial(resourceLoader.getResource(material));
            });
            break;
          case 'camera':
            component = sceneNode.addComponent(Camera);
            break;
        }
      }
    }
    if (dataNode.nodes) {
      parseDataNodes(dataNode.nodes, sceneNode);
    }
  });
}


class Scene extends SceneNode {

  static parse (scene, data) {
    if (typeof data !== 'object') {
      JSON.parse(data);
    }
    if (data.transform) {
      for (let key in data.transform) {
        const { x, y, z, } = data.transform[key];
        scene.transform[key] = new Vec3(x || 0, y || 0, z || 0);
      }
    }
    
    // Parse nodes
    parseDataNodes(data.nodes, scene);

  }

  constructor (url) {
    super();
    this.url = url;
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
