import Resource from './Resource';


export default class ShaderSource extends Resource {

  static parse (resource, data) {
    resource.shaderText = data;
  }

  constructor (url) {
    super(url);
    this.shaderText = null;
  }

}
