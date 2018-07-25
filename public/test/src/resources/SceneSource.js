import Resource from './Resource';


export default class SceneSource extends Resource {

  constructor (url) {
    super(url);
    this.data = null;
  }

  parse (data) {
    this.data = data;
  }

  remove () {
    this.data = null;
  }

}