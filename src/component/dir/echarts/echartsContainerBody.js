import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import echarts from "echarts";
import echartsPieBody from "./echartsPieOption";
import echartsBarBody from "./echartsBarOption";

function EchartsContainerBody() {
  let data = useSelector((state) => state.data);
  let ref = useRef();

  let echartsModelType = useSelector((state) => state.echartsModelType);

  useEffect(() => {
    let currentItem = echarts.init(ref.current);
    if (echartsModelType === "pie") {
      currentItem.setOption(echartsPieBody(data));
    } else {
      currentItem.setOption(echartsBarBody(data));
    }
  }, [echartsModelType, data]);

  return <div className="fm-echarts" id="echartsMain" ref={ref}></div>;
}

export default EchartsContainerBody;
