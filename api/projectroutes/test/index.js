const express = require('express');
const fs = require('fs');
const testRouter = express.Router();


const { createDataFolderStructure, } = require('../../../utility');


const rootFolder = './public/test/';
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


testRouter.get('/:url', (req, res) => {
  const { url, } = req.params;
  const ext = url.slice(url.indexOf('.'));
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


module.exports = testRouter;
