const fs = require('fs');
const logger = require('./logger');


const createDataFolderStructure = (parentFolderPath, folderStructure, allFolders = {}) => {
  for (const folder in folderStructure) {
    const folderPath = `${parentFolderPath}${folder}/`;
    allFolders[folder] = folderPath;
    fs.mkdir(folderPath, err => {
      if (err) {
        if (err.code === 'EEXIST') {
          return folderStructure[folder]
            ? createDataFolderStructure(folderPath, folderStructure[folder], allFolders)
            : allFolders;
        }
        logger.err(`Unable to create folder ${folderPath}`, err);
      }
      logger.info(`Created folder ${folderPath}`);
      if (folderStructure[folder]) {
        return createDataFolderStructure(folderPath, folderStructure[folder], allFolders);
      }
    });
  }
  return allFolders;
};


module.exports = createDataFolderStructure;
