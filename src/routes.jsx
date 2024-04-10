import React from "react";
import { Switch, Route } from "react-router";

import { BrowserRouter } from "react-router-dom";

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" />
      <Route path={`/ElXokas`} />
      <Route path={`/xokas`} />
      <Route path={`/Ibai`} />
      <Route path={`/LuisEnrique`} />
      <Route path={`/IlloJuan`} />
      <Route path={`/LaVidaModerna`} />
      <Route path={`/Maldini`} />
      <Route path={`/Rubius`} />
      <Route path={`/ElChiringuito`} />
      <Route path={`/chiringuito`} />

      <Route path="*" />
    </Switch>
  </BrowserRouter>
);
