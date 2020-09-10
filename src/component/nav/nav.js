import React from "react";
import NavFile from "./navFile";
import NavEcharts from "./navEcharts";
import "./nav.css";

function Nav() {
  return (
    <nav className="nav absolute overflow">
      <ul className="nav-select">
        <NavFile />
        <NavEcharts />
      </ul>
    </nav>
  );
}

export default Nav;
