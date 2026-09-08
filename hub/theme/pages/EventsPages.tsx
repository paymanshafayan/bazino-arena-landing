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
import hero from "../../design-system/assets/hero-setup.jpg";

const COVERS: Record<string, string> = { fc26, ufc5, mk1, tekken8 };

function Hero({ title, em, line, back }: { title: string; em?: string; line: string; back?: boolean }) {
  return (
    <section className="hub-page-hero" style={{ backgroundImage: `url(${hero})` }}>
      {back && <Link href="/hub/events" className="hub-back">← BACK TO EVENTS</Link>}
      <h1>{title}{em && <> <em>{em}</em></>}</h1>
      <p>{line}</p>
    </section>
  );
}

export function EventsHubPage() {
  return (
    <HubPage activeNav="EVENTS">
      <Hero title="EVENTS" line="PLAY · COMPETE · EARN CREDITS · BE A LEGEND" />
      <section className="hub-evgrid">
        <article className="hub-evcard hub-neon-box hub-neon-box--purple is-purple">
          <header><HubIcon.Calendar size={22} /><span><b>WEEKLY TOURNAMENTS</b><small>Regular weekly competition</small></span></header>
          <div className="hub-evart"><img src={fc26} alt="" /></div>
          <div className="hub-evlist">
            <span>32 Players</span><span>Knockout format</span><span>Every Saturday</span><span>Earn credits</span>
          </div>
          <Link href="/hub/events/weekly" className="hub-evcta">VIEW TOURNAMENTS →</Link>
        </article>
        <article className="hub-evcard hub-neon-box hub-neon-box--magenta is-magenta">
          <header><HubIcon.Star size={22} /><span><b>SPECIAL EVENTS</b><small>Big competitions & showcases</small></span></header>
          <div className="hub-evart"><img src={ufc5} alt="" /></div>
          <div className="hub-evlist">
            <span>Unique tournaments</span><span>Bigger prizes</span><span>Special rules & formats</span><span>Invitation cups</span>
          </div>
          <Link href="/hub/events/special" className="hub-evcta">VIEW EVENTS →</Link>
        </article>
        <article className="hub-evcard hub-neon-box hub-neon-box--green is-green">
          <header><HubIcon.Users size={22} /><span><b>SEASON RANKING</b><small>Spring · Summer · Autumn · Winter</small></span></header>
          <div className="hub-evart" style={{ background: "radial-gradient(circle at 50% 40%, rgba(234,176,61,0.35), #0b1020)" }}>
            <LaurelTrophy size={72} />
          </div>
          <div className="hub-evlist">
            <span>Live season standings</span><span>Earn season points</span><span>Win season rewards</span><span>Be the season champion</span>
          </div>
          <Link href="/hub/events/season" className="hub-evcta">VIEW RANKING →</Link>
        </article>
        <article className="hub-evcard hub-neon-box hub-neon-box--gold is-gold">
          <header><HubIcon.Trophy size={22} /><span><b>TOURNAMENT BRACKETS</b><small>Live & past results</small></span></header>
          <div className="hub-evart"><img src={banner} alt="" /></div>
          <div className="hub-evlist">
            <span>Current tournament draw</span><span>Full 32-player brackets</span><span>Match results</span><span>TV overlay ready</span>
          </div>
          <Link href="/hub/events/brackets" className="hub-evcta">VIEW BRACKETS →</Link>
        </article>
        <article className="hub-evcard hub-neon-box hub-neon-box--cyan is-cyan">
          <header><HubIcon.Gamepad size={22} /><span><b>REGISTER</b><small>Join the next weekly</small></span></header>
          <div className="hub-evart" style={{ backgroundImage: `url(${mk1})` }} />
          <div className="hub-evlist">
            <span>Pick a title</span><span>Pay 150 ₺ entry at the desk</span><span>Name on the bracket</span><span>Show up, play, advance</span>
          </div>
          <Link href="/hub/events/register" className="hub-evcta">REGISTER →</Link>
        </article>
      </section>
    </HubPage>
  );
}

export function WeeklyPage() {
  return (
    <HubPage activeNav="EVENTS">
      <Hero title="WEEKLY" em="TOURNAMENTS" line="PLAY · COMPETE · EARN CREDITS · BE A LEGEND" back />
      <section className="hub-rows">
        {WEEKLY.map((w) => (
          <article key={w.title} className={`hub-row hub-neon-box hub-neon-box--${w.tone}`}>
            <img src={COVERS[w.cover]} alt="" />
            <div>
              <h3>{w.title}</h3>
              <p>{w.blurb}</p>
              <div className="hub-tags">{w.tags.map((t) => <i key={t}>{t}</i>)}</div>
              {/* PDF §11 — schedule, time, entry fee and prizes all live on the card. */}
              <div className="hub-row-facts">
                <span><HubIcon.Calendar size={13} /> {w.when} · {w.date}</span>
                <span><HubIcon.Clock size={13} /> {w.time}</span>
                <span><HubIcon.Users size={13} /> MAX {w.max} PLAYERS</span>
              </div>
            </div>
            <div className="hub-row-meta">
              <div className="hub-stat is-fee"><b>{w.fee}</b><small>ENTRY FEE</small></div>
              <div className="hub-stat is-gold"><b>{w.first}</b><small>1ST PRIZE</small></div>
              <div className="hub-stat"><b>{w.second}</b><small>2ND</small></div>
              <div className="hub-stat"><b>{w.third}</b><small>3RD</small></div>
              <div className="hub-stat"><HubIcon.Trophy size={16} /><b>{w.prize}</b><small>CREDITS</small></div>
            </div>
          </article>
        ))}
      </section>
    </HubPage>
  );
}

export function SpecialPage() {
  return (
    <HubPage activeNav="EVENTS">
      <Hero title="SPECIAL" em="EVENTS" line="BIGGER GAMES · HIGHER PRIZES · RARE MOMENTS" back />
      <section className="hub-rows">
        {SPECIAL.map((w) => (
          <article key={w.title} className="hub-row hub-neon-box hub-neon-box--magenta">
            <img src={COVERS[w.cover]} alt="" />
            <div>
              <h3>{w.title}</h3>
              <p>{w.blurb}</p>
              <div className="hub-tags">{w.tags.map((t) => <i key={t}>{t}</i>)}</div>
              <small style={{ color: "#7f8fc0" }}>{w.date} · {w.max} PLAYERS</small>
            </div>
            <div className="hub-row-meta">
              <div className="hub-stat"><b>{w.fee}</b><small>ENTRY</small></div>
              <div className="hub-stat"><b>{w.first}</b><small>1ST</small></div>
              <div className="hub-stat"><b>{w.second}</b><small>2ND</small></div>
              <div className="hub-stat"><b>{w.third}</b><small>3RD</small></div>
              <div className="hub-stat"><b>+10 BC</b><small>PLAY</small></div>
            </div>
          </article>
        ))}
      </section>
    </HubPage>
  );
}

export function SeasonPage() {
  const [season, setSeason] = useState<(typeof SEASONS)[number]>("SUMMER");
  const window = SEASON_WINDOWS[season];
  const left = daysLeft(window.end);
  return (
    <HubPage activeNav="EVENTS">
      <Hero title="SEASON" em="RANKING" line="EARN POINTS · CLIMB THE LEADERBOARD · BECOME THE SEASON CHAMPION" back />
      <div className="hub-season-tabs">
        {SEASONS.map((s) => (
          <button key={s} type="button" className={s === season ? "is-on" : ""} onClick={() => setSeason(s)}>{s}</button>
        ))}
      </div>
      {/* PDF §13 — countdown of the days left in the running season. */}
      <div className="hub-season-clock hub-neon-box hub-neon-box--gold">
        <span><small>SEASON</small><b>{season}</b></span>
        <span><small>WINDOW</small><b>{window.from} – {window.to}</b></span>
        <span className="is-count"><small>DAYS LEFT</small><b>{left}</b></span>
        <span><small>POINTS RESET</small><b>AT SEASON END</b></span>
      </div>
      <section className="hub-season">
        <aside className="hub-box hub-neon-box hub-neon-box--purple hub-pts">
          <h3>POINT SYSTEM</h3>
          <article className="hub-neon-box hub-neon-box--cyan">
            <b>WEEKLY TOURNAMENTS</b>
            <ul><li>1st Place <b>5 Points</b></li><li>2nd Place <b>2 Points</b></li><li>3rd Place <b>1 Point</b></li></ul>
          </article>
          <article className="hub-neon-box hub-neon-box--magenta">
            <b>SPECIAL EVENTS</b>
            <ul><li>1st Place <b>10 Points</b></li><li>2nd Place <b>4 Points</b></li><li>3rd Place <b>2 Points</b></li></ul>
          </article>
          <p style={{ color: "#7f8fc0", fontSize: 12 }}>Season points rank the champion. They are not Bazino Credits / wallet cash.</p>
        </aside>
        <div className="hub-box hub-neon-box">
          <h3>SEASON LEADERBOARD · {season}</h3>
          <table className="hub-lb">
            <thead><tr><th>#</th><th>PLAYER</th><th>GAME</th><th>PTS</th></tr></thead>
            <tbody>
              {LEADERBOARD.map((r) => (
                <tr key={r.rank} className={r.rank <= 3 ? `is-${r.rank}` : ""}>
                  <td>{r.rank}</td>
                  <td style={{ display: "flex", gap: 8, alignItems: "center" }}><HubAvatar name={r.name} size={22} /> {r.name} <small style={{ color: "#3ccaf5" }}>{r.tag}</small></td>
                  <td>{r.game}</td>
                  <td><b>{r.pts}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="hub-box hub-neon-box hub-neon-box--gold hub-top3">
          <h3>TOP 3</h3>
          {LEADERBOARD.slice(0, 3).map((r) => (
            <article key={r.rank} className="hub-neon-box hub-neon-box--gold">
              <HubAvatar name={r.name} size={44} ring="gold" />
              <div><small>#{r.rank}</small><b>{r.name}</b><span>{r.pts} Points</span></div>
            </article>
          ))}
        </aside>
      </section>
    </HubPage>
  );
}

export function RegisterEventPage() {
  const { flash, user, setAuthOpen } = useHub();
  const [game, setGame] = useState("FC 26");
  return (
    <HubPage activeNav="EVENTS">
      <Hero title="REGISTER" em="TO PLAY" line="NAME ON THE BRACKET · 150 ₺ AT THE DESK · SHOW UP" back />
      <form
        className="hub-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!user) { setAuthOpen(true, "otp"); return; }
          flash(`Seat held for ${user.displayName} · ${game} · pay 150 ₺ at the desk (demo)`);
        }}
      >
        <div className="hub-field">
          <label>TOURNAMENT</label>
          <select value={game} onChange={(e) => setGame(e.target.value)}>
            {WEEKLY.map((w) => <option key={w.game}>{w.game}</option>)}
          </select>
        </div>
        <div className="hub-field">
          <label>GAMERTAG ON BRACKET</label>
          <input defaultValue={user?.displayName ?? ""} placeholder="ArmanK" />
        </div>
        <button className="hub-cta" type="submit">HOLD MY SEAT</button>
        {/* PDF §23 — payments are cash / card machine at the club, never online. */}
        <p className="hub-form-note">Entry fee 150 ₺ — paid in cash or by card at the desk when you check in.</p>
      </form>
    </HubPage>
  );
}
