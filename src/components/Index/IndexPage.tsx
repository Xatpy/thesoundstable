import React from "react";

import elXokasImage from "src/images/people/elXokas.jpg";
import ibaiImage from "src/images/people/ibai.jpeg";
import illoJuanImage from "src/images/people/illoJuan.jpeg";
import laVidaModernaImage from "src/images/people/laVidaModerna.jpeg";
import luisEnriqueImage from "src/images/people/luisEnrique.webp";
import maldiniImage from "src/images/people/maldini.webp";
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
          <IndexLink href="./Ibai/" imagePath={ibaiImage} title="Ibai" />
          <IndexLink
            href="./IlloJuan/"
            imagePath={illoJuanImage}
            title="IlloJuan"
          />
          <IndexLink href="./Rubius/" imagePath={rubiusImage} title="Rubius" />
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
            href="./LaVidaModerna/"
            imagePath={laVidaModernaImage}
            title="La Vida Moderna"
          />
          <IndexLink
            href="./ElChiringuito/"
            imagePath={elChiringuitoImage}
            title="El Chiringuito"
          />
        </div>
      </div>
    </>
  );
};
