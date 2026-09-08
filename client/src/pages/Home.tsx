import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Globe,
  LogOut,
  MapPin,
  Menu,
  Radio,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
  CheckCircle2,
  SlidersHorizontal,
  Clock,
  ShieldCheck,
} from "lucide-react";

import slideFc26 from "../../../hub/bracket-demo/covers/fc26.png";
import slideUfc5 from "../../../hub/bracket-demo/covers/ufc5.png";
import slideMk1 from "../../../hub/bracket-demo/covers/mk1.png";
import slideTekken8 from "../../../hub/bracket-demo/covers/tekken8.png";
import gamesAdults from "../../../hub/theme/assets/games-adults.jpg";
import gamesGear from "../../../hub/theme/assets/games-gear.jpg";
import slideMatch from "../../../hub/theme/assets/slide-match.jpg";
import foodSoon from "../../../hub/theme/assets/food-soon.jpg";
import slideCity from "../../../hub/theme/assets/slide-city.jpg";
import heroPoster from "../../../theme-package/assets/hero-poster.webp";

// SVG Flags
const FlagIR: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
    <rect width="3" height="2" fill="#fff" />
    <rect width="3" height="0.667" fill="#239f40" />
    <rect y="1.333" width="3" height="0.667" fill="#da0000" />
    <circle cx="1.5" cy="1" r="0.26" fill="none" stroke="#da0000" strokeWidth="0.09" />
  </svg>
);

const FlagGB: React.FC<{ className?: string }> = ({ className }) => {
  const clipId = useId().replace(/:/g, "-");
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <clipPath id={clipId}><path d="M0 0v30h60V0z" /></clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
};

const FlagRU: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
    <rect width="3" height="2" fill="#fff" />
    <rect y="0.667" width="3" height="0.667" fill="#0039a6" />
    <rect y="1.333" width="3" height="0.667" fill="#d52b1e" />
  </svg>
);

const FlagTR: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
    <rect width="30" height="20" fill="#e30a17" />
    <circle cx="11.25" cy="10" r="5" fill="#fff" />
    <circle cx="12.5" cy="10" r="4" fill="#e30a17" />
    <polygon fill="#fff" points="17.5,10 15.1,10.8 16.6,8.7 16.6,11.3 15.1,9.2" transform="rotate(0 16.3 10)" />
  </svg>
);

const Flag: React.FC<{ country: string; className?: string }> = ({ country, className = "w-4 h-3 rounded-[2px] shadow-sm shrink-0" }) => {
  switch (country) {
    case "IR": return <FlagIR className={className} />;
    case "GB": return <FlagGB className={className} />;
    case "RU": return <FlagRU className={className} />;
    case "TR": return <FlagTR className={className} />;
    default: return null;
  }
};

type Lang = "fa" | "en" | "tr" | "ru";
const reservationUrl = "/reservations";

// ── EDITORIAL 3D TILT CARD ─────────────────────────────────────────
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

function TiltCard({ children, className = "", maxTilt = 8 }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-container transition-transform duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(16px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

// ── DATA SOURCES ──────────────────────────────────────────────────
const tournamentCategories = [
  { key: "all", label: "ALL" },
  { key: "football", label: "FOOTBALL" },
  { key: "tactical", label: "UFC / MMA" },
  { key: "rpg", label: "MK1" },
  { key: "racing", label: "TEKKEN 8" },
] as const;

const tournamentGames = [
  { key: "football", cover: slideFc26, title: "FC 26 CHAMPIONSHIP", genre: "1V1 KNOCKOUT", prize: "$500 PRIZE POOL", time: "SAT 20:00" },
  { key: "tactical", cover: slideUfc5, title: "UFC 5 OCTAGON FIGHT", genre: "MMA / SINGLE ELIM", prize: "$350 PRIZE POOL", time: "SUN 20:30" },
  { key: "rpg", cover: slideMk1, title: "MORTAL KOMBAT 1", genre: "ACTION / DOUBLE ELIM", prize: "$300 PRIZE POOL", time: "FRI 21:00" },
  { key: "racing", cover: slideTekken8, title: "TEKKEN 8 SHOWDOWN", genre: "FIGHTING / 3D", prize: "$400 PRIZE POOL", time: "THU 20:00" },
];

const copy: Record<Lang, {
  nav: { arena: string; stations: string; tournaments: string; lounge: string; visit: string };
  hero: { kicker: string; titleLine1: string; titleLine2: string; subtitle: string; primaryCta: string; secondaryCta: string; statsBay: string; statsPlayers: string; statsScreen: string };
  stations: { index: string; title: string; subtitle: string; bays: Array<{ title: string; subtitle: string; specs: string; tag: string }> };
  tournaments: { index: string; title: string; subtitle: string; viewBracket: string; activeBadge: string };
  scoreboard: { index: string; title: string; subtitle: string; liveStatus: string; rows: Array<{ round: string; match: string; score: string; status: string }> };
  lounge: { index: string; title: string; subtitle: string; amenities: Array<{ title: string; desc: string }> };
  entry: { index: string; title: string; subtitle: string; steps: Array<{ num: string; title: string; desc: string }> };
  visit: { index: string; title: string; subtitle: string; locationName: string; mapsCta: string; digitalPassTitle: string; digitalPassDesc: string };
  footer: { copyright: string; portalLink: string; privacyLink: string };
}> = {
  fa: {
    nav: { arena: "تالار اصلی", stations: "ایستگاه‌ها", tournaments: "تورنومنت‌ها", lounge: "کافه و لانژ", visit: "مسیریابی" },
    hero: {
      kicker: "فصل ۰۱ • ایسکله، قبرس شمالی",
      titleLine1: "اگه یه قهرمانی،",
      titleLine2: "این آخرشه.",
      subtitle: "برترین تجربه گیمینگ کنسولی با ایستگاه‌های PS5 و Xbox Series X، نمایشگرهای غول‌پیکر ۸۵ اینچ 4K و خدمات اختصاصی VIP در هتل ویستا ماره.",
      primaryCta: "رزرو جایگاه",
      secondaryCta: "کشف آرنا",
      statsBay: "۱۲ جایگاه فعال",
      statsPlayers: "۳۲ قهرمان هفتگی",
      statsScreen: "نمایشگرهای ۸۵ اینچ 4K",
    },
    stations: {
      index: "فصل ۰۲ / آرنای کنسول‌ها",
      title: "بیش از یک بازی. برنامه‌ی یک شب.",
      subtitle: "ایستگاه‌های طراحی‌شده برای مسابقات تن به تن، گیم‌پلی ۴ نفره و نهایت هیجان در اتمسفر نئونی.",
      bays: [
        { title: "PS5 Haptic Arena", subtitle: "فیدبک هپتیک پیشرفته، تریگرهای دینامیک و اجرای 4K 120Hz", specs: "DualSense Pro • 85\" Display", tag: "پرفروش‌ترین" },
        { title: "Xbox Series X Bay", subtitle: "قدرت پردازش ۱۲ ترافلاپسی، اجرای سریع SSD و آرشیو Game Pass", specs: "Elite Controllers • Quick Resume", tag: "پرو گیمینگ" },
        { title: "85\" Stadium Focus", subtitle: "نمایشگر سینمایی با زاویه دید بهینه جهت نبردهای چندنفره", specs: "Dolby Atmos • 4K HDR", tag: "نمایشگر غول‌پیکر" },
        { title: "VIP Private Retreat", subtitle: "نشیمن چرمی لوکس با پذیرایی کافه اختصاصی بین راندهای مسابقه", specs: "Acoustic Lounge • In-Bay Service", tag: "سرویس ویژه" },
      ],
    },
    tournaments: {
      index: "فصل ۰۳ / سیگنال مسابقات",
      title: "صحنه تعیین می‌کند چه کسی جام را می‌برد.",
      subtitle: "مسابقات حذفی هفتگی با جوایز نقدی، ثبت رسمی در لیدربورد فصل و پخش زنده روی نمایشگر اصلی.",
      viewBracket: "مشاهده براکت مسابقه",
      activeBadge: "مسابقه زنده شنبه‌ها ۲۰:۰۰",
    },
    scoreboard: {
      index: "فصل ۰۴ / تابلوی زنده نتایج",
      title: "هر امتیاز، سیگنال شب بعدی است.",
      subtitle: "نتایج تأییدشده مسابقات، آمار لحظه‌ای بازیکنان و جدول رده‌بندی فصلی بازینو.",
      liveStatus: "داده‌های رسمی تأییدشده",
      rows: [
        { round: "راند ۰۷", match: "ArmanK در برابر Mahan10", score: "۵ — ۳", status: "فینال FC 26" },
        { round: "راند ۰۶", match: "Kasra در برابر RezaB", score: "۳ — ۱", status: "نیمه‌نهایی UFC 5" },
        { round: "راند ۰۵", match: "NimaPro در برابر AliGameR", score: "۴ — ۲", status: "فینال TEKKEN 8" },
      ],
    },
    lounge: {
      index: "فصل ۰۵ / لانژ شبانه و کافه",
      title: "ریتم VIP. مکث کافه.",
      subtitle: "طراحی‌شده برای لحظات بین راندها. استراحت در مبلمان راحتی، نوشیدنی‌های خنک و تجدید قوا برای پیروزی بعدی.",
      amenities: [
        { title: "جایگاه‌های اختصاصی VIP", desc: "محیط آرام و بدون نویز با کنترل کامل نور و صدا." },
        { title: "پذیرایی اختصاصی درون جایگاه", desc: "سفارش سریع انواع نوشیدنی و میان‌وعده بدون ترک بازی." },
        { title: "پخش زنده مسابقات ورزشی", desc: "پخش رویدادهای بزرگ فوتبال و ورزش‌های الکترونیک." },
      ],
    },
    entry: {
      index: "فصل ۰۶ / مراحل ورود",
      title: "سه قدم. یک شب خاطره‌انگیز.",
      subtitle: "کنسول مورد علاقه را انتخاب کنید، جایگاهتان را رزرو کنید و با حضور در کلاب بازی را آغاز کنید.",
      steps: [
        { num: "۰۱", title: "انتخاب ایستگاه و کنسول", desc: "انتخاب از میان PS5، Xbox Series X یا جایگاه‌های ۸۵ اینچ VIP." },
        { num: "۰۲", title: "رزرو آسان با کد رهگیری", desc: "ثبت سریع نوبت آنلاین — پرداخت حضوری در دسک ورودی کلاب." },
        { num: "۰۳", title: "شروع مسابقه و فتح لیدربورد", desc: "حضور همراه دوستان، دریافت دسته‌های پرو و شروع رقابت." },
      ],
    },
    visit: {
      index: "فصل ۰۷ / مسیریابی و دسترسی",
      title: "شب بازی در ایسکله.",
      subtitle: "هتل ویستا ماره، لانگ بیچ، ایسکله، قبرس شمالی.",
      locationName: "هتل ویستا ماره • ایسکله",
      mapsCta: "مسیریابی با گوگل مپس",
      digitalPassTitle: "کارت عضویت دیجیتال بازینو",
      digitalPassDesc: "برای دریافت کارت دیجیتال، مشاهده براکت‌ها و رزرو سریع اسکن کنید.",
    },
    footer: {
      copyright: "بازینو • آرنای اسطوره‌های گیمینگ",
      portalLink: "پورتال رسمی بازینو",
      privacyLink: "حریم خصوصی",
    },
  },
  en: {
    nav: { arena: "Arena", stations: "Stations", tournaments: "Tournaments", lounge: "Lounge", visit: "Find Us" },
    hero: {
      kicker: "CHAPTER 01 • ISKELE, CYPRUS",
      titleLine1: "IF YOU ARE A CHAMP,",
      titleLine2: "THIS IS IT.",
      subtitle: "High-octane console gaming with PS5 & Xbox Series X stations, giant 85\" 4K screens and VIP hospitality at Hotel VistaMare.",
      primaryCta: "RESERVE A BAY",
      secondaryCta: "EXPLORE ARENA",
      statsBay: "12 ACTIVE BAYS",
      statsPlayers: "32 WEEKLY CHAMPS",
      statsScreen: "85\" 4K HDR SCREENS",
    },
    stations: {
      index: "CHAPTER 02 / CONSOLE ARENA",
      title: "MORE THAN A GAME. A NIGHT PLAN.",
      subtitle: "Stations engineered for 1v1 duels, 4-player co-op, and peak esports energy under neon lights.",
      bays: [
        { title: "PS5 Haptic Arena", subtitle: "Advanced haptic feedback, dynamic triggers and 4K 120Hz refresh rate", specs: "DualSense Pro • 85\" Display", tag: "POPULAR" },
        { title: "Xbox Series X Bay", subtitle: "12 teraflops raw power, lightning SSD load times and Game Pass Ultimate", specs: "Elite Controllers • Quick Resume", tag: "PRO GEAR" },
        { title: "85\" Stadium Focus", subtitle: "Cinematic stadium-grade viewing distance designed for multiplayer impact", specs: "Dolby Atmos • 4K HDR", tag: "CINEMATIC" },
        { title: "VIP Private Retreat", subtitle: "Handcrafted leather recliners with in-bay beverage and snack service", specs: "Acoustic Lounge • In-Bay Service", tag: "VIP SUITE" },
      ],
    },
    tournaments: {
      index: "CHAPTER 03 / TOURNAMENT SIGNAL",
      title: "THE ARENA DECIDES WHO TAKES THE TROPHY.",
      subtitle: "Weekly knockout brackets with cash prizes, verified season leaderboard points and main-stage broadcasts.",
      viewBracket: "VIEW MATCH BRACKET",
      activeBadge: "LIVE SATURDAY 20:00",
    },
    scoreboard: {
      index: "CHAPTER 04 / SCOREBOARD SIGNAL",
      title: "EVERY SCORE SENDS A SIGNAL TO THE NEXT NIGHT.",
      subtitle: "Verified scoreboard results, official match telemetry and live player leaderboard standing.",
      liveStatus: "OFFICIAL TELEMETRY",
      rows: [
        { round: "ROUND 07", match: "ArmanK vs Mahan10", score: "5 — 3", status: "FC 26 GRAND FINAL" },
        { round: "ROUND 06", match: "Kasra vs RezaB", score: "3 — 1", status: "UFC 5 SEMI-FINAL" },
        { round: "ROUND 05", match: "NimaPro vs AliGameR", score: "4 — 2", status: "TEKKEN 8 FINAL" },
      ],
    },
    lounge: {
      index: "CHAPTER 05 / NIGHT LOUNGE & CAFE",
      title: "VIP RHYTHM. CAFE PAUSE.",
      subtitle: "Designed for the moments between rounds. Relax in leather VIP bays, order refreshments and reset for the next victory.",
      amenities: [
        { title: "Private VIP Bays", desc: "Acoustically treated quiet bays with individual lighting controls." },
        { title: "In-Bay Cafe Service", desc: "Order gourmet snacks and cold energy drinks directly to your console." },
        { title: "Live Esports Wall", desc: "Live broadcasts of premier sports and international tournaments." },
      ],
    },
    entry: {
      index: "CHAPTER 06 / ENTRY PROTOCOL",
      title: "THREE STEPS. ONE GLORIOUS NIGHT.",
      subtitle: "Choose your console, secure your spot online, and arrive at the desk to start your session.",
      steps: [
        { num: "01", title: "SELECT YOUR STATION", desc: "Pick between PS5, Xbox Series X or 85\" VIP Focus bays." },
        { num: "02", title: "HOLD YOUR SPOT", desc: "Instant booking code — pay in-person via cash/card at the desk." },
        { num: "03", title: "COMMENCE THE MATCH", desc: "Arrive with your crew, grab your controllers and climb the ranks." },
      ],
    },
    visit: {
      index: "CHAPTER 07 / LOCATION & ACCESS",
      title: "GAME NIGHT IN ISKELE.",
      subtitle: "Hotel VistaMare, Long Beach, Iskele, Northern Cyprus.",
      locationName: "Hotel VistaMare • Iskele",
      mapsCta: "OPEN IN GOOGLE MAPS",
      digitalPassTitle: "BAZINO DIGITAL MEMBERSHIP",
      digitalPassDesc: "Scan to add your digital card, view tournament brackets, and fast-track reservations.",
    },
    footer: {
      copyright: "BAZINO • ARENA OF LEGENDS",
      portalLink: "Official Portal",
      privacyLink: "Privacy Policy",
    },
  },
  tr: {
    nav: { arena: "Arena", stations: "İstasyonlar", tournaments: "Turnuvalar", lounge: "Lounge", visit: "Konum" },
    hero: {
      kicker: "BÖLÜM 01 • İSKELE, KIBRIS",
      titleLine1: "ŞAMPİYONSAN,",
      titleLine2: "İŞTE BURASI.",
      subtitle: "PS5 ve Xbox Series X deneyimi, 85 inç 4K dev ekranlar ve Hotel VistaMare'de VIP gaming lounge atmosferi.",
      primaryCta: "YERİNİ AYIR",
      secondaryCta: "ARENAYI KEŞFET",
      statsBay: "12 AKTİF İSTASYON",
      statsPlayers: "32 HAFTALIK OYUNCU",
      statsScreen: "85\" 4K HDR EKRANLAR",
    },
    stations: {
      index: "BÖLÜM 02 / KONSOL ARENASI",
      title: "SADECE OYUN DEĞİL. BİR GECE PLANI.",
      subtitle: "1v1 karşılaşmalar, 4 kişilik co-op ve neon ışıklar altında en yüksek espor enerjisi.",
      bays: [
        { title: "PS5 Haptic Arena", subtitle: "Yeni nesil haptik bildirim, dinamik tetikler ve 4K 120Hz yenileme", specs: "DualSense Pro • 85\" Display", tag: "POPÜLER" },
        { title: "Xbox Series X Bay", subtitle: "12 teraflop saf güç, hızlı SSD yükleme ve Game Pass Ultimate", specs: "Elite Controllers • Quick Resume", tag: "PRO DONANIM" },
        { title: "85\" Stadium Focus", subtitle: "Çok oyunculu maçlar için sinematik stadyum görüş mesafesi", specs: "Dolby Atmos • 4K HDR", tag: "SİNEMATİK" },
        { title: "VIP Private Retreat", subtitle: "İstasyona özel ikram servisi ile deri VIP koltuklar", specs: "Acoustic Lounge • In-Bay Service", tag: "VIP SUITE" },
      ],
    },
    tournaments: {
      index: "BÖLÜM 03 / TURNUVA SİNYALİ",
      title: "KUPAYI KİMİN ALACAĞINI SAHNE BELİRLER.",
      subtitle: "Nakit ödüllü haftalık eleme turnuvaları, sezon puanları ve ana ekranda canlı yayın.",
      viewBracket: "BRAKETİ GÖR",
      activeBadge: "CANLI CMT 20:00",
    },
    scoreboard: {
      index: "BÖLÜM 04 / SKOR TABELASI",
      title: "HER SKOR, BİR SONRAKİ GECEYE SİNYAL GÖNDERİR.",
      subtitle: "Onaylanmış skor tabelası, resmi maç verileri ve canlı liderlik sıralaması.",
      liveStatus: "RESMİ VERİLER",
      rows: [
        { round: "RAUND 07", match: "ArmanK vs Mahan10", score: "5 — 3", status: "FC 26 BÜYÜK FİNAL" },
        { round: "RAUND 06", match: "Kasra vs RezaB", score: "3 — 1", status: "UFC 5 YARI FİNAL" },
        { round: "RAUND 05", match: "NimaPro vs AliGameR", score: "4 — 2", status: "TEKKEN 8 FİNAL" },
      ],
    },
    lounge: {
      index: "BÖLÜM 05 / NIGHT LOUNGE & KAFE",
      title: "VIP RİTMİ. KAFE MOLASI.",
      subtitle: "Raund araları için özel olarak tasarlandı. VIP koltuklarda dinlenin, içeceğinizi yudumlayın.",
      amenities: [
        { title: "Özel VIP İstasyonları", desc: "Akustik izolasyonlu sakin ortam ve ayarlanabilir ışıklandırma." },
        { title: "İstasyona Servis", desc: "Oyunu bölmeden içecek ve atıştırmalık siparişi." },
        { title: "Canlı Espor Duvarı", desc: "Büyük spor ve espor etkinliklerinin canlı yayını." },
      ],
    },
    entry: {
      index: "BÖLÜM 06 / GİRİŞ ADIMLARI",
      title: "ÜÇ ADIM. UNUTULMAZ BİR GECE.",
      subtitle: "Konsolunu seç, yerini ayırt ve kulübe gelerek oyuna başla.",
      steps: [
        { num: "01", title: "İSTASYONUNU SEÇ", desc: "PS5, Xbox Series X veya 85\" VIP Salonu seç." },
        { num: "02", title: "YERİNİ AYIRT", desc: "Anında takip kodu — ödeme girişte kasada." },
        { num: "03", title: "OYUNA BAŞLA", desc: "Arkadaşlarınla gel, kolları al ve liderlik tablosunu fethet." },
      ],
    },
    visit: {
      index: "BÖLÜM 07 / KONUM VE ULAŞIM",
      title: "İSKELE'DE OYUN GECESİ.",
      subtitle: "Hotel VistaMare, Long Beach, İskele, Kuzey Kıbrıs.",
      locationName: "Hotel VistaMare • İskele",
      mapsCta: "GOOGLE MAPS İLE AÇ",
      digitalPassTitle: "BAZINO DİJİTAL ÜYELİK",
      digitalPassDesc: "Üye kartı, turnuva braketleri ve hızlı rezervasyon için tara.",
    },
    footer: {
      copyright: "BAZINO • ARENA OF LEGENDS",
      portalLink: "Resmi Portal",
      privacyLink: "Gizlilik Politikası",
    },
  },
  ru: {
    nav: { arena: "Арена", stations: "Станции", tournaments: "Турниры", lounge: "Лаунж", visit: "Как найти" },
    hero: {
      kicker: "ГЛАВА 01 • ИСКЕЛЕ, КИПР",
      titleLine1: "ЕСЛИ ТЫ ЧЕМПИОН,",
      titleLine2: "ТЕБЕ СЮДА.",
      subtitle: "Консольные станции PS5 и Xbox Series X, 85-дюймовые 4K экраны и VIP атмосфера в отеле VistaMare.",
      primaryCta: "ЗАБРОНИРОВАТЬ",
      secondaryCta: "ОТКРЫТЬ АРЕНУ",
      statsBay: "12 АКТИВНЫХ ЗОН",
      statsPlayers: "32 ИГРОКА В НЕДЕЛЮ",
      statsScreen: "85\" 4K HDR ЭКРАНЫ",
    },
    stations: {
      index: "ГЛАВА 02 / КОНСОЛЬНАЯ АРЕНА",
      title: "БОЛЬШЕ, ЧЕМ ИГРА. ПЛАН НА ВЕЧЕР.",
      subtitle: "Станции для дуэлей 1v1, совместных игр на 4 человек и максимального драйва.",
      bays: [
        { title: "PS5 Haptic Arena", subtitle: "Тактильная отдача, адаптивные триггеры и 4K 120Hz", specs: "DualSense Pro • 85\" Display", tag: "ПОПУЛЯРНОЕ" },
        { title: "Xbox Series X Bay", subtitle: "12 терафлопс мощности, быстрая загрузка SSD и Game Pass", specs: "Elite Controllers • Quick Resume", tag: "ПРО ЭКИП" },
        { title: "85\" Stadium Focus", subtitle: "Кинематографичный обзор для масштабных матчей", specs: "Dolby Atmos • 4K HDR", tag: "ФОКУС" },
        { title: "VIP Private Retreat", subtitle: "Кожаные кресла с обслуживанием из кафе прямо к месту", specs: "Acoustic Lounge • In-Bay Service", tag: "VIP ЗАЛ" },
      ],
    },
    tournaments: {
      index: "ГЛАВА 03 / СИГНАЛ ТУРНИРОВ",
      title: "АРЕНА РЕШАЕТ, КТО ЗАБЕРЕТ КУБОК.",
      subtitle: "Еженедельные турниры на выбывание с денежными призами и прямыми трансляциями.",
      viewBracket: "СЕТКА ТУРНИРА",
      activeBadge: "ПРЯМОЙ ЭФИР СБ 20:00",
    },
    scoreboard: {
      index: "ГЛАВА 04 / ТАБЛО РЕЗУЛЬТАТОВ",
      title: "КАЖДЫЙ СЧЕТ — СИГНАЛ В СЛЕДУЮЩУЮ НОЧЬ.",
      subtitle: "Официальные результаты матчей, статистика и таблица лидеров сезона.",
      liveStatus: "ОФИЦИАЛЬНЫЕ ДАННЫЕ",
      rows: [
        { round: "РАУНД 07", match: "ArmanK против Mahan10", score: "5 — 3", status: "ГРАНД-ФИНАЛ FC 26" },
        { round: "РАУНД 06", match: "Kasra против RezaB", score: "3 — 1", status: "ПОЛУФИНАЛ UFC 5" },
        { round: "РАУНД 05", match: "NimaPro против AliGameR", score: "4 — 2", status: "ФИНАЛ TEKKEN 8" },
      ],
    },
    lounge: {
      index: "ГЛАВА 05 / НОЧНОЙ ЛАУНЖ И КАФЕ",
      title: "РИТМ VIP. ПАУЗА В КАФЕ.",
      subtitle: "Создано для времени между раундами. Отдыхайте в кожаных креслах и заказывайте напитки.",
      amenities: [
        { title: "Приватные VIP Зоны", desc: "Акустический комфорт и регулируемое освещение." },
        { title: "Сервис к станции", desc: "Заказ закусок и напитков прямо к игровому месту." },
        { title: "Киберспортивный экран", desc: "Трансляции главных матчей на центральной стене." },
      ],
    },
    entry: {
      index: "ГЛАВА 06 / ПРАВИЛА ВХОДА",
      title: "ТРИ ШАГА. ОДНА ЛЕГЕНДАРНАЯ НОЧЬ.",
      subtitle: "Выберите консоль, забронируйте место и приходите в клуб.",
      steps: [
        { num: "01", title: "ВЫБЕРИТЕ СТАНЦИЮ", desc: "PS5, Xbox Series X или 85\" VIP Зал." },
        { num: "02", title: "ЗАБРОНИРУЙТЕ", desc: "Мгновенный код брони — оплата на ресепшн." },
        { num: "03", title: "НАЧНИТЕ ИГРУ", desc: "Приходите с друзьями, берите геймпады и побеждайте." },
      ],
    },
    visit: {
      index: "ГЛАВА 07 / ЛОКАЦИЯ И ДОСТУП",
      title: "ИГРОВАЯ НОЧЬ В ИСКЕЛЕ.",
      subtitle: "Отель VistaMare, Лонг-Бич, Искеле, Северный Кипр.",
      locationName: "Отель VistaMare • Искеле",
      mapsCta: "ОТКРЫТЬ НА GOOGLE MAPS",
      digitalPassTitle: "ЦИФРОВАЯ КАРТА BAZINO",
      digitalPassDesc: "Сканируйте для доступа к профилю, сетке турниров и быстрой брони.",
    },
    footer: {
      copyright: "BAZINO • АРЕНА ЛЕГЕНД",
      portalLink: "Официальный портал",
      privacyLink: "Конфиденциальность",
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fa");
  const [tournamentFilter, setTournamentFilter] = useState<(typeof tournamentCategories)[number]["key"]>("all");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const [user, setUser] = useState<{ username: string } | null>(() => {
    try {
      const raw = localStorage.getItem("bazino_mock_user");
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  });
  const [authOpen, setAuthOpen] = useState(false);
  const [authUsername, setAuthUsername] = useState("");

  const t = copy[lang] ?? copy.fa;

  const LANGUAGE_OPTIONS: Array<{ id: Lang; code: string; country: string; full: string }> = [
    { id: "fa", code: "FA", country: "IR", full: "فارسی" },
    { id: "en", code: "EN", country: "GB", full: "English" },
    { id: "tr", code: "TR", country: "TR", full: "Türkçe" },
    { id: "ru", code: "RU", country: "RU", full: "Русский" },
  ];
  const currentLang = LANGUAGE_OPTIONS.find((o) => o.id === lang) ?? LANGUAGE_OPTIONS[0];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.body.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
  }, [lang]);

  const handleLogout = () => {
    try { localStorage.removeItem("bazino_mock_user"); } catch {}
    setUser(null);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUsername.trim()) return;
    const next = { username: authUsername.trim() };
    setUser(next);
    try { localStorage.setItem("bazino_mock_user", JSON.stringify(next)); } catch {}
    setAuthOpen(false);
    setAuthUsername("");
  };

  const filteredGames = tournamentGames.filter(
    (g) => tournamentFilter === "all" || g.key === tournamentFilter,
  );

  return (
    <div className="min-h-screen bg-[#07080c] text-[#f6f8fc] relative overflow-hidden font-sans selection:bg-[#ffc400] selection:text-[#07080c]">
      {/* ── FLOATING EDITORIAL PILL NAV ──────────────────────────── */}
      <header className="floating-nav">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="w-7 h-7 rounded-full bg-[#ffc400] text-[#07080c] font-black text-xs flex items-center justify-center font-orbitron">
            B
          </span>
          <span className="font-orbitron font-black text-sm tracking-wider text-white hidden sm:inline">
            BAZINO
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          <a href="#arena">{t.nav.arena}</a>
          <a href="#stations">{t.nav.stations}</a>
          <a href="#tournaments">{t.nav.tournaments}</a>
          <a href="#lounge">{t.nav.lounge}</a>
          <a href="#visit">{t.nav.visit}</a>
          <Link href="/hub" className="text-[#ffc400] font-black hover:text-[#ffd54f] transition-colors">
            HUB DEMO →
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/05 hover:bg-white/10 text-xs font-orbitron text-gray-300 transition-colors"
            >
              <Flag country={currentLang.country} />
              <span>{currentLang.code}</span>
              <ChevronDown size={12} className={langMenuOpen ? "rotate-180" : ""} />
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-full mt-2 right-0 bg-[#0e121a] border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 min-w-[120px]"
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setLang(opt.id);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        lang === opt.id ? "bg-[#ffc400]/15 text-[#ffc400]" : "text-gray-300 hover:bg-white/05"
                      }`}
                    >
                      <Flag country={opt.country} />
                      <span>{opt.full}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2 bg-white/05 rounded-full px-3 py-1 text-xs font-orbitron text-[#ffc400]">
              <span>@{user.username}</span>
              <button type="button" onClick={handleLogout} className="text-gray-400 hover:text-red-400">
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="text-xs font-orbitron font-bold text-gray-300 hover:text-white px-2 py-1"
            >
              {lang === "fa" ? "ورود" : "LOGIN"}
            </button>
          )}

          <a href={reservationUrl} className="btn-editorial-gold hidden sm:inline-flex">
            <span>{t.hero.primaryCta}</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            type="button"
            className="lg:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[76px] bg-[#0c0e14] border-b border-white/10 p-6 z-40 lg:hidden flex flex-col gap-4 font-orbitron text-sm"
          >
            <a href="#arena" onClick={() => setMobileMenuOpen(false)}>{t.nav.arena}</a>
            <a href="#stations" onClick={() => setMobileMenuOpen(false)}>{t.nav.stations}</a>
            <a href="#tournaments" onClick={() => setMobileMenuOpen(false)}>{t.nav.tournaments}</a>
            <a href="#lounge" onClick={() => setMobileMenuOpen(false)}>{t.nav.lounge}</a>
            <a href="#visit" onClick={() => setMobileMenuOpen(false)}>{t.nav.visit}</a>
            <Link href="/hub" className="text-[#ffc400] font-black">HUB DEMO →</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50" onClick={() => setAuthOpen(false)}>
          <div className="bg-[#0e1118] border border-white/15 rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-orbitron text-xl font-black text-white mb-2">
              {lang === "fa" ? "ورود به بازینو" : "LOGIN TO BAZINO"}
            </h3>
            <p className="text-gray-400 text-xs mb-6">
              {lang === "fa" ? "نام کاربری خود را برای دسترسی به کارت عضویت و رزرو وارد کنید:" : "Enter your username to access club passes and booking:"}
            </p>
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
              <input
                autoFocus
                value={authUsername}
                onChange={(e) => setAuthUsername(e.target.value)}
                placeholder="ArmanK"
                className="w-full px-4 py-3 bg-white/05 border border-white/15 rounded-xl text-white outline-none focus:border-[#ffc400]"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setAuthOpen(false)} className="btn-editorial-ghost flex-1 justify-center">
                  {lang === "fa" ? "انصراف" : "CANCEL"}
                </button>
                <button type="submit" className="btn-editorial-gold flex-1 justify-center">
                  {lang === "fa" ? "ورود" : "CONTINUE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="pt-28">
        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 01: HERO — THE ARENA OF LEGENDS
        ════════════════════════════════════════════════════════════ */}
        <section id="top" className="editorial-container pt-8 pb-20">
          <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-[#0b0e14] p-8 sm:p-14 lg:p-18 min-h-[80vh] flex flex-col justify-between">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                className="w-full h-full object-cover opacity-25 filter saturate-150"
                poster={heroPoster}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/Bazino — Arena of Legends.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e14] via-transparent to-[#0b0e14]" />
            </div>

            {/* Top Micro-HUD */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 border-b border-white/10 pb-6">
              <div className="editorial-index">
                <span>{t.hero.kicker}</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-orbitron font-bold text-gray-400">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
                <span className="text-white">OPEN NOW</span>
                <span className="text-gray-600">•</span>
                <span>35°20&apos; N / 33°59&apos; E</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="relative z-10 my-16 max-w-4xl">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-orbitron uppercase text-white tracking-tight leading-[1.05] mb-6">
                {t.hero.titleLine1}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc400] via-[#ffd700] to-[#35a9ff]">
                  {t.hero.titleLine2}
                </span>
              </h1>

              <p className="text-gray-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl mb-10">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a href={reservationUrl} className="btn-editorial-gold">
                  <span>{t.hero.primaryCta}</span>
                  <ArrowUpRight size={16} />
                </a>

                <a href="#stations" className="btn-editorial-ghost">
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>
            </div>

            {/* Bottom 3 Stats Pillars */}
            <div className="relative z-10 grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="mono-tag text-[#ffc400] mb-1">STATION FLEET</div>
                <div className="text-xl font-black font-orbitron text-white">{t.hero.statsBay}</div>
              </div>
              <div>
                <div className="mono-tag text-[#35a9ff] mb-1">TOURNAMENT BRACKET</div>
                <div className="text-xl font-black font-orbitron text-white">{t.hero.statsPlayers}</div>
              </div>
              <div>
                <div className="mono-tag text-gray-400 mb-1">STADIUM VISUALS</div>
                <div className="text-xl font-black font-orbitron text-white">{t.hero.statsScreen}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 02: CONSOLE ARENA (EDITORIAL BENTO SHOWCASE)
        ════════════════════════════════════════════════════════════ */}
        <section id="stations" className="editorial-container py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="editorial-index mb-3">
                <span>{t.stations.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight">
                {t.stations.title}
              </h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-md">
              {t.stations.subtitle}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Feature Card: PS5 Arena */}
            <div className="lg:col-span-7">
              <TiltCard className="editorial-card editorial-card--gold p-8 h-full min-h-[460px] flex flex-col justify-between group">
                <div className="absolute inset-0 z-0">
                  <img
                    src={gamesAdults}
                    alt="PS5 Arena"
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-[#0e1118]/60 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <span className="mono-tag text-[#ffc400] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-[#ffc400]/30">
                    {t.stations.bays[0].tag}
                  </span>
                  <span className="mono-tag text-gray-400">{t.stations.bays[0].specs}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black font-orbitron text-white mb-2">
                    {t.stations.bays[0].title}
                  </h3>
                  <p className="text-gray-300 text-sm max-w-lg mb-6">
                    {t.stations.bays[0].subtitle}
                  </p>
                  <a href={reservationUrl} className="btn-editorial-gold">
                    <span>{lang === "fa" ? "رزرو نوبت PS5" : "RESERVE PS5 BAY"}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </TiltCard>
            </div>

            {/* Side Card: Xbox Series X */}
            <div className="lg:col-span-5">
              <TiltCard className="editorial-card p-8 h-full min-h-[460px] flex flex-col justify-between group">
                <div className="absolute inset-0 z-0">
                  <img
                    src={slideFc26}
                    alt="Xbox Series X"
                    className="w-full h-full object-cover opacity-45 group-hover:scale-105 group-hover:opacity-65 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-[#0e1118]/60 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <span className="mono-tag text-[#35a9ff] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-[#35a9ff]/30">
                    {t.stations.bays[1].tag}
                  </span>
                  <span className="mono-tag text-gray-400">{t.stations.bays[1].specs}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-black font-orbitron text-white mb-2">
                    {t.stations.bays[1].title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6">
                    {t.stations.bays[1].subtitle}
                  </p>
                  <a href={reservationUrl} className="btn-editorial-ghost">
                    <span>{lang === "fa" ? "رزرو ایکس‌باکس" : "RESERVE XBOX"}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </TiltCard>
            </div>

            {/* Bottom Card 1: 85" Stadium Focus */}
            <div className="lg:col-span-6">
              <TiltCard className="editorial-card p-8 min-h-[320px] flex flex-col justify-between group">
                <div className="absolute inset-0 z-0">
                  <img
                    src={slideMatch}
                    alt="85 Inch Focus"
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-[#0e1118]/60 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <span className="mono-tag text-[#ffc400] bg-black/50 px-3 py-1 rounded-full border border-white/10">
                    {t.stations.bays[2].tag}
                  </span>
                  <span className="mono-tag text-gray-400">{t.stations.bays[2].specs}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-black font-orbitron text-white mb-1">
                    {t.stations.bays[2].title}
                  </h3>
                  <p className="text-gray-300 text-xs">
                    {t.stations.bays[2].subtitle}
                  </p>
                </div>
              </TiltCard>
            </div>

            {/* Bottom Card 2: VIP Private Retreat */}
            <div className="lg:col-span-6">
              <TiltCard className="editorial-card p-8 min-h-[320px] flex flex-col justify-between group">
                <div className="absolute inset-0 z-0">
                  <img
                    src={gamesGear}
                    alt="VIP Retreat"
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-[#0e1118]/60 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <span className="mono-tag text-[#35a9ff] bg-black/50 px-3 py-1 rounded-full border border-white/10">
                    {t.stations.bays[3].tag}
                  </span>
                  <span className="mono-tag text-gray-400">{t.stations.bays[3].specs}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-black font-orbitron text-white mb-1">
                    {t.stations.bays[3].title}
                  </h3>
                  <p className="text-gray-300 text-xs">
                    {t.stations.bays[3].subtitle}
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 03: ACTIVE TOURNAMENTS (CHAMPIONSHIP FEED)
        ════════════════════════════════════════════════════════════ */}
        <section id="tournaments" className="editorial-container py-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="editorial-index mb-3">
                <span>{t.tournaments.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight">
                {t.tournaments.title}
              </h2>
            </div>

            {/* Live Signal Badge */}
            <div className="flex items-center gap-3 bg-[#121622] border border-[#ffc400]/40 rounded-full px-5 py-2 text-xs font-orbitron">
              <Trophy size={16} className="text-[#ffc400]" />
              <span className="text-white font-bold">{t.tournaments.activeBadge}</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tournamentCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setTournamentFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-orbitron font-bold transition-all ${
                  tournamentFilter === cat.key
                    ? "bg-[#ffc400] text-[#07080c] shadow-lg shadow-[#ffc400]/20"
                    : "bg-white/05 text-gray-400 hover:text-white border border-white/08"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tournament Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <TiltCard key={game.title} className="editorial-card p-6 min-h-[380px] flex flex-col justify-between group">
                <div className="absolute inset-0 z-0">
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-[#0e1118]/50 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <span className="mono-tag text-[#35a9ff]">{game.genre}</span>
                  <span className="mono-tag text-[#ffc400] font-black">{game.prize}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-black font-orbitron text-white mb-4">
                    {game.title}
                  </h3>
                  <Link href="/hub/events/brackets" className="btn-editorial-ghost w-full justify-between">
                    <span>{t.tournaments.viewBracket}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 04: SCOREBOARD SIGNAL & TELEMETRY
        ════════════════════════════════════════════════════════════ */}
        <section id="arena" className="editorial-container py-20 border-t border-white/10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="editorial-index mb-3">
                <span>{t.scoreboard.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight mb-6">
                {t.scoreboard.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                {t.scoreboard.subtitle}
              </p>
              <Link href="/hub/events/season" className="btn-editorial-ghost">
                <span>{lang === "fa" ? "مشاهده جدول امتیازات فصل" : "VIEW SEASON LEADERBOARD"}</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Sleek Minimalist Scoreboard Ledger */}
            <div className="lg:col-span-7">
              <div className="editorial-card p-6 sm:p-8">
                <div className="flex justify-between items-center text-xs font-orbitron text-gray-400 border-b border-white/10 pb-4 mb-4">
                  <span className="flex items-center gap-2 text-[#ffc400]">
                    <Zap size={14} className="text-[#00e5ff]" />
                    RECENT ROUND TELEMETRY
                  </span>
                  <span>{t.scoreboard.liveStatus}</span>
                </div>

                <div className="divide-y divide-white/06">
                  {t.scoreboard.rows.map((row) => (
                    <div key={row.round} className="py-4 flex items-center justify-between font-orbitron">
                      <div className="flex items-center gap-3">
                        <span className="mono-tag text-[#35a9ff]">{row.round}</span>
                        <div>
                          <div className="text-sm font-bold text-white">{row.match}</div>
                          <div className="text-[10px] text-gray-500">{row.status}</div>
                        </div>
                      </div>

                      <div className="text-lg font-black text-[#ffc400] bg-black/40 border border-white/10 px-3.5 py-1 rounded-lg">
                        {row.score}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center text-[11px] font-orbitron text-gray-400">
                  <span>BROADCAST: SATURDAY 20:00</span>
                  <span className="text-[#ffc400]">HOTEL VISTAMARE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 05: THE NIGHT LOUNGE & CAFE
        ════════════════════════════════════════════════════════════ */}
        <section id="lounge" className="editorial-container py-20 border-t border-white/10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Lounge Photo Box */}
            <div className="lg:col-span-6">
              <TiltCard className="editorial-card overflow-hidden aspect-[4/3] group">
                <img
                  src={slideCity}
                  alt="Night Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <div className="mono-tag text-[#ffc400] mb-1">ISKELE NIGHT VIBE</div>
                    <div className="text-lg font-bold text-white">Hotel VistaMare Lounge</div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Lounge Copy & Services */}
            <div className="lg:col-span-6">
              <div className="editorial-index mb-3">
                <span>{t.lounge.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight mb-6">
                {t.lounge.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                {t.lounge.subtitle}
              </p>

              <div className="space-y-4">
                {t.lounge.amenities.map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-white/03 border border-white/06 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ffc400]/10 text-[#ffc400] flex items-center justify-center shrink-0">
                      <Coffee size={18} />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-sm text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 06: HOW TO ENTER (3-STEP TIMELINE)
        ════════════════════════════════════════════════════════════ */}
        <section className="editorial-container py-20 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="editorial-index justify-center mb-3">
              <span>{t.entry.index}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight mb-4">
              {t.entry.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {t.entry.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.entry.steps.map((step, idx) => (
              <TiltCard key={step.num} className="editorial-card p-8 min-h-[260px] flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-4xl font-black font-orbitron text-[#ffc400]">{step.num}</span>
                  <CheckCircle2 size={20} className="text-[#00e5ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-orbitron text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href={reservationUrl} className="btn-editorial-gold">
              <span>{lang === "fa" ? "رزرو آنلاین جایگاه" : "RESERVE YOUR SPOT"}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 07: LOCATION & DIGITAL MEMBERSHIP PASS
        ════════════════════════════════════════════════════════════ */}
        <section id="visit" className="editorial-container py-20 border-t border-white/10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Location Box */}
            <div className="lg:col-span-6">
              <div className="editorial-index mb-3">
                <span>{t.visit.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight mb-6">
                {t.visit.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                {t.visit.subtitle}
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Hotel%20VistaMare%2C%20%C4%B0skele%2C%20Long%20Beach%2C%20Cyprus"
                target="_blank"
                rel="noreferrer"
                className="btn-editorial-ghost"
              >
                <MapPin size={16} className="text-[#ffc400]" />
                <span>{t.visit.mapsCta}</span>
              </a>
            </div>

            {/* Apple Wallet Style Digital Pass Card */}
            <div className="lg:col-span-6">
              <TiltCard className="wallet-pass p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="bg-white p-3 rounded-2xl shadow-xl shrink-0">
                    <QRCodeSVG value="https://bazino.pro" size={110} level="M" />
                  </div>
                  <div>
                    <div className="mono-tag text-[#35a9ff] mb-1">DIGITAL MEMBER ID</div>
                    <h3 className="text-xl font-black font-orbitron text-white mb-2">
                      {t.visit.digitalPassTitle}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {t.visit.digitalPassDesc}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-orbitron text-[#ffc400]">
                      <ShieldCheck size={14} />
                      <span>OFFICIAL BAZINO ARENA PASS</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>
      </main>

      {/* ── MINIMALIST FOOTER ────────────────────────────────────── */}
      <footer className="editorial-container border-t border-white/10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-orbitron">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#ffc400] text-[#07080c] font-black text-xs flex items-center justify-center">
              B
            </span>
            <span className="text-white font-bold">{t.footer.copyright}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://bazino.pro" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              {t.footer.portalLink}
            </a>
            <Link href="/hub/privacy" className="hover:text-white transition-colors">
              {t.footer.privacyLink}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
