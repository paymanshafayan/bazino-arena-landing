/*
 * Bazino visual direction: Hall of Legends — a cinematic editorial gaming lounge.
 * Seven homepage chapters carry the Instagram identity into the portal: Hero, Console
 * Arena, Active Tournaments, Match History, Lounge Services, Entry Passes, and Visit.
 * Pointer depth is restrained to visual layers/cards; scroll reveals stay accessible.
 */
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "wouter";
import { portalNav } from "@/data/portalData";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Check,
  Coffee,
  Crown,
  Download,
  Gamepad2,
  MapPin,
  Menu,
  Search,
  Smartphone,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";

type Lang = "tr" | "fa" | "en" | "ru";

const reservationUrl = "/reservations";

const images = {
  tournament: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=88",
  cafe: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=88",
  motionVideo: "/manus-storage/mona-fashion-show-hero-16x9-continuous-ending_3c5326f9.mp4",
  motionPoster: "/manus-storage/mona-fashion-show-hero-continuous-first-frame_0abe85da.jpg",
};

type GameCardImage = { key: string; url: string; alt: string; publishedAt?: string; prizeValue?: number; searchTerms?: string };

const gameCardImages: GameCardImage[] = [
  { key: "football", url: "/manus-storage/bazino-card-football-arena-v2_fb055da4.jpg", alt: "Original football console arena visual" },
  { key: "racing", url: "/manus-storage/bazino-card-racing-circuit-v2_3bf73f72.jpg", alt: "Original racing console circuit visual" },
  { key: "tactical", url: "/manus-storage/bazino-card-tactical-night-v2_7e34b12a.jpg", alt: "Original tactical console night visual" },
  { key: "rpg", url: "/manus-storage/bazino-card-rpg-quest-v2_b6110c90.jpg", alt: "Original fantasy console quest visual" },
];

const playgroundPanelImages = [
  { url: "/manus-storage/bazino-playground-console-arena_961d5363.jpg", alt: "Bazino console arena with PS5 and Xbox Series X stations" },
  { url: "/manus-storage/bazino-playground-tournament-stage_0af97a7c.jpg", alt: "Bazino console tournament stage with large screens" },
  { url: "/manus-storage/bazino-playground-vip-lounge_0e449c52.jpg", alt: "Bazino VIP console lounge with premium seating" },
  { url: "/manus-storage/bazino-playground-cafe-social_37bff693.jpg", alt: "Bazino gaming café social zone at night" },
];

const loungeGallery = [
  { url: "/manus-storage/bazino-playground-cafe-social_37bff693.jpg", label: "VIP / CAFÉ", alt: "Bazino VIP café lounge" },
  { url: "/manus-storage/bazino-vip-lounge-seating_0a4f6547.jpg", label: "VIP / PRIVATE", alt: "Bazino private VIP console lounge" },
  { url: "/manus-storage/bazino-cafe-counter-night_2cda0f6c.jpg", label: "CAFÉ / SERVICE", alt: "Bazino café counter at night" },
  { url: "/manus-storage/bazino-screen-wall-arena_5b93281a.jpg", label: "SCREEN / 85 INCH", alt: "Bazino 85-inch screen wall" },
];

const tournamentCategories = [
  { key: "all", label: "ALL SIGNALS" },
  { key: "football", label: "FOOTBALL" },
  { key: "racing", label: "RACING" },
  { key: "tactical", label: "TACTICAL" },
  { key: "rpg", label: "RPG / QUEST" },
] as const;

const categoryLabels: Record<Lang, Record<(typeof tournamentCategories)[number]["key"], string>> = {
  tr: { all: "TÜMÜ", football: "FUTBOL", racing: "YARIŞ", tactical: "TAKTİK", rpg: "RPG / GÖREV" },
  fa: { all: "همه", football: "فوتبال", racing: "مسابقه‌ای", tactical: "تاکتیکی", rpg: "نقش‌آفرینی" },
  en: { all: "ALL", football: "FOOTBALL", racing: "RACING", tactical: "TACTICAL", rpg: "RPG / QUEST" },
  ru: { all: "ВСЕ", football: "ФУТБОЛ", racing: "ГОНКИ", tactical: "ТАКТИКА", rpg: "RPG / КВЕСТ" },
};

const uiCopy: Record<Lang, { search: string; sort: string; featured: string; date: string; prize: string; noResults: string; galleryAuto: string; galleryPaused: string; previous: string; next: string; loader: string; loaderSub: string }> = {
  tr: { search: "Turnuva ara", sort: "Sırala", featured: "Öne çıkan", date: "Tarihe göre", prize: "Ödüle göre", noResults: "Bu sinyal için eşleşme bulunamadı.", galleryAuto: "OTOMATİK GEÇİŞ", galleryPaused: "DURAKLATILDI", previous: "Önceki lounge görseli", next: "Sonraki lounge görseli", loader: "ARENA SİNYALİ YÜKLENİYOR", loaderSub: "Bazino gece akışı hazırlanıyor" },
  fa: { search: "جستجوی تورنومنت", sort: "مرتب‌سازی", featured: "پیشنهادی", date: "بر اساس تاریخ", prize: "بر اساس جایزه", noResults: "برای این سیگنال نتیجه‌ای پیدا نشد.", galleryAuto: "حرکت خودکار", galleryPaused: "متوقف", previous: "تصویر قبلی لانژ", next: "تصویر بعدی لانژ", loader: "در حال بارگذاری سیگنال آرنا", loaderSub: "جریان شبانه‌ی بازینو آماده می‌شود" },
  en: { search: "Search tournaments", sort: "Sort", featured: "Featured", date: "By date", prize: "By prize", noResults: "No signal matches this search.", galleryAuto: "AUTOPLAY", galleryPaused: "PAUSED", previous: "Previous lounge image", next: "Next lounge image", loader: "LOADING ARENA SIGNAL", loaderSub: "Preparing the Bazino night flow" },
  ru: { search: "Поиск турниров", sort: "Сортировка", featured: "Избранное", date: "По дате", prize: "По призу", noResults: "Совпадений для этого сигнала нет.", galleryAuto: "АВТОПЕРЕХОД", galleryPaused: "ПАУЗА", previous: "Предыдущее фото лаунжа", next: "Следующее фото лаунжа", loader: "ЗАГРУЗКА СИГНАЛА АРЕНЫ", loaderSub: "Готовим ночной поток Bazino" },
};

type TournamentSort = "featured" | "date" | "prize";

type Copy = {
  languageName: string;
  nav: { arena: string; experiences: string; tournament: string; visit: string };
  hero: { eyebrow: string; lineOne: string; lineTwo: string; body: string; primary: string; secondary: string; cursor: string; chapter: string };
  section: { eyebrow: string; title: string; body: string; explore: string };
  experiences: Array<{ label: string; title: string; body: string }>;
  tournament: { eyebrow: string; title: string; body: string; button: string; note: string; statLabel: string; statValue: string };
  results: { eyebrow: string; title: string; body: string; button: string; rows: Array<{ round: string; players: string; score: string; mode: string }> };
  lounge: { eyebrow: string; title: string; body: string; button: string; services: Array<{ label: string; title: string; body: string }> };
  passes: { eyebrow: string; title: string; body: string; button: string; steps: Array<{ n: string; title: string; body: string }> };
  visit: { eyebrow: string; title: string; body: string; button: string; directions: string; appTitle: string; appBody: string; appButton: string };
  footer: { line: string; official: string; location: string; privacy: string };
  menu: string;
};

const copy: Record<Lang, Copy> = {
  tr: {
    languageName: "Türkçe",
    nav: { arena: "Arena", experiences: "Deneyimler", tournament: "Turnuvalar", visit: "Bizi Bul" },
    hero: { eyebrow: "İSKELE • KIBRIS / CHAPTER 01", lineOne: "ŞAMPİYONSAN,", lineTwo: "İŞTE BURASI.", body: "PS5 ve Xbox Series X deneyimi. VIP salon. 85 inç ekranlar. Her tur, kendi sahnesini hak eder.", primary: "Rezervasyon yap", secondary: "Arenayı keşfet", cursor: "ORBIT TO EXPLORE", chapter: "Bölüm" },
    section: { eyebrow: "THE PLAYGROUND", title: "Sadece oyun değil.\nBir gece planı.", body: "Instagram’daki enerjiyi gerçek mekâna taşıyan, konsol deneyimi etrafında tasarlanmış bir gaming lounge.", explore: "Deneyimleri incele" },
    experiences: [
      { label: "CONSOLE 01", title: "PS5 / HAPTIC MODE", body: "Yeni nesil kontrol, güçlü ses ve randevuna hazır bir arena." },
      { label: "CONSOLE 02", title: "XBOX SERIES X", body: "Büyük ekran karşısında kesintisiz rekabet ve takım oyunu." },
      { label: "SCREEN 03", title: "85 INCH FOCUS", body: "Her hareketi kaçırmamak için tasarlanan sinematik görüş alanı." },
      { label: "LOUNGE 04", title: "VIP BETWEEN ROUNDS", body: "Raund aralarında dinlen, sohbet et ve geceyi uzat." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "Kupayı kimin alacağını sahne belirler.", body: "Güncel turnuva tarihleri, katılım koşulları ve resmi ödül bilgileri için bazino.pro’yu ziyaret et. Duyurular tek bir yerde, karar senin.", button: "Resmi bilgileri gör", note: "Ödül ve kurallar için resmi sayfayı kontrol et.", statLabel: "NIGHT STATUS", statValue: "CHECK OFFICIAL PAGE" },
    results: { eyebrow: "MATCH HISTORY", title: "Her skor, bir sonraki geceye sinyal gönderir.", body: "Sonuç yüzeyini resmi portal verileriyle doldurmak için hazır tuttuk. Kazananlar ve skorlar yalnızca doğrulanmış sonuçlarla yayınlanır.", button: "Turnuva merkezine git", rows: [ { round: "ROUND 07", players: "OFFICIAL / UPDATE", score: "— —", mode: "PORTAL DATA" }, { round: "ROUND 06", players: "VERIFIED / RESULT", score: "— —", mode: "PORTAL DATA" }, { round: "ROUND 05", players: "NEXT / SIGNAL", score: "— —", mode: "OFFICIAL PAGE" } ] },
    lounge: { eyebrow: "THE NIGHT LOUNGE", title: "VIP ritmi.\nKafe molası.", body: "Oyun gecesini yalnızca ekrana değil, aralardaki zamana da göre tasarladık. Rahatla, sipariş ver, sonraki raunda hazırlan.", button: "Kafeyi keşfet", services: [ { label: "VIP / 01", title: "Daha fazla alan", body: "Daha fazla konfor ve raundlar arasında daha sakin bir tempo." }, { label: "CAFÉ / 02", title: "Raund arası servis", body: "Oyun akışını bölmeden sipariş ver ve geceyi sürdür." }, { label: "SCREEN / 03", title: "85 inç odak", body: "Her golü, hamleyi ve son saniyeyi daha büyük yaşa." } ] },
    passes: { eyebrow: "HOW TO ENTER", title: "Üç adım.\nTek bir gece.", body: "Sahneni seç, yerini ayır ve ışıklar açıldığında oyuna gir. Resmi rezervasyon ve kulüp bildirimleri için Bazino kanallarını kullan.", button: "Yerini ayır", steps: [ { n: "01", title: "Sahneni seç", body: "PS5, Xbox Series X, VIP veya turnuva gecesi." }, { n: "02", title: "Yerini ayır", body: "Resmi web sitesinden rezervasyon ve uygulama bildirimlerini takip et." }, { n: "03", title: "Raundu başlat", body: "Arkadaşlarınla gel. Işıklar açıldığında oyun başlar." } ] },
    visit: { eyebrow: "FIND YOUR ARENA", title: "İskele’de\noyun gecesi.", body: "Vistamare Hotel, İskele. Kıbrıs’ın gece ritmine karışan, konsol odaklı bir lounge ve kafe.", button: "Rotayı aç", directions: "Konumu görüntüle", appTitle: "Sinyali yanında taşı.", appBody: "Rezervasyonlar, kulüp bildirimleri ve resmi güncellemeler için bazino.pro’yu ziyaret et ve Bazino uygulamasını bul.", appButton: "bazino.pro’yu ziyaret et" },
    footer: { line: "Bir sonraki raundun burada başlar.", official: "Resmi site", location: "Vistamare Hotel • İskele, Cyprus", privacy: "Privacy" },
    menu: "Menü",
  },
  fa: {
    languageName: "فارسی",
    nav: { arena: "آرنا", experiences: "تجربه‌ها", tournament: "تورنومنت‌ها", visit: "مسیریابی" },
    hero: { eyebrow: "ایسکله • قبرس / فصل ۰۱", lineOne: "اگر قهرمانی،", lineTwo: "اینجاست.", body: "تجربه‌ی PS5 و Xbox Series X، سالن VIP و نمایشگرهای ۸۵ اینچی؛ هر راند، صحنه‌ی خودش را دارد.", primary: "رزرو کن", secondary: "کشف آرنا", cursor: "برای کشف حرکت کن", chapter: "فصل" },
    section: { eyebrow: "THE PLAYGROUND", title: "فقط بازی نیست.\nبرنامه‌ی یک شب است.", body: "انرژی اینستاگرام بازینو را به یک فضای واقعی منتقل کردیم؛ جایی که همه‌چیز حول تجربه‌ی کنسول می‌چرخد.", explore: "تجربه‌ها را ببین" },
    experiences: [
      { label: "کنسول ۰۱", title: "PS5 / HAPTIC MODE", body: "کنترل نسل جدید، صدای قدرتمند و آرنایی آماده‌ی راند تو." },
      { label: "کنسول ۰۲", title: "XBOX SERIES X", body: "رقابت بدون توقف و بازی تیمی مقابل یک صفحه‌ی بزرگ." },
      { label: "صفحه ۰۳", title: "85 INCH FOCUS", body: "میدان دید سینمایی برای اینکه هیچ حرکت مهمی را از دست ندهی." },
      { label: "لانژ ۰۴", title: "VIP BETWEEN ROUNDS", body: "بین راندها استراحت کن، گپ بزن و شب را طولانی‌تر کن." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "صحنه تعیین می‌کند چه کسی جام را می‌برد.", body: "برای تاریخ تورنومنت‌ها، شرایط شرکت و اطلاعات رسمی جوایز به bazino.pro سر بزن. اطلاع‌رسانی از یک مسیر رسمی انجام می‌شود.", button: "اطلاعات رسمی را ببین", note: "جوایز و قوانین را در صفحه‌ی رسمی بررسی کن.", statLabel: "سیگنال رسمی", statValue: "صفحه‌ی رسمی را ببین" },
    results: { eyebrow: "MATCH HISTORY", title: "هر امتیاز، سیگنال شب بعدی است.", body: "این سطح برای دریافت نتایج رسمی پورتال آماده است. نام برندگان و امتیازها فقط با داده‌ی تأییدشده نمایش داده می‌شوند.", button: "رفتن به مرکز تورنومنت", rows: [ { round: "راند ۰۷", players: "رسمی / به‌روزرسانی", score: "— —", mode: "داده پورتال" }, { round: "راند ۰۶", players: "تأییدشده / نتیجه", score: "— —", mode: "داده پورتال" }, { round: "راند ۰۵", players: "بعدی / سیگنال", score: "— —", mode: "صفحه رسمی" } ] },
    lounge: { eyebrow: "THE NIGHT LOUNGE", title: "ریتم VIP.\nمکث کافه.", body: "شب بازی را برای فاصله‌ی بین راندها هم طراحی کرده‌ایم. استراحت کن، سفارش بده و برای راند بعد آماده شو.", button: "کافه را ببین", services: [ { label: "VIP / ۰۱", title: "فضای بیشتر", body: "راحتی بیشتر و ریتمی آرام‌تر در فاصله‌ی بین راندها." }, { label: "CAFÉ / ۰۲", title: "سرویس بین راندها", body: "بدون خروج از جریان بازی سفارش بده و شب را ادامه بده." }, { label: "SCREEN / ۰۳", title: "تمرکز ۸۵ اینچی", body: "هر گل، حرکت و ثانیه‌ی آخر را بزرگ‌تر تجربه کن." } ] },
    passes: { eyebrow: "HOW TO ENTER", title: "سه قدم.\nیک شب.", body: "صحنه‌ات را انتخاب کن، جایت را رزرو کن و وقتی نورها روشن شدند وارد بازی شو. برای رزرو رسمی و اعلان‌های باشگاه از کانال‌های بازینو استفاده کن.", button: "جایت را رزرو کن", steps: [ { n: "۰۱", title: "صحنه‌ات را انتخاب کن", body: "PS5، Xbox Series X، VIP یا شب تورنومنت." }, { n: "۰۲", title: "جایت را رزرو کن", body: "از سایت رسمی رزرو کن و اعلان‌های اپلیکیشن را دنبال کن." }, { n: "۰۳", title: "راند را شروع کن", body: "با دوستانت بیا؛ وقتی نورها روشن شوند، بازی آغاز می‌شود." } ] },
    visit: { eyebrow: "FIND YOUR ARENA", title: "شب بازی\nدر ایسکله.", body: "هتل ویستا ماره، ایسکله. یک لانژ و کافه‌ی کنسول‌محور که با ریتم شبانه‌ی قبرس همراه است.", button: "بازکردن مسیر", directions: "دیدن موقعیت", appTitle: "سیگنال را همراهت داشته باش.", appBody: "برای رزروها، اعلان‌های باشگاه و به‌روزرسانی‌های رسمی به bazino.pro سر بزن و اپلیکیشن بازینو را پیدا کن.", appButton: "بازدید از bazino.pro" },
    footer: { line: "راند بعدی‌ات از اینجا شروع می‌شود.", official: "سایت رسمی", location: "هتل ویستا ماره • ایسکله، قبرس", privacy: "حریم خصوصی" },
    menu: "منو",
  },
  en: {
    languageName: "English",
    nav: { arena: "Arena", experiences: "Experiences", tournament: "Tournaments", visit: "Find us" },
    hero: { eyebrow: "İSKELE • CYPRUS / CHAPTER 01", lineOne: "IF YOU ARE A CHAMP,", lineTwo: "THIS IS IT.", body: "PS5 and Xbox Series X. A VIP lounge. 85-inch screens. Every round deserves its own scene.", primary: "Reserve your round", secondary: "Explore the arena", cursor: "ORBIT TO EXPLORE", chapter: "Chapter" },
    section: { eyebrow: "THE PLAYGROUND", title: "More than a game.\nA night plan.", body: "The energy of the Instagram feed, translated into a real lounge built around console play, social time and big-screen moments.", explore: "Explore the experiences" },
    experiences: [
      { label: "CONSOLE 01", title: "PS5 / HAPTIC MODE", body: "Next-gen control, deep sound and an arena ready for your reservation." },
      { label: "CONSOLE 02", title: "XBOX SERIES X", body: "Full-scale competition and team play in front of the big screen." },
      { label: "SCREEN 03", title: "85 INCH FOCUS", body: "A cinematic field of view built so no important move gets lost." },
      { label: "LOUNGE 04", title: "VIP BETWEEN ROUNDS", body: "Reset, talk, and make the night last longer between rounds." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "The stage decides who takes the cup.", body: "Visit bazino.pro for current tournament dates, entry conditions and official prize information. One official source. Your next move.", button: "See official details", note: "Check the official page for prizes and rules.", statLabel: "NIGHT STATUS", statValue: "CHECK OFFICIAL PAGE" },
    results: { eyebrow: "MATCH HISTORY", title: "Every score sends a signal to the next night.", body: "This scoreboard surface is ready for official portal data. Winners and scores appear only when verified results are available.", button: "Open tournament hub", rows: [ { round: "ROUND 07", players: "OFFICIAL / UPDATE", score: "— —", mode: "PORTAL DATA" }, { round: "ROUND 06", players: "VERIFIED / RESULT", score: "— —", mode: "PORTAL DATA" }, { round: "ROUND 05", players: "NEXT / SIGNAL", score: "— —", mode: "OFFICIAL PAGE" } ] },
    lounge: { eyebrow: "THE NIGHT LOUNGE", title: "VIP rhythm.\nCafé pause.", body: "The night is designed for the time between the screens, too. Reset, order, and get ready for the next round.", button: "Explore the café", services: [ { label: "VIP / 01", title: "More room", body: "More comfort and a quieter rhythm between rounds." }, { label: "CAFÉ / 02", title: "Between-round service", body: "Order without leaving the flow and keep the night moving." }, { label: "SCREEN / 03", title: "85-inch focus", body: "Every goal, move and final second, experienced bigger." } ] },
    passes: { eyebrow: "HOW TO ENTER", title: "Three steps.\nOne night.", body: "Choose your scene, save your spot, and enter when the lights come up. Use Bazino’s official channels for reservations and club notifications.", button: "Save your spot", steps: [ { n: "01", title: "Choose your scene", body: "PS5, Xbox Series X, VIP or tournament night." }, { n: "02", title: "Save your spot", body: "Reserve through the official site and follow app notifications." }, { n: "03", title: "Start the round", body: "Bring your people. When the lights come up, play begins." } ] },
    visit: { eyebrow: "FIND YOUR ARENA", title: "Game night\nin İskele.", body: "Vistamare Hotel, İskele. A console-first lounge and café that moves with Cyprus after dark.", button: "Open directions", directions: "View location", appTitle: "Keep the signal close.", appBody: "Reservations, club notifications and official updates. Visit bazino.pro to find the Bazino app and stay in the loop.", appButton: "Visit bazino.pro" },
    footer: { line: "Your next match starts here.", official: "Official site", location: "Vistamare Hotel • İskele, Cyprus", privacy: "Privacy" },
    menu: "Menu",
  },
  ru: {
    languageName: "Русский",
    nav: { arena: "Арена", experiences: "Впечатления", tournament: "Турниры", visit: "Как найти" },
    hero: { eyebrow: "ИСКЕЛЕ • КИПР / ГЛАВА 01", lineOne: "ЕСЛИ ТЫ ЧЕМПИОН,", lineTwo: "ТЕБЕ СЮДА.", body: "PS5 и Xbox Series X, VIP-зал и экраны 85 дюймов. Каждый раунд заслуживает своей сцены.", primary: "Забронировать раунд", secondary: "Открыть арену", cursor: "ДВИГАЙСЯ, ЧТОБЫ ИССЛЕДОВАТЬ", chapter: "Глава" },
    section: { eyebrow: "THE PLAYGROUND", title: "Больше, чем игра.\nПлан на вечер.", body: "Энергия Instagram превращается в реальное пространство вокруг консольной игры, общения и больших экранов.", explore: "Смотреть впечатления" },
    experiences: [
      { label: "КОНСОЛЬ 01", title: "PS5 / HAPTIC MODE", body: "Новое поколение управления, мощный звук и арена, готовая к твоей брони." },
      { label: "КОНСОЛЬ 02", title: "XBOX SERIES X", body: "Полный масштаб соревнования и командной игры перед большим экраном." },
      { label: "ЭКРАН 03", title: "85 INCH FOCUS", body: "Кинематографичное поле зрения, чтобы не пропустить ни одного движения." },
      { label: "LOUNGE 04", title: "VIP BETWEEN ROUNDS", body: "Отдохни, пообщайся и продли ночь между раундами." },
    ],
    tournament: { eyebrow: "THE NEXT MATCH", title: "Сцена решает, кто заберёт кубок.", body: "На bazino.pro опубликованы актуальные даты турниров, условия участия и официальная информация о призах.", button: "Открыть официальные детали", note: "Призы и правила проверяй на официальной странице.", statLabel: "ОФИЦИАЛЬНЫЙ СИГНАЛ", statValue: "ПРОВЕРЬ ОФИЦИАЛЬНУЮ СТРАНИЦУ" },
    results: { eyebrow: "MATCH HISTORY", title: "Каждый счёт отправляет сигнал в следующую ночь.", body: "Табло готово к официальным данным портала. Победители и счёт показываются только после проверки результатов.", button: "Открыть центр турниров", rows: [ { round: "РАУНД 07", players: "ОФИЦИАЛЬНО / ОБНОВЛЕНИЕ", score: "— —", mode: "ДАННЫЕ ПОРТАЛА" }, { round: "РАУНД 06", players: "ПРОВЕРЕНО / РЕЗУЛЬТАТ", score: "— —", mode: "ДАННЫЕ ПОРТАЛА" }, { round: "РАУНД 05", players: "СЛЕДУЮЩИЙ / СИГНАЛ", score: "— —", mode: "ОФИЦИАЛЬНАЯ СТРАНИЦА" } ] },
    lounge: { eyebrow: "THE NIGHT LOUNGE", title: "Ритм VIP.\nПауза в кафе.", body: "Ночь продумана и для времени между экранами. Отдохни, закажи и приготовься к следующему раунду.", button: "Открыть кафе", services: [ { label: "VIP / 01", title: "Больше пространства", body: "Больше комфорта и спокойный ритм между раундами." }, { label: "CAFÉ / 02", title: "Сервис между раундами", body: "Заказывай, не покидая игровой поток, и продолжай ночь." }, { label: "SCREEN / 03", title: "Фокус 85 дюймов", body: "Каждый гол, движение и последняя секунда — ещё масштабнее." } ] },
    passes: { eyebrow: "HOW TO ENTER", title: "Три шага.\nОдна ночь.", body: "Выбери сцену, забронируй место и входи в игру, когда включается свет. Используй официальные каналы Bazino для брони и уведомлений клуба.", button: "Забронировать место", steps: [ { n: "01", title: "Выбери сцену", body: "PS5, Xbox Series X, VIP или турнирная ночь." }, { n: "02", title: "Забронируй место", body: "Используй официальный сайт и следи за уведомлениями приложения." }, { n: "03", title: "Начни раунд", body: "Приходи с друзьями. Когда включается свет, игра начинается." } ] },
    visit: { eyebrow: "FIND YOUR ARENA", title: "Игровая ночь\nв Искеле.", body: "Vistamare Hotel, Искеле. Лаунж и кафе с фокусом на консоли в ритме кипрской ночи.", button: "Открыть маршрут", directions: "Посмотреть локацию", appTitle: "Держи сигнал рядом.", appBody: "Брони, уведомления клуба и официальные обновления. Зайди на bazino.pro, чтобы найти приложение Bazino.", appButton: "Открыть bazino.pro" },
    footer: { line: "Твой следующий раунд начинается здесь.", official: "Официальный сайт", location: "Vistamare Hotel • Искеле, Кипр", privacy: "Конфиденциальность" },
    menu: "Меню",
  },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.58, delay, ease: [0.23, 1, 0.32, 1] }}>
      {children}
    </motion.div>
  );
}

function splitLines(text: string) {
  return text.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}{index < text.split("\n").length - 1 && <br />}</span>);
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tournamentFilter, setTournamentFilter] = useState<(typeof tournamentCategories)[number]["key"]>("all");
  const [tournamentQuery, setTournamentQuery] = useState("");
  const [tournamentSort, setTournamentSort] = useState<TournamentSort>("featured");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const t = copy[lang];
  const ui = uiCopy[lang];
  const visibleGameCards = [...gameCardImages]
    .filter((card) => tournamentFilter === "all" || card.key === tournamentFilter)
    .filter((card) => `${card.key} ${card.alt} ${card.searchTerms ?? ""}`.toLowerCase().includes(tournamentQuery.trim().toLowerCase()))
    .sort((a, b) => {
      if (tournamentSort === "date") return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
      if (tournamentSort === "prize") return (b.prizeValue ?? 0) - (a.prizeValue ?? 0);
      return 0;
    });
  const activeGallery = loungeGallery[galleryIndex];

  const handleDepthMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const resetDepth = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "0");
    event.currentTarget.style.setProperty("--pointer-y", "0");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (galleryPaused) return;
    const timer = window.setInterval(() => setGalleryIndex((index) => (index + 1) % loungeGallery.length), 5200);
    return () => window.clearInterval(timer);
  }, [galleryPaused]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced ? 360 : 980;
    const fontReady = document.fonts?.ready ?? Promise.resolve();
    const timer = new Promise<void>((resolve) => window.setTimeout(resolve, delay));
    let cancelled = false;
    Promise.all([fontReady, timer]).then(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.body.dataset.locale = lang;
  }, [lang]);

  return (
    <>
      {isLoading && (
        <div className="bazino-loader" role="status" aria-live="polite">
          <div className="bazino-loader-mark" aria-hidden="true">B</div>
          <div className="bazino-loader-wordmark">BAZINO</div>
          <div className="bazino-loader-track"><span /></div>
          <p>{ui.loader}</p>
          <small>{ui.loaderSub}</small>
        </div>
      )}
      <div className={`site-shell ${isLoading ? "site-shell--loading" : "site-shell--ready"}`} aria-busy={isLoading} aria-hidden={isLoading}>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a className="brand-lockup" href="#top" aria-label="Bazino home">
          <span className="brand-mark-css" aria-hidden="true">B</span>
          <span className="brand-wordmark">BAZINO</span>
          <span className="brand-submark">GAMING LOUNGE</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`} aria-label="Primary navigation">
          <a href="#arena" onClick={() => setMenuOpen(false)}>{t.nav.arena}</a>
          <a href="#lounge" onClick={() => setMenuOpen(false)}>{t.nav.experiences}</a>
          <a href="#tournaments" onClick={() => setMenuOpen(false)}>{t.nav.tournament}</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>{t.nav.visit}</a>
          {portalNav.slice(0, 3).map((item) => <Link key={item.id} href={`/${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
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
          <Link className="header-reserve" href={reservationUrl}>{t.hero.primary}<ArrowUpRight size={15} strokeWidth={2.2} /></Link>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section id="top" className="hero mona-hero" onPointerMove={handleDepthMove} onPointerLeave={resetDepth}>
          <div className="hero-noise" />
          <div className="mona-cinematic-scene">
            <video ref={videoRef} className="mona-motion-video" poster={images.motionPoster} muted autoPlay playsInline preload="auto" controls={false} aria-label="Mona fashion-show Hero video, plays once">
              <source src={images.motionVideo} />
            </video>
          </div>
          <div className="hero-depth-grid" aria-hidden="true" />
          <div className="hero-content layout-frame">
            <Reveal className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" />{t.hero.eyebrow}</div>
              <h1>{t.hero.lineOne}<br /><em>{t.hero.lineTwo}</em></h1>
              <p>{t.hero.body}</p>
              <div className="hero-actions">
                <Link className="button button--gold" href={reservationUrl}>{t.hero.primary}<ArrowUpRight size={17} /></Link>
                <button className="text-button" type="button" onClick={() => scrollToId("arena")}>{t.hero.secondary}<ArrowDownRight size={17} /></button>
              </div>
              <div className="hero-footnote"><Sparkles size={14} /> {t.hero.cursor}</div>
            </Reveal>
            <Reveal className="hero-stage-meta" delay={0.12}>
              <div className="stage-coordinates">35°20' N / 33°59' E</div>
              <div className="stage-chapter-card mona-status-card">
                <div className="stage-card-top"><span>MONA / LIVE</span><span>{t.hero.chapter} 01</span></div>
                <strong>HALL OF<br />LEGENDS</strong>
                <span className="stage-card-caption">{lang === "fa" ? "میزبان شب‌های کنسولی بازینو" : lang === "ru" ? "Ведущая консольных ночей Bazino" : lang === "en" ? "Host of Bazino’s console nights" : "Bazino konsol gecelerinin sunucusu"}</span>
                <div className="stage-card-line"><span /></div>
              </div>
            </Reveal>
          </div>
          <div className="hero-cursor-rail"><span>{t.hero.cursor}</span><i /><span>01 / 07</span></div>
        </section>

        <div className="gold-marquee" aria-hidden="true"><div>PLAY HARD / STAY LATE / MAKE THE NEXT ROUND COUNT / PLAY HARD / STAY LATE / MAKE THE NEXT ROUND COUNT /</div></div>

        <section id="arena" className="arena-section section-dark" onPointerMove={handleDepthMove} onPointerLeave={resetDepth}>
          <div className="layout-frame">
            <div className="section-scene-header"><div className="section-scene-tag"><span>CHAPTER 02</span><b>CONSOLE ARENA</b></div><div className="technical-rail"><span>4 STATIONS</span><i /><span>CONSOLE ONLY</span><i /><span>ISKELE / CYPRUS</span></div></div>
            <div className="intro-layout">
              <div className="section-index">02<span>/</span>07</div>
              <Reveal className="section-heading"><div className="eyebrow"><span className="eyebrow-line" />{t.section.eyebrow}</div><h2>{splitLines(t.section.title)}</h2></Reveal>
              <Reveal className="section-aside" delay={0.1}><p>{t.section.body}</p><button type="button" className="text-button text-button--blue" onClick={() => scrollToId("lounge")}>{t.section.explore}<ArrowDownRight size={17} /></button></Reveal>
            </div>
            <div className="experience-grid cinematic-card-grid">
              {t.experiences.map((experience, index) => {
                const icons = [<Gamepad2 key="gamepad" />, <Gamepad2 key="xbox" />, <Sparkles key="screen" />, <Crown key="vip" />];
                return <motion.article key={experience.title} className={`experience-card experience-card--${index + 1}`} onPointerMove={handleDepthMove} onPointerLeave={resetDepth} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08 }}>
                  <div className="experience-card-glow" />
                  <img className="experience-card-image" src={playgroundPanelImages[index].url} alt={playgroundPanelImages[index].alt} />
                  <div className="experience-card-image-shade" />
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

        <section id="tournaments" className="tournament-section" onPointerMove={handleDepthMove} onPointerLeave={resetDepth}>
          <div className="tournament-image-wrap"><img src={images.tournament} alt="Tournament night at Bazino" /><div className="tournament-image-overlay" /></div>
          <div className="layout-frame tournament-layout">
            <div className="section-index section-index--light">03<span>/</span>07</div>
            <Reveal className="tournament-copy"><div className="eyebrow eyebrow--light"><span className="eyebrow-line" />{t.tournament.eyebrow}</div><h2>{t.tournament.title}</h2><p>{t.tournament.body}</p><Link className="button button--gold" href="/tournaments">{t.tournament.button}<ArrowUpRight size={17} /></Link><span className="micro-note">{t.tournament.note}</span></Reveal>
            <Reveal className="tournament-status" delay={0.14}><div className="status-icon"><Trophy size={22} /></div><span>{t.tournament.statLabel}</span><strong>{t.tournament.statValue}</strong><div className="status-pulse"><i /> LIVE SIGNAL</div></Reveal>
                          <Reveal className="tournament-discovery" delay={0.2}>
              <div className="filter-heading"><span>DISCOVER BY GENRE</span><i /></div>
              <div className="tournament-filter" role="group" aria-label="Filter tournaments by game category">
                {tournamentCategories.map((category) => <button key={category.key} type="button" className={tournamentFilter === category.key ? "is-active" : ""} aria-pressed={tournamentFilter === category.key} onClick={() => setTournamentFilter(category.key)}>{categoryLabels[lang][category.key]}</button>)}
              </div>
              <div className="tournament-tools">
                <label className="tournament-search"><Search size={15} aria-hidden="true" /><span className="sr-only">{ui.search}</span><input type="search" value={tournamentQuery} onChange={(event) => setTournamentQuery(event.target.value)} placeholder={ui.search} /></label>
                <label className="tournament-sort"><span>{ui.sort}</span><select value={tournamentSort} onChange={(event) => setTournamentSort(event.target.value as TournamentSort)} aria-label={ui.sort}><option value="featured">{ui.featured}</option><option value="date">{ui.date}</option><option value="prize">{ui.prize}</option></select></label>
              </div>
              <div className="tournament-tool-note">{tournamentSort === "featured" ? ui.featured : tournamentSort === "date" ? ui.date : ui.prize} · {tournamentQuery ? `${visibleGameCards.length} / ${gameCardImages.length}` : `${gameCardImages.length} SIGNALS`}</div>

              <div className="tournament-cards">
                {visibleGameCards.length ? visibleGameCards.map((card, index) => <motion.article key={card.key} className="tournament-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.06 }} onPointerMove={handleDepthMove} onPointerLeave={resetDepth}><img src={card.url} alt={card.alt} /><div className="tournament-card-shade" /><span>{categoryLabels[lang][card.key as keyof typeof categoryLabels["en"]]}</span><strong>{lang === "fa" ? "اطلاعات رسمی" : lang === "ru" ? "Официальные детали" : lang === "en" ? "Official details" : "Resmi detaylar"}</strong></motion.article>) : <div className="tournament-empty" role="status">{ui.noResults}</div>}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="results" className="results-section section-dark" onPointerMove={handleDepthMove} onPointerLeave={resetDepth}>
          <div className="layout-frame results-layout">
            <Reveal className="results-intro"><div className="section-scene-tag"><span>CHAPTER 04</span><b>SCOREBOARD SIGNAL</b></div><div className="eyebrow"><span className="eyebrow-line" />{t.results.eyebrow}</div><h2>{t.results.title}</h2><p>{t.results.body}</p><Link className="button button--outline" href="/tournaments">{t.results.button}<ArrowUpRight size={17} /></Link></Reveal>
            <Reveal className="scoreboard" delay={0.12}>
              <div className="scoreboard-head"><span>RECENT SIGNALS</span><span>VERIFIED / PORTAL</span></div>
              <div className="scoreboard-columns"><span>ROUND</span><span>PLAYERS</span><span>SCORE</span><span>MODE</span></div>
              {t.results.rows.map((row) => <div className="score-row" key={row.round}><span className="score-round">{row.round}</span><span className="score-players"><Users size={14} />{row.players}</span><strong>{row.score}</strong><span className="score-mode">{row.mode}</span></div>)}
              <div className="scoreboard-foot"><span><CalendarDays size={14} /> NEXT OFFICIAL UPDATE</span><span>BAZINO.PRO</span></div>
            </Reveal>
          </div>
        </section>

        <section id="lounge" className="lounge-section section-dark" onPointerMove={handleDepthMove} onPointerLeave={resetDepth}>
          <div className="layout-frame lounge-layout">
                          <Reveal className="lounge-visual"><div className="lounge-slider-media" tabIndex={0} aria-label={galleryPaused ? ui.galleryPaused : ui.galleryAuto} onMouseEnter={() => setGalleryPaused(true)} onMouseLeave={() => setGalleryPaused(false)} onFocus={() => setGalleryPaused(true)} onBlur={() => setGalleryPaused(false)}><img src={activeGallery.url} alt={activeGallery.alt} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = loungeGallery[1].url; }} />
<div className="lounge-visual-frame" /><div className="lounge-slider-shade" /><div className="lounge-slider-controls"><button type="button" aria-label={ui.previous} onClick={() => setGalleryIndex((index) => (index - 1 + loungeGallery.length) % loungeGallery.length)}><ChevronLeft size={18} /></button><span>{String(galleryIndex + 1).padStart(2, "0")} / {String(loungeGallery.length).padStart(2, "0")}</span><button type="button" aria-label={ui.next} onClick={() => setGalleryIndex((index) => (index + 1) % loungeGallery.length)}><ChevronRight size={18} /></button></div><div className="lounge-stamp"><span>BAZINO</span><b>{activeGallery.label}</b><small>{galleryPaused ? ui.galleryPaused : ui.galleryAuto}</small></div></div></Reveal>

            <Reveal className="lounge-copy" delay={0.1}><div className="section-index">05<span>/</span>07</div><div className="eyebrow"><span className="eyebrow-line" />{t.lounge.eyebrow}</div><h2>{splitLines(t.lounge.title)}</h2><p>{t.lounge.body}</p><Link className="button button--gold" href="/cafe">{t.lounge.button}<ArrowUpRight size={17} /></Link></Reveal>
            <div className="service-stack">{t.lounge.services.map((service, index) => <Reveal className="service-row" key={service.label} delay={0.12 + index * 0.06}><span className="service-label">{service.label}</span><div><h3>{service.title}</h3><p>{service.body}</p></div><span className="service-index">0{index + 1}</span></Reveal>)}</div>
          </div>
        </section>

        <section id="passes" className="passes-section section-gold" onPointerMove={handleDepthMove} onPointerLeave={resetDepth}>
          <div className="layout-frame passes-layout">
            <Reveal className="passes-heading"><div className="section-scene-tag section-scene-tag--dark"><span>CHAPTER 06</span><b>THE ENTRY SIGNAL</b></div><div className="eyebrow eyebrow--dark"><span className="eyebrow-line" />{t.passes.eyebrow}</div><h2>{splitLines(t.passes.title)}</h2><p>{t.passes.body}</p><Link className="button button--dark" href={reservationUrl}>{t.passes.button}<ArrowUpRight size={17} /></Link></Reveal>
            <div className="process-steps cinematic-steps">{t.passes.steps.map((step, index) => <Reveal className="process-step" key={step.n} delay={0.1 + index * 0.08}><span className="process-number">{step.n}</span><div><h3>{step.title}</h3><p>{step.body}</p></div><Check size={17} /></Reveal>)}</div>
          </div>
        </section>

        <section id="visit" className="visit-signal-section section-dark" onPointerMove={handleDepthMove} onPointerLeave={resetDepth}>
          <div className="layout-frame visit-signal-layout">
            <Reveal className="visit-signal-copy"><div className="section-index">07<span>/</span>07</div><div className="eyebrow"><span className="eyebrow-line" />{t.visit.eyebrow}</div><h2>{splitLines(t.visit.title)}</h2><p>{t.visit.body}</p><div className="visit-actions"><a className="button button--outline" href="https://www.google.com/maps/search/?api=1&query=Vistamare+Hotel+Iskele+Cyprus" target="_blank" rel="noreferrer"><MapPin size={17} />{t.visit.button}</a><span className="visit-directions"><MapPin size={14} />{t.visit.directions}</span></div></Reveal>
            <Reveal className="visit-signal-card" delay={0.12}><div className="visit-card-top"><span>BAZINO MOBILE SIGNAL</span><Smartphone size={20} /></div><h3>{t.visit.appTitle}</h3><p>{t.visit.appBody}</p><div className="app-downloads"><a className="app-download app-download--ios" href="https://bazino.pro" target="_blank" rel="noreferrer" aria-label="Download the Bazino iOS app"><Smartphone size={18} /><span><small>DOWNLOAD ON</small><b>iOS APP</b></span><ArrowUpRight size={16} /><span className="app-qr-popover"><QRCodeSVG value="https://bazino.pro" size={112} bgColor="#ffffff" fgColor="#08111f" includeMargin level="M" /><small>SCAN TO DOWNLOAD</small></span></a><a className="app-download app-download--android" href="https://bazino.pro" target="_blank" rel="noreferrer" aria-label="Download the Bazino Android app"><Download size={18} /><span><small>GET IT ON</small><b>ANDROID</b></span><ArrowUpRight size={16} /><span className="app-qr-popover"><QRCodeSVG value="https://bazino.pro" size={112} bgColor="#ffffff" fgColor="#08111f" includeMargin level="M" /><small>SCAN TO DOWNLOAD</small></span></a>
</div><div className="visit-card-meta"><span>VISTAMARE HOTEL</span><span>ISKELE / CYPRUS</span></div></Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="layout-frame footer-main"><a className="brand-lockup" href="#top"><span className="brand-mark-css" aria-hidden="true">B</span><span className="brand-wordmark">BAZINO</span><span className="brand-submark">GAMING LOUNGE</span></a><p className="footer-line">{t.footer.line}</p><div className="footer-location"><MapPin size={14} />{t.footer.location}</div></div><div className="layout-frame footer-bottom"><span>© {new Date().getFullYear()} BAZINO GAMING LOUNGE</span><a href="https://bazino.pro" target="_blank" rel="noreferrer">{t.footer.official} <ArrowUpRight size={14} /></a><span>{t.footer.privacy}</span></div>      </footer>
      </div>
    </>
  );

}
