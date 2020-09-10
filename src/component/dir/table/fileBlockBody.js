import React from "react";
import { useSelector } from "react-redux";
import FileBlockFileItem from "./fileBlockFileItem";
import FileBlockDirItem from "./fileBlockDirItem";
import * as Allfilter from "../../tools/listFilter";

function FileBlockBody(props) {
  let filter = useSelector((state) => state.filter);
  let { data } = useSelector((state) => state);
  return (
    <>
      {data.files.map((it) => {
        return it.fileType === "file" ? (
          Allfilter[filter](it.sortPath) && (
            <FileBlockFileItem key={it.index} {...it} />
          )
        ) : (
          <FileBlockDirItem key={it.index} {...it} />
        );
      })}
    </>
  );
}

export default FileBlockBody;
