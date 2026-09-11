import { useState } from "react";
import { Link } from "wouter";
import { HubAvatar, HubIcon, LaurelTrophy } from "../../design-system";
import { HubPage } from "../../design-system/chrome";
import { daysLeft, LEADERBOARD, SEASON_WINDOWS, SEASONS, SPECIAL, WEEKLY } from "../data";
import { useHub } from "../HubContext";
import fc26 from "../../bracket-demo/covers/fc26.png";
import ufc5 from "../../bracket-demo/covers/ufc5.png";
import mk1 from "../../bracket-demo/covers/mk1.png";
import tekken8 from "../../bracket-demo/covers/tekken8.png";
import banner from "../../bracket-demo/covers/banner-bracket.jpg";

const COVERS: Record<string, string> = { fc26, ufc5, mk1, tekken8 };

// ── EVENTS HUB PAGE ────────────────────────────────────────────────
export function EventsHubPage() {
  return (
    <HubPage activeNav="EVENTS">
      
      {/* Top Header */}
      <section className="hub-section-top-nav">
        <div className="hub-section-header-group">
          <div className="hub-header-icon-wrap" style={{ color: "#ff2db0" }}>
            <HubIcon.Trophy size={40} />
          </div>
          <h1 className="hub-list-title hub-title-magenta">EVENTS</h1>
          <p className="hub-list-subtitle">PLAY • COMPETE • EARN • BE A LEGEND</p>
          <div className="hub-events-subbar">
            <span>TOURNAMENTS</span>
            <span>|</span>
            <span>SEASON RANKINGS</span>
            <span>|</span>
            <span>SPECIAL EVENTS</span>
            <span>|</span>
            <span>REAL PLAYERS</span>
            <span>|</span>
            <span>REAL PRIZES</span>
          </div>
        </div>
      </section>

      {/* 4 Large 3D Event Portals */}
      <section className="hub-events-4portals">
        
        {/* 1. Weekly Tournaments */}
        <article className="hub-eportal-card hub-eportal--magenta">
          <header className="hub-eportal-head">
            <HubIcon.Calendar size={24} />
            <div>
              <b>WEEKLY TOURNAMENTS</b>
              <small>Regular weekly competition</small>
            </div>
          </header>
          <div className="hub-eportal-art">
            <img src={fc26} alt="FC26" />
          </div>
          <div className="hub-eportal-specs">
            <span>👥 32 Players</span>
            <span>🏆 Knockout Format</span>
            <span>📅 Every Saturday</span>
            <span>🎮 Different Games</span>
            <span>⭐ Earn Rewards</span>
          </div>
          <p className="hub-eportal-blurb">
            Join our weekly tournaments, show your skills and compete for rewards!
          </p>
          <Link href="/hub/events/weekly" className="hub-eportal-btn">
            <span>VIEW TOURNAMENTS</span>
            <span>→</span>
          </Link>
        </article>

        {/* 2. Special Events */}
        <article className="hub-eportal-card hub-eportal--cyan">
          <header className="hub-eportal-head">
            <HubIcon.Trophy size={24} />
            <div>
              <b>SPECIAL EVENTS</b>
              <small>Big competitions & unique cups</small>
            </div>
          </header>
          <div className="hub-eportal-art">
            <img src={ufc5} alt="Special" />
          </div>
          <div className="hub-eportal-specs">
            <span>🏆 Unique Tournaments</span>
            <span>💰 Bigger Prizes</span>
            <span>🎮 Different Games</span>
            <span>⚙️ Special Rules & Formats</span>
            <span>👑 Exclusive Cups</span>
          </div>
          <p className="hub-eportal-blurb">
            Take part in our special events and experience the biggest tournaments at Bazino!
          </p>
          <Link href="/hub/events/special" className="hub-eportal-btn">
            <span>VIEW EVENTS</span>
            <span>→</span>
          </Link>
        </article>

        {/* 3. Season Ranking */}
        <article className="hub-eportal-card hub-eportal--green">
          <header className="hub-eportal-head">
            <HubIcon.Users size={24} />
            <div>
              <b>SEASON RANKING</b>
              <small>Spring • Summer • Autumn • Winter</small>
            </div>
          </header>
          <div className="hub-eportal-art hub-eportal-crown-art">
            <LaurelTrophy size={80} />
          </div>
          <div className="hub-eportal-specs">
            <span>📊 Live Season Rankings</span>
            <span>⭐ Earn Points</span>
            <span>🎁 Win Season Rewards</span>
            <span>👥 Compare with Other Players</span>
            <span>👑 Be the Season Champion</span>
          </div>
          <p className="hub-eportal-blurb">
            Compete all season, collect points and climb the leaderboard. Make your name in Bazino history!
          </p>
          <Link href="/hub/events/season" className="hub-eportal-btn">
            <span>VIEW RANKINGS</span>
            <span>→</span>
          </Link>
        </article>

        {/* 4. Tournament Brackets */}
        <article className="hub-eportal-card hub-eportal--gold">
          <header className="hub-eportal-head">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="15" y="10" width="6" height="4" rx="1"/><path d="M9 5h3v14H9M12 12h3"/></svg>
            <div>
              <b>TOURNAMENT BRACKETS</b>
              <small>Live & Past Tournament Results</small>
            </div>
          </header>
          <div className="hub-eportal-art">
            <img src={banner} alt="Brackets" />
          </div>
          <div className="hub-eportal-specs">
            <span>🔴 Current Tournament (Live)</span>
            <span>📅 Next Tournament</span>
            <span>🌳 Full Tournament Brackets</span>
            <span>📋 Match Results</span>
            <span>👑 Players & Winners</span>
          </div>
          <p className="hub-eportal-blurb">
            Follow the current tournament, see live results and explore all past tournaments with full brackets.
          </p>
          <Link href="/hub/events/brackets" className="hub-eportal-btn">
            <span>VIEW BRACKETS</span>
            <span>→</span>
          </Link>
        </article>

      </section>
    </HubPage>
  );
}

// ── WEEKLY TOURNAMENTS PAGE ────────────────────────────────────────
export function WeeklyPage() {
  return (
    <HubPage activeNav="EVENTS">
      
      {/* Header */}
      <section className="hub-section-top-nav">
        <Link href="/hub/events" className="hub-back-btn">
          ← BACK TO EVENTS
        </Link>
        <div className="hub-section-header-group">
          <div className="hub-header-icon-wrap" style={{ color: "#ff2db0" }}>
            <HubIcon.Calendar size={36} />
          </div>
          <h1 className="hub-list-title hub-title-magenta">WEEKLY TOURNAMENTS</h1>
          <p className="hub-list-subtitle">PLAY • COMPETE • EARN CREDITS • BE A LEGEND</p>
        </div>
      </section>

      {/* Tournament Rows */}
      <section className="hub-tournament-rows-container">
        {WEEKLY.map((w, idx) => (
          <article key={idx} className="hub-tournament-row-card hub-tcard-glow-magenta">
            
            {/* Game Art */}
            <div className="hub-trow-art">
              <img src={COVERS[w.cover]} alt={w.title} />
            </div>

            {/* Info */}
            <div className="hub-trow-info">
              <h3 className="hub-trow-title">{w.title}</h3>
              <p className="hub-trow-blurb">{w.blurb}</p>
              <div className="hub-game-tags">
                {w.tags.map((t, tIdx) => (
                  <span key={tIdx} className="hub-genre-pill">{t}</span>
                ))}
              </div>
            </div>

            {/* Stat Blocks */}
            <div className="hub-trow-stats">
              <div className="hub-stat-box">
                <span className="hub-stat-icon">📅</span>
                <b>{w.when}</b>
              </div>
              <div className="hub-stat-box">
                <span className="hub-stat-icon">👥</span>
                <b>MAX {w.max} PLAYERS</b>
              </div>
              <div className="hub-stat-box hub-stat-box-gold">
                <span className="hub-stat-icon">🏆</span>
                <b>PRIZE {w.prize}</b>
              </div>
            </div>

            {/* Action */}
            <div className="hub-trow-action">
              <Link href="/hub/events/brackets" className="hub-btn-view-details">
                <span>VIEW DETAILS</span>
                <span>→</span>
              </Link>
            </div>

          </article>
        ))}
      </section>

    </HubPage>
  );
}

// ── SPECIAL EVENTS PAGE ───────────────────────────────────────────
export function SpecialPage() {
  return (
    <HubPage activeNav="EVENTS">
      
      {/* Header */}
      <section className="hub-section-top-nav">
        <Link href="/hub/events" className="hub-back-btn">
          ← BACK TO EVENTS
        </Link>
        <div className="hub-section-header-group">
          <div className="hub-header-icon-wrap" style={{ color: "#00e5ff" }}>
            <HubIcon.Trophy size={36} />
          </div>
          <h1 className="hub-list-title hub-title-cyan">SPECIAL EVENTS</h1>
          <p className="hub-list-subtitle">BIGGER GAMES • HIGHER PRIZES • RARE MOMENTS</p>
          <small style={{ color: "#cbd5e1" }}>Unique tournaments, limited in time. Don't miss the action!</small>
        </div>
      </section>

      {/* Special Event Rows with Cash Prizes */}
      <section className="hub-tournament-rows-container">
        {SPECIAL.map((s, idx) => (
          <article key={idx} className="hub-special-row-card hub-tcard-glow-cyan">
            
            {/* Game Art */}
            <div className="hub-trow-art">
              <img src={COVERS[s.cover]} alt={s.title} />
            </div>

            {/* Info */}
            <div className="hub-trow-info">
              <h3 className="hub-trow-title">{s.title}</h3>
              <p className="hub-trow-blurb">{s.blurb}</p>
              <div className="hub-game-tags">
                {s.tags.map((t, tIdx) => (
                  <span key={tIdx} className="hub-genre-pill hub-genre-pill--special">{t}</span>
                ))}
              </div>
              <div className="hub-special-meta-row">
                <span>📅 {s.date}</span>
                <span>⏱️ {s.time}</span>
                <span>👥 {s.max} PLAYERS</span>
              </div>
            </div>

            {/* Entry Fee & BC Bonus */}
            <div className="hub-fee-col">
              <div className="hub-fee-badge">
                <small>ENTRY FEE</small>
                <b>{s.fee}</b>
              </div>
              <div className="hub-bc-bonus-badge">
                <span>🎁 {s.bcReward}</span>
                <small>For Participation</small>
              </div>
            </div>

            {/* Podium Prizes Matrix */}
            <div className="hub-prizes-podium-matrix">
              <div className="hub-podium-prize hub-prize-1st">
                <span className="hub-prize-trophy">🥇 1ST PLACE</span>
                <b>{s.first}</b>
              </div>
              <div className="hub-podium-prize hub-prize-2nd">
                <span className="hub-prize-trophy">🥈 2ND PLACE</span>
                <b>{s.second}</b>
              </div>
              <div className="hub-podium-prize hub-prize-3rd">
                <span className="hub-prize-trophy">🥉 3RD PLACE</span>
                <b>{s.third}</b>
              </div>
            </div>

          </article>
        ))}
      </section>

    </HubPage>
  );
}

// ── SEASON RANKING PAGE (3-Column Layout) ──────────────────────────
export function SeasonPage() {
  const [season, setSeason] = useState<(typeof SEASONS)[number]>("SPRING");
  const win = SEASON_WINDOWS[season];
  const left = daysLeft(win.end);

  return (
    <HubPage activeNav="EVENTS">
      
      {/* Header */}
      <section className="hub-section-top-nav">
        <Link href="/hub/events" className="hub-back-btn">
          ← BACK TO EVENTS
        </Link>
        <div className="hub-section-header-group">
          <div className="hub-header-icon-wrap" style={{ color: "#00ff88" }}>
            <HubIcon.Users size={36} />
          </div>
          <h1 className="hub-list-title hub-title-green">SEASON RANKING</h1>
          <p className="hub-list-subtitle">EARN POINTS • CLIMB THE LEADERBOARD • BECOME THE SEASON CHAMPION</p>
        </div>
      </section>

      {/* Season Tabs & Countdown Bar */}
      <div className="hub-season-nav-bar">
        <div className="hub-season-tabs">
          {SEASONS.map((s) => (
            <button
              key={s}
              type="button"
              className={`hub-season-tab ${s === season ? "is-active" : ""}`}
              onClick={() => setSeason(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="hub-season-meta-badge">
          <span>{season} SEASON | {win.from} - {win.to}</span>
          <span className="hub-season-countdown">⏱️ SEASON ENDS IN {left} DAYS</span>
        </div>
      </div>

      {/* 3-Column Season Layout */}
      <section className="hub-season-3col-layout">
        
        {/* Left Column: Point System */}
        <div className="hub-season-left-col">
          <div className="hub-points-system-card">
            <h3 className="hub-ps-title">
              <span>📊</span>
              <span>POINT SYSTEM</span>
            </h3>
            <p className="hub-ps-sub">Earn season points by ranking in tournaments.</p>
            
            <div className="hub-ps-group">
              <h4>📅 WEEKLY TOURNAMENTS</h4>
              <div className="hub-ps-row"><span>🥇 1st Place</span><b>5 Points</b></div>
              <div className="hub-ps-row"><span>🥈 2nd Place</span><b>2 Points</b></div>
              <div className="hub-ps-row"><span>🥉 3rd Place</span><b>1 Point</b></div>
            </div>

            <div className="hub-ps-group hub-ps-group-special">
              <h4>⭐ SPECIAL EVENTS</h4>
              <div className="hub-ps-row"><span>🥇 1st Place</span><b>10 Points</b></div>
              <div className="hub-ps-row"><span>🥈 2nd Place</span><b>4 Points</b></div>
              <div className="hub-ps-row"><span>🥉 3rd Place</span><b>2 Points</b></div>
            </div>

            <div className="hub-ps-motto">
              <HubIcon.Gamepad size={28} />
              <div>
                <b>Play More</b>
                <b>Earn More</b>
                <small>Be the Champion!</small>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Season Leaderboard Table */}
        <div className="hub-season-center-col">
          <div className="hub-leaderboard-card">
            <div className="hub-lb-head">
              <h3 className="hub-lb-title">
                <span>🏆</span>
                <span>SEASON LEADERBOARD</span>
              </h3>
              <span className="hub-lb-meta">FC26 • PS5 • 1v1</span>
            </div>

            <table className="hub-lb-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>PLAYER</th>
                  <th>BZN ID</th>
                  <th>POINTS</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map((p) => {
                  const isTop1 = p.rank === 1;
                  const isTop2 = p.rank === 2;
                  const isTop3 = p.rank === 3;
                  return (
                    <tr
                      key={p.rank}
                      className={`hub-lb-row ${isTop1 ? "is-rank1" : isTop2 ? "is-rank2" : isTop3 ? "is-rank3" : ""}`}
                    >
                      <td className="hub-lb-rank">
                        {isTop1 ? "👑 1" : isTop2 ? "🥈 2" : isTop3 ? "🥉 3" : p.rank}
                      </td>
                      <td className="hub-lb-player">
                        <div className="hub-player-chip">
                          <HubAvatar name={p.name} size={30} ring={isTop1 ? "gold" : isTop2 ? "cyan" : isTop3 ? "magenta" : "none"} />
                          <b>{p.name}</b>
                        </div>
                      </td>
                      <td className="hub-lb-id">{p.tag}</td>
                      <td className="hub-lb-pts">
                        <b>{p.pts}</b>
                        <small>POINTS</small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Current Season Top 3 Podium Cards */}
        <div className="hub-season-right-col">
          <div className="hub-top3-podium-card">
            <h3 className="hub-top3-title">
              <span>👑</span>
              <span>CURRENT SEASON TOP 3</span>
            </h3>

            {/* 1st Place */}
            <div className="hub-podium-player-card hub-podium-card-1st">
              <div className="hub-podium-crown">👑 1ST PLACE</div>
              <div className="hub-podium-avatar-wrap">
                <HubAvatar name="ArmanK" size={64} ring="gold" />
              </div>
              <h4 className="hub-podium-name">ArmanK</h4>
              <span className="hub-podium-tag">#BZN1024</span>
              <div className="hub-podium-score">48 Points</div>
            </div>

            {/* 2nd Place */}
            <div className="hub-podium-player-card hub-podium-card-2nd">
              <div className="hub-podium-crown">🥈 2ND PLACE</div>
              <div className="hub-podium-avatar-wrap">
                <HubAvatar name="RezaB" size={54} ring="cyan" />
              </div>
              <h4 className="hub-podium-name">RezaB</h4>
              <span className="hub-podium-tag">#BZN0876</span>
              <div className="hub-podium-score">42 Points</div>
            </div>

            {/* 3rd Place */}
            <div className="hub-podium-player-card hub-podium-card-3rd">
              <div className="hub-podium-crown">🥉 3RD PLACE</div>
              <div className="hub-podium-avatar-wrap">
                <HubAvatar name="Mahan10" size={54} ring="magenta" />
              </div>
              <h4 className="hub-podium-name">Mahan10</h4>
              <span className="hub-podium-tag">#BZN0341</span>
              <div className="hub-podium-score">35 Points</div>
            </div>

            <div className="hub-podium-quote">
              <p>“Same Games Bigger Legends”</p>
              <small>BAZINO</small>
            </div>
          </div>
        </div>

      </section>

    </HubPage>
  );
}

export function RegisterEventPage() {
  return (
    <HubPage activeNav="EVENTS">
      <section className="hub-section-top-nav">
        <Link href="/hub/events" className="hub-back-btn">
          ← BACK TO EVENTS
        </Link>
        <div className="hub-section-header-group">
          <h1 className="hub-list-title hub-title-cyan">TOURNAMENT REGISTRATION</h1>
          <p className="hub-list-subtitle">JOIN THE NEXT WEEKLY OR SPECIAL CHAMPIONSHIP</p>
        </div>
      </section>
      <div className="hub-request-card" style={{ maxWidth: 640, margin: "0 auto" }}>
        <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
          To register for upcoming weekly tournaments or special events, select your tournament from the list or visit the front desk at Bazino Gaming Club.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
          <Link href="/hub/events/weekly" className="hub-req-submit-btn">
            VIEW WEEKLY TOURNAMENTS →
          </Link>
        </div>
      </div>
    </HubPage>
  );
}
