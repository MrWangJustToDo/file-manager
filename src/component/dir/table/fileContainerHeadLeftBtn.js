import React from "react";

function FileContainerHeadLeftBtn() {
  return (
    <div className="fm-table-header-leftBtns son-input-allHidden">
      <label className="inline-flex-center" htmlFor="upload">
        <i className="block fas fa-file-upload"></i>
        上传
        <input className="fm-header-btnUpload" type="file" id="upload" />
      </label>
      <label className="inline-flex-center" >
        <span className="block">
          <i className="fas fa-file-medical"></i>
          新建文件
        </span>
      </label>
      <label className="inline-flex-center" >
        <span className="block">
          <i className="fas fa-folder-plus"></i>
          新建文件夹
        </span>
      </label>
      <label className="inline-flex-center">
        <span className="block">
          <i className="fas fa-file-download"></i>
          下载选中
        </span>
      </label>
    </div>
  );
}

export default FileContainerHeadLeftBtn;
