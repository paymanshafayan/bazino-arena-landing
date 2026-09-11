import { Link } from "wouter";
import { HubPage } from "../../design-system/chrome";
import { HubIcon } from "../../design-system/icons";

export default function PricesPage() {
  return (
    <HubPage activeNav="PRICES">
      
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <section className="hub-section-top-nav">
        <div className="hub-section-header-group">
          <div className="hub-header-icon-wrap" style={{ color: "#00e5ff" }}>
            <HubIcon.Prices size={40} />
          </div>
          <h1 className="hub-list-title hub-title-cyan">PRICES</h1>
          <p className="hub-list-subtitle">PLAY • RELAX • ENJOY TOGETHER</p>
        </div>
        <div className="hub-neon-slogan-corner">
          <span>Good Games</span>
          <b>Good People</b>
        </div>
      </section>

      {/* ── 3 HERO PRICING CARDS ────────────────────────────────────── */}
      <section className="hub-prices-grid">
        
        {/* 1. 85" TV Card */}
        <div className="hub-price-card hub-price-card--85">
          <div className="hub-price-card-header">
            <h2 className="hub-price-title">85" TV</h2>
            <span className="hub-price-sub">+ 2 CONTROLLERS</span>
          </div>
          
          <div className="hub-price-screen-holder">
            <div className="hub-price-screen-img hub-screen-85">
              <span className="hub-screen-badge-ps5">PS5</span>
              <span className="hub-screen-game-tag">FC 26</span>
            </div>
            <div className="hub-screen-side-badge">
              <span>BIGGER</span>
              <span>GAMES</span>
              <span>BIGGER</span>
              <span>FUN</span>
            </div>
          </div>

          <div className="hub-price-tag-box hub-tag-cyan">
            <span className="hub-price-amount">250 TL</span>
            <span className="hub-price-unit">/ HOUR</span>
          </div>
        </div>

        {/* 2. 65" TV Card */}
        <div className="hub-price-card hub-price-card--65">
          <div className="hub-price-card-header">
            <h2 className="hub-price-title">65" TV</h2>
            <span className="hub-price-sub">+ 2 CONTROLLERS</span>
          </div>
          
          <div className="hub-price-screen-holder">
            <div className="hub-price-screen-img hub-screen-65">
              <span className="hub-screen-badge-forza">FORZA</span>
              <span className="hub-screen-game-tag">HORIZON 5</span>
            </div>
            <div className="hub-screen-side-badge hub-badge-pink">
              <span>GREAT</span>
              <span>GAMES</span>
              <span>GREAT</span>
              <span>PEOPLE</span>
            </div>
          </div>

          <div className="hub-price-tag-box hub-tag-magenta">
            <span className="hub-price-amount">200 TL</span>
            <span className="hub-price-unit">/ HOUR</span>
          </div>
        </div>

        {/* 3. Extra Controller Card */}
        <div className="hub-price-card hub-price-card--extra">
          <div className="hub-price-card-header">
            <h2 className="hub-price-title hub-title-green">EXTRA CONTROLLER</h2>
            <span className="hub-price-sub">PER ADDITIONAL CONTROLLER</span>
          </div>
          
          <div className="hub-price-screen-holder">
            <div className="hub-price-screen-img hub-screen-controller">
              <span className="hub-screen-badge-ps5">PS5</span>
              <span className="hub-screen-game-tag">DUALSENSE</span>
            </div>
            <div className="hub-screen-side-badge hub-badge-green">
              <span>PLAY</span>
              <span>MORE</span>
              <span>TOGETHER</span>
            </div>
          </div>

          <div className="hub-price-tag-box hub-tag-green">
            <span className="hub-price-amount">25 TL</span>
            <span className="hub-price-unit">/ HOUR</span>
          </div>
        </div>

      </section>

      {/* ── 4 FEATURE PILLS STRIP ───────────────────────────────────── */}
      <section className="hub-feature-pills-strip">
        <div className="hub-feature-pill">
          <span className="hub-pill-icon">👥</span>
          <div>
            <b>Play Together</b>
            <small>More friends, more fun</small>
          </div>
        </div>

        <div className="hub-feature-pill">
          <span className="hub-pill-icon">🎮</span>
          <div>
            <b>Top Games</b>
            <small>PS5 and the latest titles</small>
          </div>
        </div>

        <div className="hub-feature-pill">
          <span className="hub-pill-icon">⏱️</span>
          <div>
            <b>Flexible Time</b>
            <small>Play as long as you want</small>
          </div>
        </div>

        <div className="hub-feature-pill">
          <span className="hub-pill-icon">⭐</span>
          <div>
            <b>Great Experience</b>
            <small>Premium screens & setup</small>
          </div>
        </div>
      </section>

    </HubPage>
  );
}
