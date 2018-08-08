import { gl, } from 'core/Glib';
import { GeometryBatch, } from 'misc';
import ShaderProgram from './ShaderProgram';


const logs = new Map();
const logOnce = (name, log) => {
  if (logs.has(name)) {
    return;
  }
  logs.set(name, log);
  console.log(name, log); // eslint-disable-line
}


export default class Renderer {

  constructor (resourceManager) {
    resourceManager.getResource('default.png', resource => { this.defaultTexture = resource; });
    resourceManager.getResource('default.mtl', resource => { this.defaultMaterial = resource; });
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
      this.queueGeometry(geometries[i], materials[i] || materials[0], renderable.node.transform.worldTransform, batches);
    }
  }

  queueGeometry (geometry, material, worldTransform, batches) {
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
      const shaderChange = this.bindMaterialAndShader(material);
      if (!this.boundShaderProgram) {
        continue;
      }
      shaderChange && this.bindTextures(material);
      this.boundMesh !== mesh && this.bindMesh(mesh);
      this.drawIndividual(batch, gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, vertexOffset);
    }
    // After drawing, unbind all
    this.boundMaterial = null;
    this.boundMesh = null;
    this.boundScene = null;
    this.boundShaderProgram = null;
    this.boundCamera = null;
  }
  
  bindMaterialAndShader (material) {
    if (this.boundMaterial === material) {
      return false;
    }
    this.boundMaterial = material;
    if (material.shaderProgram) {
      this.boundShaderProgram = material.shaderProgram;
      gl.useProgram(this.boundShaderProgram.program);
      return true;
    }
    const defines = material.getDefines();
    if (!defines.length) {
      console.error(`Material with source ${material.src} missing defines. Added default colormap texture`); // eslint-disable-line
      material.enableDefine('COLORMAP', 1);
      material.addTexture('COLORMAP', this.defaultTexture);
    }
    const key = ShaderProgram.createShaderKey(material.shaderSource.url, defines);
    if (this.shaderProgramCache.has(key)) {
      const shaderProgram = this.shaderProgramCache.get(key);
      this.boundShaderProgram = shaderProgram;
      material.shaderProgram = shaderProgram;
      return true;
    }
    this.resourceManager.getResource(material.shaderSource.url, shaderSource => {
      const shaderProgram = new ShaderProgram(key, shaderSource, defines);
      shaderProgram.compileShaderProgram();
      this.shaderProgramCache.set(shaderProgram.key, shaderProgram);
      this.boundShaderProgram = shaderProgram;
      material.shaderProgram = shaderProgram;
    });
    return false;
  }

  bindTextures (material) {
    const uniformLocations = this.boundShaderProgram.uniformLocations;
    const textures = material.getTextures();
    let num = 0;
    for (const [ define, texture ] of textures) {
      let textureUniform;
      switch (define) {
        case 'COLORMAP': textureUniform = uniformLocations.u_colortexture; break;
        case 'NORMALMAP': textureUniform = uniformLocations.u_normaltexture; break;
        case 'SPECULARMAP': textureUniform = uniformLocations.u_speculartexture; break;
        default: throw new Error(`No texture of type ${define} has been specified`);
      }
      gl.activeTexture(gl.TEXTURE0 + num);
      gl.bindTexture(gl.TEXTURE_2D, texture.buffer);
      gl.uniform1i(textureUniform, num++);
    }
  }

  bindMesh (mesh) {
    this.boundMesh = mesh;
    if (mesh.vao) {
      gl.bindVertexArray(mesh.vao);
      return;
    }
    mesh.vao = gl.createVertexArray();
    gl.bindVertexArray(mesh.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indiceBuffer);
    const attrLoc = this.boundShaderProgram.attributeLocations;
    const { attributes, vertexSize, } = mesh;
    for (const { name, vertices, offset, } of attributes) {
      gl.enableVertexAttribArray(attrLoc[name]);
      gl.vertexAttribPointer(attrLoc[name], vertices, gl.FLOAT, false, vertexSize, offset);
    }
  }

  drawIndividual (batch, drawType, vertexCount, indexType, vertexOffset) {
    const { u_mvp, } = this.boundShaderProgram.uniformLocations;
    const { view, perspective, } = this.boundCamera;
    for (const worldTransform of batch.worldTransforms) {
      const mvp = perspective.mul(view.invert).mul(worldTransform).toFloat32Array;
      gl.uniformMatrix4fv(u_mvp, false, mvp);
      gl.drawElements(drawType, vertexCount, indexType, vertexOffset * 2);
    }
  }

}