import React from "react";
import { useSelector } from "react-redux";
import FileTableFileItem from "./fileTableFileItem";
import FileTableDirItem from "./fileTableDirItem";
import * as Allfilter from "../../tools/listFilter";

function FileTableBody() {
  let filter = useSelector((state) => state.filter);
  let { data, isLoading } = useSelector((state) => state);
  return (
    <tbody>
      {!isLoading &&
        data.files.map((it) => {
          return it.fileType === "file" ? (
            Allfilter[filter](it.sortPath) && (
              <FileTableFileItem key={it.index} {...it} />
            )
          ) : (
            <FileTableDirItem key={it.index} {...it} />
          );
        })}
    </tbody>
  );
}

export default FileTableBody;
