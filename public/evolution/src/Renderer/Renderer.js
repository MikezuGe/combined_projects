const canvas = document.createElement('canvas');
document.getElementById('root').appendChild(canvas);
const gl = canvas.getContext('webgl2');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const vss = `#version 300 es
in vec2 a_position;
in vec3 a_color;
in float a_size;

out vec3 color;
void main () {
  color = a_color;
  gl_Position = vec4(a_position, 0.0, 1.0);
  gl_PointSize = a_size;
}
`;

const fss = `#version 300 es
precision mediump float;

in vec3 color;
out vec4 fragColor;
void main () {
  fragColor = vec4(color, 1.0);
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

const vertices = new Float32Array([
  -0.25, -0.25, 1.0, 0.0, 0.0, 5.0,
  -0.25, 0.25, 0.0, 1.0, 0.0, 5.0,
  0.25, -0.25, 0.0, 0.0, 1.0, 5.0,
  0.25, 0.25, 1.0, 0.0, 1.0, 5.0,
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);


const targetTextureWidth = 256;
const targetTextureHeight = 256;
const targetTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, targetTexture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, targetTextureWidth, targetTextureHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

const a_position = gl.getAttribLocation(program, 'a_position');
const a_color = gl.getAttribLocation(program, 'a_color');
const a_size = gl.getAttribLocation(program, 'a_size');

gl.enableVertexAttribArray(a_position);
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 6 * 4, 0 * 4);
gl.enableVertexAttribArray(a_color);
gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 6 * 4, 2 * 4);
gl.enableVertexAttribArray(a_size);
gl.vertexAttribPointer(a_size, 1, gl.FLOAT, false, 6 * 4, 5 * 4);

gl.useProgram(program);
gl.clearColor(0.4, 0.4, 0.4, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DITHER);
gl.viewport(0, 0, canvas.width, canvas.height);

gl.drawArrays(gl.POINTS, 0, 4);
