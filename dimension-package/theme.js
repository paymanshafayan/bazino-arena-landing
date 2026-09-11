/*
 * BAZINO 3D DIMENSION THEME — SDK v2 theme.js
 * Implements real interactive Bazino Pro Lounge Virtual Tour with Pointer/Mouse Scrubbing,
 * dynamic Ambilight background, 3D perspective tilt, and real-time station transitions.
 */
(function () {
  var SDK = (typeof window !== 'undefined') ? window.BazinoThemeSDK : null;
  if (!SDK || !SDK.registerComponent) return;
  var R = (SDK && SDK.React) ? SDK.React : (typeof window !== 'undefined' ? window.React : null);
  if (!R) return;

  function safeString(props, key, fallback) {
    if (props && typeof props.ts === 'function') {
      var val = props.ts(key);
      if (val && val !== key) return val;
    }
    return fallback || key;
  }

  // ── 6 REAL BAZINO PRO LOUNGE STATIONS (Extracted from 4K Video) ──
  var tourStations = [
    {
      id: 'grid',
      title: 'کاتالوگ ۹ بازی برتر PS5',
      subtitle: 'God of War, Spider-Man, EA FC 26, Black Ops 6',
      badge: 'OLED 4K 120HZ',
      img: '/assets/tour/tour-01-grid.webp',
      glow: '#00d2ff',
      glowRgba: 'rgba(0, 210, 255, 0.45)',
      tag: 'استیشن ۰۱'
    },
    {
      id: 'ronaldinho',
      title: 'استیشن اختصاصی رونالدینیو ۱۰',
      subtitle: 'والپیپر هنری Joga Bonito با سیستم نورپردازی کهربایی',
      badge: 'JOGA BONITO VIP',
      img: '/assets/tour/tour-02-ronaldinho.webp',
      glow: '#ffc400',
      glowRgba: 'rgba(255, 196, 0, 0.45)',
      tag: 'استیشن ۰۲'
    },
    {
      id: 'bazinopro',
      title: 'نشان سلطنتی بازینو پرو',
      subtitle: 'لوگوی سه‌بعدی تاج طلایی با ذرات معلق آتشین',
      badge: 'ROYAL CROWN',
      img: '/assets/tour/tour-03-bazinopro.webp',
      glow: '#ffd700',
      glowRgba: 'rgba(255, 215, 0, 0.55)',
      tag: 'استیشن ۰۳'
    },
    {
      id: 'sport',
      title: 'استیج نمایش مسابقات ورزشی',
      subtitle: 'نمایش رویدادهای زنده با نورپردازی یخی اقیانوسی',
      badge: 'ICE AMBILIGHT',
      img: '/assets/tour/tour-04-sport.webp',
      glow: '#38bdf8',
      glowRgba: 'rgba(56, 189, 248, 0.45)',
      tag: 'استیشن ۰۴'
    },
    {
      id: 'dock',
      title: 'کنسول دیواری PS5 و داک RGB',
      subtitle: 'دسته‌های DualSense روی پایه شارژ با بار نوری مالتی‌کالر و نور سرخابی',
      badge: 'DUALSENSE RGB',
      img: '/assets/tour/tour-05-dock.webp',
      glow: '#ff2a5f',
      glowRgba: 'rgba(255, 42, 95, 0.5)',
      tag: 'استیشن ۰۵'
    },
    {
      id: 'lounge',
      title: 'نمای پانورامای استیشن‌های بازینو',
      subtitle: 'ردیف استیشن‌های گیمینگ دیواری با کنترل هوشمند روشنایی',
      badge: '14 PRIVATE BAYS',
      img: '/assets/tour/tour-06-lounge.webp',
      glow: '#ffc400',
      glowRgba: 'rgba(255, 196, 0, 0.45)',
      tag: 'استیشن ۰۶'
    }
  ];

  // ── HEADER COMPONENT ──────────────────────────────────────────
  function HeaderFactory(props) {
    var p = props || {};
    var onNav = p.onNavigate || function () {};
    return R.createElement('header', { className: 'b3d-header' },
      R.createElement('a', { href: '/', className: 'b3d-logo', onClick: function (e) { e.preventDefault(); onNav('home'); } },
        R.createElement('div', { className: 'b3d-logo-mark' }, 'B'),
        R.createElement('div', { className: 'b3d-logo-text' }, 'BAZINO PRO')
      ),
      R.createElement('nav', { className: 'b3d-nav' },
        R.createElement('a', { href: '/', className: 'is-active', onClick: function (e) { e.preventDefault(); onNav('home'); } }, safeString(props, 'nav.home', 'تور مجازی سالن')),
        R.createElement('a', { href: '/games', onClick: function (e) { e.preventDefault(); onNav('games'); } }, safeString(props, 'nav.games', 'بازی‌ها')),
        R.createElement('a', { href: '/reservations', onClick: function (e) { e.preventDefault(); onNav('reservations'); } }, safeString(props, 'nav.reservations', 'کنسول‌های PS5')),
        R.createElement('a', { href: '/tournaments', onClick: function (e) { e.preventDefault(); onNav('tournaments'); } }, safeString(props, 'nav.tournaments', 'مسابقات')),
        R.createElement('a', { href: '/cafe', onClick: function (e) { e.preventDefault(); onNav('cafe'); } }, safeString(props, 'nav.cafe', 'کافه'))
      ),
      R.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        R.createElement('a', {
          href: '/reservations',
          className: 'b3d-btn-gold',
          onClick: function (e) { e.preventDefault(); onNav('reservations'); }
        }, safeString(props, 'headerReserve', 'رزرو نوبت') + ' ↗')
      )
    );
  }

  // ── HOME COMPONENT WITH REAL POINTER SCRUBBING ENGINE ───────────
  function HomeFactory(props) {
    var p = props || {};
    var onNav = p.onNavigate || function () {};
    var stateHook = R.useState(0);
    var activeIdx = stateHook[0];
    var setActiveIdx = stateHook[1];

    var tiltHook = R.useState({ rx: 0, ry: 0 });
    var tilt = tiltHook[0];
    var setTilt = tiltHook[1];

    var heroCardRef = R.useRef(null);

    // POINTER SCRUBBING HANDLER
    function handlePointerMove(e) {
      var el = heroCardRef.current;
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var relX = e.clientX - rect.left;
      var relY = e.clientY - rect.top;
      var ratioX = Math.max(0, Math.min(1, relX / rect.width));
      var ratioY = Math.max(0, Math.min(1, relY / rect.height));

      // Calculate index 0..5 based on horizontal position
      var nextIdx = Math.min(tourStations.length - 1, Math.floor(ratioX * tourStations.length));
      if (nextIdx !== activeIdx) {
        setActiveIdx(nextIdx);
      }

      // 3D Tilt calculation (subtle perspective rotation)
      var ry = (ratioX - 0.5) * 12; // -6deg to +6deg
      var rx = (0.5 - ratioY) * 10; // -5deg to +5deg
      setTilt({ rx: rx, ry: ry });
    }

    function handlePointerLeave() {
      setTilt({ rx: 0, ry: 0 });
    }

    var current = tourStations[activeIdx] || tourStations[0];

    return R.createElement('div', { className: 'theme-bazino-3d-dimension' },
      
      // Dynamic Ambilight Background Glow
      R.createElement('div', {
        className: 'b3d-dynamic-ambilight',
        style: {
          background: 'radial-gradient(ellipse 75% 50% at 50% 0%, ' + current.glowRgba + ' 0%, transparent 75%)'
        }
      }),

      // Virtual Tour Hero Section
      R.createElement('section', { className: 'b3d-hero' },
        
        // Kicker Badge
        R.createElement('div', { style: { marginBottom: '18px' } },
          R.createElement('span', { className: 'b3d-tag-gold' }, '⚡ تور مجازی اختصاصی • بازینو پرو')
        ),

        // Hero Persian Headline
        R.createElement('h1', { className: 'b3d-hero-title' },
          'اگه یه قهرمانی، ',
          R.createElement('br'),
          R.createElement('span', {
            className: 'b3d-hero-gold',
            style: { filter: 'drop-shadow(0 0 35px ' + current.glowRgba + ')' }
          }, 'این آخرشه.')
        ),

        // Subtitle with Pointer Instruction
        R.createElement('p', { className: 'b3d-hero-sub' },
          'نشانگر ماوس را روی ستاپ حرکت دهید تا بین استیشن‌های مختلف سالن گیم‌نت، داک‌های شارژ RGB و نمایشگرهای 4K گردش کنید.'
        ),
        
        // ── INTERACTIVE 3D VIRTUAL TOUR STAGE CARD ──
        R.createElement('div', { className: 'b3d-tour-container' },
          R.createElement('div', {
            ref: heroCardRef,
            onPointerMove: handlePointerMove,
            onPointerLeave: handlePointerLeave,
            className: 'b3d-tour-card',
            style: {
              borderColor: current.glow,
              boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 50px ' + current.glowRgba,
              transform: 'perspective(1200px) rotateX(' + tilt.rx + 'deg) rotateY(' + tilt.ry + 'deg)'
            }
          },
            // Card Header HUD
            R.createElement('div', { className: 'b3d-tour-card-head' },
              R.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                R.createElement('span', {
                  className: 'b3d-status-dot',
                  style: { backgroundColor: current.glow, boxShadow: '0 0 12px ' + current.glow }
                }),
                R.createElement('span', { style: { color: current.glow, fontWeight: '900', fontSize: '13px', letterSpacing: '1px' } }, current.tag),
                R.createElement('span', { style: { color: '#64748b', fontSize: '12px' } }, '(استیشن ' + (activeIdx + 1) + ' از ' + tourStations.length + ')')
              ),
              R.createElement('span', {
                className: 'b3d-badge-pill',
                style: { backgroundColor: current.glow, color: '#050608' }
              }, current.badge)
            ),

            // Card Media Screen (Interactive Virtual Tour Viewport)
            R.createElement('div', { className: 'b3d-tour-img-wrap' },
              R.createElement('img', {
                key: current.id,
                src: current.img,
                alt: current.title,
                className: 'b3d-tour-img'
              }),
              // Interactive HUD Guide Overlay
              R.createElement('div', { className: 'b3d-scrub-hint' },
                R.createElement('span', null, '◄ ماوس را برای گردش در سالن حرکت دهید ►')
              ),
              // Caption Overlay
              R.createElement('div', { className: 'b3d-tour-caption' },
                R.createElement('h3', { className: 'b3d-tour-title' }, current.title),
                R.createElement('p', { className: 'b3d-tour-desc' }, current.subtitle)
              )
            ),

            // Real-time Scrubbing Track Bar (6 Interactive Segments)
            R.createElement('div', { className: 'b3d-tour-track' },
              tourStations.map(function (st, idx) {
                var isSel = activeIdx === idx;
                return R.createElement('div', {
                  key: st.id,
                  onClick: function () { setActiveIdx(idx); },
                  className: 'b3d-track-segment' + (isSel ? ' is-active' : ''),
                  style: isSel ? { backgroundColor: st.glow, boxShadow: '0 0 15px ' + st.glow } : {}
                });
              })
            ),

            // 6-Step Station Switcher Buttons Grid
            R.createElement('div', { className: 'b3d-tour-nav-grid' },
              tourStations.map(function (st, idx) {
                var isSel = activeIdx === idx;
                return R.createElement('button', {
                  key: st.id,
                  type: 'button',
                  onClick: function () { setActiveIdx(idx); },
                  className: 'b3d-tour-btn' + (isSel ? ' is-active' : ''),
                  style: isSel ? { borderColor: st.glow, boxShadow: '0 0 15px ' + st.glow + '66', background: 'rgba(255,255,255,0.08)' } : {}
                },
                  R.createElement('span', { style: { color: isSel ? st.glow : '#94a3b8', fontWeight: '900', fontSize: '11px' } }, '۰' + (idx + 1)),
                  R.createElement('span', { style: { fontSize: '10px', color: isSel ? '#ffffff' : '#cbd5e1', fontWeight: isSel ? 'bold' : 'normal' } }, st.id.toUpperCase())
                );
              })
            ),

            // Booking CTA inside Card
            R.createElement('div', { style: { marginTop: '20px', display: 'flex', justifyContent: 'center' } },
              R.createElement('button', {
                className: 'b3d-btn-gold',
                style: { width: '100%', justifyContent: 'center', padding: '14px 28px', fontSize: '14px' },
                onClick: function () { onNav('reservations'); }
              }, 'رزرو این استیشن در سالن بازینو پرو ↗')
            )
          )
        )
      ),

      // 3D Game Roster Section
      R.createElement('section', { className: 'b3d-section' },
        R.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' } },
          R.createElement('h2', { style: { fontSize: '28px', fontWeight: '900', color: '#fff', margin: 0 } }, 'بازی‌های روز بازینو'),
          R.createElement('span', { style: { color: '#00d2ff', fontSize: '13px', fontWeight: 'bold' } }, '۴۲ استیشن آماده بازی')
        ),
        R.createElement('div', { className: 'b3d-grid-4' },
          [
            { title: 'EA SPORTS FC 26', img: '/assets/fc26.png', tag: 'SPORTS', stat: '۱۴ کنسول فعال' },
            { title: 'TEKKEN 8', img: '/assets/tekken8.png', tag: 'FIGHTING', stat: '۸ کنسول فعال' },
            { title: 'MORTAL KOMBAT 1', img: '/assets/mk1.png', tag: 'KOMBAT', stat: '۶ کنسول فعال' },
            { title: 'EA SPORTS UFC 5', img: '/assets/ufc5.png', tag: 'MMA', stat: '۱۰ کنسول فعال' }
          ].map(function (g, i) {
            return R.createElement('div', {
              key: i,
              className: 'b3d-game-card',
              onClick: function () { onNav('games'); }
            },
              R.createElement('img', { src: g.img, alt: g.title }),
              R.createElement('div', { className: 'b3d-game-overlay' }),
              R.createElement('div', { className: 'b3d-game-content' },
                R.createElement('span', { style: { color: '#00d2ff', fontSize: '11px', fontWeight: 'bold', background: 'rgba(0,210,255,0.15)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(0,210,255,0.3)' } }, g.tag)
              ),
              R.createElement('div', { className: 'b3d-game-content' },
                R.createElement('h3', { style: { fontSize: '20px', fontWeight: '900', color: '#fff', margin: '0 0 6px 0' } }, g.title),
                R.createElement('p', { style: { color: '#ffc400', fontSize: '13px', margin: 0, fontWeight: 'bold' } }, g.stat)
              )
            );
          })
        )
      )
    );
  }

  // Register components
  SDK.registerComponent('header', HeaderFactory);
  SDK.registerComponent('home', HomeFactory);

})();
