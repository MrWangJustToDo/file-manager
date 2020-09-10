import React from "react";
import { Link } from "react-router-dom";

function FileBlockFileItem(props) {
  return (
    <div className="fm-file-item relative" title={props.readAbleLength}>
      <Link
        className="block"
        to={`/file${props.relativePath}/${props.fileTypeExtention.slice(
          0,
          props.fileTypeExtention.indexOf("/")
        )}/${props.index}`}
      >
        <i className="fas fa-file"></i>
        <span className="fm-file-name block">{props.sortPath}</span>
      </Link>
    </div>
  );
}

export default FileBlockFileItem;
