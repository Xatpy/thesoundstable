const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const CACHE_PLACEHOLDER = "__BUILD_ID__";

const getBuildId = (assetManifest) =>
  crypto.createHash("sha256").update(assetManifest).digest("hex").slice(0, 12);

const generateServiceWorker = ({ buildDirectory }) => {
  const manifestPath = path.join(buildDirectory, "asset-manifest.json");
  const workerPath = path.join(buildDirectory, "service-worker.js");
  const manifest = fs.readFileSync(manifestPath, "utf8");
  const worker = fs.readFileSync(workerPath, "utf8");

  if (!worker.includes(CACHE_PLACEHOLDER)) {
    throw new Error(`Service worker cache placeholder ${CACHE_PLACEHOLDER} is missing.`);
  }

  fs.writeFileSync(workerPath, worker.replace(CACHE_PLACEHOLDER, getBuildId(manifest)));
};

if (require.main === module) {
  generateServiceWorker({ buildDirectory: path.join(process.cwd(), "build") });
}

module.exports = { CACHE_PLACEHOLDER, generateServiceWorker, getBuildId };
