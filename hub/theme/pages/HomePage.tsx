import { useState } from "react";
import { Link } from "wouter";
import { HubIcon } from "../../design-system";
import { HubPage } from "../../design-system/chrome";
import bannerFc26 from "../../bracket-demo/covers/banner-fc26.png";
import slideCity from "../assets/slide-city.jpg";
import slideMatch from "../assets/slide-match.jpg";

const SLIDES = [
  { img: bannerFc26, badge: "NOW", badgeClass: "is-live", title: <>FC 26 <em>TOURNAMENT</em></>, body: "Saturday night bracket. 32 players. Live on the club TVs.", cta: "VIEW BRACKET", href: "/hub/events/brackets" },
  { img: slideCity, badge: "COMING SOON", badgeClass: "is-soon", title: <>GRAND THEFT AUTO <em>VI</em></>, body: "The next generation of games. Stay tuned at Bazino.", cta: "HOME NEWS", href: "/hub/blog" },
  { img: slideMatch, badge: "LIVE MATCH", badgeClass: "is-live", title: <>TONIGHT <em>21:00</em></>, body: "Big screen football in the lounge. First come, first seated.", cta: "RESERVE A BAY", href: "/hub/games" },
];

const TILES = [
  { href: "/hub/games", title: "GAMES", sub: "Stations & reservations for kids & adults", icon: <HubIcon.Gamepad size={28} />, tone: "cyan" },
  { href: "/hub/events", title: "EVENTS", sub: "Weekly brackets, specials, season ranking", icon: <HubIcon.Trophy size={28} />, tone: "magenta" },
  { href: "/hub/shop", title: "SHOP", sub: "Merch desk — coming soon for guests", icon: <HubIcon.Star size={28} />, tone: "gold" },
  { href: "/hub/food", title: "FOOD & DRINKS", sub: "Cafe coming soon — order at the station", icon: <HubIcon.Crown size={28} />, tone: "gold" },
  { href: "/hub/club", title: "CLUB", sub: "Credits, member card, season points", icon: <HubIcon.Users size={28} />, tone: "green" },
  { href: "/hub/blog", title: "BLOG", sub: "Club news and match reports", icon: <HubIcon.Calendar size={28} />, tone: "purple" },
  { href: "/hub/chat", title: "CHAT", sub: "Lobby, tables and staff", icon: <HubIcon.Chat size={28} />, tone: "cyan" },
];

export default function HomePage() {
  const [i, setI] = useState(0);
  return (
    <HubPage activeNav="HOME">
      <section className="hub-slider">
        {SLIDES.map((sl, n) => (
          <div key={n} className={`hub-slide ${n === i ? "is-on" : ""}`} style={{ backgroundImage: `url(${sl.img})` }}>
            <div className="hub-slide-body">
              <span className={`hub-badge ${sl.badgeClass}`}>{sl.badge}</span>
              <h2>{sl.title}</h2>
              <p>{sl.body}</p>
              <Link href={sl.href} className="hub-slide-cta">{sl.cta}</Link>
            </div>
          </div>
        ))}
        <button className="hub-sarrow hub-sarrow-l hub-neon-box" type="button" onClick={() => setI((i + SLIDES.length - 1) % SLIDES.length)}>‹</button>
        <button className="hub-sarrow hub-sarrow-r hub-neon-box" type="button" onClick={() => setI((i + 1) % SLIDES.length)}>›</button>
        <div className="hub-sdots">{SLIDES.map((_, n) => <i key={n} className={n === i ? "is-on" : ""} />)}</div>
      </section>
      <section className="hub-quick">
        {TILES.map((t) => (
          <Link key={t.href} href={t.href} className={`hub-qcard hub-neon-box hub-neon-box--${t.tone} is-${t.tone}`}>
            <span className="hub-qic">{t.icon}</span>
            <b>{t.title}</b>
            <small>{t.sub}</small>
          </Link>
        ))}
      </section>
    </HubPage>
  );
}
