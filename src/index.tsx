import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { NotFound } from "./components/NotFound";
import { BoardKey, BoardPage } from "./components/BoardPage";

const IndexPage = React.lazy(() =>
  import("./components/Index/IndexPage").then(({ IndexPage: Component }) => ({ default: Component }))
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const boardRoutes: Array<{ path: string[]; board: BoardKey }> = [
  { path: ["/ElXokas", "/xokas"], board: "elXokas" },
  { path: ["/Ibai"], board: "ibai" },
  { path: ["/AuronPlay", "/Auron"], board: "auronPlay" },
  { path: ["/DjMariio", "/DjMario"], board: "djMariio" },
  { path: ["/Bisbal"], board: "bisbal" },
  { path: ["/IlloJuan"], board: "illoJuan" },
  { path: ["/Knekro"], board: "knekro" },
  { path: ["/LuisEnrique"], board: "luisEnrique" },
  { path: ["/apm", "/APM"], board: "apm" },
  { path: ["/LaVidaModerna"], board: "laVidaModerna" },
  { path: ["/Llados"], board: "llados" },
  { path: ["/Maldini"], board: "maldini" },
  { path: ["/Rubius"], board: "rubius" },
  { path: ["/Rajoy"], board: "rajoy" },
  { path: ["/ElChiringuito", "/elchiringuito", "/Chiringuito", "/chiringuito"], board: "elChiringuito" },
];

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Suspense fallback={<p role="status">Cargando…</p>}>
        <Switch>
          <Route exact path="/" render={() => <IndexPage />} />
          {boardRoutes.map(({ path, board }) => (
            <Route key={board} exact path={path} render={() => <BoardPage board={board} />} />
          ))}
          <Route render={() => <NotFound />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
