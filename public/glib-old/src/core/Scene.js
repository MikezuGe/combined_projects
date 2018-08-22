import SceneNode from './Scenenode';
import { Model, Camera, } from 'components';
import { Vec3, Quat, } from 'math';


const parseDataNodes = (dataNodes, parentNode, resourceLoader) => {
  dataNodes.forEach(dataNode => {
    const sceneNode = parentNode.addChild();
    if (dataNode.transform) {
      sceneNode.transform.translation = new Vec3(dataNode.transform.translation.x || 0, dataNode.transform.translation.y || 0, dataNode.transform.translation.z || 0);
      sceneNode.transform.rotation = Quat.fromEulers(dataNode.transform.rotation.x || 0, dataNode.transform.rotation.y || 0, dataNode.transform.rotation.z || 0);
      sceneNode.transform.scale = new Vec3(dataNode.transform.scale.x || 0, dataNode.transform.scale.y || 0, dataNode.transform.scale.z || 0);
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
            component.active = dataNode.components[key].active;
            break;
        }
      }
    }
    if (dataNode.nodes) {
      parseDataNodes(dataNode.nodes, sceneNode, resourceLoader);
    }
  });
}


class Scene extends SceneNode {

  static createScene (sceneSource, resourceLoader) {
    const scene = new Scene(sceneSource);
    const { data, } = sceneSource;
    if (data.transform) {
      scene.transform.translation = new Vec3(data.transform.translation.x || 0, data.transform.translation.y || 0, data.transform.translation.z || 0);
      scene.transform.rotation = Quat.fromEulers(data.transform.rotation.x || 0, data.transform.rotation.y || 0, data.transform.rotation.z || 0);
      scene.transform.scale = new Vec3(data.transform.scale.x || 0, data.transform.scale.y || 0, data.transform.scale.z || 0);
    }
    parseDataNodes(data.nodes, scene, resourceLoader);
    return scene;
  }

  constructor (source) {
    super();
    this.source = source || null;
    this.scene = this;
    this.nodeRegister = [];
    this.componentRegister = [];
    this.ambientLightStrength = 0.5;
    this.ambientLightColor = new Vec3(1.0, 1.0, 1.0);
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
