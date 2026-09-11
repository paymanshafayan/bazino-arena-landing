import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "50mb" }));

  // GET /api/cdp/tabs
  app.get("/api/cdp/tabs", async (req, res) => {
    const port = req.query.port || "9222";
    try {
      let listRes;
      try {
        listRes = await fetch(`http://127.0.0.1:${port}/json/list`, {
          headers: { Host: "localhost:9222" },
        });
      } catch {
        listRes = await fetch(`http://127.0.0.1:${port}/json`, {
          headers: { Host: "localhost:9222" },
        });
      }

      if (!listRes.ok) {
        throw new Error(`Chrome returned HTTP ${listRes.status}`);
      }

      const tabs = await listRes.json();
      res.json({ success: true, tabs });
    } catch (err: any) {
      res.status(502).json({ success: false, error: err.message || String(err) });
    }
  });

  // POST /api/cdp/command
  app.post("/api/cdp/command", async (req, res) => {
    try {
      const { port = "9222", command, arg1, arg2 } = req.body;
      if (!command) {
        return res.status(400).json({ error: "Missing command parameter" });
      }

      const cdpScriptPath = path.resolve(PROJECT_ROOT, "cdp_bridge.mjs");
      const args = [command, arg1, arg2].filter(Boolean).map((a) => `"${String(a).replace(/"/g, '\\"')}"`).join(" ");
      const cmd = `node "${cdpScriptPath}" "http://127.0.0.1:${port}" ${args}`;

      const { stdout, stderr } = await execAsync(cmd, { timeout: 25000 });
      let parsedStdout;
      try {
        parsedStdout = JSON.parse(stdout);
      } catch {
        parsedStdout = stdout.trim();
      }

      res.json({ success: true, result: parsedStdout, stderr: stderr ? stderr.trim() : undefined });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message || String(e) });
    }
  });

  // POST /api/save-screenshot
  app.post("/api/save-screenshot", (req, res) => {
    try {
      const { name = "live-screenshot", imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Missing imageBase64" });
      }

      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(cleanBase64, "base64");

      const targetPaths = [
        path.resolve(PROJECT_ROOT, `hub/previews/${name}.png`),
        path.resolve(PROJECT_ROOT, `client/public/${name}.png`),
        path.resolve(PROJECT_ROOT, `${name}.png`),
      ];

      for (const p of targetPaths) {
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, buffer);
      }

      res.json({ success: true, size: buffer.length, name });
    } catch (e: any) {
      res.status(500).json({ error: String(e) });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
