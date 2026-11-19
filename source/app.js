"use strict";

const glyphs = {
  moon: '<path d="M18.8 4.9A8.9 8.9 0 1 0 20 17.6 8.2 8.2 0 0 1 18.8 4.9Z"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  close: '<path d="m5 5 14 14M19 5 5 19"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  swap: '<path d="M8 19V5m-4 4 4-4 4 4m4-4v14m-4-4 4 4 4-4"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  route: '<circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="M7 19h7a3.5 3.5 0 0 0 0-7h-4a3.5 3.5 0 1 1 0-7h7"/>',
  pin: '<path d="M20 9c0 5-8 12-8 12S4 14 4 9a8 8 0 1 1 16 0Z"/><circle cx="12" cy="9" r="2.5"/>',
  book: '<path d="M12 6C8 3 4 4 2 5v14c3-1 7-1 10 1 3-2 7-2 10-1V5c-2-1-6-2-10 1v14"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  people: '<circle cx="9" cy="7" r="3.5"/><path d="M2 20v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2m1-16a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5v2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.4"/><path d="m16 16 4 4"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  quote: '<path d="M10 6c-4 1-6 3-6 7v4h6v-5H7c0-2 1-4 3-6Zm10 0c-4 1-6 3-6 7v4h6v-5h-3c0-2 1-4 3-6Z"/>',
  file: '<path d="M5 3h9l5 5v13H5V3Zm9 0v5h5M8 12h8m-8 4h8"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  phone: '<rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M10 18h4"/>',
};
const state = {
  lang: "en",
  category: "all",
  search: "",
  voice: 0,
  check: {share:false, depart:false, arrive:true, preview:false},
  note: "",
};
const storage = {
  read(key) {
    try { return localStorage.getItem("nightwalk-v2-" + key); }
    catch { return null; }
  },
  write(key, value) {
    try { localStorage.setItem("nightwalk-v2-" + key, value); return true; }
    catch { return false; }
  },
};
if (storage.read("lang") === "zh") state.lang = "zh";
state.note = storage.read("reflection") || "";

const L = (en, zh) => state.lang === "zh" ? zh : en;
const pick = (pair) => L(...pair);
const ico = (name) => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[name] || glyphs.info}</svg>`;
const pic = (name) => assets[name] || assets.street;
const image = (name, className = "") => `<img class="${className}" src="${pic(name)}" alt="" decoding="async">`;
const safe = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[character]);
const storyURL = (story) => "#story/" + story.id;
const categories = {
  all: ["All","全部"], cases: ["Cases","案件"], voices: ["Testimonies","体验叙事"], field: ["Field Research","实地研究"],
};
const pages = {
  home: ["Home","首页"], archive: ["Archive","档案导览"], stories: ["Stories","故事"],
  map: ["Map","地图"], waiting: ["Someone Is Waiting","有人在等"], about: ["About","关于"],
  sources: ["Data & Context","资料与背景"], glossary: ["Glossary","术语表"], reflection: ["Reflection","反思"],
};
const main = document.querySelector("#main");

function locationPage() {
  const [page, id] = location.hash.slice(1).split("/");
  if (page === "story" && content.stories.some((story) => story.id === id)) return [page, id];
  return [Object.hasOwn(pages, page) ? page : "home"];
}

function shell(page) {
  const active = ["archive","waiting"].includes(page) ? "home" : page === "story" ? "stories" :
    ["sources","glossary","reflection"].includes(page) ? "about" : page;
  document.documentElement.lang = L("en","zh-Hans");
  document.querySelector(".skip").textContent = L("Skip to content","跳到正文");
  document.querySelector("#header").innerHTML = `<div class="header-inner">
    <a class="brand" href="#home"><span class="brand-mark">${ico("moon")}</span>NightWalk</a>
    <nav class="main-nav" aria-label="${L("Main navigation","主导航")}">${["home","stories","map","about"].map((name) =>
      `<a href="#${name}" ${name === active ? 'aria-current="page"' : ""}>${pick(pages[name])}</a>`).join("")}</nav>
    <button id="language" class="language" type="button" aria-label="${L("Switch to Chinese","Switch to English")}">${L("中文","EN")}</button>
  </div>`;
  document.querySelector("#footer").innerHTML = `<div class="footer-inner">
    <span>${ico("moon")} NightWalk · ${L("A critical archive of journeys after dark","夜行城市 · 女性安全档案")}</span>
    <nav aria-label="${L("Archive information","档案信息")}">${["sources","glossary","reflection"].map((name) => `<a href="#${name}">${pick(pages[name])}</a>`).join("")}</nav>
  </div>`;
}

const heading = (tag, title, description) => `<div class="page-intro"><span class="eyebrow">${tag}</span><h1>${title}</h1><p>${description}</p></div>`;
const back = (href, label) => `<a class="back-link" href="${href}">${ico("arrow")}${label}</a>`;
const cta = (href, label, style = "primary") => `<a class="${style}" href="${href}">${label} ${ico("arrow")}</a>`;

function renderHome() {
  return `<section class="landing" aria-labelledby="landing-title">
    ${image("city-wide","scene-image scene-ambient")}${image("hero","scene-image landing-figure")}
    <div class="page landing-inner">
      <span class="eyebrow">${L("A city after dark","入夜之后")}</span>
      <div class="landing-copy"><h1 id="landing-title">NightWalk</h1><p class="landing-subtitle">${L("A Critical Archive of Women’s Night-Time Journeys","女性城市夜行档案")}</p></div>
      <p class="landing-description">${L("Exploring how cities, data and everyday systems shape women’s safety after dark.","探索城市空间、数据与日常系统如何影响女性的夜间出行。")}</p>
      ${cta("#archive",L("Enter Archive","进入档案"))}
    </div>
    <span class="landing-index">${L("01 / NIGHT-TIME JOURNEYS","01 / 城市夜行")}</span>
  </section>`;
}

function renderArchive() {
  const cards = [
    ["map","pin","map-preview",L("Navigate the City","走进夜间城市"),L("Explore routes with context along the way.","探索示意路线与沿途的故事笔记。")],
    ["stories","layers","flowers",L("City Stories","城市故事"),L("Public cases, fictional voices and field notes.","公开案件、虚构体验和观察笔记。")],
    ["waiting","people","window-scene",L("Someone Is Waiting","有人在等"),L("Care, connection and the journey home.","回家路上的关心与联系。")],
  ];
  return `<section class="page archive-home">${image("hero-wide","scene-image")}
    ${heading(L("The archive","夜行档案"),L("Rethinking the Night-Time City","重新思考夜间城市"),L("Stories, everyday decisions and questions about women’s freedom to move through public space.","读故事、看见日常选择，思考女性在公共空间的出行自由。"))}
    <div class="hub-grid">${cards.map(([href,icon,art,title,summary]) => `<a class="hub-card glass" href="#${href}">${image(art)}${ico(icon)}<div><h2>${title}</h2><p>${summary}</p></div>${ico("arrow")}</a>`).join("")}</div>
  </section>`;
}

function storyResults() {
  const tokens = state.search.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const stories = content.stories.filter((story) => {
    if (state.category !== "all" && state.category !== story.category) return false;
    const text = [story.title,story.subtitle,story.location,story.date,...story.paragraphs,categories[story.category]].flat().join(" ").toLocaleLowerCase();
    return tokens.every((term) => text.includes(term));
  });
  return `<p class="result-count" role="status">${L(`${stories.length} ${stories.length === 1 ? "story" : "stories"}`,`${stories.length} 篇故事`)}</p>
    ${stories.length ? `<div class="story-grid">${stories.map((story) => `<a class="story-card glass" href="${storyURL(story)}">${image(story.id === "sabina" ? "flowers" : story.image)}
      <div class="story-card-content"><h2>${pick(story.title)}</h2><p>${pick(story.subtitle)}</p><small>${pick(story.location)} · ${pick(story.date)}</small>${ico("arrow")}</div></a>`).join("")}</div>` :
    `<div class="glass empty"><p>${L("No stories match these filters.","没有符合条件的故事。")}</p><button class="secondary" id="clear-search" type="button">${L("Clear filters","清除筛选")}</button></div>`}`;
}

function renderStories() {
  return `<section class="page stories-page">
    ${heading(L("From the archive","夜行档案"),L("City Stories","城市故事"),L("Public cases, fictional experiences and sample observations about women’s night journeys.","从公开案件、虚构体验和观察示例中，了解女性的城市夜行。"))}
    <div class="toolbar"><div class="filters" role="group" aria-label="${L("Story categories","故事分类")}">${Object.entries(categories).map(([id,label]) => `<button type="button" class="pill" data-category="${id}" aria-pressed="${state.category === id}">${pick(label)}</button>`).join("")}</div>
      <label class="search-field">${ico("search")}<span class="visually-hidden">${L("Search stories","搜索故事")}</span><input id="story-search" type="search" placeholder="${L("Search stories…","搜索故事…")}" value="${safe(state.search)}"></label></div>
    <div id="story-results">${storyResults()}</div>
  </section>`;
}

function storyControls(story) {
  const index = content.stories.indexOf(story);
  const previous = content.stories[(index + content.stories.length - 1) % content.stories.length];
  const next = content.stories[(index + 1) % content.stories.length];
  return `<nav class="story-controls" aria-label="${L("More stories","更多故事")}">
    <a class="secondary" href="${storyURL(previous)}">${ico("arrow")} ${L("Previous story","上一篇")}</a>
    ${cta(storyURL(next), L("Next story","下一篇"), "secondary")}
  </nav>`;
}

function quoteSlide() {
  const {quote,note} = content.voices[state.voice];
  return `<div class="glass quote-box">${ico("quote")}<blockquote>“${pick(quote)}”</blockquote><cite>${pick(note)}</cite></div>`;
}

function renderStory(id) {
  const story = content.stories.find((entry) => entry.id === id);
  const backLink = back("#stories",L("Back to Stories","返回故事"));
  if (id === "vigilance") return `<section class="page vigilance">${image("vigilance","scene-image")}${backLink}
    ${heading(L("Fictional vignettes","虚构片段"),pick(story.title),pick(story.subtitle))}
    <div id="quote-slide" aria-live="polite">${quoteSlide()}</div>
    <div class="carousel" aria-label="${L("Testimony carousel","体验叙事轮播")}">
      <button class="small-btn" type="button" data-slide="-1" aria-label="${L("Previous vignette","上一段")}">‹</button>
      <span id="slide-count">${state.voice + 1} / ${content.voices.length}</span>
      <button class="small-btn" type="button" data-slide="1" aria-label="${L("Next vignette","下一段")}">›</button>
    </div>
    <ul class="themes-list"><li>${ico("route")} ${L("Detours","绕行")}</li><li>${ico("sun")} ${L("Lighting","照明")}</li><li>${ico("phone")} ${L("Check-ins","报平安")}</li></ul>
    ${storyControls(story)}
  </section>`;
  return `<section class="page">${backLink}<div class="story-layout">
    ${image(id === "sabina" ? "flowers" : story.image,"story-art")}
    <article class="story-body"><span class="eyebrow">${pick(categories[story.category])}</span><h1>${pick(story.title)}</h1>
      <div class="story-meta"><span>${ico("clock")}${pick(story.date)}</span><span>${ico("pin")}${pick(story.location)}</span></div>
      ${story.paragraphs.map((line) => `<p>${pick(line)}</p>`).join("")}
      ${story.source ? `<a class="source-link" href="${story.source.url}" target="_blank" rel="noopener noreferrer">${ico("file")} ${pick(story.source.label)} ↗</a>` : ""}
      <div class="insight"><strong>${L("What does this reveal?","这让我们看见什么？")}</strong><p>${pick(story.insight)}</p></div>
      ${id === "waiting" ? cta("#waiting",L("Try the check-in demo","体验报平安设置"),"secondary") : ""}
    </article></div>${storyControls(story)}</section>`;
}

function checkPreview() {
  const choices = state.check;
  if (!choices.preview) return "";
  if (!choices.share) return `<strong>${L("Check-in is off","报平安已关闭")}</strong><p>${L("Turn on the optional check-in to preview the messages.","开启可选报平安后，即可预览消息。")}</p>`;
  const messages = [choices.depart && L("“I’ve set off.”","「我出发了。」"), choices.arrive && L("“I’m home.”","「我到家了。」")].filter(Boolean);
  return `<strong>${L("Message preview","消息预览")}</strong>${messages.length ? messages.map((message) => `<p>${message}</p>`).join("") : `<p>${L("Choose at least one time to check in.","请选择至少一个报平安时机。")}</p>`}`;
}

function renderWaiting() {
  const choices = state.check;
  return `<section class="page waiting">${image("waiting","scene-image")}
    ${heading(L("Care & Connection","关心与联系"),L("Someone Is Waiting","有人在等"),L("The journey home connects the person walking and the person waiting.","回家的路连接着行走的人，也连接着在等待的人。"))}
    <form class="waiting-form" id="waiting-form">
      <div class="glass check-panel">
        <label class="check-row">${ico("plus")}<span>${L("Share a check-in (optional)","分享报平安消息（可选）")}</span><input class="toggle" name="share" type="checkbox" role="switch" ${choices.share ? "checked" : ""}></label>
        <label class="check-row">${ico("route")}<span>${L("Notify a contact when I set off","出发时通知联系人")}</span><input name="depart" type="checkbox" ${choices.depart ? "checked" : ""} ${choices.share ? "" : "disabled"}></label>
        <label class="check-row">${ico("check")}<span>${L("Confirm when I arrive","到达后报平安")}</span><input name="arrive" type="checkbox" ${choices.arrive ? "checked" : ""} ${choices.share ? "" : "disabled"}></label>
      </div>
      <button type="submit" class="primary">${L("Preview Setup","预览设置")} ${ico("arrow")}</button>
      <p class="fine-print">${L("Prototype · messages stay on this page.","交互原型 · 消息仅在本页预览。")}</p>
    </form>
    <div id="check-preview" class="glass check-preview" aria-live="polite" ${choices.preview ? "" : "hidden"}>${checkPreview()}</div>
  </section>`;
}

function renderAbout() {
  const cards = [
    ["sources","file",L("Where the archive’s material comes from, and what it can tell us.","档案资料从哪里来？它们能说明什么？")],
    ["glossary","book",L("Four ideas behind the design of NightWalk.","理解 NightWalk 设计的四个概念。")],
    ["reflection","quote",L("Consider whose experiences are visible in the everyday map.","思考谁的出行体验被日常地图看见。")],
  ];
  return `<section class="page">${heading(L("Behind the archive","档案背后"),L("About NightWalk","关于 NightWalk"),L("A critical design prototype on women’s night-time mobility, public space and the people who care for one another.","一个关注女性夜间出行、公共空间与相互关怀的批判性设计原型。"))}
    <div class="about-grid">${cards.map(([href,icon,summary]) => `<article class="glass about-card">${ico(icon)}<h2>${pick(pages[href])}</h2><p>${summary}</p>${cta("#"+href,L("Explore","打开"),"secondary")}</article>`).join("")}</div></section>`;
}

function renderSources() {
  const cards = [
    ["file",L("Official Records","官方记录"),L("The two named cases are summarized from published court sentencing remarks. Open either story for its source.","两则实名案件依据公开的法院量刑陈词整理，来源链接见故事详情。")],
    ["book",L("Media Reports","媒体报道"),L("Verified reporting can add context to an archive. The two cases in this edition link directly to court records.","经核实的报道可以补充档案背景。本版本的两则案件直接链接法院记录。")],
    ["people",L("Field Research","实地研究"),L("The map notes and everyday stories illustrate observation and design fiction. They are marked as examples.","地图笔记与日常故事展示观察和设计虚构，页面均标注了示例性质。")],
  ];
  return `<section class="page">${back("#about",L("Back to About","返回关于"))}
    ${heading(L("Reading the archive","阅读档案"),L("Data & Context","资料与背景"),L("Understand the sources, scope and limitations behind the stories and map.","了解故事和地图的资料来源、范围与局限。"))}
    <div class="source-grid">${cards.map(([icon,title,description]) => `<article class="glass source-card">${ico(icon)}<h2>${title}</h2><p>${description}</p></article>`).join("")}</div>
    <section class="glass context-note"><h2>${ico("info")} ${L("Limitations","使用局限")}</h2><p>${L("Historical records describe their own time and place. Routes, walking times and map notes in this prototype are illustrations for discussion. Photographs are illustrative crops from the supplied design references.","历史记录反映当时的时间与地点。本原型的路线、用时和地图笔记用于讨论，配图来自所提供的设计参考。")}</p></section>
  </section>`;
}

function renderGlossary() {
  return `<section class="page">${back("#about",L("Back to About","返回关于"))}
    ${heading(L("Ideas behind NightWalk","NightWalk 的设计概念"),L("Glossary","术语表"),L("Key terms for understanding women’s night-time safety and critical design.","理解女性夜间安全与批判性设计的关键术语。"))}
    <div class="glass glossary-list">${content.glossary.map(({term,summary,detail}) => `<details><summary><strong>${pick(term)}</strong><span>${pick(summary)}</span>${ico("chevron")}</summary><p>${pick(detail)}</p></details>`).join("")}</div>
  </section>`;
}

function renderReflection() {
  return `<section class="reflection-hero">${image("reflection","scene-image")}
    <div class="page"><span class="eyebrow">${L("A closing reflection","留给读者的反思")}</span>
    <h1>${L("A Map for Reflection, Not Just a Route.","一张让人停下来思考的地图。")}</h1>
    <div class="reflection-prompts"><p>${L("Why do we still have to plan, adjust and protect ourselves just to move freely at night?","为什么只是在夜间自由出行，就需要反复计划和调整？")}</p>
    <p>${L("Whose experiences are missing from everyday navigation?","日常导航遗漏了谁的体验？")}</p></div>
    <button class="primary" id="open-reflection" aria-controls="reflection-form" aria-expanded="false" type="button">${L("Write Your Thoughts","写下你的想法")} ${ico("arrow")}</button>
    <form class="reflection-form glass" id="reflection-form" hidden>
      <label for="reflection-text">${L("Your reflection","你的反思")}</label>
      <textarea id="reflection-text" name="reflection" maxlength="2400" rows="4">${safe(state.note)}</textarea>
      <p class="fine-print">${L("Your note stays on this device.","笔记保存在当前设备。")}</p>
      <div><button class="primary" type="submit">${L("Save locally","保存在本机")}</button></div>
      <p id="reflection-status" role="status"></p>
    </form></div></section>`;
}

const views = {home:renderHome,archive:renderArchive,stories:renderStories,map:renderMap,story:renderStory,
  waiting:renderWaiting,about:renderAbout,sources:renderSources,glossary:renderGlossary,reflection:renderReflection};

function render(focus = false) {
  const [page,id] = locationPage();
  shell(page);
  main.innerHTML = views[page](id);
  document.title = `NightWalk · ${page === "story" ? pick(content.stories.find((story) => story.id === id).title) : pick(pages[page])}`;
  if (page === "map") bindMap();
  if (focus) {
    window.scrollTo(0,0);
    main.focus({preventScroll:true});
  }
}

function refreshStories() {
  const results = document.querySelector("#story-results");
  if (results) results.innerHTML = storyResults();
  document.querySelectorAll("[data-category]").forEach((button) => button.setAttribute("aria-pressed", button.dataset.category === state.category));
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a.skip");
  if (!target) return;
  if (target.classList.contains("skip")) {
    event.preventDefault();
    main.focus();
  } else if (target.id === "language") {
    state.lang = L("zh","en");
    storage.write("lang",state.lang);
    render();
    document.querySelector("#language").focus({preventScroll:true});
  } else if (target.dataset.category) {
    state.category = target.dataset.category;
    refreshStories();
  } else if (target.id === "clear-search") {
    state.category = "all";
    state.search = "";
    const input = document.querySelector("#story-search");
    input.value = "";
    refreshStories();
    input.focus();
  } else if (target.dataset.slide) {
    state.voice = (state.voice + Number(target.dataset.slide) + content.voices.length) % content.voices.length;
    document.querySelector("#quote-slide").innerHTML = quoteSlide();
    document.querySelector("#slide-count").textContent = `${state.voice + 1} / ${content.voices.length}`;
  } else if (target.id === "open-reflection") {
    const form = document.querySelector("#reflection-form");
    form.hidden = !form.hidden;
    target.setAttribute("aria-expanded",!form.hidden);
    if (!form.hidden) document.querySelector("#reflection-text").focus();
  }
});

document.addEventListener("input",(event) => {
  if (event.target.id === "story-search") {
    state.search = event.target.value;
    refreshStories();
  }
  if (event.target.id === "reflection-text") state.note = event.target.value;
});

document.addEventListener("change",(event) => {
  if (event.target.form?.id !== "waiting-form") return;
  state.check[event.target.name] = event.target.checked;
  event.target.form.elements.depart.disabled = !state.check.share;
  event.target.form.elements.arrive.disabled = !state.check.share;
  document.querySelector("#check-preview").innerHTML = checkPreview();
});

document.addEventListener("submit",(event) => {
  if (event.target.id === "waiting-form") {
    event.preventDefault();
    state.check.preview = true;
    const preview = document.querySelector("#check-preview");
    preview.innerHTML = checkPreview();
    preview.hidden = false;
  }
  if (event.target.id === "reflection-form") {
    event.preventDefault();
    state.note = event.target.elements.reflection.value;
    document.querySelector("#reflection-status").textContent = storage.write("reflection",state.note) ?
      L("Saved on this device.","已保存在当前设备。") :
      L("Saved for this session. The browser blocked local storage.","本次浏览期间可保留，浏览器限制了本地存储。");
  }
});

window.addEventListener("hashchange", () => render(true));
render();
