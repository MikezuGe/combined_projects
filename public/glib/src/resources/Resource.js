export default class Resource {

  constructor (url) {
    this.url = url;
  }

  parse () {
    throw new Error(`No parse method defined for Resource type ${this.constructor.name}.`);
  }

  remove () {
    throw new Error(`No remove method defined for resource type ${this.constructor.name}.`);
  }

}