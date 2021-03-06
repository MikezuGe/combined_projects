import { gl, } from '../core/Glib';
import Resource from './Resource';


export default class ShaderSource extends Resource {

  constructor (url) {
    super(url);
    this.data = null;
  }

  parse (data) {
    this.data = data;
  }

  createModifiedSource (type, defines) {
    let shaderSource = '#version 300 es\n';
    if (!type) {
      throw new Error(`Type of shader is invalid: ${type}`);
    }
    shaderSource += type === gl.VERTEX_SHADER ? '#define VERTEX\n' : '#define FRAGMENT\n';
    shaderSource += defines.map(([ key, val, ]) => `#define ${key}${val ? `=${val}\n` : '\n'}`).join('');
    return `${shaderSource}#line 1\n${this.data}`;
  }

  remove () {
    this.data = null;
  }

}
