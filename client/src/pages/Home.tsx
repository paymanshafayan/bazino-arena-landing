import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Gamepad2,
  Tv,
  Monitor,
  Trophy,
  Sparkles,
  Zap,
  Radio,
  Flame,
  Award,
  Crown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Play,
  Sword,
  Users,
  Eye,
  Layers
} from "lucide-react";

import monaHeroWide from "/assets/mona-hero-wide.png";
import heroSetup from "/assets/hero-setup.jpg";
import heroPlayer from "/assets/hero-player.jpg";
import gamesGear from "/assets/games-gear.jpg";
import slideFc26 from "/assets/fc26.png";
import slideTekken8 from "/assets/tekken8.png";
import slideMk1 from "/assets/mk1.png";
import slideUfc5 from "/assets/ufc5.png";
import avatarArman from "/assets/avatar-armank.jpg";

interface SpatialDeckCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  badgeColor: "gold" | "cyan" | "crimson";
  image: string;
  specs: string[];
  rate: string;
  actionText: string;
}

const CARDS: SpatialDeckCard[] = [
  {
    id: "lounge",
    title: "سالن اصلی گیم‌نت بازینو",
    subtitle: "اتمسفر لوکس نسل نهم با کنسول‌های PS5 Pro، نورپردازی نئونی و حضور مونا",
    category: "BAZINO MAIN LOUNGE",
    badge: "360° SPATIAL VIEW",
    badgeColor: "gold",
    image: monaHeroWide,
    specs: ["۴۲ ایستگاه فعال", "کاناپه‌های چرمی VIP", "سیستم صوتی سه‌بعدی"],
    rate: "فضای اختصاصی",
    actionText: "رزرو جایگاه در سالن"
  },
  {
    id: "fc26",
    title: "EA SPORTS FC 26",
    subtitle: "جدیدترین نسخه شبیه‌ساز فوتبال با موتور هایپرموشن و مسابقات هفتگی",
    category: "SPORTS & TOURNAMENT",
    badge: "۱۴ کنسول فعال",
    badgeColor: "cyan",
    image: slideFc26,
    specs: ["رزولوشن 4K / 120Hz", "تورنمنت جمعه‌ها", "دسته‌های DualSense Edge"],
    rate: "۵۰ ₺ / ساعت",
    actionText: "رزرو کنسول FC26"
  },
  {
    id: "ps5pods",
    title: "ایستگاه‌های PS5 Pro VIP",
    subtitle: "تلویزیون‌های ۶۵ اینچ OLED با رفرش‌ریت ۱۲۰ هرتز و بازی‌های لایسنس‌شده کامل",
    category: "CONSOLE ZONE",
    badge: "OLED HDR 120FPS",
    badgeColor: "gold",
    image: heroSetup,
    specs: ["تلویزیون 65\" OLED", "صدای فراگیر Pulse", "پذیرایی اختصاصی"],
    rate: "۵۰ ₺ / ساعت",
    actionText: "رزرو استگاه VIP"
  },
  {
    id: "pcrigs",
    title: "ریگ‌های مسابقاتی RTX 4090",
    subtitle: "سیستم‌های گیمینگ بتل‌استیشن با مانیتورهای ۲۴۰ هرتز ZOWIE و پینگ تک‌رقمی",
    category: "ESPORTS ARENA",
    badge: "240HZ PRO GEAR",
    badgeColor: "cyan",
    image: heroPlayer,
    specs: ["پردازنده RTX 4090", "کیبورد مکانیکی Razer", "اینترنت فیبر نوری"],
    rate: "۶۵ ₺ / ساعت",
    actionText: "رزرو سیستم PC"
  },
  {
    id: "tekken8",
    title: "TEKKEN 8 & MORTAL KOMBAT 1",
    subtitle: "مبارزات حرفه‌ای با فایت‌استیک‌های آرکید سفارشی و رندرهای آنریل ۵",
    category: "PRO FIGHTING",
    badge: "ARCADE BATTLE",
    badgeColor: "crimson",
    image: slideTekken8,
    specs: ["فایت‌استیک آرکید", "لابی مبارزات کلاب", "فینیشرهای 4K"],
    rate: "۵۰ ₺ / ساعت",
    actionText: "ورود به لابی مبارزه"
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-[#ffc400] selection:text-black overflow-x-hidden font-sans">
      
      {/* Overhead Conical Spotlight (AuthKit Aesthetic) */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 90% 50% at 50% -10%, rgba(255, 196, 0, 0.15) 0%, rgba(0, 210, 255, 0.08) 40%, transparent 80%)"
        }}
      />

      {/* Cyber Grid Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        
        {/* Floating Spatial Header */}
        <header className="flex items-center justify-between h-20 px-6 sm:px-8 rounded-2xl bg-[#0c101a]/70 backdrop-blur-2xl border border-white/10 shadow-2xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffc400]/30 to-[#00d2ff]/30 border border-[#ffc400] flex items-center justify-center shadow-[0_0_20px_rgba(255,196,0,0.4)]">
              <Gamepad2 className="w-6 h-6 text-[#ffc400]" />
            </div>
            <div>
              <div className="font-['Orbitron'] font-black text-2xl tracking-wider bg-gradient-to-r from-white via-[#ffc400] to-[#00d2ff] bg-clip-text text-transparent">
                BAZINO
              </div>
              <div className="font-['Rajdhani'] text-[11px] font-bold text-[#00d2ff] tracking-widest uppercase">
                3D SPATIAL LOUNGE
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <a href="#hero" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black font-extrabold text-sm shadow-[0_0_20px_rgba(255,196,0,0.4)] flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> کاوش ۳ بعدی
            </a>
            <a href="#games" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-sm transition-all flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" /> بازی‌ها
            </a>
            <a href="#pods" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-sm transition-all flex items-center gap-2">
              <Tv className="w-4 h-4" /> کنسول‌های PS5 Pro
            </a>
            <a href="#tournaments" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-sm transition-all flex items-center gap-2">
              <Trophy className="w-4 h-4" /> مسابقات
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] font-['Rajdhani'] font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88] animate-pulse" />
              <span>۳۸ / ۴۲ کنسول آنلاین</span>
            </div>
            <button 
              onClick={() => alert("🎮 رزرو سریع: سیستم و جایگاه شما ثبت شد. مونا اطلاعات ستاپ را برای شما ارسال می‌کند.")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black font-extrabold text-sm shadow-[0_4px_20px_rgba(255,196,0,0.5)] hover:shadow-[0_6px_28px_rgba(255,196,0,0.7)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>رزرو جایگاه</span>
            </button>
          </div>
        </header>

        {/* =========================================================
           AUTHKIT-INSPIRED 3D SPATIAL HERO SECTION
           ========================================================= */}
        <section 
          id="hero"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative min-h-[680px] flex flex-col items-center justify-center pt-8 pb-12 select-none"
          style={{ perspective: 1200 }}
        >
          {/* Hero Typography */}
          <div className="text-center max-w-3xl mx-auto mb-8 relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffc400]/10 border border-[#ffc400]/30 text-[#ffc400] text-xs font-extrabold mb-4 shadow-[0_0_20px_rgba(255,196,0,0.2)]">
              <Compass className="w-4 h-4" />
              <span>کاوش تعاملی سه‌بعدی سالن گیم‌نت بازینو</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-4">
              اگه یه قهرمانی، <br />
              <span className="bg-gradient-to-r from-white via-[#ffd700] to-[#ff9900] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,196,0,0.5)]">
                این آخرشه.
              </span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
              ماوس خود را حرکت دهید تا پرسپکتیو سه‌بعدی سالن را کنترل کنید یا برای بازدید از بخش‌های مختلف، کارت‌ها را انتخاب نمایید.
            </p>
          </div>

          {/* 3D Multi-Card Carousel Deck (Framer Motion) */}
          <motion.div 
            className="relative w-full max-w-4xl h-[420px] sm:h-[480px] flex items-center justify-center my-4"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {CARDS.map((card, idx) => {
              // Calculate offset relative to active index
              const offset = (idx - activeIndex + CARDS.length) % CARDS.length;
              let normalizedOffset = offset;
              if (normalizedOffset > CARDS.length / 2) {
                normalizedOffset -= CARDS.length;
              }

              const isCenter = normalizedOffset === 0;
              const isImmediateLeft = normalizedOffset === -1;
              const isImmediateRight = normalizedOffset === 1;
              const isVisible = Math.abs(normalizedOffset) <= 2;

              if (!isVisible) return null;

              // Compute 3D translations & rotations
              const translateX = normalizedOffset * (window.innerWidth < 640 ? 120 : 220);
              const translateZ = -Math.abs(normalizedOffset) * 140;
              const cardRotateY = normalizedOffset * -15;
              const scale = 1 - Math.abs(normalizedOffset) * 0.15;
              const opacity = 1 - Math.abs(normalizedOffset) * 0.35;
              const zIndex = 30 - Math.abs(normalizedOffset) * 10;

              return (
                <motion.div
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: cardRotateY,
                    scale,
                    opacity
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 22
                  }}
                  className={`absolute w-[290px] sm:w-[380px] h-[380px] sm:h-[450px] rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer backdrop-blur-2xl border transition-colors duration-300 ${
                    isCenter
                      ? "bg-[#0d1220]/90 border-[#ffc400]/50 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(255,196,0,0.25)] ring-1 ring-[#ffc400]/30"
                      : "bg-[#090d16]/80 border-white/10 hover:border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  }`}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Top HUD */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-['Rajdhani'] font-bold text-xs tracking-wider text-[#00d2ff] bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                      {card.category}
                    </span>
                    <span className={`font-['Orbitron'] font-extrabold text-[11px] px-2.5 py-1 rounded-lg border ${
                      card.badgeColor === "gold" 
                        ? "bg-[#ffc400]/20 border-[#ffc400] text-[#ffc400]" 
                        : card.badgeColor === "cyan" 
                        ? "bg-[#00d2ff]/20 border-[#00d2ff] text-[#00d2ff]" 
                        : "bg-[#ff2a5f]/20 border-[#ff2a5f] text-[#ff2a5f]"
                    }`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Image Backdrop inside Card */}
                  <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden my-3 border border-white/10 bg-black/50">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Card Bottom Content */}
                  <div className="z-10">
                    <h3 className="font-black text-lg sm:text-xl text-white mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                      {card.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="font-['Rajdhani'] font-bold text-sm text-[#ffc400]">
                        {card.rate}
                      </span>
                      {isCenter ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`🎮 ${card.actionText} انجام شد!`);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black font-black text-xs shadow-[0_0_15px_rgba(255,196,0,0.5)] active:scale-95 transition-all cursor-pointer"
                        >
                          {card.actionText}
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                          کلیک برای انتخاب <ChevronLeft className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Interactive Pill Selector (AuthKit Bottom Switcher) */}
          <div className="relative z-20 flex items-center gap-2 p-1.5 rounded-full bg-[#0d1220]/80 backdrop-blur-xl border border-white/15 shadow-2xl mt-4 max-w-full overflow-x-auto">
            <button 
              onClick={prevCard} 
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {CARDS.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeIndex === idx
                    ? "bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black shadow-[0_0_15px_rgba(255,196,0,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{c.title.split(" ")[0]}</span>
              </button>
            ))}

            <button 
              onClick={nextCard} 
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </section>

        {/* =========================================================
           3D GAME ROSTER GALLERY
           ========================================================= */}
        <section id="games" className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-2">
                <Gamepad2 className="w-8 h-8 text-[#ffc400]" /> بازی‌های برتر کلاب بازینو
              </h2>
              <p className="text-slate-400 text-sm">عناوین لایسنس‌شده رسمی بر روی کنسول‌های PS5 Pro و ستاپ‌های اختصاصی</p>
            </div>
            <a href="#hero" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all">
              ورق زدن در هیرو سه‌بعدی
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Game 1: FC 26 */}
            <div 
              onClick={() => { setActiveIndex(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative h-[440px] rounded-3xl bg-[#0c101a]/80 border border-white/10 hover:border-[#ffc400] overflow-hidden p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(255,196,0,0.3)]"
            >
              <img src={slideFc26} alt="FC 26" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-['Rajdhani'] font-bold text-xs bg-black/70 px-3 py-1 rounded-lg border border-white/10 text-[#00d2ff]">
                  SPORTS & CUP
                </span>
                <Trophy className="w-5 h-5 text-[#ffc400]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-1">EA SPORTS FC 26</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  شبیه‌ساز نسل جدید فوتبال با موتور هایپرموشن و مسابقات قهرمانی هفتگی بازینو.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-['Rajdhani'] font-bold text-sm text-[#ffc400]">۱۴ کنسول فعال</span>
                  <button className="px-3 py-1.5 rounded-lg bg-[#ffc400] text-black font-black text-xs">
                    انتخاب
                  </button>
                </div>
              </div>
            </div>

            {/* Game 2: Tekken 8 */}
            <div 
              onClick={() => { setActiveIndex(4); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative h-[440px] rounded-3xl bg-[#0c101a]/80 border border-white/10 hover:border-[#00d2ff] overflow-hidden p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,210,255,0.3)]"
            >
              <img src={slideTekken8} alt="Tekken 8" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-['Rajdhani'] font-bold text-xs bg-black/70 px-3 py-1 rounded-lg border border-white/10 text-[#ffc400]">
                  PRO FIGHTING
                </span>
                <Flame className="w-5 h-5 text-[#ff2a5f]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-1">TEKKEN 8</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  مبارزات نفس‌گیر با موتور آنریل انجین ۵، فایت‌استیک‌های اختصاصی و صدای فراگیر.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-['Rajdhani'] font-bold text-sm text-[#00d2ff]">۸ کنسول فعال</span>
                  <button className="px-3 py-1.5 rounded-lg bg-[#00d2ff] text-black font-black text-xs">
                    انتخاب
                  </button>
                </div>
              </div>
            </div>

            {/* Game 3: Mortal Kombat 1 */}
            <div 
              onClick={() => { setActiveIndex(4); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative h-[440px] rounded-3xl bg-[#0c101a]/80 border border-white/10 hover:border-[#ff2a5f] overflow-hidden p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(255,42,95,0.3)]"
            >
              <img src={slideMk1} alt="Mortal Kombat 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-['Rajdhani'] font-bold text-xs bg-black/70 px-3 py-1 rounded-lg border border-white/10 text-[#ff2a5f]">
                  KOMBAT ARENA
                </span>
                <Sword className="w-5 h-5 text-[#ff2a5f]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-1">MORTAL KOMBAT 1</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  فینیشرهای سینمایی 4K با سیستم کامئو و لابی اختصاصی رقابت‌های کلاب.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-['Rajdhani'] font-bold text-sm text-[#ffc400]">۶ کنسول فعال</span>
                  <button className="px-3 py-1.5 rounded-lg bg-[#ffc400] text-black font-black text-xs">
                    انتخاب
                  </button>
                </div>
              </div>
            </div>

            {/* Game 4: UFC 5 */}
            <div 
              onClick={() => { setActiveIndex(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative h-[440px] rounded-3xl bg-[#0c101a]/80 border border-white/10 hover:border-[#00d2ff] overflow-hidden p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,210,255,0.3)]"
            >
              <img src={slideUfc5} alt="UFC 5" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-['Rajdhani'] font-bold text-xs bg-black/70 px-3 py-1 rounded-lg border border-white/10 text-[#00d2ff]">
                  MMA FIGHT
                </span>
                <ShieldCheck className="w-5 h-5 text-[#00d2ff]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-1">EA SPORTS UFC 5</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  شبیه‌سازی واقعی مبارزات قفس MMA با آسیب‌دیدگی‌های بلادرنگ و فیزیک واقع‌گرایانه.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-['Rajdhani'] font-bold text-sm text-[#00d2ff]">۱۰ کنسول فعال</span>
                  <button className="px-3 py-1.5 rounded-lg bg-[#00d2ff] text-black font-black text-xs">
                    انتخاب
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
           REAL HARDWARE & LOUNGE SETUP
           ========================================================= */}
        <section id="pods" className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-2">
                <Tv className="w-8 h-8 text-[#00d2ff]" /> سالن‌ها و ستاپ‌های واقعی بازینو
              </h2>
              <p className="text-slate-400 text-sm">تصاویر واقعی از اتمسفر کلاب، تجهیزات نئونی و سالن‌های اختصاصی</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="relative h-[380px] rounded-3xl bg-[#0c101a]/80 border border-white/10 hover:border-[#ffc400] overflow-hidden p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img src={heroSetup} alt="PS5 Setup" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
              
              <div className="relative z-10 flex justify-between items-center">
                <span className="font-['Rajdhani'] font-bold text-xs bg-black/70 px-3 py-1 rounded-lg border border-white/10 text-[#ffc400]">
                  PS5 PRO VIP
                </span>
                <Tv className="w-5 h-5 text-[#ffc400]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-1">ایستگاه‌های PS5 Pro</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                  تلویزیون‌های ۶۵ اینچ OLED 120Hz، دسته‌های DualSense Edge و کاناپه‌های چرمی VIP.
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="font-['Rajdhani'] font-bold text-sm text-[#ffc400]">۵۰ ₺ / ساعت</span>
                  <button onClick={() => alert("🎮 رزرو استگاه PS5 Pro ثبت شد.")} className="px-3.5 py-1.5 rounded-lg bg-[#ffc400] text-black font-black text-xs">
                    رزرو
                  </button>
                </div>
              </div>
            </div>

            <div className="relative h-[380px] rounded-3xl bg-[#0c101a]/80 border border-white/10 hover:border-[#00d2ff] overflow-hidden p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img src={heroPlayer} alt="RTX 4090 Rigs" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
              
              <div className="relative z-10 flex justify-between items-center">
                <span className="font-['Rajdhani'] font-bold text-xs bg-black/70 px-3 py-1 rounded-lg border border-white/10 text-[#00d2ff]">
                  ESPORTS RIGS
                </span>
                <Monitor className="w-5 h-5 text-[#00d2ff]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-1">ریگ‌های بتل‌استیشن RTX 4090</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                  مانیتورهای ۲۴۰ هرتز ZOWIE، کیبوردهای مکانیکی ریزر و پینگ تک‌رقمی اختصاصی.
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="font-['Rajdhani'] font-bold text-sm text-[#00d2ff]">۶۵ ₺ / ساعت</span>
                  <button onClick={() => alert("⚡ رزرو ریگ PC ثبت شد.")} className="px-3.5 py-1.5 rounded-lg bg-[#00d2ff] text-black font-black text-xs">
                    رزرو
                  </button>
                </div>
              </div>
            </div>

            <div className="relative h-[380px] rounded-3xl bg-[#0c101a]/80 border border-white/10 hover:border-[#ffc400] overflow-hidden p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img src={gamesGear} alt="VIP Room" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent" />
              
              <div className="relative z-10 flex justify-between items-center">
                <span className="font-['Rajdhani'] font-bold text-xs bg-black/70 px-3 py-1 rounded-lg border border-white/10 text-[#ffc400]">
                  VIP PRIVATE
                </span>
                <Crown className="w-5 h-5 text-[#ffc400]" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-1">اتاق خصوصی VIP & استریم</h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                  فضای عایق صوتی برای گروه‌های ۴ تا ۸ نفره به همراه سیستم ضبط و پخش زنده.
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="font-['Rajdhani'] font-bold text-sm text-[#ffc400]">۱۵۰ ₺ / ساعت</span>
                  <button onClick={() => alert("👑 رزرو سالن خصوصی VIP ثبت شد.")} className="px-3.5 py-1.5 rounded-lg bg-[#ffc400] text-black font-black text-xs">
                    رزرو
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
           LIVE TOURNAMENT ARENA
           ========================================================= */}
        <section id="tournaments" className="mt-24 rounded-3xl bg-gradient-to-br from-[#0e1322] to-[#250d18] border border-[#ff2a5f]/40 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(255,42,95,0.2)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2a5f]/20 border border-[#ff2a5f] text-[#ff2a5f] font-['Orbitron'] font-extrabold text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#ff2a5f] animate-ping" />
                  <span>LIVE MATCH</span>
                </div>
                <span className="font-['Orbitron'] text-xs text-slate-400 font-bold">BAZINO CUP • FINALS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">فینال بزرگ تورنمنت FC26 بازینو</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                پخش زنده رقابت فینالیست‌ها در سالن اصلی و اهدای کمربند قهرمانی به همراه جایزه ۵,۰۰۰ لیر به قهرمان فصل.
              </p>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-black/50 border border-white/10">
                <div className="flex items-center gap-3">
                  <img src={avatarArman} alt="Arman" className="w-12 h-12 rounded-full border-2 border-[#ffc400] object-cover" />
                  <div>
                    <div className="font-black text-sm text-white">Arman_Pro</div>
                    <div className="font-['Rajdhani'] text-xs text-[#00d2ff]">REAL MADRID (ESP)</div>
                  </div>
                </div>

                <div className="font-['Orbitron'] font-black text-2xl text-[#ff2a5f] px-4 py-1.5 rounded-xl bg-[#ff2a5f]/10 border border-[#ff2a5f]/30">
                  3 - 2
                </div>

                <div className="flex items-center gap-3 flex-row-reverse text-left">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-[#00d2ff] flex items-center justify-center font-bold text-white text-xs">
                    SK
                  </div>
                  <div>
                    <div className="font-black text-sm text-white">Salar_K</div>
                    <div className="font-['Rajdhani'] text-xs text-[#00d2ff]">MAN CITY (ENG)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                <h4 className="font-extrabold text-base text-white mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#ffc400]" /> جدول مسابقات هفتگی بازینو
                </h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 text-xs">
                    <span>تورنمنت تک‌حذفی مورتال کامبت ۱</span>
                    <span className="text-[#ffc400] font-['Rajdhani'] font-bold text-sm">جمعه ساعت ۲۱:۰۰</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 text-xs">
                    <span>مسترز لیگ تیکن ۸ (Tekken 8)</span>
                    <span className="text-[#00d2ff] font-['Rajdhani'] font-bold text-sm">شنبه ساعت ۲۰:۰۰</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert("🏆 ثبت‌نام شما در مسابقات بعدی بازینو با موفقیت ثبت شد!")}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#0066ff] text-white font-black text-sm shadow-[0_6px_25px_rgba(0,210,255,0.4)] hover:shadow-[0_8px_35px_rgba(0,210,255,0.6)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>ثبت‌نام رایگان در مسابقات بعدی</span>
              </button>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-4">
          <div className="flex items-center gap-3 font-['Orbitron'] font-bold text-white text-sm">
            <Gamepad2 className="w-5 h-5 text-[#ffc400]" />
            <span>BAZINO 3D GAMING LOUNGE</span>
          </div>
          <div>
            © 2026 بازینو کلاب گیمینگ. تمام حقوق محفوظ است.
          </div>
        </footer>

      </div>

      {/* Mona Floating AI Dock */}
      <div 
        onClick={() => alert("✨ مونا: سلام قهرمان! من مونا هستم، دستیار هوشمند و مجری تورنمنت‌های بازینو. برای راهنمایی یا رزرو سیستم‌ها در خدمتم!")}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3.5 p-2 pr-5 rounded-full bg-[#0d1220]/90 border border-[#ffc400] backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(255,196,0,0.4)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,210,255,0.5)] hover:border-[#00d2ff] hover:-translate-y-1 transition-all cursor-pointer"
      >
        <img src={monaHeroWide} alt="Mona" className="w-11 h-11 rounded-full object-cover border-2 border-[#ffc400]" />
        <div>
          <div className="font-extrabold text-xs text-white">مونا • دستیار هوشمند</div>
          <div className="font-['Rajdhani'] text-[11px] font-bold text-[#00d2ff]">کلیک برای گفتگو و راهنمایی</div>
        </div>
        <Sparkles className="w-4 h-4 text-[#ffc400]" />
      </div>

    </div>
  );
}
