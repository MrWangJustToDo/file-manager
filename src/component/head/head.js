// head组件
import React from "react";
import Logo from "./logo";
import Path from "./path";
import "./head.css";

function Head() {
  return (
    <header className="header relative">
      <div className="header-nav height-inherit flex">
        <Logo title="hello world!" />
        <Path />
      </div>
    </header>
  );
}

export default Head
