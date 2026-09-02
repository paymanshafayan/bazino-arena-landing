/*
 * Bazino visual direction: Hall of Legends — original cinematic arena language.
 * This page keeps the Instagram identity visible: charcoal black, championship gold,
 * electric blue, console-only messaging, and a recurring virtual host.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { portalNav } from "@/data/portalData";
import { ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
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

const images = {
  vip: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=88",
  tournament: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=88",
  cafe: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=88",
  mark: "/manus-storage/bazino-mark_2aba1000.png",
  motionVideo: "/manus-storage/mona-fashion-show-hero-16x9-continuous-ending_3c5326f9.mp4",
  motionPoster: "/manus-storage/mona-fashion-show-hero-continuous-first-frame_0abe85da.jpg",
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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = copy[lang];

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


  return (
    <div className="site-shell">
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
        <section id="top" className="hero mona-hero">
          <div className="hero-noise" />
          <div className="mona-cinematic-scene">
            <video
              className="mona-motion-video"
              poster={images.motionPoster}
              muted
              autoPlay
              playsInline
              preload="auto"
              controls={false}
              onEnded={(event) => event.currentTarget.pause()}
              aria-label="Mona fashion-show Hero video, plays once"
            >
              <source src={images.motionVideo} />
            </video>
          </div>
          <div className="hero-content layout-frame">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="eyebrow"><span className="eyebrow-line" />{t.hero.eyebrow}</div>
              <h1>{t.hero.lineOne}<br /><em>{t.hero.lineTwo}</em></h1>
              <p>{t.hero.body}</p>
              <div className="hero-actions">
                <a className="button button--gold" href="https://bazino.pro" target="_blank" rel="noreferrer">{t.hero.primary}<ArrowUpRight size={17} /></a>
                <button className="text-button" type="button" onClick={() => scrollToId("experiences")}>{t.hero.secondary}<ArrowDownRight size={17} /></button>
              </div>
              <div className="hero-footnote"><Sparkles size={14} /> {lang === "fa" ? "اجرای سینمایی مونا را تماشا کن و برای دور بعد آماده شو" : lang === "ru" ? "Смотрите кинематографическое шоу Моны и готовьтесь к следующему раунду" : lang === "en" ? "Watch Mona’s cinematic show and get ready for the next round" : "Mona’nın sinematik şovunu izle, sonraki raunda hazır ol"}</div>
            </motion.div>

            <div className="hero-stage-meta">
              <div className="stage-coordinates">35°20' N / 33°59' E</div>
              <div className="stage-chapter-card mona-status-card">
                <div className="stage-card-top"><span>MONA / LIVE</span><span>THE SHOW</span></div>
                <strong>HALL OF<br />LEGENDS</strong>
                <span className="stage-card-caption">{lang === "fa" ? "میزبان شب‌های کنسولی بازینو" : lang === "ru" ? "Ведущая консольных ночей Bazino" : lang === "en" ? "Host of Bazino’s console nights" : "Bazino konsol gecelerinin sunucusu"}</span>
                <div className="stage-card-line"><span /></div>
              </div>
            </div>
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
