import Resource from '../core/resource';


class Texture extends Resource {

  static parse (resource, data) {
    resource.img.src = `data:image/png;base64,${data}`;
  }

  constructor (url) {
    super(url);
    this.img = new Image();
  }

}


export default Texture;
