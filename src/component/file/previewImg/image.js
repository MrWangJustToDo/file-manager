// 预览图片
import React, { useCallback, useRef } from "react";
import { useHistory, useParams } from "react-router";
import jquery from "jquery";
import { promiseNext } from "../../tools/tools";

function Image() {
  let ref = useRef();
  let history = useHistory();
  let handlerBack = useCallback(() => {
    let current = jquery(ref.current);
    promiseNext(0, () => {
      current.removeClass("animate__zoomIn").addClass("animate__zoomOut");
    }).then(() =>
      promiseNext(300, () => {
        history.goBack();
      })
    );
  }, [history]);

  let { 0: src } = useParams();

  return (
    <div
      className="image-container absolute animate__animated animate__zoomIn animate__faster"
      ref={ref}
    >
      <div className="image absolute overflow">
        <img src={`/file/${src}`} height="100%" alt="图片" />
      </div>
      <button
        className="close-image absolute"
        type="button"
        onClick={handlerBack}
      >
        取消
      </button>
    </div>
  );
}

export default Image;
