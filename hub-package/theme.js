/*
 * BAZINO HUB NEON THEME — SDK v2 Package
 * High-definition OLED 3D Spatial Gaming Club Theme for Bazino Portal.
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

  // ── HEADER COMPONENT ──────────────────────────────────────────
  function HeaderFactory(props) {
    var p = props || {};
    var onNav = p.onNavigate || function () {};

    return R.createElement('header', { className: 'hub-header' },
      R.createElement('a', { href: '/hub', className: 'hub-logo', onClick: function (e) { e.preventDefault(); onNav('home'); } },
        R.createElement('span', { className: 'hub-logo-brand' }, 'BAZINO'),
        R.createElement('span', { className: 'hub-logo-sub' }, 'GAMING CLUB')
      ),
      R.createElement('nav', { className: 'hub-nav' },
        R.createElement('a', { href: '/hub', className: 'is-on', onClick: function (e) { e.preventDefault(); onNav('home'); } }, safeString(props, 'nav.home', 'HOME')),
        R.createElement('a', { href: '/hub/games', onClick: function (e) { e.preventDefault(); onNav('games'); } }, safeString(props, 'nav.games', 'GAMES')),
        R.createElement('a', { href: '/hub/events', onClick: function (e) { e.preventDefault(); onNav('events'); } }, safeString(props, 'nav.events', 'EVENTS')),
        R.createElement('a', { href: '/hub/gallery', onClick: function (e) { e.preventDefault(); onNav('gallery'); } }, safeString(props, 'nav.gallery', 'GALLERY')),
        R.createElement('a', { href: '/hub/prices', onClick: function (e) { e.preventDefault(); onNav('prices'); } }, safeString(props, 'nav.prices', 'PRICES')),
        R.createElement('a', { href: '/hub/shop', onClick: function (e) { e.preventDefault(); onNav('shop'); } }, safeString(props, 'nav.shop', 'SHOP')),
        R.createElement('a', { href: '/hub/food', onClick: function (e) { e.preventDefault(); onNav('food'); } }, safeString(props, 'nav.food', 'FOOD & DRINKS')),
        R.createElement('a', { href: '/hub/about', onClick: function (e) { e.preventDefault(); onNav('about'); } }, safeString(props, 'nav.about', 'ABOUT')),
        R.createElement('a', { href: '/hub/contact', onClick: function (e) { e.preventDefault(); onNav('contact'); } }, safeString(props, 'nav.contact', 'CONTACT'))
      ),
      R.createElement('div', { className: 'hub-head-right' },
        R.createElement('div', { className: 'hub-auth-btns' },
          R.createElement('button', {
            type: 'button',
            className: 'hub-btn-register',
            onClick: function () { onNav('register'); }
          }, safeString(props, 'register', '+ REGISTER')),
          R.createElement('button', {
            type: 'button',
            className: 'hub-btn-login',
            onClick: function () { onNav('login'); }
          }, safeString(props, 'login', 'LOGIN'))
        )
      )
    );
  }

  // ── HOME COMPONENT (3-Panel Split Hero & 7 Quick Cards) ────────
  function HomeFactory(props) {
    var p = props || {};
    var onNav = p.onNavigate || function () {};

    var quickCards = [
      { id: 'games', title: 'GAMES', sub: 'Explore all games for kids & adults', tone: 'cyan', icon: '🎮' },
      { id: 'events', title: 'EVENTS', sub: 'Tournaments, matches and special events', tone: 'magenta', icon: '🏆' },
      { id: 'gallery', title: 'GALLERY', sub: 'Photos from Bazino gaming club', tone: 'purple', icon: '🖼️' },
      { id: 'prices', title: 'PRICES', sub: 'Play time & packages for everyone', tone: 'cyan', icon: '🏷️' },
      { id: 'shop', title: 'SHOP', sub: 'Gaming gear, accessories & more', tone: 'magenta', icon: '🛍️' },
      { id: 'food', title: 'FOOD & DRINKS', sub: 'Snacks, drinks and delicious food', tone: 'orange', icon: '🍔' },
      { id: 'about', title: 'ABOUT', sub: 'About Bazino and our space', tone: 'pink', icon: 'ℹ️' }
    ];

    return R.createElement('div', { className: 'theme-bazino-hub hub-page' },
      R.createElement(HeaderFactory, props),
      R.createElement('main', { className: 'hub-main' },
        
        // 3-Panel Split Hero
        R.createElement('section', { className: 'hub-split-hero' },
          // Left Card
          R.createElement('div', { className: 'hub-hero-card hub-hero-card-left', onClick: function () { onNav('events'); } },
            R.createElement('div', { className: 'hub-hero-card-bg hub-hero-bg-tournament' }),
            R.createElement('div', { className: 'hub-hero-card-overlay' }),
            R.createElement('div', { className: 'hub-hero-card-content' },
              R.createElement('span', { className: 'hub-hero-tag' }, 'TOURNAMENT'),
              R.createElement('h3', { className: 'hub-hero-card-title' }, 'FC24 / FC26'),
              R.createElement('p', { className: 'hub-hero-card-meta' }, 'SATURDAY, 14 JUNE • 16:00'),
              R.createElement('span', { className: 'hub-hero-arrow-btn' }, '‹')
            )
          ),
          // Center Card
          R.createElement('div', { className: 'hub-hero-card hub-hero-card-center', onClick: function () { onNav('games'); } },
            R.createElement('div', { className: 'hub-hero-card-bg hub-hero-bg-gta' }),
            R.createElement('div', { className: 'hub-hero-card-overlay' }),
            R.createElement('div', { className: 'hub-hero-center-content' },
              R.createElement('span', { className: 'hub-hero-badge-pill' }, 'COMING SOON'),
              R.createElement('h2', { className: 'hub-hero-main-title' }, 'Grand Theft Auto VI'),
              R.createElement('p', { className: 'hub-hero-sub-text' }, 'THE NEXT GENERATION OF CRIME'),
              R.createElement('button', { className: 'hub-hero-cta-btn', type: 'button' }, 'MORE INFO →')
            )
          ),
          // Right Card
          R.createElement('div', { className: 'hub-hero-card hub-hero-card-right', onClick: function () { onNav('events'); } },
            R.createElement('div', { className: 'hub-hero-card-bg hub-hero-bg-match' }),
            R.createElement('div', { className: 'hub-hero-card-overlay' }),
            R.createElement('div', { className: 'hub-hero-card-content' },
              R.createElement('span', { className: 'hub-hero-live-badge' }, 'LIVE MATCH'),
              R.createElement('div', { className: 'hub-match-teams' },
                R.createElement('span', null, 'REAL MADRID VS BARCELONA')
              ),
              R.createElement('p', { className: 'hub-hero-card-meta' }, 'TONIGHT 21:00'),
              R.createElement('span', { className: 'hub-hero-arrow-btn' }, '›')
            )
          )
        ),

        // 7 Quick Access Cards
        R.createElement('section', { className: 'hub-quick-access-section' },
          R.createElement('div', { className: 'hub-quick-grid' },
            quickCards.map(function (c) {
              return R.createElement('div', {
                key: c.id,
                className: 'hub-quick-card hub-quick-card--' + c.tone,
                onClick: function () { onNav(c.id); }
              },
                R.createElement('div', { style: { fontSize: '32px', marginBottom: '10px' } }, c.icon),
                R.createElement('h4', { className: 'hub-quick-title' }, c.title),
                R.createElement('p', { className: 'hub-quick-sub' }, c.sub),
                R.createElement('div', { className: 'hub-quick-arrow' }, '→')
              );
            })
          )
        )
      )
    );
  }

  function GenericRegionFactory(regionName) {
    return function (props) {
      return R.createElement('div', { className: 'theme-bazino-hub hub-page' },
        R.createElement(HeaderFactory, props),
        R.createElement('main', { className: 'hub-main' },
          R.createElement('div', { style: { padding: '40px 0', textAlign: 'center' } },
            R.createElement('h1', { style: { color: '#00e5ff', fontFamily: 'Orbitron, sans-serif' } }, regionName.toUpperCase())
          )
        )
      );
    };
  }

  var registeredRegions = [
    'home', 'header', 'hero', 'hub.home', 'hub.games', 'hub.events',
    'hub.weekly', 'hub.special', 'hub.season', 'hub.brackets',
    'hub.register', 'hub.shop', 'hub.food', 'hub.club', 'hub.blog',
    'hub.contact', 'hub.rules', 'hub.privacy', 'profile', 'prices',
    'gallery', 'about'
  ];

  SDK.registerComponent('header', HeaderFactory);
  SDK.registerComponent('home', HomeFactory);
  SDK.registerComponent('hero', HomeFactory);

  for (var i = 0; i < registeredRegions.length; i++) {
    var reg = registeredRegions[i];
    if (reg !== 'header' && reg !== 'home' && reg !== 'hero') {
      SDK.registerComponent(reg, GenericRegionFactory(reg));
    }
  }

})();
