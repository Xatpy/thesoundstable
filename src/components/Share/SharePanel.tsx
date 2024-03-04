import React from "react";

import { ShareType } from "./ShareComponent";
import { ShareComponent } from "./ShareComponent";

import styles from "./SharePanel.module.css";

import { isIOS } from "../../logic/utils";

import android from "../../images/share/android-logo.png";
import googlePlay from "../../images/share/google-play.png";
import iosPWA from "../../images/share/pwa-ios.png";

export const SharePanel: React.FC = () => {
  const iosDevice = isIOS();

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

        <div className={styles.shareSujerencias}>
          <a
            href="https://twitter.com/thesoundstable"
            target="blank"
            rel="noopener noreferrer"
            className={styles.titleGooglePlay}
          >
            <span>¿Quieres añadir nuevos sonidos? ¡Manda tus sujerencias!</span>
          </a>
        </div>

        {!iosDevice && (
          <div id="installAndroid" className={styles.shareGooglePlay}>
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
        )}

        {iosDevice && (
          <div id="installWPA" className={styles.installWPA}>
            <a
              href="https://x.com/thesoundstable/status/1764630357691806174"
              target="blank"
              rel="noopener noreferrer"
              className={styles.titleGooglePlay}
              id="linkInstallPWATwitter"
            >
              <div className={styles.shareGooglePlayDescription}>
                <span>¡App ya disponible para iOS!</span>
                <span>
                  Pulsa el botón de compartir y luego "Añadir a pantalla de
                  inicio".
                </span>
              </div>
              <img
                alt={"Instalación PWA de la app en iOS"}
                src={iosPWA}
                className={styles.googlePlayLogo}
              />
            </a>
          </div>
        )}
      </div>
    </>
  );
};
