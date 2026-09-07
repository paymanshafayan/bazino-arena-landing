import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import "./neon-wire.css";

/* ─────────────────────────────────────────────────────────────────────
   NeonWire — the Hub connector primitive.

   kind:
     elbow  rounded orthogonal (default — tournament brackets)
     smooth cubic S-curve (cards / timelines)
     arc    single quadratic bow (decorative)

   tone: cyan | magenta | gold | green | purple | azure

   Call from any page:

     <NeonWireLayer links={[ { from: "a", to: "b", tone: "cyan" } ]}>
       <WirePort id="a"><Card/></WirePort>
       <WirePort id="b"><Card/></WirePort>
     </NeonWireLayer>

   Or drop <NeonLink from="a" to="b" /> as a child.
   Pure path helpers (elbowPath / smoothPath / arcPath) are exported
   for custom SVG when you already know coordinates.
   ───────────────────────────────────────────────────────────────────── */

export type WireTone = "cyan" | "magenta" | "gold" | "green" | "purple" | "azure";
export type WireKind = "elbow" | "smooth" | "arc";
export type WireAnchor = "left" | "right" | "top" | "bottom" | "center";

export type NeonLinkDef = {
  from: string;
  to: string;
  tone?: WireTone;
  kind?: WireKind;
  fromAnchor?: WireAnchor;
  toAnchor?: WireAnchor;
  /** 0–1, where the vertical of an elbow sits between the two ports. */
  split?: number;
  /** Corner radius in px for elbow. */
  radius?: number;
  /** Extra curve amount for smooth/arc. */
  bend?: number;
};

export function roundN(n: number, p = 1) {
  const m = 10 ** p;
  return Math.round(n * m) / m;
}

/** Rounded orthogonal connector: H → round → V → round → H */
export function elbowPath(
  x1: number, y1: number, x2: number, y2: number,
  radius = 12,
  split = 0.58,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (Math.abs(dy) < 0.6) return `M ${roundN(x1)} ${roundN(y1)} L ${roundN(x2)} ${roundN(y2)}`;
  const midX = x1 + dx * split;
  const sx = Math.sign(dx) || 1;
  const sy = Math.sign(dy) || 1;
  const r = Math.max(
    2,
    Math.min(radius, Math.abs(midX - x1) * 0.85, Math.abs(x2 - midX) * 0.85, Math.abs(dy) / 2),
  );
  return [
    `M ${roundN(x1)} ${roundN(y1)}`,
    `L ${roundN(midX - sx * r)} ${roundN(y1)}`,
    `Q ${roundN(midX)} ${roundN(y1)} ${roundN(midX)} ${roundN(y1 + sy * r)}`,
    `L ${roundN(midX)} ${roundN(y2 - sy * r)}`,
    `Q ${roundN(midX)} ${roundN(y2)} ${roundN(midX + sx * r)} ${roundN(y2)}`,
    `L ${roundN(x2)} ${roundN(y2)}`,
  ].join(" ");
}

/** Cubic S-curve, good for loosely related cards. */
export function smoothPath(
  x1: number, y1: number, x2: number, y2: number,
  bend = 0.5,
): string {
  const dx = x2 - x1;
  const s = Math.sign(dx) || 1;
  const c = Math.abs(dx) * bend;
  return `M ${roundN(x1)} ${roundN(y1)} C ${roundN(x1 + s * c)} ${roundN(y1)}, ${roundN(x2 - s * c)} ${roundN(y2)}, ${roundN(x2)} ${roundN(y2)}`;
}

/** Single quadratic bow. */
export function arcPath(
  x1: number, y1: number, x2: number, y2: number,
  bend = 0.32,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const nx = -dy;
  const ny = dx;
  const len = Math.hypot(nx, ny) || 1;
  const dist = Math.hypot(dx, dy) * bend;
  return `M ${roundN(x1)} ${roundN(y1)} Q ${roundN(mx + (nx / len) * dist)} ${roundN(my + (ny / len) * dist)} ${roundN(x2)} ${roundN(y2)}`;
}

export function buildWirePath(
  kind: WireKind | undefined,
  x1: number, y1: number, x2: number, y2: number,
  opts: { radius?: number; split?: number; bend?: number } = {},
): string {
  if (kind === "smooth") return smoothPath(x1, y1, x2, y2, opts.bend ?? 0.5);
  if (kind === "arc") return arcPath(x1, y1, x2, y2, opts.bend ?? 0.32);
  return elbowPath(x1, y1, x2, y2, opts.radius ?? 12, opts.split ?? 0.58);
}

function anchorPoint(r: DOMRect, lr: DOMRect, anchor: WireAnchor): { x: number; y: number } {
  const x = r.left - lr.left;
  const y = r.top - lr.top;
  switch (anchor) {
    case "left": return { x, y: y + r.height / 2 };
    case "right": return { x: x + r.width, y: y + r.height / 2 };
    case "top": return { x: x + r.width / 2, y };
    case "bottom": return { x: x + r.width / 2, y: y + r.height };
    default: return { x: x + r.width / 2, y: y + r.height / 2 };
  }
}

function inferAnchors(a: DOMRect, b: DOMRect): [WireAnchor, WireAnchor] {
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? ["right", "left"] : ["left", "right"];
  }
  return dy >= 0 ? ["bottom", "top"] : ["top", "bottom"];
}

type Drawn = { key: string; d: string; tone: WireTone };

type WireCtxValue = {
  registerPort: (id: string, el: HTMLElement | null) => void;
  registerLink: (id: string, link: NeonLinkDef) => void;
  unregisterLink: (id: string) => void;
};

const WireCtx = createContext<WireCtxValue | null>(null);

let linkSeq = 0;

export function NeonWireLayer({
  children,
  className = "",
  style,
  links = [],
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  links?: NeonLinkDef[];
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const ports = useRef(new Map<string, HTMLElement>());
  const extra = useRef(new Map<string, NeonLinkDef>());
  const [drawn, setDrawn] = useState<Drawn[]>([]);

  const draw = useCallback(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const lr = layer.getBoundingClientRect();
    const all = [...links, ...Array.from(extra.current.values())];
    const next: Drawn[] = [];
    all.forEach((link, i) => {
      const aEl = ports.current.get(link.from);
      const bEl = ports.current.get(link.to);
      if (!aEl || !bEl) return;
      const ar = aEl.getBoundingClientRect();
      const br = bEl.getBoundingClientRect();
      const [ia, ib] = inferAnchors(ar, br);
      const p1 = anchorPoint(ar, lr, link.fromAnchor ?? ia);
      const p2 = anchorPoint(br, lr, link.toAnchor ?? ib);
      next.push({
        key: `${link.from}->${link.to}#${i}`,
        tone: link.tone ?? "cyan",
        d: buildWirePath(link.kind, p1.x, p1.y, p2.x, p2.y, {
          radius: link.radius,
          split: link.split,
          bend: link.bend,
        }),
      });
    });
    setDrawn(next);
  }, [links]);

  const registerPort = useCallback((id: string, el: HTMLElement | null) => {
    if (el) ports.current.set(id, el);
    else ports.current.delete(id);
    requestAnimationFrame(draw);
  }, [draw]);

  const registerLink = useCallback((id: string, link: NeonLinkDef) => {
    extra.current.set(id, link);
    requestAnimationFrame(draw);
  }, [draw]);

  const unregisterLink = useCallback((id: string) => {
    extra.current.delete(id);
    requestAnimationFrame(draw);
  }, [draw]);

  useLayoutEffect(() => {
    draw();
    const layer = layerRef.current;
    if (!layer) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(layer);
    window.addEventListener("resize", draw);
    const t = window.setTimeout(draw, 60);
    const t2 = window.setTimeout(draw, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", draw);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [draw]);

  const ctx = useMemo(() => ({ registerPort, registerLink, unregisterLink }), [registerPort, registerLink, unregisterLink]);

  return (
    <WireCtx.Provider value={ctx}>
      <div ref={layerRef} className={`hub-wire-layer ${className}`} style={style}>
        <svg className="hub-wire-svg" aria-hidden="true">
          {drawn.map((w) => (
            <g key={w.key} className={`hub-wire hub-wire--${w.tone}`}>
              <path className="hub-wire-glow" d={w.d} />
              <path className="hub-wire-mid" d={w.d} />
              <path className="hub-wire-core" d={w.d} />
            </g>
          ))}
        </svg>
        {children}
      </div>
    </WireCtx.Provider>
  );
}

export function WirePort({
  id,
  children,
  className = "",
  style,
}: {
  id: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ctx = useContext(WireCtx);
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    ctx?.registerPort(id, ref.current);
    return () => ctx?.registerPort(id, null);
  }, [id, ctx]);
  return (
    <div ref={ref} data-wire-id={id} className={className} style={style}>
      {children}
    </div>
  );
}

export function NeonLink(props: NeonLinkDef) {
  const ctx = useContext(WireCtx);
  const idRef = useRef(`nl-${++linkSeq}`);
  useLayoutEffect(() => {
    ctx?.registerLink(idRef.current, props);
    return () => ctx?.unregisterLink(idRef.current);
  }, [ctx, props.from, props.to, props.tone, props.kind, props.split, props.radius, props.bend, props.fromAnchor, props.toAnchor]);
  return null;
}

/** Static SVG snippet for docs / decorative use when coords are known. */
export function NeonPath({
  d,
  tone = "cyan",
  className = "",
}: {
  d: string;
  tone?: WireTone;
  className?: string;
}) {
  return (
    <g className={`hub-wire hub-wire--${tone} ${className}`}>
      <path className="hub-wire-glow" d={d} />
      <path className="hub-wire-mid" d={d} />
      <path className="hub-wire-core" d={d} />
    </g>
  );
}
