const express = require('express');
const fs = require('fs');
const imagesRouter = express.Router();
//const sharp = require('sharp');


const { createDataFolderStructure, logger, } = require('../../../utility');


const rootFolder = './public/images/';
const dataPaths = createDataFolderStructure(rootFolder, {
  data: {
    thumbnails: false,
    bigimages: false,
  },
});


/*
const allowedImageExtensions = Object.keys(sharp.format).filter(key => sharp.format[key].input.file === true).map(key => `.${key}`);
// Special cases for jpeg
allowedImageExtensions.push('.jpg', '.jpe', '.jif', 'jfif', 'jfi');
const imageExtensionRegex = /\.\w+/i;
*/


imagesRouter.get('/', (req, res) => {
  fs.readdir(dataPaths.bigimages, (err, fileNames) => {
    if (fileNames.length === 0) {
      logger.warn('No images found');
      res.status(204).send('No images found');
      return;
    }

    const bigImageFileNames = fileNames.filter(fileName => {
      return fs.lstatSync(`${dataPaths.bigimages}${fileName}`).isFile()
      /*&&
    allowedImageExtensions.includes(imageExtensionRegex.exec(fileName)[0]);*/
    });
    res.send(bigImageFileNames);
    /*
    const thumbnailFileNames = bigImageFileNames.map(fileName => fileName.replace(imageExtensionRegex, '.jpeg'));

    Promise.all(bigImageFileNames.map((fileName, index) => new Promise((resolve, reject) => {
      const image = sharp(`${dataPaths.bigimages}${fileName}`);
      image.metadata()
        .then(metadata => {
          image
            .resize(Math.round(metadata.width / metadata.height * 128), 128)
            .toFile(`${dataPaths.thumbnails}${thumbnailFileNames[index]}`)
              .then(data => { resolve(); })
              .catch(err => {
                logger.warn(err);
                reject(`Thumbnail was not created for file: ${fileName}`);
              });
        })
        .catch(err => {
          logger.warn(`Could not read metadata of file ${fileName}`)
          reject(`${err}`);
        });
      })
    ))
      .then(() => {
        const relativeThumbnailFolder = dataPaths.thumbnails.replace(rootFolder, '');
        const relativeBigImageFolder = dataPaths.bigimages.replace(rootFolder, '');
        res.send({
          thumbnailUrls: thumbnailFileNames.map(fileName => `${relativeThumbnailFolder}${fileName}`),
          bigImageUrls: bigImageFileNames.map(fileName => `${relativeBigImageFolder}${fileName}`),
        });
      })
      .catch(err => {
        logger.warn(err);
        res.status(500).send('Handling images failed');
        return;
      });
  */
  });
});


module.exports = imagesRouter;
