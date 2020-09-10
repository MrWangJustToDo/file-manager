import React from "react";
import { useSelector, useDispatch } from "react-redux";

function EchartsContainerHead() {
  let echartsModelType = useSelector((state) => state.echartsModelType);

  let dispatch = useDispatch();

  return (
    <nav className="fm-echarts-header flex-center">
      <div className="fm-data-module inline-flex">
        <div
          className={
            "fm-data-pie inline-flex-center " +
            (echartsModelType === "pie" ? "check" : "")
          }
          onClick={() =>
            dispatch({ type: "changeEchartsModelType", content: "pie" })
          }
        >
          饼形图
        </div>
        <div
          className={
            "fm-data-bar inline-flex-center " +
            (echartsModelType === "bar" ? "check" : "")
          }
          onClick={() =>
            dispatch({ type: "changeEchartsModelType", content: "bar" })
          }
        >
          柱状图
        </div>
      </div>
    </nav>
  );
}

export default EchartsContainerHead;
