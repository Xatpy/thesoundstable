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

  const share = () => {
    // Primero, verifica si la Web Share API está disponible
    if (navigator.share) {
      // Intenta compartir
      navigator
        .share({
          title: "Añade aplicación con acceso directo",
          text: " Pulsa el botón de compartir y luego 'Añadir a pantalla de inicio'",
          url: window.location.href,
        })
        .then(() => {
          console.log("¡Compartido con éxito!");
        })
        .catch((error) => {
          console.warn("Error al compartir:", error);
        });
    } else {
      // Manejar casos donde la Web Share API no está disponible
      alert(
        "La funcionalidad de compartir no está disponible en tu navegador."
      );
    }
  };
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
          <div
            id="installWPA"
            className={styles.installWPA}
            tabIndex={0}
            onClick={share}
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
          </div>
        )}
      </div>
    </>
  );
};
