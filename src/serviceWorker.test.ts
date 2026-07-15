import fs from "fs";
import path from "path";

const serviceWorkerPath = path.join(process.cwd(), "public", "service-worker.js");
const indexPath = path.join(process.cwd(), "public", "index.html");

describe("PWA shell configuration", () => {
  it("ships a same-origin service worker with cache migration protection", () => {
    const worker = fs.readFileSync(serviceWorkerPath, "utf8");

    expect(worker).toContain('const CACHE_NAME = "sounds-table-shell-v1"');
    expect(worker).toContain('key.startsWith("sounds-table-")');
    expect(worker).toContain('event.data?.type !== "CACHE_URLS"');
    expect(worker).toContain('url.origin === self.location.origin');
  });

  it("registers the worker and sends loaded first-party assets to it", () => {
    const index = fs.readFileSync(indexPath, "utf8");

    expect(index).toContain('navigator.serviceWorker.register("/service-worker.js")');
    expect(index).toContain('type: "CACHE_URLS"');
  });
});
