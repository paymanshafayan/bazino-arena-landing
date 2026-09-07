import { useState } from "react";
import { Link } from "wouter";
import { HubAvatar, HubIcon } from "../../design-system";
import { HubPage } from "../../design-system/chrome";
import { BLOG_POSTS, CHAT_THREADS, OSM, PROFILE_TABS } from "../data";
import { useHub } from "../HubContext";
import shop from "../assets/shop-soon.jpg";
import food from "../assets/food-soon.jpg";
import hero from "../../design-system/assets/hero-player.jpg";

function Soon({
  img, kicker, title, body, feats,
}: {
  img: string; kicker: string; title: string; body: string;
  feats: { t: string; d: string }[];
}) {
  return (
    <section className="hub-soon" style={{ backgroundImage: `url(${img})` }}>
      <span className="hub-badge is-soon">{kicker}</span>
      <h1>{title}<em>COMING SOON!</em></h1>
      <p>{body}</p>
      <button className="hub-slide-cta" type="button">STAY TUNED</button>
      <div className="hub-soon-feats">
        {feats.map((f) => (
          <article key={f.t} className="hub-neon-box">
            <b>{f.t}</b>
            <p>{f.d}</p>
          </article>
        ))}
      </div>
      <p className="hub-admin-note">Guest view is Coming Soon. Station / admin order queue of the portal stays available when enabled.</p>
    </section>
  );
}

export function ShopPage() {
  return (
    <HubPage activeNav="SHOP">
      <Soon
        img={shop}
        kicker="MERCH DESK"
        title="SHOP "
        body="Something exciting is coming to BAZINO. Amazing products, exclusive items and more."
        feats={[
          { t: "EXCLUSIVE ITEMS", d: "Unique products only for our gamers." },
          { t: "SPECIAL OFFERS", d: "Discounts, bundles and limited drops." },
          { t: "HIGH QUALITY", d: "Carefully selected kit for the club." },
          { t: "MEMBER BENEFITS", d: "Special amounts for Bazino members." },
        ]}
      />
    </HubPage>
  );
}

export function FoodPage() {
  return (
    <HubPage activeNav="FOOD & DRINKS">
      <Soon
        img={food}
        kicker="CAFE"
        title="FOOD & DRINKS "
        body="Snacks, drinks & more are coming soon to BAZINO. Good food. Great games. Same place."
        feats={[
          { t: "DELICIOUS FOOD", d: "Fuel ready for every game." },
          { t: "REFRESHING DRINKS", d: "Stay cool, play longer." },
          { t: "MORE VARIETY", d: "Snacks, desserts and more." },
          { t: "GAME-CREW ATMOSPHERE", d: "Good food. Great games. Good people." },
        ]}
      />
    </HubPage>
  );
}

export function ClubPage() {
  const { user, setAuthOpen } = useHub();
  return (
    <HubPage activeNav="CLUB">
      <section className="hub-page-hero" style={{ backgroundImage: `url(${hero})` }}>
        <h1>BAZINO <em>CLUB</em></h1>
        <p>CREDITS · MEMBER CARD · SEASON POINTS</p>
      </section>
      {!user ? (
        <div style={{ padding: 40, textAlign: "center" }}>
          <button className="hub-cta" style={{ maxWidth: 280 }} type="button" onClick={() => setAuthOpen(true)}>LOGIN TO OPEN CLUB</button>
        </div>
      ) : (
        <section className="hub-club">
          <div className="hub-box hub-neon-box hub-neon-box--gold">
            <h3>BAZINO CREDITS</h3>
            <p style={{ fontSize: 42, margin: "8px 0", fontFamily: "Orbitron, sans-serif" }}>{user.credits.toLocaleString()} BC</p>
            <p style={{ color: "#7f8fc0" }}>Season points live on Events → Ranking. Wallet cash is separate (PayTR).</p>
          </div>
          <div className="hub-member hub-neon-box hub-neon-box--magenta">
            <small>BAZINO MEMBER CARD</small>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
              <HubAvatar name={user.displayName} size={64} ring="cyan" />
              <div>
                <b>{user.displayName}</b>
                <div style={{ color: "#3ccaf5" }}>{user.tag}</div>
                <small>MEMBER SINCE {user.memberSince} · ACTIVE</small>
              </div>
            </div>
          </div>
        </section>
      )}
    </HubPage>
  );
}

export function BlogPage() {
  return (
    <HubPage activeNav="BLOG">
      <section className="hub-page-hero" style={{ backgroundImage: `url(${hero})` }}>
        <h1>CLUB <em>BLOG</em></h1>
        <p>NEWS · REPORTS · PATCHES</p>
      </section>
      <section className="hub-blog">
        {BLOG_POSTS.map((p) => (
          <article key={p.id} className="hub-neon-box">
            <small>{p.tag} · {p.date}</small>
            <h3>{p.title}</h3>
            <p style={{ color: "#c5ceee" }}>{p.excerpt}</p>
          </article>
        ))}
      </section>
    </HubPage>
  );
}

export function ChatPage() {
  const [id, setId] = useState("lobby");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([{ me: false, t: "Bracket goes up at 21:00. Station 3 is the TV feed." }]);
  const { user, setAuthOpen } = useHub();
  return (
    <HubPage activeNav="CHAT">
      <section className="hub-page-hero" style={{ backgroundImage: `url(${hero})` }}>
        <h1>LIVE <em>CHAT</em></h1>
        <p>LOBBY · TABLES · STAFF</p>
      </section>
      <section className="hub-chat">
        <div className="hub-chat-list">
          {CHAT_THREADS.map((th) => (
            <button key={th.id} type="button" className={`hub-neon-box ${id === th.id ? "is-on hub-neon-box--cyan" : ""}`} onClick={() => setId(th.id)}>
              <b>{th.name}</b>
              <small style={{ display: "block", color: "#7f8fc0" }}>{th.last}</small>
            </button>
          ))}
        </div>
        <div className="hub-chat-pane hub-neon-box">
          <div className="hub-msgs">
            {msgs.map((m, i) => <div key={i} className={`hub-msg ${m.me ? "me" : ""}`}>{m.t}</div>)}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!user) { setAuthOpen(true); return; }
              if (!text.trim()) return;
              setMsgs((x) => [...x, { me: true, t: text.trim() }]);
              setText("");
            }}
          >
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message the lobby…" />
            <button className="hub-cta" style={{ width: "auto", padding: "10px 16px" }} type="submit">SEND</button>
          </form>
        </div>
      </section>
    </HubPage>
  );
}

export function ProfilePage() {
  const { user, setAuthOpen, setUser, flash } = useHub();
  const [tab, setTab] = useState<(typeof PROFILE_TABS)[number]["id"]>("overview");
  if (!user) {
    return (
      <HubPage>
        <div style={{ padding: 48, textAlign: "center" }}>
          <button className="hub-cta" style={{ maxWidth: 280 }} type="button" onClick={() => setAuthOpen(true)}>LOGIN TO OPEN PROFILE</button>
        </div>
      </HubPage>
    );
  }
  return (
    <HubPage>
      <section className="hub-page-hero" style={{ backgroundImage: `url(${hero})` }}>
        <h1>MY <em>PROFILE</em></h1>
        <p>GAMER · MEMBER · BAZINO FAMILY</p>
      </section>
      <div className="hub-ptabs">
        {PROFILE_TABS.map((t) => (
          <button key={t.id} type="button" className={tab === t.id ? "is-on" : ""} onClick={() => setTab(t.id)}>{t.en}</button>
        ))}
      </div>
      <section className="hub-profile">
        <div>
          {tab === "overview" && (
            <>
              <div className="hub-pinfo hub-neon-box">
                <HubAvatar name={user.displayName} size={120} ring="cyan" />
                <div>
                  <p>First name <b>{user.firstName}</b></p>
                  <p>Last name <b>{user.lastName}</b></p>
                  <p>Username <b>{user.username}</b></p>
                  <p>Member ID <b>{user.tag}</b></p>
                  <p>Date of birth <b>{user.dob}</b></p>
                  <p>Phone <b>{user.phone}</b></p>
                </div>
              </div>
              <div className="hub-stats">
                <article className="hub-neon-box hub-neon-box--gold"><small>Championships</small><b>{user.championships}</b></article>
                <article className="hub-neon-box hub-neon-box--cyan"><small>Second places</small><b>{user.second}</b></article>
                <article className="hub-neon-box hub-neon-box--magenta"><small>Third places</small><b>{user.third}</b></article>
              </div>
            </>
          )}
          {tab === "wallet" && <div className="hub-box hub-neon-box hub-neon-box--gold"><h3>WALLET</h3><p>PayTR connected. Balance demo 0.00 ₺ — top-up stays on the portal.</p></div>}
          {tab === "points" && <div className="hub-box hub-neon-box hub-neon-box--green"><h3>POINTS</h3><p>{user.points} season points this Spring.</p></div>}
          {tab === "reservations" && <div className="hub-box hub-neon-box"><h3>RESERVATIONS</h3><p>No active bay. Book from Games.</p><Link href="/hub/games">Open Games →</Link></div>}
          {tab === "orders" && <div className="hub-box hub-neon-box"><h3>ORDERS</h3><p>Cafe / shop tickets appear here when those desks go live.</p></div>}
          {tab === "tournaments" && <div className="hub-box hub-neon-box hub-neon-box--magenta"><h3>TOURNAMENTS</h3><p>FC 26 Weekly #13 — Champion. UFC 5 Weekly #12 — Semi-final.</p></div>}
          {tab === "tickets" && <div className="hub-box hub-neon-box"><h3>SUPPORT</h3><p>Open a ticket from the portal desk. Demo has no open tickets.</p></div>}
          {tab === "affiliate" && <div className="hub-box hub-neon-box"><h3>AFFILIATE</h3><p>Referral code ARMNK-26. Commission posts to wallet.</p></div>}
          {tab === "security" && (
            <div className="hub-box hub-neon-box">
              <h3>SECURITY</h3>
              <p>OTP is primary. Optional password for staff.</p>
              <button className="hub-cta" type="button" onClick={() => { setUser(null); flash("Signed out"); }}>LOG OUT</button>
            </div>
          )}
        </div>
        <aside className="hub-member hub-neon-box hub-neon-box--gold">
          <small>BAZINO CREDITS</small>
          <p style={{ fontSize: 36, margin: "6px 0" }}>{user.credits.toLocaleString()} BC</p>
          <HubAvatar name={user.displayName} size={72} ring="gold" />
          <b>{user.displayName}</b>
          <div style={{ color: "#3ccaf5" }}>{user.tag}</div>
        </aside>
      </section>
    </HubPage>
  );
}

export function ContactPage() {
  return (
    <HubPage>
      <section className="hub-page-hero" style={{ backgroundImage: `url(${hero})` }}>
        <h1>FIND <em>BAZINO</em></h1>
        <p>İSKELE · LONG BEACH · HOTEL VISTAMARE</p>
      </section>
      <section className="hub-contact">
        <iframe className="hub-map hub-neon-box" title="Bazino map" src={OSM} />
        <aside className="hub-box hub-neon-box">
          <h3>LOCATION</h3>
          <p>Iskele, Long Beach<br />Hotel VistaMare</p>
          <p><HubIcon.Clock size={14} /> Open everyday 11:00 – 23:50</p>
          <p><a href="https://wa.me/905391123747" target="_blank" rel="noreferrer">WhatsApp +90 539 112 37 47</a></p>
          <p><a href="https://maps.google.com/?q=Hotel+VistaMare+Iskele+Long+Beach" target="_blank" rel="noreferrer">Open in Google Maps →</a></p>
        </aside>
      </section>
    </HubPage>
  );
}

export function Hub404() {
  return (
    <HubPage>
      <div className="hub-404">
        <h1>404</h1>
        <p>This lane is dark. Back to the hub.</p>
        <Link href="/hub" className="hub-slide-cta">HOME</Link>
      </div>
    </HubPage>
  );
}

export function RulesPage() {
  return (
    <HubPage>
      <section className="hub-page-hero"><h1>CLUB <em>RULES</em></h1></section>
      <ol className="hub-form" style={{ color: "#c5ceee", lineHeight: 1.6 }}>
        <li>Respect players, guests and staff.</li>
        <li>Take care of equipment.</li>
        <li>Follow game, tournament and event rules.</li>
        <li>No cheating, fighting, harassment or threats.</li>
        <li>No insulting or deceptive usernames.</li>
        <li>Keep the room clean; eat and drink responsibly.</li>
        <li>Deliberate damage is charged at repair/replace cost.</li>
        <li>Serious or repeated offences may mean a temp or permanent ban.</li>
      </ol>
    </HubPage>
  );
}
