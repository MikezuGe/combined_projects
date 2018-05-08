const express = require('express');
const fs = require('fs');
const glibRouter = express.Router();


const rootPath = './public/glib/data'
const meshesFolder = '/meshes/';
const texturesFolder = '/textures/';


glibRouter

  .get('/api/glib/:url', (req, res) => {
    const { url, } = req.params;
    let resourcePath = '';
    switch (url.slice(url.indexOf('.'), url.length)) {
    case '.obj':
      resourcePath = `${rootPath}${meshesFolder}${url}`;
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      fs.createReadStream(resourcePath).pipe(res);
      break;
    case '.png':
      resourcePath = `${rootPath}${texturesFolder}${url}`;
      res.writeHead(200, {
        'Content-Type': 'image/png',
      });
      fs.createReadStream(resourcePath, { encoding: 'base64' }).pipe(res);
      break;
    default:
      break;
    }
    
  });


module.exports = glibRouter;