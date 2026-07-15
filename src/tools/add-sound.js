const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const readline = require("readline/promises");

const GITHUB_AUDIO_PREFIX = "https://raw.githubusercontent.com/Xatpy/thesoundstable/main/";
const TOP_TAG = /\btop\s+\d+\b/i;

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const toFilename = (name) => {
  const slug = String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  if (!slug) throw new Error("The display name must contain at least one letter or number.");
  return `${slug}.mp3`;
};

const getBoards = (rootDirectory) => {
  const dataDirectory = path.join(rootDirectory, "src", "data");
  const soundsDirectory = path.join(rootDirectory, "sounds");
  const audioDirectories = fs.readdirSync(soundsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(soundsDirectory, entry.name, "data")))
    .map((entry) => entry.name);

  return fs.readdirSync(dataDirectory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => {
      const id = path.basename(file, ".json");
      const board = JSON.parse(fs.readFileSync(path.join(dataDirectory, file), "utf8"));
      const audioDirectory = audioDirectories.find((directory) => normalize(directory) === normalize(id));
      if (!audioDirectory) return null;

      return {
        id,
        title: board.title,
        dataPath: path.join(dataDirectory, file),
        audioDirectory: path.join(soundsDirectory, audioDirectory, "data"),
      };
    })
    .filter(Boolean);
};

const findBoard = (boards, requestedBoard) => {
  const requested = normalize(requestedBoard);
  const board = boards.find((candidate) =>
    [candidate.id, candidate.title, path.basename(path.dirname(candidate.audioDirectory))]
      .some((value) => normalize(value) === requested)
  );
  if (!board) throw new Error(`Unknown board: ${requestedBoard}`);
  return board;
};

const resolveSourcePath = (sourceFile) => {
  const requestedPath = String(sourceFile).trim();
  const candidate = path.isAbsolute(requestedPath) || requestedPath.includes(path.sep)
    ? path.resolve(requestedPath)
    : path.join(os.homedir(), "Downloads", requestedPath);
  if (!candidate.toLowerCase().endsWith(".mp3")) throw new Error("The source file must have an .mp3 extension.");
  if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) throw new Error(`MP3 file not found: ${candidate}`);
  if (fs.statSync(candidate).size === 0) throw new Error("The source MP3 file is empty.");
  return candidate;
};

const insertionIndex = (sounds) => {
  const lastTopIndex = sounds.reduce(
    (index, sound, currentIndex) => (TOP_TAG.test(sound.tag || "") ? currentIndex : index),
    -1
  );
  return lastTopIndex + 1;
};

const formatSound = (sound) =>
  JSON.stringify(sound, null, 2)
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");

const insertSoundInJson = (rawJson, boardData, sound, index) => {
  const formattedSound = formatSound(sound);
  if (index === 0) {
    const arrayStart = rawJson.indexOf("[", rawJson.indexOf('"sounds"'));
    if (arrayStart === -1) throw new Error("Could not find the sounds array in the board JSON.");
    return `${rawJson.slice(0, arrayStart + 1)}\n${formattedSound},${rawJson.slice(arrayStart + 1)}`;
  }

  const previousSound = formatSound(boardData.sounds[index - 1]);
  const previousSoundOffset = rawJson.indexOf(previousSound);
  if (previousSoundOffset === -1) throw new Error("Could not safely locate the Top section in the board JSON.");

  const commaOffset = rawJson.indexOf(",", previousSoundOffset + previousSound.length);
  if (commaOffset === -1) throw new Error("Could not safely locate the end of the Top section.");
  const insertionOffset = rawJson.indexOf("\n", commaOffset) + 1;
  return `${rawJson.slice(0, insertionOffset)}${formattedSound},\n${rawJson.slice(insertionOffset)}`;
};

const addSound = ({ rootDirectory, board: requestedBoard, name, file }) => {
  const board = findBoard(getBoards(rootDirectory), requestedBoard);
  const sourcePath = resolveSourcePath(file);
  const filename = toFilename(name);
  const targetPath = path.join(board.audioDirectory, filename);
  const rawJson = fs.readFileSync(board.dataPath, "utf8");
  const boardData = JSON.parse(rawJson);
  const soundURL = `${GITHUB_AUDIO_PREFIX}sounds/${path.basename(path.dirname(board.audioDirectory))}/data/${filename}`;

  if (fs.existsSync(targetPath)) throw new Error(`Audio file already exists: ${targetPath}`);
  if (boardData.sounds.some((sound) => sound.soundURL === soundURL)) {
    throw new Error(`The board already contains ${soundURL}`);
  }

  const index = insertionIndex(boardData.sounds);
  const sound = { text: name, soundURL, tag: "New" };
  const updatedJson = insertSoundInJson(rawJson, boardData, sound, index);
  fs.copyFileSync(sourcePath, targetPath);

  try {
    fs.writeFileSync(board.dataPath, updatedJson);
  } catch (error) {
    fs.unlinkSync(targetPath);
    throw error;
  }

  return { board, filename, index, sound, sourcePath, targetPath, rawJson };
};

const rollback = ({ board, targetPath, rawJson }) => {
  fs.writeFileSync(board.dataPath, rawJson);
  fs.rmSync(targetPath, { force: true });
};

const validateData = (rootDirectory) => {
  const result = spawnSync("corepack", ["yarn", "validate:data"], {
    cwd: rootDirectory,
    stdio: "inherit",
  });
  if (result.error || result.status !== 0) {
    throw result.error || new Error("Board validation failed.");
  }
};

const parseArguments = (argumentsList) => {
  const options = {};
  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];
    if (!["--board", "--name", "--file"].includes(argument)) {
      throw new Error(`Unknown argument: ${argument}`);
    }
    const value = argumentsList[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`A value is required after ${argument}`);
    options[argument.slice(2)] = value;
    index += 1;
  }
  return options;
};

const promptForMissingOptions = async (options, boards) => {
  if (options.board && options.name && options.file) return options;
  const prompt = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    if (!options.board) {
      console.log("\nAvailable boards:");
      boards.forEach((board, index) => console.log(`  ${index + 1}. ${board.title} (${board.id})`));
      const answer = await prompt.question("Board number or id: ");
      options.board = /^\d+$/.test(answer) ? boards[Number(answer) - 1]?.id : answer;
    }
    if (!options.name) options.name = await prompt.question("Display name: ");
    if (!options.file) options.file = await prompt.question("MP3 path or filename from Downloads: ");
    return options;
  } finally {
    prompt.close();
  }
};

const main = async () => {
  const rootDirectory = path.resolve(__dirname, "..", "..");
  const options = await promptForMissingOptions(parseArguments(process.argv.slice(2)), getBoards(rootDirectory));
  if (!options.board || !options.name || !options.file) throw new Error("Board, display name, and MP3 file are required.");

  const result = addSound({ rootDirectory, ...options });
  try {
    validateData(rootDirectory);
  } catch (error) {
    rollback(result);
    throw error;
  }

  const placement = result.index === 0 ? "at the start (this board has no Top section)" : "after the Top section";
  console.log(`\nAdded \"${result.sound.text}\" to ${result.board.title} ${placement}.`);
  console.log(`Copied: ${result.targetPath}`);
  console.log(`Updated: ${result.board.dataPath}`);
};

if (require.main === module) {
  main().catch((error) => {
    console.error(`\nUnable to add sound: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { addSound, findBoard, getBoards, insertionIndex, insertSoundInJson, parseArguments, resolveSourcePath, toFilename };
