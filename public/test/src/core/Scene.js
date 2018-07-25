import SceneNode from './SceneNode';
import * as componentTypes from 'components';
import { firstLetterToUpper, } from 'utility/';


const parseNode = (nodeData, parentNode, resourceManager) => {
  const node = parentNode.addChild();
  // Insert data to node from nodedata...
  if (!nodeData.components) {
    throw new Error('No components object defined for node in scene configuration file.');
  }
  Object.entries(nodeData.components).forEach(([ key, value, ]) => {
    const componentType = firstLetterToUpper(key);
    const ComponentClass = componentTypes[componentType];
    if (!ComponentClass) {
      throw new Error(`Illegal component type: ${componentType}`)
    }
    const component = node.addComponent(ComponentClass);
    switch (componentType) {
      case 'Model':
        resourceManager.getResource(value.mesh).then(resource => { component.addMesh(resource); });
        value.materials.forEach(material => {
          resourceManager.getResource(material).then(resource => { component.addMaterial(resource); });
        });
        break;
      case 'Camera': break;
      default: break;
    }
  });
  // Set node transforms
  // Run through nodedata nodes
  nodeData.nodes.forEach(data => { parseNode(data, node, resourceManager); });
}


class Scene extends SceneNode {

  constructor () {
    super();
    this.scene = this;
  }

  buildFromResource (resource, resourceManager) {
    const { data, } = resource;
    // Scene specific data should be inserted here to scene (this)
    data.nodes.forEach(nodeData => { parseNode(nodeData, this, resourceManager); });
  }

  remove () {
    const { children, components, } = this;
    while (children.length > 0) {
      children[children.length - 1].remove();
    }
    while (components.length > 0) {
      components[components.length - 1].remove();
    }
  }

}


export default Scene;
