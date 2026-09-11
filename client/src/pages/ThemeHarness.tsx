import React, { useEffect, useState, useRef } from "react";

interface ThemeManifest {
  id: string;
  name: string;
  version: string;
  regions: string[];
}

export default function ThemeHarness() {
  const [activeTheme, setActiveTheme] = useState<"arena" | "hub">("arena");
  const [activeRegion, setActiveRegion] = useState<string>("home");
  const [activeLang, setActiveLang] = useState<string>("fa");
  const [registeredRegions, setRegisteredRegions] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Initializing...");
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    let cancelled = false;
    async function loadTheme() {
      setStatus(`Loading ${activeTheme} theme package...`);
      setRegisteredRegions([]);
      
      try {
        // Fetch theme.json
        const zipName = activeTheme === "arena" ? "bazino-arena-theme.zip" : "bazino-hub-theme.zip";
        addLog(`Loading package ${zipName}`);

        // Clean previous theme styles
        document.querySelectorAll("style[data-harness-theme]").forEach((el) => el.remove());

        // Fetch CSS
        const cssPath = activeTheme === "arena" ? "/theme-package/theme.css" : "/hub-package/theme.css";
        // Also fetch from dev server or raw
        const cssRes = await fetch(cssPath).catch(() => null);
        let cssText = "";
        if (cssRes && cssRes.ok) {
          cssText = await cssRes.text();
        }

        const styleEl = document.createElement("style");
        styleEl.setAttribute("data-harness-theme", activeTheme);
        styleEl.textContent = cssText;
        document.head.appendChild(styleEl);

        // Fetch JS
        const jsPath = activeTheme === "arena" ? "/theme-package/theme.js" : "/hub-package/theme.js";
        const jsRes = await fetch(jsPath).catch(() => null);
        let jsText = "";
        if (jsRes && jsRes.ok) {
          jsText = await jsRes.text();
        }

        const registry: Record<string, any> = {};
        
        // Portal SDK Mock
        (window as any).BazinoThemeSDK = {
          version: 2,
          React: React,
          registerComponent: (name: string, comp: any) => {
            if (cancelled) return;
            registry[name] = comp;
            setRegisteredRegions((prev) => {
              if (prev.indexOf(name) === -1) return prev.concat([name]);
              return prev;
            });
            addLog(`Registered region: ${name}`);
          },
          locationFrom: (settings: any) => ({
            embedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=33.9034%2C35.2588%2C33.9134%2C35.2668&layer=mapnik&marker=35.2628%2C33.9084",
            lat: 35.2628,
            lng: 33.9084
          })
        };

        // Execute theme.js
        const fn = new Function("window", "BazinoThemeSDK", "React", jsText);
        fn(window, (window as any).BazinoThemeSDK, React);

        (window as any).__HARNESS_REGISTRY__ = registry;
        setStatus(`Theme ${activeTheme} loaded successfully!`);
        addLog(`Theme ${activeTheme} initialized with ${Object.keys(registry).length} regions.`);
      } catch (err: any) {
        setStatus(`Error loading theme: ${err.message}`);
        addLog(`ERROR: ${err.message}`);
      }
    }

    loadTheme();

    return () => {
      cancelled = true;
      document.querySelectorAll("style[data-harness-theme]").forEach((el) => el.remove());
    };
  }, [activeTheme]);

  const currentRegistry = (typeof window !== "undefined" && (window as any).__HARNESS_REGISTRY__) || {};
  const ActiveComponent = currentRegistry[activeRegion] || currentRegistry["home"];

  const sampleProps = {
    lang: activeLang,
    language: activeLang,
    dir: activeLang === "fa" ? "rtl" : "ltr",
    ts: (k: string, def?: string) => {
      const dict: Record<string, string> = {
        hero: "اگه یه قهرمانی، این آخرشه.",
        sub: "برترین تجربه گیمینگ کنسولی و مسابقات زنده در ایسکله قبرس.",
        cta: "رزرو نوبت بازی",
        directions: "مسیریابی",
        demoPass1Title: "پاس هفتگی ۳ ساعته",
        demoPass1Body: "دسترسی به بخش استاندارد و استریم",
        demoPass2Title: "پاس طلایی VIP",
        demoPass2Body: "اتاق اختصاصی ۸۵ اینچی با پذیرایی",
        demoPass3Title: "اشتراک فصلی پرو",
        demoPass3Body: "ورودی رایگان به تمام تورنومنت‌های ماه",
        cardBodyFallback: "تجهیزات به‌روز نسل نهم و استانداردهای مسابقات بین‌المللی"
      };
      return dict[k] || def || k;
    },
    num: (n: number) => String(n),
    navigate: (target: string) => addLog(`Navigated to: ${target}`),
    onNavigate: (target: string) => addLog(`Navigated to: ${target}`),
    settings: {
      club_name: "Bazino Arena",
      hero_title: "اگه یه قهرمانی، این آخرشه.",
      hero_subtitle: "برترین تجربه گیمینگ کنسولی در ایسکله قبرس.",
      club_address: "Vistamare Hotel, Iskele, North Cyprus",
      club_phone: "+90 548 888 2026",
      club_map_lat: "35.2628",
      club_map_lng: "33.9084"
    },
    slides: [
      { id: "s1", title: { fa: "مسابقات EA FC 26" }, desc: { fa: "جایزه ۱۰,۰۰۰ لیر و رقابت زنده" }, target: "tournaments" },
      { id: "s2", title: { fa: "سالن VIP کنسول‌ها" }, desc: { fa: "نمایشگرهای ۸۵ اینچ 4K با پذیرایی کامل" }, target: "reservations" }
    ],
    lounges: [
      { id: "l1", title: { fa: "سالن کنسول‌های اختصاصی" }, body: { fa: "PS5 Pro & Xbox Series X با صدای سه‌بعدی" }, label: "VIP / 01" },
      { id: "l2", title: { fa: "کافه و لانژ گیمری" }, body: { fa: "نوشیدنی‌های انرژی‌زا، پیتزا و میان‌وعده گرم" }, label: "CAFE / 02" }
    ],
    tournaments: [
      { id: "t1", title: "FC26 Autumn Cup", game: "EA Sports FC 26", prize: "15,000 TL", date: "2026-09-20" },
      { id: "t2", title: "Tekken 8 Master", game: "Tekken 8", prize: "8,000 TL", date: "2026-09-25" }
    ],
    results: [
      { id: "r1", rank: 1, name: "Arman K", score: "2450", teamA: "Arman", teamB: "Sina", scoreA: 3, scoreB: 1 },
      { id: "r2", rank: 2, name: "Reza M", score: "2100", teamA: "Reza", teamB: "Ali", scoreA: 2, scoreB: 0 }
    ],
    assetsBase: "/theme-package/assets/"
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-white flex flex-col font-sans" dir="rtl">
      {/* Harness Control Toolbar */}
      <header className="sticky top-0 z-50 bg-[#090e1c]/95 backdrop-blur border-b border-[#35a9ff]/20 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#3ddc84] animate-pulse" />
          <h1 className="text-sm font-black tracking-widest text-[#ffc400] font-mono">
            PORTAL THEME VERIFICATION HARNESS
          </h1>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-neutral-300 font-mono">
            SDK v2 Engine
          </span>
        </div>

        {/* Theme Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">قالب فعال:</span>
          <button
            onClick={() => { setActiveTheme("arena"); setActiveRegion("home"); }}
            className={`px-3 py-1 text-xs font-bold rounded transition ${
              activeTheme === "arena"
                ? "bg-[#ffc400] text-black shadow-lg shadow-[#ffc400]/20"
                : "bg-white/5 hover:bg-white/10 text-neutral-300"
            }`}
          >
            Arena Theme (لندینگ اصلی)
          </button>
          <button
            onClick={() => { setActiveTheme("hub"); setActiveRegion("home"); }}
            className={`px-3 py-1 text-xs font-bold rounded transition ${
              activeTheme === "hub"
                ? "bg-[#35a9ff] text-black shadow-lg shadow-[#35a9ff]/20"
                : "bg-white/5 hover:bg-white/10 text-neutral-300"
            }`}
          >
            Hub Theme (نئون هاب)
          </button>
        </div>

        {/* Region Selector */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-md py-1">
          <span className="text-xs text-neutral-400 shrink-0">ناحیه (Region):</span>
          {registeredRegions.map((reg) => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`px-2 py-0.5 text-xs rounded font-mono transition shrink-0 ${
                activeRegion === reg
                  ? "bg-white/20 text-[#ffc400] border border-[#ffc400]/50"
                  : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">زبان:</span>
          {(["fa", "en", "ru", "tr"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setActiveLang(l)}
              className={`px-2 py-0.5 text-xs rounded uppercase font-bold transition ${
                activeLang === l ? "bg-[#ffc400] text-black" : "bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* Status Bar */}
      <div className="bg-[#0b1424] border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-xs text-neutral-300 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#35a9ff]">وضعیت:</span>
          <span>{status}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>ریجن‌های ثبت‌شده: <b className="text-[#ffc400]">{registeredRegions.length}</b></span>
          <a href="/" className="text-[#35a9ff] hover:underline">بازگشت به سایت اصلی ↗</a>
        </div>
      </div>

      {/* Main Theme Render Surface */}
      <main
        ref={containerRef}
        className={`flex-1 ${
          activeTheme === "arena" ? "theme-bazino-arena" : "theme-bazino-hub"
        }`}
        data-theme={activeTheme === "arena" ? "bazino-arena" : "bazino-hub"}
        dir={activeLang === "fa" ? "rtl" : "ltr"}
      >
        {ActiveComponent ? (
          typeof ActiveComponent === "function" ? (
            React.createElement(ActiveComponent, sampleProps)
          ) : ActiveComponent.render ? (
            ActiveComponent.render(sampleProps)
          ) : (
            <div className="p-8 text-center text-red-400">Invalid component structure</div>
          )
        ) : (
          <div className="p-16 text-center text-neutral-400">
            <div className="w-8 h-8 border-2 border-[#ffc400] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            در حال رندر ریجن {activeRegion}...
          </div>
        )}
      </main>

      {/* Test Log Panel */}
      <footer className="bg-[#070b14] border-t border-white/10 p-3 text-[11px] font-mono text-neutral-400 flex flex-col gap-1 max-h-32 overflow-y-auto">
        <div className="text-[#ffc400] font-bold text-xs mb-1">کنسول لاگ آزمون زنده SDK:</div>
        {logs.map((log, idx) => (
          <div key={idx} className="leading-tight">{log}</div>
        ))}
      </footer>
    </div>
  );
}
