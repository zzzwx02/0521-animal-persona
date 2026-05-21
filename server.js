const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const RESULTS_FILE = path.join(DATA_DIR, "results.json");
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";
const IP_HASH_SALT = process.env.ANIMAL_PERSONA_IP_SALT || "animal-persona-local-dev";

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

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}

function sendText(res, status, text, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  res.end(text);
}

function isAdminRequest(req, url) {
  if (!ADMIN_TOKEN) return true;
  return req.headers["x-admin-token"] === ADMIN_TOKEN || url.searchParams.get("token") === ADMIN_TOKEN;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress || "";
}

function hashIp(ip) {
  if (!ip) return "";
  return crypto.createHmac("sha256", IP_HASH_SALT).update(ip).digest("hex").slice(0, 32);
}

function safeString(value, maxLength = 120) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeScores(value) {
  const output = {};
  ["agency", "novelty", "social", "method", "sensitivity"].forEach((key) => {
    output[key] = safeNumber(value?.[key]);
  });
  return output;
}

function normalizeAnswers(value) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(
    Object.entries(value)
      .slice(0, 18)
      .map(([questionId, answer]) => [
        safeString(questionId, 12),
        {
          index: safeNumber(answer?.index, -1),
          choice: safeString(answer?.choice, 2),
          dim: safeString(answer?.dim, 32),
          text: safeString(answer?.text, 180),
        },
      ]),
  );
}

function normalizeResult(payload, req) {
  const createdAt = safeString(payload.created_at, 40) || new Date().toISOString();
  const result = {
    result_id: safeString(payload.result_id, 80) || crypto.randomUUID(),
    visitor_id: safeString(payload.visitor_id, 80) || "unknown",
    session_id: safeString(payload.session_id, 80),
    created_at: createdAt,
    received_at: new Date().toISOString(),
    primary_animal: safeString(payload.primary_animal, 40),
    primary_animal_name: safeString(payload.primary_animal_name, 40),
    secondary_animal: safeString(payload.secondary_animal, 40),
    secondary_animal_name: safeString(payload.secondary_animal_name, 40),
    match: safeNumber(payload.match),
    second_match: safeNumber(payload.second_match),
    scores: normalizeScores(payload.scores),
    raw_scores: normalizeScores(payload.raw_scores),
    duration_seconds: Math.max(0, safeNumber(payload.duration_seconds)),
    is_mixed: Boolean(payload.is_mixed),
    is_balanced: Boolean(payload.is_balanced),
    dominant_dimension: safeString(payload.dominant_dimension, 32) || null,
    max_streak: safeNumber(payload.max_streak),
    answers: normalizeAnswers(payload.answers),
    ip_hash: hashIp(getClientIp(req)),
  };

  return result;
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

function summarizeResults(results) {
  const animalCounts = {};
  const dimensionTotals = { agency: 0, novelty: 0, social: 0, method: 0, sensitivity: 0 };
  let durationTotal = 0;

  results.forEach((result) => {
    animalCounts[result.primary_animal_name || result.primary_animal || "未知"] =
      (animalCounts[result.primary_animal_name || result.primary_animal || "未知"] || 0) + 1;
    Object.keys(dimensionTotals).forEach((key) => {
      dimensionTotals[key] += Number(result.raw_scores?.[key] || 0);
    });
    durationTotal += Number(result.duration_seconds || 0);
  });

  const count = results.length || 1;
  const dimensionAverages = Object.fromEntries(
    Object.entries(dimensionTotals).map(([key, value]) => [key, Number((value / count).toFixed(2))]),
  );

  return {
    total_results: results.length,
    unique_visitors: new Set(results.map((result) => result.visitor_id)).size,
    average_duration_seconds: results.length ? Math.round(durationTotal / results.length) : 0,
    animal_counts: animalCounts,
    dimension_averages: dimensionAverages,
    latest_created_at: results.at(-1)?.created_at || null,
  };
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function toCsv(results) {
  const headers = [
    "created_at",
    "result_id",
    "visitor_id",
    "session_id",
    "primary_animal_name",
    "secondary_animal_name",
    "match",
    "duration_seconds",
    "agency",
    "novelty",
    "social",
    "method",
    "sensitivity",
    "ip_hash",
  ];
  const rows = results.map((result) =>
    [
      result.created_at,
      result.result_id,
      result.visitor_id,
      result.session_id,
      result.primary_animal_name,
      result.secondary_animal_name,
      result.match,
      result.duration_seconds,
      result.raw_scores?.agency,
      result.raw_scores?.novelty,
      result.raw_scores?.social,
      result.raw_scores?.method,
      result.raw_scores?.sensitivity,
      result.ip_hash,
    ].map(csvEscape).join(","),
  );
  return `${headers.join(",")}\n${rows.join("\n")}\n`;
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
      summary: summarizeResults(results),
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
      "Content-Disposition": "attachment; filename=\"animal-persona-results.csv\"",
      "Cache-Control": "no-store",
    });
    res.end(toCsv(results));
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
