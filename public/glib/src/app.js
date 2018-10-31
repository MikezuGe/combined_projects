import { setGlobalStyle, } from './utility';

import Glib, { gl, } from './core/Glib';
import { Mat4, } from './math';


setGlobalStyle(`
* {
  font-family: 'Ubuntu', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}

html body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#root {
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
  background: gray;
}
`);


const glib = new Glib({
  'elementId': 'root',
  'canvasId': 'canvas',
});


glib.createScene('def.default.cnf');


const vss = `#version 300 es
in vec3 a_pos;
in vec3 a_col;
uniform mat4 u_m;
uniform mat4 u_v;
uniform mat4 u_p;
uniform mat4 u_mvp;
out vec3 a_fragColor;
void main () {
  a_fragColor = a_col;
  gl_Position = u_mvp * vec4(a_pos, 1.0);
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

const posLoc = gl.getAttribLocation(program, 'a_pos');
const colLoc = gl.getAttribLocation(program, 'a_col');
const mvpLoc = gl.getUniformLocation(program, 'u_mvp');

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -0.5, -0.5, 0.0, 1.0, 0.0, 1.0,
  0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
  0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
  0.0, 0.5, 0.0, 0.0, 1.0, 0.0,
  0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
  1.0, 0.5, 0.0, 0.0, 1.0, 0.0,
]), gl.STATIC_DRAW);
const indBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([ 0, 1, 2, 3, 4, 5, ]), gl.STATIC_DRAW);

//const vao = gl.createVertexArray();
//gl.bindVertexArray(vao);

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indBuffer);
gl.enableVertexAttribArray(posLoc);
gl.enableVertexAttribArray(colLoc);
gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 6 * 4, 0 * 4);
gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);

const m = Mat4.translate(0, 0, -5).mul(Mat4.rotateY(1));
const v = Mat4.identity.invert;
const p = Mat4.perspective(Math.PI * 0.25, window.innerWidth / window.innerHeight, 0.01, 1000);

const mvp = p.mul(v).mul(m);

gl.uniformMatrix4fv(mvpLoc, false, mvp.toFloat32Array)

//gl.bindVertexArray(vao);

gl.drawArrays(gl.TRIANGLES, 0, 6);
//gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);