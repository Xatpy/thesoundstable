const fs = require("fs");
const { boardPages, siteUrl } = require("./seo-pages");
const canonicalPaths = ["/", ...boardPages.map((page) => page.path)];
const entries = canonicalPaths
  .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

fs.writeFileSync("./build/sitemap.xml", sitemap);
