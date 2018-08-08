import { gl, } from 'core/Glib';


export default class ShaderProgram {

  static createShaderKey (url, defines) {
    return `${url}:${defines.map(([ key, value, ]) => `${key}=${value}`).join(',')}`;
  }

  constructor (key, shaderSource, defines) {
    this.key = key;
    this.defines = defines;
    this.shaderSource = shaderSource;
    this.program = null;
    this.attributeLocations = {};
    this.uniformLocations = {};
  }

  compileShaderProgram () {
    if (!this.shaderSource) {
      throw new Error('No shadersource in shaderprogram');
    }
    this.createProgram(this.createShader(gl.VERTEX_SHADER), this.createShader(gl.FRAGMENT_SHADER));
    this.getAttributeLocations();
    this.getUniformLocations();
  }

  createShader (shaderType) {
    const shaderSource = this.shaderSource.createModifiedSource(shaderType, this.defines);
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  createProgram (vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    this.program = program;
  }

  getAttributeLocations () {
    const attributes = {};
    const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i += 1) {
      const attributeName = gl.getActiveAttrib(this.program, i).name;
      attributes[attributeName] = gl.getAttribLocation(this.program, attributeName);
    }
    this.attributeLocations = attributes;
  }

  getUniformLocations () {
    const uniforms = {};
    const numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i += 1) {
      const uniformName = gl.getActiveUniform(this.program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
    }
    this.uniformLocations = uniforms;
  }

  remove () {
    
  }

}