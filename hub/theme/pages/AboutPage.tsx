import { HubPage } from "../../design-system/chrome";
import { HubIcon } from "../../design-system/icons";
import { GOOGLE_MAPS } from "../data";

export default function AboutPage() {
  return (
    <HubPage activeNav="ABOUT">
      
      {/* ── ABOUT HERO SECTION ─────────────────────────────────────── */}
      <section className="hub-about-hero">
        <div className="hub-about-badge">
          <span>A B O U T</span>
        </div>
        
        <h1 className="hub-about-title">
          <span className="hub-txt-cyan">BAZ</span>
          <span className="hub-txt-magenta">INO</span>
        </h1>
        <div className="hub-about-subclub">GAMING CLUB</div>
        
        <div className="hub-about-slogan-line">
          <span>GOOD GAMES.</span>
          <span>GOOD PEOPLE.</span>
        </div>

        <div className="hub-about-intro-text">
          <p>
            BAZINO is a gaming club in Long Beach, Iskele, created for people who love gaming, competition and spending great time together.
          </p>
          <p>
            Whether you are a casual player or a serious competitor, BAZINO is the place to play, meet and belong.
          </p>
        </div>
      </section>

      {/* ── 4 FEATURE PILLARS ───────────────────────────────────────── */}
      <section className="hub-about-features-grid">
        
        {/* 1. PS5 Gaming */}
        <div className="hub-pillar-card hub-pillar-cyan">
          <div className="hub-pillar-icon">
            <HubIcon.Gamepad size={36} />
          </div>
          <h3 className="hub-pillar-title">PS5 GAMING</h3>
          <p className="hub-pillar-desc">Play the latest games on next-gen consoles.</p>
        </div>

        {/* 2. Big Screen Experience */}
        <div className="hub-pillar-card hub-pillar-magenta">
          <div className="hub-pillar-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff2db0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h3 className="hub-pillar-title">BIG SCREEN EXPERIENCE</h3>
          <p className="hub-pillar-desc">Bigger screens. Bigger moments.</p>
        </div>

        {/* 3. Tournaments & Events */}
        <div className="hub-pillar-card hub-pillar-purple">
          <div className="hub-pillar-icon">
            <HubIcon.Trophy size={36} />
          </div>
          <h3 className="hub-pillar-title">TOURNAMENTS & EVENTS</h3>
          <p className="hub-pillar-desc">Join competitions and win amazing prizes.</p>
        </div>

        {/* 4. Friendly Gaming Space */}
        <div className="hub-pillar-card hub-pillar-gold">
          <div className="hub-pillar-icon">
            <HubIcon.Users size={36} />
          </div>
          <h3 className="hub-pillar-title">FRIENDLY GAMING SPACE</h3>
          <p className="hub-pillar-desc">Play, meet, relax and be part of the community.</p>
        </div>

      </section>

      {/* ── COMMUNITY QUOTE ─────────────────────────────────────────── */}
      <section className="hub-quote-section">
        <span className="hub-quote-mark">“</span>
        <div className="hub-quote-text">
          <span>SAME GAMES.</span>
          <span>A BRIGHTER COMMUNITY.</span>
        </div>
      </section>

      {/* ── VISIT BAZINO CARD ───────────────────────────────────────── */}
      <section className="hub-about-visit-card">
        <div className="hub-visit-left">
          <span className="hub-visit-pin-icon">
            <HubIcon.Pin size={28} />
          </span>
          <div>
            <small className="hub-visit-kicker">VISIT BAZINO</small>
            <h3 className="hub-visit-name">İskele, Long Beach</h3>
            <p className="hub-visit-hotel">Hotel VistaMare</p>
          </div>
        </div>

        <a
          href={GOOGLE_MAPS}
          target="_blank"
          rel="noreferrer"
          className="hub-get-directions-btn"
        >
          <span>🚀</span>
          <span>GET DIRECTIONS</span>
        </a>
      </section>

    </HubPage>
  );
}
