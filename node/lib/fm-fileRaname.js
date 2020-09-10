const fs = require("fs");
const path = require("path");

function renameFileFromFolder(currentDir, currentFileName, newFileName) {
  return new Promise((resolve, reject) => {
    fs.promises
      .access(path.resolve(currentDir, newFileName), fs.constants.F_OK)
      .then(() => reject("文件已经存在"))
      .catch(() => {
        resolve();
      });
  }).then(() =>
    fs.promises.rename(
      path.resolve(currentDir, currentFileName),
      path.resolve(currentDir, newFileName)
    )
  );
}

exports.renameFileFromFolder = renameFileFromFolder;
