import { HubPage, MatchCard, NeonLink, NeonWireLayer, WirePort } from "./index";

function Box({ id, label, tone }: { id: string; label: string; tone: string }) {
  return (
    <WirePort id={id}>
      <div className="hub-neon-box" style={{
        width: 120, height: 52, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
        color: "#e7ecff", fontFamily: "Orbitron, sans-serif", fontSize: 11,
        background: "rgba(12,18,36,0.9)",
      }}>{label}</div>
    </WirePort>
  );
}

export default function KitPage() {
  return (
    <HubPage activeNav="ABOUT">
      <div style={{ padding: "28px 32px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 className="hub-display" style={{ fontSize: 22, margin: "0 0 8px" }}>HUB DESIGN KIT</h1>
        <p style={{ color: "#7f8fc0", marginBottom: 28 }}>
          Living catalogue. Copy these primitives onto every Hub page so the visual language stays locked.
          Neon connectors: <code style={{ color: "#3ccaf5" }}>elbow</code> / <code style={{ color: "#da6ad2" }}>smooth</code> / <code style={{ color: "#eab03d" }}>arc</code>.
        </p>

        <h2 style={{ fontSize: 14, letterSpacing: "0.12em", margin: "0 0 12px" }}>NEON WIRE — elbow (bracket)</h2>
        <NeonWireLayer style={{ height: 180, marginBottom: 36 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", height: 180, alignItems: "center", justifyItems: "center" }}>
            <Box id="e1" label="SOURCE A" tone="#3ccaf5" />
            <div />
            <Box id="e2" label="SOURCE B" tone="#3ccaf5" />
            <Box id="e3" label="TARGET" tone="#68a7e6" />
          </div>
          <NeonLink from="e1" to="e3" tone="cyan" kind="elbow" />
          <NeonLink from="e2" to="e3" tone="cyan" kind="elbow" />
        </NeonWireLayer>

        <h2 style={{ fontSize: 14, letterSpacing: "0.12em", margin: "0 0 12px" }}>NEON WIRE — smooth + arc</h2>
        <NeonWireLayer style={{ height: 140, marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 140, padding: "0 24px" }}>
            <Box id="s1" label="SMOOTH" tone="#da6ad2" />
            <Box id="s2" label="NODE" tone="#b067e9" />
            <Box id="s3" label="ARC" tone="#eab03d" />
          </div>
          <NeonLink from="s1" to="s2" tone="magenta" kind="smooth" />
          <NeonLink from="s2" to="s3" tone="gold" kind="arc" bend={0.45} />
        </NeonWireLayer>

        <h2 style={{ fontSize: 14, letterSpacing: "0.12em", margin: "0 0 12px" }}>MATCH CARD</h2>
        <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
          <MatchCard m={{ a: "ArmanK", ascore: 4, b: "RezaFun", bscore: 1, seeds: [1, 32] }} />
          <MatchCard m={{ a: "ArmanK", ascore: 5, b: "Mahan10", bscore: 3, gold: true }} />
        </div>
      </div>
    </HubPage>
  );
}
