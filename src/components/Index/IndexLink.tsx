import React from "react";

import { Link } from "react-router-dom";

import "./IndexLink.css";

type Props = {
  href: string;
  imagePath: string;
  title: string;
};

export const IndexLink: React.FC<Props> = ({ href, imagePath, title }) => {
  return (
    <div className="divSubsection divSubsectionImage">
      <Link to={href} className="linkSubpage">
        <img
          src={imagePath}
          className="logoSubsection"
          alt={`Logo principal ${title}`}
        />
        <label className="lblSubsection">{title}</label>
      </Link>
    </div>
  );
};
