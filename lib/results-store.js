const crypto = require("node:crypto");

const DIMENSION_KEYS = ["agency", "novelty", "social", "method", "sensitivity"];
const TABLE_NAME = "animal_results";

function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

function sendText(res, status, text, contentType = "text/plain; charset=utf-8") {
  res.statusCode = status;
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "no-store");
  res.end(text);
}

function isAdminRequest(req, url) {
  const token = process.env.ADMIN_TOKEN || "";
  if (!token) return true;

  const headerToken = req.headers["x-admin-token"];
  const queryToken = url.searchParams.get("token");
  return headerToken === token || queryToken === token;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

function hashIp(ip) {
  if (!ip) return "";
  const salt = process.env.ANIMAL_PERSONA_IP_SALT || process.env.ADMIN_TOKEN || "animal-persona";
  return crypto.createHmac("sha256", salt).update(ip).digest("hex").slice(0, 32);
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
  DIMENSION_KEYS.forEach((key) => {
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
  return {
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
}

async function readBody(req) {
  if (req.body) {
    if (typeof req.body === "string") return JSON.parse(req.body || "{}");
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

async function supabaseRequest(path, options = {}) {
  const url = `${process.env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${TABLE_NAME}${path}`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Supabase request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function insertResult(result) {
  await supabaseRequest("?on_conflict=result_id", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(result),
  });
}

async function listResults(limit = 1000) {
  const safeLimit = Math.min(Math.max(Number(limit) || 1000, 1), 5000);
  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: String(safeLimit),
  });
  return supabaseRequest(`?${params.toString()}`);
}

function summarizeResults(results) {
  const animalCounts = {};
  const dimensionTotals = Object.fromEntries(DIMENSION_KEYS.map((key) => [key, 0]));
  let durationTotal = 0;

  results.forEach((result) => {
    const animalName = result.primary_animal_name || result.primary_animal || "未知";
    animalCounts[animalName] = (animalCounts[animalName] || 0) + 1;
    DIMENSION_KEYS.forEach((key) => {
      dimensionTotals[key] += Number(result.raw_scores?.[key] || 0);
    });
    durationTotal += Number(result.duration_seconds || 0);
  });

  const count = results.length || 1;
  return {
    total_results: results.length,
    unique_visitors: new Set(results.map((result) => result.visitor_id)).size,
    average_duration_seconds: results.length ? Math.round(durationTotal / results.length) : 0,
    animal_counts: animalCounts,
    dimension_averages: Object.fromEntries(
      Object.entries(dimensionTotals).map(([key, value]) => [key, Number((value / count).toFixed(2))]),
    ),
    latest_created_at: results[0]?.created_at || null,
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

module.exports = {
  hasSupabaseConfig,
  insertResult,
  isAdminRequest,
  listResults,
  normalizeResult,
  readBody,
  sendJson,
  sendText,
  summarizeResults,
  toCsv,
};
