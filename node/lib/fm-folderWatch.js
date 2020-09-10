const fs = require("fs").promises;
const path = require("path");
const prettyBytes = require("pretty-bytes");
const mime = require("mime-types");
const du = require("./fm-du").du;

let baseDir = "/home/mrwang/Documents/Web/Code/A_Node/fileManager/root";

baseDir = path.resolve(baseDir);

function getDirStorage(p) {
  p = path.resolve(p);
  if (p.startsWith(baseDir)) {
    return du(p)
      .then((value) => {
        let temp = value.split(/\n+/);
        temp = temp.filter((it) => it.length > 0).map((it) => it.split(/\s+/));
        let total = temp.pop();
        let re = {
          totalLength: total[0],
          parentPath: total[1],
          relativePath: total[1].split(baseDir)[1] || "/",
          fileType: "dir",
          files: [],
        };
        temp.forEach((it, index) => {
          let [length, resolvePath] = it;
          re["files"].push({ index, length, resolvePath });
        });
        return re;
      })
      .then(getFileType)
      .then((re) => {
        re["files"].sort(
          (o1, o2) =>
            o1["sortPath"].charCodeAt(0) - o2["sortPath"].charCodeAt(0)
        );
        return re;
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    return Promise.reject("permission denied");
  }
}

function getFileType(re) {
  return Promise.all(
    re["files"].map((item) => {
      item["readAbleLength"] = prettyBytes(Number(item.length));
      item["sortPath"] = item.resolvePath.substring(
        item.resolvePath.lastIndexOf("/") + 1
      );
      item["relativePath"] = item.resolvePath.split(baseDir)[1];
      return fs.stat(item.resolvePath).then((file) => {
        if (file.isFile()) {
          item["fileType"] = "file";
          item["fileTypeExtention"] = mime
            .contentType(item.sortPath)
            .split(";")[0];
        } else {
          item["fileType"] = "dir";
        }
        item["modifyTime"] = file.mtime.toLocaleString();
      });
    })
  ).then(() => re);
}

exports.getDirStorage = getDirStorage;
