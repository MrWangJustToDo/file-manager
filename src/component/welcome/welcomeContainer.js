import React, { useEffect, useRef } from "react";
import jquery from "jquery";
import WelcomeContainerHead from "./welcomeContainerHead";
import WelcomeContainerFoot from "./welcomeContainerFoot";
import RegisterContainerBody from "./registerContainerBody";
import LoginContainerBody from "./loginContainerBody";
import "./welcome.css";
import { Route, Switch } from "react-router";

// 登录页面
function LoginContainer() {
  let ref = useRef();

  useEffect(() => {
    let body = jquery(window.document.body);
    let item = jquery(ref.current);
    body.on("mousemove", (e) => {
      if (e.pageX <= body.outerWidth() / 2) {
        item.css("backgroundPosition", "49%");
      } else {
        item.css("backgroundPosition", "51%");
      }
      if (e.pageY <= body.outerHeight() / 2) {
        item.css("backgroundPositionY", "49%");
      } else {
        item.css("backgroundPositionY", "51%");
      }
    });
    return () => body.off("mousemove");
  }, []);

  return (
    <div className="login relative bg bg-content-bg" ref={ref}>
      <WelcomeContainerHead title="file-Manager" />
      <Switch>
        <Route path="/login">
          <LoginContainerBody />
        </Route>
        <Route path="/register">
          <RegisterContainerBody />
        </Route>
      </Switch>
      <WelcomeContainerFoot />
    </div>
  );
}

export default LoginContainer;
