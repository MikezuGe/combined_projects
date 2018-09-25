import SceneNode from './Scenenode';
import * as componentTypes from '../components';
import { firstLetterToUpper, } from '../utility';


const parseNode = (nodeData, parentNode, resourceManager) => {
  const node = parentNode.addChild();
  // Insert data to node from nodedata...
  for (const [ key, { mesh, materials, }, ] of Object.entries(nodeData.components)) {
    const componentType = firstLetterToUpper(key);
    const ComponentClass = componentTypes[componentType];
    const component = node.addComponent(ComponentClass);
    switch (componentType) {
      case 'Model':
        resourceManager.getResource(mesh, resource => { component.addMesh(resource); });
        for (const material of materials) { resourceManager.getResource(material, resource => { component.addMaterial(resource); }); }
        /*
        // TODO
        // Mesh resource gets material resource names from .obj file and places the names into materialSources array
        resourceManager.getResource(mesh, resource => {
          component.addMesh(resource);
          for(const material of resource.materialSources) { resourceManager.getResource(material, resource => { component.addMaterial(resource); }); }
        });
        */
        break;
      case 'Camera':
        break;
      default:
        break;
    }
  }

  for (const [ key, values, ] of Object.entries(nodeData.transform)) { node.transform[key] = values; }
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
    this.scene = null;
    this.parent = null;
    this.transform.node = null;
    this.transform = null;
  }

}


export default Scene;
