// Opens http://localhost:3000 in Google Chrome (only) once the dev server is ready.
// Runs alongside `next dev` via the `dev` script in package.json.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { get } from "node:http";

const URL = "http://localhost:3000";

// Common Windows install locations for Chrome.
const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

// How long to wait for the server before giving up (and opening anyway).
const MAX_WAIT_MS = 30_000;
const POLL_INTERVAL_MS = 500;

function findChrome() {
  return CHROME_PATHS.find((p) => existsSync(p));
}

// Resolves true as soon as the dev server answers on the URL.
function waitForServer() {
  const deadline = Date.now() + MAX_WAIT_MS;

  return new Promise((resolve) => {
    const poll = () => {
      const req = get(URL, (res) => {
        res.resume(); // discard body
        resolve(true);
      });

      req.on("error", () => {
        if (Date.now() > deadline) {
          resolve(false);
        } else {
          setTimeout(poll, POLL_INTERVAL_MS);
        }
      });
    };

    poll();
  });
}

async function main() {
  const chrome = findChrome();

  if (!chrome) {
    console.log(
      `\n[open-chrome] Google Chrome was not found in the common locations.\n` +
        `[open-chrome] Please open ${URL} manually in Chrome.\n`
    );
    return;
  }

  const ready = await waitForServer();

  if (!ready) {
    console.log(
      `\n[open-chrome] Server did not respond within ${MAX_WAIT_MS / 1000}s. ` +
        `Opening Chrome anyway...\n`
    );
  }

  const child = spawn(chrome, [URL], { detached: true, stdio: "ignore" });
  child.on("error", () => {
    console.log(
      `\n[open-chrome] Failed to launch Chrome. Please open ${URL} manually.\n`
    );
  });
  child.unref();

  console.log(`\n[open-chrome] Opened ${URL} in Google Chrome.\n`);
}

main();
