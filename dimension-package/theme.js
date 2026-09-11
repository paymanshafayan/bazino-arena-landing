/*
 * BAZINO 3D DIMENSION THEME — SDK v2 theme.js
 * Implements 6-station interactive virtual tour hero and header for Bazino Game Net portal.
 */
(function () {
  var SDK = (typeof window !== 'undefined') ? window.BazinoThemeSDK : null;
  if (!SDK || !SDK.registerComponent) return;
  var R = SDK.React;
  if (!R) return;

  function safeString(props, key, fallback) {
    if (props && props.ts) {
      var val = props.ts(key);
      if (val) return val;
    }
    return fallback || key;
  }

  // ── HEADER COMPONENT ──────────────────────────────────────────
  function HeaderFactory(props) {
    return R.createElement('header', { className: 'b3d-header' },
      R.createElement('a', { href: '/', className: 'b3d-logo' },
        R.createElement('div', { className: 'b3d-logo-mark' }, 'B'),
        R.createElement('div', { className: 'b3d-logo-text' }, 'BAZINO PRO')
      ),
      R.createElement('nav', { className: 'b3d-nav' },
        R.createElement('a', { href: '/', className: 'is-active' }, safeString(props, 'nav.home', 'تور مجازی سالن')),
        R.createElement('a', { href: '/games' }, safeString(props, 'nav.games', 'بازی‌ها')),
        R.createElement('a', { href: '/reservations' }, safeString(props, 'nav.reservations', 'کنسول‌های PS5')),
        R.createElement('a', { href: '/tournaments' }, safeString(props, 'nav.tournaments', 'مسابقات')),
        R.createElement('a', { href: '/cafe' }, safeString(props, 'nav.cafe', 'کافه'))
      ),
      R.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        R.createElement('a', { href: '/reservations', className: 'b3d-btn-gold' }, safeString(props, 'headerReserve', 'رزرو نوبت'))
      )
    );
  }

  // ── HOME COMPONENT (INTERACTIVE VIRTUAL TOUR) ─────────────────
  function HomeFactory(props) {
    var stateHook = R.useState(0);
    var activeIdx = stateHook[0];
    var setActiveIdx = stateHook[1];

    var tourStations = [
      {
        id: 'grid',
        title: 'کاتالوگ ۹ بازی برتر PS5',
        subtitle: 'God of War, Spider-Man, EA FC 26, Black Ops 6',
        badge: 'OLED 4K 120HZ',
        img: '/assets/tour/tour-01-grid.webp',
        glow: '#00d2ff',
        tag: 'استیشن ۰۱'
      },
      {
        id: 'ronaldinho',
        title: 'استیشن اختصاصی رونالدینیو ۱۰',
        subtitle: 'والپیپر هنری Joga Bonito با سیستم نورپردازی کهربایی',
        badge: 'JOGA BONITO VIP',
        img: '/assets/tour/tour-02-ronaldinho.webp',
        glow: '#ffc400',
        tag: 'استیشن ۰۲'
      },
      {
        id: 'bazinopro',
        title: 'نشان سلطنتی بازینو پرو',
        subtitle: 'لوگوی سه‌بعدی تاج طلایی با ذرات معلق آتشین',
        badge: 'ROYAL CROWN',
        img: '/assets/tour/tour-03-bazinopro.webp',
        glow: '#ffd700',
        tag: 'استیشن ۰۳'
      },
      {
        id: 'sport',
        title: 'استیج نمایش مسابقات ورزشی',
        subtitle: 'نمایش رویدادهای زنده با نورپردازی یخی اقیانوسی',
        badge: 'ICE AMBILIGHT',
        img: '/assets/tour/tour-04-sport.webp',
        glow: '#38bdf8',
        tag: 'استیشن ۰۴'
      },
      {
        id: 'dock',
        title: 'کنسول دیواری PS5 و داک RGB',
        subtitle: 'دسته‌های DualSense روی پایه شارژ با بار نوری RGB و نور سرخابی',
        badge: 'DUALSENSE RGB',
        img: '/assets/tour/tour-05-dock.webp',
        glow: '#ff2a5f',
        tag: 'استیشن ۰۵'
      },
      {
        id: 'lounge',
        title: 'نمای پانورامای استیشن‌های بازینو',
        subtitle: 'ردیف استیشن‌های گیمینگ دیواری با کنترل هوشمند روشنایی',
        badge: '14 PRIVATE BAYS',
        img: '/assets/tour/tour-06-lounge.webp',
        glow: '#ffc400',
        tag: 'استیشن ۰۶'
      }
    ];

    var current = tourStations[activeIdx] || tourStations[0];

    return R.createElement('div', { className: 'theme-bazino-3d-dimension' },
      // Virtual Tour Hero Section
      R.createElement('section', { className: 'b3d-hero' },
        R.createElement('div', {
          className: 'b3d-conical-light',
          style: { background: 'radial-gradient(ellipse 80% 50% at 50% 0%, ' + current.glow + '33 0%, transparent 80%)' }
        }),
        R.createElement('div', { style: { marginBottom: '16px' } },
          R.createElement('span', { className: 'b3d-tag-gold' }, 'BAZINO PRO LOUNGE')
        ),
        R.createElement('h1', { className: 'b3d-hero-title' },
          'اگه یه قهرمانی، ',
          R.createElement('br'),
          R.createElement('span', { className: 'b3d-hero-gold' }, 'این آخرشه.')
        ),
        R.createElement('p', { className: 'b3d-hero-sub' },
          'استیشن‌های دیواری اختصاصی PS5 Pro با نمایشگرهای غول‌پیکر 4K، داک‌های شارژ DualSense با نورپردازی RGB و سیستم امبیلایت هماهنگ در ایسکله قبرس شمالی.'
        ),
        
        // Interactive Tour Stage Card
        R.createElement('div', { className: 'b3d-tour-container' },
          R.createElement('div', {
            className: 'b3d-tour-card',
            style: { borderColor: current.glow, boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px ' + current.glow + '44' }
          },
            R.createElement('div', { className: 'b3d-tour-card-head' },
              R.createElement('span', { style: { color: current.glow, fontWeight: 'bold', fontSize: '12px' } }, current.tag),
              R.createElement('span', { className: 'b3d-badge-pill', style: { backgroundColor: current.glow } }, current.badge)
            ),
            R.createElement('div', { className: 'b3d-tour-img-wrap' },
              R.createElement('img', { src: current.img, alt: current.title, className: 'b3d-tour-img' }),
              R.createElement('div', { className: 'b3d-tour-caption' },
                R.createElement('h3', { className: 'b3d-tour-title' }, current.title),
                R.createElement('p', { className: 'b3d-tour-desc' }, current.subtitle)
              )
            ),
            // 6-Step Station Switcher Buttons
            R.createElement('div', { className: 'b3d-tour-nav-grid' },
              tourStations.map(function (st, idx) {
                var isSel = activeIdx === idx;
                return R.createElement('button', {
                  key: st.id,
                  type: 'button',
                  onClick: function () { setActiveIdx(idx); },
                  className: 'b3d-tour-btn' + (isSel ? ' is-active' : ''),
                  style: isSel ? { borderColor: st.glow, boxShadow: '0 0 15px ' + st.glow + '66' } : {}
                },
                  R.createElement('span', { style: { color: isSel ? st.glow : '#94a3b8', fontWeight: '900', fontSize: '11px' } }, '0' + (idx + 1)),
                  R.createElement('span', { style: { fontSize: '9px', color: '#cbd5e1' } }, st.id.toUpperCase())
                );
              })
            )
          )
        )
      ),

      // 3D Game Roster Section
      R.createElement('section', { className: 'b3d-section' },
        R.createElement('h2', { style: { fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '24px', textAlign: 'right' } }, 'بازی‌های روز بازینو'),
        R.createElement('div', { className: 'b3d-grid-4' },
          [
            { title: 'EA SPORTS FC 26', img: '/assets/fc26.png', tag: 'SPORTS', stat: '۱۴ کنسول فعال' },
            { title: 'TEKKEN 8', img: '/assets/tekken8.png', tag: 'FIGHTING', stat: '۸ کنسول فعال' },
            { title: 'MORTAL KOMBAT 1', img: '/assets/mk1.png', tag: 'KOMBAT', stat: '۶ کنسول فعال' },
            { title: 'EA SPORTS UFC 5', img: '/assets/ufc5.png', tag: 'MMA', stat: '۱۰ کنسول فعال' }
          ].map(function (g, i) {
            return R.createElement('div', { key: i, className: 'b3d-game-card' },
              R.createElement('img', { src: g.img, alt: g.title }),
              R.createElement('div', { className: 'b3d-game-overlay' }),
              R.createElement('div', { className: 'b3d-game-content' },
                R.createElement('span', { style: { color: '#00d2ff', fontSize: '11px', fontWeight: 'bold' } }, g.tag)
              ),
              R.createElement('div', { className: 'b3d-game-content' },
                R.createElement('h3', { style: { fontSize: '20px', fontWeight: '900', color: '#fff', margin: '0 0 6px 0' } }, g.title),
                R.createElement('p', { style: { color: '#ffc400', fontSize: '13px', margin: 0 } }, g.stat)
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
