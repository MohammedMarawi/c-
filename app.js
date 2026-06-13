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

function highlightCppSegment(code) {
  const keywords = new Set([
    "alignas", "alignof", "and", "asm", "auto", "break", "case", "catch",
    "class", "const", "constexpr", "continue", "default", "delete", "do",
    "else", "enum", "explicit", "export", "extern", "false", "for", "friend",
    "goto", "if", "inline", "namespace", "new", "noexcept", "not", "nullptr",
    "operator", "or", "private", "protected", "public", "register", "return",
    "sizeof", "static", "struct", "switch", "template", "this", "throw", "true",
    "try", "typedef", "typename", "union", "using", "virtual", "volatile", "while",
  ]);
  const types = new Set([
    "bool", "char", "double", "float", "int", "long", "short", "signed",
    "string", "unsigned", "void", "wchar_t",
  ]);
  const builtins = new Set(["cin", "cout", "endl", "main", "pow", "sqrt", "std"]);
  const tokenPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|^\s*#\s*[a-zA-Z]+(?:\s*<[^>\n]+>)?|(?:\b\d+(?:\.\d+)?\b)|(?:\b[A-Za-z_]\w*\b)|(?:&&|\|\||==|!=|<=|>=|\+\+|--|<<|>>|[+\-*\/%=<>!&|^~?:])|(?:[{}()[\];,.]))/gm;

  let output = "";
  let cursor = 0;
  for (const match of code.matchAll(tokenPattern)) {
    output += escapeHtml(code.slice(cursor, match.index));
    const token = match[0];
    let className = "tok-punctuation";

    if (/^\s*#/.test(token)) className = "tok-preprocessor";
    else if (/^\/[/*]/.test(token)) className = "tok-comment";
    else if (/^["']/.test(token)) className = "tok-string";
    else if (/^\d/.test(token)) className = "tok-number";
    else if (keywords.has(token)) className = "tok-keyword";
    else if (types.has(token)) className = "tok-type";
    else if (builtins.has(token)) className = "tok-builtin";
    else if (/^[A-Za-z_]/.test(token)) className = "tok-variable";
    else if (/^[+\-*\/%=<>!&|^~?:]/.test(token)) className = "tok-operator";

    output += `<span class="${className}">${escapeHtml(token)}</span>`;
    cursor = match.index + token.length;
  }
  return output + escapeHtml(code.slice(cursor));
}

function highlightCpp(code) {
  const parts = code.split(/(\[\[fix\]\][\s\S]*?\[\[\/fix\]\])/g);
  return parts.map((part) => {
    if (part.startsWith("[[fix]]") && part.endsWith("[[/fix]]")) {
      return `<span class="tok-fix">${highlightCppSegment(part.slice(7, -8))}</span>`;
    }
    return highlightCppSegment(part);
  }).join("");
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
      const source = code.join("\n");
      const renderedCode = /^(cpp|c\+\+)$/i.test(language) ? highlightCpp(source) : escapeHtml(source);
      html.push(`<div class="code-block"><div class="code-label"><span>${escapeHtml(language)}</span><span class="code-dots">● ● ●</span></div><pre><code class="language-${escapeHtml(language)}">${renderedCode}</code></pre></div>`);
      index += 1;
      continue;
    }
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const errorLine = line.trim().match(/^الخطأ\s+(\d+):\s*(.*)$/);
    if (errorLine) {
      const parts = errorLine[2].split(/\s*←\s*/);
      html.push(`
        <div class="error-item">
          <strong class="error-title">الخطأ ${errorLine[1]}</strong>
          <div class="error-line">${inlineFormat(parts[0])}</div>
          ${parts[1] ? `<div class="correction-line"><span>التصحيح</span>${inlineFormat(parts[1].replace(/^الصحيح:\s*/, ""))}</div>` : ""}
        </div>`);
      index += 1;
      continue;
    }
    if (line.trim() === "البرنامج المصحح:") {
      html.push('<h3 class="corrected-program-title">البرنامج المصحح</h3>');
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

function flowchartShape(node, x, y, width = 150, height = 48) {
  const label = escapeHtml(node.label);
  const text = `<text x="${x}" y="${y + 5}" class="flowchart-text">${label}</text>`;

  if (node.type === "start" || node.type === "end") {
    return `<ellipse cx="${x}" cy="${y}" rx="${width / 2}" ry="${height / 2}" class="flowchart-shape"/>${text}`;
  }
  if (node.type === "input" || node.type === "output") {
    const skew = 18;
    return `<polygon points="${x - width / 2 + skew},${y - height / 2} ${x + width / 2},${y - height / 2} ${x + width / 2 - skew},${y + height / 2} ${x - width / 2},${y + height / 2}" class="flowchart-shape"/>${text}`;
  }
  if (node.type === "decision") {
    return `<polygon points="${x},${y - height / 2} ${x + width / 2},${y} ${x},${y + height / 2} ${x - width / 2},${y}" class="flowchart-shape"/>${text}`;
  }
  return `<rect x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" class="flowchart-shape"/>${text}`;
}

function flowchartArrow(x1, y1, x2, y2) {
  return `<path d="M ${x1} ${y1} L ${x2} ${y2}" class="flowchart-arrow" marker-end="url(#flowArrow)"/>`;
}

function renderFlowchart(chart) {
  const defs = `<defs><marker id="flowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="flowchart-arrow-head"/></marker></defs>`;

  if (chart.type === "decision-process") {
    const [start, input, decision, yesProcess, yesOutput, noOutput, end] = chart.nodes;
    return `
      <div class="flowchart-wrap" dir="rtl">
        <svg class="flowchart-svg" viewBox="0 0 360 520" role="img" aria-label="الخوارزمية البيانية">
          ${defs}
          ${flowchartShape(start, 180, 38, 120, 42)}
          ${flowchartArrow(180, 59, 180, 88)}
          ${flowchartShape(input, 180, 116, 150, 48)}
          ${flowchartArrow(180, 140, 180, 169)}
          ${flowchartShape(decision, 180, 205, 170, 68)}
          ${flowchartArrow(95, 205, 73, 205)}
          ${flowchartArrow(265, 205, 287, 205)}
          <text x="104" y="192" class="flowchart-branch-label">لا</text>
          <text x="256" y="192" class="flowchart-branch-label">نعم</text>
          ${flowchartArrow(73, 205, 73, 334)}
          ${flowchartArrow(287, 205, 287, 267)}
          ${flowchartShape(yesProcess, 287, 294, 132, 48)}
          ${flowchartArrow(287, 318, 287, 334)}
          ${flowchartShape(noOutput, 73, 362, 132, 52)}
          ${flowchartShape(yesOutput, 287, 362, 132, 52)}
          <path d="M 73 388 L 73 425 L 180 425" class="flowchart-arrow"/>
          <path d="M 287 388 L 287 425 L 180 425" class="flowchart-arrow"/>
          <circle cx="180" cy="425" r="5" class="flowchart-connector"/>
          ${flowchartArrow(180, 430, 180, 467)}
          ${flowchartShape(end, 180, 490, 120, 42)}
        </svg>
      </div>`;
  }

  if (chart.type === "decision") {
    const [start, input, decision, yesOutput, noOutput, end] = chart.nodes;
    return `
      <div class="flowchart-wrap" dir="rtl">
        <svg class="flowchart-svg" viewBox="0 0 360 440" role="img" aria-label="الخوارزمية البيانية">
          ${defs}
          ${flowchartShape(start, 180, 38, 120, 42)}
          ${flowchartArrow(180, 59, 180, 88)}
          ${flowchartShape(input, 180, 116, 150, 48)}
          ${flowchartArrow(180, 140, 180, 169)}
          ${flowchartShape(decision, 180, 205, 170, 68)}
          ${flowchartArrow(95, 205, 73, 205)}
          ${flowchartArrow(265, 205, 287, 205)}
          <text x="104" y="192" class="flowchart-branch-label">لا</text>
          <text x="256" y="192" class="flowchart-branch-label">نعم</text>
          ${flowchartArrow(73, 205, 73, 276)}
          ${flowchartArrow(287, 205, 287, 276)}
          ${flowchartShape(noOutput, 73, 304, 132, 52)}
          ${flowchartShape(yesOutput, 287, 304, 132, 52)}
          <path d="M 73 330 L 73 365 L 180 365" class="flowchart-arrow"/>
          <path d="M 287 330 L 287 365 L 180 365" class="flowchart-arrow"/>
          <circle cx="180" cy="365" r="5" class="flowchart-connector"/>
          ${flowchartArrow(180, 370, 180, 397)}
          ${flowchartShape(end, 180, 418, 120, 42)}
        </svg>
      </div>`;
  }

  const width = 360;
  const center = width / 2;
  const gap = 82;
  const startY = 38;
  const height = startY * 2 + gap * (chart.nodes.length - 1);
  const shapes = chart.nodes.map((node, index) => {
    const y = startY + index * gap;
    const shape = flowchartShape(node, center, y, node.type === "decision" ? 170 : 170, node.type === "decision" ? 68 : 48);
    const arrow = index < chart.nodes.length - 1 ? flowchartArrow(center, y + 25, center, y + gap - 25) : "";
    return `${shape}${arrow}`;
  }).join("");

  return `<div class="flowchart-wrap" dir="rtl"><svg class="flowchart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="الخوارزمية البيانية">${defs}${shapes}</svg></div>`;
}

function renderAlgorithm(steps) {
  return `
    <div class="algorithm-block">
      <h3>الخوارزمية النصية</h3>
      <ol>${steps.map((step) => `<li>${inlineFormat(step)}</li>`).join("")}</ol>
    </div>`;
}

function renderAnswer(answer) {
  return `
    <strong class="${answer.verdict === "صح" ? "is-true" : answer.verdict === "خطأ" ? "is-false" : "is-choice"}">${answer.verdict}</strong>
    ${answer.algorithm ? renderAlgorithm(answer.algorithm) : ""}
    ${answer.flowchart ? `<h3 class="flowchart-title">الخوارزمية البيانية</h3>${renderFlowchart(answer.flowchart)}` : ""}
    ${answer.correction ? `<div>${renderMarkdown(answer.correction)}</div>` : ""}`;
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
            ${renderAnswer(item.answer)}
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
