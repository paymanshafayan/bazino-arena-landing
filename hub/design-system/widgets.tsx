import type { CSSProperties, ReactNode } from "react";
import { HubAvatar } from "./Avatar";
import { HubIcon, LaurelTrophy } from "./icons";
import { WirePort } from "./NeonWire";
import heroSetup from "./assets/hero-setup.jpg";
import heroPlayer from "./assets/hero-player.jpg";

export function HubHero({
  title,
  kicker,
  kickerEm,
  tagline,
  leftSign,
  rightSign,
  leftImg = heroSetup,
  rightImg = heroPlayer,
  children,
}: {
  title: ReactNode;
  kicker?: ReactNode;
  kickerEm?: ReactNode;
  tagline?: string[];
  leftSign?: ReactNode;
  rightSign?: ReactNode;
  leftImg?: string;
  rightImg?: string;
  children?: ReactNode;
}) {
  return (
    <section className="hub-hero">
      <div className="hub-hero-col left" style={{ backgroundImage: `url(${leftImg})` }} />
      <div className="hub-hero-col right" style={{ backgroundImage: `url(${rightImg})` }} />
      <div className="hub-hero-veil" />
      {leftSign && <div className="hub-script s1">{leftSign}</div>}
      {rightSign && <div className="hub-script s2">{rightSign}</div>}
      <div className="hub-hero-inner">
        <div className="hub-hero-title">
          <HubIcon.Trophy size={40} />
          <h1>{title}</h1>
        </div>
        {kicker && <p className="hub-hero-sub">{kicker}{kickerEm && <> <em>{kickerEm}</em></>}</p>}
        {tagline && tagline.length > 0 && (
          <p className="hub-hero-line">{tagline.join("  •  ")}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export type HubTabItem = {
  id: string;
  label: string;
  sub: string;
  icon: "cal" | "star";
  variant: "magenta" | "cyan";
};

export function HubTabs({
  items,
  value,
  onChange,
}: {
  items: HubTabItem[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="hub-tabs">
      {items.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`hub-tab is-${t.variant} ${value === t.id ? "is-on" : ""}`}
          onClick={() => onChange(t.id)}
        >
          <span className="hub-tab-ic">
            {t.icon === "star" ? <HubIcon.Star size={18} /> : <HubIcon.Calendar size={18} />}
          </span>
          <span className="hub-tab-tx"><b>{t.label}</b><small>{t.sub}</small></span>
        </button>
      ))}
    </div>
  );
}

export function FilterPills({
  items,
  value,
  onChange,
  greenWhen = "CURRENT",
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  greenWhen?: string;
}) {
  return (
    <div className="hub-filters">
      {items.map((f) => (
        <button
          key={f}
          type="button"
          className={value === f ? (f === greenWhen ? "is-on is-green" : "is-on") : ""}
          onClick={() => onChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export function GameListCard({
  cover, name, subtitle, date, players, status = "COMPLETED", selected, onClick,
}: {
  cover: string;
  name: string;
  subtitle: string;
  date: string;
  players: number;
  status?: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={`hub-game ${selected ? "is-on" : ""}`} onClick={onClick}>
      <img src={cover} alt={name} />
      <span className="hub-game-meta">
        <b>{name}</b>
        <small>{subtitle}</small>
        <span className="hub-game-info">
          <HubIcon.Calendar size={11} /> {date}
          <HubIcon.Users size={11} /> {players} Players
        </span>
      </span>
      <span className="hub-gbadge"><HubIcon.Trophy size={10} /> {status}</span>
      <i className="hub-garrow">›</i>
    </button>
  );
}

export type MatchPair = {
  a: string;
  ascore: number;
  b?: string;
  bscore?: number;
  seeds?: [number | string | null, number | string | null];
  gold?: boolean;
};

export function MatchCard({
  m, wire, style, className = "",
}: {
  m: MatchPair;
  wire?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const wa = m.b == null ? true : m.ascore > (m.bscore ?? -1);
  const inner = (
    <div className={`hub-mcard ${m.gold ? "is-gold" : ""} ${className}`}>
      <div className={`hub-mrow ${wa ? "is-win" : "is-lose"}`}>
        <span className="hub-seed">{m.seeds?.[0] ?? ""}</span>
        <HubAvatar name={m.a} size={16} />
        <span className="hub-mname">{m.a}</span>
        <span className="hub-mscore">{m.ascore}</span>
      </div>
      {m.b != null && (
        <div className={`hub-mrow ${!wa ? "is-win" : "is-lose"}`}>
          <span className="hub-seed">{m.seeds?.[1] ?? ""}</span>
          <HubAvatar name={m.b} size={16} />
          <span className="hub-mname">{m.b}</span>
          <span className="hub-mscore">{m.bscore}</span>
        </div>
      )}
    </div>
  );
  if (!wire) return inner;
  return <WirePort id={wire} className="hub-slot" style={style}>{inner}</WirePort>;
}

export function ChampionBlock({
  name = "ArmanK",
  tag = "#BZN1024",
}: {
  name?: string;
  tag?: string;
}) {
  return (
    <div className="hub-champ">
      <LaurelTrophy size={58} />
      <div className="hub-champ-word">CHAMPION</div>
      <div className="hub-champ-av"><HubAvatar name={name} size={72} ring="gold" /></div>
      <b>{name}</b>
      <small>{tag}</small>
    </div>
  );
}

export function PanelBanner({
  image, title, em, date, players, status = "COMPLETED", slogan,
}: {
  image: string;
  title: string;
  em: string;
  date: string;
  players: number;
  status?: string;
  slogan?: string;
}) {
  return (
    <div className="hub-panel-banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="hub-panel-banner-meta">
        <h2>{title} <em>{em}</em></h2>
        <div className="hub-panel-info">
          <span><HubIcon.Calendar size={13} /> {date}</span>
          <span><HubIcon.Users size={13} /> {players} PLAYERS</span>
          <span className="gold"><HubIcon.Trophy size={13} /> {status}</span>
        </div>
      </div>
      {slogan && <div className="hub-banner-slogan">{slogan.split(" ").slice(0, 2).join(" ")}<br />{slogan.split(" ").slice(2).join(" ")}</div>}
    </div>
  );
}
