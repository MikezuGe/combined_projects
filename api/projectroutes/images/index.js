const express = require('express');
const fs = require('fs');
const imageRouter = express.Router();
const sharp = require('sharp');

// Custom router imports
// ...


const projectRoot = './public/images/';
const dataRoot = './public/images/data/';
const thumbnailRoot = './public/images/data/thumbnails/';

imageRouter

.get('/api/images', (req, res) => {
  fs.readdir(`${dataRoot}`, (err, fileNames) => {
    const filteredFileNames = fileNames.filter(fileName => fs.lstatSync(`${dataRoot}${fileName}`).isFile())
    Promise.all(filteredFileNames
      .map(fileName => new Promise((resolve, reject) => {
      fs.readFile(`${dataRoot}${fileName}`, (err, file) => {
        const image = sharp(file);
        image
          .metadata()
          .then(metadata => {
            image
              .resize(Math.trunc(metadata.width / metadata.height * 128), 128)
              .toFile(`${thumbnailRoot}${fileName}`)
              .then(data => {
                resolve(true);
              })
              .catch(err => {
                reject('Thumbnails were not created');
              });
          });
      });
    })))
      .then(() => {
        res.send({
          thumbnailUrls: filteredFileNames.map(fileName => `${'data/thumbnails/'}${fileName}`),
          bigImageUrls: filteredFileNames.map(fileName => `${'data/'}${fileName}`),
        });
      })
      .catch(err => console.log(err));
  });
});


module.exports = imageRouter;