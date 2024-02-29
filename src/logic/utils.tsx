import auronImage from "src/images/people/auronPlay.jpeg";
import apmImage from "src/images/people/apm.jpg";
import bisbalImage from "src/images/people/bisbal.jpeg";
import djMariioImage from "src/images/people/djMariio.jpg";
import elXokasImage from "src/images/people/elXokas.jpg";
import ibaiImage from "src/images/people/ibai.jpeg";
import illoJuanImage from "src/images/people/illoJuan.jpeg";
import laVidaModernaImage from "src/images/people/laVidaModerna.jpeg";
import lladosImage from "src/images/people/llados.webp";
import luisEnriqueImage from "src/images/people/luisEnrique.webp";
import maldiniImage from "src/images/people/maldini.webp";
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
    Rubius: rubiusImage,
    "El Chiringuito": elChiringuitoImage,
    DjMariio: djMariioImage,
  };

  //obj[str as keyof typeof obj];
  return dict[title as keyof typeof dict];
};
