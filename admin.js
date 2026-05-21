const DIMENSION_LABELS = {
  agency: "行动力",
  novelty: "探索性",
  social: "亲和力",
  method: "秩序感",
  sensitivity: "敏感度",
};

const tokenPanel = document.querySelector("#tokenPanel");
const tokenInput = document.querySelector("#tokenInput");
const saveTokenButton = document.querySelector("#saveTokenButton");
const refreshButton = document.querySelector("#refreshButton");
const metricGrid = document.querySelector("#metricGrid");
const animalDistribution = document.querySelector("#animalDistribution");
const dimensionAverages = document.querySelector("#dimensionAverages");
const resultRows = document.querySelector("#resultRows");
const exportLink = document.querySelector("#exportLink");
const toast = document.querySelector("#toast");

let toastTimer = null;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function getToken() {
  try {
    return window.sessionStorage.getItem("animalPersonaAdminToken") || "";
  } catch {
    return "";
  }
}

function setToken(token) {
  try {
    window.sessionStorage.setItem("animalPersonaAdminToken", token);
  } catch {
    // Session storage is optional.
  }
}

function apiUrl(path) {
  const token = getToken();
  if (!token) return path;
  const url = new URL(path, window.location.origin);
  url.searchParams.set("token", token);
  return `${url.pathname}${url.search}`;
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(seconds) {
  const value = Number(seconds || 0);
  if (value < 60) return `${value} 秒`;
  return `${Math.floor(value / 60)} 分 ${value % 60} 秒`;
}

function shortId(value) {
  if (!value) return "-";
  return value.length > 16 ? `${value.slice(0, 10)}...` : value;
}

function renderMetrics(summary) {
  const metrics = [
    ["总结果数", summary.total_results || 0],
    ["独立访客", summary.unique_visitors || 0],
    ["平均耗时", formatDuration(summary.average_duration_seconds || 0)],
    ["最近提交", summary.latest_created_at ? formatDate(summary.latest_created_at) : "-"],
  ];

  metricGrid.innerHTML = metrics
    .map(
      ([label, value]) => `
        <article class="metric-card">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `,
    )
    .join("");
}

function renderBars(container, entries, maxValue, formatter = (value) => value) {
  if (!entries.length) {
    container.innerHTML = `<div class="empty-state">暂时还没有数据</div>`;
    return;
  }

  container.innerHTML = entries
    .map(([label, value]) => {
      const percent = maxValue ? Math.max(3, Math.round((value / maxValue) * 100)) : 0;
      return `
        <div class="bar-row">
          <div class="bar-label">
            <span>${label}</span>
            <span>${formatter(value)}</span>
          </div>
          <div class="bar-track"><span style="--value:${percent}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderSummary(summary) {
  renderMetrics(summary);

  const animalEntries = Object.entries(summary.animal_counts || {}).sort((a, b) => b[1] - a[1]);
  const maxAnimalCount = Math.max(0, ...animalEntries.map(([, count]) => count));
  renderBars(animalDistribution, animalEntries, maxAnimalCount, (value) => `${value} 人`);

  const dimensionEntries = Object.entries(summary.dimension_averages || {}).map(([key, value]) => [
    DIMENSION_LABELS[key] || key,
    value,
  ]);
  renderBars(dimensionAverages, dimensionEntries, 18, (value) => `${value}/18`);
}

function renderAnswers(answers) {
  const entries = Object.entries(answers || {});
  if (!entries.length) return "无";

  return `
    <details>
      <summary>查看</summary>
      <div class="answer-list">
        ${entries
          .map(
            ([questionId, answer]) =>
              `<span>${questionId.toUpperCase()} · ${answer.choice || "-"} · ${
                DIMENSION_LABELS[answer.dim] || answer.dim || "-"
              }</span>`,
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderRows(results) {
  if (!results.length) {
    resultRows.innerHTML = `<tr><td colspan="8"><div class="empty-state">还没有收到测试结果。</div></td></tr>`;
    return;
  }

  resultRows.innerHTML = results
    .map(
      (result) => `
        <tr>
          <td>${formatDate(result.created_at)}</td>
          <td><strong>${result.primary_animal_name || result.primary_animal || "-"}</strong></td>
          <td>${result.secondary_animal_name || result.secondary_animal || "-"}</td>
          <td>${result.match || 0}%</td>
          <td>
            A ${result.raw_scores?.agency ?? 0} ·
            N ${result.raw_scores?.novelty ?? 0} ·
            S ${result.raw_scores?.social ?? 0} ·
            M ${result.raw_scores?.method ?? 0} ·
            R ${result.raw_scores?.sensitivity ?? 0}
          </td>
          <td>${formatDuration(result.duration_seconds)}</td>
          <td class="mono" title="${result.visitor_id || ""}">${shortId(result.visitor_id)}</td>
          <td>${renderAnswers(result.answers)}</td>
        </tr>
      `,
    )
    .join("");
}

async function loadResults() {
  try {
    const response = await fetch(apiUrl("/api/results"), {
      headers: getToken() ? { "X-Admin-Token": getToken() } : {},
    });

    if (response.status === 401) {
      tokenPanel.classList.remove("is-hidden");
      showToast("请输入后台口令");
      return;
    }

    if (!response.ok) throw new Error("数据读取失败");

    tokenPanel.classList.add("is-hidden");
    const data = await response.json();
    renderSummary(data.summary || {});
    renderRows(data.results || []);
    exportLink.href = apiUrl("/api/results.csv");
  } catch {
    metricGrid.innerHTML = "";
    animalDistribution.innerHTML = `<div class="empty-state">没有连上数据服务，请用 node server.js 启动网站。</div>`;
    dimensionAverages.innerHTML = `<div class="empty-state">等待数据服务启动。</div>`;
    resultRows.innerHTML = `<tr><td colspan="8"><div class="empty-state">当前页面不是通过后台服务打开的。</div></td></tr>`;
  }
}

saveTokenButton.addEventListener("click", () => {
  setToken(tokenInput.value.trim());
  loadResults();
});

refreshButton.addEventListener("click", () => {
  loadResults();
  showToast("数据已刷新");
});

loadResults();
