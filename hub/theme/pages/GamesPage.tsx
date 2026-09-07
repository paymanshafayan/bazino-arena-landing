import { useMemo, useState } from "react";
import { HubPage } from "../../design-system/chrome";
import { SYSTEMS } from "../data";
import { useHub } from "../HubContext";
import kids from "../assets/games-kids.jpg";
import adults from "../assets/games-adults.jpg";
import requests from "../assets/games-requests.jpg";

type View = "pick" | "kids" | "adults" | "requests";

export default function GamesPage() {
  const [view, setView] = useState<View>("pick");
  const [sys, setSys] = useState("tv85");
  const [hours, setHours] = useState(2);
  const [game, setGame] = useState("");
  const { flash, setAuthOpen, user } = useHub();

  const list = useMemo(
    () => SYSTEMS.filter((s) => view === "kids" ? s.group === "kids" || s.group === "any" : s.group !== "kids"),
    [view],
  );
  const selected = SYSTEMS.find((s) => s.id === sys) ?? SYSTEMS[0];
  const total = selected.rate * hours;

  const pay = () => {
    if (!user) {
      setAuthOpen(true, "otp");
      flash("Login with OTP to pay");
      return;
    }
    flash(`PayTR checkout · ${total} ₺ · ${selected.name} · ${hours}h (demo)`);
  };

  return (
    <HubPage activeNav="GAMES">
      <section className="hub-page-hero" style={{ backgroundImage: `url(${adults})` }}>
        {view !== "pick" && (
          <button className="hub-back" type="button" onClick={() => setView("pick")}>← BACK TO GAMES</button>
        )}
        <h1>GAMES <em>& RESERVE</em></h1>
        <p>KIDS · ADULTS · REQUESTS · STATIONS LIVE</p>
      </section>

      {view === "pick" && (
        <section className="hub-tri">
          <button type="button" className="hub-tri-card hub-neon-box hub-neon-box--green" style={{ backgroundImage: `url(${kids})` }} onClick={() => { setView("kids"); setSys("kids"); }}>
            <h2>KIDS</h2>
            <p>Fun & safe games for younger players. Stations with family-friendly titles.</p>
            <span className="hub-tri-cta hub-neon-box hub-neon-box--green">RESERVE →</span>
          </button>
          <button type="button" className="hub-tri-card hub-neon-box hub-neon-box--magenta" style={{ backgroundImage: `url(${adults})` }} onClick={() => { setView("adults"); setSys("tv85"); }}>
            <h2>ADULTS</h2>
            <p>Action, sports, racing and more. 85" and 65" bays with two pads included.</p>
            <span className="hub-tri-cta hub-neon-box hub-neon-box--magenta">RESERVE →</span>
          </button>
          <button type="button" className="hub-tri-card hub-neon-box hub-neon-box--cyan" style={{ backgroundImage: `url(${requests})` }} onClick={() => setView("requests")}>
            <h2>GAME REQUESTS</h2>
            <p>Suggest new games and join the community library.</p>
            <span className="hub-tri-cta hub-neon-box">SUGGEST →</span>
          </button>
        </section>
      )}

      {(view === "kids" || view === "adults") && (
        <section className="hub-reserve">
          <div className="hub-sys">
            {list.map((s) => (
              <button key={s.id} type="button" className={`hub-neon-box ${sys === s.id ? "is-on hub-neon-box--cyan" : ""}`} onClick={() => setSys(s.id)}>
                <span>
                  <b>{s.name}</b>
                  <small style={{ display: "block", color: "#7f8fc0" }}>{s.size} · {s.pads} controller{s.pads > 1 ? "s" : ""} included</small>
                </span>
                <b>{s.rate} ₺/h</b>
              </button>
            ))}
          </div>
          <aside className="hub-pay hub-neon-box hub-neon-box--gold">
            <h3>{view === "kids" ? "KIDS BAY" : "ADULT BAY"}</h3>
            <p style={{ color: "#7f8fc0", marginTop: 0 }}>{selected.name}</p>
            <div className="hub-hours">
              {[1, 2, 3, 4, 5].map((h) => (
                <button key={h} type="button" className={hours === h ? "is-on" : ""} onClick={() => setHours(h)}>{h}h</button>
              ))}
            </div>
            <div className="hub-pay-total">{total} ₺</div>
            <p style={{ color: "#7f8fc0", fontSize: 12 }}>Paid online with PayTR / wallet. Extra pad +25 ₺ per hour.</p>
            <button className="hub-pay-go" type="button" onClick={pay}>PAY & BOOK</button>
            <p style={{ fontSize: 11, color: "#5f6da6" }}>QR check-in at the desk after payment.</p>
          </aside>
        </section>
      )}

      {view === "requests" && (
        <form
          className="hub-form"
          onSubmit={(e) => {
            e.preventDefault();
            flash(`Request saved: ${game || "untitled"}`);
            setGame("");
          }}
        >
          <div className="hub-field">
            <label>GAME TITLE</label>
            <input value={game} onChange={(e) => setGame(e.target.value)} placeholder="e.g. Street Fighter 6" />
          </div>
          <div className="hub-field">
            <label>PLATFORM</label>
            <select defaultValue="ps5">
              <option value="ps5">PS5</option>
              <option value="xbox">Xbox Series X</option>
              <option value="switch">Nintendo</option>
            </select>
          </div>
          <div className="hub-field">
            <label>WHY WE SHOULD ADD IT</label>
            <textarea rows={4} placeholder="Players, mode, weekly potential…" />
          </div>
          <button className="hub-cta" type="submit">SEND REQUEST</button>
        </form>
      )}
    </HubPage>
  );
}
