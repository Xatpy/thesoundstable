import React from "react";

import styles from "./ShareLink.module.css";

type ShareLinkProps = {
  href: string;
  title: string;
  src: string;
};

export const ShareLink: React.FC<ShareLinkProps> = ({ href, title, src }) => {
  return (
    <a
      aria-label={title}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      <img alt={`Logo ${title}`} src={src} className={styles.logo} />
    </a>
  );
};
