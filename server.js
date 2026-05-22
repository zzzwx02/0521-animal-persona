const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const {
  isAdminRequest,
  normalizeResult,
  sendJson,
  sendText,
  summarizeResults,
  toCsv,
} = require("./lib/results-store");

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const RESULTS_FILE = path.join(DATA_DIR, "results.json");
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RESULTS_FILE);
  } catch {
    await fs.writeFile(RESULTS_FILE, "[]\n", "utf8");
  }
}

async function readResults() {
  await ensureDataFile();
  const raw = await fs.readFile(RESULTS_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeResults(results) {
  await ensureDataFile();
  await fs.writeFile(RESULTS_FILE, `${JSON.stringify(results, null, 2)}\n`, "utf8");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,X-Admin-Token",
    });
    res.end();
    return;
  }

  if (url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname === "/api/results" && req.method === "POST") {
    try {
      const body = await readBody(req);
      const payload = JSON.parse(body || "{}");
      const result = normalizeResult(payload, req);
      const results = await readResults();
      const existingIndex = results.findIndex((item) => item.result_id === result.result_id);
      if (existingIndex >= 0) results[existingIndex] = result;
      else results.push(result);
      await writeResults(results);
      sendJson(res, 201, { ok: true, result_id: result.result_id });
    } catch (error) {
      sendJson(res, 400, { ok: false, error: error.message || "Invalid result payload" });
    }
    return;
  }

  if (url.pathname === "/api/results" && req.method === "GET") {
    if (!isAdminRequest(req, url)) {
      sendJson(res, 401, { ok: false, error: "Admin token required" });
      return;
    }
    const results = await readResults();
    sendJson(res, 200, {
      ok: true,
      summary: summarizeResults([...results].reverse()),
      results: [...results].reverse(),
      token_required: Boolean(ADMIN_TOKEN),
    });
    return;
  }

  if (url.pathname === "/api/results.csv" && req.method === "GET") {
    if (!isAdminRequest(req, url)) {
      sendText(res, 401, "Admin token required");
      return;
    }
    const results = await readResults();
    res.writeHead(200, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="animal-persona-results.csv"',
      "Cache-Control": "no-store",
    });
    res.end(toCsv([...results].reverse()));
    return;
  }

  sendJson(res, 404, { ok: false, error: "API route not found" });
}

async function serveStatic(req, res, url) {
  const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const relativePath = pathname.replace(/^\/+/, "");
  const filePath = path.resolve(ROOT_DIR, relativePath);

  if (!filePath.startsWith(ROOT_DIR)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": ext === ".png" ? "public, max-age=3600" : "no-cache",
    });
    res.end(content);
  } catch {
    sendText(res, 404, "Not found");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message || "Server error" });
  }
});

ensureDataFile().then(() => {
  server.listen(PORT, HOST, () => {
    console.log(`Animal Persona is running at http://localhost:${PORT}`);
    console.log(`Admin dashboard: http://localhost:${PORT}/admin.html`);
  });
});
