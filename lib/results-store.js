const crypto = require("node:crypto");

const DIMENSION_KEYS = ["energy", "information", "decision", "lifestyle", "state"];
const LEGACY_DIMENSION_KEYS = ["agency", "novelty", "social", "method", "sensitivity"];
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

function normalizeScores(value, keys = DIMENSION_KEYS) {
  const output = {};
  keys.forEach((key) => {
    if (value?.[key] !== undefined) output[key] = safeNumber(value?.[key]);
  });
  return output;
}

function normalizePoleScores(value) {
  const output = {};
  ["S", "G", "R", "I", "H", "L", "F", "O", "T", "A"].forEach((key) => {
    if (value?.[key] !== undefined) output[key] = safeNumber(value?.[key]);
  });
  return Object.keys(output).length ? output : normalizeScores(value, [...DIMENSION_KEYS, ...LEGACY_DIMENSION_KEYS]);
}

function normalizeAnswers(value) {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value)
      .slice(0, 32)
      .map(([questionId, answer]) => {
        const safeId = safeString(questionId, 16);
        if (safeId === "_meta") {
          return [
            safeId,
            {
              nickname: safeString(answer?.nickname, 40),
              version: safeString(answer?.version, 20),
            },
          ];
        }

        return [
          safeId,
          {
            score: safeNumber(answer?.score, safeNumber(answer?.index, -1)),
            label: safeString(answer?.label || answer?.choice, 40),
            dimension: safeString(answer?.dimension || answer?.dim, 32),
            positivePole: safeString(answer?.positivePole, 4),
            text: safeString(answer?.text, 220),
          },
        ];
      }),
  );
}

function normalizeMiddleDimensions(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => safeString(item, 32)).filter(Boolean).slice(0, 5);
}

function normalizeResult(payload, req) {
  const createdAt = safeString(payload.created_at, 40) || new Date().toISOString();
  const answers = normalizeAnswers(payload.answers);
  const nickname = safeString(payload.nickname, 40) || answers._meta?.nickname || "";
  const primaryAnimalName = safeString(payload.primary_animal_name || payload.full_name, 60);

  return {
    result_id: safeString(payload.result_id, 80) || crypto.randomUUID(),
    visitor_id: safeString(payload.visitor_id, 80) || "unknown",
    session_id: safeString(payload.session_id, 80),
    created_at: createdAt,
    received_at: new Date().toISOString(),
    nickname,
    primary_animal: safeString(payload.primary_animal, 40),
    primary_animal_name: primaryAnimalName,
    secondary_animal: safeString(payload.secondary_animal || payload.core_code, 40),
    secondary_animal_name: safeString(payload.secondary_animal_name || payload.animal_name, 60),
    full_name: safeString(payload.full_name || primaryAnimalName, 60),
    animal_name: safeString(payload.animal_name || payload.secondary_animal_name, 40),
    state_type: safeString(payload.state_type, 4),
    state_name: safeString(payload.state_name, 20),
    code: safeString(payload.code, 40),
    core_code: safeString(payload.core_code || payload.secondary_animal, 32),
    confidence: safeString(payload.confidence, 16),
    middle_dimensions: normalizeMiddleDimensions(payload.middle_dimensions),
    match: safeNumber(payload.match),
    second_match: safeNumber(payload.second_match),
    scores: normalizeScores(payload.scores, [...DIMENSION_KEYS, ...LEGACY_DIMENSION_KEYS]),
    raw_scores: normalizePoleScores(payload.raw_scores),
    duration_seconds: Math.max(0, safeNumber(payload.duration_seconds)),
    is_mixed: Boolean(payload.is_mixed),
    is_balanced: Boolean(payload.is_balanced),
    dominant_dimension: safeString(payload.dominant_dimension, 32) || null,
    max_streak: safeNumber(payload.max_streak),
    answers,
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

function getSupabaseRestBase() {
  const rawUrl = process.env.SUPABASE_URL || "";
  const cleanUrl = rawUrl.trim().replace(/\/+$/, "");

  if (!cleanUrl) return "";

  const restIndex = cleanUrl.indexOf("/rest/v1");
  if (restIndex >= 0) return cleanUrl.slice(0, restIndex + "/rest/v1".length);

  return `${cleanUrl}/rest/v1`;
}

async function supabaseRequest(path, options = {}) {
  const url = `${getSupabaseRestBase()}/${TABLE_NAME}${path}`;
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

function toLegacyCompatibleResult(result) {
  return {
    result_id: result.result_id,
    visitor_id: result.visitor_id,
    session_id: result.session_id,
    created_at: result.created_at,
    received_at: result.received_at,
    primary_animal: result.primary_animal,
    primary_animal_name: result.primary_animal_name || result.full_name,
    secondary_animal: result.secondary_animal || result.core_code,
    secondary_animal_name: result.secondary_animal_name || result.animal_name,
    match: result.match,
    second_match: result.second_match,
    scores: result.scores,
    raw_scores: result.raw_scores,
    duration_seconds: result.duration_seconds,
    is_mixed: result.is_mixed,
    is_balanced: result.is_balanced,
    dominant_dimension: result.dominant_dimension,
    max_streak: result.max_streak,
    answers: {
      ...result.answers,
      _meta: {
        ...(result.answers?._meta || {}),
        nickname: result.nickname,
        code: result.code,
        state_name: result.state_name,
        confidence: result.confidence,
      },
    },
    ip_hash: result.ip_hash,
  };
}

async function insertResult(result) {
  try {
    await supabaseRequest("?on_conflict=result_id", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(result),
    });
  } catch (error) {
    const message = String(error.message || "");
    if (!/column|schema cache|Could not find/i.test(message)) throw error;
    await supabaseRequest("?on_conflict=result_id", {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(toLegacyCompatibleResult(result)),
    });
  }
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

function getResultName(result) {
  return result.full_name || result.primary_animal_name || result.primary_animal || "未知";
}

function getDimensionSource(result) {
  const scores = result.scores || {};
  if (DIMENSION_KEYS.some((key) => scores[key] !== undefined)) {
    return { keys: DIMENSION_KEYS, values: scores };
  }

  return { keys: LEGACY_DIMENSION_KEYS, values: result.raw_scores || scores };
}

function summarizeResults(results) {
  const animalCounts = {};
  const dimensionTotals = Object.fromEntries(DIMENSION_KEYS.map((key) => [key, 0]));
  const dimensionCounts = Object.fromEntries(DIMENSION_KEYS.map((key) => [key, 0]));
  let durationTotal = 0;

  results.forEach((result) => {
    const animalName = getResultName(result);
    animalCounts[animalName] = (animalCounts[animalName] || 0) + 1;

    DIMENSION_KEYS.forEach((key) => {
      if (result.scores?.[key] !== undefined) {
        dimensionTotals[key] += Number(result.scores[key] || 0);
        dimensionCounts[key] += 1;
      }
    });
    durationTotal += Number(result.duration_seconds || 0);
  });

  const dimensionAverages = Object.fromEntries(
    DIMENSION_KEYS.map((key) => [
      key,
      dimensionCounts[key] ? Number((dimensionTotals[key] / dimensionCounts[key]).toFixed(2)) : 0,
    ]),
  );

  return {
    total_results: results.length,
    unique_visitors: new Set(results.map((result) => result.visitor_id)).size,
    average_duration_seconds: results.length ? Math.round(durationTotal / results.length) : 0,
    animal_counts: animalCounts,
    dimension_averages: dimensionAverages,
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
    "nickname",
    "result_id",
    "visitor_id",
    "session_id",
    "full_name",
    "animal_name",
    "code",
    "core_code",
    "state_name",
    "confidence",
    "duration_seconds",
    "energy",
    "information",
    "decision",
    "lifestyle",
    "state",
    "ip_hash",
  ];
  const rows = results.map((result) => {
    const source = getDimensionSource(result);
    const values = Object.fromEntries(source.keys.map((key) => [key, source.values?.[key]]));
    return [
      result.created_at,
      result.nickname || result.answers?._meta?.nickname,
      result.result_id,
      result.visitor_id,
      result.session_id,
      getResultName(result),
      result.animal_name || result.secondary_animal_name,
      result.code || result.answers?._meta?.code || result.secondary_animal,
      result.core_code || result.secondary_animal,
      result.state_name || result.answers?._meta?.state_name,
      result.confidence || result.answers?._meta?.confidence,
      result.duration_seconds,
      values.energy,
      values.information,
      values.decision,
      values.lifestyle,
      values.state,
      result.ip_hash,
    ].map(csvEscape).join(",");
  });
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
