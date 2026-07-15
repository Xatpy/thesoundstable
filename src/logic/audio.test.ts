import { getAudioUrl } from "./audio";

describe("getAudioUrl", () => {
  it("keeps current board URLs intact without a configured CDN", () => {
    const source = "https://raw.githubusercontent.com/Xatpy/thesoundstable/main/sounds/Ibai/data/test.mp3";

    expect(getAudioUrl(source)).toBe(source);
  });

  it("does not rewrite audio from another host", () => {
    const source = "https://example.com/test.mp3";

    expect(getAudioUrl(source)).toBe(source);
  });

  it("uses a configured CDN while preserving the repository asset path", () => {
    const source = "https://raw.githubusercontent.com/Xatpy/thesoundstable/main/sounds/Ibai/data/test.mp3";
    const previousValue = process.env.REACT_APP_AUDIO_CDN_URL;

    jest.resetModules();
    process.env.REACT_APP_AUDIO_CDN_URL = "https://media.example.com/";
    const { getAudioUrl: getConfiguredAudioUrl } = require("./audio");

    expect(getConfiguredAudioUrl(source)).toBe("https://media.example.com/sounds/Ibai/data/test.mp3");

    process.env.REACT_APP_AUDIO_CDN_URL = previousValue;
    jest.resetModules();
  });
});
