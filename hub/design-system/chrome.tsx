import { useState, type ReactNode } from "react";
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
      <svg viewBox="0 0 48 32" width={size + 16} height={size} className="hub-logo-pad" aria-hidden="true">
        <defs>
          <linearGradient id="hub-logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#ff2db0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#hub-logo-g)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 24h20c4 0 7-3 7-7 0-5-3-8-8-8-3 0-5 1.4-9 1.4S18 9 15 9c-5 0-8 3-8 8 0 4 3 7 7 7z" />
          <path d="M14 24c-1 3-3 5-6 6M34 24c1 3 3 5 6 6M18 12l2 3M26 12l-2 3" />
        </g>
      </svg>
      <span className="hub-logo-word">
        <span className="hub-logo-brand">BAZINO</span>
        <span className="hub-logo-sub">GAMING CLUB</span>
      </span>
    </Link>
  );
}

function activeFromPath(path: string) {
  if (path.startsWith("/hub/games")) return "GAMES";
  if (path.startsWith("/hub/events") || path.startsWith("/hub/bracket") || path.startsWith("/brackets")) return "EVENTS";
  if (path.startsWith("/hub/gallery")) return "GALLERY";
  if (path.startsWith("/hub/prices")) return "PRICES";
  if (path.startsWith("/hub/shop")) return "SHOP";
  if (path.startsWith("/hub/food")) return "FOOD & DRINKS";
  if (path.startsWith("/hub/about") || path.startsWith("/hub/club")) return "ABOUT";
  if (path.startsWith("/hub/contact")) return "CONTACT";
  if (path === "/hub" || path === "/hub/") return "HOME";
  return "";
}

export function HubHeader({ active }: { active?: string }) {
  const [loc] = useLocation();
  const { lang, setLang, user, setUser, setAuthOpen, mobileNav, setMobileNav } = useHub();
  const on = active ?? activeFromPath(loc);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const langs: { code: Lang; label: string; flag: string }[] = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "tr", label: "TR", flag: "🇹🇷" },
    { code: "fa", label: "FA", flag: "🇮🇷" },
    { code: "ru", label: "RU", flag: "🇷🇺" },
  ];

  return (
    <>
      <header className="hub-header">
        <HubLogo />
        
        {/* Navigation Menu (9 Target Items - strictly NO CHAT) */}
        <nav className="hub-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={n.id === on ? "is-on" : ""}>
              {n.id}
            </Link>
          ))}
        </nav>

        {/* Right Header Actions */}
        <div className="hub-head-right">
          
          {/* Language Selector */}
          <div className="hub-lang-selector">
            <button
              type="button"
              className="hub-chip"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <HubIcon.Globe size={14} />
              <span className="hub-chip-tx">{lang.toUpperCase()} ▾</span>
            </button>
            {langMenuOpen && (
              <div className="hub-lang-dropdown">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    className={l.code === lang ? "is-active" : ""}
                    onClick={() => {
                      setLang(l.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button className="hub-bell" type="button" aria-label="notifications">
            <HubIcon.Bell size={18} />
            <span className="hub-bell-badge">1</span>
          </button>

          {/* User Auth Buttons or Profile Chip */}
          {user ? (
            <div className="hub-user-logged">
              <Link href="/hub/profile" className="hub-user-chip">
                <HubAvatar name={user.displayName} size={32} ring="cyan" />
                <span className="hub-user-name">{user.displayName} ▾</span>
              </Link>
              <button
                type="button"
                className="hub-logout-btn"
                onClick={() => setUser(null)}
                title="Log Out"
              >
                <span>LOG OUT</span>
              </button>
            </div>
          ) : (
            <div className="hub-auth-btns">
              <button
                className="hub-btn-register"
                type="button"
                onClick={() => setAuthOpen(true, "otp")}
              >
                + REGISTER
              </button>
              <button
                className="hub-btn-login"
                type="button"
                onClick={() => setAuthOpen(true, "otp")}
              >
                LOGIN
              </button>
            </div>
          )}

          {/* Mobile Hamburger */}
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

      {/* Mobile Drawer */}
      <nav className={`hub-mobile-nav ${mobileNav ? "is-on" : ""}`}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={n.id === on ? "is-on" : ""} onClick={() => setMobileNav(false)}>
            {n.id}
          </Link>
        ))}
      </nav>
    </>
  );
}

export function HubFooter() {
  const { setHoursOpen } = useHub();
  return (
    <footer className="hub-footer">
      {/* 4 Compact Glassmorphic Neon Capsules */}
      <div className="hub-footer-capsules">
        
        {/* 1. Location Pin */}
        <a href={GOOGLE_MAPS} target="_blank" rel="noreferrer" className="hub-capsule hub-capsule-loc">
          <span className="hub-capsule-icon hub-icon-pin">
            <HubIcon.Pin size={20} />
          </span>
          <div className="hub-capsule-text">
            <small>VISIT BAZINO</small>
            <b>İskele, Long Beach, Hotel VistaMare</b>
          </div>
        </a>

        {/* 2. Opening Hours Modal Trigger */}
        <button type="button" onClick={() => setHoursOpen(true)} className="hub-capsule hub-capsule-hours">
          <span className="hub-capsule-icon hub-icon-clock">
            <HubIcon.Clock size={20} />
          </span>
          <div className="hub-capsule-text">
            <small>OPEN EVERYDAY</small>
            <b>11:00 – 23:50 · Click to view →</b>
          </div>
        </button>

        {/* 3. WhatsApp Direct Link */}
        <a href="https://wa.me/905391123747" target="_blank" rel="noreferrer" className="hub-capsule hub-capsule-wa">
          <span className="hub-capsule-icon hub-icon-wa">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </span>
          <div className="hub-capsule-text">
            <small>WHATSAPP</small>
            <b>+90 539 112 37 47</b>
          </div>
        </a>

        {/* 4. Instagram Direct Link */}
        <a href="https://instagram.com/bazinopro" target="_blank" rel="noreferrer" className="hub-capsule hub-capsule-ig">
          <span className="hub-capsule-icon hub-icon-ig">
            <HubIcon.Gram size={20} />
          </span>
          <div className="hub-capsule-text">
            <small>INSTAGRAM</small>
            <b>@bazinopro</b>
          </div>
        </a>

      </div>

      {/* Slogan & Legal Footer */}
      <div className="hub-footer-bottom">
        <div className="hub-brand-slogan">
          <span>BAZINO GAMING CLUB</span>
          <span className="hub-slogan-dots">•</span>
          <span>GOOD GAMES</span>
          <span className="hub-slogan-dots">•</span>
          <span>GOOD PEOPLE</span>
        </div>
        <div className="hub-foot-legal">
          <Link href="/hub/rules">RULES</Link>
          <span>·</span>
          <Link href="/hub/privacy">PRIVACY</Link>
          <span>·</span>
          <Link href="/hub/contact">CONTACT</Link>
          <small>© {new Date().getFullYear()} BAZINO GAMING CLUB — More Than a Game · A Community</small>
        </div>
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
