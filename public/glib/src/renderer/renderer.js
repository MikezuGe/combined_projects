import gl from 'core/gl';
import { GeometryBatch, LightBatch, } from './batch';
import ShaderProgram from './ShaderProgram';


export default class Renderer {

  constructor () {
    this.boundScene = null;
    this.boundCamera = null;
  }

  renderScene (scene) {
    this.boundScene = scene;
    const geometryBatches = [];
    const lightBatches = [];
    scene.walkEnabled(node => {
      for (const component of node.components) {
        switch (component.constructor.name) {
          case 'Model': this.queueRenderable(component, geometryBatches); break;
          case 'Light': this.queueLight(component, lightBatches); break;
          case 'Camera': if (component.active) { this.boundCamera = component; } break;
          default: break;
        }
      }
    });
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.renderPass(geometryBatches, lightBatches);
  }

  queueRenderable (renderable, batches) {
    if (!renderable.mesh) {
      throw new Error('Renderable mesh missing from ', renderable);
      //return;
    }
    const geometries = renderable.getGeometries();
    const materials = renderable.getMaterials();
    if (!geometries || !materials) {
      return;
    }
    for (let i = 0; i < geometries.length; i += 1) {
      this.queueGeometry(geometries[i], materials[i] || this.defaultMaterial, renderable.node.transform.worldTransform, batches);
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

  queueLight = (light, batches) => {
    for (const batch of batches) {
      if (batch.type === light.type) {
        batch.color.push(light.color);
        batch.range.push(light.range);
        batch.diffuseStrength.push(light.diffuseStrength);
        batch.specularStrength.push(light.specularStrength);
        batch.shininess.push(light.shininess);
        batch.worldTransforms.push(light.node.transform.worldTransform);
        return;
      }
    }
    batches.push(new LightBatch(light.type, light.color, light.range, light.diffuseStrength, light.specularStrength, light.shininess, light.node.transform.worldTransform));
  }









  renderPass (geometryBatches, lightBatch) {
    // TODO Move these state changes to mesh/material binding, since they can change these
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DITHER);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    for (const batch of geometryBatches) {
      const { material, geometry: { mesh, vertexCount, vertexOffset, }, } = batch;
      this.bindAll(lightBatch, mesh, material);
      this.drawIndividual(batch, gl.TRIANGLES, vertexCount, gl.UNSIGNED_SHORT, vertexOffset);
    }
    // After drawing, unbind all
    this.boundMaterial = null;
    this.boundMesh = null;
    this.boundScene = null;
    this.boundShaderProgram = null;
    this.boundCamera = null;
  }

  bindAll = (scene, lightBatch, camera, mesh, material) => {
    // Must bind material first, since it binds shader as well. Also bind textures
    const shaderChange = this.bindMaterial(material);
    if (shaderChange) {
      this.bindLights(lightBatch);
    }
    if (shaderChange || this.boundScene !== scene) {
      this.bindScene();
    }
    if (shaderChange || this.boundMesh !== mesh) {
      this.boundMesh = mesh;
      this.bindShaderAttributes();
      this.enableShaderAttributes(mesh);
    }
    if (shaderChange || this.boundCamera !== camera) {
      this.bindCamera(camera);
    }
  }

  bindMaterial (material) {
    if (this.boundMaterial === material) {
      return false;
    }
    this.boundMaterial = material;
    // Check cache for shader
    let shaderProgram;
    const shaderProgramKey = ShaderProgram.getShaderProgramKey(material.name, material.defines);
    if (this.shaderProgramCache.has(shaderProgramKey)) {
      // Shader found
      shaderProgram = this.shaderProgramCache.get(shaderProgramKey);
    } else {
      // No shader found, create one
      shaderProgram = new ShaderProgram(ShaderProgram.getSource('shaderProgramCode'), material.defines, shaderProgramKey);
      // Build shaderprogram from the data inserted above
      shaderProgram.buildFromDefines();
      // Set shader to cache for fast reuse (no need to compile one again)
      this.shaderProgramCache.set(shaderProgramKey, shaderProgram);
    }
    // Set shaderprogram to material
    material.shaderProgram = shaderProgram;
    // Bind the shaderprogram
    this.bindShaderProgram(shaderProgram);
    // Bind textures
    const uniLoc = this.boundShaderProgram.uniformLocations;
    const textures = material.textures.entries();
    for (const [ name, texture, ] of textures) {
      let num;
      let textureUniform;
      switch (name) {
      case 'COLORMAP': num = 0; textureUniform = uniLoc.u_colorTexture; break;
      case 'NORMALMAP': num = 1; textureUniform = uniLoc.u_normalTexture; break;
      case 'SPECULARMAP': num = 2; textureUniform = uniLoc.u_specularTexture; break;
      default: throw new Error(`No texture of type ${name} has been specified`);
      }
      gl.activeTexture(gl.TEXTURE0 + num);
      gl.bindTexture(gl.TEXTURE_2D, texture.buffer);
      gl.uniform1i(textureUniform, num);
    }
    return true;
  }

  bindShaderProgram = shaderProgram => {
    if (this.boundShaderProgram !== shaderProgram) {
      this.boundShaderProgram = shaderProgram;
      gl.useProgram(shaderProgram.program);
    }
  }

  bindLights = lightBatch => {
    const uniLoc = this.boundShaderProgram.uniformLocations;
    if (!uniLoc['light[0].color']) {
      return;
    }
    let curLight = 0;
    for (const light of lightBatch) {
      const len = light.worldTransforms.length;
      for (let i = 0; i < len; i += 1) {
        let type;
        if (light.type === 'POINTLIGHT') {
          type = 1;
        }
        gl.uniform1i(uniLoc[`light[${curLight}].type`], type);
        gl.uniform3fv(uniLoc[`light[${curLight}].color`], light.color[i].toArray);
        gl.uniform1f(uniLoc[`light[${curLight}].range`], light.range[i]);
        gl.uniform1f(uniLoc[`light[${curLight}].diffuseStrength`], light.diffuseStrength[i]);
        gl.uniform1f(uniLoc[`light[${curLight}].specularStrength`], light.specularStrength[i]);
        gl.uniform1f(uniLoc[`light[${curLight}].shininess`], light.shininess[i]);
        gl.uniformMatrix4fv(uniLoc[`light[${curLight}].transform`], false, light.worldTransforms[i].toFloat32Array);
        if (curLight > 4) {
          return;
        }
        curLight += 1;
      }
    }
  }

  bindScene () {
    const uniLoc = this.boundShaderProgram.uniformLocations;
    const { ambientLightStrength, ambientLightColor, } = this.scene.ambientLightStrength;
    const ambientLight = ambientLightColor.toArray.map(a => a * ambientLightStrength);
    gl.uniform3fv(uniLoc.u_ambientLight, ambientLight);
    gl.uniform1f(uniLoc.u_time, performance.now() || 0.0);
  }

  bindCamera () {
    const uniLoc = this.boundShaderProgram.uniformLocations;
    gl.uniformMatrix4fv(uniLoc.u_perspective, false, this.boundCamera.perspective.toFloat32Array);
    gl.uniformMatrix4fv(uniLoc.u_view, false, this.boundCamera.view.toFloat32Array);
    gl.uniformMatrix4fv(uniLoc.u_invertedView, false, this.boundCamera.view.toFloat32Array.invert);
    // CHECK THIS PART HERE. CAMERA VIEW NOT INVERTED
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
      gl.vertexAttribPointer(attrLoc[name], vertices, gl.FLOAT, false, vertexSize * 4, offset * 4);
    }
  }

  drawIndividual (batch, drawType, indexCount, indexType, indexOffset) {
    for (const worldTransform of batch.worldTransforms) {
      this.bindTransform(worldTransform);
      gl.drawElements(drawType, indexCount, indexType, indexOffset * 2);
    }
  }

  bindTransform (worldTransform) {
    const uniLoc = this.boundShaderProgram.uniformLocations;
    // Camera's inverse view and perspective and model worldTransform
    const { perspective, view, } = this.boundCamera;
    const mv = view.invert.mul(worldTransform);
    const mvp = perspective.mul(mv);
    gl.uniformMatrix4fv(uniLoc.u_model, false, worldTransform.toFloat32Array);
    gl.uniformMatrix4fv(uniLoc.u_mv, false, mv.toFloat32Array);
    gl.uniformMatrix4fv(uniLoc.u_mvp, false, mvp.toFloat32Array);
  }

}