const {
  hasSupabaseConfig,
  insertResult,
  isAdminRequest,
  listResults,
  normalizeResult,
  readBody,
  sendJson,
  summarizeResults,
} = require("../lib/results-store");

module.exports = async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-Admin-Token");
    res.end();
    return;
  }

  if (!hasSupabaseConfig()) {
    sendJson(res, 503, {
      ok: false,
      error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    });
    return;
  }

  if (req.method === "POST") {
    try {
      const payload = await readBody(req);
      const result = normalizeResult(payload, req);
      await insertResult(result);
      sendJson(res, 201, { ok: true, result_id: result.result_id });
    } catch (error) {
      sendJson(res, 400, { ok: false, error: error.message || "Invalid result payload" });
    }
    return;
  }

  if (req.method === "GET") {
    if (!isAdminRequest(req, url)) {
      sendJson(res, 401, { ok: false, error: "Admin token required" });
      return;
    }

    try {
      const results = await listResults(url.searchParams.get("limit") || 1000);
      sendJson(res, 200, {
        ok: true,
        summary: summarizeResults(results),
        results,
        token_required: Boolean(process.env.ADMIN_TOKEN),
      });
    } catch (error) {
      sendJson(res, 500, { ok: false, error: error.message || "Failed to read results" });
    }
    return;
  }

  sendJson(res, 405, { ok: false, error: "Method not allowed" });
};
