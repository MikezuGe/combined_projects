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
    return resourceLoader => {
      resourceLoader.getResource(data.shaderSource, resource => { this.shaderSource = resource; });
      for (const define of data.defines) { this.enableDefine(define, null); }
      for (const { define, src, value, } of data.textures) { //eslint-disable-line
        resourceLoader.getResource(src, resource => { this.addTexture(define, resource); });
      }
    }
  }

  addTexture (define, texture) {
    this.textures.set(define, texture);
  }

  getTextures () {
    const textures = [];
    for (const entry of this.textures) {
      textures.push(entry);
    }
    return textures.length ? textures : null;
  }
  
  enableDefine (define, value) {
    this.defines.set(define, value);
  }

  getDefines () {
    const defines = [];
    for (const entry of this.defines) {
      defines.push(entry);
    }
    return defines.length ? defines : null;
  }

  remove () {
    this.shaderSource = null;
    this.shaderProgram = null;
    this.textures.clear();
    this.defines.clear();
  }

}
