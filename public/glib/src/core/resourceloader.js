import axios from 'axios';

import Scene from './Scene';
import { Mesh, Material, Texture, } from 'resources';
import { Plane, } from 'resources/shapes';


axios.defaults.baseURL = `${window.location.origin}/api/glib`;


class ResourceLoader {

  constructor () {
    this.resources = new Map();
    this.resourceQueue = [];
    this.loading = false;
  }

  getScene (url) {
    const scene = this.createResource(url);
    this.resourceQueue.push(scene);
    this.loadNextResource();
    return scene;
  }

  getResource (url) {
    if (this.resources.has(url)) {
      return this.resources.get(url);
    }
    const index = this.resourceQueue.indexOf(url);
    if (index > -1) {
      return this.resourceQueue[index];
    }
    const resource = this.createResource(url);
    this.resourceQueue.push(resource);
    this.loadNextResource();
    return resource;
  }

  createShape (shape, width, depth) {
    let num = 0;
    let url = shape.toLowerCase();
    while (this.resources.has(`${url}${num}`)) {
      num += 1;
    }
    url += `${num}`;
    let resource;
    switch (shape) {
    case 'Plane': resource = new Plane(url);
      break;
    default: throw new Error(`Shape ${shape} doesn't have a creator function`);
    }
    this.resources.set(resource.url, resource);
    resource.constructor.generateShape(resource, width, depth);
    return resource;
  }

  createResource (url) {
    switch (url.slice(url.indexOf('.'), url.length)) {
    case '.png':
      return new Texture(url);
    case '.obj':
      return new Mesh(url);
    case '.mtl':
      return new Material(url);
    case '.glsl':
      return new Shader(url);
    case '.cnf':
      return new Scene(url);
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
      this.allLoaded();
      return;
    }
    if (this.resources.has(resource.url)) {
      this.loadNextResource();
      return;
    }
    this.loading = true;
    axios.get(resource.url, { headers: { 'accept': 'image/png', }}).then(res => {
      const loadMore = resource.constructor.parse(resource, res.data);
      if (loadMore) {
        loadMore(this);
      }
      this.resources.set(resource.url, resource);
      this.loading = false;
      setTimeout(() => {
        this.loadNextResource();
      }, 1500);
    })
    .catch(err => {
      const error = `Unable to load resource ${resource.url}`;
      console.error(error, err);
      this.resource.set(resource.url, { error, });
      this.loading = false;
      this.loadNextResource();
    });
  }

  allLoaded () {
    console.log(this.resources, this.resourceQueue);
  }

}


const resourceLoader = new ResourceLoader();


export default resourceLoader;
