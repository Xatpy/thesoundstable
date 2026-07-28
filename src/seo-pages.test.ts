const { boardPages } = require("./seo-pages");

export {};

describe("canonical board URLs", () => {
  it("uses the trailing-slash URLs served directly by GitHub Pages", () => {
    expect(boardPages).not.toHaveLength(0);
    boardPages.forEach((page: { path: string }) => expect(page.path).toMatch(/^\/.+\/$/));
  });
});
