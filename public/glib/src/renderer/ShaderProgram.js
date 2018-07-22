import gl from 'core/gl';


export default class ShaderProgram {

  static createShaderProgramKey = (materialSource, defines) => `${materialSource}(${defines.map((val, key) => `${key}=${val};`)})`;

  constructor (source, defines, key) {
    if (!key) {
      throw new Error('Shader program must have a key!');
    }
    this.key = key || null;
    this.program = null;
    this.attributeLocations = {};
    this.uniformLocations = {};
    this.source = source || null;
    this.defines = defines || null;
  }

  buildFromDefines = () => {
    if (!this.defines) {
      throw new Error('No definitions found and/or provided for building a shader');
    }
    // Create program
    this.program = this.createShaderProgram(this.source, this.defines);
    // Get attribute locations
    this.attributeLocations = this.getAttributeLocations(this.program);
    // Get uniform locations
    this.uniformLocations = this.getUniformLocations(this.program);
  }

  createShaderProgram = (source, defines) => {
    const program = gl.createProgram();
    gl.attachShader(program, this.createShader(source, defines, gl.VERTEX_SHADER));
    gl.attachShader(program, this.createShader(source, defines, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      gl.deleteProgram(program);
      throw new Error(`Couldn't link shader program: ${gl.getProgramInfoLog(program)}`);
    }
    return program;
  }

  createShader = (source, defines, type) => {
    const modifiedSource = this.createDefineKeys(source, defines, type);
    const shader = gl.createShader(type);
    gl.shaderSource(shader, modifiedSource);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      gl.deleteShader(shader);
      throw new Error(`Failed to compile shader: ${gl.getShaderInfoLog(shader)}`);
    }
    return shader;
  }

  createDefineKeys = (source, defines, type) => {
    let shaderSource = '#version 300 es\n';
    if (!type) {
      throw new Error(`Type of shader is invalid: ${type}`);
    }
    shaderSource += type === gl.VERTEX_SHADER ? '#define VERTEX\n' : '#define FRAGMENT\n';
    // Then defines
    defines.forEach((val, key) => {
      shaderSource += `#define ${key} ${val ? ` = ${val}\n` : '\n'}`;
    });
    return `${shaderSource}#line 1\n${source}`;
  }

  getAttributeLocations = program => {
    const attributes = {};
    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i += 1) {
      const attributeName = gl.getActiveAttrib(program, i).name;
      attributes[attributeName] = gl.getAttribLocation(program, attributeName);
    }
    return attributes;
  }

  getUniformLocations = program => {
    const uniforms = {};
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i += 1) {
      const uniformName = gl.getActiveUniform(program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }

}
