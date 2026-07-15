import apm from "./apm.json";
import auronPlay from "./auronPlay.json";
import bisbal from "./bisbal.json";
import djMariio from "./djMariio.json";
import elChiringuito from "./elChiringuito.json";
import elXokas from "./elXokas.json";
import ibai from "./ibai.json";
import illoJuan from "./illoJuan.json";
import knekro from "./knekro.json";
import laVidaModerna from "./laVidaModerna.json";
import llados from "./llados.json";
import luisEnrique from "./luisEnrique.json";
import maldini from "./maldini.json";
import rajoy from "./rajoy.json";
import rubius from "./rubius.json";
import { Board } from "../types";

const boards = [apm, auronPlay, bisbal, djMariio, elChiringuito, elXokas, ibai, illoJuan, knekro, laVidaModerna, llados, luisEnrique, maldini, rajoy, rubius] as Board[];

describe("published board data", () => {
  it.each(boards)("contains a title and valid sound URLs", (board) => {
    expect(board.title).toBeTruthy();
    expect(board.sounds.length).toBeGreaterThan(0);

    board.sounds.forEach((sound) => {
      expect(sound.text.trim()).toBeTruthy();
      expect(sound.soundURL).toMatch(/^https:\/\/.+\.mp3$/);
    });
  });
});
