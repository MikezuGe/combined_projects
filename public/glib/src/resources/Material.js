import Resource from './Resource';


export default class Material extends Resource {

  constructor () {
    super();
    this.textures = new Map();
    this.defines = new Map();
  }
  
  setDefines (defines) {
    Object.entries(defines).forEach((key, value) => {
      if (value) {
        this.defines.set(key, value);
      } else {
        this.defines.delete(key);
      }
    });
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

}
