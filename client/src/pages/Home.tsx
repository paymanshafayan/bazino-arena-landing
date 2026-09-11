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
  Monitor,
  Flame,
  Tv,
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

// ── DATA SOURCES & COPY ────────────────────────────────────────────
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
    nav: { arena: "تالار اصلی", stations: "سفارشی‌ساز", tournaments: "براکت مسابقات", lounge: "کافه و لانژ", visit: "مسیریابی" },
    hero: {
      kicker: "فصل ۰۱ • ایسکله، قبرس شمالی",
      titleLine1: "اگه یه قهرمانی،",
      titleLine2: "این آخرشه.",
      subtitle: "برترین تجربه گیمینگ کنسولی با استیشن‌های مجهز PS5 و Xbox Series X، نمایشگرهای غول‌پیکر ۸۵ اینچ 4K و اتمسفر لوکس هتل ویستا ماره.",
      primaryCta: "رزرو جایگاه",
      secondaryCta: "کشف آرنا",
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
      subtitle: "جدول حذفی هفتگی با جوایز نقدی، امتیازات فصلی و پخش زنده روی استیج اصلی.",
      liveBadge: "مسابقه هفتگی ۳۲ نفره • شنبه‌ها ۲۰:۰۰",
      viewBracket: "مشاهده براکت مسابقه",
    },
    telemetry: {
      index: "فصل ۰۴ / تله‌متری و لیدربورد",
      title: "سیگنال راندهای تأییدشده.",
      subtitle: "ثبت زنده نتایج مسابقات، رادار اسکن کلاب و پینگ پایدار استیشن‌ها.",
      radarLabel: "رادار اسکن زنده آرنا",
      verifiedBadge: "داده‌های رسمی تأییدشده",
      rows: [
        { round: "راند ۰۷", match: "ArmanK در برابر Mahan10", score: "۵ — ۳", mode: "فینال FC 26" },
        { round: "راند ۰۶", match: "Kasra در برابر RezaB", score: "۳ — ۱", mode: "نیمه‌نهایی UFC 5" },
        { round: "راند ۰۵", match: "NimaPro در برابر AliGameR", score: "۴ — ۲", mode: "فینال TEKKEN 8" },
      ],
    },
    lounge: {
      index: "فصل ۰۵ / لانژ شبانه و کافه",
      title: "ریتم VIP. مکث کافه.",
      subtitle: "طراحی‌شده برای لحظات بین راندها. مبلمان راحتی چرمی، نوشیدنی‌های خنک و تجدید قوا برای قهرمانی.",
      amenities: [
        { title: "جایگاه‌های اختصاصی VIP", desc: "آکوستیک ایزوله و بدون نویز با کنترل شخصی نور." },
        { title: "سرویس داخل استیشن", desc: "سفارش مستقیم نوشیدنی و میان‌وعده بدون وقفه در بازی." },
        { title: "پخش زنده رویدادهای بزرگ", desc: "نمایش مسابقات فوتبال و ورزش‌های الکترونیک." },
      ],
    },
    entry: {
      index: "فصل ۰۶ / مراحل ورود",
      title: "سه قدم. یک شب خاطره‌انگیز.",
      subtitle: "کنسول خود را انتخاب کنید، آنلاین رزرو کنید و با حضور در کلاب بازی را آغاز کنید.",
      steps: [
        { num: "۰۱", title: "انتخاب استیشن و کنسول", desc: "انتخاب از میان PS5 Haptic، Xbox Series X یا جایگاه ۸۵ اینچ VIP." },
        { num: "۰۲", title: "رزرو آسان با کد رهگیری", desc: "ثبت سریع نوبت آنلاین — پرداخت حضوری نقد/کارت در دسک کلاب." },
        { num: "۰۳", title: "شروع مسابقه و هیجان", desc: "حضور همراه دوستان، دریافت دسته‌های پرو و شروع رقابت." },
      ],
    },
    visit: {
      index: "فصل ۰۷ / دسترسی و کارت عضویت",
      title: "شب بازی در ایسکله.",
      subtitle: "هتل ویستا ماره، لانگ بیچ، ایسکله، قبرس شمالی.",
      locationName: "هتل ویستا ماره • ایسکله",
      mapsCta: "مسیریابی با گوگل مپس",
      digitalPassTitle: "کارت دیجیتال عضویت بازینو",
      digitalPassDesc: "برای دریافت کارت عضویت، مشاهده براکت‌ها و رزرو سریع اسکن کنید.",
    },
    footer: {
      copyright: "بازینو • آرنای اسطوره‌های گیمینگ",
      portalLink: "پورتال رسمی بازینو",
      privacyLink: "حریم خصوصی",
    },
  },
  en: {
    nav: { arena: "Arena", stations: "Customizer", tournaments: "Brackets", lounge: "Lounge", visit: "Find Us" },
    hero: {
      kicker: "CHAPTER 01 • ISKELE, CYPRUS",
      titleLine1: "IF YOU ARE A CHAMP,",
      titleLine2: "THIS IS IT.",
      subtitle: "High-octane console gaming with PS5 & Xbox Series X stations, giant 85\" 4K screens and VIP hospitality at Hotel VistaMare.",
      primaryCta: "RESERVE A BAY",
      secondaryCta: "EXPLORE ARENA",
      monaTag: "Mona • Official Bazino Influencer",
    },
    customizer: {
      index: "CHAPTER 02 / STATION CONFIGURATOR",
      title: "BUILD YOUR GAME NIGHT.",
      subtitle: "Select your console, ambient neon lighting, and VIP hospitality in real-time.",
      lightingLabel: "NEON AMBIENT GLOW",
      consoleLabel: "COMPETITION CONSOLE",
      audioLabel: "AUDIO PRESET",
      hospitalityLabel: "IN-BAY SERVICE",
    },
    bracket: {
      index: "CHAPTER 03 / TOURNAMENT SIGNAL",
      title: "LIVE CHAMPIONSHIP BRACKET.",
      subtitle: "Weekly knockout brackets with cash prizes, verified leaderboard points and main-stage broadcast.",
      liveBadge: "32-PLAYER BRACKET • SATURDAY 20:00",
      viewBracket: "VIEW MATCH BRACKET",
    },
    telemetry: {
      index: "CHAPTER 04 / TELEMETRY & RADAR",
      title: "VERIFIED MATCH SIGNALS.",
      subtitle: "Real-time match telemetry, live radar arena scan and ultra-low station latency.",
      radarLabel: "LIVE ARENA RADAR SCAN",
      verifiedBadge: "OFFICIAL VERIFIED DATA",
      rows: [
        { round: "ROUND 07", match: "ArmanK vs Mahan10", score: "5 — 3", mode: "FC 26 GRAND FINAL" },
        { round: "ROUND 06", match: "Kasra vs RezaB", score: "3 — 1", mode: "UFC 5 SEMI-FINAL" },
        { round: "ROUND 05", match: "NimaPro vs AliGameR", score: "4 — 2", mode: "TEKKEN 8 FINAL" },
      ],
    },
    lounge: {
      index: "CHAPTER 05 / NIGHT LOUNGE & CAFE",
      title: "VIP RHYTHM. CAFE PAUSE.",
      subtitle: "Designed for the moments between rounds. Relax in leather VIP bays, order refreshments and reset for victory.",
      amenities: [
        { title: "Private VIP Bays", desc: "Acoustically treated quiet bays with custom lighting." },
        { title: "In-Bay Cafe Service", desc: "Order gourmet snacks and cold energy drinks directly to your console." },
        { title: "Live Esports Wall", desc: "Live broadcasts of premier sports and international tournaments." },
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
    nav: { arena: "Arena", stations: "Özelleştirici", tournaments: "Braketler", lounge: "Lounge", visit: "Konum" },
    hero: {
      kicker: "BÖLÜM 01 • İSKELE, KIBRIS",
      titleLine1: "ŞAMPİYONSAN,",
      titleLine2: "İŞTE BURASI.",
      subtitle: "PS5 ve Xbox Series X deneyimi, 85 inç 4K dev ekranlar ve Hotel VistaMare'de VIP gaming lounge atmosferi.",
      primaryCta: "YERİNİ AYIR",
      secondaryCta: "ARENAYI KEŞFET",
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
    nav: { arena: "Арена", stations: "Конфигуратор", tournaments: "Сетки", lounge: "Лаунж", visit: "Как найти" },
    hero: {
      kicker: "ГЛАВА 01 • ИСКЕЛЕ, КИПР",
      titleLine1: "ЕСЛИ ТЫ ЧЕМПИОН,",
      titleLine2: "ТЕБЕ СЮДА.",
      subtitle: "Консольные станции PS5 и Xbox Series X, 85-дюймовые 4K экраны и VIP атмосфера в отеле VistaMare.",
      primaryCta: "ЗАБРОНИРОВАТЬ",
      secondaryCta: "ОТКРЫТЬ АРЕНУ",
      monaTag: "Мона • Официальный амбассадор Bazino",
    },
    customizer: {
      index: "ГЛАВА 02 / КОНФИГУРАТОР СТАНЦИИ",
      title: "СОЗДАЙ СВОЙ ИГРОВОЙ ВЕЧЕР.",
      subtitle: "Выбирайте консоль, неоновую подсветку и сервис в реальном времени.",
      lightingLabel: "НЕОНОВАЯ ПОДСВЕТКА",
      consoleLabel: "КОНСОЛЬ",
      audioLabel: "АУДИО РЕЖИМ",
      hospitalityLabel: "СЕРВИС К СТАНЦИИ",
    },
    bracket: {
      index: "ГЛАВА 03 / СИГНАЛ ТУРНИРОВ",
      title: "ЖИВАЯ ТУРНИРНАЯ СЕТКА.",
      subtitle: "Еженедельные турниры на выбывание с денежными призами и трансляцией.",
      liveBadge: "32 ИГРОКА • СУББОТА 20:00",
      viewBracket: "СЕТКА ТУРНИРА",
    },
    telemetry: {
      index: "ГЛАВА 04 / ТЕЛЕМЕТРИЯ И РАДАР",
      title: "ПОДТВЕРЖДЕННЫЕ СИГНАЛЫ.",
      subtitle: "Статистика матчей, радар сканирования клуба и ультранизкий пинг.",
      radarLabel: "РАДАР СКАНИРОВАНИЯ АРЕНЫ",
      verifiedBadge: "ОФИЦИАЛЬНЫЕ ДАННЫЕ",
      rows: [
        { round: "РАУНД 07", match: "ArmanK против Mahan10", score: "5 — 3", mode: "ГРАНД-ФИНАЛ FC 26" },
        { round: "РАУНД 06", match: "Kasra против RezaB", score: "3 — 1", mode: "ПОЛУФИНАЛ UFC 5" },
        { round: "РАУНД 05", match: "NimaPro против AliGameR", score: "4 — 2", mode: "ФИНАЛ TEKKEN 8" },
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
        { num: "01", title: "ВЫБЕРИТЕ СТАНЦИЮ", desc: "PS5 Haptic, Xbox Series X или 85\" VIP Зал." },
        { num: "02", title: "ЗАБРОНИРУЙТЕ", desc: "Мгновенный код брони — оплата на ресепшн." },
        { num: "03", title: "НАЧНИТЕ ИГРУ", desc: "Приходите с друзьями, берите геймпады и побеждайте." },
      ],
    },
    visit: {
      index: "ГЛАВА 07 / ЛОКАЦИЯ И ЦИФРОВАЯ КАРТА",
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
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  // ── INTERACTIVE SANDBOX CUSTOMIZER STATE (AuthKit Style) ─────────
  const [activeLighting, setActiveLighting] = useState<"gold" | "cyan" | "magenta" | "emerald">("gold");
  const [activeConsole, setActiveConsole] = useState<"ps5" | "xbox" | "focus85">("ps5");
  const [activeAudio, setActiveAudio] = useState<"spatial" | "dolby">("spatial");
  const [vipCafeActive, setVipCafeActive] = useState(true);

  // ── HERO 3D CARD STACK STATE ────────────────────────────────────
  const [heroStackIndex, setHeroStackIndex] = useState(0);

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

  const heroStackCards = [
    { id: "ps5", title: "PS5 HAPTIC BAY", badge: "85\" 4K 120Hz", spec: "DualSense Pro • 12ms Ping", image: gamesAdults, color: "#ffc400" },
    { id: "xbox", title: "XBOX SERIES X", badge: "GAME PASS ULTIMATE", spec: "12 TFLOPS • Quick Resume", image: slideFc26, color: "#35a9ff" },
    { id: "vip", title: "VIP STADIUM FOCUS", badge: "PRIVATE ACOUSTIC", spec: "Dolby Atmos • Leather Recliner", image: slideMatch, color: "#ff2db0" },
  ];

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
      {/* ── TOP VOLUMETRIC SPOTLIGHT BEAM (AuthKit / 3D Dark UI) ──── */}
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
          <a href="#arena">{t.nav.arena}</a>
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
            <a href="#arena" onClick={() => setMobileMenuOpen(false)}>{t.nav.arena}</a>
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
            CHAPTER 01: HERO — REAL BAZINO ARENA + MONA + 3D STACK
        ════════════════════════════════════════════════════════════ */}
        <section id="top" className="max-w-7xl mx-auto px-6 pt-6 pb-24 relative z-10">
          <div className="relative rounded-[36px] overflow-hidden border border-white/12 bg-[#0a0d14] p-8 sm:p-14 lg:p-16 min-h-[85vh] flex flex-col justify-between shadow-2xl">
            {/* Background: Real Bazino Game Net + Mona */}
            <div className="absolute inset-0 z-0">
              <img
                src={monaHeroWide}
                alt="Bazino Arena Lounge & Mona"
                className="w-full h-full object-cover object-right-top sm:object-center opacity-35 filter saturate-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d14] via-[#0a0d14]/40 to-transparent" />
            </div>

            {/* Technical Crosshairs & Top HUD */}
            <div className="crosshair-corner crosshair-tl" />
            <div className="crosshair-corner crosshair-tr" />
            <div className="crosshair-corner crosshair-bl" />
            <div className="crosshair-corner crosshair-br" />

            <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 border-b border-white/10 pb-6">
              <div className="editorial-index">
                <span>{t.hero.kicker}</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-orbitron font-bold text-gray-400">
                <span className="flex items-center gap-1.5 text-[#ffc400] bg-black/40 px-3 py-1 rounded-full border border-[#ffc400]/30">
                  <Sparkles size={13} />
                  <span>{t.hero.monaTag}</span>
                </span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
                  OPEN NOW
                </span>
              </div>
            </div>

            {/* Main Headline & 3D Interactive Card Stack (AuthKit Style) */}
            <div className="relative z-10 my-12 grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline */}
              <div className="lg:col-span-7">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-orbitron uppercase text-white tracking-tight leading-[1.05] mb-6">
                  {t.hero.titleLine1}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc400] via-[#ffd700] to-[#35a9ff]">
                    {t.hero.titleLine2}
                  </span>
                </h1>

                <p className="text-gray-300 text-base sm:text-xl font-normal leading-relaxed max-w-xl mb-10">
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

              {/* Right Column: Interactive 3D Stack (AuthKit Cover-Flow) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm h-72 perspective-container">
                  {heroStackCards.map((card, idx) => {
                    const offset = idx - heroStackIndex;
                    const isActive = idx === heroStackIndex;
                    return (
                      <motion.div
                        key={card.id}
                        onClick={() => setHeroStackIndex(idx)}
                        animate={{
                          x: offset * 24,
                          y: offset * -12,
                          z: offset * -40,
                          scale: 1 - Math.abs(offset) * 0.08,
                          opacity: 1 - Math.abs(offset) * 0.25,
                          rotateZ: offset * 3,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-xl border ${
                          isActive
                            ? "bg-[#101420]/95 border-[#ffc400]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,196,0,0.25)] z-30"
                            : "bg-[#0b0e16]/80 border-white/10 z-10"
                        }`}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-35"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-[#0e121a]/60 to-transparent" />

                        <div className="relative z-10 flex justify-between items-center">
                          <span className="mono-tag text-[#ffc400] bg-black/60 px-3 py-1 rounded-full border border-white/10">
                            {card.badge}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-xl font-black font-orbitron text-white mb-1">{card.title}</h3>
                          <p className="text-xs text-gray-300 font-medium">{card.spec}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Stack Switcher Pill Buttons */}
                <div className="flex gap-2 mt-6 bg-[#0e121a] border border-white/10 p-1 rounded-full">
                  {heroStackCards.map((c, idx) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setHeroStackIndex(idx)}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-orbitron font-bold transition-all ${
                        heroStackIndex === idx
                          ? "bg-[#ffc400] text-[#07080c]"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {c.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom 3 Live Pillars */}
            <div className="relative z-10 grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="mono-tag text-[#ffc400] mb-1">STATION FLEET</div>
                <div className="text-xl font-black font-orbitron text-white">۱۲ جایگاه فعال PS5 & XBOX</div>
              </div>
              <div>
                <div className="mono-tag text-[#35a9ff] mb-1">PRO ESPORTS WALL</div>
                <div className="text-xl font-black font-orbitron text-white">نمایشگرهای ۸۵ اینچ 4K 120Hz</div>
              </div>
              <div>
                <div className="mono-tag text-gray-400 mb-1">VIP HOSPITALITY</div>
                <div className="text-xl font-black font-orbitron text-white">سرویس اختصاصی کافه در جایگاه</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 02: INTERACTIVE CUSTOMIZER WORKBENCH (AuthKit Style)
        ════════════════════════════════════════════════════════════ */}
        <section id="customizer" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="editorial-index mb-3">
                <span>{t.customizer.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight">
                {t.customizer.title}
              </h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-md">
              {t.customizer.subtitle}
            </p>
          </div>

          {/* Interactive Configurator Sandbox Canvas */}
          <div className="customizer-workbench p-8 sm:p-12">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Controls Toolbar */}
              <div className="lg:col-span-5 space-y-6">
                {/* 1. Neon Lighting Color Picker */}
                <div className="bg-[#111622] border border-white/08 rounded-2xl p-5">
                  <span className="mono-tag text-gray-400 block mb-3">{t.customizer.lightingLabel}</span>
                  <div className="flex gap-3">
                    {[
                      { id: "gold", color: "#ffc400", label: "Gold" },
                      { id: "cyan", color: "#35a9ff", label: "Cyan" },
                      { id: "magenta", color: "#ff2db0", label: "Magenta" },
                      { id: "emerald", color: "#10b981", label: "Emerald" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveLighting(item.id as any)}
                        style={{ backgroundColor: item.color }}
                        className={`w-9 h-9 rounded-xl transition-all ${
                          activeLighting === item.id
                            ? "ring-4 ring-white/30 scale-110 shadow-lg"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 2. Console Model Selector */}
                <div className="bg-[#111622] border border-white/08 rounded-2xl p-5">
                  <span className="mono-tag text-gray-400 block mb-3">{t.customizer.consoleLabel}</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "ps5", label: "PS5 HAPTIC" },
                      { id: "xbox", label: "XBOX SERIES X" },
                      { id: "focus85", label: "85\" STADIUM" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveConsole(item.id as any)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-orbitron font-bold transition-all ${
                          activeConsole === item.id
                            ? "bg-[#ffc400] text-[#07080c] shadow-lg shadow-[#ffc400]/20"
                            : "bg-white/04 text-gray-400 hover:text-white border border-white/06"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Audio & VIP Toggles */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#111622] border border-white/08 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <span className="mono-tag text-gray-400 block mb-1">AUDIO</span>
                      <span className="text-xs font-orbitron font-bold text-white">
                        {activeAudio === "spatial" ? "3D SPATIAL" : "DOLBY ATMOS"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveAudio(activeAudio === "spatial" ? "dolby" : "spatial")}
                      className="p-2 rounded-lg bg-white/05 hover:bg-white/10 text-[#ffc400]"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>

                  <div className="bg-[#111622] border border-white/08 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <span className="mono-tag text-gray-400 block mb-1">VIP CAFE</span>
                      <span className="text-xs font-orbitron font-bold text-white">
                        {vipCafeActive ? "INCLUDED" : "OPTIONAL"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVipCafeActive(!vipCafeActive)}
                      className={`p-2 rounded-lg transition-colors ${
                        vipCafeActive ? "bg-[#ffc400] text-[#07080c]" : "bg-white/05 text-gray-400"
                      }`}
                    >
                      <Coffee size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Live Preview Card (Reactively Updates) */}
              <div className="lg:col-span-7">
                <TiltCard
                  className={`editorial-card p-8 min-h-[460px] flex flex-col justify-between transition-all duration-500 border-2 ${getLightingGlow()}`}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={
                        activeConsole === "ps5"
                          ? gamesAdults
                          : activeConsole === "xbox"
                          ? slideFc26
                          : slideMatch
                      }
                      alt="Selected Station"
                      className="w-full h-full object-cover opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-[#0e121a]/60 to-transparent" />
                  </div>

                  <div className="relative z-10 flex justify-between items-center">
                    <span className="mono-tag text-white bg-black/60 px-3 py-1 rounded-full border border-white/10">
                      LIVE PREVIEW
                    </span>
                    <span className="mono-tag text-[#ffc400] font-black">
                      {activeConsole === "ps5" ? "4K 120HZ • DUALSENSE" : activeConsole === "xbox" ? "12 TFLOPS • ELITE" : "85\" DOLBY ATMOS"}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeLighting === "gold" ? "#ffc400" : activeLighting === "cyan" ? "#35a9ff" : activeLighting === "magenta" ? "#ff2db0" : "#10b981" }} />
                      <span className="mono-tag text-gray-300">CONFIGURED BAY READY</span>
                    </div>
                    <h3 className="text-3xl font-black font-orbitron text-white mb-2">
                      {activeConsole === "ps5" ? "PS5 Haptic Arena Bay" : activeConsole === "xbox" ? "Xbox Series X Pro Bay" : "85\" Stadium VIP Suite"}
                    </h3>
                    <p className="text-gray-300 text-sm max-w-md mb-6">
                      {activeConsole === "ps5"
                        ? "فیدبک هپتیک پیشرفته نسل ۹ با دسته‌های DualSense Pro و نمایشگر اختصاصی ۸۵ اینچ 4K."
                        : activeConsole === "xbox"
                        ? "قدرت پردازش فوق‌العاده با حافظه سریع NVMe و آرشیو کامل اشتراک Game Pass Ultimate."
                        : "نمایشگر سینمایی ۸۵ اینچ با زاویه دید بهینه و صدای محیطی دالبی اتموس."}
                    </p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div>
                        <div className="mono-tag text-gray-400">STATUS</div>
                        <div className="text-sm font-bold font-orbitron text-white">IMMEDIATE AVAILABILITY</div>
                      </div>
                      <a href={reservationUrl} className="btn-gold-action">
                        <span>رزرو این استیشن ↗</span>
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 03: LIVE TOURNAMENT BRACKETS & FEED
        ════════════════════════════════════════════════════════════ */}
        <section id="tournaments" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="editorial-index mb-3">
                <span>{t.bracket.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight">
                {t.bracket.title}
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-[#111622] border border-[#ffc400]/40 rounded-full px-5 py-2 text-xs font-orbitron">
              <Trophy size={16} className="text-[#ffc400]" />
              <span className="text-white font-bold">{t.bracket.liveBadge}</span>
            </div>
          </div>

          {/* Tournament Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tournamentGames.map((game) => (
              <TiltCard key={game.title} className="editorial-card p-6 min-h-[400px] flex flex-col justify-between group">
                <div className="absolute inset-0 z-0">
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-[#0e121a]/50 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <span className="mono-tag text-[#35a9ff] bg-black/60 px-2.5 py-1 rounded-full border border-white/10">{game.genre}</span>
                  <span className="mono-tag text-[#ffc400] font-black">{game.prize}</span>
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center text-xs font-orbitron text-gray-300 mb-2">
                    <span>{game.time}</span>
                    <span className="text-[#00e5ff] font-bold">{game.activePlayers}</span>
                  </div>
                  <h3 className="text-lg font-black font-orbitron text-white mb-4">{game.title}</h3>
                  <Link href="/hub/events/brackets" className="btn-ghost-action w-full justify-between">
                    <span>{t.bracket.viewBracket}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 04: TELEMETRY & LIVE RADAR SCOREBOARD
        ════════════════════════════════════════════════════════════ */}
        <section id="arena" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Telemetry & Radar Widget */}
            <div className="lg:col-span-5">
              <div className="editorial-index mb-3">
                <span>{t.telemetry.index}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-orbitron text-white tracking-tight mb-6">
                {t.telemetry.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                {t.telemetry.subtitle}
              </p>

              {/* Rotating Radar Widget (AuthKit Style) */}
              <div className="bg-[#101420] border border-white/10 rounded-2xl p-6 flex items-center gap-6">
                <div className="relative w-20 h-20 rounded-full border border-[#00e5ff]/40 flex items-center justify-center shrink-0 overflow-hidden">
                  <div className="radar-sweep-beam" />
                  <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                  <div className="absolute top-3 right-4 w-1.5 h-1.5 rounded-full bg-[#ffc400]" />
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[#ff2db0]" />
                </div>
                <div>
                  <div className="mono-tag text-[#00e5ff] mb-1">{t.telemetry.radarLabel}</div>
                  <div className="text-sm font-bold font-orbitron text-white">ALL 12 BAYS ONLINE</div>
                  <div className="text-xs text-gray-400">LATENCY: 12ms • ZERO DROPPED FRAMES</div>
                </div>
              </div>
            </div>

            {/* Right Column: Scoreboard Ledger */}
            <div className="lg:col-span-7">
              <div className="editorial-card p-6 sm:p-8">
                <div className="flex justify-between items-center text-xs font-orbitron text-gray-400 border-b border-white/10 pb-4 mb-4">
                  <span className="flex items-center gap-2 text-[#ffc400]">
                    <Zap size={14} className="text-[#00e5ff]" />
                    RECENT ROUND TELEMETRY
                  </span>
                  <span className="text-[#35a9ff]">{t.telemetry.verifiedBadge}</span>
                </div>

                <div className="divide-y divide-white/06">
                  {t.telemetry.rows.map((row) => (
                    <div key={row.round} className="py-4 flex items-center justify-between font-orbitron">
                      <div className="flex items-center gap-3">
                        <span className="mono-tag text-[#35a9ff]">{row.round}</span>
                        <div>
                          <div className="text-sm font-bold text-white">{row.match}</div>
                          <div className="text-[10px] text-gray-500">{row.mode}</div>
                        </div>
                      </div>

                      <div className="text-lg font-black text-[#ffc400] bg-black/40 border border-white/10 px-3.5 py-1 rounded-lg">
                        {row.score}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center text-[11px] font-orbitron text-gray-400">
                  <span>NEXT BROADCAST: SATURDAY 20:00</span>
                  <span className="text-[#ffc400]">HOTEL VISTAMARE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 05: NIGHT LOUNGE & CAFE
        ════════════════════════════════════════════════════════════ */}
        <section id="lounge" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Lounge Photo Box */}
            <div className="lg:col-span-6">
              <TiltCard className="editorial-card overflow-hidden aspect-[4/3] group">
                <img
                  src={slideCity}
                  alt="Night Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <div className="mono-tag text-[#ffc400] mb-1">ISKELE NIGHT VIBE</div>
                    <div className="text-lg font-bold text-white">Hotel VistaMare Lounge</div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Lounge Amenities */}
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
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
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
            {t.entry.steps.map((step) => (
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
            <a href={reservationUrl} className="btn-gold-action">
              <span>{lang === "fa" ? "رزرو آنلاین جایگاه" : "RESERVE YOUR SPOT"}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTER 07: LOCATION & DIGITAL MEMBERSHIP PASS
        ════════════════════════════════════════════════════════════ */}
        <section id="visit" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
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
                className="btn-ghost-action"
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
      <footer className="max-w-7xl mx-auto px-6 border-t border-white/10 py-12">
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
