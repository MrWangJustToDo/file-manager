import React from "react";
import { useDispatch, useSelector } from "react-redux";
function NavFile() {
  let { showModel, filter } = useSelector((store) => store);
  
  let dispatch = useDispatch();

  return (
    <>
      <li
        className={
          showModel === "fileModel" && filter === "filterDefault"
            ? "relative check"
            : "relative"
        }
        onClick={() => {
          dispatch({ type: "changeFilter", content: "filterDefault" });
          dispatch({ type: "changeShowModel", content: "fileModel" });
        }}
      >
        <i className="absolute fas fa-folder-open"></i>
        <span className="block nav-select-item">全部文件</span>
      </li>
      <li
        className={
          showModel === "fileModel" && filter === "filterText"
            ? "relative check"
            : "relative"
        }
        onClick={() => {
          dispatch({ type: "changeFilter", content: "filterText" });
          dispatch({ type: "changeShowModel", content: "fileModel" });
        }}
      >
        <span className="block nav-select-item">文档</span>
      </li>
      <li
        className={
          showModel === "fileModel" && filter === "filterImg"
            ? "relative check"
            : "relative"
        }
        onClick={() => {
          dispatch({ type: "changeFilter", content: "filterImg" });
          dispatch({ type: "changeShowModel", content: "fileModel" });
        }}
      >
        <span className="block nav-select-item">图片</span>
      </li>
      <li
        className={
          showModel === "fileModel" && filter === "filterVideo"
            ? "relative check"
            : "relative"
        }
        onClick={() => {
          dispatch({ type: "changeFilter", content: "filterVideo" });
          dispatch({ type: "changeShowModel", content: "fileModel" });
        }}
      >
        <span className="block nav-select-item">视频</span>
      </li>
    </>
  );
}

export default NavFile;
