import type { CSSProperties, ReactNode, SVGProps } from "react";

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
} & SVGProps<SVGSVGElement>;

// ── HIGH-DEFINITION 3D NEON ICON SUITE (Target Design Parity) ───

export const HubIcon = {
  // 3D Neon Gamepad with Dual Tone (Cyan + Magenta Glow)
  Gamepad: function GamepadIcon({ size = 48, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ filter: "drop-shadow(0 0 14px rgba(255, 45, 176, 0.55))", ...style }} aria-hidden="true" {...rest}>
        <defs>
          <linearGradient id="pad-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="50%" stopColor="#ff2db0" />
            <stop offset="100%" stopColor="#ffc400" />
          </linearGradient>
          <filter id="pad-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Main Body */}
        <rect x="8" y="18" width="48" height="30" rx="14" stroke="url(#pad-g)" strokeWidth="3.2" fill="rgba(10, 14, 24, 0.85)" filter="url(#pad-glow)" />
        {/* D-Pad Left */}
        <path d="M19 28v10M14 33h10" stroke="#00e5ff" strokeWidth="2.8" strokeLinecap="round" />
        {/* Action Buttons Right */}
        <circle cx="43" cy="29" r="2.2" fill="#ff2db0" />
        <circle cx="49" cy="33" r="2.2" fill="#00e5ff" />
        <circle cx="43" cy="37" r="2.2" fill="#00ff88" />
        <circle cx="37" cy="33" r="2.2" fill="#ffc400" />
        {/* Thumbsticks */}
        <circle cx="26" cy="38" r="4" stroke="#ff2db0" strokeWidth="1.8" fill="rgba(255,45,176,0.2)" />
        <circle cx="38" cy="38" r="4" stroke="#00e5ff" strokeWidth="1.8" fill="rgba(0,229,255,0.2)" />
        {/* Grip Handles */}
        <path d="M10 32c-3 4-4 12-1 16 3 4 7 2 9-2M54 32c3 4 4 12 1 16-3 4-7 2-9-2" stroke="url(#pad-g)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  },

  // 3D Neon Trophy (Cyber Gold + Magenta Glow)
  Trophy: function TrophyIcon({ size = 48, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ filter: "drop-shadow(0 0 14px rgba(255, 196, 0, 0.55))", ...style }} aria-hidden="true" {...rest}>
        <defs>
          <linearGradient id="trophy-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#ff9900" />
            <stop offset="100%" stopColor="#ff2db0" />
          </linearGradient>
        </defs>
        {/* Cup */}
        <path d="M18 14h28v14c0 8-6 15-14 15s-14-7-14-15V14z" stroke="url(#trophy-g)" strokeWidth="3.2" fill="rgba(255, 196, 0, 0.12)" strokeLinejoin="round" />
        {/* Handles */}
        <path d="M18 18H10c-2 0-4 2-4 6 0 6 6 8 12 8M46 18h8c2 0 4 2 4 6 0 6-6 8-12 8" stroke="#ffd700" strokeWidth="3" strokeLinecap="round" />
        {/* Stem & Base */}
        <path d="M32 43v8M22 55h20M26 51h12" stroke="url(#trophy-g)" strokeWidth="3.2" strokeLinecap="round" />
        {/* Star Inside */}
        <polygon points="32,22 34,26 38,27 35,30 36,34 32,32 28,34 29,30 26,27 30,26" fill="#ffd700" />
      </svg>
    );
  },

  // 3D Neon Gallery / Photo Frame (Cosmic Purple + Cyan Glow)
  Gallery: function GalleryIcon({ size = 48, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ filter: "drop-shadow(0 0 14px rgba(168, 85, 247, 0.55))", ...style }} aria-hidden="true" {...rest}>
        <defs>
          <linearGradient id="gal-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
        <rect x="10" y="12" width="44" height="40" rx="10" stroke="url(#gal-g)" strokeWidth="3.2" fill="rgba(168, 85, 247, 0.1)" />
        <circle cx="22" cy="24" r="4" fill="#00e5ff" />
        <path d="M14 44l12-14 10 11 8-8 10 11" stroke="url(#gal-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  },

  // 3D Neon Price Tag (Electric Cyan + Green Glow)
  Prices: function PricesIcon({ size = 48, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ filter: "drop-shadow(0 0 14px rgba(0, 229, 255, 0.55))", ...style }} aria-hidden="true" {...rest}>
        <defs>
          <linearGradient id="tag-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </defs>
        <path d="M14 34l22-22h14v14L28 48 14 34z" stroke="url(#tag-g)" strokeWidth="3.2" fill="rgba(0, 229, 255, 0.1)" strokeLinejoin="round" />
        <circle cx="42" cy="20" r="3.5" fill="#00e5ff" />
        <path d="M22 42l-6 6M16 48h8" stroke="#00ff88" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  },

  // 3D Neon Shopping Bag with Controller Badge (Magenta Glow)
  Shop: function ShopIcon({ size = 48, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ filter: "drop-shadow(0 0 14px rgba(255, 45, 176, 0.55))", ...style }} aria-hidden="true" {...rest}>
        <defs>
          <linearGradient id="shop-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff2db0" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect x="12" y="20" width="40" height="34" rx="8" stroke="url(#shop-g)" strokeWidth="3.2" fill="rgba(255, 45, 176, 0.1)" />
        <path d="M22 20V15c0-5.5 4.5-9 10-9s10 3.5 10 9v5" stroke="url(#shop-g)" strokeWidth="3.2" strokeLinecap="round" />
        {/* Mini Gamepad on Bag */}
        <rect x="24" y="32" width="16" height="10" rx="4" stroke="#ff2db0" strokeWidth="2" />
        <circle cx="28" cy="37" r="1" fill="#00e5ff" />
        <circle cx="36" cy="37" r="1" fill="#00e5ff" />
      </svg>
    );
  },

  // 3D Neon Burger & Soda Combo (Vibrant Orange Glow)
  Food: function FoodIcon({ size = 48, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ filter: "drop-shadow(0 0 14px rgba(255, 119, 0, 0.55))", ...style }} aria-hidden="true" {...rest}>
        <defs>
          <linearGradient id="food-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffaa00" />
            <stop offset="100%" stopColor="#ff5500" />
          </linearGradient>
        </defs>
        {/* Burger Top Bun */}
        <path d="M12 28c0-7 7-10 16-10s16 3 16 10H12z" stroke="url(#food-g)" strokeWidth="3" fill="rgba(255, 170, 0, 0.2)" />
        {/* Patty & Cheese */}
        <path d="M10 34h36M14 38l4 4 4-4 4 4 4-4 4 4 4-4" stroke="#ff5500" strokeWidth="2.8" strokeLinecap="round" />
        {/* Burger Bottom Bun */}
        <path d="M14 44h28c0 5-5 7-14 7s-14-2-14-7z" stroke="url(#food-g)" strokeWidth="3" fill="rgba(255, 170, 0, 0.2)" />
        {/* Soda Drink Cup with Straw */}
        <path d="M48 24l4 26h-10l4-26z" stroke="#00e5ff" strokeWidth="2.5" fill="rgba(0, 229, 255, 0.15)" strokeLinejoin="round" />
        <path d="M50 24V14l4-4" stroke="#ff2db0" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  },

  // 3D Neon Info / About (Pink / Cyan Glow)
  About: function AboutIcon({ size = 48, className = "", style, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={{ filter: "drop-shadow(0 0 14px rgba(255, 45, 176, 0.55))", ...style }} aria-hidden="true" {...rest}>
        <defs>
          <linearGradient id="about-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff2db0" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="22" stroke="url(#about-g)" strokeWidth="3.2" fill="rgba(255, 45, 176, 0.1)" />
        <circle cx="32" cy="22" r="3" fill="#00e5ff" />
        <path d="M32 29v14M28 43h8" stroke="url(#about-g)" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    );
  },

  // Standard utility icons
  Calendar: function CalendarIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  },
  Users: function UsersIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  },
  Pin: function PinIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
      </svg>
    );
  },
  Clock: function ClockIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    );
  },
  Gram: function GramIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  },
  Globe: function GlobeIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
    );
  },
  Bell: function BellIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  },
  Chevron: function ChevronIcon({ size = 16, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  },
  Star: function StarIcon({ size = 20, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  },
  Crown: function CrownIcon({ size = 24, className = "", ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
        <path d="M3 7l4 5 5-7 5 7 4-5-2 12H5L3 7z" /><path d="M5 19h14" />
      </svg>
    );
  },
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
