import type { CSSProperties, ReactNode, SVGProps } from "react";

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
} & SVGProps<SVGSVGElement>;

const wrap = (path: ReactNode, vb = "0 0 24 24") =>
  function HubIcon({ size = 18, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox={vb} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true" {...rest}>
        {path}
      </svg>
    );
  };

export const HubIcon = {
  Trophy: wrap(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>),
  Calendar: wrap(<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  Users: wrap(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>),
  Pin: wrap(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  Clock: wrap(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  Chat: wrap(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>),
  Gram: wrap(<><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" /></>),
  Globe: wrap(<><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" /></>),
  Bell: wrap(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>),
  Chevron: wrap(<path d="m6 9 6 6 6-6" />),
  Star: wrap(<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />),
  Crown: wrap(<><path d="M3 7l4 5 5-7 5 7 4-5-2 12H5L3 7z" /><path d="M5 19h14" /></>),
  Gamepad: wrap(<><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01" /><rect x="2" y="6" width="20" height="12" rx="6" /></>),
};

/** Gold trophy sitting in a laurel wreath — champion lockup. */
export function LaurelTrophy({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className="hub-laurel" aria-hidden="true">
      <defs>
        <linearGradient id="hub-gold-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe58a" />
          <stop offset="0.5" stopColor="#fdcf1c" />
          <stop offset="1" stopColor="#c48910" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#hub-gold-g)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M18 50c-6-8-8-18-4-28 6 4 10 12 10 22" />
        <path d="M62 50c6-8 8-18 4-28-6 4-10 12-10 22" />
        <path d="M16 38c-2-1-5-1-7 1" />
        <path d="M17 44c-3 0-6 1-8 3" />
        <path d="M64 38c2-1 5-1 7 1" />
        <path d="M63 44c3 0 6 1 8 3" />
        <path d="M20 54c4 6 10 10 20 10s16-4 20-10" />
      </g>
      <g fill="url(#hub-gold-g)" stroke="none">
        <path d="M28 22h24v8c0 8-5 14-12 14S28 38 28 30v-8z" />
        <rect x="36" y="44" width="8" height="6" rx="1" />
        <rect x="32" y="50" width="16" height="4" rx="1.5" />
        <path d="M28 22c-4 0-7-3-7-6h10v6H28zM52 22c4 0 7-3 7-6H49v6h3z" />
      </g>
    </svg>
  );
}

export const NAV = ["HOME", "GAMES", "EVENTS", "SHOP", "FOOD & DRINKS", "CLUB", "BLOG", "CHAT"];
