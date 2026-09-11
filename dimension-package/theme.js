/*
 * BAZINO 3D DIMENSION THEME — SDK v2 theme.js
 * Implements 3D spatial card deck hero and header for Bazino Game Net portal.
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
        R.createElement('div', { className: 'b3d-logo-text' }, 'BAZINO 3D')
      ),
      R.createElement('nav', { className: 'b3d-nav' },
        R.createElement('a', { href: '/', className: 'is-active' }, safeString(props, 'nav.home', 'خانه سه‌بعدی')),
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

  // ── HOME COMPONENT (3D DECK) ──────────────────────────────────
  function HomeFactory(props) {
    var stateHook = R.useState(0);
    var activeIdx = stateHook[0];
    var setActiveIdx = stateHook[1];

    var cards = [
      {
        id: 'lounge',
        title: 'سالن اصلی گیم‌نت بازینو',
        desc: 'اتمسفر لوکس نسل نهم با کنسول‌های PS5 Pro، نورپردازی نئونی و حضور مونا',
        cat: 'BAZINO MAIN LOUNGE',
        badge: '360° SPATIAL',
        img: '/assets/mona-hero-wide.png'
      },
      {
        id: 'fc26',
        title: 'EA SPORTS FC 26',
        desc: 'شبیه‌ساز نسل جدید فوتبال با مسابقات هفتگی و جوایز نقدی ۵,۰۰۰ لیر',
        cat: 'SPORTS & CUP',
        badge: '۱۴ کنسول فعال',
        img: '/assets/fc26.png'
      },
      {
        id: 'ps5',
        title: 'ایستگاه‌های PS5 Pro VIP',
        desc: 'تلویزیون‌های ۶۵ اینچ OLED با رفرش‌ریت ۱۲۰ هرتز و دسته‌های DualSense Edge',
        cat: 'CONSOLE ZONE',
        badge: 'OLED HDR 120HZ',
        img: '/assets/hero-setup.jpg'
      },
      {
        id: 'pc',
        title: 'ریگ‌های گیمینگ RTX 4090',
        desc: 'سیستم‌های بتل‌استیشن با مانیتورهای ۲۴۰ هرتز ZOWIE و پینگ تک‌رقمی فیبر نوری',
        cat: 'ESPORTS ARENA',
        badge: '240HZ PRO GEAR',
        img: '/assets/hero-player.jpg'
      },
      {
        id: 'tekken',
        title: 'TEKKEN 8 & MORTAL KOMBAT 1',
        desc: 'مبارزات حرفه‌ای با فایت‌استیک‌های آرکید سفارشی و رندرهای آنریل ۵',
        cat: 'FIGHTING ARENA',
        badge: 'ARCADE STICK',
        img: '/assets/tekken8.png'
      }
    ];

    return R.createElement('div', { className: 'theme-bazino-3d-dimension' },
      // 3D Hero Section
      R.createElement('section', { className: 'b3d-hero' },
        R.createElement('div', { className: 'b3d-conical-light' }),
        R.createElement('h1', { className: 'b3d-hero-title' },
          'اگه یه قهرمانی، ',
          R.createElement('br'),
          R.createElement('span', { className: 'b3d-hero-gold' }, 'این آخرشه.')
        ),
        R.createElement('p', { className: 'b3d-hero-sub' },
          'کاوش ۳ بعدی فضای سالن گیم‌نت بازینو — برای جابه‌جایی و انتخاب بخش‌ها روی کارت‌ها کلیک کنید.'
        ),
        
        // 3D Deck Container
        R.createElement('div', { className: 'b3d-deck-stage' },
          cards.map(function (c, idx) {
            var offset = (idx - activeIdx + 5) % 5;
            var cls = 'b3d-card';
            if (offset === 0) cls += ' is-center';
            else if (offset === 1) cls += ' is-right';
            else if (offset === 4) cls += ' is-left';
            else cls += ' is-left'; // background card

            return R.createElement('div', {
              key: c.id,
              className: cls,
              onClick: function () { setActiveIdx(idx); }
            },
              R.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', zIndex: 5 } },
                R.createElement('span', { style: { fontSize: '11px', color: '#00d2ff', fontWeight: 'bold' } }, c.cat),
                R.createElement('span', { style: { fontSize: '11px', color: '#ffc400', fontWeight: 'bold' } }, c.badge)
              ),
              R.createElement('img', { src: c.img, alt: c.title, className: 'b3d-card-img' }),
              R.createElement('div', { style: { zIndex: 5 } },
                R.createElement('h3', { className: 'b3d-card-title' }, c.title),
                R.createElement('p', { className: 'b3d-card-desc' }, c.desc),
                R.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' } },
                  R.createElement('span', { style: { color: '#ffc400', fontWeight: 'bold', fontSize: '13px' } }, 'بازینو کلاب'),
                  R.createElement('button', { className: 'b3d-btn-gold', style: { padding: '6px 14px', fontSize: '12px' } }, 'رزرو جایگاه')
                )
              )
            );
          })
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
