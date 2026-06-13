const state = {
  category: null,
  completed: new Set(JSON.parse(localStorage.getItem("cpp-completed") || "[]")),
};

const homeView = document.querySelector("#homeView");
const sectionView = document.querySelector("#sectionView");
const categoryList = document.querySelector("#categoryList");
const questionList = document.querySelector("#questionList");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const backButton = document.querySelector("#backButton");
const homeButton = document.querySelector("#homeButton");
const scrollTopButton = document.querySelector("#scrollTopButton");

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

    const numbered = line.trim().match(/^(\d+)\.\s*(.*)$/);
    const choice = line.trim().match(/^([أبج])\.\s*(.*)$/);
    if (numbered) {
      html.push(`<div class="list-item"><span class="list-marker">${numbered[1]}</span><div>${inlineFormat(numbered[2])}</div></div>`);
    } else if (choice) {
      html.push(`<div class="choice-item"><span class="choice-marker">${choice[1]}</span><div>${inlineFormat(choice[2])}</div></div>`);
    } else {
      html.push(`<p>${inlineFormat(line.trim())}</p>`);
    }
    index += 1;
  }

  return html.join("");
}

function saveProgress() {
  localStorage.setItem("cpp-completed", JSON.stringify([...state.completed]));
  updateOverallProgress();
}

function updateOverallProgress() {
  const total = QUESTION_SECTIONS.reduce((sum, section) => sum + section.items.length, 0);
  const complete = [...state.completed].filter((id) =>
    QUESTION_SECTIONS.some((section) => section.items.some((item) => item.id === id))
  ).length;
  document.querySelector("#overallProgressText").textContent = `${complete} من ${total}`;
  document.querySelector("#overallProgressBar").style.width = `${(complete / total) * 100}%`;
}

function renderCategories() {
  categoryList.innerHTML = QUESTION_SECTIONS.map((section, index) => {
    const complete = section.items.filter((item) => state.completed.has(item.id)).length;
    return `
      <button class="category-card" type="button" data-category="${section.id}">
        <span class="category-number">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <strong>${section.title}</strong>
          <small>${section.items.length} بندًا · أُنجز ${complete}</small>
        </span>
        <span class="category-arrow">‹</span>
      </button>`;
  }).join("");
}

function renderQuestions(query = "") {
  const section = QUESTION_SECTIONS.find((item) => item.id === state.category);
  if (!section) return;

  const normalizedQuery = query.trim().toLowerCase();
  const items = section.items.filter((item) =>
    item.body.toLowerCase().includes(normalizedQuery) ||
    String(item.number).includes(normalizedQuery)
  );

  questionList.innerHTML = items.map((item) => {
    const complete = state.completed.has(item.id);
    return `
      <article class="question-card ${complete ? "is-complete" : ""}" data-question="${item.id}">
        <header class="question-header">
          <span class="question-index">${String(item.number).padStart(2, "0")}</span>
          <button class="complete-button" type="button" aria-label="${complete ? "إلغاء الإنجاز" : "تحديد كمُنجز"}" title="تحديد كمُنجز"></button>
        </header>
        <div class="question-body">${renderMarkdown(item.body)}</div>
      </article>`;
  }).join("");

  emptyState.classList.toggle("is-hidden", items.length > 0);
}

function openCategory(id, push = true) {
  const section = QUESTION_SECTIONS.find((item) => item.id === id);
  if (!section) return;

  state.category = id;
  document.querySelector("#sectionKicker").textContent = `القسم ${QUESTION_SECTIONS.indexOf(section) + 1} من ${QUESTION_SECTIONS.length}`;
  document.querySelector("#sectionTitle").textContent = section.title;
  document.querySelector("#sectionMeta").textContent = `${section.instruction} ${section.items.length} بندًا بترقيم متواصل.`;
  document.querySelector("#headerSubtitle").textContent = section.title;
  searchInput.value = "";
  renderQuestions();

  homeView.classList.add("is-hidden");
  sectionView.classList.remove("is-hidden");
  backButton.classList.remove("is-hidden");
  homeButton.classList.remove("is-hidden");
  if (push) history.pushState({ category: id }, "", `#${id}`);
  window.scrollTo({ top: 0 });
}

function showHome(push = true) {
  state.category = null;
  renderCategories();
  updateOverallProgress();
  homeView.classList.remove("is-hidden");
  sectionView.classList.add("is-hidden");
  backButton.classList.add("is-hidden");
  homeButton.classList.add("is-hidden");
  document.querySelector("#headerSubtitle").textContent = "اختر قسمًا للبدء";
  if (push) history.pushState({}, "", location.pathname);
  window.scrollTo({ top: 0 });
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (button) openCategory(button.dataset.category);
});

questionList.addEventListener("click", (event) => {
  const button = event.target.closest(".complete-button");
  if (!button) return;
  const card = button.closest("[data-question]");
  const id = card.dataset.question;
  state.completed.has(id) ? state.completed.delete(id) : state.completed.add(id);
  saveProgress();
  renderQuestions(searchInput.value);
});

searchInput.addEventListener("input", () => renderQuestions(searchInput.value));
backButton.addEventListener("click", () => history.back());
homeButton.addEventListener("click", () => showHome());
scrollTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => scrollTopButton.classList.toggle("is-hidden", window.scrollY < 500));
window.addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  id ? openCategory(id, false) : showHome(false);
});

renderCategories();
updateOverallProgress();
const initialCategory = location.hash.slice(1);
if (initialCategory) openCategory(initialCategory, false);
