import Resource from './Resource';


export default class Material extends Resource {

  constructor (url) {
    super(url);
    this.shaderSource = null;
    this.shaderProgram = null;
    this.textures = new Map();
    this.defines = new Map();
  }

  parse (data) {
    if (typeof data !== 'object') {
      JSON.parse(data);
    }
    this.setDefines(data.defines);
    return resourceLoader => {
      resourceLoader.getResource(data.shaderSource).then(resource => { this.shaderSource = resource; });
      Object.entries(data.textures).forEach(([ key, value, ]) => {
        resourceLoader.getResource(value.src).then(resource => { this.textures.set(key, resource); });
      });
    }
  }

  addTexture (key, texture) {
    this.textures.set(key, texture);
  }
  
  setDefines (defines) {
    Object.entries(defines).forEach(([key, value]) => {
      if (!this.defines.has(key)) {
        this.defines.set(key, value || null);
      } else {
        this.defines.delete(key);
      }
    });
  }

  getDefines () {
    const defines = [];
    for (const entry of this.defines) {
      defines.push(entry);
    }
    return defines;
  }

  remove () {
    this.textures.forEach(texture => { texture.remove(); });
    this.textures.clear();
    this.defines.clear();
  }

}
