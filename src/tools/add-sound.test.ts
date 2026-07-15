import fs from "fs";
import os from "os";
import path from "path";

const { addSound, insertionIndex, parseArguments, toFilename } = require("./add-sound");

describe("add-sound tool", () => {
  let directory: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), "sounds-table-add-sound-"));
    fs.mkdirSync(path.join(directory, "src", "data"), { recursive: true });
    fs.mkdirSync(path.join(directory, "sounds", "TestBoard", "data"), { recursive: true });
    fs.mkdirSync(path.join(directory, "incoming"));
    fs.writeFileSync(path.join(directory, "incoming", "clip.mp3"), "audio");
    fs.writeFileSync(
      path.join(directory, "src", "data", "testBoard.json"),
      JSON.stringify({
        title: "Test Board",
        sounds: [
          { text: "Top", soundURL: "https://example.com/top.mp3", tag: "🥇Top 1" },
          { text: "Older new", soundURL: "https://example.com/old.mp3", tag: "New" },
        ],
      })
    );
  });

  afterEach(() => fs.rmSync(directory, { recursive: true, force: true }));

  it("copies an MP3 and inserts a New sound directly after the Top section", () => {
    const result = addSound({
      rootDirectory: directory,
      board: "testBoard",
      name: "¡Nuevo ñandú!",
      file: path.join(directory, "incoming", "clip.mp3"),
    });
    const updated = JSON.parse(fs.readFileSync(path.join(directory, "src", "data", "testBoard.json"), "utf8"));

    expect(result.filename).toBe("nuevo-nandu.mp3");
    expect(fs.existsSync(path.join(directory, "sounds", "TestBoard", "data", "nuevo-nandu.mp3"))).toBe(true);
    expect(updated.sounds.map((sound: { text: string }) => sound.text)).toEqual(["Top", "¡Nuevo ñandú!", "Older new"]);
    expect(updated.sounds[1].tag).toBe("New");
    expect(updated.sounds[1].soundURL).toContain("sounds/TestBoard/data/nuevo-nandu.mp3");
  });

  it("uses the beginning when a board has no Top sounds", () => {
    expect(insertionIndex([{ tag: "New" }])).toBe(0);
  });

  it("rejects malformed command arguments and creates safe filenames", () => {
    expect(() => parseArguments(["--unknown", "value"])).toThrow("Unknown argument");
    expect(toFilename("Qué tal! 2026")).toBe("que-tal-2026.mp3");
  });
});
