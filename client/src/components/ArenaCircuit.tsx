import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock3, Gamepad2, MapPin, Monitor, Phone, ShoppingBag, Trophy, Utensils, Users } from "lucide-react";
import "./arena-circuit.css";

type Localized = { fa?: string; en?: string } | string;
type Genre = { id: string; title: Localized; subtitle: Localized; tag?: string; games?: string; imageUrl?: string };
type Lounge = { id: string; title: Localized; desc: Localized; btnText?: Localized; imageUrl?: string };
type Match = { id: string; title: Localized; teamA: string; teamB: string; scoreA: number; scoreB: number; status: string; time: string; game: string };
type Price = { id: string; title: Localized; price: number; duration: Localized; features: Localized[]; popular?: boolean };
type Staff = { id: string; name: Localized; gamerTag: string; role: Localized; specialty: string; avatar?: string };
type Tournament = { id?: string | number; title?: Localized; name?: Localized; game?: string; status?: string; date?: string; startDate?: string };
type CircuitData = { gameGenres: Genre[]; loungeSections: Lounge[]; matchHistory: Match[]; pricingPackages: Price[]; staffTeam: Staff[]; tournaments: Tournament[]; siteSettings: Record<string, string> };

const text = (value: Localized | undefined) => typeof value === "string" ? value : value?.fa || value?.en || "";

/* Exact public HomeTab contract snapshot. A host theme can replace it through window.__BAZINO_HOME_DATA__. */
const portalContract: CircuitData = {
  gameGenres: [
    { id:"shooters", title:{fa:"شوتینگ و تاکتیکال"}, subtitle:{fa:"نبرد هیجان‌انگیز ۵به۵ با پینگ صفر"}, tag:"FPS AREA", games:"CS2, Valorant, Apex Legends" },
    { id:"rpg", title:{fa:"جهان باز و داستانی"}, subtitle:{fa:"غرق در روایت‌های حماسی جهان بازی"}, tag:"RTX ULTRA", games:"Cyberpunk, Elden Ring, Witcher 3" },
    { id:"moba", title:{fa:"استراتژی تیمی و موبا"}, subtitle:{fa:"تفکر سریع تاکتیکال و هماهنگی کلن"}, tag:"TACTICAL ZONE", games:"Dota 2, League of Legends, SC2" },
    { id:"sports", title:{fa:"ورزشی و مسابقه‌ای"}, subtitle:{fa:"رقابت نفس‌گیر روی کاناپه‌های چرمی"}, tag:"VIP LOUNGE", games:"FIFA 26, Forza Horizon, NBA 2K" },
  ],
  loungeSections: [
    { id:"games", title:{fa:"سالن فوق‌حرفه‌ای PC Arena"}, desc:{fa:"سیستم‌های نسل جدید، نمایشگرهای سریع و تجهیزات حرفه‌ای برای بازی بدون محدودیت."}, btnText:{fa:"رزرو آنلاین سیستم"} },
    { id:"consoles", title:{fa:"بخش VIP کنسول‌ها"}, desc:{fa:"فضای اختصاصی PS5 و Xbox با نمایشگرهای بزرگ و صندلی‌های راحت."}, btnText:{fa:"رزرو سیستم و کنسول"} },
    { id:"cafe", title:{fa:"بوفه و کافه گیمینگ"}, desc:{fa:"سفارش نوشیدنی و غذا بدون خارج شدن از جریان بازی."}, btnText:{fa:"سفارش آنلاین بوفه"} },
    { id:"shop", title:{fa:"فروشگاه تجهیزات جانبی"}, desc:{fa:"تجهیزات گیمینگ و لوازم جانبی منتخب باشگاه."}, btnText:{fa:"مشاهده فروشگاه"} },
  ],
  matchHistory: [
    { id:"m1", title:{fa:"کاپ هفتگی کلن‌های دوتا ۲"}, teamA:"VIP Gladiators", teamB:"Persian Hawks", scoreA:2, scoreB:1, status:"Finished", time:"۱۴۰۵/۰۴/۱۴", game:"Dota 2" },
    { id:"m2", title:{fa:"لیگ انتخابی کانتر استرایک ۲"}, teamA:"Zero Ping", teamB:"Cyber Storm", scoreA:14, scoreB:10, status:"Live", time:"زنده - راند ۲۵", game:"CS2" },
    { id:"m3", title:{fa:"جام قهرمانی باشگاه‌های فیفا ۲۶"}, teamA:"Barca King", teamB:"Real Madrid Fan", scoreA:0, scoreB:0, status:"Scheduled", time:"امروز ساعت ۲۱:۰۰", game:"FIFA 26" },
  ],
  pricingPackages: [
    { id:"silver", title:{fa:"پکیج نقره‌ای کلوپ"}, price:70000, duration:{fa:"۳ ساعت بازی با سیستم استاندارد"}, features:[{fa:"سیستم گیمینگ استاندارد"},{fa:"صندلی ارگونومیک"},{fa:"یک نوشیدنی بوفه"}] },
    { id:"gold", title:{fa:"بلیط طلایی VIP آرنا"}, price:150000, duration:{fa:"۵ ساعت بازی VIP + امتیاز دوبرابر"}, features:[{fa:"سیستم‌های رده‌بالا"},{fa:"نمایشگر سریع"},{fa:"نوشیدنی هدیه"}], popular:true },
    { id:"squad", title:{fa:"پکیج شبانه تیمی"}, price:190000, duration:{fa:"۸ ساعت کامل؛ نیمه‌شب تا ۸ صبح"}, features:[{fa:"دسترسی VIP یا استاندارد"},{fa:"پذیرایی شبانه"},{fa:"فضای تمرین تیمی"}] },
  ],
  staffTeam: [
    { id:"sina", name:{fa:"سینا رضایی"}, gamerTag:"Apex_C", role:{fa:"سرمربی ارشد کانتر استرایک ۲"}, specialty:"CS2, Valorant, Precision FPS" },
    { id:"sorena", name:{fa:"سورنا قاسمی"}, gamerTag:"Vortex_X", role:{fa:"تحلیل‌گر ارشد بازی‌های تیمی"}, specialty:"Dota 2, League of Legends" },
    { id:"aria", name:{fa:"آریا محمدی"}, gamerTag:"Ghost_F", role:{fa:"سوپروایزر سالن کنسول و فیفا"}, specialty:"FIFA 26, Fighting Games" },
  ], tournaments: [], siteSettings: {}
};

declare global { interface Window { __BAZINO_HOME_DATA__?: Partial<CircuitData> } }
const icons = [Gamepad2, Monitor, Utensils, ShoppingBag];
function CircuitCanvas({ root }: { root: React.RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current, host = root.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let frame = 0;
    const draw = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5), w = host.clientWidth, h = host.scrollHeight;
      if (canvas.width !== w*dpr || canvas.height !== h*dpr) { canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.height=`${h}px`; }
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
      const x = w > 800 ? w/2 : 24; ctx.lineWidth=1; ctx.strokeStyle="rgba(53,169,255,.22)"; ctx.setLineDash([3,9]); ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke();
      ctx.setLineDash([]); ctx.fillStyle="#ffc400"; ctx.shadowColor="#ffc400"; ctx.shadowBlur=18;
      host.querySelectorAll<HTMLElement>(".circuit-section").forEach(s => { const y=s.offsetTop+Math.min(130,s.offsetHeight/2); ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill(); });
      frame=requestAnimationFrame(draw);
    }; frame=requestAnimationFrame(draw); return () => cancelAnimationFrame(frame);
  }, [root]);
  return <canvas className="arena-circuit__canvas" ref={ref} aria-hidden="true" />;
}

export default function ArenaCircuit() {
  const root = useRef<HTMLElement>(null); const [data,setData]=useState<CircuitData>(()=>({...portalContract,...window.__BAZINO_HOME_DATA__}));
  useEffect(()=>{
    const sections=Array.from(root.current?.querySelectorAll<HTMLElement>(".circuit-section") ?? []);
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      const section=entry.target as HTMLElement;
      section.classList.toggle("is-assembled",entry.isIntersecting);
    }),{rootMargin:"-8% 0px -12%",threshold:.08});
    sections.forEach(el=>observer.observe(el));
    let raf=0;
    const renderScroll=()=>{raf=0;const vh=innerHeight;sections.forEach(section=>{const rect=section.getBoundingClientRect();const travel=(vh-rect.top)/(vh+rect.height);section.style.setProperty("--journey",Math.max(0,Math.min(1,travel)).toFixed(4));section.style.setProperty("--parallax",Math.max(-1,Math.min(1,(rect.top+rect.height/2-vh/2)/vh)).toFixed(4))})};
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(renderScroll)};renderScroll();addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",onScroll,{passive:true});
    Promise.all([fetch("/api/settings").then(r=>r.ok?r.json():{}).catch(()=>({})),fetch("/api/tournaments").then(r=>r.ok?r.json():[]).catch(()=>([]))]).then(([siteSettings,tournaments])=>setData(old=>({...old,siteSettings:{...old.siteSettings,...siteSettings},tournaments:Array.isArray(tournaments)?tournaments:old.tournaments})));
    return()=>{observer.disconnect();removeEventListener("scroll",onScroll);removeEventListener("resize",onScroll);if(raf)cancelAnimationFrame(raf)};
  },[]);
  const enabled=(key:string)=>data.siteSettings[`section_${key}_enabled`]!=="false";
  const pointer=(e:React.PointerEvent<HTMLElement>)=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--px",`${((e.clientX-r.left)/r.width-.5)*2}`);e.currentTarget.style.setProperty("--py",`${((e.clientY-r.top)/r.height-.5)*2}`)};
  return <section className="arena-circuit" ref={root} dir="rtl" aria-label="امکانات و اطلاعات بازینو">
    <CircuitCanvas root={root}/>
    {enabled("genres")&&data.gameGenres.length>0&&<section className="circuit-section genres" onPointerMove={pointer}><Heading n="03" kicker="CHOOSE YOUR REALM" title="دروازه‌های بازی" body="هر ژانر، ورودی به یک جهان رقابتی متفاوت."/><div className="genre-orbit">{data.gameGenres.map((g,i)=><a href="/reservations" className="genre-gate" key={g.id} style={{"--i":i,"--scene":g.imageUrl ? `url(${g.imageUrl})` : "none"} as React.CSSProperties}><div className="genre-gate__scene" aria-hidden="true"><span className="scene-fighter fighter-a"/><span className="scene-fighter fighter-b"/><span className="scene-shot shot-a"/><span className="scene-shot shot-b"/><i className="scene-scan"/></div><div className="genre-gate__copy"><span>{g.tag}</span><b>{text(g.title)}</b><small>{text(g.subtitle)}</small><em>{g.games}</em></div></a>)}</div></section>}
    {enabled("lounges")&&data.loungeSections.length>0&&<section className="circuit-section lounges" onPointerMove={pointer}><Heading n="04" kicker="SPATIAL DIRECTORY" title="نقشهٔ سالن" body="چهار ناحیه، یک جریان پیوسته از بازی تا استراحت."/><div className="blueprint"><div className="blueprint__core">BAZINO<br/><b>ARENA</b></div>{data.loungeSections.map((l,i)=>{const Icon=icons[i%icons.length];return <a href={l.id==="cafe"?"/cafe":l.id==="shop"?"/shop":"/reservations"} className={`blueprint__room room-${i}`} key={l.id}><div className="blueprint__image">{l.imageUrl&&<img src={l.imageUrl} alt=""/>}<Icon/></div><b>{text(l.title)}</b><small>{text(l.desc)}</small><span>{text(l.btnText)} ←</span></a>})}</div></section>}
    {enabled("results")&&data.matchHistory.length>0&&<section className="circuit-section results" onPointerMove={pointer}><Heading n="05" kicker="ARENA SIGNAL / LIVE" title="تابلوی نتایج" body="سیگنال زندهٔ رقابت‌ها و آخرین نتیجه‌های ثبت‌شده."/><div className="signal-board">{data.matchHistory.map(m=><article className={m.status==="Live"?"is-live":""} key={m.id}><header><span>{m.game}</span><time>{m.time}</time></header><p>{text(m.title)}</p><div><b>{m.teamA}</b><strong>{m.scoreA}<i>:</i>{m.scoreB}</strong><b>{m.teamB}</b></div><small>{m.status}</small></article>)}</div></section>}
    {enabled("tournaments")&&data.tournaments.length>0&&<section className="circuit-section tournaments" onPointerMove={pointer}><Heading n="06" kicker="COMPETITION ROUTE" title="تونل مسابقات" body="مسیر ورود از ثبت‌نام تا براکت نهایی."/><div className="bracket-tunnel">{data.tournaments.map((t,i)=><a href="/tournaments" key={t.id??i}><span>0{i+1}</span><b>{text(t.title||t.name)||t.game}</b><small>{t.status||t.date||t.startDate}</small></a>)}</div></section>}
    {enabled("pricing")&&data.pricingPackages.length>0&&<section className="circuit-section pricing" onPointerMove={pointer}><Heading n="07" kicker="SELECT YOUR ACCESS" title="گذرنامه‌های آرنا" body="زمان و سطح دسترسی مناسب بازی خودت را انتخاب کن."/><div className="passes">{data.pricingPackages.map((p,i)=><article className={p.popular?"popular":""} key={p.id} tabIndex={0}><div className="pass-visual" aria-hidden="true"><span/><i>0{i+1}</i></div><span>{p.popular?"پیشنهاد آرنا":`PASS 0${i+1}`}</span><h3>{text(p.title)}</h3><strong>{p.price.toLocaleString("fa-IR")} <small>تومان</small></strong><p>{text(p.duration)}</p><ul>{p.features.map((f,j)=><li key={j}>{text(f)}</li>)}</ul><a href="/reservations">انتخاب این گذرنامه <ArrowLeft/></a></article>)}</div></section>}
    {enabled("staff")&&data.staffTeam.length>0&&<section className="circuit-section staff" onPointerMove={pointer}><Heading n="08" kicker="TEAM FORMATION" title="ترکیب حرفه‌ای" body="تجربه، تحلیل و هدایت؛ پشت هر رقابت جدی."/><div className="formation">{data.staffTeam.map((s,i)=><article key={s.id}><div className="formation__avatar">{s.avatar&&<img src={s.avatar} alt=""/>}<span>{text(s.name).charAt(0)}</span><i>0{i+1}</i></div><p>@{s.gamerTag}</p><h3>{text(s.name)}</h3><small>{text(s.role)}</small><em>{s.specialty}</em></article>)}</div></section>}
    {enabled("address")&&<section className="circuit-section location" onPointerMove={pointer}><Heading n="09" kicker="FINAL COORDINATES" title="مختصات نهایی" body="آخر مسیر دیجیتال، شروع تجربهٔ واقعی است."/><div className="coordinates"><div className="coordinate-map"><span className="radar"/><i className="pin"><MapPin/></i><code>{data.siteSettings.club_map_lat||"35.2628"} N<br/>{data.siteSettings.club_map_lng||"33.9084"} E</code></div><address><p><MapPin/><span><small>نشانی باشگاه</small>{data.siteSettings.club_address||"Vista Mare، اسکله، قبرس شمالی"}</span></p><p><Clock3/><span><small>ساعت فعالیت</small>{data.siteSettings.club_hours||"اطلاعات به‌روز در پرتال رسمی"}</span></p><p><Phone/><span><small>خط تماس</small>{data.siteSettings.club_phone||"اطلاعات تماس در پرتال رسمی"}</span></p><a href={data.siteSettings.club_map_url||"https://bazino.pro"}>مسیریابی از پرتال رسمی <ArrowLeft/></a></address></div></section>}
    <footer className="circuit-end"><Users/><span>THE CIRCUIT CONTINUES</span><a href="https://bazino.pro">BAZINO.PRO</a></footer>
  </section>
}
function Heading({n,kicker,title,body}:{n:string;kicker:string;title:string;body:string}){return <header className="circuit-heading"><span>{n}</span><div><small>{kicker}</small><h2>{title}</h2><p>{body}</p></div></header>}
