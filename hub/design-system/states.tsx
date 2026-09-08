import type { ReactNode } from "react";
import { HubIcon } from "./icons";

/**
 * PDF §21 — every list/section needs a consistent Loading / Empty / Error look.
 * Use these three primitives instead of ad-hoc markup so the states stay identical
 * across Hub pages.
 */

export function HubLoading({ label = "LOADING", rows = 3 }: { label?: string; rows?: number }) {
  return (
    <div className="hub-state hub-state--loading" role="status" aria-live="polite">
      <div className="hub-skel-rows">
        {Array.from({ length: rows }).map((_, i) => (
          <span key={i} className="hub-skel" />
        ))}
      </div>
      <p className="hub-state-label">{label}…</p>
    </div>
  );
}

export function HubEmpty({
  title = "NOTHING HERE YET",
  body,
  action,
}: {
  title?: string;
  body?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="hub-state hub-state--empty">
      <span className="hub-state-ic"><HubIcon.Star size={26} /></span>
      <b>{title}</b>
      {body && <p>{body}</p>}
      {action}
    </div>
  );
}

export function HubError({
  title = "SOMETHING WENT WRONG",
  body = "Please try again in a moment.",
  onRetry,
}: {
  title?: string;
  body?: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <div className="hub-state hub-state--error" role="alert">
      <span className="hub-state-ic is-error"><HubIcon.Bell size={24} /></span>
      <b>{title}</b>
      <p>{body}</p>
      {onRetry && <button type="button" className="hub-state-btn" onClick={onRetry}>RETRY</button>}
    </div>
  );
}

/** Full-width skeleton used while a bracket is being loaded. */
export function HubBracketSkeleton() {
  return (
    <div className="hub-state hub-state--bracket" role="status" aria-live="polite">
      <div className="hub-skel-bracket">
        {Array.from({ length: 5 }).map((_, col) => (
          <div key={col} className="hub-skel-col">
            {Array.from({ length: Math.max(1, 8 >> col) }).map((_, i) => (
              <span key={i} className="hub-skel hub-skel-card" />
            ))}
          </div>
        ))}
      </div>
      <p className="hub-state-label">LOADING BRACKET…</p>
    </div>
  );
}
