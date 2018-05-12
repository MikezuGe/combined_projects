const fs = require('fs');


const createDataFolderStructure = (parentFolderPath, folderStructure, allFolders = {}) => {
  Object.keys(folderStructure).forEach(folderName => {
    const folderPath = `${parentFolderPath}${folderName}/`;
    allFolders[folderName] = folderPath;
    if (!fs.existsSync(folderPath)) {
      fs.mkdir(folderPath, err => {
        if (err) {
          console.error(`Unable to create directory: ${folderPath}`);
        } else {
          console.log(`Created directory: ${folderPath}`)
        }
      });
    }
    createDataFolderStructure(folderPath, folderStructure[folderName], allFolders);
  });
  return allFolders;
};


module.exports = createDataFolderStructure;
