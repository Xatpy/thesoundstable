import elXokasImage from "src/images/people/elXokas.jpg";
import ibaiImage from "src/images/people/ibai.jpeg";
import illoJuanImage from "src/images/people/illoJuan.jpeg";
import laVidaModernaImage from "src/images/people/laVidaModerna.jpeg";
import luisEnriqueImage from "src/images/people/luisEnrique.webp";
import maldiniImage from "src/images/people/maldini.webp";
import rubiusImage from "src/images/people/rubius.jpeg";

export const getIdFromUrl = (urlSound: string): string => {
  return urlSound.substring(urlSound.lastIndexOf("/") + 1).replace(".mp3", "");
};

export function verifySound(sound: any): boolean {
  return sound.text !== undefined && sound.soundURL !== undefined;
}

// Get image from the "title" field given in the data.json file
export const getImageFromType = (title: string): any => {
  const dict = {
    "El Xokas": elXokasImage,
    Ibai: ibaiImage,
    IlloJuan: illoJuanImage,
    "La Vida Moderna": laVidaModernaImage,
    "Luis Enrique": luisEnriqueImage,
    Maldini: maldiniImage,
    Rubius: rubiusImage,
  };

  //obj[str as keyof typeof obj];
  return dict[title as keyof typeof dict];
};
