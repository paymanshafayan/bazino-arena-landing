import React, { useRef, useState } from "react";
import { Award, Coffee, Gamepad2, Home, Newspaper, ShoppingBag, Trophy, type LucideIcon } from "lucide-react";
import "./portal-dock.css";
import "./portal-dock-3d.css";
import "./authkit-menu-match.css";

type PortalItem = {
  id: "home" | "games" | "cafe" | "shop" | "tournaments" | "loyalty" | "blog";
  label: string;
  english: string;
  description: string;
  signal: string;
  accent: string;
  image: string;
  icon: LucideIcon;
};

const portalItems: PortalItem[] = [
  { id: "home", label: "خانه", english: "Home", description: "بازگشت به نقطهٔ شروع تجربهٔ بازینو", signal: "شروع تجربه", accent: "#b8efff", image: "/assets/portal-menu/home.jpg", icon: Home },
  { id: "games", label: "بازی‌ها", english: "Games", description: "بازی‌های کنسولی و ایستگاه‌های آمادهٔ رقابت", signal: "انتخاب بازی", accent: "#319cff", image: "/assets/portal-menu/games.jpg", icon: Gamepad2 },
  { id: "cafe", label: "کافه", english: "Cafe", description: "یک توقف کوتاه میان دو راند هیجان‌انگیز", signal: "استراحت بین راندها", accent: "#ffb854", image: "/assets/portal-menu/cafe.jpg", icon: Coffee },
  { id: "shop", label: "فروشگاه", english: "Shop", description: "محصولات و تجهیزات منتخب دنیای گیم", signal: "محصولات بازینو", accent: "#ff4daf", image: "/assets/portal-menu/shop.jpg", icon: ShoppingBag },
  { id: "tournaments", label: "مسابقات", english: "Arena", description: "رویدادها، براکت‌ها و رقابت‌های پیش رو", signal: "ورود به آرنا", accent: "#ffd24a", image: "/assets/portal-menu/tournaments.jpg", icon: Trophy },
  { id: "loyalty", label: "باشگاه", english: "Club", description: "پروفایل اعضا، امتیازها و مسیر پیشرفت", signal: "باشگاه بازیکنان", accent: "#8f7cff", image: "/assets/portal-menu/loyalty.jpg", icon: Award },
  { id: "blog", label: "بلاگ", english: "Blog", description: "خبرها، روایت‌ها و تازه‌ترین اتفاق‌های سالن", signal: "از داخل بازینو", accent: "#42e5cf", image: "/assets/portal-menu/blog.jpg", icon: Newspaper },
];

type PortalDockProps = { mode?: "landing" | "floating"; currentId?: string };

export default function PortalDock({ mode = "landing", currentId }: PortalDockProps) {
  const initialIndex = Math.max(0, portalItems.findIndex((item) => item.id === currentId));
  const [activeIndex, setActiveIndex] = useState(mode === "floating" ? initialIndex : 1);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = portalItems[activeIndex];
  const ActiveIcon = active.icon;

  const activate = (index: number, focus = false) => {
    const next = (index + portalItems.length) % portalItems.length;
    setActiveIndex(next);
    if (focus) itemRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      activate(index + (event.key === "ArrowRight" ? -1 : 1), true);
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      activate(event.key === "Home" ? 0 : portalItems.length - 1, true);
    }
  };

  if (mode === "floating") {
    return (
      <nav className="portal-dock-float" aria-label="صفحات اصلی پورتال" dir="rtl">
        <span className="portal-dock-float__beam" aria-hidden="true" />
        {portalItems.map((item) => {
          const Icon = item.icon;
          const selected = item.id === currentId;
          return <a key={item.id} href={item.id === "home" ? "/" : `/${item.id}`} className={selected ? "is-active" : ""} aria-current={selected ? "page" : undefined} style={{ "--item-accent": item.accent } as React.CSSProperties}><Icon strokeWidth={1.6} /><span>{item.label}</span></a>;
        })}
      </nav>
    );
  }

  return (
    <section className="portal-dock-section" id="portal-menu" style={{ "--dock-accent": active.accent } as React.CSSProperties} dir="rtl" aria-labelledby="portal-dock-title">
      <div className="portal-dock-atmosphere" aria-hidden="true" />
      <h2 id="portal-dock-title" className="sr-only">صفحات بازینو</h2>

      <nav className="portal-dock" aria-label="صفحات اصلی پورتال">
        <div className="portal-dock__items">
          {portalItems.map((item, index) => {
            const Icon = item.icon;
            const selected = index === activeIndex;
            return (
              <button
                ref={(node) => { itemRefs.current[index] = node; }}
                key={item.id}
                type="button"
                className={selected ? "is-active" : ""}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => item.id === "home" ? window.scrollTo({ top: 0, behavior: "smooth" }) : setActiveIndex(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                aria-current={selected ? "page" : undefined}
                aria-label={`${item.label}، ${item.description}`}
                style={{ "--item-accent": item.accent } as React.CSSProperties}
              >
                <span className="portal-dock__icon"><Icon strokeWidth={1.55} /></span>
                <span className="portal-dock__label"><b>{item.label}</b><small>{item.english}</small></span>
                {index < portalItems.length - 1 && <span className={`portal-dock__connector ${index < activeIndex ? "is-lit" : ""}`} aria-hidden="true"><i /></span>}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="portal-dock-stage">
        <div className="portal-dock-ghost portal-dock-ghost--right" aria-hidden="true" />
        <div className="portal-dock-ghost portal-dock-ghost--left" aria-hidden="true" />
        <article className="portal-dock-preview" key={active.id}>
          <div className="portal-dock-preview__image" aria-hidden="true">
            <img src={active.image} alt="" />
            <span />
          </div>
          <div className="portal-dock-preview__content">
            <div className="portal-dock-preview__icon"><ActiveIcon strokeWidth={1.6} /></div>
            <div>
              <p>{active.signal}</p>
              <h3>{active.label}</h3>
              <span>{active.description}</span>
            </div>
            <b aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}<i />{String(portalItems.length).padStart(2, "0")}</b>
          </div>
        </article>
      </div>
    </section>
  );
}
