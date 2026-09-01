/*
 * Bazino visual direction: Hall of Legends — original cinematic arena language.
 * This page keeps the Instagram identity visible: charcoal black, championship gold,
 * electric blue, console-only messaging, and a recurring virtual host.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { portalNav } from "@/data/portalData";
import { ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Crown,
  Gamepad2,
  MapPin,
  Menu,
  Smartphone,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

type Lang = "tr" | "fa" | "en" | "ru";

type Chapter = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  index: string;
};

const images = {
  hero: "/manus-storage/bazino-hero-reference_074c7394.png",
  vip: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=88",
  tournament: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=88",
  cafe: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=88",
  mark: "/manus-storage/bazino-mark_2aba1000.png",
};

const copy: Record<Lang, {
  languageName: string;
  nav: { arena: string; experiences: string; tournament: string; visit: string };
  hero: { eyebrow: string; lineOne: string; lineTwo: string; body: string; primary: string; secondary: string; cursor: string; chapter: string };
  chapterLabels: { console: string; vip: string; tournament: string };
  section: { eyebrow: string; title: string; body: string; explore: string };
  experiences: Array<{ label: string; title: string; body: string }>;
  tournament: { eyebrow: string; title: string; body: string; button: string; note: string; statLabel: string; statValue: string };
  visit: { eyebrow: string; title: string; body: string; button: string; directions: string };
  process: { eyebrow: string; title: string; steps: Array<{ n: string; title: string; body: string }> };
  footer: { line: string; official: string; location: string; privacy: string };
  menu: string;
}> = {
  tr: {
    languageName: "Türkçe",
    nav: { arena: "Arena", experiences: "Deneyimler", tournament: "Turnuvalar", visit: "Bizi Bul" },
    hero: { eyebrow: "İSKELE • KIBRIS / CHAPTER 01", lineOne: "GELECEK TURUN", lineTwo: "BURADA BAŞLAR.", body: "PS5 ve Xbox Series X deneyimi. VIP salon. 85 inç ekranlar. Her tur, kendi sahnesini hak eder.", primary: "Rezervasyon yap", secondary: "Arenayı keşfet", cursor: "ORBIT TO EXPLORE", chapter: "Bölüm" },
    chapterLabels: { console: "CONSOLE ARENA", vip: "VIP CHALLENGE", tournament: "TOURNAMENT NIGHT" },
    section: { eyebrow: "THE PLAYGROUND", title: "Sadece oyun değil.\nBir gece planı.", body: "Instagram’daki enerjiyi gerçek mekâna taşıyan, konsol deneyimi etrafında tasarlanmış bir gaming lounge.", explore: "Deneyimleri incele" },
    experiences: [
      { label: "CONSOLE 01", title: "PS5 / HAPTIC MODE", body: "Yeni nesil kontrol, güçlü ses ve randevuna hazır bir arena." },
      { label: "CONSOLE 02", title: "XBOX SERIES X", body: "Büyük ekran karşısında kesintisiz rekabet ve takım oyunu." },
      { label: "SCREEN 03", title: "85 INCH FOCUS", body: "Her hareketi kaçırmamak için tasarlanan sinematik görüş alanı." },
      { label: "LOUNGE 04", title: "VIP BETWEEN ROUNDS", body: "Raund aralarında dinlen, sohbet et ve geceyi uzat." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "Kupayı kimin alacağını sahne belirler.", body: "Güncel turnuva tarihleri, katılım koşulları ve resmi ödül bilgileri için bazino.pro’yu ziyaret et. Duyurular tek bir yerde, karar senin.", button: "Resmi bilgileri gör", note: "Ödül ve kurallar için resmi sayfayı kontrol et.", statLabel: "NIGHT STATUS", statValue: "OPEN FOR THE NEXT ROUND" },
    visit: { eyebrow: "FIND YOUR ARENA", title: "İskele’de\noyun gecesi.", body: "Vistamare Hotel, İskele. Kıbrıs’ın gece ritmine karışan, konsol odaklı bir lounge ve kafe.", button: "Rotayı aç", directions: "Konumu görüntüle" },
    process: { eyebrow: "HOW TO ENTER", title: "Üç adım.\nTek bir gece.", steps: [ { n: "01", title: "Sahneni seç", body: "PS5, Xbox Series X, VIP veya turnuva gecesi." }, { n: "02", title: "Yerini ayır", body: "Resmi web sitesinden rezervasyon ve uygulama bildirimlerini takip et." }, { n: "03", title: "Raundu başlat", body: "Arkadaşlarınla gel. Işıklar açıldığında oyun başlar." } ] },
    footer: { line: "Your next match starts here.", official: "Official site", location: "Vistamare Hotel • İskele, Cyprus", privacy: "Privacy" },
    menu: "Menü",
  },
  fa: {
    languageName: "فارسی",
    nav: { arena: "آرنا", experiences: "تجربه‌ها", tournament: "تورنومنت‌ها", visit: "مسیریابی" },
    hero: { eyebrow: "ایسکله • قبرس / فصل ۰۱", lineOne: "راند بعدی‌ات", lineTwo: "از اینجا شروع می‌شود.", body: "تجربه‌ی PS5 و Xbox Series X، سالن VIP و نمایشگرهای ۸۵ اینچی؛ هر راند، صحنه‌ی خودش را دارد.", primary: "رزرو کن", secondary: "کشف آرنا", cursor: "برای کشف حرکت کن", chapter: "فصل" },
    chapterLabels: { console: "آرنای کنسول", vip: "چالش VIP", tournament: "شب تورنومنت" },
    section: { eyebrow: "THE PLAYGROUND", title: "فقط بازی نیست.\nبرنامه‌ی یک شب است.", body: "انرژی اینستاگرام بازینو را به یک فضای واقعی منتقل کردیم؛ جایی که همه‌چیز حول تجربه‌ی کنسول می‌چرخد.", explore: "تجربه‌ها را ببین" },
    experiences: [
      { label: "کنسول ۰۱", title: "PS5 / HAPTIC MODE", body: "کنترل نسل جدید، صدای قدرتمند و آرنایی آماده‌ی راند تو." },
      { label: "کنسول ۰۲", title: "XBOX SERIES X", body: "رقابت بدون توقف و بازی تیمی مقابل یک صفحه‌ی بزرگ." },
      { label: "صفحه ۰۳", title: "85 INCH FOCUS", body: "میدان دید سینمایی برای اینکه هیچ حرکت مهمی را از دست ندهی." },
      { label: "لانژ ۰۴", title: "VIP BETWEEN ROUNDS", body: "بین راندها استراحت کن، گپ بزن و شب را طولانی‌تر کن." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "صحنه تعیین می‌کند چه کسی جام را می‌برد.", body: "برای تاریخ تورنومنت‌ها، شرایط شرکت و اطلاعات رسمی جوایز به bazino.pro سر بزن. اطلاع‌رسانی از یک مسیر رسمی انجام می‌شود.", button: "اطلاعات رسمی را ببین", note: "جوایز و قوانین را در صفحه‌ی رسمی بررسی کن.", statLabel: "وضعیت شب", statValue: "آماده برای راند بعدی" },
    visit: { eyebrow: "FIND YOUR ARENA", title: "شب بازی\nدر ایسکله.", body: "هتل ویستا ماره، ایسکله. یک لانژ و کافه‌ی کنسول‌محور که با ریتم شبانه‌ی قبرس همراه است.", button: "بازکردن مسیر", directions: "دیدن موقعیت" },
    process: { eyebrow: "HOW TO ENTER", title: "سه قدم.\nیک شب.", steps: [ { n: "۰۱", title: "صحنه‌ات را انتخاب کن", body: "PS5، Xbox Series X، VIP یا شب تورنومنت." }, { n: "۰۲", title: "جایت را رزرو کن", body: "از سایت رسمی رزرو کن و اعلان‌های اپلیکیشن را دنبال کن." }, { n: "۰۳", title: "راند را شروع کن", body: "با دوستانت بیا؛ وقتی نورها روشن شوند، بازی آغاز می‌شود." } ] },
    footer: { line: "راند بعدی‌ات از اینجا شروع می‌شود.", official: "سایت رسمی", location: "هتل ویستا ماره • ایسکله، قبرس", privacy: "حریم خصوصی" },
    menu: "منو",
  },
  en: {
    languageName: "English",
    nav: { arena: "Arena", experiences: "Experiences", tournament: "Tournaments", visit: "Find us" },
    hero: { eyebrow: "İSKELE • CYPRUS / CHAPTER 01", lineOne: "YOUR NEXT ROUND", lineTwo: "STARTS HERE.", body: "PS5 and Xbox Series X. A VIP lounge. 85-inch screens. Every round deserves its own scene.", primary: "Reserve your round", secondary: "Explore the arena", cursor: "ORBIT TO EXPLORE", chapter: "Chapter" },
    chapterLabels: { console: "CONSOLE ARENA", vip: "VIP CHALLENGE", tournament: "TOURNAMENT NIGHT" },
    section: { eyebrow: "THE PLAYGROUND", title: "More than a game.\nA night plan.", body: "The energy of the Instagram feed, translated into a real lounge built around console play, social time and big-screen moments.", explore: "Explore the experiences" },
    experiences: [
      { label: "CONSOLE 01", title: "PS5 / HAPTIC MODE", body: "Next-gen control, deep sound and an arena ready for your reservation." },
      { label: "CONSOLE 02", title: "XBOX SERIES X", body: "Full-scale competition and team play in front of the big screen." },
      { label: "SCREEN 03", title: "85 INCH FOCUS", body: "A cinematic field of view built so no important move gets lost." },
      { label: "LOUNGE 04", title: "VIP BETWEEN ROUNDS", body: "Reset, talk, and make the night last longer between rounds." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "The stage decides who takes the cup.", body: "Visit bazino.pro for current tournament dates, entry conditions and official prize information. One official source. Your next move.", button: "See official details", note: "Check the official page for prizes and rules.", statLabel: "NIGHT STATUS", statValue: "OPEN FOR THE NEXT ROUND" },
    visit: { eyebrow: "FIND YOUR ARENA", title: "Game night\nin İskele.", body: "Vistamare Hotel, İskele. A console-first lounge and café that moves with Cyprus after dark.", button: "Open directions", directions: "View location" },
    process: { eyebrow: "HOW TO ENTER", title: "Three steps.\nOne night.", steps: [ { n: "01", title: "Choose your scene", body: "PS5, Xbox Series X, VIP or tournament night." }, { n: "02", title: "Save your spot", body: "Reserve through the official site and follow app notifications." }, { n: "03", title: "Start the round", body: "Bring your people. When the lights come up, play begins." } ] },
    footer: { line: "Your next match starts here.", official: "Official site", location: "Vistamare Hotel • İskele, Cyprus", privacy: "Privacy" },
    menu: "Menu",
  },
  ru: {
    languageName: "Русский",
    nav: { arena: "Арена", experiences: "Впечатления", tournament: "Турниры", visit: "Как найти" },
    hero: { eyebrow: "ИСКЕЛЕ • КИПР / ГЛАВА 01", lineOne: "ТВОЙ СЛЕДУЮЩИЙ РАУНД", lineTwo: "НАЧИНАЕТСЯ ЗДЕСЬ.", body: "PS5 и Xbox Series X, VIP-зал и экраны 85 дюймов. Каждый раунд заслуживает своей сцены.", primary: "Забронировать раунд", secondary: "Открыть арену", cursor: "ДВИГАЙСЯ, ЧТОБЫ ИССЛЕДОВАТЬ", chapter: "Глава" },
    chapterLabels: { console: "КОНСОЛЬНАЯ АРЕНА", vip: "VIP-ЧЕЛЛЕНДЖ", tournament: "ТУРНИРНАЯ НОЧЬ" },
    section: { eyebrow: "THE PLAYGROUND", title: "Больше, чем игра.\nПлан на вечер.", body: "Энергия Instagram превращается в реальное пространство вокруг консольной игры, общения и больших экранов.", explore: "Смотреть впечатления" },
    experiences: [
      { label: "КОНСОЛЬ 01", title: "PS5 / HAPTIC MODE", body: "Новое поколение управления, мощный звук и арена, готовая к твоей брони." },
      { label: "КОНСОЛЬ 02", title: "XBOX SERIES X", body: "Полный масштаб соревнования и командной игры перед большим экраном." },
      { label: "ЭКРАН 03", title: "85 INCH FOCUS", body: "Кинематографичное поле зрения, чтобы не пропустить ни одного движения." },
      { label: "LOUNGE 04", title: "VIP BETWEEN ROUNDS", body: "Отдохни, пообщайся и продли ночь между раундами." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "Сцена решает, кто заберёт кубок.", body: "На bazino.pro опубликованы актуальные даты турниров, условия участия и официальная информация о призах.", button: "Открыть официальные детали", note: "Призы и правила проверяй на официальной странице.", statLabel: "СТАТУС НОЧИ", statValue: "ОТКРЫТА СЛЕДУЮЩАЯ ИГРА" },
    visit: { eyebrow: "FIND YOUR ARENA", title: "Игровая ночь\nв Искеле.", body: "Vistamare Hotel, Искеле. Лаунж и кафе с фокусом на консоли в ритме кипрской ночи.", button: "Открыть маршрут", directions: "Посмотреть локацию" },
    process: { eyebrow: "HOW TO ENTER", title: "Три шага.\nОдна ночь.", steps: [ { n: "01", title: "Выбери сцену", body: "PS5, Xbox Series X, VIP или турнирная ночь." }, { n: "02", title: "Забронируй место", body: "Используй официальный сайт и следи за уведомлениями приложения." }, { n: "03", title: "Начни раунд", body: "Приходи с друзьями. Когда включается свет, игра начинается." } ] },
    footer: { line: "Твой следующий раунд начинается здесь.", official: "Официальный сайт", location: "Vistamare Hotel • Искеле, Кипр", privacy: "Конфиденциальность" },
    menu: "Меню",
  },
};

const chapterData: Record<Lang, Chapter[]> = {
  tr: [
    { id: "console", kicker: "CHAPTER 01", title: "Console Arena", body: "PS5 ve Xbox Series X için tasarlanmış, ışığı ve sesi oyuna göre değişen ana sahne.", image: images.hero, index: "01" },
    { id: "vip", kicker: "CHAPTER 02", title: "VIP Challenge", body: "Daha fazla alan, daha fazla konfor ve raundlar arasında sana ait bir tempo.", image: images.vip, index: "02" },
    { id: "tournament", kicker: "CHAPTER 03", title: "Tournament Night", body: "İzle, katıl, yeniden dene. Resmi turnuva ve ödül bilgileri bazino.pro’da.", image: images.tournament, index: "03" },
  ],
  fa: [
    { id: "console", kicker: "فصل ۰۱", title: "آرنای کنسول", body: "صحنه‌ی اصلی برای PS5 و Xbox Series X؛ جایی که نور و صدا با بازی تغییر می‌کنند.", image: images.hero, index: "۰۱" },
    { id: "vip", kicker: "فصل ۰۲", title: "چالش VIP", body: "فضای بیشتر، راحتی بیشتر و ریتمی که بین راندها متعلق به توست.", image: images.vip, index: "۰۲" },
    { id: "tournament", kicker: "فصل ۰۳", title: "شب تورنومنت", body: "تماشا کن، شرکت کن و دوباره تلاش کن. اطلاعات رسمی در bazino.pro است.", image: images.tournament, index: "۰۳" },
  ],
  en: [
    { id: "console", kicker: "CHAPTER 01", title: "Console Arena", body: "The main stage for PS5 and Xbox Series X, tuned with light and sound for the round.", image: images.hero, index: "01" },
    { id: "vip", kicker: "CHAPTER 02", title: "VIP Challenge", body: "More room, more comfort, and a tempo that belongs to you between rounds.", image: images.vip, index: "02" },
    { id: "tournament", kicker: "CHAPTER 03", title: "Tournament Night", body: "Watch, enter, try again. Official tournament and prize information lives at bazino.pro.", image: images.tournament, index: "03" },
  ],
  ru: [
    { id: "console", kicker: "ГЛАВА 01", title: "Консольная арена", body: "Главная сцена для PS5 и Xbox Series X, где свет и звук работают на раунд.", image: images.hero, index: "01" },
    { id: "vip", kicker: "ГЛАВА 02", title: "VIP-челлендж", body: "Больше пространства, больше комфорта и свой ритм между раундами.", image: images.vip, index: "02" },
    { id: "tournament", kicker: "ГЛАВА 03", title: "Турнирная ночь", body: "Смотри, участвуй, пробуй снова. Официальные детали на bazino.pro.", image: images.tournament, index: "03" },
  ],
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [activeChapter, setActiveChapter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 18, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 18, mass: 0.6 });
  const heroX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);
  const heroY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const heroScale = useTransform(smoothY, [-0.5, 0.5], [1.055, 1.075]);
  const heroRotate = useTransform(smoothX, [-0.5, 0.5], [-0.45, 0.45]);
  const stageX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const stageY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const t = copy[lang];
  const chapters = useMemo(() => chapterData[lang], [lang]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.body.dataset.locale = lang;
  }, [lang]);

  useEffect(() => {
    setActiveChapter(0);
  }, [lang]);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const nextChapter = () => setActiveChapter((value) => (value + 1) % chapters.length);
  const previousChapter = () => setActiveChapter((value) => (value - 1 + chapters.length) % chapters.length);

  return (
    <div className="site-shell" onMouseMove={handlePointerMove} onMouseLeave={handlePointerLeave}>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" aria-label="Bazino home">
          <span className="brand-mark-css" aria-hidden="true">B</span>
          <span className="brand-wordmark">BAZINO</span>
          <span className="brand-submark">GAMING LOUNGE</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`} aria-label="Primary navigation">
          <a href="#top" onClick={() => setMenuOpen(false)}>{t.nav.arena}</a>
          {portalNav.map((item) => <Link key={item.id} href={`/${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <label className="language-switcher">
            <span className="sr-only">Language</span>
            <select value={lang} onChange={(event) => setLang(event.target.value as Lang)} aria-label="Language">
              <option value="tr">TR</option>
              <option value="fa">FA</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
          </label>
          <a className="header-reserve" href="https://bazino.pro" target="_blank" rel="noreferrer">
            {t.hero.primary}<ArrowUpRight size={15} strokeWidth={2.2} />
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section id="top" className="hero" style={{ "--hero-x": "0px", "--hero-y": "0px" } as CSSProperties}>
          <div className="hero-noise" />
          <motion.div className="hero-grid" style={{ x: stageX, y: stageY }} />
          <motion.div className="hero-image-wrap" style={{ x: heroX, y: heroY, scale: heroScale, rotate: heroRotate }}>
            <AnimatePresence mode="wait">
              <motion.img key={chapters[activeChapter].id} className="hero-image" src={chapters[activeChapter].image} alt="Bazino cinematic gaming lounge" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.015 }} transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }} />
            </AnimatePresence>
          </motion.div>
          <div className="hero-vignette" />
          <motion.div className="hero-light-orb hero-light-orb--blue" style={{ x: stageX, y: stageY }} />
          <motion.div className="hero-light-orb hero-light-orb--gold" style={{ x: heroX, y: heroY }} />

          <div className="hero-content layout-frame">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="eyebrow"><span className="eyebrow-line" />{t.hero.eyebrow}</div>
              <AnimatePresence mode="wait">
                <motion.div key={`${lang}-${activeChapter}`} className="hero-copy-transition" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.34 }}>
                  <h1>{activeChapter === 0 ? <>{t.hero.lineOne}<br /><em>{t.hero.lineTwo}</em></> : <>{chapters[activeChapter].title}<br /><em>{t.hero.chapter} {chapters[activeChapter].index}</em></>}</h1>
                  <p>{activeChapter === 0 ? t.hero.body : chapters[activeChapter].body}</p>
                </motion.div>
              </AnimatePresence>
              <div className="hero-actions">
                <a className="button button--gold" href="https://bazino.pro" target="_blank" rel="noreferrer">{t.hero.primary}<ArrowUpRight size={17} /></a>
                <button className="text-button" type="button" onClick={() => scrollToId("experiences")}>{t.hero.secondary}<ArrowDownRight size={17} /></button>
              </div>
              <div className="hero-footnote"><Sparkles size={14} /> {t.hero.cursor}</div>
            </motion.div>

            <motion.div className="hero-stage-meta" style={{ x: stageX, y: stageY }}>
              <div className="stage-coordinates">35°20' N / 33°59' E</div>
              <div className="stage-chapter-card">
                <div className="stage-card-top"><span>{t.hero.chapter} {chapters[activeChapter].index}</span><span>0{activeChapter + 1} / 03</span></div>
                <strong>{chapters[activeChapter].title}</strong>
                <span className="stage-card-caption">{t.chapterLabels[chapters[activeChapter].id as keyof typeof t.chapterLabels]}</span>
                <div className="stage-card-line"><span style={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }} /></div>
              </div>
            </motion.div>
          </div>

          <div className="hero-chapter-nav layout-frame" aria-label="Choose a chapter">
            <div className="chapter-arrows">
              <button type="button" aria-label="Previous chapter" onClick={previousChapter}><ChevronLeft size={18} /></button>
              <button type="button" aria-label="Next chapter" onClick={nextChapter}><ChevronRight size={18} /></button>
            </div>
            <div className="chapter-tabs">
              {chapters.map((chapter, index) => (
                <button key={chapter.id} type="button" className={`chapter-tab ${activeChapter === index ? "chapter-tab--active" : ""}`} onClick={() => setActiveChapter(index)}>
                  <span className="chapter-tab-index">{chapter.index}</span>
                  <span><small>{chapter.kicker}</small><b>{chapter.title}</b></span>
                </button>
              ))}
            </div>
            <div className="scroll-cue"><span className="scroll-cue-line" />SCROLL TO ENTER</div>
          </div>
        </section>

        <div className="gold-marquee" aria-hidden="true"><div>PLAY HARD / STAY LATE / MAKE THE NEXT ROUND COUNT / PLAY HARD / STAY LATE / MAKE THE NEXT ROUND COUNT /</div></div>

        <section id="arena" className="intro-section section-dark">
          <div className="layout-frame intro-layout">
            <div className="section-index">01<span>/</span>04</div>
            <div className="section-heading"><div className="eyebrow"><span className="eyebrow-line" />{t.section.eyebrow}</div><h2>{t.section.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h2></div>
            <div className="section-aside"><p>{t.section.body}</p><button type="button" className="text-button text-button--blue" onClick={() => scrollToId("experiences")}>{t.section.explore}<ArrowDownRight size={17} /></button></div>
          </div>
        </section>

        <section id="experiences" className="experience-section section-dark">
          <div className="layout-frame">
            <div className="section-scene-header"><div className="section-scene-tag"><span>CHAPTER 01</span><b>THE LOADOUT</b></div><div className="technical-rail"><span>4 STATIONS</span><i /><span>CONSOLE ONLY</span><i /><span>ISKELE / CYPRUS</span></div></div>
            <div className="experience-grid">
              {t.experiences.map((experience, index) => {
                const icons = [<Gamepad2 key="gamepad" />, <Gamepad2 key="xbox" />, <Sparkles key="screen" />, <Coffee key="coffee" />];
                return <motion.article key={experience.title} className={`experience-card experience-card--${index + 1}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.06 }}>
                  <div className="experience-card-glow" />
                  <div className="experience-card-icon">{icons[index]}</div>
                  <span className="card-label">{experience.label}</span>
                  <h3>{experience.title}</h3>
                  <p>{experience.body}</p>
                  <span className="card-arrow"><ArrowUpRight size={18} /></span>
                </motion.article>;
              })}
            </div>
          </div>
        </section>

        <section id="tournaments" className="tournament-section">
          <div className="tournament-image-wrap"><img src={images.tournament} alt="Tournament night at Bazino" /><div className="tournament-image-overlay" /></div>
          <div className="layout-frame tournament-layout">
            <div className="section-index section-index--light">02<span>/</span>04</div>
            <div className="tournament-copy"><div className="eyebrow eyebrow--light"><span className="eyebrow-line" />{t.tournament.eyebrow}</div><h2>{t.tournament.title}</h2><p>{t.tournament.body}</p><a className="button button--gold" href="https://bazino.pro" target="_blank" rel="noreferrer">{t.tournament.button}<ArrowUpRight size={17} /></a><span className="micro-note">{t.tournament.note}</span></div>
            <div className="tournament-status"><div className="status-icon"><Trophy size={22} /></div><span>{t.tournament.statLabel}</span><strong>{t.tournament.statValue}</strong><div className="status-pulse"><i /> LIVE SIGNAL</div></div>
          </div>
        </section>

        <section id="visit" className="visit-section section-dark">
          <div className="layout-frame visit-layout">
            <div className="section-scene-header section-scene-header--visit"><div className="section-scene-tag"><span>CHAPTER 03</span><b>THE NIGHT LOUNGE</b></div><div className="technical-rail"><span>VISTAMARE HOTEL</span><i /><span>DOORS OPEN AFTER DARK</span></div></div>
            <div className="visit-copy"><div className="eyebrow"><span className="eyebrow-line" />{t.visit.eyebrow}</div><h2>{t.visit.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h2><p>{t.visit.body}</p><a className="button button--outline" href="https://www.google.com/maps/search/?api=1&query=Vistamare+Hotel+Iskele+Cyprus" target="_blank" rel="noreferrer"><MapPin size={17} />{t.visit.button}</a></div>
            <div className="visit-visual"><img src={images.cafe} alt="Bazino café and lounge" /><div className="visit-stamp"><span>BAZINO</span><b>İSKELE</b><small>CYPRUS / NIGHT PLAY</small></div><div className="visit-pin"><MapPin size={16} /><span>VISTAMARE HOTEL</span></div></div>
          </div>
        </section>

        <section className="process-section section-gold">
          <div className="layout-frame process-layout"><div className="section-index section-index--dark">03<span>/</span>04</div><div className="process-heading"><div className="section-scene-tag section-scene-tag--dark"><span>CHAPTER 04</span><b>THE ENTRY SIGNAL</b></div><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" />{t.process.eyebrow}</div><h2>{t.process.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h2></div><div className="process-steps">{t.process.steps.map((step) => <div className="process-step" key={step.n}><span className="process-number">{step.n}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></div>)}</div></div>
        </section>

        <section className="app-section section-dark">
          <div className="layout-frame app-layout"><div className="chapter-corner-label">CHAPTER 05 / KEEP THE SIGNAL</div><div className="app-glow" /><div className="app-icon-wrap"><Smartphone size={30} /></div><div className="app-copy"><div className="eyebrow"><span className="eyebrow-line" />BAZINO MOBILE SIGNAL</div><h2>Keep your next round<br /><em>within reach.</em></h2><p>Reservations, club notifications and official updates. Visit bazino.pro to find the mobile app and stay in the loop.</p><a className="button button--gold" href="https://bazino.pro" target="_blank" rel="noreferrer">Visit bazino.pro<ArrowUpRight size={17} /></a></div><div className="app-side-note"><span>YOUR DEVICE</span><strong>READY</strong><div className="side-rule" /><span>OFFICIAL CHANNEL</span></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="layout-frame footer-main"><a className="brand-lockup" href="#top"><span className="brand-mark-css" aria-hidden="true">B</span><span className="brand-wordmark">BAZINO</span><span className="brand-submark">GAMING LOUNGE</span></a><p className="footer-line">{t.footer.line}</p><div className="footer-location"><MapPin size={14} />{t.footer.location}</div></div><div className="layout-frame footer-bottom"><span>© {new Date().getFullYear()} BAZINO GAMING LOUNGE</span><a href="https://bazino.pro" target="_blank" rel="noreferrer">{t.footer.official} <ArrowUpRight size={14} /></a><span>{t.footer.privacy}</span></div></footer>
    </div>
  );
}
