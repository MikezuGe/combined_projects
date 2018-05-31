const express = require('express');
const fs = require('fs');
const glibRouter = express.Router();


const { createDataFolderStructure, } = require('../../../utility');


const rootFolder = './public/glib/';
const dataPaths = createDataFolderStructure(rootFolder, {
  data: {
    meshes: false,
    textures: false,
  }
});


glibRouter.get('/:url', (req, res) => {
  const { url, } = req.params;
  let resourcePath = '';
  const head = {};
  const options = {};
  switch (url.slice(url.indexOf('.'), url.length)) {
  case '.obj':
    resourcePath = `${dataPaths.meshes}${url}`;
    head['Content-Type'] = 'text/plain';
    break;
  case '.png':
    resourcePath = `${dataPaths.textures}${url}`;
    head['Content-Type'] = 'image/png';
    options.encoding = 'base64';
    break;
  default:
    break;
  }
  fs.exists(resourcePath, exist => {
    if (exist) {
      res.writeHead(200, head);
      fs.createReadStream(resourcePath, options).pipe(res);
      return;
    }
    res.status(404).send('File not found');
  });
});


module.exports = glibRouter;
