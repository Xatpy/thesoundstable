import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { IndexPage } from "src/components/Index/IndexPage";
import { NotFound } from "./components/NotFound";

import dataAuronPlay from "src/data/auronPlay.json";
import dataAPM from "src/data/apm.json";
import dataBisbal from "src/data/bisbal.json";
import dataDjMariio from "src/data/djMariio.json";
import dataElXokas from "src/data/elXokas.json";
import dataIbai from "src/data/ibai.json";
import dataIlloJuan from "src/data/illoJuan.json";
import dataKnekro from "src/data/knekro.json";
import dataLaVidaModerna from "src/data/laVidaModerna.json";
import dataLlados from "src/data/llados.json";
import dataLuisEnrique from "src/data/luisEnrique.json";
import dataMaldini from "src/data/maldini.json";
import dataRajoy from "src/data/rajoy.json";
import dataRubius from "src/data/rubius.json";
import dataElChiringuito from "src/data/elChiringuito.json";
import dataViviendoEnLaCalle from "src/data/viviendoEnLaCalle.json";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const basePath = "/thesoundstable.com-react";
const basePath = "/";

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Switch>
        <Route exact path="/" children={<IndexPage />} />
        <Route exact path={basePath} children={<App data={dataElXokas} />} />
        <Route path={`/ElXokas`} children={<App data={dataElXokas} />} />
        <Route path={`/xokas`} children={<App data={dataElXokas} />} />
        <Route
          path={`${basePath}/ElXokas`}
          children={<App data={dataElXokas} />}
        />
        <Route
          path={`${basePath}/xokas`}
          children={<App data={dataElXokas} />}
        />
        <Route path={`/Ibai`} children={<App data={dataIbai} />} />
        <Route path={`${basePath}/Ibai`} children={<App data={dataIbai} />} />
        <Route path={`/AuronPlay`} children={<App data={dataAuronPlay} />} />
        <Route
          path={`${basePath}/AuronPlay`}
          children={<App data={dataAuronPlay} />}
        />
        <Route path={`/Auron`} children={<App data={dataAuronPlay} />} />
        <Route
          path={`${basePath}/Auron`}
          children={<App data={dataAuronPlay} />}
        />
        <Route path={`/DjMariio`} children={<App data={dataDjMariio} />} />
        <Route path={`/DjMario`} children={<App data={dataDjMariio} />} />
        <Route
          path={`${basePath}/DjMariio`}
          children={<App data={dataDjMariio} />}
        />
        <Route
          path={`${basePath}/DjMario`}
          children={<App data={dataDjMariio} />}
        />
        <Route path={`/Bisbal`} children={<App data={dataBisbal} />} />
        <Route
          path={`${basePath}/Bisbal`}
          children={<App data={dataBisbal} />}
        />
        <Route path={`/IlloJuan`} children={<App data={dataIlloJuan} />} />
        <Route
          path={`${basePath}/IlloJuan`}
          children={<App data={dataIlloJuan} />}
        />
        <Route path={`/Knekro`} children={<App data={dataKnekro} />} />
        <Route
          path={`${basePath}/Knekro`}
          children={<App data={dataKnekro} />}
        />
        <Route
          path={`/LuisEnrique`}
          children={<App data={dataLuisEnrique} />}
        />
        <Route
          path={`${basePath}/LuisEnrique`}
          children={<App data={dataLuisEnrique} />}
        />
        <Route path={`/apm`} children={<App data={dataAPM} />} />
        <Route path={`${basePath}/apm`} children={<App data={dataAPM} />} />
        <Route path={`/APM`} children={<App data={dataAPM} />} />
        <Route path={`${basePath}/APM`} children={<App data={dataAPM} />} />
        <Route
          path={`/LaVidaModerna`}
          children={<App data={dataLaVidaModerna} />}
        />
        <Route
          path={`${basePath}/LaVidaModerna`}
          children={<App data={dataLaVidaModerna} />}
        />
        <Route path={`/Llados`} children={<App data={dataLlados} />} />
        <Route
          path={`${basePath}/Llados`}
          children={<App data={dataLlados} />}
        />
        <Route path={`/Maldini`} children={<App data={dataMaldini} />} />
        <Route
          path={`${basePath}/Maldini`}
          children={<App data={dataMaldini} />}
        />
        <Route path={`/Rubius`} children={<App data={dataRubius} />} />
        <Route
          path={`${basePath}/Rubius`}
          children={<App data={dataRubius} />}
        />
        <Route path={`/Rajoy`} children={<App data={dataRajoy} />} />
        <Route path={`${basePath}/Rajoy`} children={<App data={dataRajoy} />} />
        <Route
          path={`/ElChiringuito`}
          children={<App data={dataElChiringuito} />}
        />
        <Route
          path={`/elchiringuito`}
          children={<App data={dataElChiringuito} />}
        />
        <Route
          path={`${basePath}/Chiringuito`}
          children={<App data={dataElChiringuito} />}
        />
        <Route
          path={`${basePath}/chiringuito`}
          children={<App data={dataElChiringuito} />}
        />
        <Route
          path={`/ViviendoEnLaCalle`}
          children={<App data={dataViviendoEnLaCalle} />}
        />
        <Route
          path={`${basePath}/viviendoenlacalle`}
          children={<App data={dataViviendoEnLaCalle} />}
        />

        {/* Not found */}
        <Route path="*" children={<NotFound />} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
