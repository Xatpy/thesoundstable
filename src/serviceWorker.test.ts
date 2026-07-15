import fs from "fs";
import os from "os";
import path from "path";
import { CACHE_PLACEHOLDER, generateServiceWorker, getBuildId } from "./service-worker-generator";

const serviceWorkerPath = path.join(process.cwd(), "public", "service-worker.js");
const indexPath = path.join(process.cwd(), "public", "index.html");

describe("PWA shell configuration", () => {
  it("ships a same-origin service worker with cache migration protection", () => {
    const worker = fs.readFileSync(serviceWorkerPath, "utf8");

    expect(worker).toContain(`const CACHE_NAME = "sounds-table-shell-${CACHE_PLACEHOLDER}"`);
    expect(worker).toContain('key.startsWith("sounds-table-")');
    expect(worker).toContain('event.data?.type !== "CACHE_URLS"');
    expect(worker).toContain('url.origin === self.location.origin');
  });

  it("derives a new cache name from each production asset manifest", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "sounds-table-worker-"));
    const firstManifest = '{"files":{"main.js":"/static/js/main.first.js"}}';
    const secondManifest = '{"files":{"main.js":"/static/js/main.second.js"}}';
    const worker = `const CACHE_NAME = "sounds-table-shell-${CACHE_PLACEHOLDER}";`;

    try {
      fs.writeFileSync(path.join(directory, "asset-manifest.json"), firstManifest);
      fs.writeFileSync(path.join(directory, "service-worker.js"), worker);
      generateServiceWorker({ buildDirectory: directory });
      expect(fs.readFileSync(path.join(directory, "service-worker.js"), "utf8")).toContain(
        `sounds-table-shell-${getBuildId(firstManifest)}`
      );

      fs.writeFileSync(path.join(directory, "asset-manifest.json"), secondManifest);
      fs.writeFileSync(path.join(directory, "service-worker.js"), worker);
      generateServiceWorker({ buildDirectory: directory });
      expect(fs.readFileSync(path.join(directory, "service-worker.js"), "utf8")).toContain(
        `sounds-table-shell-${getBuildId(secondManifest)}`
      );
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });

  it("registers the worker and sends loaded first-party assets to it", () => {
    const index = fs.readFileSync(indexPath, "utf8");

    expect(index).toContain('navigator.serviceWorker.register("/service-worker.js")');
    expect(index).toContain('type: "CACHE_URLS"');
  });
});
