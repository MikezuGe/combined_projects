import axios from 'axios';
import * as resourceTypes from 'resources';


axios.defaults.baseURL = `${window.location.origin}/api/glib`;
axios.defaults.headers.common['accept'] = 'image/png';


const resourceTypesByExt = {
  '.png': url => new resourceTypes.Texture(url),
  '.obj': url => new resourceTypes.Mesh(url),
  '.mtl': url => new resourceTypes.Material(url),
  '.glsl': url => new resourceTypes.ShaderSource(url),
  '.cnf': url => new resourceTypes.SceneSource(url),
};


const resourceTypesByUrl = {
  'Plane': url => new resourceTypes.Plane(url),
  'Sphere': url => new resourceTypes.Sphere(url),
};


const createResource = url => {
  const ext = url.slice(url.indexOf('.'), url.length);
  if (resourceTypesByExt[ext]) {
    return resourceTypesByExt[ext](url);
  } else if (resourceTypesByUrl[url]) {
    return resourceTypesByUrl[url](url);
  }
  console.error(`No resource for file with url: ${url}`); // eslint-disable-line
};


export default class ResourceLoader {

  constructor () {
    this.resources = new Map();
    this.resourceQueue = [];
    this.allLoadedCallback = null;
    this.loading = false;
  }

  createShape (shape, options) {
    let num = 0;
    const resource = createResource(url);
    let url = shape.toLowerCase();
    while (this.resources.has(`${url}${num}`)) {
      num += 1;
    }
    url += `${num}`;
    this.resources.set(resource.url, resource);
    resource.constructor.generate(resource, options);
    return resource;
  }

  getResource (url, callback) {
    if (this.resources.has(url)) {
      return this.resources.get(url);
    }
    const index = this.resourceQueue.indexOf(url);
    if (index > -1) {
      return this.resourceQueue[index];
    }
    const resource = createResource(url);
    this.resourceQueue.push(resource);
    this.loadNextResource(callback);
    return resource;
  }

  loadNextResource (callback) {
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
    axios.get(resource.url).then(res => {
      const loadMore = resource.constructor.parse(resource, res.data);
      this.resources.set(resource.url, resource);
      if (loadMore) {
        loadMore(this);
      }
      if (callback) {
        callback(resource);
      }
      this.loading = false;
      this.loadNextResource();
    })
    .catch(err => {
      const error = `Unable to load resource ${resource.url}`;
      console.error(error, err); // eslint-disable-line
      this.resource.set(resource.url, { error, });
      this.loading = false;
      this.loadNextResource();
    });
  }

  allLoaded () {
    //console.log(this.resources);
  }

}
