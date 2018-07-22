
class Resource {

  constructor (url) {
    this.url = url;
  }

  remove () {
    throw new Error(`Implement 'remove' function for resource: ${this.constructor.name}.`);
  }

}


export default Resource;
