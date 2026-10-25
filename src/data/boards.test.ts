import fs from "fs";
import path from "path";
import { GITHUB_AUDIO_PREFIX } from "../logic/audio";
import { Board, Sound } from "../types";

const dataDirectory = path.join(process.cwd(), "src", "data");
const boardFiles = fs
  .readdirSync(dataDirectory)
  .filter((file) => file.endsWith(".json"))
  .sort();

const parseBoard = (file: string): Board => {
  const contents = fs.readFileSync(path.join(dataDirectory, file), "utf8");

  try {
    return JSON.parse(contents) as Board;
  } catch (error) {
    throw new Error(`${file} is not valid JSON: ${(error as Error).message}`);
  }
};

// Titles are rendered as crawlable text, so AdSense reviews them. Swear words
// must be censored (e.g. "p*ta") and slurs are not allowed at all.
const blockedText =
  /\bput[aoáóí](?!n\b)|\bpollas?\b|\bpollazo|lipoll|\bcoño\b|coj[oó]n|\bmierda|culo\b|\bverga\b|\bnabo\b|\bmamada|\bpajas?\b|\btetas?\b|\bcabr[oó]n|fuck|\bshit\b|\bh?o+stia|sudaca|retrasad|anormal|subnormal|\bmaric[oó]n|\bmaricas?\b/i;

const expectValidSound = (file: string, sound: Sound, index: number) => {
  expect(typeof sound).toBe("object");
  expect(typeof sound.text).toBe("string");
  expect(sound.text.trim()).toBeTruthy();
  expect(sound.text).not.toMatch(blockedText);
  expect(typeof sound.soundURL).toBe("string");
  expect(sound.soundURL.startsWith(GITHUB_AUDIO_PREFIX)).toBe(true);
  expect(() => new URL(sound.soundURL)).not.toThrow();
  expect(new URL(sound.soundURL).protocol).toBe("https:");
  expect(new URL(sound.soundURL).pathname).toMatch(/\.mp3$/);

  if (sound.tag !== undefined) {
    expect(typeof sound.tag).toBe("string");
  }
};

describe("published board data", () => {
  it("discovers every JSON board file", () => {
    expect(boardFiles.length).toBeGreaterThan(0);
  });

  it.each(boardFiles)("%s is parseable and conforms to the board schema", (file) => {
    const board = parseBoard(file);

    expect(Object.keys(board).sort()).toEqual(["sounds", "title"]);
    expect(typeof board.title).toBe("string");
    expect(board.title.trim()).toBeTruthy();
    expect(Array.isArray(board.sounds)).toBe(true);
    expect(board.sounds.length).toBeGreaterThan(0);

    board.sounds.forEach((sound, index) => expectValidSound(file, sound, index));
  });
});
