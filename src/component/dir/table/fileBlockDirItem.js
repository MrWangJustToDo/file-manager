import React from "react";
import { Link } from "react-router-dom";

function FileBlockDirItem(props) {
  return (
    <div className="fm-folder-item relative" title={props.readAbleLength}>
      <Link className="block" to={`/all${props.relativePath}`}>
        <i className="fas fa-folder"></i>
        <span className="fm-file-name block">{props.sortPath}</span>
      </Link>
    </div>
  );
}

export default FileBlockDirItem;
