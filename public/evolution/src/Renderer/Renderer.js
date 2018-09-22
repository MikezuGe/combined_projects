const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2');
document.getElementById('root').appendChild(canvas);


const vss = `#version 300 es
in vec2 a_position;
in vec4 a_color;
in int a_size;

out vec4 color;
void main () {
  color = a_color;
  gl_Position = vec4(a_position, 0.0, 1.0);
  gl_PointSize = a_size;
}
`;


const fss = `#version 300 es
precision mediump float;

in vec4 color;

out vec4 fragColor;
void main () {
  fragColor = vec4(color);
}
`;


const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(vs, vss);
gl.shaderSource(fs, fss);
gl.compileShader(vs);
gl.compileShader(fs);


const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);


export default class Renderer {

  constructor (world) {
    this.vertices = [];
    this.vertexLength = 7;
    this.vertexAttributes = {
      a_position: {
        attribute: gl.getAttribLocation(program, 'a_position'),
        type: gl.FLOAT,
        size: 2,
        stride: this.vertexLength * 4,
        offset: 0 * 4,
      },
      a_color: {
        attribute: gl.getAttribLocation(program, 'a_color'),
        type: gl.FLOAT,
        size: 4,
        stride: this.vertexLength * 4,
        offset: 2 * 4,
      },
      a_size: {
        attribute: gl.getAttribLocation(program, 'a_size'),
        type: gl.UNSIGNED_BYTE,
        size: 1,
        stride: this.vertexLength * 4,
        offset: 6 * 4,
      },
    };
    this.setupRenderer(world);
  }

  setupRenderer (world) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (const { renderingPosition, } of world.field) {
      this.vertices.push(
        renderingPosition.x,
        renderingPosition.y,
        1.0, 0.0, 0.0, 1.0,
        9
      );
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    for (const { attribute, size, type, stride, offset, } of object.values(this.vertexAttributes)) {
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, size, type, false, stride, offset);
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  renderWorld (world) {
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const { vertexLenght, } = this;
    const colorAlphaPosition = this.vertexAttributes.a_color.offset / 4 + this.vertexAttributes.a_color.size;
    const sizePosition = this.vertexAttributes.a_size.offset;
    for (const { entity, } of world.cell) {
      const pos = entity.cell.cellNumber * vertexLenght;
      if (!entity) {
        this.vertices[entity.cell.cellNumber + colorAlphaPosition] = 1.0;
      } else {
        this.vertices[entity.cell.cellNumber + colorAlphaPosition] = 1.0;
        this.vertices[entity.cell.cellNumber + sizePosition] = entity.size;
      }
    }
    gl.drawArrays(gl.POINTS, 0, 5);
  }

}
