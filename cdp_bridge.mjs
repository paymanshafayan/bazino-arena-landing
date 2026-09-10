#!/usr/bin/env node
/**
 * CDP Browser Bridge — Chrome DevTools Protocol Client for Arena Agent
 * Connects directly to Chrome remote debugging port or Cloudflare tunnel.
 *
 * Usage:
 *   node cdp_bridge.mjs <cdp_url> list
 *   node cdp_bridge.mjs <cdp_url> navigate <url>
 *   node cdp_bridge.mjs <cdp_url> screenshot <output_path>
 *   node cdp_bridge.mjs <cdp_url> eval <javascript_expression>
 */

import fs from 'node:fs';

const [cdpBaseUrl, command, arg1] = process.argv.slice(2);

if (!cdpBaseUrl) {
  console.log('Usage: node cdp_bridge.mjs <cdp_url> [list | navigate <url> | screenshot <path> | eval <js>]');
  process.exit(1);
}

const cleanBase = cdpBaseUrl.replace(/\/+$/, '');

async function getTabs() {
  const res = await fetch(`${cleanBase}/json/list`);
  if (!res.ok) throw new Error(`Failed to fetch /json/list: ${res.status} ${res.statusText}`);
  return await res.json();
}

function resolveWsUrl(rawWsUrl) {
  // If Chrome returned ws://localhost:9222/devtools/page/... but we are connecting via https://xyz.trycloudflare.com
  const u = new URL(rawWsUrl);
  const baseU = new URL(cleanBase);
  u.protocol = baseU.protocol === 'https:' ? 'wss:' : 'ws:';
  u.host = baseU.host;
  return u.toString();
}

class CdpSession {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.pending = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.id && this.pending.has(data.id)) {
            const { resolve: res, reject: rej } = this.pending.get(data.id);
            this.pending.delete(data.id);
            if (data.error) rej(new Error(data.error.message || JSON.stringify(data.error)));
            else res(data.result);
          }
        } catch (e) {
          console.error('[CDP Message Parse Error]', e);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

async function main() {
  const tabs = await getTabs();
  const pageTabs = tabs.filter(t => t.type === 'page' || !t.type);

  if (command === 'list' || !command) {
    console.log(`Found ${pageTabs.length} open tab(s):`);
    pageTabs.forEach((t, i) => {
      console.log(`  [${i + 1}] ${t.title || 'Untitled'} — ${t.url} (id: ${t.id})`);
    });
    return;
  }

  const targetTab = pageTabs[0];
  if (!targetTab) {
    throw new Error('No open page tab found in Chrome.');
  }

  const wsUrl = resolveWsUrl(targetTab.webSocketDebuggerUrl);
  console.log(`Connecting to CDP target: ${targetTab.title} (${wsUrl})...`);
  const session = new CdpSession(wsUrl);
  await session.connect();

  try {
    if (command === 'navigate') {
      const targetUrl = arg1 || 'http://localhost:3000';
      console.log(`Navigating to ${targetUrl}...`);
      await session.send('Page.enable');
      await session.send('Page.navigate', { url: targetUrl });
      await new Promise(r => setTimeout(r, 2000));
      console.log('Navigation complete.');
    } else if (command === 'screenshot') {
      const outPath = arg1 || 'screenshot.png';
      console.log(`Capturing browser screenshot to ${outPath}...`);
      await session.send('Page.enable');
      const res = await session.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });
      const buffer = Buffer.from(res.data, 'base64');
      fs.writeFileSync(outPath, buffer);
      console.log(`✓ Real browser screenshot saved successfully: ${outPath} (${buffer.length} bytes)`);
    } else if (command === 'eval') {
      const expr = arg1 || 'document.title';
      console.log(`Evaluating: ${expr}...`);
      const res = await session.send('Runtime.evaluate', { expression: expr, returnByValue: true });
      console.log('Result:', res.result?.value);
    } else {
      console.log(`Unknown command: ${command}`);
    }
  } finally {
    session.close();
  }
}

main().catch(err => {
  console.error('[CDP Error]', err.message);
  process.exit(1);
});
