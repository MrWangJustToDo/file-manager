let exec = require('child_process').exec;

// 获取当期文件夹内容大小
function du(path) {
  return new Promise((resolve, reject) => {
    exec(`du -ab --max-depth=1 ${path}`, (error, data) => {
      resolve(data);
      reject(error);
    })
  })
}

exports.du = du;