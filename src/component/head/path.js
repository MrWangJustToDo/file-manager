import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function IndexPath() {
  let pathArr = useSelector((state) => state.currentPathArr);
  let pre = "";
  return (
    <div className="head-path-ul">
      <ul className="head-path flex-center inline-flex overflow">
        {pathArr.map((it, index) => {
          pre += it;
          return (
            <li key={index} className="head-path-item flex-center relative">
              <Link to={pre}>{it}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IndexPath;
