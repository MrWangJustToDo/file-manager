import React from "react";
import { useSelector, useDispatch } from "react-redux";

function NavEcharts() {
  let { showModel } = useSelector((state) => state);

  let dispatch = useDispatch();

  return (
    <>
      <li
        className={showModel === "echartsModel" ? "relative check" : "relative"}
        onClick={() =>
          dispatch({ type: "changeShowModel", content: "echartsModel" })
        }
      >
        <i className="absolute fas fa-hdd"></i>
        <span className="block nav-storage-item">空间占用</span>
      </li>
      <li className="relative">
        <i className="absolute fas fa-archive"></i>
        <span className="block nav-archive-item">回收站</span>
      </li>
    </>
  );
}

export default NavEcharts;
