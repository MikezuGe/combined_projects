const express = require('express');
const fs = require('fs');
const glibRouter = express.Router();


const { createDataFolderStructure, } = require('../../../utility');


const rootFolder = './public/glib/';
const dataPaths = createDataFolderStructure(rootFolder, {
  data: {
    materials: false,
    meshes: false,
    scenes: false,
    shaders: false,
    textures: false,
  },
});


const createResponse = {
  '.jpg': url => ({
    resourcePath: `${dataPaths.textures}${url}`,
    headers: { 'Content-Type': 'image/jpg', },
    options: { 'encoding': 'base64', },
  }),
  '.png': url => ({
    resourcePath: `${dataPaths.textures}${url}`,
    headers: { 'Content-Type': 'image/png', },
    options: { 'encoding': 'base64', },
  }),
  '.mtl': url => ({
    resourcePath: `${dataPaths.materials}${url}`,
    headers: { 'Content-Type': 'text/plain', },
  }),
  '.obj': url => ({
    resourcePath: `${dataPaths.meshes}${url}`,
    headers: { 'Content-Type': 'text/plain', },
  }),
  '.glsl': url => ({
    resourcePath: `${dataPaths.shaders}${url}`,
    headers: { 'Content-Type': 'text/plain', },
  }),
  '.cnf': url => ({
    resourcePath: `${dataPaths.scenes}${url}`,
    headers: { 'Content-Type': 'text/plain', },
  })
}


glibRouter.get('/:url', (req, res) => {
  const { url, } = req.params;
  const ext = url.slice(url.lastIndexOf('.'));
  const { resourcePath, headers, options, } = createResponse[ext](url);
  fs.exists(resourcePath, exist => {
    if (exist) {
      res.writeHead(200, headers);
      fs.createReadStream(resourcePath, options || {}).pipe(res);
      return;
    }
    res.status(404).send('File not found');
  });
});


module.exports = glibRouter;
