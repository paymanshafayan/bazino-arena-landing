import React, { useEffect, useRef, useState } from "react";
import PortalDock from "../components/PortalDock";
import ArenaCircuit from "../components/ArenaCircuit";
import "./dimension-3d.css";
import "./dimension-3d-effects.css";

const FRAME_COUNT = 394;
const frameSource = (index: number) => `/assets/video-sequence/frame-${String(index + 1).padStart(4, "0")}.webp`;
const chapters = [
  { at: 0, eyebrow: "BAZINO PRO / VIRTUAL TOUR", title: "وارد بازی شو.", copy: "مسیر واقعی بازینو، فریم‌به‌فریم.", accent: "#3d8fff" },
  { at: 0.3, eyebrow: "THE HOODED ICON", title: "نشانه را دنبال کن.", copy: "از راهرو عبور کن و وارد قلب سالن شو.", accent: "#f02b9c" },
  { at: 0.58, eyebrow: "FC / PS5 STATION", title: "زمین تو آماده‌ست.", copy: "نمایشگر بزرگ، پلی‌استیشن ۵ و رقابت بدون وقفه.", accent: "#288cff" },
  { at: 0.86, eyebrow: "YOUR STATION AWAITS", title: "نوبت بازی توئه.", copy: "ایستگاهت را انتخاب کن و بازی را شروع کن.", accent: "#ffc72c" },
];
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function CursorAura() {
  return <div className="dimension-cursor-aura" aria-hidden="true"><span /></div>;
}

export default function Dimension3DPage() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const lastXRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const chapter = [...chapters].reverse().find(item => progress >= item.at) || chapters[0];

  useEffect(() => {
    document.title = "تور مجازی بازینو پرو | Bazino Virtual Tour";
    let cancelled = false;
    const load = (index: number) => new Promise<void>((resolve) => {
      if (imagesRef.current[index]) return resolve();
      const image = new Image();
      image.decoding = "async";
      image.onload = () => { imagesRef.current[index] = image; resolve(); };
      image.onerror = () => resolve();
      image.src = frameSource(index);
    });
    (async () => {
      await Promise.all(Array.from({ length: 16 }, (_, index) => load(index)));
      if (!cancelled) setReady(true);
      for (let start = 16; start < FRAME_COUNT && !cancelled; start += 24) {
        await Promise.all(Array.from({ length: Math.min(24, FRAME_COUNT - start) }, (_, offset) => load(start + offset)));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    let animation = 0;
    let lastReported = -1;
    const draw = () => {
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      currentRef.current += (targetRef.current - currentRef.current) * 0.105;
      if (Math.abs(targetRef.current - currentRef.current) < 0.00008) currentRef.current = targetRef.current;
      const index = clamp(Math.round(currentRef.current * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1);
      const image = imagesRef.current[index];
      context.fillStyle = "#020305"; context.fillRect(0, 0, width, height);
      if (image) {
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const drawWidth = image.naturalWidth * scale;
        const drawHeight = image.naturalHeight * scale;
        context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      }
      if (Math.abs(index - lastReported) >= 2 || index === 0 || index === FRAME_COUNT - 1) {
        lastReported = index; setProgress(index / (FRAME_COUNT - 1));
      }
      animation = requestAnimationFrame(draw);
    };
    animation = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animation);
  }, []);

  const move = (clientX: number, clientY: number) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const previous = lastXRef.current;
    lastXRef.current = clientX;
    heroRef.current?.style.setProperty("--tour-x", clamp(((clientX - rect.left) / rect.width) * 2 - 1, -1, 1).toFixed(3));
    heroRef.current?.style.setProperty("--tour-y", clamp(((clientY - rect.top) / rect.height) * 2 - 1, -1, 1).toFixed(3));
    const aura = heroRef.current?.querySelector<HTMLElement>(".dimension-cursor-aura");
    if (aura) {
      aura.style.transform = `translate3d(${clientX - rect.left}px, ${clientY - rect.top}px, 0) translate(-50%, -50%)`;
      aura.classList.add("is-visible");
    }
    if (previous !== null) targetRef.current = clamp(targetRef.current + ((clientX - previous) / rect.width) * 1.12, 0, 1);
  };

  return (
    <main className="dimension-tour-shell">
      <section ref={heroRef} className="dimension-tour" onPointerMove={event => move(event.clientX, event.clientY)} onPointerLeave={() => { lastXRef.current = null; heroRef.current?.querySelector(".dimension-cursor-aura")?.classList.remove("is-visible"); }} aria-label="تور مجازی سالن بازینو پرو">
        <CursorAura />
        <canvas ref={canvasRef} className="dimension-tour__sequence" aria-hidden="true" />
        <div className="dimension-tour__shade" aria-hidden="true" />
        <div className="dimension-tour__light" style={{ "--scene-accent": chapter.accent } as React.CSSProperties} aria-hidden="true" />
        <div className={`dimension-tour__loader ${ready ? "is-ready" : ""}`} aria-hidden="true"><span /></div>
        <header className="dimension-tour__header"><a className="dimension-tour__brand" href="/" aria-label="بازینو پرو"><span className="dimension-tour__brand-mark">B</span><span>BAZINO <b>PRO</b></span></a><a className="dimension-tour__header-cta" href="/reservations">رزرو ایستگاه</a></header>
        <div className="dimension-tour__copy" key={chapter.at} dir="rtl"><p className="dimension-tour__eyebrow">{chapter.eyebrow}</p><h1>{chapter.title}</h1><p className="dimension-tour__summary">{chapter.copy}</p>{progress >= .86 && <div className="dimension-tour__actions"><a className="dimension-tour__primary" href="/reservations"><span>رزرو ایستگاه</span><i aria-hidden="true">←</i></a></div>}</div>
        <div className="dimension-tour__progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>
        <p className="dimension-tour__count" aria-live="polite"><b>{String(Math.round(progress * (FRAME_COUNT - 1)) + 1).padStart(3, "0")}</b> / {FRAME_COUNT}</p>
      </section>
      <PortalDock />
      <ArenaCircuit />
    </main>
  );
}
