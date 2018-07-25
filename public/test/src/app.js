import 'style.css';
import Glib, { gl, } from 'core/Glib';


const glib = new Glib({
  'elementId': 'root',
  'canvasId': 'canvas',
});


glib.createScene('scene.cnf');


const vss = `#version 300 es
in vec3 a_pos;
in vec3 a_col;
out vec3 a_fragColor;
void main () {
  a_fragColor = a_col;
  gl_Position = vec4(a_pos, 1.0);
}`;
const fss = `#version 300 es
precision mediump float;
in vec3 a_pos;
in vec3 a_fragColor;
out vec4 fragColor;
void main () {
  fragColor = vec4(a_fragColor, 1.0);
}`;

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

const posAttrLoc = gl.getAttribLocation(program, 'a_pos');
const colAttrLoc = gl.getAttribLocation(program, 'a_col');

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
  0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
  0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
  0.0, 0.5, 0.0, 0.0, 1.0, 0.0,
  0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
  1.0, 0.5, 0.0, 0.0, 1.0, 0.0,
]), gl.STATIC_DRAW);

var vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(posAttrLoc);
gl.enableVertexAttribArray(colAttrLoc);
gl.vertexAttribPointer(posAttrLoc, 3, gl.FLOAT, false, 6 * 4, 0 * 4);
gl.vertexAttribPointer(colAttrLoc, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);

gl.bindVertexArray(vao);

gl.drawArrays(gl.TRIANGLES, 0, 6);