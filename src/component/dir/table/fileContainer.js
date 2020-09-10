import React from "react";
import { useSelector } from "react-redux";
import FileContainerHead from "./fileContainerHead";
import FileTable from "./fileTable";
import FileBlock from "./fileBlock";
import "animate.css";

function TableContainer() {
  let fileModelType = useSelector((state) => state.fileModelType);

  return (
    <div className="fm-table-container relative animate__animated animate__fadeIn animate__faster">
      <FileContainerHead />
      {fileModelType === "normal" ? <FileTable /> : <FileBlock />}
    </div>
  );
}

export default TableContainer;
