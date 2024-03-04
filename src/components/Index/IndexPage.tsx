import React from "react";

import auronPlayImage from "src/images/people/auronPlay.webp";
import apmImage from "src/images/people/apm.webp";
import bisbalImage from "src/images/people/bisbal.jpeg";
import djMariioImage from "src/images/people/djMariio.jpg";
import elXokasImage from "src/images/people/elXokas.webp";
import ibaiImage from "src/images/people/ibai.jpeg";
import illoJuanImage from "src/images/people/illoJuan.jpeg";
import laVidaModernaImage from "src/images/people/laVidaModerna.webp";
import lladosImage from "src/images/people/llados.webp";
import luisEnriqueImage from "src/images/people/luisEnrique.webp";
import maldiniImage from "src/images/people/maldini.webp";
import rajoyImage from "src/images/people/rajoy.webp";
import rubiusImage from "src/images/people/rubius.jpeg";
import elChiringuitoImage from "src/images/people/elChiringuito.webp";

import { Header } from "../Header";
import { IndexLink } from "./IndexLink";
import { SharePanel } from "../Share/SharePanel";

import "./IndexPage.css";

export const IndexPage: React.FC = () => {
  return (
    <>
      <Header />
      <SharePanel />
      <div className="mainIndex">
        <div className="contentIndex">
          <IndexLink
            href="./ElXokas/"
            imagePath={elXokasImage}
            title="El Xokas"
          />
          <IndexLink
            href="./DjMariio/"
            imagePath={djMariioImage}
            title="DjMariio"
          />
          <IndexLink
            href="./AuronPlay/"
            imagePath={auronPlayImage}
            title="Auron Play"
          />
          <IndexLink href="./Llados/" imagePath={lladosImage} title="Llados" />
          <IndexLink href="./Ibai/" imagePath={ibaiImage} title="Ibai" />
          <IndexLink href="./Bisbal/" imagePath={bisbalImage} title="Bisbal" />
          <IndexLink href="./Rubius/" imagePath={rubiusImage} title="Rubius" />
          <IndexLink
            href="./IlloJuan/"
            imagePath={illoJuanImage}
            title="IlloJuan"
          />
          <IndexLink
            href="./LuisEnrique/"
            imagePath={luisEnriqueImage}
            title="LuisEnrique"
          />
          <IndexLink
            href="./Maldini/"
            imagePath={maldiniImage}
            title="Maldini"
          />
          <IndexLink
            href="./ElChiringuito/"
            imagePath={elChiringuitoImage}
            title="El Chiringuito"
          />
          <IndexLink href="./Rajoy/" imagePath={rajoyImage} title="Rajoy" />
          <IndexLink href="./APM/" imagePath={apmImage} title="APM?" />
          <IndexLink
            href="./LaVidaModerna/"
            imagePath={laVidaModernaImage}
            title="La Vida Moderna"
          />
        </div>
      </div>
    </>
  );
};
