import { gl, } from 'core/Glib';
import Resource from './Resource';


const uploadToGPU = image => {
  const w = image.width;
  const h = image.height;

  const buffer  = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, buffer);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
  if(w & (w - 1) === 0 && h & (h - 1) === 0) {
    // Width and height are power of 2
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  return buffer;
}


class Texture extends Resource {

  constructor (url) {
    super(url);
    this.buffer = null;
  }

  parse (data) {
    const image = new Image();
    image.onload = () => { this.buffer = uploadToGPU(image); }
    image.src = `data:image/png;base64,${data}`;
  }

  remove () {
    gl.deleteBuffer(this.buffer);
    this.buffer = null;
  }

}


export default Texture;
