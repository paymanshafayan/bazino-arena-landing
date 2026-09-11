import { useState } from "react";
import { HubPage } from "../../design-system/chrome";
import { HubIcon } from "../../design-system/icons";
import { GALLERY_ITEMS } from "../data";

export default function GalleryPage() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>({
    1: 128, 2: 94, 3: 112, 4: 88, 5: 76, 6: 145
  });

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + 1) % GALLERY_ITEMS.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto === null) return;
    setActivePhoto((activePhoto + GALLERY_ITEMS.length - 1) % GALLERY_ITEMS.length);
  };

  const cur = activePhoto !== null ? GALLERY_ITEMS[activePhoto] : null;

  return (
    <HubPage activeNav="GALLERY">
      
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <section className="hub-section-top-nav">
        <div className="hub-section-header-group">
          <div className="hub-header-icon-wrap" style={{ color: "#c084fc" }}>
            <HubIcon.Gallery size={40} />
          </div>
          <h1 className="hub-list-title hub-title-purple">GALLERY</h1>
          <p className="hub-list-subtitle">REAL PLAYERS • REAL MOMENTS • BAZINO LIFE</p>
        </div>
        <div className="hub-neon-slogan-corner">
          <span>Good Games</span>
          <b>Good People</b>
        </div>
      </section>

      {/* ── PHOTO GRID ─────────────────────────────────────────────── */}
      <section className="hub-gallery-grid">
        {GALLERY_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className="hub-gallery-card"
            onClick={() => setActivePhoto(idx)}
          >
            <div className="hub-gallery-img-holder">
              <img src={item.img} alt={item.title} className="hub-gallery-thumb" />
              <div className="hub-gallery-card-overlay">
                <span className="hub-gallery-open-badge">CLICK TO ENLARGE</span>
              </div>
            </div>
            <div className="hub-gallery-card-foot">
              <span className="hub-gallery-item-title">{item.title}</span>
              <button
                type="button"
                className="hub-like-btn"
                onClick={(e) => handleLike(item.id, e)}
              >
                <span>❤️</span>
                <span>{likes[item.id] || item.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ── INTERACTIVE LIGHTBOX MODAL ─────────────────────────────── */}
      {cur && (
        <div className="hub-lightbox-overlay" onClick={() => setActivePhoto(null)}>
          <div className="hub-lightbox-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button
              type="button"
              className="hub-lightbox-close"
              onClick={() => setActivePhoto(null)}
            >
              ✕
            </button>

            {/* Navigation Arrows */}
            <button
              type="button"
              className="hub-lightbox-nav hub-lightbox-prev"
              onClick={prevPhoto}
            >
              ‹
            </button>
            <button
              type="button"
              className="hub-lightbox-nav hub-lightbox-next"
              onClick={nextPhoto}
            >
              ›
            </button>

            {/* Media Image */}
            <div className="hub-lightbox-media">
              <img src={cur.img} alt={cur.title} className="hub-lightbox-img" />
              
              <div className="hub-lightbox-meta-bar">
                <div>
                  <h3 className="hub-lightbox-title">{cur.title}</h3>
                  <p className="hub-lightbox-desc">{cur.desc}</p>
                </div>
                <button
                  type="button"
                  className="hub-like-pill"
                  onClick={(e) => handleLike(cur.id, e)}
                >
                  <span>❤️</span>
                  <span>{likes[cur.id] || cur.likes}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </HubPage>
  );
}
