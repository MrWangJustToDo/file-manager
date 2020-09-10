import React, { useCallback } from "react";
import { useParams } from "react-router";
import Image from "./previewImg/image";
import Editor from "./codemirror/editor";
import "animate.css";
import "./file.css";
import { useSelector, useDispatch } from "react-redux";

function File() {
  let getDirPath = useCallback((path) => {
    if (path.includes("/")) {
      path = path.slice(0, path.lastIndexOf("/"));
    } else {
      path = "";
    }
    return "/all/" + path;
  }, []);
  let { 0: path, type } = useParams();
  let currentPath = getDirPath(path);
  let dispatch = useDispatch();
  let { currentRequestPath } = useSelector((state) => state);
  if (currentRequestPath !== currentPath) {
    dispatch({ type: "refresh", path: currentPath });
  }
  if (type === "image") {
    return <Image />;
  } else {
    return <Editor />;
  }
}

export default File;
