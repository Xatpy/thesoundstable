import auronImage from "src/images/people/auronPlay.webp";
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

export const getIdFromUrl = (urlSound: string): string => {
  return urlSound.substring(urlSound.lastIndexOf("/") + 1).replace(".mp3", "");
};

export function verifySound(sound: any): boolean {
  return sound.text !== undefined && sound.soundURL !== undefined;
}

// Get image from the "title" field given in the data.json file
export const getImageFromType = (title: string): any => {
  const dict = {
    APM: apmImage,
    AuronPlay: auronImage,
    "El Xokas": elXokasImage,
    Ibai: ibaiImage,
    IlloJuan: illoJuanImage,
    Bisbal: bisbalImage,
    "La Vida Moderna": laVidaModernaImage,
    "Luis Enrique": luisEnriqueImage,
    Llados: lladosImage,
    Maldini: maldiniImage,
    Rajoy: rajoyImage,
    Rubius: rubiusImage,
    "El Chiringuito": elChiringuitoImage,
    DjMariio: djMariioImage,
  };

  //obj[str as keyof typeof obj];
  return dict[title as keyof typeof dict];
};

export function isIOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export function isInPWA() {
  // For iOS Safari
  if (window.navigator.standalone) {
    return true;
  }
  // For other browsers
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return true;
  }
  return false;
}
