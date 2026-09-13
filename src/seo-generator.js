const fs = require("fs");
const path = require("path");
const { boardPages, siteUrl } = require("./seo-pages");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const replaceMetaTag = (html, attribute, name, content) =>
  html.replace(
    new RegExp(`<meta\\s+${attribute}=["']${name}["'][^>]*>`, "i"),
    `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`
  );

const createPageHtml = ({ template, title, description, canonicalPath, content, schema }) => {
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const metadata = [
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");

  let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/i, "");
  html = replaceMetaTag(html, "name", "title", title);
  html = replaceMetaTag(html, "name", "description", description);
  html = replaceMetaTag(html, "property", "og:url", canonicalUrl);
  html = replaceMetaTag(html, "property", "og:title", title);
  html = replaceMetaTag(html, "property", "og:description", description);
  html = replaceMetaTag(html, "name", "twitter:title", title);
  html = replaceMetaTag(html, "name", "twitter:description", description);
  html = html.replace("</head>", `    ${metadata}\n  </head>`);
  return html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
};

const boardDescription = (board) =>
  `Escucha y comparte ${board.sounds.length} sonidos de ${board.title} en The Sounds Table.`;

const createBoardContent = (board) => `
  <main>
    <h1>${escapeHtml(board.title)} Sounds</h1>
    <p>${escapeHtml(boardDescription(board))}</p>
    <section aria-labelledby="sounds-heading">
      <h2 id="sounds-heading">Lista de sonidos</h2>
      <ul>${board.sounds.map((sound) => `<li>${escapeHtml(sound.text)}</li>`).join("")}</ul>
    </section>
  </main>`;

const createBoardSchema = (board, canonicalPath) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${board.title} Sounds`,
  description: boardDescription(board),
  url: `${siteUrl}${canonicalPath}`,
  isPartOf: {
    "@type": "WebSite",
    name: "The Sounds Table",
    url: siteUrl,
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: board.sounds.length,
    itemListElement: board.sounds.map((sound, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sound.text,
      url: sound.soundURL,
    })),
  },
});

const generateSeoArtifacts = ({ buildDirectory, dataDirectory, pages = boardPages }) => {
  const template = fs.readFileSync(path.join(buildDirectory, "index.html"), "utf8");
  const boards = pages.map((page) => ({
    ...page,
    board: JSON.parse(fs.readFileSync(path.join(dataDirectory, page.dataFile), "utf8")),
  }));

  const landingContent = `
    <main>
      <h1>The Sounds Table</h1>
      <p>Una colección de soundboards con sonidos memorables de creadores y programas en español.</p>
      <nav aria-label="Soundboards"><ul>${boards
        .map(({ board, path: canonicalPath }) => `<li><a href="${canonicalPath}">${escapeHtml(board.title)} Sounds</a></li>`)
        .join("")}</ul></nav>
    </main>`;
  const landingSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Sounds Table",
    url: siteUrl,
  };

  fs.writeFileSync(
    path.join(buildDirectory, "index.html"),
    createPageHtml({
      template,
      title: "The Sounds Table | Soundboards en español",
      description: "Descubre y comparte los sonidos más icónicos de streamers y programas españoles.",
      canonicalPath: "/",
      content: landingContent,
      schema: landingSchema,
    })
  );

  for (const { board, path: canonicalPath } of boards) {
    const outputDirectory = path.join(buildDirectory, canonicalPath);
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(
      path.join(outputDirectory, "index.html"),
      createPageHtml({
        template,
        title: `${board.title} Sounds | The Sounds Table`,
        description: boardDescription(board),
        canonicalPath,
        content: createBoardContent(board),
        schema: createBoardSchema(board, canonicalPath),
      })
    );
  }

  const llms = [
    "# The Sounds Table",
    "",
    "The Sounds Table is a Spanish-language soundboard directory of memorable clips from creators, streamers and programmes in Spain.",
    "Use it to find soundboards, identify a quoted reaction, or browse clips by creator or programme.",
    "Each linked page is a canonical board with a description, an accessible list of sound names, and direct MP3 links in its structured data.",
    "",
    "## Language and scope",
    "",
    "- Primary language: Spanish (es-ES).",
    "- Content type: public soundboards and short audio clips; no login, account, purchase, or API is required.",
    "- When referring users to a clip, name the board and clip and link to its canonical board page.",
    "",
    "## Canonical soundboards",
    "",
    ...boards.map(({ board, path: canonicalPath }) => `- [${board.title} Sounds](${siteUrl}${canonicalPath}): ${board.sounds.length} clips.`),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
  fs.writeFileSync(path.join(buildDirectory, "llms.txt"), `${llms}\n`);
};

if (require.main === module) {
  generateSeoArtifacts({
    buildDirectory: path.join(process.cwd(), "build"),
    dataDirectory: path.join(process.cwd(), "src", "data"),
  });
}

module.exports = { createPageHtml, generateSeoArtifacts };
