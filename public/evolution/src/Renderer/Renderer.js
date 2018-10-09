const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');
document.getElementById('root').appendChild(canvas);


const vss = `#version 300 es
in vec2 a_position;
in float a_color;
in float a_alpha;
in float a_size;

vec3 getColor () {
  switch (int(a_color)) {
    case 0: return vec3(0.0, 1.0, 0.0);
    case 1: return vec3(1.0, 0.75, 0.8);
    case 2: return vec3(1.0, 0.0, 0.0);
    default: return vec3(0.0, 0.0, 0.0);
  }
}

out vec4 color;
void main () {
  color = vec4(getColor(), a_alpha);
  gl_Position = vec4(a_position.x, -a_position.y, 0.0, 1.0);
  gl_PointSize = a_size;
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
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);
  if (r > 1.0) {
    discard;
  }
  float delta = fwidth(r);
  float alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
  fragColor = vec4(color.xyz * alpha, color.w);
}
`;


const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(vs, vss);
gl.shaderSource(fs, fss);
gl.compileShader(vs);
gl.compileShader(fs);
const verr = gl.getShaderInfoLog(vs);
console.log('vs compile err: ', verr); //eslint-disable-line
const ferr = gl.getShaderInfoLog(fs);
console.log('fs compile err: ', ferr); //eslint-disable-line


const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);


export default class Renderer {

  constructor () {
    this.vertices = [];
    this.varying = [];
    this.positionBuffer = gl.createBuffer();
    this.varyingBuffer = gl.createBuffer();
    this.vertexAttributes = {
      a_position: {
        buffer: this.positionBuffer,
        attribute: gl.getAttribLocation(program, 'a_position'),
        type: gl.FLOAT,
        size: 2,
        stride: 2 * 4,
        offset: 0,
      },
      a_color: {
        buffer: this.varyingBuffer,
        attribute: gl.getAttribLocation(program, 'a_color'),
        type: gl.FLOAT,
        size: 1,
        stride: 3 * 4,
        offset: 0,
      },
      a_alpha: {
        buffer: this.varyingBuffer,
        attribute: gl.getAttribLocation(program, 'a_alpha'),
        type: gl.FLOAT,
        size: 1,
        stride: 3 * 4,
        offset: 1 * 4,
      },
      a_size: {
        buffer: this.varyingBuffer,
        attribute: gl.getAttribLocation(program, 'a_size'),
        type: gl.FLOAT,
        size: 1,
        stride: 3 * 4,
        offset: 2 * 4,
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
      varying.push(
        0.0,
        0.0,
        0.0,
      );
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.varyingBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(varying), gl.DYNAMIC_DRAW);

    for (const { buffer, attribute, size, type, stride, offset, } of Object.values(this.vertexAttributes)) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, size, type, false, stride, offset);
    }
    // Varying buffer is left last to be bound. This is important!

    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  renderWorld ({ field, dimension, }) {
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const { varying, } = this;
    for (const { entity, cellNumber, } of field) {
      const pos = cellNumber * 3;
      if (entity) {
        varying[pos + 0] = entity.ENTITY_COLOR;
        varying[pos + 1] = 1.0
        varying[pos + 2] = entity.size;
      } else {
        varying[pos + 1] = 0.0;
      }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(varying), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, dimension);
  }

}
