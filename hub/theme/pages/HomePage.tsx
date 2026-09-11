import { useState } from "react";
import { Link } from "wouter";
import { HubIcon } from "../../design-system";
import { HubPage } from "../../design-system/chrome";

const QUICK_TILES = [
  { href: "/hub/games", title: "GAMES", sub: "Explore all games for kids & adults", icon: <HubIcon.Gamepad size={48} />, tone: "cyan" },
  { href: "/hub/events", title: "EVENTS", sub: "Tournaments, matches and special events", icon: <HubIcon.Trophy size={48} />, tone: "magenta" },
  { href: "/hub/gallery", title: "GALLERY", sub: "Photos from Bazino gaming club", icon: <HubIcon.Gallery size={48} />, tone: "purple" },
  { href: "/hub/prices", title: "PRICES", sub: "Play time & packages for everyone", icon: <HubIcon.Prices size={48} />, tone: "cyan" },
  { href: "/hub/shop", title: "SHOP", sub: "Gaming gear, accessories & more", icon: <HubIcon.Shop size={48} />, tone: "magenta" },
  { href: "/hub/food", title: "FOOD & DRINKS", sub: "Snacks, drinks and delicious food", icon: <HubIcon.Food size={48} />, tone: "orange" },
  { href: "/hub/about", title: "ABOUT", sub: "About Bazino and our space", icon: <HubIcon.About size={48} />, tone: "pink" },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(1); // 0: Left tournament, 1: Center feature, 2: Right match

  return (
    <HubPage activeNav="HOME">
      
      {/* ── 3-PANEL SPLIT HERO SHOWCASE ─────────────────────────────── */}
      <section className="hub-split-hero">
        
        {/* Left Card: Upcoming Tournament Preview */}
        <div className="hub-hero-card hub-hero-card-left">
          <div className="hub-hero-card-bg hub-hero-bg-tournament" />
          <div className="hub-hero-card-overlay" />
          <div className="hub-hero-card-content">
            <span className="hub-hero-tag">TOURNAMENT</span>
            <h3 className="hub-hero-card-title">FC24 / FC26</h3>
            <p className="hub-hero-card-meta">SATURDAY, 14 JUNE • 16:00</p>
            <Link href="/hub/events/weekly" className="hub-hero-arrow-btn" aria-label="Previous">
              ‹
            </Link>
          </div>
        </div>

        {/* Center Stage: Cinematic Feature Game / Event Banner */}
        <div className="hub-hero-card hub-hero-card-center">
          <div className="hub-hero-card-bg hub-hero-bg-gta" />
          <div className="hub-hero-card-overlay" />
          
          <div className="hub-hero-center-content">
            <span className="hub-hero-badge-pill">COMING SOON</span>
            <h2 className="hub-hero-main-title">
              Grand Theft Auto <span className="hub-gta-vi">VI</span>
            </h2>
            <p className="hub-hero-sub-text">THE NEXT GENERATION OF CRIME</p>
            
            <Link href="/hub/games" className="hub-hero-cta-btn">
              <span>MORE INFO</span>
              <span className="hub-cta-arrow">→</span>
            </Link>

            {/* Pagination Dots */}
            <div className="hub-hero-dots">
              <span className="hub-dot is-active" />
              <span className="hub-dot" />
              <span className="hub-dot" />
              <span className="hub-dot" />
            </div>
          </div>
        </div>

        {/* Right Card: Live Match / Big Screen Preview */}
        <div className="hub-hero-card hub-hero-card-right">
          <div className="hub-hero-card-bg hub-hero-bg-match" />
          <div className="hub-hero-card-overlay" />
          <div className="hub-hero-card-content">
            <span className="hub-hero-live-badge">LIVE MATCH</span>
            <div className="hub-match-teams">
              <div className="hub-team-block">
                <span className="hub-team-crest">👑</span>
                <span className="hub-team-name">REAL MADRID</span>
              </div>
              <span className="hub-match-vs">VS</span>
              <div className="hub-team-block">
                <span className="hub-team-crest">🛡️</span>
                <span className="hub-team-name">BARCELONA</span>
              </div>
            </div>
            <p className="hub-hero-card-meta">TONIGHT 21:00</p>
            <Link href="/hub/events" className="hub-hero-arrow-btn" aria-label="Next">
              ›
            </Link>
          </div>
        </div>

      </section>

      {/* ── 7 QUICK ACCESS TILES (3D High-Res Neon Cards) ───────────── */}
      <section className="hub-quick-access-section">
        <div className="hub-quick-grid">
          {QUICK_TILES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`hub-quick-card hub-quick-card--${t.tone}`}
            >
              <div className="hub-quick-icon-wrap">
                {t.icon}
              </div>
              <h4 className="hub-quick-title">{t.title}</h4>
              <p className="hub-quick-sub">{t.sub}</p>
              <div className="hub-quick-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

    </HubPage>
  );
}
