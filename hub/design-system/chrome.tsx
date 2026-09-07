import type { ReactNode } from "react";
import { HubAvatar } from "./Avatar";
import { HubIcon, NAV } from "./icons";
import "./hub.css";

export function HubLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="hub-logo">
      <svg viewBox="0 0 48 32" width={size + 14} height={size} className="hub-logo-pad" aria-hidden="true">
        <defs>
          <linearGradient id="hub-logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ff" />
            <stop offset="1" stopColor="#ff2db0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#hub-logo-g)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 24h20c4 0 7-3 7-7 0-5-3-8-8-8-3 0-5 1.4-9 1.4S18 9 15 9c-5 0-8 3-8 8 0 4 3 7 7 7z" />
          <path d="M14 24c-1 3-3 5-6 6M34 24c1 3 3 5 6 6M18 12l2 3M26 12l-2 3" />
        </g>
      </svg>
      <span className="hub-logo-word"><b>BAZINO</b><small>GAMING CLUB</small></span>
    </div>
  );
}

export function HubHeader({ active = "EVENTS" }: { active?: string }) {
  return (
    <header className="hub-header">
      <HubLogo />
      <nav className="hub-nav">
        {NAV.map((n, i) => (
          <a key={`${n}-${i}`} className={n === active ? "is-on" : ""}>{n}</a>
        ))}
      </nav>
      <div className="hub-head-right">
        <button className="hub-chip" type="button"><HubIcon.Globe size={14} /> TR <HubIcon.Chevron size={12} /></button>
        <button className="hub-bell" type="button"><HubIcon.Bell size={18} /><span className="hub-dot" /></button>
        <div className="hub-user">
          <HubAvatar name="ArmanK" size={32} ring="cyan" />
          <span className="hub-user-meta"><b>ArmanK</b><small>#BZN1024</small></span>
          <i>▾</i>
        </div>
      </div>
    </header>
  );
}

export function HubFooter() {
  return (
    <footer className="hub-footer">
      <div className="hub-foot-logo"><b>BAZINO</b><small>GAMING CLUB</small></div>
      <div className="hub-vdiv" />
      <div className="hub-foot-item">
        <span className="hub-fic pink"><HubIcon.Pin size={16} /></span>
        <span>Iskele, Long Beach<br /><b>Hotel VistaMare</b></span>
      </div>
      <div className="hub-foot-item">
        <span className="hub-fic red"><HubIcon.Clock size={16} /></span>
        <span>OPEN EVERYDAY<br /><b>11:00 – 23:50</b></span>
      </div>
      <div className="hub-foot-item">
        <span className="hub-fic green"><HubIcon.Chat size={16} /></span>
        <span>WHATSAPP<br /><b>+90 539 112 37 47</b></span>
      </div>
      <div className="hub-foot-item">
        <span className="hub-fic ig"><HubIcon.Gram size={16} /></span>
        <span>INSTAGRAM<br /><b>@bazinopro</b></span>
      </div>
      <div className="hub-foot-sign">
        <HubIcon.Crown size={20} />
        More Than a Game
        <i>A Community</i>
      </div>
    </footer>
  );
}

export function HubPage({ children, activeNav = "EVENTS" }: { children: ReactNode; activeNav?: string }) {
  return (
    <div className="hub-page" dir="ltr">
      <HubHeader active={activeNav} />
      {children}
      <HubFooter />
    </div>
  );
}
