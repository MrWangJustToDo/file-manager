import React from "react";
import { useDispatch, useSelector } from "react-redux";

function FileContainerHeadRightBtn() {
  let fileModelType = useSelector((state) => state.fileModelType);
  let dispatch = useDispatch();
  return (
    <div className="fm-table-header-rightTools">
      <label className="fm-table-header-search inline-flex">
        <input
          type="text"
          className="fm-table-header-search-input"
          placeholder="搜索你的文件"
        />
        <i className="fm-table-search-btn relative fas fa-search"></i>
      </label>
      <span
        className={
          fileModelType === "normal" ? "inline-flex check" : "inline-flex"
        }
        onClick={() =>
          dispatch({ type: "changeFileModelType", content: "normal" })
        }
      >
        <i className="fas fa-list-ul fm-table-header-sort inline-flex"></i>
      </span>
      <span
        className={
          fileModelType === "block" ? "inline-flex check" : "inline-flex"
        }
        onClick={() =>
          dispatch({ type: "changeFileModelType", content: "block" })
        }
      >
        <i className="fas fa-th-large fm-table-header-big inline-flex"></i>
      </span>
    </div>
  );
}

export default FileContainerHeadRightBtn;
