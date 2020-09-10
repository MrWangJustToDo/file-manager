import React from "react";
import Head from "./head/head";
import Nav from "./nav/nav";
import Body from "./dir/dirContainer";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

function Home() {
  let location = useLocation();
  let dispatch = useDispatch();
  let { currentRequestPath } = useSelector((state) => state);
  if (currentRequestPath !== location.pathname) {
    dispatch({ type: "refresh", path: location.pathname });
  }
  return (
    <div className="absolute height-inherit width-inherit animate__animated animate__fadeIn animate__faster">
      <Head />
      <Nav />
      <Body />
    </div>
  );
}

export default Home;
