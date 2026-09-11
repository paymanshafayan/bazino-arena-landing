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
  Gamepad2,
  Monitor,
  Tv,
  Crown,
  Layers,
  Flame,
  Maximize2,
  Compass,
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
    <rect width="3" height="0.667" fill="#fff" />
    <rect y="0.667" width="3" height="0.667" fill="#0039a6" />
    <rect y="1.333" width="3" height="0.667" fill="#d52b1e" />
  </svg>
);

const FlagTR: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
    <rect width="30" height="20" fill="#e30a17" />
    <circle cx="10.5" cy="10" r="5" fill="#fff" />
    <circle cx="11.75" cy="10" r="4" fill="#e30a17" />
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

// ── 3D TILT CONTAINER ──────────────────────────────────────────────
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

function TiltCard({ children, className = "", maxTilt = 8 }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 240, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 240, damping: 24 });

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
      <div style={{ transform: "translateZ(20px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

// ── REAL BAZINO PRO LOUNGE TOUR FRAMES (Extracted from 33.2s Video) ──
const tourFrames = [
  {
    id: "grid",
    title: "کاتالوگ ۹ بازی برتر PS5",
    subtitle: "God of War, Spider-Man, EA FC 26, Black Ops 6",
    badge: "OLED 4K 120HZ",
    image: "/assets/tour/tour-01-grid.webp",
    glowColor: "#00d2ff",
    glowRgba: "rgba(0, 210, 255, 0.45)",
    tag: "گرید بازی‌های نسل ۹",
  },
  {
    id: "ronaldinho",
    title: "استیشن اختصاصی رونالدینیو ۱۰",
    subtitle: "والپیپر هنری Joga Bonito با سیستم نورپردازی کهربایی",
    badge: "JOGA BONITO VIP",
    image: "/assets/tour/tour-02-ronaldinho.webp",
    glowColor: "#ffc400",
    glowRgba: "rgba(255, 196, 0, 0.45)",
    tag: "نورپردازی گرم کهربایی",
  },
  {
    id: "bazinopro",
    title: "نشان سلطنتی بازینو پرو",
    subtitle: "لوگوی سه‌بعدی تاج طلایی با ذرات معلق آتشین",
    badge: "ROYAL CROWN",
    image: "/assets/tour/tour-03-bazinopro.webp",
    glowColor: "#ffd700",
    glowRgba: "rgba(255, 215, 0, 0.55)",
    tag: "لوگوی رسمی BAZINO PRO",
  },
  {
    id: "sport",
    title: "استیج نمایش مسابقات ورزشی",
    subtitle: "نمایش رویدادهای زنده با نورپردازی یخی اقیانوسی",
    badge: "ICE AMBILIGHT",
    image: "/assets/tour/tour-04-sport.webp",
    glowColor: "#38bdf8",
    glowRgba: "rgba(56, 189, 248, 0.45)",
    tag: "استیشن مسابقات",
  },
  {
    id: "dock",
    title: "کنسول دیواری PS5 و داک RGB",
    subtitle: "دسته‌های DualSense روی پایه شارژ با بار نوری مالتی‌کالر و نور سرخابی",
    badge: "DUALSENSE RGB",
    image: "/assets/tour/tour-05-dock.webp",
    glowColor: "#ff2a5f",
    glowRgba: "rgba(255, 42, 95, 0.5)",
    tag: "داک شارژ ال‌ای‌دی",
  },
  {
    id: "lounge",
    title: "نمای پانورامای استیشن‌های بازینو",
    subtitle: "ردیف استیشن‌های گیمینگ دیواری با کنترل هوشمند روشنایی",
    badge: "14 PRIVATE BAYS",
    image: "/assets/tour/tour-06-lounge.webp",
    glowColor: "#ffc400",
    glowRgba: "rgba(255, 196, 0, 0.45)",
    tag: "راهروی VIP سالن",
  },
];

const tournamentGames = [
  { key: "football", cover: slideFc26, title: "FC 26 CHAMPIONSHIP", genre: "1V1 KNOCKOUT", prize: "$500 PRIZE POOL", time: "SAT 20:00", activePlayers: "32/32" },
  { key: "tactical", cover: slideUfc5, title: "UFC 5 OCTAGON FIGHT", genre: "MMA / SINGLE ELIM", prize: "$350 PRIZE POOL", time: "SUN 20:30", activePlayers: "16/16" },
  { key: "rpg", cover: slideMk1, title: "MORTAL KOMBAT 1", genre: "ACTION / DOUBLE ELIM", prize: "$300 PRIZE POOL", time: "FRI 21:00", activePlayers: "16/16" },
  { key: "racing", cover: slideTekken8, title: "TEKKEN 8 SHOWDOWN", genre: "FIGHTING / 3D", prize: "$400 PRIZE POOL", time: "THU 20:00", activePlayers: "24/32" },
];

const copy: Record<Lang, {
  nav: { arena: string; stations: string; tournaments: string; lounge: string; visit: string };
  hero: { kicker: string; titleLine1: string; titleLine2: string; subtitle: string; primaryCta: string; secondaryCta: string; loungeBadge: string };
  customizer: { index: string; title: string; subtitle: string; lightingLabel: string; consoleLabel: string; audioLabel: string; hospitalityLabel: string };
  bracket: { index: string; title: string; subtitle: string; liveBadge: string; viewBracket: string };
  telemetry: { index: string; title: string; subtitle: string; radarLabel: string; verifiedBadge: string; rows: Array<{ round: string; match: string; score: string; mode: string }> };
  lounge: { index: string; title: string; subtitle: string; amenities: Array<{ title: string; desc: string }> };
  entry: { index: string; title: string; subtitle: string; steps: Array<{ num: string; title: string; desc: string }> };
  visit: { index: string; title: string; subtitle: string; locationName: string; mapsCta: string; digitalPassTitle: string; digitalPassDesc: string };
  footer: { copyright: string; portalLink: string; privacyLink: string };
}> = {
  fa: {
    nav: { arena: "تور مجازی سالن", stations: "سفارشی‌ساز", tournaments: "براکت مسابقات", lounge: "کافه و لانژ", visit: "مسیریابی" },
    hero: {
      kicker: "فصل ۰۱ • تور مجازی سالن اختصاصی بازینو پرو",
      titleLine1: "اگه یه قهرمانی،",
      titleLine2: "این آخرشه.",
      subtitle: "استیشن‌های دیواری اختصاصی PS5 Pro با نمایشگرهای غول‌پیکر 4K، داک‌های شارژ DualSense با نورپردازی RGB و سیستم امبیلایت هماهنگ در ایسکله قبرس شمالی.",
      primaryCta: "رزرو جایگاه در سالن",
      secondaryCta: "سفارشی‌سازی استیشن",
      loungeBadge: "BAZINO PRO LOUNGE",
    },
    customizer: {
      index: "فصل ۰۲ / سفارشی‌سازی شب بازی",
      title: "استیشن بازی خود را بسازید.",
      subtitle: "کنسول، نورپردازی محیطی و خدمات اختصاصی را به صورت زنده انتخاب کنید.",
      lightingLabel: "پالت نوری نئونی",
      consoleLabel: "کنسول مسابقه",
      audioLabel: "پیکربندی صدا",
      hospitalityLabel: "پذیرایی VIP کافه",
    },
    bracket: {
      index: "فصل ۰۳ / سیگنال مسابقات",
      title: "درخت زنده مسابقات قهرمانی.",
      subtitle: "ثبت‌نام زنده در براکت ۳۲ نفره FC 26 و TEKKEN 8 با جوایز نقدی هفتگی.",
      liveBadge: "۳۲ بازیکن • شنبه ساعت ۲۰:۰۰",
      viewBracket: "مشاهده براکت رسمی",
    },
    telemetry: {
      index: "فصل ۰۴ / تله‌متری و آمار زنده",
      title: "سیگنال‌های زنده استیج مسابقات.",
      subtitle: "پایش لحظه‌ای سرعت اتصال، پینگ استیشن‌ها و نتایج زنده دور نهایی.",
      radarLabel: "پایش زنده استیج",
      verifiedBadge: "تایید شده رسمی",
      rows: [
        { round: "دور ۷ (فینال)", match: "آرمان ک. مقابل ماهان ۱۰", score: "۵ — ۳", mode: "FC 26 قهرمانی" },
        { round: "دور ۶ (نیمه‌نهایی)", match: "کسری مقابل رضا ب.", score: "۳ — ۱", mode: "UFC 5 اوکتاگون" },
        { round: "دور ۵ (فینال)", match: "نیما پرو مقابل علی گیمر", score: "۴ — ۲", mode: "تکن ۸ فایت استیک" },
      ],
    },
    lounge: {
      index: "فصل ۰۵ / نایت لانژ و بار اختصاصی",
      title: "اتمسفر VIP. طعم بازی در استراحتگاه.",
      subtitle: "فضایی لوکس با مبلمان چرمی، سرو نوشیدنی‌های انرژی‌زا و بار اختصاصی برای راند‌های استراحت.",
      amenities: [
        { title: "جایگاه‌های خصوصی VIP", desc: "ایزولاسیون صوتی، نمایشگر OLED اختصاصی و مبلمان ارگونومیک چرم." },
        { title: "سرو مستقیم پای استیشن", desc: "سفارش آنلاین انواع قهوه اسپشیالتی و موکتیل بدون توقف بازی." },
        { title: "ویدئووال پخش زنده اسپورتی", desc: "تماشای همزمان مسابقات لیگ قهرمانان و تورنمنت‌های بین‌المللی." },
      ],
    },
    entry: {
      index: "فصل ۰۶ / پروتکل ورود ۳ مرحله‌ای",
      title: "سه قدم تا نشستن پشت فرمان قهرمانی.",
      subtitle: "انتخاب جایگاه، دریافت کد نوبت آنی و تحویل کنسول در سالن هتل ویستا ماره.",
      steps: [
        { num: "۰۱", title: "انتخاب استیشن", desc: "انتخاب بین PS5 Haptic، Xbox Series X یا ستاپ‌های اختصاصی ۸۵ اینچ." },
        { num: "۰۲", title: "تثبیت نوبت آنلاین", desc: "دریافت کد رزرو آنی بدون نیاز به پرداخت اولیه — تسویه در کانتر سالن." },
        { num: "۰۳", title: "ورود به آرنا", desc: "حضور در سالن، تحویل کنترلر اختصاصی و شروع رقابت در جدول قهرمانان." },
      ],
    },
    visit: {
      index: "فصل ۰۷ / لوکیشن و کارت عضویت دیجیتال",
      title: "گیم‌نایت در ایسکله، قبرس شمالی.",
      subtitle: "هتل لوکس ویستا ماره، خیابان ساحلی لانگ‌بیچ، ایسکله.",
      locationName: "هتل ویستا ماره • ایسکله",
      mapsCta: "مسیریابی در گوگل مپس",
      digitalPassTitle: "عضویت دیجیتال کلاب بازینو",
      digitalPassDesc: "اسکن کیو‌آرکد برای دریافت پاس دیجیتال، مشاهده براکت‌ها و دسترسی به تخفیف‌های ویژه.",
    },
    footer: {
      copyright: "بازینو • تالار اساطیر گیمینگ",
      portalLink: "پورتال رسمی بازینو",
      privacyLink: "حریم خصوصی",
    },
  },
  en: {
    nav: { arena: "VIRTUAL TOUR", stations: "CUSTOMIZER", tournaments: "BRACKETS", lounge: "LOUNGE", visit: "VISIT" },
    hero: {
      kicker: "CHAPTER 01 • BAZINO PRO LOUNGE VIRTUAL TOUR",
      titleLine1: "IF YOU ARE A CHAMP,",
      titleLine2: "THIS IS IT.",
      subtitle: "Wall-mounted PS5 Pro gaming bays with 4K OLED displays, RGB charging docks, and dynamic room ambilight in Long Beach, Iskele.",
      primaryCta: "RESERVE VIP BAY",
      secondaryCta: "CUSTOMIZE RIG",
      loungeBadge: "BAZINO PRO LOUNGE",
    },
    customizer: {
      index: "CHAPTER 02 / BATTLESTATION CUSTOMIZER",
      title: "ENGINEER YOUR NIGHT.",
      subtitle: "Select your console hardware, ambient room luminesce, and VIP cafe service live.",
      lightingLabel: "NEON AMBIENT PALETTE",
      consoleLabel: "TOURNAMENT RIG",
      audioLabel: "AUDIO CALIBRATION",
      hospitalityLabel: "IN-SEAT VIP SERVICE",
    },
    bracket: {
      index: "CHAPTER 03 / TOURNAMENT SIGNAL",
      title: "LIVE CHAMPIONSHIP BRACKET.",
      subtitle: "Weekly knockout stages for FC 26 & TEKKEN 8 with cash pools and live arena projection.",
      liveBadge: "32 PLAYERS • SAT 20:00",
      viewBracket: "OPEN LIVE BRACKET",
    },
    telemetry: {
      index: "CHAPTER 04 / TELEMETRY & LIVE RADAR",
      title: "VERIFIED ARENA FEED.",
      subtitle: "Live telemetry from all 12 bays, tracking station ping, frame latency, and leaderboard matches.",
      radarLabel: "LIVE ARENA RADAR",
      verifiedBadge: "OFFICIAL SIGNAL",
      rows: [
        { round: "ROUND 07", match: "ArmanK vs Mahan10", score: "5 — 3", mode: "FC 26 GRAND FINAL" },
        { round: "ROUND 06", match: "Kasra vs RezaB", score: "3 — 1", mode: "UFC 5 SEMI-FINAL" },
        { round: "ROUND 05", match: "NimaPro vs AliGameR", score: "4 — 2", mode: "TEKKEN 8 FIGHT" },
      ],
    },
    lounge: {
      index: "CHAPTER 05 / NIGHT LOUNGE & VIP BAR",
      title: "VIP PACE. CAFE RESPITE.",
      subtitle: "Designed for round intervals. Relax in Italian leather seating with curated espresso and mocktails.",
      amenities: [
        { title: "Private Acoustic Bays", desc: "Acoustically isolated zones with customizable ambient neon." },
        { title: "Seat-Side Ordering", desc: "Full cafe and kitchen menu delivered without pausing your match." },
        { title: "Esports Broadcast Wall", desc: "Live multi-stream wall broadcasting premier global tournaments." },
      ],
    },
    entry: {
      index: "CHAPTER 06 / ENTRY PROTOCOL",
      title: "THREE STEPS. ONE GLORIOUS NIGHT.",
      subtitle: "Choose your console, secure your spot online, and arrive at the desk to start your round.",
      steps: [
        { num: "01", title: "SELECT YOUR STATION", desc: "Pick between PS5 Haptic, Xbox Series X or 85\" VIP Focus bays." },
        { num: "02", title: "HOLD YOUR SPOT", desc: "Instant booking code — pay in-person via cash/card at the desk." },
        { num: "03", title: "COMMENCE THE MATCH", desc: "Arrive with your crew, grab your controllers and climb the ranks." },
      ],
    },
    visit: {
      index: "CHAPTER 07 / LOCATION & DIGITAL PASS",
      title: "GAME NIGHT IN ISKELE.",
      subtitle: "Hotel VistaMare, Long Beach, Iskele, Northern Cyprus.",
      locationName: "Hotel VistaMare • Iskele",
      mapsCta: "OPEN IN GOOGLE MAPS",
      digitalPassTitle: "BAZINO DIGITAL MEMBERSHIP",
      digitalPassDesc: "Scan to add your digital pass, view tournament brackets, and fast-track reservations.",
    },
    footer: {
      copyright: "BAZINO • ARENA OF LEGENDS",
      portalLink: "Official Portal",
      privacyLink: "Privacy Policy",
    },
  },
  tr: {
    nav: { arena: "Sanal Tur", stations: "Özelleştirici", tournaments: "Braketler", lounge: "Lounge", visit: "Konum" },
    hero: {
      kicker: "BÖLÜM 01 • BAZINO PRO SALONU SANAL TURU",
      titleLine1: "ŞAMPİYONSAN,",
      titleLine2: "İŞTE BURASI.",
      subtitle: "Duvara monte PS5 Pro istasyonları, 4K OLED ekranlar, RGB DualSense şarj yuvaları ve dinamik ambilight aydınlatma.",
      primaryCta: "YERİNİ AYIR",
      secondaryCta: "İSTASYONU ÖZELLEŞTİR",
      loungeBadge: "BAZINO PRO SALONU",
    },
    customizer: {
      index: "BÖLÜM 02 / İSTASYON YAPILANDIRICI",
      title: "OYUN GECENİ KENDİN TASARLA.",
      subtitle: "Konsolunu, ambiyans ışıklandırmanı ve VIP ikramlarını anında seç.",
      lightingLabel: "NEON AMBİYANS IŞIĞI",
      consoleLabel: "TURNUVA KONSOLU",
      audioLabel: "SES PROFİLİ",
      hospitalityLabel: "İSTASYONA SERVİS",
    },
    bracket: {
      index: "BÖLÜM 03 / TURNUVA SİNYALİ",
      title: "CANLI TURNUVA BRAKETİ.",
      subtitle: "Nakit ödüllü haftalık eleme turnuvaları, sezon puanları ve ana sahnede canlı yayın.",
      liveBadge: "32 OYUNCU • CUMARTESİ 20:00",
      viewBracket: "BRAKETİ GÖR",
    },
    telemetry: {
      index: "BÖLÜM 04 / TELEMETRİ VE RADAR",
      title: "ONAYLANMIŞ MAÇ SİNYALLERİ.",
      subtitle: "Canlı maç verileri, arena radar taraması ve ultra düşük istasyon gecikmesi.",
      radarLabel: "CANLI RADAR TARAMASI",
      verifiedBadge: "RESMİ ONAYLI VERİ",
      rows: [
        { round: "RAUND 07", match: "ArmanK vs Mahan10", score: "5 — 3", mode: "FC 26 BÜYÜK FİNAL" },
        { round: "RAUND 06", match: "Kasra vs RezaB", score: "3 — 1", mode: "UFC 5 YARI FİNAL" },
        { round: "RAUND 05", match: "NimaPro vs AliGameR", score: "4 — 2", mode: "TEKKEN 8 FİNAL" },
      ],
    },
    lounge: {
      index: "BÖLÜM 05 / NIGHT LOUNGE & KAFE",
      title: "VIP RİTMİ. KAFE MOLASI.",
      subtitle: "Raund araları برای dinlenme. Deri koltuklarda özel kahve ve içecekler.",
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
        { num: "01", title: "İSTASYONUNU SEÇ", desc: "PS5 Haptic, Xbox Series X veya 85\" VIP Salonu seç." },
        { num: "02", title: "YERİNİ AYIRT", desc: "Anında takip kodu — ödeme girişte kasada." },
        { num: "03", title: "OYUNA BAŞLA", desc: "Arkadaşlarınla gel, kolları al ve liderlik tablosunu fethet." },
      ],
    },
    visit: {
      index: "BÖLÜM 07 / KONUM VE DİJİTAL KART",
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
    nav: { arena: "Виртуальный тур", stations: "Конфигуратор", tournaments: "Сетки", lounge: "Лаунж", visit: "Как найти" },
    hero: {
      kicker: "ГЛАВА 01 • ВИРТУАЛЬНЫЙ ТУР ПО BAZINO PRO",
      titleLine1: "ЕСЛИ ТЫ ЧЕМПИОН,",
      titleLine2: "ТЕБЕ СЮДА.",
      subtitle: "Настенные станции PS5 Pro с экранами 4K OLED, зарядными доками RGB и динамической подсветкой в отеле VistaMare.",
      primaryCta: "ЗАБРОНИРОВАТЬ",
      secondaryCta: "НАСТРОИТЬ МЕСТО",
      loungeBadge: "BAZINO PRO LOUNGE",
    },
    customizer: {
      index: "ГЛАВА 02 / КОНФИГУРАТОР МЕСТА",
      title: "НАСТРОЙ СВОЙ МАТЧ.",
      subtitle: "Выбирайте консоль, подсветку и напитки прямо к игровому месту.",
      lightingLabel: "НЕОНОВАЯ ПОДСВЕТКА",
      consoleLabel: "ИГРОВАЯ КОНСОЛЬ",
      audioLabel: "ПРОФИЛЬ ЗВУКА",
      hospitalityLabel: "ОБСЛУЖИВАНИЕ У МЕСТА",
    },
    bracket: {
      index: "ГЛАВА 03 / ТУРНИРНАЯ СЕТКА",
      title: "СЕТКА ЧЕМПИОНАТА ОНЛАЙН.",
      subtitle: "Еженедельные турниры на 32 игрока с призовым фондом по FC 26 и TEKKEN 8.",
      liveBadge: "32 ИГРОКА • СБ 20:00",
      viewBracket: "СМОТРЕТЬ СЕТКУ",
    },
    telemetry: {
      index: "ГЛАВА 04 / ТЕЛЕМЕТРИЯ АРЕНЫ",
      title: "ПРЯМАЯ ТЕЛЕМЕТРИЯ.",
      subtitle: "Мониторинг пинга консолей, задержки ввода и результатов матчей.",
      radarLabel: "РАДАР АРЕНЫ",
      verifiedBadge: "ОФИЦИАЛЬНЫЙ СИГНАЛ",
      rows: [
        { round: "РАУНД 07", match: "ArmanK vs Mahan10", score: "5 — 3", mode: "FC 26 ФИНАЛ" },
        { round: "РАУНД 06", match: "Kasra vs RezaB", score: "3 — 1", mode: "UFC 5 ПОЛУФИНАЛ" },
        { round: "РАУНД 05", match: "NimaPro vs AliGameR", score: "4 — 2", mode: "TEKKEN 8 ФИНАЛ" },
      ],
    },
    lounge: {
      index: "ГЛАВА 05 / VIP ЛАУНЖ И КАФЕ",
      title: "VIP ЛАУНЖ. КАФЕ-ЗОНА.",
      subtitle: "Итальянские кожаные кресла, напитки и трансляции киберспорта в перерывах.",
      amenities: [
        { title: "VIP Лаунж Зоны", desc: "Акустическая изоляция и регулируемая подсветка." },
        { title: "Заказ прямо к консоли", desc: "Свежий кофе и закуски без отрыва от игры." },
        { title: "Стена Киберспорта", desc: "Прямые трансляции мировых чемпионатов." },
      ],
    },
    entry: {
      index: "ГЛАВА 06 / ТРИ ШАГА К ИГРЕ",
      title: "ТРИ ШАГА. ОДИН НЕЗАБЫВАЕМЫЙ ВЕЧЕР.",
      subtitle: "Выбери консоль, забронируй онлайн и начни матч в клубе.",
      steps: [
        { num: "01", title: "ВЫБЕРИ СТАНЦИЮ", desc: "PS5 Haptic, Xbox Series X или 85\" VIP зал." },
        { num: "02", title: "ЗАБРОНИРУЙ", desc: "Моментальный код — оплата на ресепшн при входе." },
        { num: "03", title: "НАЧНИ МАТЧ", desc: "Приходи с друзьями и побеждай в таблице лидеров." },
      ],
    },
    visit: {
      index: "ГЛАВА 07 / ЛОКАЦИЯ И ЦИФРОВОЙ ПРОПУСК",
      title: "ИГРОВОЙ ВЕЧЕР В ИСКЕЛЕ.",
      subtitle: "Hotel VistaMare, Long Beach, Искеле, Северный Кипр.",
      locationName: "Hotel VistaMare • Искеле",
      mapsCta: "ОТКРЫТЬ В GOOGLE MAPS",
      digitalPassTitle: "ЦИФРОВАЯ КАРТА BAZINO",
      digitalPassDesc: "Отсканируйте для получения карты и быстрого бронирования.",
    },
    footer: {
      copyright: "BAZINO • ARENA OF LEGENDS",
      portalLink: "Официальный портал",
      privacyLink: "Конфиденциальность",
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fa");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  // ── HERO VIRTUAL TOUR POINTER ENGINE (Framer Motion) ──────────────
  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Pointer tracking motion values
  const pointerX = useMotionValue(0.1);
  const smoothPointerX = useSpring(pointerX, { stiffness: 260, damping: 28 });

  // Handle pointer / mouse scrubbing across hero stage
  const handleHeroPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    pointerX.set(ratio);
    
    // Calculate 0..5 index based on ratio
    const nextIdx = Math.min(tourFrames.length - 1, Math.floor(ratio * tourFrames.length));
    if (nextIdx !== activeTourIndex) {
      setActiveTourIndex(nextIdx);
    }
  };

  // ── INTERACTIVE SANDBOX CUSTOMIZER STATE ──────────────────────────
  const [activeLighting, setActiveLighting] = useState<"gold" | "cyan" | "magenta" | "emerald">("gold");
  const [activeConsole, setActiveConsole] = useState<"ps5" | "xbox" | "focus85">("ps5");
  const [activeAudio, setActiveAudio] = useState<"spatial" | "dolby">("spatial");
  const [vipCafeActive, setVipCafeActive] = useState(true);

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

  const currentFrame = tourFrames[activeTourIndex] ?? tourFrames[0];

  const getLightingGlow = () => {
    switch (activeLighting) {
      case "gold": return "border-[#ffc400] shadow-[0_0_40px_rgba(255,196,0,0.35)]";
      case "cyan": return "border-[#35a9ff] shadow-[0_0_40px_rgba(53,169,255,0.35)]";
      case "magenta": return "border-[#ff2db0] shadow-[0_0_40px_rgba(255,45,176,0.35)]";
      case "emerald": return "border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.35)]";
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-[#f6f8fc] relative overflow-hidden font-sans selection:bg-[#ffc400] selection:text-[#07080c]">
      
      {/* ── DYNAMIC SYNCED AMBILIGHT BACKDROP (Framer Motion) ────────── */}
      <motion.div
        animate={{
          background: `radial-gradient(ellipse 70% 45% at 50% 0%, ${currentFrame.glowRgba} 0%, transparent 75%)`
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 h-[650px] pointer-events-none z-0"
      />
      <div className="technical-grid fixed inset-0 pointer-events-none opacity-30 z-0" />

      {/* ── FLOATING PILL NAV ──────────────────────────────────────── */}
      <header className="floating-nav">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="w-7 h-7 rounded-full bg-[#ffc400] text-[#07080c] font-black text-xs flex items-center justify-center font-orbitron shadow-[0_0_12px_rgba(255,196,0,0.4)]">
            B
          </span>
          <span className="font-orbitron font-black text-sm tracking-wider text-white hidden sm:inline">
            BAZINO
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          <a href="#top">{t.nav.arena}</a>
          <a href="#customizer">{t.nav.stations}</a>
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
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/05 hover:bg-white/10 text-xs font-orbitron text-gray-300 transition-colors border border-white/08"
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

          <a href={reservationUrl} className="btn-gold-action hidden sm:inline-flex">
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
            <a href="#top" onClick={() => setMobileMenuOpen(false)}>{t.nav.arena}</a>
            <a href="#customizer" onClick={() => setMobileMenuOpen(false)}>{t.nav.stations}</a>
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
                <button type="button" onClick={() => setAuthOpen(false)} className="btn-ghost-action flex-1 justify-center">
                  {lang === "fa" ? "انصراف" : "CANCEL"}
                </button>
                <button type="submit" className="btn-gold-action flex-1 justify-center">
                  {lang === "fa" ? "ورود" : "CONTINUE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="pt-28">
        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 01: HERO — REAL BAZINO PRO LOUNGE VIRTUAL TOUR (FRAMER MOTION)
        ════════════════════════════════════════════════════════════ */}
        <section id="top" className="max-w-7xl mx-auto px-6 pt-6 pb-24 relative z-10">
          <div
            ref={heroRef}
            onPointerMove={handleHeroPointerMove}
            className="relative rounded-[36px] overflow-hidden border border-white/12 bg-[#0a0d14] p-8 sm:p-12 lg:p-14 min-h-[88vh] flex flex-col justify-between shadow-2xl transition-shadow duration-500"
            style={{
              boxShadow: `0 30px 80px rgba(0,0,0,0.9), 0 0 50px ${currentFrame.glowRgba}`
            }}
          >
            
            {/* ── BACKGROUND: DYNAMIC TOUR FRAME (Framer Motion Crossfade) ── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFrame.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentFrame.image}
                    alt={currentFrame.title}
                    className="w-full h-full object-cover object-center filter saturate-125"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Ambient Cinematic Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d14] via-[#0a0d14]/55 to-transparent" />
            </div>

            {/* Technical Crosshairs */}
            <div className="crosshair-corner crosshair-tl" />
            <div className="crosshair-corner crosshair-tr" />
            <div className="crosshair-corner crosshair-bl" />
            <div className="crosshair-corner crosshair-br" />

            {/* ── TOP HUD HEADER ───────────────────────────────────── */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 border-b border-white/10 pb-6">
              <div className="editorial-index">
                <span>{t.hero.kicker}</span>
              </div>

              {/* Station Indicators */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse transition-colors"
                  style={{ backgroundColor: currentFrame.glowColor }}
                />
                <span
                  className="font-orbitron font-bold text-xs tracking-wider transition-colors"
                  style={{ color: currentFrame.glowColor }}
                >
                  {currentFrame.badge}
                </span>
                <span className="text-gray-500 text-xs mr-2 font-orbitron">
                  (استیشن {activeTourIndex + 1} از {tourFrames.length})
                </span>
              </div>
            </div>

            {/* ── MAIN HERO STAGE ─────────────────────────────────── */}
            <div className="relative z-10 my-10 grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Persian Brand Headline & CTA */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffc400]/10 border border-[#ffc400]/30 text-[#ffc400] font-orbitron text-xs font-bold mb-6">
                  <Crown size={14} />
                  <span>{t.hero.loungeBadge}</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-orbitron uppercase text-white tracking-tight leading-[1.08] mb-6">
                  {t.hero.titleLine1}
                  <br />
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc400] via-[#ffd700] to-[#00d2ff]"
                    style={{ filter: `drop-shadow(0 0 35px ${currentFrame.glowRgba})` }}
                  >
                    {t.hero.titleLine2}
                  </span>
                </h1>

                <p className="text-gray-300 text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-8">
                  {t.hero.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href={reservationUrl} className="btn-gold-action">
                    <span>{t.hero.primaryCta}</span>
                    <ArrowUpRight size={16} />
                  </a>

                  <a href="#customizer" className="btn-ghost-action">
                    <span>{t.hero.secondaryCta}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive 3D Tour Frame (Framer Motion) */}
              <div className="lg:col-span-6">
                <TiltCard maxTilt={7}>
                  <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0d121c]/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
                    
                    {/* Active Station Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5">
                      <div className="flex items-center gap-2">
                        <Compass size={16} style={{ color: currentFrame.glowColor }} />
                        <span className="font-orbitron font-bold text-xs text-white">
                          {currentFrame.tag}
                        </span>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-md text-[11px] font-black font-orbitron text-[#07080c] transition-colors"
                        style={{ backgroundColor: currentFrame.glowColor }}
                      >
                        {currentFrame.badge}
                      </span>
                    </div>

                    {/* Visual Frame Screen */}
                    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 mb-6 group">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentFrame.image}
                          src={currentFrame.image}
                          alt={currentFrame.title}
                          initial={{ opacity: 0, scale: 1.06 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="w-full h-full object-cover object-center"
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080b12] via-transparent to-transparent" />
                      
                      {/* Floating Caption on Frame */}
                      <div className="absolute bottom-3 inset-x-4 flex justify-between items-end z-10">
                        <div>
                          <h4 className="text-white font-black text-sm sm:text-base font-orbitron">
                            {currentFrame.title}
                          </h4>
                          <p className="text-gray-300 text-xs line-clamp-1">
                            {currentFrame.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 6-Step Station Scrubbing Buttons */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {tourFrames.map((frame, idx) => {
                        const isSelected = activeTourIndex === idx;
                        return (
                          <button
                            key={frame.id}
                            type="button"
                            onClick={() => setActiveTourIndex(idx)}
                            className={`p-2 rounded-xl text-center transition-all border flex flex-col items-center justify-between h-16 ${
                              isSelected
                                ? "bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                : "bg-white/03 border-white/08 hover:bg-white/06 hover:border-white/20"
                            }`}
                            style={{
                              borderColor: isSelected ? frame.glowColor : undefined,
                              boxShadow: isSelected ? `0 0 15px ${frame.glowRgba}` : undefined
                            }}
                          >
                            <span
                              className="text-[10px] font-black font-orbitron line-clamp-1"
                              style={{ color: isSelected ? frame.glowColor : "#94a3b8" }}
                            >
                              0{idx + 1}
                            </span>
                            <span className="text-[9px] text-gray-400 line-clamp-1 font-medium">
                              {frame.id.toUpperCase()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* ── BOTTOM ARENA STATS PILLARS ──────────────────────── */}
            <div className="relative z-10 grid sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffc400]/10 border border-[#ffc400]/30 flex items-center justify-center text-[#ffc400]">
                  <Gamepad2 size={20} />
                </div>
                <div>
                  <div className="mono-tag text-[#ffc400] mb-0.5">STATION FLEET</div>
                  <div className="text-base font-black font-orbitron text-white">۱۴ استیشن دیواری PS5 Pro</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center text-[#00d2ff]">
                  <Monitor size={20} />
                </div>
                <div>
                  <div className="mono-tag text-[#00d2ff] mb-0.5">DISPLAYS</div>
                  <div className="text-base font-black font-orbitron text-white">نمایشگرهای OLED 120Hz</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff2a5f]/10 border border-[#ff2a5f]/30 flex items-center justify-center text-[#ff2a5f]">
                  <Trophy size={20} />
                </div>
                <div>
                  <div className="mono-tag text-[#ff2a5f] mb-0.5">TOURNAMENTS</div>
                  <div className="text-base font-black font-orbitron text-white">مسابقات هفتگی FC 26 & MK1</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 02: BATTLESTATION CUSTOMIZER (AuthKit / 3D Dark UI)
        ════════════════════════════════════════════════════════════ */}
        <section id="customizer" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="mb-12">
            <div className="editorial-index mb-2">
              <span>{t.customizer.index}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white mb-3">
              {t.customizer.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
              {t.customizer.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Interactive Controls Box */}
            <div className="lg:col-span-5 bg-[#0e121a] border border-white/12 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-8">
                {/* Control 1: Ambient Lighting */}
                <div>
                  <label className="mono-tag text-gray-300 block mb-3">
                    {t.customizer.lightingLabel}
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: "gold", color: "#ffc400", label: "GOLD" },
                      { id: "cyan", color: "#35a9ff", label: "CYAN" },
                      { id: "magenta", color: "#ff2db0", label: "MAGENTA" },
                      { id: "emerald", color: "#10b981", label: "EMERALD" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveLighting(item.id as any)}
                        className={`py-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                          activeLighting === item.id
                            ? "bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            : "bg-white/03 border-white/08 hover:border-white/20"
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                        />
                        <span className="text-[10px] font-orbitron font-bold text-gray-300">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 2: Console Fleet */}
                <div>
                  <label className="mono-tag text-gray-300 block mb-3">
                    {t.customizer.consoleLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "ps5", name: "PS5 HAPTIC", tag: "DUALSENSE PRO" },
                      { id: "xbox", name: "XBOX SERIES X", tag: "12 TFLOPS" },
                      { id: "focus85", name: "85\" VIP FOCUS", tag: "DOLBY VISION" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveConsole(item.id as any)}
                        className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                          activeConsole === item.id
                            ? "bg-[#ffc400]/15 border-[#ffc400] text-[#ffc400]"
                            : "bg-white/03 border-white/08 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <span className="text-xs font-black font-orbitron">{item.name}</span>
                        <span className="text-[9px] text-gray-500">{item.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 3: Sound System */}
                <div>
                  <label className="mono-tag text-gray-300 block mb-3">
                    {t.customizer.audioLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "spatial", name: "3D SPATIAL HEADSET", desc: "ANC Pulse 3D Wireless" },
                      { id: "dolby", name: "DOLBY ATMOS LOUNGE", desc: "7.1.4 Surround Acoustic" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveAudio(item.id as any)}
                        className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                          activeAudio === item.id
                            ? "bg-[#35a9ff]/15 border-[#35a9ff] text-[#35a9ff]"
                            : "bg-white/03 border-white/08 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <span className="text-xs font-black font-orbitron">{item.name}</span>
                        <span className="text-[9px] text-gray-500">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 4: VIP Cafe Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/05 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Coffee className="text-[#ffc400]" size={20} />
                    <div>
                      <div className="text-xs font-bold text-white">{t.customizer.hospitalityLabel}</div>
                      <div className="text-[10px] text-gray-400">سرو موکتیل و نوشیدنی به جایگاه</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVipCafeActive(!vipCafeActive)}
                    className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                      vipCafeActive ? "bg-[#ffc400] justify-end" : "bg-white/20 justify-start"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#07080c]" />
                  </button>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-[11px] text-gray-400">برآورد رزرو جایگاه</div>
                  <div className="text-lg font-black font-orbitron text-[#ffc400]">۱۵۰ لیر / ساعت</div>
                </div>
                <a href={reservationUrl} className="btn-gold-action">
                  <span>تثبیت کانفیگ</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic 3D Rig Preview Window */}
            <div className="lg:col-span-7">
              <TiltCard maxTilt={5}>
                <div
                  className={`h-full rounded-3xl p-8 bg-[#0a0d14] border transition-all duration-500 flex flex-col justify-between relative overflow-hidden ${getLightingGlow()}`}
                >
                  <img
                    src={activeConsole === "ps5" ? gamesAdults : activeConsole === "xbox" ? slideFc26 : gamesGear}
                    alt="Configured Station Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 filter saturate-150"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/60 to-transparent" />

                  <div className="relative z-10 flex justify-between items-center">
                    <span className="mono-tag text-[#ffc400] bg-black/70 px-3 py-1 rounded-full border border-white/15">
                      LIVE HUD SIMULATION
                    </span>
                    <span className="flex items-center gap-2 text-xs font-orbitron text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                      READY TO DEPLOY
                    </span>
                  </div>

                  <div className="relative z-10 my-16 max-w-md">
                    <div className="text-xs font-orbitron text-[#ffc400] tracking-wider mb-2">
                      {activeConsole.toUpperCase()} • {activeLighting.toUpperCase()} AURORA
                    </div>
                    <h3 className="text-3xl font-black font-orbitron text-white mb-4">
                      {activeConsole === "ps5" ? "PS5 PRO DUALSENSE DOCK" : activeConsole === "xbox" ? "XBOX SERIES X RIG" : "85\" STADIUM FOCUS BAY"}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      کالیبراسیون نورپردازی اختصاصی {activeLighting}، اتصال فوق‌العاده سریع با فیبر نوری ایسکله، و سرویس پذیرایی اختصاصی کافه برای نبرد بی‌وقفه.
                    </p>
                  </div>

                  <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-white/15">
                    <div>
                      <div className="text-[10px] text-gray-400">پینگ فیبر نوری</div>
                      <div className="text-sm font-bold font-orbitron text-white">۱۲ms تک‌رقمی</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400">رفرش ریت</div>
                      <div className="text-sm font-bold font-orbitron text-white">120Hz OLED</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400">پروفایل صدا</div>
                      <div className="text-sm font-bold font-orbitron text-white">{activeAudio.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 03: LIVE TOURNAMENT BRACKET
        ════════════════════════════════════════════════════════════ */}
        <section id="tournaments" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <div className="editorial-index mb-2">
                <span>{t.bracket.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white mb-3">
                {t.bracket.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl">
                {t.bracket.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="mono-tag text-[#ffc400] bg-[#ffc400]/10 border border-[#ffc400]/30 px-3 py-1.5 rounded-full">
                {t.bracket.liveBadge}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tournamentGames.map((game) => (
              <TiltCard key={game.key} maxTilt={6}>
                <div className="h-[380px] rounded-3xl bg-[#0e121a] border border-white/10 hover:border-[#ffc400]/50 transition-all p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl">
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-[#0e121a]/70 to-transparent" />

                  <div className="relative z-10 flex justify-between items-center">
                    <span className="mono-tag text-[#00d2ff] bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                      {game.genre}
                    </span>
                    <span className="text-xs font-orbitron text-[#ffc400] font-bold">
                      {game.activePlayers}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="text-[10px] font-orbitron text-gray-400 mb-1">{game.time}</div>
                    <h3 className="text-xl font-black font-orbitron text-white mb-2">{game.title}</h3>
                    <div className="text-xs font-bold text-[#ffc400] mb-4">{game.prize}</div>

                    <a
                      href={reservationUrl}
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#ffc400] hover:text-[#07080c] text-white text-xs font-orbitron font-bold flex items-center justify-center gap-2 transition-all border border-white/15"
                    >
                      <span>ثبت‌نام براکت</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 04: TELEMETRY & VERIFIED MATCH DATA
        ════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="bg-[#0b0e16] border border-white/10 rounded-3xl p-8 sm:p-12">
            <div className="flex flex-wrap justify-between items-center gap-6 mb-8 border-b border-white/10 pb-6">
              <div>
                <div className="editorial-index mb-2">
                  <span>{t.telemetry.index}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-orbitron text-white">
                  {t.telemetry.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-orbitron text-[#10b981] bg-[#10b981]/10 px-3 py-1.5 rounded-full border border-[#10b981]/30">
                <ShieldCheck size={14} />
                <span>{t.telemetry.verifiedBadge}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right font-orbitron text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-white/05">
                    <th className="py-3 px-4">مرحله مسابقه</th>
                    <th className="py-3 px-4">بازیکنان / تیم‌ها</th>
                    <th className="py-3 px-4">نتیجه ثبت‌شده</th>
                    <th className="py-3 px-4">عنوان بازی</th>
                    <th className="py-3 px-4 text-left">وضعیت تایید</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/05">
                  {t.telemetry.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/02 transition-colors text-gray-300">
                      <td className="py-4 px-4 font-bold text-white">{row.round}</td>
                      <td className="py-4 px-4 text-[#ffc400]">{row.match}</td>
                      <td className="py-4 px-4 font-black text-white">{row.score}</td>
                      <td className="py-4 px-4 text-gray-400">{row.mode}</td>
                      <td className="py-4 px-4 text-left">
                        <span className="inline-flex items-center gap-1.5 text-[#10b981] text-[11px]">
                          <CheckCircle2 size={13} />
                          VERIFIED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 05: NIGHT LOUNGE & CAFE
        ════════════════════════════════════════════════════════════ */}
        <section id="lounge" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="editorial-index mb-2">
                <span>{t.lounge.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white mb-6 leading-tight">
                {t.lounge.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
                {t.lounge.subtitle}
              </p>

              <div className="space-y-4">
                {t.lounge.amenities.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0e121a] border border-white/08 flex items-start gap-4">
                    <span className="w-8 h-8 rounded-lg bg-[#ffc400]/10 text-[#ffc400] flex items-center justify-center shrink-0 font-orbitron font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <TiltCard maxTilt={5}>
                <div className="relative rounded-3xl overflow-hidden border border-white/15 h-[480px] shadow-2xl">
                  <img
                    src={foodSoon}
                    alt="Bazino VIP Lounge & Bar"
                    className="w-full h-full object-cover filter saturate-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent" />
                  <div className="absolute bottom-8 right-8 left-8 p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
                    <div className="mono-tag text-[#ffc400] mb-1">VIP HOSPITALITY</div>
                    <div className="text-lg font-bold text-white">سرو برترین نوشیدنی‌ها و قهوه‌های تخصصی</div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 06: THREE STEPS ENTRY PROTOCOL
        ════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="editorial-index mb-2">
              <span>{t.entry.index}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white mb-3">
              {t.entry.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {t.entry.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {t.entry.steps.map((s, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#0c1018] border border-white/10 p-8 flex flex-col justify-between hover:border-[#ffc400]/40 transition-colors shadow-lg"
              >
                <div>
                  <div className="font-orbitron font-black text-4xl text-[#ffc400]/30 mb-6">{s.num}</div>
                  <h3 className="text-lg font-black font-orbitron text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/05 flex items-center gap-2 text-[11px] font-orbitron text-gray-500">
                  <CheckCircle2 size={12} className="text-[#ffc400]" />
                  <span>STEP COMPLETED INSTANTLY</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 07: LOCATION & DIGITAL PASS
        ════════════════════════════════════════════════════════════ */}
        <section id="visit" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Map & Location */}
            <div className="lg:col-span-7 bg-[#0b0e16] border border-white/12 rounded-3xl p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="editorial-index mb-2">
                  <span>{t.visit.index}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-white mb-3">
                  {t.visit.title}
                </h2>
                <p className="text-gray-400 text-sm mb-8">{t.visit.subtitle}</p>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 h-64 mb-8">
                  <img
                    src={slideCity}
                    alt="Iskele Cyprus Location"
                    className="w-full h-full object-cover filter saturate-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4 flex justify-between items-center text-white">
                    <span className="font-orbitron text-xs font-bold">{t.visit.locationName}</span>
                    <MapPin size={16} className="text-[#ffc400]" />
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn-gold-action justify-center"
              >
                <span>{t.visit.mapsCta}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Digital Pass QR */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#121724] to-[#0a0d14] border border-[#ffc400]/30 rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-[0_0_40px_rgba(255,196,0,0.15)]">
              <div>
                <div className="mono-tag text-[#ffc400] mb-2">PASS PROTOCOL</div>
                <h3 className="text-2xl font-black font-orbitron text-white mb-2">
                  {t.visit.digitalPassTitle}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-8">
                  {t.visit.digitalPassDesc}
                </p>

                <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-2xl">
                  <QRCodeSVG
                    value="https://bazino.club/pass/vip-member"
                    size={160}
                    fgColor="#07080c"
                    bgColor="#ffffff"
                  />
                </div>
              </div>

              <div className="text-center mt-8 text-[11px] font-orbitron text-gray-400">
                OFFICIAL BAZINO DIGITAL ASSET • NFC ENABLED
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#050608] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#ffc400] text-[#07080c] font-black text-xs flex items-center justify-center font-orbitron">
              B
            </span>
            <span className="font-orbitron font-bold text-xs text-gray-400 tracking-wider">
              {t.footer.copyright}
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-orbitron text-gray-500">
            <Link href="/hub" className="hover:text-white transition-colors">{t.footer.portalLink}</Link>
            <a href="#visit" className="hover:text-white transition-colors">{t.footer.privacyLink}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
