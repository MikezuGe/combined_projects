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
    const head = {};
    const options = {};
    switch (url.slice(url.indexOf('.'), url.length)) {
    case '.obj':
      resourcePath = `${rootPath}${meshesFolder}${url}`;
      head['Content-Type'] = 'text/plain';
      break;
    case '.png':
      resourcePath = `${rootPath}${texturesFolder}${url}`;
      head['Content-Type'] = 'image/png';
      options.encoding = 'base64';
      break;
    default:
      break;
    }
    res.writeHead(200, head);
    fs.createReadStream(resourcePath, options).pipe(res);
    
  });


module.exports = glibRouter;