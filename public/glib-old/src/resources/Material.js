import Resource from './Resource';


export default class Material extends Resource {

  static parse (resource, data) {
    if (typeof data !== 'object') {
      JSON.parse(data);
    }
    resource.setDefines(data.defines);
    return resourceLoader => {
      resource.setTextures(Object.entries(data.textures).reduce((total, current) => {
        total[current[0]] = resourceLoader.getResource(current[1].src);
        return total;
      }, {}));
    }
  }

  constructor (url) {
    super(url);
    this.textures = new Map();
    this.defines = new Map();
  }

  setTextures (textures) {
    Object.entries(textures).forEach((key, texture) => {
      if (texture) {
        this.textures.set(key, texture);
      } else {
        this.textures.delete(key);
      }
    });
  }
  
  setDefines (defines) {
    Object.entries(defines).forEach((key, value) => {
      if (!this.defines.has(key)) {
        this.defines.set(key, value || null);
      } else {
        this.defines.delete(key);
      }
    });
  }

}
