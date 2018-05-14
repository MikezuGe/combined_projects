import axios from 'axios';


import Mesh from '../model/mesh';
import Texture from '../model/texture';


axios.defaults.baseURL = `${window.location.origin}/api/glib`;


class ResourceLoader {

  constructor () {
    this.resources = new Map();
    this.resourcesLoading = new Map();
    this.loading = false;
  }

  getResource (url) {
    if (this.resources.has(url)) {
      return this.resources.get(url);
    }
    if (this.resourcesLoading.has(url)) {
      return;
    }
    this.loadResource(this.createResource(url));
  }

  createResource (url) {
    switch (url.slice(url.indexOf('.'), url.length)) {
    case '.obj':
      return new Mesh(url);
    case '.png':
      return new Texture(url);
    default:
      console.error(`No resource for file width extension ${url}`);
      break;
    }
  }

  loadResource (resource) {
    this.resourcesLoading.set(resource.url, resource);
    axios.get(`${resource.url}`, { headers: { 'accept': 'image/png', }})
      .then(res => {
        resource.constructor.parse(resource, res.data);
        this.resources.set(resource.url, resource);
        this.resourcesLoading.delete(resource.url);
        if (resource.img) {
          document.getElementById('root').appendChild(resource.img);
        }
      })
      .catch(err => {
        this.resourcesLoading.delete(resource.url);
        console.error(`Unable to load resource ${resource.url} ${err}`);
      });
  }

}


export default ResourceLoader;
