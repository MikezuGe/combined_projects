import Resource from './Resource';


export default class SceneSource extends Resource {
  
  static parse (resource, data) {
    if (typeof data !== 'object') {
      JSON.parse(data);
    }
    resource.data = data;
  }

  constructor (url) {
    super(url);
    this.data = null;
  }

}
