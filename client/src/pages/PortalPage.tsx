/*
 * Bazino visual direction: internal routes are framed as discovered portal Chapters.
 * A consistent information rail, scene image, action, and content cards keeps the
 * cinematic language useful without hiding practical navigation.
 */
import { ArrowLeft, ArrowUpRight, CalendarDays, ChevronRight, Crown, Gamepad2, MessageCircle, ShoppingBag, Trophy } from "lucide-react";
import { Link } from "wouter";
import PortalShell from "@/components/PortalShell";
import { portalPageCopy, portalNav, type PortalPageId } from "@/data/portalData";

const pageIcons = {
  reservations: CalendarDays,
  cafe: Gamepad2,
  shop: ShoppingBag,
  tournaments: Trophy,
  blog: MessageCircle,
  loyalty: Crown,
  chat: MessageCircle,
};

export default function PortalPage({ pageId }: { pageId: PortalPageId }) {
  const page = portalPageCopy[pageId];
  const Icon = pageIcons[pageId];
  const pageIndex = String(portalNav.findIndex((item) => item.id === pageId) + 1).padStart(2, "0");

  return (
    <PortalShell current={pageId}>
      <section className="portal-hero">
        <div className="portal-hero-image"><img src={page.image} alt="" /><div className="portal-hero-overlay" /></div>
        <div className="portal-page-frame">
          <div className="portal-page-index">{pageIndex}<span>/ 07</span></div>
          <div className="portal-hero-copy"><div className="eyebrow"><span className="eyebrow-line" />{page.eyebrow}</div><h1>{page.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h1><p>{page.body}</p><a className="button button--gold" href="https://bazino.pro" target="_blank" rel="noreferrer">{page.action}<ArrowUpRight size={16} /></a></div>
          <aside className="portal-hero-status"><div className="portal-status-icon"><Icon size={21} /></div><span>{page.accent}</span><strong>ACTIVE<br />CHANNEL</strong><div className="portal-status-rule" /><small>BAZINO / PORTAL 2026</small></aside>
        </div>
      </section>
      <section className="portal-content-section">
        <div className="portal-page-frame portal-content-head"><div className="section-scene-tag"><span>DATA SURFACE / {pageIndex}</span><b>{page.accent}</b></div><div className="technical-rail"><span>LIVE PORTAL VIEW</span><i /><span>CONSOLE-FIRST</span><i /><span>İSKELE / CYPRUS</span></div></div>
        <div className="portal-page-frame portal-card-grid">{page.cards.map((card, index) => <article className="portal-data-card" key={card.title}><div className="portal-data-card-top"><span>{card.label}</span><span>0{index + 1}</span></div><div className="portal-data-card-icon"><Icon size={21} /></div><h2>{card.title}</h2><p>{card.body}</p><Link href={pageId === "blog" ? "/" : "/reservations"}>Open channel <ChevronRight size={15} /></Link></article>)}</div>
      </section>
      <section className="portal-next-section"><div className="portal-page-frame"><Link href="/" className="text-button"><ArrowLeft size={16} /> Back to Arena</Link><div className="portal-next-grid"><div><span className="eyebrow"><span className="eyebrow-line" />THE PORTAL CONTINUES</span><h2>Find your<br /><em>next scene.</em></h2></div><div className="portal-route-list">{portalNav.filter((item) => item.id !== pageId).slice(0, 3).map((item) => <Link key={item.id} href={`/${item.id}`}><span>{item.label}</span><ArrowUpRight size={16} /></Link>)}</div></div></div></section>
    </PortalShell>
  );
}
