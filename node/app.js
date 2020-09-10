// 使用express创建文件服务器
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const MyReadAbleStream = require("./lib/readAbleStream").MyReadable;
const getDirStorage = require("./lib/fm-folderWatch").getDirStorage;
const deleteFileByPath = require("./lib/fm-fileDelete").deleteFileByPath;
const renameFileFromFolder = require("./lib/fm-fileRaname")
  .renameFileFromFolder;
const baseDir = "/home/mrwang/Documents/Web/Code/A_Node/fileManager/root";
const port = 10010;

// 记录当前文件夹
let currentPath = baseDir;

let app = express();

let getFolder = express();

let getFile = express();

let changeFile = express();

let deleteFile = express();

let renameFile = express();

// 配置跨域
app.use(
  cors({
    maxAge: 86400,
    origin: "*",
  })
);
// 配置json解析
app.use(express.json());
// 配置url解析
app.use(express.urlencoded({ extended: true }));

// 打印请求
app.use((req, res, next) => {
  console.log(`使用${req.method}方法请求 ${req.url}`);
  next();
});

// 请求所有数据
app.get("/all", async (req, res, next) => {
  let data = await getDirStorage(baseDir);
  res.json(data);
});

// 请求特定路径
app.use("/all", getFolder);

// 所有请求中的路径参数都为相对路径

// 子路由
getFolder.use(async (req, res, next) => {
  currentPath = path.join(baseDir, req.path);
  let data = await getDirStorage(currentPath);
  res.json(data);
});

// 请求文件
app.use("/file", getFile);

getFile.use((req, res, next) => {
  currentPath = path.join(baseDir, req.path);
  res.sendFile(currentPath);
});

// 更改文件请求
app.use("/submit", changeFile);

// 具体更改文件操作
changeFile.use(async (req, res, next) => {
  let changeFilePath = path.resolve(baseDir, req.path);
  console.log("修改文件: ", changeFilePath);
  let src = req.body.newContent;
  let index = 0;
  let mStream = new MyReadAbleStream({
    highWaterMark: 512,
    read() {
      if (index < src.length) {
        this.push(
          src.slice(index, index + 100 < src.length ? index + 100 : src.length)
        );
        index += 100;
      } else {
        this.push(null);
      }
    },
  });
  mStream.pipe(fs.createWriteStream(changeFilePath));
  mStream.on("end", () => {
    console.log("修改成功");
    res.json({
      code: 0,
      state: "success",
    });
  });
  mStream.on("error", (err) => {
    console.log("修改失败", err);
    res.json({
      code: -1,
      state: "fail",
    });
  });
});

// 删除文件请求
app.use("/delete", deleteFile);

// 删除文件具体操作
deleteFile.use(async (req, res, next) => {
  let deleteFilePath = path.resolve(baseDir, req.path);
  console.log("删除文件", deleteFilePath);
  try {
    await deleteFileByPath(deleteFilePath);
    console.log(`删除${deleteFilePath}文件成功`);
    res.json({
      code: 0,
      state: "success",
    });
  } catch (e) {
    console.log(`删除${deleteFilePath}文件失败`, e);
    res.json({
      code: -1,
      state: "fail",
    });
  }
});

// 重命名文件请求
app.use("/rename", renameFile);

// 重命名文件的具体操作
renameFile.use(async (req, res, next) => {
  console.log(`重命名文件: ${req.path} -> ${req.body.newName} `);
  try {
    await renameFileFromFolder(currentPath, req.path, req.body.newName);
    console.log("重命名文件成功");
    res.json({
      code: 0,
      state: "success",
    });
  } catch (e) {
    console.log("重命名文件出错", e);
    res.json({
      code: -1,
      state: "fail",
    });
  }
});

// 捕获错误请求
app.use((req, res, next) => {
  console.log("失败请求", req.url);
  res.json({
    code: -1,
    state: "无效请求",
  });
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
