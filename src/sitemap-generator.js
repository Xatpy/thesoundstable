const fs = require("fs");

const canonicalPaths = [
  "/",
  "/ElXokas",
  "/Ibai",
  "/AuronPlay",
  "/DjMariio",
  "/Bisbal",
  "/IlloJuan",
  "/Knekro",
  "/LuisEnrique",
  "/APM",
  "/LaVidaModerna",
  "/Llados",
  "/Maldini",
  "/Rubius",
  "/Rajoy",
  "/ElChiringuito",
];

const siteUrl = "https://thesoundstable.com";
const entries = canonicalPaths
  .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

fs.writeFileSync("./build/sitemap.xml", sitemap);
