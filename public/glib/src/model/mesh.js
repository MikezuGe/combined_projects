import Resource from '../core/resource';


class Mesh extends Resource {

  static parse (resource, data) {
    console.log(data);
    let iterator = 0;
    let line = '';
    console.log('one at a time----');
    while ((line = data.match(/^.*$/gm))) {
      console.log(line);
      if (iterator++ > 10) {
        console.log('Iterator over 10');
        break;
      }
    }
    console.log(line);
    return;
  }

  constructor (url) {
    super(url);
    this.vertexBuffer = null;
    this.indexBuffer = null;
  }

}


export default Mesh;
