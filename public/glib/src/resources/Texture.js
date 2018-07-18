import gl from 'core/gl'
import Resource from './Resource';


const uploadToGPU = image => {
  const w = image.width;
  const h = image.height;

  const buffer  = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, buffer);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
  if(w & (w - 1) === 0 && h & (h - 1) === 0) {
    // Is power of 2
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  return buffer;
}


class Texture extends Resource {

  static parse (resource, data) {
    const image = new Image();
    image.src = `data:image/png;base64,${data}`;
    resource.buffer = uploadToGPU(image);
  }

  constructor (url) {
    super(url);
    this.buffer = null;
  }

}


export default Texture;
