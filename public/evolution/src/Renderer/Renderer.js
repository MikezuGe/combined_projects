const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');
document.getElementById('root').appendChild(canvas);


const vss = `#version 300 es
in vec2 a_position;
in int a_color;
in float a_alpha;
in float a_size;

uniform vec3 a_cas;

vec3 getColor () {
  switch (int(a_cas.x)) {
    case 0: return vec3(0.0, 1.0, 0.0);
    case 1: return vec3(0.0, 0.0, 1.0);
    case 2: return vec3(1.0, 0.0, 0.0);
    default: return vec3(0.0, 0.0, 0.0);
  }
}

out vec4 color;
void main () {
  color = vec4(getColor(), a_cas.y);
  gl_Position = vec4(a_position.x, -a_position.y, 0.0, 1.0);
  gl_PointSize = 10.0;
}
`;


const fss = `#version 300 es
precision mediump float;

in vec4 color;

out vec4 fragColor;
void main () {
  if (color.w == 0.0) {
    discard;
  }
  fragColor = vec4(color);
}
`;


const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(vs, vss);
gl.shaderSource(fs, fss);
gl.compileShader(vs);
gl.compileShader(fs);
const verr = gl.getShaderInfoLog(vs);
console.log('vs compile err: ', verr);
const ferr = gl.getShaderInfoLog(fs);
console.log('fs compile err: ', ferr);


const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);


export default class Renderer {

  constructor (world) {
    this.vertices = [];
    this.positionBuffer = gl.createBuffer();
    this.casUniform = gl.getUniformLocation(program, 'a_cas')
    this.vertexAttributes = {
      a_position: {
        buffer: this.positionBuffer,
        attribute: gl.getAttribLocation(program, 'a_position'),
        type: gl.FLOAT,
        size: 2,
        stride: 2 * 4,
        offset: 0,
      },
    };
  }

  setupWorldRender (world) {
    canvas.width = world.width * 10;
    canvas.height = world.height * 10;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const { vertices, varying, } = this;
    for (const { renderingPosition, } of world.field) {
      vertices.push(
        renderingPosition.x,
        renderingPosition.y,
      );
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    for (const { buffer, attribute, size, type, stride, offset, } of Object.values(this.vertexAttributes)) {
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, size, type, false, stride, offset);
    }

    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  renderWorld (world) {
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const { casUniform, } = this;
    let num = 0;
    for (const { entity, } of world.field) {
      gl.uniform3fv(casUniform, new Float32Array(entity ? [ entity.ENTITY_COLOR, 1.0, entity.size, ] : [ 0.0, 0.0, 0.0, ]));
      gl.drawArrays(gl.POINTS, num++, 1);
    }
  }

}
