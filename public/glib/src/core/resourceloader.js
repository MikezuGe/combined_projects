import axios from 'axios';

import { Mesh, Texture, } from 'resources';


axios.defaults.baseURL = `${window.location.origin}/api/glib`;


class ResourceLoader {

  constructor () {
    this.resources = new Map();
    this.resourceQueue = [];
    this.loading = false;
  }

  getResource (url) {
    if (this.resources.has(url)) {
      return this.resources.get(url);
    }
    if (this.resourceQueue.indexOf(url) > -1) {
      return;
    }
    const resource = this.createResource(url);
    this.resourceQueue.push(resource);
    this.loadNextResource();
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

  loadNextResource () {
    if (this.loading) {
      return;
    }
    const resource = this.resourceQueue.shift();
    if (!resource) {
      return;
    }
    this.loading = true;
    axios.get(resource.url, { headers: { 'accept': 'image/png', }})
      .then(res => {
        resource.constructor.parse(resource, res.data);
        this.resources.set(resource.url, resource);
        this.loading = false;
        this.loadNextResource();
        /*
        if (resource.img) {
          document.getElementById('root').appendChild(resource.img);
        }
        */
      })
      .catch(err => {
        const error = `Unable to load resource ${resource.url}`;
        console.error(error, err);
        this.resource.set(resource.url, { error, });
        this.loading = false;
        this.loadNextResource();
      });
  }

}


export default ResourceLoader;
