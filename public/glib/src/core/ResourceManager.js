import axios from 'axios';
import { Material, Mesh, SceneSource, ShaderSource, Texture, } from 'resources';


axios.defaults.baseURL = `${window.location.origin}/api/glib`;
axios.defaults.headers.common['accept'] = 'image/png';


const allowedExt = /^\.(?:obj|mtl|png|cnf|glsl)$/;

const isAllowedExt = ext => allowedExt.test(ext);

const isValidUrl = url => {
  if (!url) {
    return new Error('No url defined.');
  }
  const index = url.lastIndexOf('.');
  if (index === -1) {
    return new Error(`No file extension in url. Url: ${url}`);
  }
  const ext = url.slice(index);
  if (!isAllowedExt(ext)) {
    return new Error(`Illegal file extension: ${ext}`);
  }
}

const createResource = url => {
  switch (url.slice(url.lastIndexOf('.'))) {
    case '.obj': return new Mesh(url);
    case '.mtl': return new Material(url);
    case '.png': return new Texture(url);
    case '.glsl': return new ShaderSource(url);
    case '.cnf': return new SceneSource(url);
    default: throw new Error(`Unable to find resource with url: ${url}`);
  }
}


export default class ResourceManager {

  constructor () {
    this.cache = new Map();
    this.loadQueue = new Map();
    this.loading = false;
  }

  getResource (url, onResourceLoad) {
    const err = isValidUrl(url);
    if (err) {
      throw new Error(err);
    } else if (this.cache.has(url)) {
      const resource = this.cache.get(url)
      onResourceLoad(resource)
      return resource;
    } else if (this.loadQueue.has(url)) {
      if (onResourceLoad) {
        const value = this.loadQueue.get(url);
        value.callbacks.push(onResourceLoad);
        this.loadQueue.set(url, value);
      }
      return this.loadQueue.get(url).resource;
    } else {
      const resource = createResource(url);
      const callbacks = onResourceLoad ? [ onResourceLoad, ] : [];
      this.loadQueue.set(resource.url, { resource, callbacks, });
      this.loadNextResource();
      return resource;
    }
  }

  loadNextResource () {
    if (this.loading) {
      return;
    }
    var nextValue = this.loadQueue.values().next().value;
    if (!nextValue) {
      return;
    }
    const { resource, callbacks, } = nextValue;
    this.loading = true;
    axios.get(resource.url).then(result => {
      this.loadQueue.delete(resource.url);
      this.cache.set(resource.url, resource);
      const loadMore = resource.parse(result.data);
      loadMore && loadMore(this);
      callbacks.forEach(callback => { callback(resource); });
      this.loading = false;
      this.loadNextResource();
    }).catch(err => {
      console.error(err); // eslint-disable-line
    });
  }

  deleteResource (resource) {
    resource.remove();
    this.cache.delete(resource.url);
    this.loadQueue.delete(resource.url);
  }

  deleteAllResources () {
    this.cache.forEach(resource => {
      resource.delete();
    });
    this.loadQueue.forEach(resource => {
      resource.delete();
    });
    this.cache.clear();
    this.loadQueue.clear();
  }

}