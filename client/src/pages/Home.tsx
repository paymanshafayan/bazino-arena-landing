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
  Volume2,
  VolumeX,
  Monitor,
  Flame,
  Play,
  Pause,
  Layers,
  Crown,
  Eye,
} from "lucide-react";

import monaHeroWide from "/assets/mona-hero-wide.png";
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

// ── MONA TRANSFORMATION PHASES (Direct from Instagram / SnapInsta video) ────
const monaPhases = [
  {
    id: "stage1",
    label: "۱. ورود به کلاب",
    sub: "استایل ورزشی در سالن گیم‌نت",
    img: "/assets/mona-stage1-casual.jpg",
    title: "مونا در قلب سالن بازینو",
    desc: "راه رفتن در راهروی مرمر مشکی سالن، احاطه‌شده با کنسول‌های PS5 و نمایشگرهای گیمینگ",
    aura: "from-[#00d2ff]/20 to-transparent",
    accent: "#00d2ff",
    badge: "CASUAL ENTRANCE",
  },
  {
    id: "stage2",
    label: "۲. تحول سایبری",
    sub: "لباس مسابقات رالی با خطوط نئون",
    img: "/assets/mona-stage2-cybersuit.jpg",
    title: "مورف سایبری و حلقه‌های انرژی",
    desc: "تبدیل به سویت مسابقاتی سایبری با نوارهای طلایی و فیروزه‌ای و حلقه‌های چرخان انرژی",
    aura: "from-[#00d2ff]/40 via-[#ffc400]/30 to-transparent",
    accent: "#00d2ff",
    badge: "CYBER OVERDRIVE",
  },
  {
    id: "stage3",
    label: "۳. زره قهرمان افسانه‌ای",
    sub: "زره تمام طلایی با تاج آرنا",
    img: "/assets/mona-stage3-goldenarmor.jpg",
    title: "ظهور قهرمان تالار اساطیر",
    desc: "پوشیدن زره باشکوه طلایی بازینو با شنل حماسی، آماده برای ورود به تورنمنت‌های قهرمانی",
    aura: "from-[#ffc400]/50 via-[#ffd700]/30 to-transparent",
    accent: "#ffc400",
    badge: "GOLDEN CHAMPION",
  },
  {
    id: "stage4",
    label: "۴. کلوزآپ نهایی",
    sub: "نگاه رو‌در‌رو قهرمان بازینو",
    img: "/assets/mona-stage4-closeup.jpg",
    title: "اگه یه قهرمانی، این آخرشه.",
    desc: "روبروی دوربین با جزئیات زره طلایی و تاج شاهانه در پس‌زمینه صفحات گیمینگ و کنسول‌های PS5",
    aura: "from-[#ffc400]/60 via-[#ff9900]/30 to-transparent",
    accent: "#ffc400",
    badge: "ARENA OF LEGENDS",
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
  hero: { kicker: string; titleLine1: string; titleLine2: string; subtitle: string; primaryCta: string; secondaryCta: string; monaTag: string };
  customizer: { index: string; title: string; subtitle: string; lightingLabel: string; consoleLabel: string; audioLabel: string; hospitalityLabel: string };
  bracket: { index: string; title: string; subtitle: string; liveBadge: string; viewBracket: string };
  telemetry: { index: string; title: string; subtitle: string; radarLabel: string; verifiedBadge: string; rows: Array<{ round: string; match: string; score: string; mode: string }> };
  lounge: { index: string; title: string; subtitle: string; amenities: Array<{ title: string; desc: string }> };
  entry: { index: string; title: string; subtitle: string; steps: Array<{ num: string; title: string; desc: string }> };
  visit: { index: string; title: string; subtitle: string; locationName: string; mapsCta: string; digitalPassTitle: string; digitalPassDesc: string };
  footer: { copyright: string; portalLink: string; privacyLink: string };
}> = {
  fa: {
    nav: { arena: "هیرو ویدیو مونا", stations: "سفارشی‌ساز", tournaments: "براکت مسابقات", lounge: "کافه و لانژ", visit: "مسیریابی" },
    hero: {
      kicker: "ویدیوی رسمی مونا • تالار اساطیر بازینو",
      titleLine1: "اگه یه قهرمانی،",
      titleLine2: "این آخرشه.",
      subtitle: "قدم زدن مونا در سالن مجلل گیم‌نت بازینو و تبدیل ۳ مرحله‌ای به قهرمان طلایی آرنا — مجهز به کنسول‌های PS5 Pro، نمایشگرهای غول‌پیکر OLED و سیستم‌های مسابقاتی.",
      primaryCta: "رزرو جایگاه در سالن",
      secondaryCta: "مشاهده تبدیل مونا",
      monaTag: "مونا • اینفلوئنسر رسمی بازینو",
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
    nav: { arena: "MONA VIDEO HERO", stations: "CUSTOMIZER", tournaments: "BRACKETS", lounge: "LOUNGE", visit: "VISIT" },
    hero: {
      kicker: "OFFICIAL MONA CINEMATIC • ARENA OF LEGENDS",
      titleLine1: "IF YOU ARE A CHAMP,",
      titleLine2: "THIS IS IT.",
      subtitle: "Mona walking through the luxury Bazino gaming lounge, morphing into the Golden Champion of the Arena. Powered by PS5 Pro pods and esports battle stations.",
      primaryCta: "RESERVE VIP BAY",
      secondaryCta: "WATCH MONA MORPH",
      monaTag: "Mona • Official Bazino Influencer",
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
    nav: { arena: "Mona Video Hero", stations: "Özelleştirici", tournaments: "Braketler", lounge: "Lounge", visit: "Konum" },
    hero: {
      kicker: "RESMİ MONA VİDEOSU • EFSANELER ARENASI",
      titleLine1: "ŞAMPİYONSAN,",
      titleLine2: "İŞTE BURASI.",
      subtitle: "Mona'nın lüks Bazino salonunda yürüyüşü ve 3 aşamalı altın şampiyon zırhına dönüşümü.",
      primaryCta: "YERİNİ AYIR",
      secondaryCta: "DÖNÜŞÜMÜ İZLE",
      monaTag: "Mona • Resmi Bazino Influencerı",
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
    nav: { arena: "Видео Мона", stations: "Конфигуратор", tournaments: "Сетки", lounge: "Лаунж", visit: "Как найти" },
    hero: {
      kicker: "ОФИЦИАЛЬНОЕ ВИДЕО МОНЫ • АРЕНА ЛЕГЕНД",
      titleLine1: "ЕСЛИ ТЫ ЧЕМПИОН,",
      titleLine2: "ТЕБЕ СЮДА.",
      subtitle: "Мона идет по роскошному залу Bazino и трансформируется в золотого чемпиона арены.",
      primaryCta: "ЗАБРОНИРОВАТЬ",
      secondaryCta: "СМОТРЕТЬ ТРАНСФОРМАЦИЮ",
      monaTag: "Мона • Официальный амбассадор Bazino",
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

  // ── HERO CINEMATIC VIDEO & MONA MORPH STATE ───────────────────────
  const [heroMode, setHeroMode] = useState<"video" | "interactive">("interactive");
  const [activeMonaStage, setActiveMonaStage] = useState(2); // default to Golden Champion
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Handle Video Play / Pause toggle
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

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

  const currentStage = monaPhases[activeMonaStage] ?? monaPhases[0];

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
      {/* ── TOP VOLUMETRIC SPOTLIGHT BEAM ──────────────────────────── */}
      <div className="top-spotlight-beam" />
      <div className="technical-grid fixed inset-0 pointer-events-none opacity-40 z-0" />

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
            CHAPTER 01: HERO — AUTHENTIC MONA VIDEO & FRAMER MOTION MORPH
        ════════════════════════════════════════════════════════════ */}
        <section id="top" className="max-w-7xl mx-auto px-6 pt-6 pb-24 relative z-10">
          <div className="relative rounded-[36px] overflow-hidden border border-white/12 bg-[#0a0d14] p-8 sm:p-12 lg:p-14 min-h-[88vh] flex flex-col justify-between shadow-2xl">
            
            {/* ── BACKGROUND: REAL MONA CINEMATIC / INTERACTIVE MORPH ──── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {heroMode === "video" ? (
                <video
                  ref={videoRef}
                  src="/assets/bazino-legends.mp4"
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  playsInline
                  className="w-full h-full object-cover object-center opacity-45 filter saturate-125 transition-opacity duration-700"
                />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStage.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.45, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentStage.img}
                      alt={currentStage.title}
                      className="w-full h-full object-cover object-center filter saturate-125"
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Ambient Gradients for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d14] via-[#0a0d14]/50 to-transparent" />
            </div>

            {/* ── FRAMER MOTION SWIRLING GOLD/CYAN ENERGY RINGS ─────── */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-[600px] h-[600px] rounded-full border border-[#ffc400]/15 opacity-60 absolute"
                style={{ filter: "blur(1px)" }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-[450px] h-[450px] rounded-full border border-[#00d2ff]/20 opacity-50 absolute"
              />
              <div className="w-[300px] h-[300px] rounded-full bg-radial from-[#ffc400]/10 to-transparent blur-3xl absolute" />
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

              {/* Video Mode / Morph Mode Controls */}
              <div className="flex items-center gap-3">
                <div className="flex bg-[#0e121a]/90 border border-white/15 p-1 rounded-full">
                  <button
                    type="button"
                    onClick={() => setHeroMode("interactive")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-orbitron font-bold transition-all ${
                      heroMode === "interactive"
                        ? "bg-[#ffc400] text-[#07080c] shadow-[0_0_15px_rgba(255,196,0,0.4)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Layers size={13} />
                    <span>مورف تعاملی</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroMode("video")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-orbitron font-bold transition-all ${
                      heroMode === "video"
                        ? "bg-[#ffc400] text-[#07080c] shadow-[0_0_15px_rgba(255,196,0,0.4)]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Play size={13} />
                    <span>پخش ویدیو</span>
                  </button>
                </div>

                {heroMode === "video" && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleVideoPlay}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15"
                      title={isVideoPlaying ? "توقف" : "پخش"}
                    >
                      {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/15"
                      title={isVideoMuted ? "صدا وصل" : "بی‌صدا"}
                    >
                      {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── MAIN HERO STAGE ─────────────────────────────────── */}
            <div className="relative z-10 my-10 grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Persian Brand Headline & CTA */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffc400]/10 border border-[#ffc400]/30 text-[#ffc400] font-orbitron text-xs font-bold mb-6">
                  <Crown size={14} />
                  <span>{t.hero.monaTag}</span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-orbitron uppercase text-white tracking-tight leading-[1.08] mb-6">
                  {t.hero.titleLine1}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc400] via-[#ffd700] to-[#00d2ff] drop-shadow-[0_0_35px_rgba(255,196,0,0.45)]">
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

              {/* Right Column: Interactive Mona Transformation Stage Controller */}
              <div className="lg:col-span-6">
                <TiltCard maxTilt={6}>
                  <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0e1320]/90 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
                    
                    {/* Active Stage Indicator Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffc400] animate-pulse" />
                        <span className="font-orbitron font-bold text-xs text-[#ffc400] tracking-wider">
                          {currentStage.badge}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        مرحله {activeMonaStage + 1} از ۴
                      </span>
                    </div>

                    {/* Stage Preview Visual Frame */}
                    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/15 mb-6 group">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentStage.img}
                          src={currentStage.img}
                          alt={currentStage.title}
                          initial={{ opacity: 0, scale: 1.08 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover object-center"
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090c14] via-transparent to-transparent" />
                      
                      {/* Floating Caption on Frame */}
                      <div className="absolute bottom-3 inset-x-4 flex justify-between items-end z-10">
                        <div>
                          <h4 className="text-white font-black text-sm sm:text-base font-orbitron">
                            {currentStage.title}
                          </h4>
                          <p className="text-gray-300 text-xs line-clamp-1">
                            {currentStage.desc}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-[#ffc400] text-[#07080c] font-black text-[11px] font-orbitron shrink-0">
                          BAZINO ARENA
                        </span>
                      </div>
                    </div>

                    {/* 4-Step Interactive Morph Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {monaPhases.map((phase, idx) => {
                        const isSelected = activeMonaStage === idx;
                        return (
                          <button
                            key={phase.id}
                            type="button"
                            onClick={() => {
                              setActiveMonaStage(idx);
                              setHeroMode("interactive");
                            }}
                            className={`p-2.5 rounded-xl text-right transition-all border flex flex-col justify-between h-20 ${
                              isSelected
                                ? "bg-[#ffc400]/15 border-[#ffc400] shadow-[0_0_20px_rgba(255,196,0,0.3)]"
                                : "bg-white/03 border-white/08 hover:bg-white/06 hover:border-white/20"
                            }`}
                          >
                            <span className={`text-[11px] font-black font-orbitron ${isSelected ? "text-[#ffc400]" : "text-gray-300"}`}>
                              {phase.label}
                            </span>
                            <span className="text-[10px] text-gray-400 line-clamp-1">
                              {phase.sub}
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
                  <div className="text-base font-black font-orbitron text-white">۱۴ استیشن مجهز PS5 Pro</div>
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
