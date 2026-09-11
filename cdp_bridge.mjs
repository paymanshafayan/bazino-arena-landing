#!/usr/bin/env node
/**
 * Standalone Node 22 Chrome DevTools Protocol (CDP) Bridge Client
 * Communicates with Chrome remote debugging endpoint via HTTP & WebSocket.
 */

import fs from "node:fs";
import path from "node:path";

const [,, endpointArg, commandArg, ...restArgs] = process.argv;

if (!endpointArg || !commandArg) {
  console.log(`
Usage:
  node cdp_bridge.mjs <endpoint-url> <command> [args...]

Commands:
  list                      List all open target pages
  version                   Get Chrome version metadata
  navigate <url> [targetId] Navigate page to URL
  eval <js-code> [targetId] Evaluate JS expression
  screenshot [out] [tgtId]  Capture PNG screenshot
  call <method> [jsonParams] [tgtId] Send raw CDP command

Examples:
  node cdp_bridge.mjs http://127.0.0.1:9222 list
  node cdp_bridge.mjs http://127.0.0.1:9222 screenshot screenshot.png
`);
  process.exit(0);
}

function normalizeHttpUrl(raw) {
  let url = raw.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `http://${url}`;
  }
  return url.replace(/\/+$/, "");
}

const baseUrl = normalizeHttpUrl(endpointArg);
const command = commandArg.toLowerCase();

async function fetchJson(pathName) {
  const targetUrl = `${baseUrl}${pathName.startsWith("/") ? pathName : `/${pathName}`}`;
  const res = await fetch(targetUrl, {
    headers: {
      "Host": "localhost:9222",
      "User-Agent": "Bazino-CDP-Client/1.0"
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} from ${targetUrl}`);
  }
  return await res.json();
}

async function getTargets() {
  try {
    return await fetchJson("/json/list");
  } catch {
    return await fetchJson("/json");
  }
}

function createCdpSession(wsUrl) {
  return new Promise((resolve, reject) => {
    let finalWsUrl = wsUrl;
    if (baseUrl.startsWith("https://")) {
      finalWsUrl = wsUrl.replace(/^ws:\/\//i, "wss://");
    }

    const ws = new WebSocket(finalWsUrl);
    let idCounter = 1;
    const pending = new Map();

    ws.onopen = () => {
      resolve({
        send: (method, params = {}) => {
          return new Promise((res, rej) => {
            const id = idCounter++;
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        close: () => ws.close()
      });
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id && pending.has(msg.id)) {
          const { res, rej } = pending.get(msg.id);
          pending.delete(msg.id);
          if (msg.error) {
            rej(new Error(msg.error.message || JSON.stringify(msg.error)));
          } else {
            res(msg.result);
          }
        }
      } catch (err) {
        console.error("[CDP Parse Error]", err);
      }
    };

    ws.onerror = (err) => reject(err);
  });
}

async function main() {
  try {
    switch (command) {
      case "version": {
        const ver = await fetchJson("/json/version");
        console.log(JSON.stringify(ver, null, 2));
        break;
      }

      case "list": {
        const targets = await getTargets();
        console.log(JSON.stringify(targets, null, 2));
        break;
      }

      case "screenshot": {
        const outPath = restArgs[0] || "cdp-screenshot.png";
        const explicitTargetId = restArgs[1];
        const targets = await getTargets();
        const pages = targets.filter((t) => t.type === "page" || !t.type);

        if (pages.length === 0) {
          throw new Error("No active page target found in Chrome.");
        }

        const target = explicitTargetId
          ? pages.find((p) => p.id === explicitTargetId) || pages[0]
          : pages[0];

        if (!target?.webSocketDebuggerUrl) {
          throw new Error(`Target ${target?.id || "unknown"} has no webSocketDebuggerUrl.`);
        }

        const session = await createCdpSession(target.webSocketDebuggerUrl);
        await session.send("Page.enable");
        
        const shotResult = await session.send("Page.captureScreenshot", {
          format: "png",
          quality: 100,
          fromSurface: true,
          captureBeyondViewport: true
        });

        session.close();

        if (!shotResult?.data) {
          throw new Error("No screenshot data received from CDP.");
        }

        const buffer = Buffer.from(shotResult.data, "base64");
        const resolvedPath = path.resolve(process.cwd(), outPath);
        fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
        fs.writeFileSync(resolvedPath, buffer);

        console.log(JSON.stringify({
          success: true,
          path: resolvedPath,
          sizeBytes: buffer.length,
          targetId: target.id,
          targetTitle: target.title,
          targetUrl: target.url
        }, null, 2));
        break;
      }

      case "navigate": {
        const navUrl = restArgs[0];
        const explicitTargetId = restArgs[1];
        if (!navUrl) throw new Error("Missing URL for navigate command.");

        const targets = await getTargets();
        const pages = targets.filter((t) => t.type === "page" || !t.type);
        const target = explicitTargetId
          ? pages.find((p) => p.id === explicitTargetId) || pages[0]
          : pages[0];

        if (!target?.webSocketDebuggerUrl) throw new Error("No webSocketDebuggerUrl on target.");

        const session = await createCdpSession(target.webSocketDebuggerUrl);
        await session.send("Page.enable");
        const result = await session.send("Page.navigate", { url: navUrl });
        session.close();

        console.log(JSON.stringify({ success: true, targetId: target.id, result }, null, 2));
        break;
      }

      case "eval": {
        const jsCode = restArgs[0];
        const explicitTargetId = restArgs[1];
        if (!jsCode) throw new Error("Missing JS expression to evaluate.");

        const targets = await getTargets();
        const pages = targets.filter((t) => t.type === "page" || !t.type);
        const target = explicitTargetId
          ? pages.find((p) => p.id === explicitTargetId) || pages[0]
          : pages[0];

        if (!target?.webSocketDebuggerUrl) throw new Error("No webSocketDebuggerUrl on target.");

        const session = await createCdpSession(target.webSocketDebuggerUrl);
        await session.send("Runtime.enable");
        const evalResult = await session.send("Runtime.evaluate", {
          expression: jsCode,
          returnByValue: true,
          awaitPromise: true
        });
        session.close();

        console.log(JSON.stringify({ success: true, result: evalResult?.result?.value }, null, 2));
        break;
      }

      case "call": {
        const method = restArgs[0];
        const paramsRaw = restArgs[1];
        const explicitTargetId = restArgs[2];
        if (!method) throw new Error("Missing CDP method.");

        const params = paramsRaw ? JSON.parse(paramsRaw) : {};
        const targets = await getTargets();
        const pages = targets.filter((t) => t.type === "page" || !t.type);
        const target = explicitTargetId
          ? pages.find((p) => p.id === explicitTargetId) || pages[0]
          : pages[0];

        if (!target?.webSocketDebuggerUrl) throw new Error("No webSocketDebuggerUrl on target.");

        const session = await createCdpSession(target.webSocketDebuggerUrl);
        const result = await session.send(method, params);
        session.close();

        console.log(JSON.stringify({ success: true, method, result }, null, 2));
        break;
      }

      default:
        throw new Error(`Unknown command: ${command}`);
    }
  } catch (err) {
    console.error(JSON.stringify({ error: err.message || String(err) }));
    process.exit(1);
  }
}

main();
