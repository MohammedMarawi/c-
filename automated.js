const state = {
  answered: new Map(),
  total: 0,
};

const examList = document.querySelector("#examList");
const sectionTabs = document.querySelector("#sectionTabs");
const answeredCount = document.querySelector("#answeredCount");
const correctCount = document.querySelector("#correctCount");
const scorePercent = document.querySelector("#scorePercent");

const LETTERS = ["أ", "ب", "ج", "د"];

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

function inlineFormat(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function highlightCppSegment(code) {
  const keywords = new Set([
    "const", "else", "for", "if", "return", "using", "while", "namespace",
  ]);
  const types = new Set(["bool", "char", "double", "float", "int", "void"]);
  const builtins = new Set(["cin", "cout", "endl", "main", "std"]);
  const tokenPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|^\s*#\s*[a-zA-Z]+(?:\s*<[^>\n]+>)?|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|&&|\|\||==|!=|<=|>=|\+\+|--|<<|>>|[+\-*\/%=<>!&|^~?:]|[{}()[\];,.])/gm;

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
  return code.split(/(\[\[fix\]\][\s\S]*?\[\[\/fix\]\])/g).map((part) => {
    if (part.startsWith("[[fix]]") && part.endsWith("[[/fix]]")) {
      return `<span class="tok-fix">${highlightCppSegment(part.slice(7, -8))}</span>`;
    }
    return highlightCppSegment(part);
  }).join("");
}

function renderMarkdown(markdown = "") {
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
      const rendered = /^(cpp|c\+\+)$/i.test(language) ? highlightCpp(source) : escapeHtml(source);
      html.push(`<div class="code-block"><div class="code-label"><span>${escapeHtml(language)}</span><span>● ● ●</span></div><pre><code>${rendered}</code></pre></div>`);
      index += 1;
      continue;
    }
    if (!line.trim()) {
      index += 1;
      continue;
    }
    html.push(`<p>${inlineFormat(line.trim())}</p>`);
    index += 1;
  }
  return html.join("");
}

function stripFixMarkers(value = "") {
  return value.replaceAll("[[fix]]", "").replaceAll("[[/fix]]", "");
}

function compactCorrection(answer) {
  if (!answer) return "";
  if (answer.correction) return stripFixMarkers(answer.correction.trim());
  if (answer.algorithm) return answer.algorithm.join("\n");
  if (answer.flowchart) return answer.flowchart.nodes.map((node) => node.label).join(" ← ");
  return answer.verdict || "";
}

function firstCodeBlock(text = "") {
  return text.match(/```(?:cpp|text)?\n([\s\S]*?)```/)?.[1]?.trim() || "";
}

function makeTextChoice(text, tone = "") {
  return { text: text.trim(), tone };
}

function uniqueChoices(choices) {
  const seen = new Set();
  return choices.filter((choice) => {
    const key = choice.text.replace(/\s+/g, " ").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 4);
}

function shuffleStable(items, seed) {
  return [...items].map((item, index) => {
    const value = Math.sin((seed + 1) * (index + 3) * 997) * 10000;
    return { item, sort: value - Math.floor(value) };
  }).sort((a, b) => a.sort - b.sort).map((entry) => entry.item);
}

function parseOriginalChoices(body) {
  const matches = [...body.matchAll(/(?:^|\n)\s*([أبج])\.\s*([\s\S]*?)(?=\n\s*[أبج]\.\s*|$)/g)];
  if (!matches.length) return null;
  const firstIndex = matches[0].index + (matches[0][0].startsWith("\n") ? 1 : 0);
  return {
    stem: body.slice(0, firstIndex).trim(),
    choices: matches.map((match) => ({ letter: match[1], text: match[2].trim() })),
  };
}

function wrongTraceOptions(correct) {
  const clean = correct.replace(/```text|```/g, "").trim();
  const lines = clean.split(/\r?\n/).filter(Boolean);
  const asNumber = Number(clean);
  if (!Number.isNaN(asNumber) && clean !== "") {
    return [`${asNumber + 1}`, `${asNumber - 1}`, `${asNumber * 2}`];
  }
  if (lines.length > 1) {
    return [
      lines.slice().reverse().join("\n"),
      lines.slice(0, -1).join("\n") || "لا يظهر ناتج",
      `${lines.join(" ")}`
    ];
  }
  return ["لا يظهر ناتج", "خطأ في تنفيذ البرنامج", `${clean} `];
}

function mutateCodeOptions(code) {
  const options = [];
  if (code.includes("cout")) options.push(code.replace(/\bcout\b/, "cin"));
  if (code.includes("cin")) options.push(code.replace(/\bcin\b/, "cout"));
  if (code.includes("%")) options.push(code.replace("%", "/"));
  if (code.includes("++")) options.push(code.replace("++", "--"));
  if (code.includes(">")) options.push(code.replace(">", "<"));
  if (code.includes("/ 10")) options.push(code.replace("/ 10", "/ 9"));
  if (code.includes("/ 5")) options.push(code.replace("/ 5", "/ 6"));
  if (code.includes("/ 3")) options.push(code.replace("/ 3", "/ 2"));
  return options;
}

function buildQuestion(section, item) {
  const seed = QUESTION_SECTIONS.indexOf(section) * 1000 + item.number;
  const answerText = compactCorrection(item.answer);
  let stem = item.body;
  let choices = [];

  if (section.id === "multiple-choice") {
    const parsed = parseOriginalChoices(item.body);
    if (parsed) {
      stem = parsed.stem;
      choices = parsed.choices.map((choice) => makeTextChoice(choice.text));
      choices.push(makeTextChoice("لا شيء مما سبق صحيح."));
    }
  } else if (section.id === "true-false") {
    const correct = item.answer.verdict === "صح"
      ? "صح، العبارة صحيحة."
      : `خطأ، التصحيح: ${item.answer.correction}`;
    choices = [
      makeTextChoice(correct),
      makeTextChoice("صح، العبارة صحيحة كما هي."),
      makeTextChoice("خطأ، لكن التصحيح هو عكس العبارة فقط."),
      makeTextChoice("لا يمكن تحديد الإجابة من المعطيات."),
    ];
  } else if (section.id === "trace-code") {
    const correct = firstCodeBlock(answerText) || answerText;
    choices = [
      makeTextChoice(`\`\`\`text\n${correct}\n\`\`\``),
      ...wrongTraceOptions(correct).map((value) => makeTextChoice(`\`\`\`text\n${value}\n\`\`\``)),
    ];
  } else if (section.id === "write-program") {
    const correctCode = firstCodeBlock(answerText);
    choices = [
      makeTextChoice(`\`\`\`cpp\n${correctCode}\n\`\`\``),
      ...mutateCodeOptions(correctCode).map((code) => makeTextChoice(`\`\`\`cpp\n${code}\n\`\`\``)),
      makeTextChoice("البرنامج يحتاج فقط إلى طباعة نص ثابت دون إدخال أو حساب."),
    ];
  } else if (section.id === "debug-code") {
    const correctedCode = firstCodeBlock(answerText);
    const firstErrors = answerText.split("\n\n").filter((line) => line.startsWith("الخطأ")).slice(0, 3).join("\n\n");
    choices = [
      makeTextChoice(`${firstErrors}\n\nالبرنامج المصحح:\n\n\`\`\`cpp\n${correctedCode}\n\`\`\``),
      makeTextChoice("الخطأ الوحيد هو اسم المكتبة، وباقي البرنامج صحيح."),
      makeTextChoice("التصحيح الصحيح هو حذف جملة الشرط أو الحلقة فقط."),
      makeTextChoice("لا يوجد خطأ منطقي، والمطلوب فقط تغيير شكل الطباعة."),
    ];
  } else if (section.id === "flowchart") {
    choices = [
      makeTextChoice(answerText),
      makeTextChoice("بداية ← معالجة مباشرة دون قراءة قيم ← طباعة النتيجة ← نهاية"),
      makeTextChoice("بداية ← قراءة القيم ← طباعة النتيجة دون شرط لازم ← نهاية"),
      makeTextChoice("بداية ← قرار قبل الإدخال ← معالجة ← نهاية"),
    ];
  } else {
    choices = [
      makeTextChoice(answerText),
      makeTextChoice("الإجابة الأولى غير صحيحة لأن ترتيب التعليمات مختلف."),
      makeTextChoice("لا يمكن حل السؤال من المعطيات."),
      makeTextChoice("كل الخيارات السابقة خاطئة."),
    ];
  }

  const correctText = choices[0]?.text || answerText;
  const finalChoices = uniqueChoices(choices);
  while (finalChoices.length < 4) {
    finalChoices.push(makeTextChoice(`خيار غير صحيح رقم ${finalChoices.length + 1}.`));
  }

  return {
    id: item.id,
    number: item.number,
    sectionId: section.id,
    sectionTitle: section.title,
    stem,
    correctText,
    choices: shuffleStable(finalChoices, seed),
  };
}

function renderTabs(sections) {
  sectionTabs.innerHTML = sections.map((section) => `
    <a href="#auto-${section.id}">${section.title} <span>${section.items.length}</span></a>
  `).join("");
}

function renderExam() {
  const sections = QUESTION_SECTIONS.filter((section) => section.items.length);
  renderTabs(sections);
  const blocks = sections.map((section) => {
    const questions = section.items.map((item) => buildQuestion(section, item));
    return `
      <section class="section-block" id="auto-${section.id}">
        <header class="section-title">
          <h2>${escapeHtml(section.title)}</h2>
          <small>${questions.length} سؤال مؤتمت</small>
        </header>
        ${questions.map(renderQuestion).join("")}
      </section>
    `;
  }).join("");

  examList.innerHTML = blocks;
  state.total = sections.reduce((sum, section) => sum + section.items.length, 0);
  updateScore();
}

function renderQuestion(question) {
  return `
    <article class="question-card" data-question-id="${question.id}" data-correct="${escapeHtml(question.correctText)}">
      <header class="question-head">
        <span class="question-number">${String(question.number).padStart(2, "0")}</span>
        <div>
          <strong>السؤال ${question.number}</strong>
          <small>${escapeHtml(question.sectionTitle)}</small>
        </div>
      </header>
      <div class="question-body">${renderMarkdown(question.stem)}</div>
      <div class="choices">
        ${question.choices.map((choice, index) => `
          <button class="choice-button" type="button" data-choice="${escapeHtml(choice.text)}">
            <span class="choice-label">${LETTERS[index]}</span>
            <span class="choice-text">${renderMarkdown(choice.text)}</span>
          </button>
        `).join("")}
      </div>
      <div class="feedback"></div>
    </article>
  `;
}

function updateScore() {
  const answered = state.answered.size;
  const correct = [...state.answered.values()].filter(Boolean).length;
  answeredCount.textContent = answered;
  correctCount.textContent = correct;
  scorePercent.textContent = answered ? `${Math.round((correct / answered) * 100)}%` : "0%";
}

function answerQuestion(card, button) {
  if (card.classList.contains("is-answered")) return;
  const correct = card.dataset.correct;
  const selected = button.dataset.choice;
  const isCorrect = selected === correct;

  card.classList.add("is-answered");
  state.answered.set(card.dataset.questionId, isCorrect);

  card.querySelectorAll(".choice-button").forEach((choice) => {
    choice.disabled = true;
    if (choice.dataset.choice === correct) choice.classList.add("is-correct");
  });
  if (!isCorrect) button.classList.add("is-wrong");

  const feedback = card.querySelector(".feedback");
  feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  feedback.innerHTML = isCorrect
    ? "<strong>إجابة صحيحة.</strong>"
    : `<strong>إجابة خاطئة.</strong><div>الإجابة الصحيحة:</div>${renderMarkdown(correct)}`;
  updateScore();
}

examList.addEventListener("click", (event) => {
  const button = event.target.closest(".choice-button");
  if (!button) return;
  answerQuestion(button.closest(".question-card"), button);
});

renderExam();
