const { hasSupabaseConfig, isAdminRequest, listResults, sendText, toCsv } = require("../lib/results-store");

module.exports = async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);

  if (req.method !== "GET") {
    sendText(res, 405, "Method not allowed");
    return;
  }

  if (!hasSupabaseConfig()) {
    sendText(res, 503, "Supabase is not configured");
    return;
  }

  if (!isAdminRequest(req, url)) {
    sendText(res, 401, "Admin token required");
    return;
  }

  try {
    const results = await listResults(url.searchParams.get("limit") || 5000);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="animal-persona-results.csv"');
    res.setHeader("Cache-Control", "no-store");
    res.end(toCsv(results));
  } catch (error) {
    sendText(res, 500, error.message || "Failed to export results");
  }
};
