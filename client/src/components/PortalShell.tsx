/*
 * Bazino visual direction: the internal portal keeps the Hall of Legends language,
 * but prioritizes wayfinding. Every route gets the same dark-gold shell, active route
 * cue, language switcher, official site CTA, and responsive navigation.
 */
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { portalNav, type PortalPageId } from "@/data/portalData";

type Props = { children: ReactNode; current?: PortalPageId };

type Language = "TR" | "FA" | "EN" | "RU";

export default function PortalShell({ children, current }: Props) {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("TR");

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = language === "FA" ? "rtl" : "ltr";
    document.body.dataset.locale = language.toLowerCase();
  }, [language]);

  const goHome = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="portal-shell">
      <header className="portal-header">
        <Link className="portal-brand" href="/" onClick={() => setMenuOpen(false)}>
          <span className="portal-brand-mark">B</span>
          <span><b>BAZINO</b><small>GAMING LOUNGE</small></span>
        </Link>
        <nav className={`portal-nav ${menuOpen ? "portal-nav--open" : ""}`} aria-label="Portal navigation">
          <Link href="/" className={location === "/" ? "is-active" : ""} onClick={() => setMenuOpen(false)}>Arena</Link>
          {portalNav.map((item) => <Link key={item.id} href={`/${item.id}`} className={current === item.id ? "is-active" : ""} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </nav>
        <div className="portal-header-actions">
          <label className="portal-language"><span className="sr-only">Language</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label="Language"><option>TR</option><option>FA</option><option>EN</option><option>RU</option></select></label>
          <a className="portal-cta" href="https://bazino.pro" target="_blank" rel="noreferrer">Reserve <ArrowUpRight size={14} /></a>
          <button className="portal-menu-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>
      <main className="portal-main">{children}</main>
      <footer className="portal-footer">
        <div className="portal-footer-grid">
          <button type="button" className="portal-footer-brand" onClick={goHome}><span className="portal-brand-mark">B</span><span><b>BAZINO</b><small>GAMING LOUNGE</small></span></button>
          <p>Your next round starts here.</p>
          <span className="portal-address"><MapPin size={13} /> Vistamare Hotel · İskele, Cyprus</span>
        </div>
        <div className="portal-footer-bottom"><span>© 2026 BAZINO GAMING LOUNGE</span><a href="https://bazino.pro" target="_blank" rel="noreferrer">Official site <ArrowUpRight size={13} /></a><span>Portal theme / Hall of Legends</span></div>
      </footer>
    </div>
  );
}
