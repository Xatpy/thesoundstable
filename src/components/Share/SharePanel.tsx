import React from "react";

import { ShareType } from "./ShareComponent";
import { ShareComponent } from "./ShareComponent";

import styles from "./SharePanel.module.css";

import android from "../../images/share/android-logo.png";
import googlePlay from "../../images/share/google-play.png";

export const SharePanel: React.FC = () => {
  return (
    <>
      <div className={styles.share}>
        <div className={styles.shareSocial}>
          <span>
            <em>Compartir:</em>
          </span>
          <ShareComponent type={ShareType.Whatsapp} />
          <ShareComponent type={ShareType.Twitter} />
          {/* <ShareComponent type={ShareType.Facebook} /> */}
          <ShareComponent type={ShareType.Telegram} />
        </div>

        <div className={styles.shareGooglePlay}>
          <a
            href="https://play.google.com/store/apps/details?id=com.xatpy.thesoundstable"
            target="blank"
            rel="noopener noreferrer"
          >
            <img
              alt={"Android logo"}
              src={android}
              className={styles.androidLogo}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.xatpy.thesoundstable"
            target="blank"
            rel="noopener noreferrer"
            className={styles.titleGooglePlay}
          >
            <div className={styles.shareGooglePlayDescription}>
              <span>¡App ya disponible para Android!</span>
              <span>Envía los audios directamente por WhatsApp</span>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.xatpy.thesoundstable"
            target="blank"
            rel="noopener noreferrer"
          >
            <img
              alt={"Ya disponible en Google play"}
              src={googlePlay}
              className={styles.googlePlayLogo}
            />
          </a>
        </div>
      </div>
    </>
  );
};
