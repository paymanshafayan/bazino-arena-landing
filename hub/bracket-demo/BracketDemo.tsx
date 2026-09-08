import { useEffect, useMemo, useState } from "react";
import {
  ChampionBlock,
  FilterPills,
  GameListCard,
  HubBracketSkeleton,
  HubEmpty,
  HubHero,
  HubPage,
  HubTabs,
  MatchCard,
  NeonWireLayer,
  PanelBanner,
  type MatchPair,
  type NeonLinkDef,
} from "../design-system";
import bannerBracket from "./covers/banner-bracket.jpg";
import fc26 from "./covers/fc26.png";
import mk1 from "./covers/mk1.png";
import tekken8 from "./covers/tekken8.png";
import ufc5 from "./covers/ufc5.png";

const COVERS: Record<string, string> = { fc26, ufc5, mk1, tekken8 };

type Status = "CURRENT" | "UPCOMING" | "COMPLETED";

const GAMES: { name: string; title: string; date: string; players: number; cover: string; status: Status }[] = [
  { name: "FC 26", title: "Weekly Tournament #14", date: "12 Sep 2026", players: 32, cover: "fc26", status: "CURRENT" },
  { name: "UFC 5", title: "Weekly Tournament #15", date: "19 Sep 2026", players: 32, cover: "ufc5", status: "UPCOMING" },
  { name: "FC 26", title: "Weekly Tournament #13", date: "29 Aug 2026", players: 32, cover: "fc26", status: "COMPLETED" },
  { name: "UFC 5", title: "Weekly Tournament #12", date: "22 Aug 2026", players: 32, cover: "ufc5", status: "COMPLETED" },
  { name: "MORTAL KOMBAT 1", title: "Weekly Tournament #11", date: "15 Aug 2026", players: 32, cover: "mk1", status: "COMPLETED" },
  { name: "TEKKEN 8", title: "Weekly Tournament #10", date: "08 Aug 2026", players: 32, cover: "tekken8", status: "COMPLETED" },
  { name: "FC 26", title: "Weekly Tournament #9", date: "01 Aug 2026", players: 32, cover: "fc26", status: "COMPLETED" },
  { name: "MORTAL KOMBAT 1", title: "Weekly Tournament #7", date: "18 Jul 2026", players: 32, cover: "mk1", status: "COMPLETED" },
];

const SPECIAL_GAMES: typeof GAMES = [
  { name: "FC 26", title: "Champions Cup", date: "12 Jul 2026", players: 64, cover: "fc26", status: "COMPLETED" },
  { name: "UFC 5", title: "Bazino Fight Night", date: "02 Aug 2026", players: 32, cover: "ufc5", status: "COMPLETED" },
  { name: "TEKKEN 8", title: "Championship", date: "09 Sep 2026", players: 32, cover: "tekken8", status: "UPCOMING" },
];

const L32: MatchPair[] = [
  { a: "ArmanK", ascore: 4, b: "RezaFun", bscore: 1, seeds: [1, 32] },
  { a: "AliGameR", ascore: 3, b: "Parham", bscore: 2, seeds: [17, null] },
  { a: "Shayan", ascore: 4, b: "AmirT", bscore: 0, seeds: [8, 25] },
  { a: "NimaPro", ascore: 3, b: "DarkLord", bscore: 1, seeds: [9, 24] },
  { a: "RezaB", ascore: 4, b: "Hesam", bscore: 2, seeds: [4, 29] },
  { a: "Mahan10", ascore: 3, b: "AliReza", bscore: 1, seeds: [13, 20] },
  { a: "KianPro", ascore: 4, b: "Soroush", bscore: 0, seeds: [5, 28] },
  { a: "Hitman", ascore: 3, b: "Behrad", bscore: 2, seeds: [12, 21] },
];
const L16: MatchPair[] = [
  { a: "ArmanK", ascore: 4, b: "AliGameR", bscore: 2 },
  { a: "Shayan", ascore: 3, b: "NimaPro", bscore: 1 },
  { a: "RezaB", ascore: 4, b: "Mahan10", bscore: 2 },
  { a: "KianPro", ascore: 3, b: "Hitman", bscore: 1 },
];
const LQF: MatchPair[] = [
  { a: "ArmanK", ascore: 4, b: "Shayan", bscore: 1 },
  { a: "RezaB", ascore: 2, b: "KianPro", bscore: 3 },
];
const LSF: MatchPair = { a: "ArmanK", ascore: 4, b: "KianPro", bscore: 3 };

const R32: MatchPair[] = [
  { a: "RezaMVP", ascore: 4, b: "Arash", bscore: 1, seeds: [6, 31] },
  { a: "Mahan10", ascore: 4, b: "Pouya", bscore: 2, seeds: [18, null] },
  { a: "Amin", ascore: 2, b: "Sina", bscore: 4, seeds: [26, null] },
  { a: "Mehrad", ascore: 1, b: "Kasra", bscore: 3, seeds: [null, 23] },
  { a: "Farhad", ascore: 4, b: "AmirHossein", bscore: 1, seeds: [30, null] },
  { a: "Erfan", ascore: 2, b: "Sasra", bscore: 4, seeds: [19, null] },
  { a: "Dave", ascore: 1, b: "Iman", bscore: 3, seeds: [27, null] },
  { a: "ArmanT", ascore: 0, b: "Saeed", bscore: 4, seeds: [22, null] },
];
const R16: MatchPair[] = [
  { a: "RezaMVP", ascore: 4, b: "Rinah", bscore: 1 },
  { a: "Sina", ascore: 2, b: "Kasra", bscore: 1 },
  { a: "Farhad", ascore: 4, b: "Sasra", bscore: 2 },
  { a: "Iman", ascore: 3, b: "Saeed", bscore: 4 },
];
const RQF: MatchPair[] = [
  { a: "Mahan10", ascore: 4, b: "Saeed", bscore: 1 },
  { a: "Navid", ascore: 2, b: "Farhad", bscore: 4 },
];
const RSF: MatchPair = { a: "Mahan10", ascore: 3, b: "Saeed", bscore: 1 };
const FINAL: MatchPair = { a: "ArmanK", ascore: 5, b: "Mahan10", bscore: 3, gold: true };

const LABELS = [
  "ROUND OF 32", "ROUND OF 16", "QUARTER FINALS", "SEMI FINALS",
  "FINAL",
  "SEMI FINALS", "QUARTER FINALS", "ROUND OF 16", "ROUND OF 32",
];

const TABS = [
  { id: "weekly", label: "WEEKLY TOURNAMENTS", sub: "Regular weekly competitions", icon: "cal" as const, variant: "magenta" as const },
  { id: "special", label: "SPECIAL EVENTS", sub: "Big tournaments & unique events", icon: "star" as const, variant: "cyan" as const },
];

function colPlace(col: number, row: number, span: number) {
  return { gridColumn: col, gridRow: `${row} / span ${span}` } as const;
}

function fan(fromPrefix: string, n: number, toPrefix: string, toIsSingle: boolean, tone: NeonLinkDef["tone"]): NeonLinkDef[] {
  const out: NeonLinkDef[] = [];
  for (let i = 0; i < n; i++) {
    const to = toIsSingle ? toPrefix : `${toPrefix}-${Math.floor(i / 2)}`;
    out.push({ from: `${fromPrefix}-${i}`, to, tone, kind: "elbow", radius: 11, split: 0.64 });
  }
  return out;
}

export default function BracketDemo() {
  const [tab, setTab] = useState("weekly");
  const [filter, setFilter] = useState("ALL");
  const [sel, setSel] = useState(0);
  const [loading, setLoading] = useState(false);

  const source = tab === "weekly" ? GAMES : SPECIAL_GAMES;
  const list = useMemo(
    () => source.filter((g) => filter === "ALL" || g.status === filter),
    [source, filter],
  );
  const current = list[sel] ?? list[0];

  // Reset the selection whenever the tab / filter changes and show the loading
  // state while the bracket of the freshly selected tournament is fetched (PDF §21).
  useEffect(() => { setSel(0); }, [tab, filter]);
  useEffect(() => {
    if (!current) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, [current?.title, tab]);

  const links = useMemo<NeonLinkDef[]>(() => [
    ...fan("L32", 8, "L16", false, "cyan"),
    ...fan("L16", 4, "LQF", false, "cyan"),
    ...fan("LQF", 2, "LSF", true, "cyan"),
    { from: "LSF", to: "FINAL", tone: "cyan", kind: "elbow", radius: 10, split: 0.5 },
    { from: "RSF", to: "FINAL", tone: "magenta", kind: "elbow", radius: 10, split: 0.5 },
    ...fan("RQF", 2, "RSF", true, "magenta"),
    ...fan("R16", 4, "RQF", false, "magenta"),
    ...fan("R32", 8, "R16", false, "cyan"),
  ], []);

  return (
    <HubPage activeNav="EVENTS">
      <HubHero
        title={<>TOURNAMENT <em>BRACKETS</em></>}
        kicker="LIVE & PAST TOURNAMENT"
        kickerEm="RESULTS"
        tagline={["REAL PLAYERS", "REAL MATCHES", "REAL COMPETITION", "LASTING LEGENDS"]}
        leftSign={<>Play<br />Compete<br />Win</>}
        rightSign={<>Good Games<br />Good People</>}
      >
        <HubTabs items={TABS} value={tab} onChange={setTab} />
      </HubHero>

      <div className="hub-body">
        <aside className="hub-side">
          <h3>TOURNAMENTS</h3>
          <p className="hub-side-note">Select a tournament to view the bracket</p>
          <FilterPills items={["ALL", "CURRENT", "UPCOMING", "COMPLETED"]} value={filter} onChange={setFilter} />
          {list.length === 0 ? (
            <HubEmpty
              title="NO TOURNAMENT HERE"
              body={`No ${filter.toLowerCase()} tournament in this tab yet.`}
              action={<button type="button" className="hub-state-btn" onClick={() => setFilter("ALL")}>SHOW ALL</button>}
            />
          ) : (
            <div className="hub-game-list">
              {list.map((g, i) => (
                <GameListCard
                  key={`${g.title}-${i}`}
                  cover={COVERS[g.cover]}
                  name={g.name}
                  subtitle={g.title}
                  date={g.date}
                  players={g.players}
                  status={g.status}
                  selected={sel === i}
                  onClick={() => setSel(i)}
                />
              ))}
            </div>
          )}
        </aside>

        <section className="hub-panel">
          {!current ? (
            <HubEmpty
              title="NOTHING TO SHOW"
              body="Pick another filter to load a bracket."
            />
          ) : (
            <>
              <PanelBanner
                image={bannerBracket}
                title={current.name}
                em={current.title.toUpperCase()}
                date={current.date.toUpperCase()}
                players={current.players}
                status={current.status}
                slogan="PLAY COMPETE BE A LEGEND"
              />

              {loading ? (
                <HubBracketSkeleton />
              ) : current.status === "UPCOMING" ? (
                <HubEmpty
                  title="DRAW NOT PUBLISHED YET"
                  body={<>Pairings for {current.name} · {current.title} go live on {current.date} in the admin panel.</>}
                />
              ) : (
                <div className="hub-bracket-scroll">
                  <p className="hub-scroll-hint">Swipe / scroll sideways to follow the full 32-player bracket →</p>
                  <div className="hub-round-labels">
                    {LABELS.map((l, i) => (
                      <span key={i} className={`hub-lbl ${l === "FINAL" ? "is-final" : ""}`}>{l}</span>
                    ))}
                  </div>

                  <NeonWireLayer className="hub-bracket-grid" links={links}>
                    {L32.map((m, i) => <MatchCard key={`L32-${i}`} m={m} wire={`L32-${i}`} style={colPlace(1, i + 1, 1)} />)}
                    {L16.map((m, i) => <MatchCard key={`L16-${i}`} m={m} wire={`L16-${i}`} style={colPlace(2, i * 2 + 1, 2)} />)}
                    {LQF.map((m, i) => <MatchCard key={`LQF-${i}`} m={m} wire={`LQF-${i}`} style={colPlace(3, i * 4 + 1, 4)} />)}
                    <MatchCard m={LSF} wire="LSF" style={colPlace(4, 1, 8)} />

                    <div className="hub-center-col">
                      <ChampionBlock />
                      <MatchCard m={FINAL} wire="FINAL" />
                    </div>

                    <MatchCard m={RSF} wire="RSF" style={colPlace(6, 1, 8)} />
                    {RQF.map((m, i) => <MatchCard key={`RQF-${i}`} m={m} wire={`RQF-${i}`} style={colPlace(7, i * 4 + 1, 4)} />)}
                    {R16.map((m, i) => <MatchCard key={`R16-${i}`} m={m} wire={`R16-${i}`} style={colPlace(8, i * 2 + 1, 2)} />)}
                    {R32.map((m, i) => <MatchCard key={`R32-${i}`} m={m} wire={`R32-${i}`} style={colPlace(9, i + 1, 1)} />)}
                  </NeonWireLayer>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </HubPage>
  );
}
