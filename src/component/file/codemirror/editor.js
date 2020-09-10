import React, { useRef, useEffect, useState } from "react";
import codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/idea.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/python/python";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function Ediotr() {
  let ref = useRef();
  let option = useRef({
    lineNumbers: true,
    theme: "idea",
    tabSize: 2,
    gutters: ["CodeMirror-linenumbers"],
    matchBrackets: true,
  });

  let { data, isLoading } = useSelector((state) => state);

  let { 0: path, id } = useParams();

  const [code, setCode] = useState(null);

  useEffect(() => {
    let code = codemirror.fromTextArea(ref.current, option.current);
    code.setSize("auto", "100%");
    code.refresh();
    setCode(code);
  }, []);

  useEffect(() => {
    if (!isLoading && code) {
      code.setOption(
        "mode",
        data.files.filter((it) => it.index === +id)[0].fileTypeExtention
      );
      axios
        .get(`/file/${path}`)
        .then((res) => {
          code.setValue(res.data.toString());
        })
        .catch((e) => {
          code.setValue(e.toString());
        });
    }
  }, [data, isLoading, code, path]);

  return (
    <div className="editor-cover height-inherit relative animate__animated animate__fadeInUp animate__faster">
      <div className="editor relative">
        <textarea className="code" id="code" name="code" ref={ref}></textarea>
      </div>
      <div className="btns absolute inline-flex">
        <input type="button" value="保存" />
        <input type="button" value="取消" />
      </div>
    </div>
  );
}
export default Ediotr;
