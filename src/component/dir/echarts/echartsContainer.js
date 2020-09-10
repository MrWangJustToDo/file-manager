import React from "react";
import EchartsContainerHead from "./echartsContainerHead";
import EchartsContainerBody from "./echartsContainerBody";

function EchartsContainer(props) {

  return (
    <div className="fm-echarts-container">
      {!props.isloading && (
        <>
          <EchartsContainerHead />
          <EchartsContainerBody {...props} />
        </>
      )}
    </div>
  );
}

export default EchartsContainer;
