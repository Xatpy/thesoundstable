import fs from "fs";
import os from "os";
import path from "path";

const { generateSeoArtifacts } = require("./seo-generator");

const template = `<!doctype html><html><head>
<title>The Sounds Table</title>
<meta name="title" content="The Sounds Table" />
<meta name="description" content="Description" />
<meta property="og:url" content="https://thesoundstable.com/" />
<meta property="og:title" content="The Sounds Table" />
<meta property="og:description" content="Description" />
<meta name="twitter:title" content="The Sounds Table" />
<meta name="twitter:description" content="Description" />
<link rel="canonical" href="https://thesoundstable.com/" />
</head><body><div id="root"></div></body></html>`;

describe("SEO artifact generator", () => {
  let directory: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), "sounds-table-seo-"));
    fs.mkdirSync(path.join(directory, "build"));
    fs.mkdirSync(path.join(directory, "data"));
    fs.writeFileSync(path.join(directory, "build", "index.html"), template);
    fs.writeFileSync(
      path.join(directory, "data", "test.json"),
      JSON.stringify({
        title: "Test <board>",
        sounds: [{ text: "Hello <world>", soundURL: "https://example.com/test.mp3" }],
      })
    );
  });

  afterEach(() => fs.rmSync(directory, { recursive: true, force: true }));

  it("creates crawler-readable canonical board pages and an LLM index", () => {
    generateSeoArtifacts({
      buildDirectory: path.join(directory, "build"),
      dataDirectory: path.join(directory, "data"),
      pages: [{ dataFile: "test.json", path: "/Test/" }],
    });

    const boardHtml = fs.readFileSync(path.join(directory, "build", "Test", "index.html"), "utf8");
    const landingHtml = fs.readFileSync(path.join(directory, "build", "index.html"), "utf8");
    const llms = fs.readFileSync(path.join(directory, "build", "llms.txt"), "utf8");

    expect(boardHtml).toContain("<title>Test &lt;board&gt; Sounds | The Sounds Table</title>");
    expect(boardHtml).toContain('<link rel="canonical" href="https://thesoundstable.com/Test/" />');
    expect(boardHtml).toContain("<h1>Test &lt;board&gt; Sounds</h1>");
    expect(boardHtml).toContain("Hello &lt;world&gt;");
    expect(boardHtml).toContain('"@type":"CollectionPage"');
    expect(boardHtml.match(/rel="canonical"/g)).toHaveLength(1);
    expect(landingHtml).toContain('href="/Test/"');
    expect(llms).toContain("https://thesoundstable.com/Test/");
    expect(llms).toContain("Primary language: Spanish (es-ES).");
    expect(llms).toContain("no login, account, purchase, or API is required");
  });
});
