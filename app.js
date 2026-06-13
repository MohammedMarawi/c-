const SECTION_THEMES = [
  { accent: "#36d399", rgb: "54, 211, 153" },
  { accent: "#a78bfa", rgb: "167, 139, 250" },
  { accent: "#f4c95d", rgb: "244, 201, 93" },
  { accent: "#fb7185", rgb: "251, 113, 133" },
  { accent: "#38bdf8", rgb: "56, 189, 248" },
  { accent: "#f472b6", rgb: "244, 114, 182" },
];

const state = { section: null };
const homeView = document.querySelector("#homeView");
const sectionView = document.querySelector("#sectionView");
const categoryList = document.querySelector("#categoryList");
const questionList = document.querySelector("#questionList");
const homeButton = document.querySelector("#homeButton");

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

function inlineFormat(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderMarkdown(markdown) {
  const lines = markdown.trim().split(/\r?\n/);
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (line.trim().startsWith("```")) {
      const language = line.trim().slice(3) || "code";
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      html.push(`<div class="code-block"><div class="code-label"><span>${escapeHtml(language)}</span><span class="code-dots">● ● ●</span></div><pre><code>${escapeHtml(code.join("\n"))}</code></pre></div>`);
      index += 1;
      continue;
    }
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const choice = line.trim().match(/^([أبج])\.\s*(.*)$/);
    html.push(choice
      ? `<div class="choice-item"><span class="choice-marker">${choice[1]}</span><div>${inlineFormat(choice[2])}</div></div>`
      : `<p>${inlineFormat(line.trim())}</p>`);
    index += 1;
  }
  return html.join("");
}

function sectionTheme(section) {
  return SECTION_THEMES[QUESTION_SECTIONS.indexOf(section)] || SECTION_THEMES[0];
}

function applyTheme(section) {
  const theme = section ? sectionTheme(section) : SECTION_THEMES[0];
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-rgb", theme.rgb);
  document.documentElement.style.setProperty("--accent-soft", `rgba(${theme.rgb}, .12)`);
  document.body.classList.toggle("inside-section", Boolean(section));
}

function renderCategories() {
  categoryList.innerHTML = QUESTION_SECTIONS.map((section, index) => {
    const theme = sectionTheme(section);
    return `
      <button class="category-card" style="--card-accent:${theme.accent};--card-rgb:${theme.rgb}" type="button" data-section="${section.id}">
        <span class="category-number">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <strong>${section.title}</strong>
          <small>${section.items.length} بندًا</small>
        </span>
        <span class="category-arrow">‹</span>
      </button>`;
  }).join("");
}

function renderQuestionList(section) {
  questionList.innerHTML = section.items.map((item) => `
    <article class="question-card">
      <header class="question-header">
        <span class="question-index">${String(item.number).padStart(2, "0")}</span>
        <strong>السؤال ${item.number}</strong>
      </header>
      <div class="question-body">${renderMarkdown(item.body)}</div>
      ${item.answer ? `
        <details class="answer-box">
          <summary>عرض الإجابة</summary>
          <div class="answer-content">
            <strong class="${item.answer.verdict === "صح" ? "is-true" : item.answer.verdict === "خطأ" ? "is-false" : "is-choice"}">${item.answer.verdict}</strong>
            ${item.answer.correction ? `<div>${renderMarkdown(item.answer.correction)}</div>` : ""}
          </div>
        </details>` : ""}
    </article>
  `).join("");
}

function showOnly(view) {
  [homeView, sectionView].forEach((item) => item.classList.toggle("is-hidden", item !== view));
}

function openSection(id, push = true) {
  const section = QUESTION_SECTIONS.find((item) => item.id === id);
  if (!section) return showHome(push);
  state.section = section;
  applyTheme(section);
  document.querySelector("#sectionKicker").textContent = `القسم ${QUESTION_SECTIONS.indexOf(section) + 1} من ${QUESTION_SECTIONS.length}`;
  document.querySelector("#sectionTitle").textContent = section.title;
  document.querySelector("#sectionMeta").textContent = `${section.instruction} ${section.items.length} بندًا.`;
  document.querySelector("#headerSubtitle").textContent = section.title;
  renderQuestionList(section);
  showOnly(sectionView);
  homeButton.classList.remove("is-hidden");
  if (push) history.pushState({}, "", `#${section.id}`);
  window.scrollTo({ top: 0 });
}

function showHome(push = true) {
  state.section = null;
  applyTheme(null);
  renderCategories();
  showOnly(homeView);
  homeButton.classList.add("is-hidden");
  document.querySelector("#headerSubtitle").textContent = "اختر قسمًا للبدء";
  if (push) history.pushState({}, "", location.pathname);
  window.scrollTo({ top: 0 });
}

function route(push = false) {
  const parts = location.hash.slice(1).split("/").filter(Boolean);
  if (!parts.length) return showHome(push);
  openSection(parts[0], push);
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section]");
  if (button) openSection(button.dataset.section);
});
homeButton.addEventListener("click", () => showHome());
window.addEventListener("popstate", () => route(false));

renderCategories();
route(false);
