import React from "react";
import { Link } from "react-router-dom";
function FileTableDirItem(props) {
  return (
    <tr className="fm-table-folder">
      <td className="son-inline-block-center relative">
        <input type="checkbox" disabled />
        <i className="fas fa-folder"></i>
        <Link to={`/all${props.relativePath}`}>
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

export default FileTableDirItem;
