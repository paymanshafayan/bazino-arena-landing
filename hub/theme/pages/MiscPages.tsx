import { useState } from "react";
import { Link } from "wouter";
import { HubAvatar, HubEmpty, HubIcon } from "../../design-system";
import { HubPage } from "../../design-system/chrome";
import { GOOGLE_MAPS, PROFILE_TABS } from "../data";
import { useHub } from "../HubContext";
import shop from "../assets/shop-soon.jpg";
import food from "../assets/food-soon.jpg";

// ── FOOD & DRINKS PAGE ─────────────────────────────────────────────
export function FoodPage() {
  return (
    <HubPage activeNav="FOOD & DRINKS">
      <section className="hub-food-hero-section">
        <div className="hub-food-neon-icons">
          <HubIcon.Food size={64} />
        </div>

        <h1 className="hub-food-title">
          FOOD & DRINKS <br />
          <span className="hub-food-highlight">COMING SOON!</span>
        </h1>

        <div className="hub-food-gamepad-divider">
          <span>🎮</span>
        </div>

        <p className="hub-food-lead">
          Snacks, drinks & more are coming soon to BAZINO.<br />
          Good food. Great games. Same place.
        </p>

        {/* Hero Photo Card */}
        <div className="hub-food-photo-card">
          <img src={food} alt="Food and Drinks at Bazino" className="hub-food-hero-img" />
          <div className="hub-food-photo-overlay">
            <span className="hub-food-brand-pill">BAZINO GAMING CLUB</span>
          </div>
        </div>

        {/* 4 Feature Pills Strip */}
        <div className="hub-feature-pills-strip hub-food-features">
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">🍔</span>
            <div>
              <b>DELICIOUS FOOD</b>
              <small>Tasty meals for every gamer.</small>
            </div>
          </div>
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">🥤</span>
            <div>
              <b>REFRESHING DRINKS</b>
              <small>Stay cool, play longer.</small>
            </div>
          </div>
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">🍕</span>
            <div>
              <b>MORE VARIETY</b>
              <small>Snacks, desserts and more.</small>
            </div>
          </div>
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">🎮</span>
            <div>
              <b>SAME GREAT ATMOSPHERE</b>
              <small>Good food, good games, good people.</small>
            </div>
          </div>
        </div>
      </section>
    </HubPage>
  );
}

// ── SHOP PAGE ─────────────────────────────────────────────────────
export function ShopPage() {
  return (
    <HubPage activeNav="SHOP">
      <section className="hub-shop-hero-section">
        <div className="hub-shop-neon-icon">
          <HubIcon.Shop size={64} />
        </div>

        <h1 className="hub-shop-title">
          SHOP <br />
          <span className="hub-shop-highlight">COMING SOON!</span>
        </h1>

        <div className="hub-food-gamepad-divider">
          <span>🎮</span>
        </div>

        <p className="hub-shop-lead">
          Something exciting is coming to BAZINO.<br />
          Amazing products, exclusive items and more!
        </p>

        <button type="button" className="hub-btn-stay-tuned">
          STAY TUNED
        </button>

        {/* Merch Display Photo */}
        <div className="hub-shop-photo-card">
          <img src={shop} alt="Bazino Gaming Merch" className="hub-shop-hero-img" />
        </div>

        {/* 4 Feature Pills Strip */}
        <div className="hub-feature-pills-strip hub-shop-features">
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">🎁</span>
            <div>
              <b>EXCLUSIVE ITEMS</b>
              <small>Unique products only for our gamers.</small>
            </div>
          </div>
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">🏷️</span>
            <div>
              <b>SPECIAL OFFERS</b>
              <small>Discounts, bundles and limited deals.</small>
            </div>
          </div>
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">⭐</span>
            <div>
              <b>HIGH QUALITY</b>
              <small>Carefully selected for true gamers.</small>
            </div>
          </div>
          <div className="hub-feature-pill">
            <span className="hub-pill-icon">🔒</span>
            <div>
              <b>MEMBER BENEFITS</b>
              <small>Special rewards for Bazino members.</small>
            </div>
          </div>
        </div>
      </section>
    </HubPage>
  );
}

// ── MY PROFILE & MEMBER HUB ───────────────────────────────────────
export function ProfilePage() {
  const { user, setAuthOpen, setUser, flash } = useHub();

  const mockUser = user || {
    displayName: "Arman Kalantari",
    username: "ArmanK",
    firstName: "Arman",
    lastName: "Kalantari",
    tag: "#BZN1024",
    dob: "12 May 1998",
    phone: "+90 539 112 37 47",
    credits: 1250,
    championships: 5,
    second: 3,
    third: 7,
    memberSince: "AUG 2026",
    status: "ACTIVE",
  };

  return (
    <HubPage>
      
      {/* Header */}
      <section className="hub-section-top-nav">
        <div className="hub-section-header-group">
          <h1 className="hub-list-title hub-title-cyan">MY PROFILE</h1>
          <p className="hub-list-subtitle">GAMER • MEMBER • BAZINO FAMILY</p>
        </div>
        <div className="hub-neon-slogan-corner">
          <span>Good Games</span>
          <b>Good People</b>
        </div>
      </section>

      {/* Profile 2-Column Grid */}
      <section className="hub-profile-grid">
        
        {/* Left Column: Personal Information & Stats */}
        <div className="hub-profile-left">
          
          {/* Personal Information Card */}
          <div className="hub-profile-card hub-card-personal">
            <h3 className="hub-pcard-title">
              <span>👤</span>
              <span>PERSONAL INFORMATION</span>
            </h3>

            <div className="hub-personal-body">
              {/* Avatar Ring */}
              <div className="hub-avatar-ring-wrap">
                <HubAvatar name={mockUser.displayName} size={110} ring="magenta" />
                <button type="button" className="hub-avatar-edit-badge" title="Change Photo">
                  ✏️
                </button>
              </div>

              {/* Data Rows */}
              <div className="hub-personal-fields">
                <div className="hub-pfield-row">
                  <span className="hub-pfield-label">👤 First Name</span>
                  <b className="hub-pfield-value">{mockUser.firstName}</b>
                </div>
                <div className="hub-pfield-row">
                  <span className="hub-pfield-label">👤 Last Name</span>
                  <b className="hub-pfield-value">{mockUser.lastName}</b>
                </div>
                <div className="hub-pfield-row">
                  <span className="hub-pfield-label">@ Username</span>
                  <b className="hub-pfield-value">{mockUser.username}</b>
                </div>
                <div className="hub-pfield-row">
                  <span className="hub-pfield-label"># BZN Member ID</span>
                  <b className="hub-pfield-value hub-tx-cyan">{mockUser.tag}</b>
                </div>
                <div className="hub-pfield-row">
                  <span className="hub-pfield-label">📅 Date of Birth</span>
                  <b className="hub-pfield-value">{mockUser.dob}</b>
                </div>
                <div className="hub-pfield-row">
                  <span className="hub-pfield-label">📞 Phone Number</span>
                  <b className="hub-pfield-value">{mockUser.phone}</b>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="hub-btn-change-pw"
              onClick={() => flash("Password change dialog opened (demo)")}
            >
              <span>🔒 CHANGE PASSWORD</span>
              <span>→</span>
            </button>
          </div>

          {/* Tournament Statistics Matrix */}
          <div className="hub-profile-card hub-card-stats">
            <h3 className="hub-pcard-title">
              <span>🏆</span>
              <span>TOURNAMENT STATISTICS</span>
            </h3>

            <div className="hub-stats-tri-grid">
              <div className="hub-stat-medal-box hub-medal-gold">
                <span className="hub-medal-icon">🏆</span>
                <b>{mockUser.championships}</b>
                <small>Championships</small>
              </div>
              <div className="hub-stat-medal-box hub-medal-silver">
                <span className="hub-medal-icon">🥈</span>
                <b>{mockUser.second}</b>
                <small>Second Places</small>
              </div>
              <div className="hub-stat-medal-box hub-medal-bronze">
                <span className="hub-medal-icon">🥉</span>
                <b>{mockUser.third}</b>
                <small>Third Places</small>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Credits & Holographic Member Card */}
        <div className="hub-profile-right">
          
          {/* Bazino Credits Card */}
          <div className="hub-profile-card hub-card-credits">
            <h3 className="hub-pcard-title">
              <span>🪙</span>
              <span>BAZINO CREDITS</span>
            </h3>
            <div className="hub-credits-display">
              <b>{mockUser.credits.toLocaleString()}</b>
              <span>BC</span>
            </div>
          </div>

          {/* Holographic Bazino Member Card */}
          <div className="hub-profile-card hub-card-member-pass">
            <div className="hub-mpass-head">
              <span className="hub-mpass-crown">👑</span>
              <b>BAZINO MEMBER CARD</b>
            </div>

            <div className="hub-mpass-body">
              <div className="hub-mpass-logo">
                <HubIcon.Gamepad size={32} />
                <b>BAZINO</b>
                <small>GAMING CLUB</small>
              </div>

              <div className="hub-mpass-slogan">
                <span>PLAY</span>
                <span>COMPETE</span>
                <span>EARN</span>
                <span>BE A LEGEND</span>
              </div>

              <div className="hub-mpass-avatar-center">
                <HubAvatar name={mockUser.displayName} size={84} ring="magenta" />
              </div>

              <div className="hub-mpass-user-name">{mockUser.username}</div>
              <div className="hub-mpass-tag">{mockUser.tag}</div>

              <div className="hub-mpass-foot">
                <div>
                  <small>MEMBER SINCE</small>
                  <b>{mockUser.memberSince}</b>
                </div>
                <div>
                  <small>STATUS</small>
                  <span className="hub-mpass-status-badge">ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="hub-mpass-quote">
              <span>Good Players</span>
              <b>Better Legends 👑</b>
            </div>
          </div>

        </div>

      </section>

    </HubPage>
  );
}

// ── RULES PAGE ────────────────────────────────────────────────────
export function RulesPage() {
  return (
    <HubPage>
      <section className="hub-section-top-nav">
        <div className="hub-section-header-group">
          <h1 className="hub-list-title hub-title-cyan">CLUB RULES</h1>
          <p className="hub-list-subtitle">FAIR PLAY & COMMUNITY GUIDELINES</p>
        </div>
      </section>

      <div className="hub-request-card" style={{ maxWidth: 780, margin: "0 auto" }}>
        <ol className="hub-rules-list">
          <li>Respect players, guests and club staff at all times.</li>
          <li>Handle all PS5 consoles, OLED screens and DualSense controllers with care.</li>
          <li>Follow tournament rules and referee decisions during weekly matches.</li>
          <li>No cheating, toxic behavior, fighting or harassment.</li>
          <li>Keep gaming bays clean; food and drinks should be enjoyed responsibly.</li>
          <li>Deliberate equipment damage is charged at full replacement cost.</li>
          <li>Repeated violations will result in temporary or permanent club ban.</li>
        </ol>
      </div>
    </HubPage>
  );
}

// ── PRIVACY PAGE ──────────────────────────────────────────────────
export function PrivacyPage() {
  return (
    <HubPage>
      <section className="hub-section-top-nav">
        <div className="hub-section-header-group">
          <h1 className="hub-list-title hub-title-magenta">PRIVACY POLICY</h1>
          <p className="hub-list-subtitle">HOW WE PROTECT YOUR DATA & PASSES</p>
        </div>
      </section>

      <div className="hub-request-card" style={{ maxWidth: 780, margin: "0 auto", color: "#cbd5e1", lineHeight: 1.8 }}>
        <h3 style={{ color: "#fff", marginBottom: 8 }}>WHAT WE COLLECT</h3>
        <p>Name, username, date of birth, phone number and tournament statistics required for club memberships.</p>
        <h3 style={{ color: "#fff", margin: "20px 0 8px" }}>HOW DATA IS USED</h3>
        <p>To identify members at the desk, verify tournament bracket registrations and track Bazino Credits (BC).</p>
        <h3 style={{ color: "#fff", margin: "20px 0 8px" }}>YOUR RIGHTS</h3>
        <p>You can request your data or account removal at any time by contacting our desk or WhatsApp.</p>
      </div>
    </HubPage>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────
export function ContactPage() {
  const { setHoursOpen } = useHub();
  return (
    <HubPage activeNav="CONTACT">
      <section className="hub-section-top-nav">
        <div className="hub-section-header-group">
          <div className="hub-header-icon-wrap" style={{ color: "#00e5ff" }}>
            <HubIcon.Pin size={40} />
          </div>
          <h1 className="hub-list-title hub-title-cyan">CONTACT & LOCATION</h1>
          <p className="hub-list-subtitle">VISIT BAZINO GAMING CLUB IN İSKELE, NORTH CYPRUS</p>
        </div>
      </section>

      <div className="hub-contact-deck">
        <a className="hub-contact-card hub-contact-card--loc" href={GOOGLE_MAPS} target="_blank" rel="noreferrer">
          <div className="hub-contact-icon-large">📍</div>
          <small>LOCATION</small>
          <h3>İskele, Long Beach</h3>
          <p>Hotel VistaMare, North Cyprus</p>
          <span className="hub-contact-cta">OPEN IN GOOGLE MAPS →</span>
        </a>

        <div className="hub-contact-card" onClick={() => setHoursOpen(true)}>
          <div className="hub-contact-icon-large">🕒</div>
          <small>OPENING HOURS</small>
          <h3>Open Everyday</h3>
          <p>11:00 – 23:50</p>
          <span className="hub-contact-cta">VIEW DAILY SCHEDULE →</span>
        </div>

        <a className="hub-contact-card hub-contact-card--wa" href="https://wa.me/905391123747" target="_blank" rel="noreferrer">
          <div className="hub-contact-icon-large">💬</div>
          <small>WHATSAPP</small>
          <h3>+90 539 112 37 47</h3>
          <p>Direct chat with club reception</p>
          <span className="hub-contact-cta">SEND MESSAGE →</span>
        </a>

        <a className="hub-contact-card hub-contact-card--ig" href="https://instagram.com/bazinopro" target="_blank" rel="noreferrer">
          <div className="hub-contact-icon-large">📷</div>
          <small>INSTAGRAM</small>
          <h3>@bazinopro</h3>
          <p>Follow club events, brackets & highlights</p>
          <span className="hub-contact-cta">VISIT INSTAGRAM →</span>
        </a>
      </div>
    </HubPage>
  );
}

// ── 404 PAGE ──────────────────────────────────────────────────────
export function Hub404() {
  return (
    <HubPage>
      <div className="hub-404" style={{ textAlign: "center", padding: "80px 24px" }}>
        <h1 style={{ fontSize: 72, fontWeight: 900, color: "#ff2db0", margin: 0 }}>404</h1>
        <p style={{ color: "#cbd5e1", margin: "16px 0 32px" }}>This area is uncharted. Return to the main hub.</p>
        <Link href="/hub" className="hub-btn-stay-tuned" style={{ display: "inline-block", textDecoration: "none" }}>
          RETURN TO HOME →
        </Link>
      </div>
    </HubPage>
  );
}
