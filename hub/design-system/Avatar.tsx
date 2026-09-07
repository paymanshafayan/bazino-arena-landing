import type { CSSProperties } from "react";
import armank from "./assets/avatar-armank.jpg";

export function hashName(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

const SKIN = ["#e8b89a", "#c48a6a", "#8d5a3c", "#f0c8a8", "#d4a574", "#b87550"];
const HAIR = ["#1a1210", "#3b2218", "#111111", "#4a2c12", "#2c1810", "#5a3a20"];
const BG = ["#1a2744", "#241a3a", "#123038", "#2a1c28", "#1c2a20", "#182040"];

/** Known demo portraits — add names here as real assets arrive. */
export const HUB_AVATARS: Record<string, string> = {
  ArmanK: armank,
};

export function HubAvatar({
  name,
  src,
  size = 18,
  ring = "none",
}: {
  name: string;
  src?: string;
  size?: number;
  ring?: "none" | "gold" | "cyan" | "magenta";
}) {
  const photo = src ?? HUB_AVATARS[name];
  const h = hashName(name);
  const style: CSSProperties = { width: size, height: size };
  return (
    <span className={`hub-av hub-av--${ring}`} style={style} title={name}>
      {photo ? (
        <img src={photo} alt="" />
      ) : (
        <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
          <rect width="40" height="40" fill={BG[h % BG.length]} />
          <ellipse cx="20" cy="40" rx="13" ry="12" fill={SKIN[(h >> 2) % SKIN.length]} />
          <circle cx="20" cy="16" r="8.2" fill={SKIN[(h >> 2) % SKIN.length]} />
          <path
            d={h % 2 === 0
              ? "M10 16c1-9 19-9 20 0 0-8-4-12-10-12S10 8 10 16z"
              : "M11 18c2-10 16-10 18 0v-2c0-8-4-12-9-12s-9 4-9 12v2z"}
            fill={HAIR[(h >> 4) % HAIR.length]}
          />
        </svg>
      )}
    </span>
  );
}
