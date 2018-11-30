import { gl, } from '../core/Glib';
import { GeometryBatch, } from '../misc';
import ShaderProgram from './ShaderProgram';


const logs = new Map();
const logOnce = (name, log) => {  // eslint-disable-line
  if (logs.has(name)) {
    return;
  }
  logs.set(name, log);
  console.log(name, log); // eslint-disable-line
}


export default class Renderer {

  constructor (resourceManager) {
    resourceManager.getResource('def_colormap.default.png', resource => { this.defaultTexture = resource; });
    // Add default normalmap, and others
    resourceManager.getResource('def.default.mtl', resource => { this.defaultMaterial = resource; });
    this.resourceManager = resourceManager;
    this.boundScene = null;
    this.boundCamera = null;
    this.boundShaderProgram = null;
    this.boundMesh = null;
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
      /*if (this.boundMaterial !== material) {
        this.boundMaterial = material;
      }
      if (this.boundMaterial.shaderProgram !== this.boundShaderProgram) {
        this.bindShaderProgram()
        // bind scene
        // bind camera
        this.bindTextures();
      }
      this.bindMesh(mesh);
      */
      if (this.boundMaterial !== material) {
        this.boundMaterial = material;
        this.bindShaderProgram();
        if (!this.boundShaderProgram) {
          continue;
        }
        this.bindMesh(mesh);
        this.bindTextures();
        this.bindScene(scene);
        this.bindCamera();
      }
      this.drawIndividual(batch, gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, vertexOffset);
    }
    // After drawing, unbind all
    this.boundScene = null;
    this.boundCamera = null;
    this.boundShaderProgram = null;
    this.boundMesh = null;
    this.boundMaterial = null;
  }
  
  bindShaderProgram () {
    const { boundMaterial, } = this;
    if (boundMaterial.shaderProgram) {
      this.boundShaderProgram = boundMaterial.shaderProgram;
      gl.useProgram(this.boundShaderProgram.program);
      return;
    }
    let defines = boundMaterial.getDefines();
    if (!defines.length) {
      console.error(`Material ${boundMaterial.src} is missing textures, added default colormap texture`); // eslint-disable-line
      boundMaterial.enableDefine('COLORMAP', 1);
      boundMaterial.addTexture('COLORMAP', this.defaultTexture);
      defines = boundMaterial.getDefines();
    }
    if (!boundMaterial.shaderSource) {
      this.boundShaderProgram = null;
      return;
    }
    const key = ShaderProgram.createShaderKey(boundMaterial.shaderSource.url, defines);
    let shaderProgram = this.shaderProgramCache.get(key);
    if (!shaderProgram) {
      shaderProgram = new ShaderProgram(key, boundMaterial.shaderSource, defines);
      shaderProgram.compileShaderProgram();
      this.shaderProgramCache.set(shaderProgram.key, shaderProgram);
    }
    boundMaterial.shaderProgram = shaderProgram;
    this.boundShaderProgram = shaderProgram;
    gl.useProgram(shaderProgram.program);
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

  bindTextures () {
    const uniformLocations = this.boundShaderProgram.uniformLocations;
    const textures = this.boundMaterial.getTextures() || [ [ "COLORMAP", this.defaultTexture, ], ];
    let num = 0;
    for (const [ define, texture, ] of textures) {
      let textureUniform;
      switch (define) {
      case 'COLORMAP': textureUniform = uniformLocations.u_color_texture; break;
      case 'NORMALMAP': textureUniform = uniformLocations.u_normal_texture; break;
      case 'SPECULARMAP': textureUniform = uniformLocations.u_specular_texture; break;
      default: throw new Error(`No texture of type ${define} has been specified. Implement!`);
      }
      gl.activeTexture(gl.TEXTURE0 + num);
      gl.bindTexture(gl.TEXTURE_2D, texture.buffer);
      gl.uniform1i(textureUniform, num++);
    }
  }

  bindScene (scene) { // eslint-disable-line
    const { u_time, } = this.boundShaderProgram.uniformLocations;
    gl.uniform1f(u_time, performance.now() /*scene.time.now*/); // Scene should carry global time
  }

  bindCamera () {
    const { boundCamera, } = this;
    const { u_view, u_perspectice, u_view_inverted, } = this.boundShaderProgram.uniformLocations;
    gl.uniformMatrix4fv(u_view, false, boundCamera.view.toFloat32Array);
    gl.uniformMatrix4fv(u_perspectice, false, boundCamera.perspective.toFloat32Array);
    gl.uniformMatrix4fv(u_view_inverted, false, boundCamera.view.invert.toFloat32Array);
  }

  drawIndividual (batch, drawType, vertexCount, indexType, vertexOffset) {
    const { u_model, u_model_rotation, u_mvp, u_normal_matrix, } = this.boundShaderProgram.uniformLocations;
    const { view, perspective, } = this.boundCamera;
    for (const worldTransform of batch.worldTransforms) {
      gl.uniformMatrix3fv(u_normal_matrix, false, worldTransform.toMat3.mul(view.toMat3).invert.transpose.toFloat32Array);
      gl.uniformMatrix3fv(u_model_rotation, false, worldTransform.toMat3.invert.transpose.toFloat32Array);
      gl.uniformMatrix4fv(u_model, false, worldTransform.toFloat32Array);
      gl.uniformMatrix4fv(u_mvp, false, perspective.mul(view.invert).mul(worldTransform).toFloat32Array);
      gl.drawElements(drawType, vertexCount, indexType, vertexOffset * 2);
    }
  }

}
