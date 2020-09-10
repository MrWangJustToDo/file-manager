import React from "react";
import FileTableBody from "./fileTableBody";
import "animate.css";

function FileTable() {

  return (
    <div className="fm-table relative animate__animated animate__fadeIn animate__faster">
      <table className="fm-table-show relative">
        <thead>
          <tr>
            <th>文件名</th>
            <th>大小</th>
            <th>修改日期</th>
          </tr>
        </thead>
        <FileTableBody />
      </table>
    </div>
  );
}

export default FileTable;
