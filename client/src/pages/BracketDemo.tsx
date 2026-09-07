import { useState } from "react";
import "./bracket-demo.css";

/* ─────────────────────────────────────────────────────────────────────────
   BAZINO — TOURNAMENT BRACKETS (frontend fidelity demo)
   Dark/neon page matching the Hasti reference mockup. Static sample data;
   in the real portal it comes from the backend/admin bracket panel.
   ───────────────────────────────────────────────────────────────────────── */

const NAV = ["HOME", "GAMES", "EVENTS", "GALLERY", "PRICES", "SHOP", "SHOP", "FOOD & DRINKS", "ABOUT", "CONTACT"];

type P = [string, number, string?, number?];
const LEFT: P[] = [
  ["ArmanK", 4, "RezaFun", 1], ["AliGameR", 3, "Parham", 2],
  ["Shayan", 4, "AmirT", 0], ["NimaPro", 3, "DarkLord", 1],
  ["RezaB", 4, "Hesam", 2], ["Mahan10", 3, "AliReza", 1],
  ["KianPro", 4, "Soroush", 0], ["Hitman", 3, "Behrad", 2],
];
const RIGHT: P[] = [
  ["RezaMVP", 4, "Arash", 1], ["Mahan10", 4, "Pouya", 2],
  ["Amin", 2, "Sina", 4], ["Mehrad", 1, "Kasra", 3],
  ["Farhad", 4, "AmirHossein", 1], ["Erfan", 2, "Sasra", 4],
  ["Dave", 1, "Iman", 3], ["ArmanT", 0, "Saeed", 4],
];
/* winners advancing per round (index = match within round) */
const L16: P[] = [["ArmanK",4,"AliGameR",2],["Shayan",3,"NimaPro",1],["RezaB",4,"Mahan10",2],["KianPro",3,"Hitman",1]];
const R16: P[] = [["RezaMVP",4,"Rinah",1],["Sina",2,"Kasra",1],["Farhad",4,"Sasra",2],["Iman",3,"Saeed",4]];
const LQF: P[] = [["ArmanK",4,"Shayan",1],["RezaB",2,"KianPro",3]];
const RQF: P[] = [["Mahan10",4,"Saeed",1],["Farhad",4,"Navid",2]];
const LSF: P[] = [["ArmanK", 4]];
const RSF: P[] = [["Mahan10", 3, "Saeed", 1]];
const FINAL: P = ["ArmanK", 5, "Mahan10", 3];

const GAMES = [
  { name: "FC 26", title: "Weekly Tournament #13", date: "29 Aug 2026", players: 32, cover: "fc26", status: "COMPLETED", live: false },
  { name: "UFC 5", title: "Weekly Tournament #12", date: "22 Aug 2026", players: 32, cover: "ufc5", status: "COMPLETED", live: false },
  { name: "MORTAL KOMBAT 1", title: "Weekly Tournament #11", date: "15 Aug 2026", players: 32, cover: "mk1", status: "COMPLETED", live: false },
  { name: "TEKKEN 8", title: "Weekly Tournament #10", date: "08 Aug 2026", players: 32, cover: "tekken8", status: "COMPLETED", live: false },
  { name: "FC 26", title: "Weekly Tournament #9", date: "01 Aug 2026", players: 32, cover: "fc26", status: "COMPLETED", live: false },
  { name: "UFC 5", title: "Weekly Tournament #8", date: "25 Jul 2026", players: 32, cover: "ufc5", status: "COMPLETED", live: false },
  { name: "MORTAL KOMBAT 1", title: "Weekly Tournament #7", date: "18 Jul 2026", players: 32, cover: "mk1", status: "LIVE", live: true },
];

function hue(name: string) { let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }

/* inline neon line icons (stroke = currentColor) */
const I = (path: React.ReactNode, vb = "0 0 24 24") =>
  ({ size = 18, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) => (
    <svg width={size} height={size} viewBox={vb} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">{path}</svg>
  );
const Icon = {
  Trophy: I(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>),
  Calendar: I(<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  Users: I(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>),
  Pin: I(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  Clock: I(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  Chat: I(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>),
  Gram: I(<><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>),
  Globe: I(<><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" /></>),
  Bell: I(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>),
  Chevron: I(<path d="m6 9 6 6 6-6" />, "0 0 24 24"),
  Star: I(<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />),
  Crown: I(<path d="m2 18 2-11 5 4 3-6 3 6 5-4 2 11H2Zm0 2h20v2H2z" />),
  Crown2: I(<><path d="M3 7l4 5 5-7 5 7 4-5-2 12H5L3 7z" /><path d="M5 19h14" /></>),
};

function Avatar({ name, size = 20 }: { name: string; size?: number }) {
  return <span className="bk-av" style={{ width: size, height: size, fontSize: size * 0.5, background: `linear-gradient(135deg,hsl(${hue(name)} 65% 38%),hsl(${(hue(name)+45)%360} 65% 22%))`, boxShadow: `0 0 8px hsl(${hue(name)} 90% 60% / .55)` }}>{name.charAt(0)}</span>;
}

function MatchCard({ m, seeds }: { m: P; seeds?: [number, number] }) {
  const wa = (m[1] as number) > ((m[3] as number) ?? -1);
  return (
    <div className="bk-mcard">
      <div className={`bk-row ${wa ? "win" : "lose"}`}>
        {seeds && <span className="bk-seed">{seeds[0]}</span>}
        <Avatar name={m[0]} />
        <span className="bk-name">{m[0]}</span>
        <span className={`bk-score ${wa ? "win" : ""}`}>{m[1]}</span>
      </div>
      {m[2] && (
        <div className={`bk-row ${!wa ? "win" : "lose"}`}>
          {seeds && <span className="bk-seed">{seeds[1]}</span>}
          <Avatar name={m[2]} />
          <span className="bk-name">{m[2]}</span>
          <span className={`bk-score ${!wa ? "win" : ""}`}>{m[3]}</span>
        </div>
      )}
    </div>
  );
}

/* recursive bracket tree with explicit connector lines */
function TreeNode({ level, pair, rounds, mirror }: { level: number; pair: number; rounds: P[][]; mirror?: boolean }) {
  const current = rounds[level][pair];
  const seeds = level === 0 ? ([pair * 2 + 1, pair * 2 + 2] as [number, number]) : undefined;
  if (level === 0) {
    return <div className="bk-leaf"><MatchCard m={current} seeds={seeds} /></div>;
  }
  return (
    <div className={`bk-node ${mirror ? "mirror" : ""}`}>
      <div className="bk-children">
        <TreeNode level={level - 1} pair={pair * 2} rounds={rounds} mirror={mirror} />
        <TreeNode level={level - 1} pair={pair * 2 + 1} rounds={rounds} mirror={mirror} />
      </div>
      <div className="bk-link"><span className="bk-v" /><span className="bk-h-top" /><span className="bk-h-bot" /><span className="bk-h-mid" /></div>
      <div className="bk-curm"><MatchCard m={current} /></div>
    </div>
  );
}
function HalfTree({ rounds, mirror }: { rounds: P[][]; mirror?: boolean }) {
  return <div className={`bk-half ${mirror ? "mirror" : ""}`}><TreeNode level={rounds.length - 1} pair={0} rounds={rounds} mirror={mirror} /></div>;
}

const LABELS = ["ROUND OF 32", "ROUND OF 16", "QUARTER FINALS", "SEMI FINALS"];

export default function BracketDemo() {
  const [tab, setTab] = useState<"weekly" | "special">("weekly");
  const [filter, setFilter] = useState("ALL");
  const [sel, setSel] = useState(0);
  const FILTERS = ["ALL", "CURRENT", "UPCOMING", "COMPLETED"];
  const leftRounds: P[][] = [LEFT, L16, LQF, LSF];
  const rightRounds: P[][] = [RIGHT, R16, RQF, RSF];

  return (
    <div className="bk-page" dir="ltr">
      {/* HEADER */}
      <header className="bk-header">
        <div className="bk-logo">
          <svg viewBox="0 0 48 32" width="42" height="28" className="bk-logo-pad"><defs><linearGradient id="bklg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22d3ff" /><stop offset="1" stopColor="#ff2db0" /></linearGradient></defs><g fill="none" stroke="url(#bklg)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 24h20c4 0 7-3 7-7 0-5-3-8-8-8-3 0-5 1.4-9 1.4S18 9 15 9c-5 0-8 3-8 8 0 4 3 7 7 7z" /><path d="M14 24c-1 3-3 5-6 6M34 24c1 3 3 5 6 6M18 12l2 3M26 12l-2 3" /></g></svg>
          <span className="bk-logo-word"><b>BAZINO</b><small>GAMING CLUB</small></span>
        </div>
        <nav className="bk-nav">
          {NAV.map((n, i) => <a key={i} className={n === "EVENTS" ? "active" : ""}>{n}</a>)}
        </nav>
        <div className="bk-head-right">
          <button className="bk-lang"><Icon.Globe size={15} /> TR <Icon.Chevron size={12} /></button>
          <button className="bk-bell"><Icon.Bell size={18} /><span className="bk-dot" /></button>
          <div className="bk-user">
            <Avatar name="ArmanK" size={34} />
            <span className="bk-user-meta"><b>ArmanK</b><small>#BZN1024</small></span>
            <i>▾</i>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bk-hero">
        <div className="bk-hero-glow g1" /><div className="bk-hero-glow g2" /><div className="bk-hero-glow g3" />
        <div className="bk-neon-sign s1">Play<br />Compete<br />Win</div>
        <div className="bk-neon-sign s2">Good Games<br />Good People</div>
        <div className="bk-hero-inner">
          <div className="bk-hero-title"><span className="bk-trophy"><Icon.Trophy size={48} /></span><h1>TOURNAMENT <em>BRACKETS</em></h1></div>
          <p className="bk-hero-sub">LIVE &amp; PAST TOURNAMENT <em>RESULTS</em></p>
          <p className="bk-hero-line">REAL PLAYERS &nbsp;•&nbsp; REAL MATCHES &nbsp;•&nbsp; REAL COMPETITION &nbsp;•&nbsp; LASTING LEGENDS</p>
          <div className="bk-tabs">
            <button className={`bk-tab weekly ${tab === "weekly" ? "on" : ""}`} onClick={() => setTab("weekly")}>
              <span className="bk-tab-ic"><Icon.Calendar size={26} /></span><span className="bk-tab-tx"><b>WEEKLY TOURNAMENTS</b><small>Regular weekly competitions</small></span>
            </button>
            <button className={`bk-tab special ${tab === "special" ? "on" : ""}`} onClick={() => setTab("special")}>
              <span className="bk-tab-ic star"><Icon.Star size={26} /></span><span className="bk-tab-tx"><b>SPECIAL EVENTS</b><small>Big tournaments &amp; unique events</small></span>
            </button>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="bk-body">
        <aside className="bk-side">
          <h3>TOURNAMENTS</h3>
          <p className="bk-side-note">Select a tournament to view the bracket</p>
          <div className="bk-filters">
            {FILTERS.map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? (f === "CURRENT" ? "green" : "on") : ""}>{f}</button>)}
          </div>
          <div className="bk-game-list">
            {GAMES.map((g, i) => (
              <button key={i} className={`bk-game ${sel === i ? "sel" : ""}`} onClick={() => setSel(i)}>
                <img src={`/src/demo/covers/${g.cover}.png`} alt={g.name} />
                <span className="bk-game-meta">
                  <b>{g.name}</b>
                  <small>{g.title}</small>
                  <span className="bk-game-info"><Icon.Calendar size={11} /> {g.date} &nbsp;·&nbsp; <Icon.Users size={11} /> {g.players} Players</span>
                </span>
                <span className={`bk-gbadge ${g.live ? "live" : ""}`}><Icon.Trophy size={11} /> {g.status}</span>
                <i className="bk-garrow">›</i>
              </button>
            ))}
          </div>
        </aside>

        <section className="bk-panel">
          <div className="bk-panel-head">
            <img src="/src/demo/covers/fc26.png" alt="FC26" className="bk-panel-cover" />
            <div className="bk-panel-title">
              <h2>FC26 <em>WEEKLY TOURNAMENT #13</em></h2>
              <div className="bk-panel-info">
                <span><Icon.Calendar size={13} /> 29 AUGUST 2026</span><span><Icon.Users size={13} /> 32 PLAYERS</span><span className="gold"><Icon.Trophy size={13} /> COMPLETED</span>
              </div>
            </div>
          </div>

          <div className="bk-scroll">
            <div className="bk-labels">
              {LABELS.map(l => <span key={l} className="bk-lbl">{l}</span>)}
              <span className="bk-lbl center">FINAL</span>
              {[...LABELS].reverse().map(l => <span key={"r" + l} className="bk-lbl">{l.replace("SEMI FINALS","SEMI FINALS")}</span>)}
            </div>
            <div className="bk-bracket">
              <HalfTree rounds={leftRounds} />
              <div className="bk-center">
                <div className="bk-final"><MatchCard m={FINAL} /></div>
                <div className="bk-champ">
                  <div className="bk-champ-trophy"><Icon.Trophy size={42} /></div>
                  <div className="bk-champ-word">CHAMPION</div>
                  <div className="bk-champ-av"><Avatar name="ArmanK" size={72} /></div>
                  <b>ArmanK</b><small>#BZN1024</small>
                </div>
              </div>
              <HalfTree rounds={rightRounds} mirror />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bk-footer">
        <div className="bk-foot-logo"><b>BAZINO</b><small>GAMING CLUB</small></div>
        <div className="bk-foot-item"><span className="bk-fic pink"><Icon.Pin size={18} /></span><span>Iskele, Long Beach,<br /><b>Hotel VistaMare</b></span></div>
        <div className="bk-foot-item"><span className="bk-fic red"><Icon.Clock size={18} /></span><span>OPEN EVERYDAY<br /><b>11:00 – 23:50</b></span></div>
        <div className="bk-foot-item"><span className="bk-fic green"><Icon.Chat size={18} /></span><span>WHATSAPP<br /><b>+90 539 112 37 47</b></span></div>
        <div className="bk-foot-item"><span className="bk-fic ig"><Icon.Gram size={18} /></span><span>INSTAGRAM<br /><b>@bazinopro</b></span></div>
        <div className="bk-foot-sign"><Icon.Crown2 size={22} style={{ margin: "0 auto 4px" }} /> More Than a Game<br /><i>A Community</i></div>
      </footer>
    </div>
  );
}
