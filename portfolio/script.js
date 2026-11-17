// ========== 双语文案库 ==========
const i18nMap = {
  en: {
    heroNote: "✨ Welcome to my creative space",
    heroDesc: "I turn weird and lovely ideas into tangible works with visuals, interaction and playable prototypes.",
    enterWorks: "View Works →",
    aboutMe: "About Me",
    worksTitle: "Works",
    worksDesc: "Browse animation, design and game projects by category",
    all: "All",
    animation: "Animation",
    design: "Design",
    game: "Game",
    wipTitle: "WIP",
    wipDesc: "Experimental projects and demos in iteration",
    aboutTitle: "About",
    clickOpen: "Click to open →",
    basicInfo: "Basic Info",
    introText: "Independent creator & indie game developer, focusing on animation, visual design and lightweight interactive prototypes. I love turning complex ideas into cute, clear and playable works.",
    location: "📍 Location: Remote",
    status: "💼 Status: Open for collaboration & project discussion",
    direction: "🎯 Focus: Original content / Small games / AI-assisted creation",
    designDetail: "Design Details",
    designDesc: "Fresh healing poster built on dopamine color palette and rounded graphic language.",
    aboutDrawerTitle: "About Me",
    otherAccounts: "Other Accounts",
    backToWorks: "← Back to Works",
    aniDesc: "A 2D narrative short about dreams and encounters, focusing on motion, transition rhythm and emotion.",
    gameDesc: "Light healing game prototype built around character movement, scene interaction and AI asset pipeline."
  },
  zh: {
    heroNote: "✨ 欢迎来到我的创作空间",
    heroDesc: "我用画面、交互和可玩原型，把奇奇怪怪的想法变成可触摸的作品。",
    enterWorks: "进入作品集 →",
    aboutMe: "关于我",
    worksTitle: "作品集 Works",
    worksDesc: "按类型浏览动画、设计与游戏项目",
    all: "全部",
    animation: "动画",
    design: "设计",
    game: "游戏",
    wipTitle: "正在开发 WIP",
    wipDesc: "还在迭代中的实验项目与 Demo",
    aboutTitle: "关于我 About",
    clickOpen: "点我打开 →",
    basicInfo: "基本信息",
    introText: "独立创作者 / 独立游戏开发者，专注动画、视觉设计与轻量交互原型。喜欢把复杂想法做成可爱、清楚、能玩的小作品。",
    location: "📍 位置：远程创作",
    status: "💼 状态：开放合作与项目交流",
    direction: "🎯 方向：原创内容 / 小游戏 / AI辅助创作",
    designDetail: "设计作品详情",
    designDesc: "清新治愈系视觉海报，围绕多巴胺配色与圆润图形语言展开。",
    aboutDrawerTitle: "关于我 About Me",
    otherAccounts: "其它平台账号",
    backToWorks: "← 返回作品集",
    aniDesc: "一段关于梦境与相遇的 2D 动态叙事短片，重点表现角色运动、转场节奏与情绪变化。",
    gameDesc: "轻量治愈系小游戏原型，围绕角色移动、场景互动与 AI 素材管线搭建。"
  }
};

// ✅ 默认语言：英文
let currentLang = "en";
const langLabelZh = document.getElementById("langLabelZh");
const langLabelEn = document.getElementById("langLabelEn");

function applyLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18nMap[currentLang][key]) el.innerText = i18nMap[currentLang][key];
  });
  if (currentLang === "en") {
    langLabelEn.classList.add("lang-active");
    langLabelZh.classList.remove("lang-active");
    document.documentElement.lang = "en";
  } else {
    langLabelZh.classList.add("lang-active");
    langLabelEn.classList.remove("lang-active");
    document.documentElement.lang = "zh-CN";
  }
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "zh" : "en";
  applyLanguage();
}

// 导航栏滚动效果
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// 滚动出现动画
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// 作品分类筛选
const tabBtns = document.querySelectorAll(".tab-btn");
const workCards = document.querySelectorAll(".work-card");
tabBtns.forEach(btn => {
  btn.onclick = () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const t = btn.dataset.tab;
    workCards.forEach(card => {
      card.style.display = (t === "all" || card.dataset.type === t) ? "block" : "none";
    });
  };
});

// 抽屉 / 详情页
const mask = document.getElementById("mask");
const designDrawer = document.getElementById("designDrawer");
const aboutDrawer = document.getElementById("aboutDrawer");
const aniPage = document.getElementById("aniPage");
const gamePage = document.getElementById("gamePage");

function openDesignDrawer() { designDrawer.classList.add("active"); mask.classList.add("active"); document.body.style.overflow = "hidden"; }
function closeDesignDrawer() { designDrawer.classList.remove("active"); mask.classList.remove("active"); document.body.style.overflow = "auto"; }
function openAboutDrawer() { aboutDrawer.classList.add("active"); mask.classList.add("active"); document.body.style.overflow = "hidden"; }
function closeAboutDrawer() { aboutDrawer.classList.remove("active"); mask.classList.remove("active"); document.body.style.overflow = "auto"; }
function openAniPage() { aniPage.classList.add("active"); document.body.style.overflow = "hidden"; }
function closeAniPage() { aniPage.classList.remove("active"); document.body.style.overflow = "auto"; }
function openGamePage() { gamePage.classList.add("active"); document.body.style.overflow = "hidden"; }
function closeGamePage() { gamePage.classList.remove("active"); document.body.style.overflow = "auto"; }

mask.onclick = () => {
  closeDesignDrawer();
  closeAboutDrawer();
};

// 页面加载 → 应用默认英文
applyLanguage();
