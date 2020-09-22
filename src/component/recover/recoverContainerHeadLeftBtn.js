import React from "react";
import RecoverContainerHeadDeleteFile from "./recoverContainerHeadDeleteFile";
import RecoverContainerHeadCheckAll from "./recoverContainerHeadCheckAll";

function FileContainerHeadLeftBtn() {
  return (
    <div className="fm-table-header-leftBtns son-input-allHidden">
      <RecoverContainerHeadCheckAll />
      <RecoverContainerHeadDeleteFile />
      <label className="inline-flex-center">
        <span className="block">
          <i className="fas fa-reply"></i>
          还原选中
        </span>
      </label>
    </div>
  );
}

export default FileContainerHeadLeftBtn;
