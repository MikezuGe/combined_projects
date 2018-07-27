import { gl, } from 'core/Glib';
import { GeometryBatch, } from 'misc';
import ShaderProgram from './ShaderProgram';
import { Mat4, } from 'math';


const logs = new Map();
const logOnce = (name, log) => {
  if (logs.has(name)) {
    return;
  }
  logs.set(name, log);
  console.log(name, log); // eslint-ignore-line
}


export default class Renderer {

  constructor (resourceManager) {
    resourceManager.getResource('default.mtl', material => { this.defaultMaterial = material; });
    this.resourceManager = resourceManager;
    this.boundScene = null;
    this.boundCamera = null;
    this.boundMaterial = null;
    this.shaderProgramCache = new Map();
  }

  renderScene (scene) {
    const geometryBatches = [];
    scene.walkEnabled(node => {
      node.components.forEach(component => {
        switch (component.type) {
          case 'Model': this.queueRenderable(component, geometryBatches); break;
          case 'Camera':
            if (!this.boundCamera && component.active) {
              this.boundCamera = component;
            }
            break;
          default: break;
        }
      });
    });
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.renderPass(scene, geometryBatches);
  }

  queueRenderable (renderable, batches) {
    if (!renderable.mesh) { return; }
    const geometries = renderable.getGeometries();
    const materials = renderable.getMaterials();
    if (!geometries || !materials) { return; }
    for (let i = 0; i < geometries.length; i += 1) {
      this.queueGeometry(geometries[i], materials[i], renderable.node.transform.worldTransform, batches);
    }
  }

  queueGeometry = (geometry, material, worldTransform, batches) => {
    for (const batch of batches) {
      if (batch.geometry === geometry && batch.material === material) {
        batch.worldTransforms.push(worldTransform);
        return;
      }
    }
    batches.push(new GeometryBatch(geometry, material, worldTransform));
  }

  renderPass (scene, geometryBatches) {
    // TODO Move these state changes to mesh/material binding, since they can change these
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DITHER);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    for (const batch of geometryBatches) {
      const { material, geometry: { mesh, vertexCount, vertexOffset, }, } = batch;
      this.bindAll(mesh, material);
      this.drawIndividual(batch, gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, vertexOffset);
    }
    // After drawing, unbind all
    this.boundMaterial = null;
    this.boundMesh = null;
    this.boundScene = null;
    this.boundShaderProgram = null;
    this.boundCamera = null;
  }

  bindAll (mesh, material) {
    const shaderChange = this.bindMaterial(material);

    if (!this.boundShaderProgram) {
      return;
    }

    this.boundMesh = mesh;
    this.bindShaderAttributes();
    this.enableShaderAttributes(mesh);
  }
  
  bindMaterial (material) {
    if (this.boundMaterial === material) {
      return false;
    }
    this.boundMaterial = material;
    if (material.shaderProgram) {
      this.boundShaderProgram = material.shaderProgram;
      gl.useProgram(this.boundShaderProgram.program);
      return true;
    }
    this.resourceManager.getResource(material.shaderSource.url, shaderSource => {
      const shaderProgram = new ShaderProgram(shaderSource, material.getDefines());
      shaderProgram.compileShaderProgram();
      material.shaderProgram = shaderProgram;
      this.shaderProgramCache.set(shaderProgram.key, shaderProgram);
      this.boundShaderProgram = shaderProgram;
      gl.useProgram(shaderProgram.program);
    });
  }

  bindShaderAttributes () {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.boundMesh.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.boundMesh.indiceBuffer);
  }

  enableShaderAttributes () {
    const attrLoc = this.boundShaderProgram.attributeLocations;
    const { attributes, vertexSize, } = this.boundMesh;
    for (const { name, vertices, offset, } of attributes) {
      gl.enableVertexAttribArray(attrLoc[name]);
      gl.vertexAttribPointer(attrLoc[name], vertices, gl.FLOAT, false, vertexSize, offset);
    }
  }

  drawIndividual (batch, drawType, vertexCount, indexType, vertexOffset) {
    for (const worldTransform of batch.worldTransforms) {
      if (this.bindTransform(worldTransform)) {
        gl.drawElements(drawType, vertexCount, indexType, vertexOffset * 2);
      }
    }
  }

  bindTransform (worldTransform) {
    if (!this.boundShaderProgram) {
      return false;
    }
    const { u_mvp, } = this.boundShaderProgram.uniformLocations;
    const { view, perspective, } = this.boundCamera;
    const mvp = perspective.mul(view.invert).mul(worldTransform).toFloat32Array;
    gl.uniformMatrix4fv(u_mvp, false, mvp);
    return true;
  }

}