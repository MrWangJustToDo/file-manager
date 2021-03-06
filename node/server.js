// 登录服务器
const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const svgCaptcha = require("svg-captcha");
const session = require("express-session");
const sqlite3 = require("sqlite3");
const multer = require("multer");
const sqlite = require("sqlite");
const cors = require("cors");
const path = require("path");
const WebSocket = require("ws");
const {
  getCurrentFolder,
  getRecoverFolder,
  getCurrentFileByPost,
  getCurrentFileByGet,
  submitFile,
  uploadFile,
  deleteItem,
  renameItem,
  recoverItem,
  createFile,
  copyFile,
  createFolder,
  downloadFile,
  wsToMap,
  sendRootFolderSize,
} = require("./api");
const createFolderByPath = require("./lib/createFolder").createFolderByPath;

// 基础端口
const port = 10010;

// 邀请码
const InviteCode = ["mrwang"];

// 存储所有用户文件夹的文件
const BaseDir = "/root";

// 缓存地址
const tempFolder = "/root/cache";

// 上传文件缓存
let upload = multer({ dest: tempFolder });

// 创建数据库连接
var db;

// 创建服务器
let app = express();

// 配置跨域
app.use(
  cors({
    maxAge: 86400,
    origin: "*",
  })
);

app.use(express.static("../build"));

// 绑定数据库文件
app.use(async (req, rex, next) => {
  if (!db) {
    db = await sqlite.open({
      filename: "./user",
      driver: sqlite3.Database,
    });
  }
  next();
});

// 解码URL
app.use((req, res, next) => {
  req.url = decodeURIComponent(req.url);
  next();
});

// 配置json解析
app.use(express.json({ limit: "5mb" }));
// 解析表单
app.use(express.urlencoded({ extended: true }));
// 配置cookie
app.use(cookieParser("abcdefg12345"));
// 配置session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
// 生成session
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  next();
});

// 打印请求
app.use((req, res, next) => {
  console.log(`使用${req.method}方法请求 ${req.url}`);
  next();
});

// 获取登录对象
app.use(async (req, res, next) => {
  // 从签名cookie中找出该用户的信息并挂在req对象上以供后续的中间件访问
  if (req.signedCookies.id) {
    req.user = await db.get(
      "SELECT rowid, * FROM users WHERE rowid = ?",
      req.signedCookies.id
    );
  }
  next();
});

// 根据登录对象获取对应的rootFolder, recoverFolder的绝对路径,并添加到req对象上方便后续访问
app.use(async (req, res, next) => {
  if (req.user) {
    let temp = await db.get(
      "SELECT * FROM folders WHERE userId = ?",
      req.user.rowid
    );
    req.rootFolder = path.resolve(BaseDir, temp.rootFolder);
    req.recoverFolder = path.resolve(BaseDir, temp.recoverFolder);
  }
  next();
});

// 获取验证码
app.get("/captcha", (req, res) => {
  let captcha = svgCaptcha.create({
    noise: 3,
    background: "#ffffff",
  });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.send(captcha.data);
});

// 响应验证码明文,用于调试
app.get("/captcha/str", (req, res) => {
  res.json({ code: 0, state: req.session.captcha });
});

// 判断是否能够自动登录
app.get("/autoLogin", async (req, res, next) => {
  if (req.user) {
    res.json({ code: 0, state: req.user.username });
  } else {
    res.json({ code: -1, state: "fail" });
  }
});

// 登录
app.post("/login", async (req, res, next) => {
  if (req.session.captcha === req.body.checkcode) {
    let user = await db.get(
      "SELECT rowid as id, * FROM users WHERE username = ? AND password = ?",
      req.body.username,
      req.body.password
    );
    if (user) {
      res.cookie("id", user.id, {
        maxAge: 8640000,
        signed: true,
      });
      res.json({ code: 0, state: user.username });
    } else {
      res.json({ code: -1, state: "用户信息验证失败" });
    }
  } else {
    res.json({ code: -1, state: "验证码验证失败" });
  }
});

// 登出
app.post("/logout", (req, res, next) => {
  res.clearCookie("id");
  res.json({ code: 0, state: "登出成功" });
});

// 检测用户名是否可用
app.get("/register-check", async (req, res, next) => {
  // let {count} = await db.get('SELECT count(*) as count from users');
  if (req.query.username) {
    let data = await db.get(
      "SELECT * FROM users WHERE username = ?",
      req.query.username
    );
    if (data) {
      res.json({ code: -1, state: "用户名重复" });
    } else {
      res.json({ code: 0, status: "用户名可用" });
    }
  }
});

// 注册
app.post("/register", async (req, res, next) => {
  if (InviteCode.includes(req.body.invite)) {
    try {
      await db.run(
        "INSERT INTO users VALUES(?, ?)",
        req.body.username,
        req.body.password
      );
      let id = await db.get("SELECT last_insert_rowid() FROM users");
      let timeStep = new Date();
      // 生成rootFolder名称
      let rootFolder = timeStep.getTime().toString(32);
      // 生成recoverFolder名称
      let recoverFolder = timeStep.getTime().toString(16);
      let resolveRootFolder = path.resolve(BaseDir, rootFolder);
      let resolveRecoverFolder = path.resolve(BaseDir, recoverFolder);
      // 创建文件夹
      await createFolderByPath(resolveRootFolder);
      await createFolderByPath(resolveRecoverFolder);
      // 写入数据库
      await db.run(
        "INSERT INTO folders VALUES(?,?,?)",
        id["last_insert_rowid()"],
        rootFolder,
        recoverFolder
      );
      res.json({ code: 0, state: "注册成功" });
    } catch (e) {
      console.log("注册服务失败", e);
      res.json({ code: -1, state: "注册失败" });
    }
  } else {
    res.json({ code: -1, state: "邀请码不正确" });
  }
});

// 拦截未登录请求
app.use((req, res, next) => {
  if (req.user && req.rootFolder && req.recoverFolder) {
    next();
  } else {
    res.json({ code: -1, state: {} });
  }
});

app.post("/submit", submitFile);
app.post("/upload", upload.single("file"), uploadFile);
app.post("/delete", deleteItem);
app.post("/rename", renameItem);
app.post("/recoverItem", recoverItem);
app.post("/createFile", createFile);
app.post("/copyFile", copyFile);
app.post("/createFolder", createFolder);
app.post("/download", downloadFile);
app.post("/all", getCurrentFolder);
app.post("/recover", getRecoverFolder);
app.post("/file", getCurrentFileByPost);
app.use("/src", getCurrentFileByGet);

// 捕获错误请求
app.use((req, res, next) => {
  console.log("失败请求", req.url);
  res.json({
    code: -1,
    state: "无效请求",
  });
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

// 使用全局变量建立一个用户名与ws对象的映射,当当前用户名执行了

wss.on("connection", (ws, req) => {
  let username = req.url.split("/").slice(-1)[0];
  console.log("WebSocket连接成功, 用户: ", username);
  wsToMap[username] = ws;
  ws.on("close", () => {
    console.log(username, "的webSocket断开连接");
    delete wsToMap[username];
  });
  try {
    async () => await sendRootFolderSize(ws, req);
  } catch (e) {}
});

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
