import mime from "mime-types";
function filterDefault(path) {
  return true;
}
// 文件过滤
function filterText(item) {
  return mime.contentType(item).startsWith("text");
}
// 图片过滤
function filterImg(item) {
  return mime.contentType(item).startsWith("image");
}
// 视频过滤
function filterVideo(item) {
  return mime.contentType(item).startsWith("video");
}

export { filterDefault, filterText, filterImg, filterVideo };
