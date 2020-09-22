import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import Welcome from "./welcome";
import Home from "./home";
import File from "./file";
import Msg from "./msg";

export default () => {
  let location = useLocation();
  let { msgState } = useSelector((state) => state);
  let background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route path="/file/**/:type/:id">
          <File />
        </Route>
        <Route path="/login">
          <Welcome />
        </Route>
        <Route path="/register">
          <Welcome />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {background && msgState && <Route path="/msg" children={<Msg />} />}
    </>
  );
};
