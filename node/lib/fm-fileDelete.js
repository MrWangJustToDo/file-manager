const fs = require("fs").promises;
const path = require("path");

function deleteFileFromFolder(currentDir, currentFile) {
  return fs.unlink(path.resolve(currentDir, currentFile));
}

function deleteFileByPath(currentFilePath) {
  return fs.unlink(currentFilePath);
}

exports.deleteFileFromFolder = deleteFileFromFolder;

exports.deleteFileByPath = deleteFileByPath;
