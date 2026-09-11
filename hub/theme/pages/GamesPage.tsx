import { useState } from "react";
import { Link } from "wouter";
import { HubPage } from "../../design-system/chrome";
import { HubIcon } from "../../design-system/icons";
import { ADULT_GAMES, KIDS_GAMES } from "../data";
import { useHub } from "../HubContext";

type View = "categories" | "kids" | "adults" | "requests";

export default function GamesPage() {
  const [view, setView] = useState<View>("categories");
  const [reqTitle, setReqTitle] = useState("");
  const [reqPlatform, setReqPlatform] = useState("PS5");
  const [reqReason, setReqReason] = useState("");
  const { flash } = useHub();

  const handleReqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim()) return;
    flash(`🎮 Game request submitted: "${reqTitle}" (${reqPlatform})`);
    setReqTitle("");
    setReqReason("");
    setView("categories");
  };

  return (
    <HubPage activeNav="GAMES">
      
      {/* ── CATEGORIES HUB VIEW ─────────────────────────────────────── */}
      {view === "categories" && (
        <section className="hub-games-hub">
          <div className="hub-games-hub-header">
            <div className="hub-games-icon-top">
              <HubIcon.Gamepad size={44} />
            </div>
            <h1 className="hub-games-hub-title">GAMES</h1>
            <p className="hub-games-hub-sub">CHOOSE A CATEGORY</p>
          </div>

          <div className="hub-category-deck">
            
            {/* 1. KIDS GAMES CARD */}
            <div
              className="hub-cat-card hub-cat-card--kids"
              onClick={() => setView("kids")}
            >
              <div className="hub-cat-bg hub-cat-bg-kids" />
              <div className="hub-cat-overlay" />
              <div className="hub-cat-top-tag">
                <span className="hub-cat-tag-icon">🎮</span>
                <span>KIDS</span>
              </div>
              <div className="hub-cat-content">
                <h3 className="hub-cat-title">KIDS</h3>
                <p className="hub-cat-desc">Fun & safe games for younger players</p>
                <div className="hub-cat-circle-btn">→</div>
              </div>
            </div>

            {/* 2. ADULTS GAMES CARD */}
            <div
              className="hub-cat-card hub-cat-card--adults"
              onClick={() => setView("adults")}
            >
              <div className="hub-cat-bg hub-cat-bg-adults" />
              <div className="hub-cat-overlay" />
              <div className="hub-cat-top-tag">
                <span className="hub-cat-tag-icon">⚡</span>
                <span>ADULTS</span>
              </div>
              <div className="hub-cat-content">
                <h3 className="hub-cat-title">ADULTS</h3>
                <p className="hub-cat-desc">Action, sports, racing and more</p>
                <div className="hub-cat-circle-btn">→</div>
              </div>
            </div>

            {/* 3. GAME REQUESTS CARD */}
            <div
              className="hub-cat-card hub-cat-card--requests"
              onClick={() => setView("requests")}
            >
              <div className="hub-cat-bg hub-cat-bg-requests" />
              <div className="hub-cat-overlay" />
              <div className="hub-cat-top-tag">
                <span className="hub-cat-tag-icon">💬</span>
                <span>COMMUNITY</span>
              </div>
              <div className="hub-cat-content">
                <h3 className="hub-cat-title">GAME REQUESTS</h3>
                <p className="hub-cat-desc">Suggest new games and join the community</p>
                <div className="hub-cat-circle-btn">→</div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── KIDS GAMES VIEW ─────────────────────────────────────────── */}
      {view === "kids" && (
        <section className="hub-games-list-section">
          <div className="hub-section-top-nav">
            <button
              type="button"
              className="hub-back-btn"
              onClick={() => setView("categories")}
            >
              ← BACK TO GAMES
            </button>
            <div className="hub-section-header-group">
              <div className="hub-header-icon-wrap" style={{ color: "#00e5ff" }}>
                <HubIcon.Gamepad size={36} />
              </div>
              <h1 className="hub-list-title hub-title-cyan">KIDS GAMES</h1>
              <p className="hub-list-subtitle">FUN & SAFE GAMES FOR YOUNGER PLAYERS</p>
            </div>
            <div className="hub-neon-slogan-corner">
              <span>Good Games</span>
              <b>Good People</b>
            </div>
          </div>

          <div className="hub-game-rows-container">
            {KIDS_GAMES.map((g, i) => (
              <article key={i} className="hub-game-row-card hub-card-glow-cyan">
                
                {/* Left: Game Banner */}
                <div className="hub-game-banner">
                  <div className="hub-game-poster-mock" style={{ background: `linear-gradient(135deg, hsl(${i * 45 + 180}, 75%, 25%), hsl(${i * 45 + 210}, 85%, 15%))` }}>
                    <span className="hub-game-logo-tx">{g.title}</span>
                  </div>
                </div>

                {/* Center: Details & Genre Tags */}
                <div className="hub-game-info-col">
                  <h3 className="hub-game-row-title">{g.title}</h3>
                  <div className="hub-game-tags">
                    {g.genre.map((tag, tIdx) => (
                      <span key={tIdx} className="hub-genre-pill">{tag}</span>
                    ))}
                  </div>
                  <p className="hub-game-row-desc">{g.desc}</p>
                </div>

                {/* Right: PEGI Badges & Console Meta */}
                <div className="hub-game-meta-col">
                  <div className="hub-pegi-badge" style={{ backgroundColor: g.pegiColor }}>
                    <span className="hub-pegi-num">{g.pegi.replace('PEGI ', '')}</span>
                    <span className="hub-pegi-sub">{g.pegi}<br/><small>Suitable for all ages</small></span>
                  </div>
                  <div className="hub-meta-specs">
                    <div className="hub-spec-item">
                      <span>👥</span>
                      <span>{g.players}</span>
                    </div>
                    <div className="hub-spec-item">
                      <span>🎮</span>
                      <span>{g.console}</span>
                    </div>
                    <div className="hub-spec-item">
                      <span>🌐</span>
                      <span>{g.mode}</span>
                    </div>
                  </div>
                </div>

              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── ADULTS GAMES VIEW ───────────────────────────────────────── */}
      {view === "adults" && (
        <section className="hub-games-list-section">
          <div className="hub-section-top-nav">
            <button
              type="button"
              className="hub-back-btn"
              onClick={() => setView("categories")}
            >
              ← BACK TO GAMES
            </button>
            <div className="hub-section-header-group">
              <div className="hub-header-icon-wrap" style={{ color: "#ff2db0" }}>
                <HubIcon.Gamepad size={36} />
              </div>
              <h1 className="hub-list-title hub-title-magenta">ADULTS GAMES</h1>
              <p className="hub-list-subtitle">ACTION • SPORTS • RACING • AND MORE - NEXT LEVEL GAMING AT BAZINO</p>
            </div>
            <div className="hub-neon-slogan-corner">
              <span>Good Games</span>
              <b>Good People</b>
            </div>
          </div>

          <div className="hub-game-rows-container">
            {ADULT_GAMES.map((g, i) => (
              <article key={i} className="hub-game-row-card hub-card-glow-magenta">
                
                {/* Left: Game Banner */}
                <div className="hub-game-banner">
                  <div className="hub-game-poster-mock" style={{ background: `linear-gradient(135deg, hsl(${i * 45 + 320}, 75%, 22%), hsl(${i * 45 + 350}, 85%, 12%))` }}>
                    <span className="hub-game-logo-tx">{g.title}</span>
                  </div>
                </div>

                {/* Center: Details & Genre Tags */}
                <div className="hub-game-info-col">
                  <h3 className="hub-game-row-title">{g.title}</h3>
                  <div className="hub-game-tags">
                    {g.genre.map((tag, tIdx) => (
                      <span key={tIdx} className="hub-genre-pill hub-genre-pill--adult">{tag}</span>
                    ))}
                  </div>
                  <p className="hub-game-row-desc">{g.desc}</p>
                </div>

                {/* Right: PEGI Badges & Console Meta */}
                <div className="hub-game-meta-col">
                  <div className="hub-pegi-badge" style={{ backgroundColor: g.pegiColor }}>
                    <span className="hub-pegi-num">{g.pegi.replace('PEGI ', '')}</span>
                    <span className="hub-pegi-sub">{g.pegi}<br/><small>Suitable for ages {g.pegi.replace('PEGI ', '')}+</small></span>
                  </div>
                  <div className="hub-meta-specs">
                    <div className="hub-spec-item">
                      <span>👥</span>
                      <span>{g.players}</span>
                    </div>
                    <div className="hub-spec-item">
                      <span>🎮</span>
                      <span>{g.console}</span>
                    </div>
                    <div className="hub-spec-item">
                      <span>🌐</span>
                      <span>{g.mode}</span>
                    </div>
                  </div>
                </div>

              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── GAME REQUESTS FORM VIEW ─────────────────────────────────── */}
      {view === "requests" && (
        <section className="hub-requests-section">
          <div className="hub-section-top-nav">
            <button
              type="button"
              className="hub-back-btn"
              onClick={() => setView("categories")}
            >
              ← BACK TO GAMES
            </button>
            <div className="hub-section-header-group">
              <div className="hub-header-icon-wrap" style={{ color: "#ffd700" }}>
                <HubIcon.Gamepad size={36} />
              </div>
              <h1 className="hub-list-title hub-title-gold">GAME REQUESTS</h1>
              <p className="hub-list-subtitle">SUGGEST NEW GAMES & EXPAND THE BAZINO GAMING LIBRARY</p>
            </div>
          </div>

          <div className="hub-request-card">
            <form onSubmit={handleReqSubmit} className="hub-req-form">
              <div className="hub-form-field">
                <label>GAME TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Street Fighter 6, Black Myth: Wukong"
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  className="hub-req-input"
                />
              </div>

              <div className="hub-form-field">
                <label>TARGET PLATFORM</label>
                <select
                  value={reqPlatform}
                  onChange={(e) => setReqPlatform(e.target.value)}
                  className="hub-req-select"
                >
                  <option value="PS5">PlayStation 5</option>
                  <option value="PS5 Pro">PlayStation 5 Pro</option>
                  <option value="Xbox Series X">Xbox Series X</option>
                  <option value="PC">PC Gaming Rig</option>
                </select>
              </div>

              <div className="hub-form-field">
                <label>WHY SHOULD WE ADD THIS GAME?</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about tournament potential, multiplayer fun, or community demand…"
                  value={reqReason}
                  onChange={(e) => setReqReason(e.target.value)}
                  className="hub-req-textarea"
                />
              </div>

              <button type="submit" className="hub-req-submit-btn">
                <span>SUBMIT GAME REQUEST</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </section>
      )}

    </HubPage>
  );
}
