import React from "react";
import { Link } from "react-router-dom";

function FileTableFileItem(props) {
  return (
    <tr className="fm-table-file">
      <td className="son-inline-block-center relative">
        <input type="checkbox" />
        <i className="fas fa-file"></i>
        <Link
          to={`/file${props.relativePath}/${props.fileTypeExtention.slice(
            0,
            props.fileTypeExtention.indexOf("/")
          )}/${props.index}`}
        >
          {props.sortPath}
        </Link>
      </td>
      <td>
        <span>{props.readAbleLength}</span>
      </td>
      <td>
        <span>{props.modifyTime}</span>
      </td>
    </tr>
  );
}

export default FileTableFileItem;
