import React from "react";
import { useSelector } from "react-redux";
import Table from "./table/fileContainer";
import Echarts from "./echarts/echartsContainer";
import "./dir.css";

export default () => {
  let showModel = useSelector((state) => state.showModel);

  return (
    <div className="fm-container relative overflow">
      {showModel === "fileModel" ? <Table /> : <Echarts />}
    </div>
  );
};
