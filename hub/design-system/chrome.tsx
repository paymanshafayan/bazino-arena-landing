import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { HubAvatar } from "./Avatar";
import { HubIcon } from "./icons";
import { GOOGLE_MAPS, NAV } from "../theme/data";
import { tx, useHub, type Lang } from "../theme/HubContext";
import { AuthModal, HoursModal } from "../theme/Modals";
import "./hub.css";
import "../theme/theme.css";

export function HubLogo({ size = 28 }: { size?: number }) {
  return (
    <Link href="/hub" className="hub-logo">
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
    </Link>
  );
}

function activeFromPath(path: string) {
  if (path.startsWith("/hub/games")) return "GAMES";
  if (path.startsWith("/hub/events") || path.startsWith("/brackets")) return "EVENTS";
  if (path.startsWith("/hub/shop")) return "SHOP";
  if (path.startsWith("/hub/food")) return "FOOD & DRINKS";
  if (path.startsWith("/hub/club")) return "CLUB";
  if (path.startsWith("/hub/blog")) return "BLOG";
  if (path.startsWith("/hub/chat")) return "CHAT";
  if (path === "/hub" || path === "/hub/") return "HOME";
  return "";
}

export function HubHeader({ active }: { active?: string }) {
  const [loc] = useLocation();
  const { lang, setLang, user, setAuthOpen, mobileNav, setMobileNav } = useHub();
  const on = active ?? activeFromPath(loc);
  const langs: Lang[] = ["en", "tr", "fa", "ru"];

  return (
    <>
      <header className="hub-header">
        <HubLogo />
        <nav className="hub-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={n.id === on ? "is-on" : ""}>
              {tx(lang, n.key)}
            </Link>
          ))}
        </nav>
        <div className="hub-head-right">
          <div className="hub-chip">
            <HubIcon.Globe size={14} /> <span className="hub-chip-tx">{lang.toUpperCase()}</span> <HubIcon.Chevron size={12} />
            <div className="hub-lang-menu" role="list">
              {langs.map((l) => (
                <button key={l} type="button" className={l === lang ? "is-on" : ""} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <button className="hub-bell" type="button" aria-label="notifications">
            <HubIcon.Bell size={18} /><span className="hub-dot" />
          </button>
          {user ? (
            <Link href="/hub/profile" className="hub-user">
              <HubAvatar name={user.displayName} size={32} ring="cyan" />
              <span className="hub-user-meta"><b>{user.displayName}</b><small>{user.tag}</small></span>
              <i>▾</i>
            </Link>
          ) : (
            <>
              <button className="hub-join hub-neon-box hub-neon-box--magenta" type="button" onClick={() => setAuthOpen(true, "otp")}>{tx(lang, "JOIN")}</button>
              <button className="hub-login-btn hub-neon-box" type="button" onClick={() => setAuthOpen(true, "otp")}>{tx(lang, "LOGIN")}</button>
            </>
          )}
          <button
            className="hub-burger"
            type="button"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="menu"
            aria-expanded={mobileNav}
          >
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>
      </header>
      <nav className={`hub-mobile-nav ${mobileNav ? "is-on" : ""}`}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={n.id === on ? "is-on" : ""} onClick={() => setMobileNav(false)}>
            {tx(lang, n.key)}
          </Link>
        ))}
      </nav>
    </>
  );
}

export function HubFooter() {
  const { lang, setHoursOpen } = useHub();
  return (
    <footer className="hub-footer">
      <div className="hub-footer-main">
        <Link href="/hub" className="hub-foot-logo"><b>BAZINO</b><small>GAMING CLUB</small></Link>
        <div className="hub-vdiv" />
        <a href={GOOGLE_MAPS} target="_blank" rel="noreferrer" className="hub-foot-item">
          <span className="hub-fic pink"><HubIcon.Pin size={16} /></span>
          <span>Iskele, Long Beach<br /><b>Hotel VistaMare</b></span>
        </a>
        <button className="hub-foot-item" type="button" onClick={() => setHoursOpen(true)}>
          <span className="hub-fic red"><HubIcon.Clock size={16} /></span>
          <span>{tx(lang, "OPEN")}<br /><b>11:00 – 23:50</b></span>
        </button>
        <a className="hub-foot-item" href="https://wa.me/905391123747" target="_blank" rel="noreferrer">
          <span className="hub-fic green"><HubIcon.Chat size={16} /></span>
          <span>{tx(lang, "WHATSAPP")}<br /><b>+90 539 112 37 47</b></span>
        </a>
        <a className="hub-foot-item" href="https://instagram.com/bazinopro" target="_blank" rel="noreferrer">
          <span className="hub-fic ig"><HubIcon.Gram size={16} /></span>
          <span>{tx(lang, "INSTAGRAM")}<br /><b>@bazinopro</b></span>
        </a>
        <div className="hub-foot-sign">
          <HubIcon.Crown size={20} />
          More Than a Game
          <i>A Community</i>
        </div>
      </div>
      {/* PDF §21 — Rules / Privacy always reachable from the bottom of every page. */}
      <div className="hub-foot-legal">
        <Link href="/hub/rules">RULES</Link>
        <span>·</span>
        <Link href="/hub/privacy">PRIVACY</Link>
        <span>·</span>
        <Link href="/hub/contact">CONTACT</Link>
        <small>© {new Date().getFullYear()} BAZINO GAMING CLUB — Good Games · Better People</small>
      </div>
    </footer>
  );
}

export function HubPage({ children, activeNav }: { children: ReactNode; activeNav?: string }) {
  const { notify } = useHub();
  return (
    <div className="hub-page" dir="ltr">
      <HubHeader active={activeNav} />
      <main className="hub-main">{children}</main>
      <HubFooter />
      <HoursModal />
      <AuthModal />
      {notify && <div className="hub-toast hub-neon-box">{notify}</div>}
    </div>
  );
}
