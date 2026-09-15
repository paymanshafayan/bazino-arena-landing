/*
 * Bazino visual direction: the internal portal keeps the Hall of Legends language,
 * but prioritizes wayfinding. Every route gets the same dark-gold shell, active route
 * cue, language switcher, official site CTA, and responsive navigation.
 */
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { portalNav, type PortalPageId } from "@/data/portalData";
import PortalDock from "@/components/PortalDock";

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
      <PortalDock mode="floating" currentId={current} />
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
