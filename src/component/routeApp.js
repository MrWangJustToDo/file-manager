import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./home";
import File from "./file/fileContainer";

export default () => {
  return (
    <Switch>
      <Route path="/file/**/:type/:id">
        <File />
      </Route>
      <Route path="/all">
        <Home />
      </Route>
    </Switch>
  );
};
