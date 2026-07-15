import { getIdFromUrl, verifySound } from "./utils";

describe("sound utilities", () => {
  it("derives a stable ID from an MP3 URL", () => {
    expect(getIdFromUrl("https://example.com/sounds/hello-world.mp3")).toBe("hello-world");
  });

  it("accepts only complete sound records", () => {
    expect(verifySound({ text: "Hello", soundURL: "https://example.com/hello.mp3" })).toBe(true);
    expect(verifySound({ text: "Hello" })).toBe(false);
  });
});
