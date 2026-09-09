/*
 * BAZINO THEME — HUB NEON (Theme SDK v2 Full Design System)
 * Registered with the Theme SDK for Bazino Portal
 */
(function () {
  var SDK = (typeof window !== 'undefined') ? window.BazinoThemeSDK : null;
  if (!SDK || !SDK.registerComponent) return;
  var R = (SDK && SDK.React) ? SDK.React : (typeof window !== 'undefined' ? window.React : null);
  if (!R) return;

  function makeFactory(Component) {
    var fn = function (props) {
      if (arguments.length === 0) {
        return {
          apiVersion: 2,
          render: function (p) {
            return R.createElement(Component, p || {});
          }
        };
      }
      return R.createElement(Component, props || {});
    };
    fn.apiVersion = 2;
    fn.render = function (props) {
      return R.createElement(Component, props || {});
    };
    return fn;
  }

  function HubHeader(props) {
    var p = props || {};
    var lang = p.language || p.lang || 'en';
    var active = p.activeTab || 'HOME';

    return R.createElement('header', { className: 'hub-header' },
      R.createElement('a', { href: '/hub', className: 'hub-logo' },
        R.createElement('svg', { viewBox: '0 0 48 32', width: 42, height: 28, className: 'hub-logo-pad' },
          R.createElement('defs', null,
            R.createElement('linearGradient', { id: 'hub-logo-g', x1: '0', y1: '0', x2: '1', y2: '1' },
              R.createElement('stop', { offset: '0%', stopColor: '#22d3ff' }),
              R.createElement('stop', { offset: '100%', stopColor: '#ff2db0' })
            )
          ),
          R.createElement('g', { fill: 'none', stroke: 'url(#hub-logo-g)', strokeWidth: '2.4', strokeLinecap: 'round', strokeLinejoin: 'round' },
            R.createElement('path', { d: 'M14 24h20c4 0 7-3 7-7 0-5-3-8-8-8-3 0-5 1.4-9 1.4S18 9 15 9c-5 0-8 3-8 8 0 4 3 7 7 7z' }),
            R.createElement('path', { d: 'M14 24c-1 3-3 5-6 6M34 24c1 3 3 5 6 6M18 12l2 3M26 12l-2 3' })
          )
        ),
        R.createElement('span', { className: 'hub-logo-word' },
          R.createElement('b', null, 'BAZINO'),
          R.createElement('small', null, 'GAMING CLUB')
        )
      ),
      R.createElement('nav', { className: 'hub-nav' },
        ['HOME', 'GAMES', 'EVENTS', 'SHOP', 'FOOD & DRINKS', 'CLUB', 'BLOG', 'CHAT'].map(function (tab) {
          var isCurrent = (tab === active || (active === 'home' && tab === 'HOME'));
          return R.createElement('a', {
            key: tab,
            href: tab === 'HOME' ? '/hub' : '/hub/' + tab.toLowerCase().replace(/ & /g, '-'),
            className: isCurrent ? 'is-on' : '',
            onClick: function (e) {
              if (p.onNavigate) { e.preventDefault(); p.onNavigate(tab.toLowerCase()); }
            }
          }, tab);
        })
      ),
      R.createElement('div', { className: 'hub-head-right' },
        R.createElement('div', { className: 'hub-chip' },
          R.createElement('span', null, '🌐'),
          R.createElement('span', { className: 'hub-chip-tx' }, String(lang).toUpperCase()),
          R.createElement('div', { className: 'hub-lang-menu' },
            ['EN', 'TR', 'FA', 'RU'].map(function (l) {
              return R.createElement('button', {
                key: l,
                type: 'button',
                className: (l.toLowerCase() === lang.toLowerCase()) ? 'is-on' : '',
                onClick: function () { if (p.onLanguage) p.onLanguage(l.toLowerCase()); }
              }, l);
            })
          )
        ),
        p.user ? R.createElement('div', { className: 'hub-user' },
          R.createElement('span', { className: 'hub-user-meta' },
            R.createElement('b', null, p.user.displayName || p.user.username),
            R.createElement('small', null, (p.user.points || 0) + ' PTS')
          )
        ) : R.createElement(R.Fragment, null,
          R.createElement('button', {
            className: 'hub-join hub-neon-box hub-neon-box--magenta',
            type: 'button',
            onClick: function () { if (p.onLogin) p.onLogin(); }
          }, 'JOIN'),
          R.createElement('button', {
            className: 'hub-login-btn hub-neon-box',
            type: 'button',
            onClick: function () { if (p.onLogin) p.onLogin(); }
          }, 'LOGIN')
        )
      )
    );
  }

  function HubFooter(props) {
    return R.createElement('footer', { className: 'hub-footer' },
      R.createElement('div', { className: 'hub-footer-main' },
        R.createElement('a', { href: '/hub', className: 'hub-foot-logo' },
          R.createElement('b', null, 'BAZINO'),
          R.createElement('small', null, 'GAMING CLUB')
        ),
        R.createElement('div', { className: 'hub-vdiv' }),
        R.createElement('a', {
          href: 'https://www.google.com/maps/search/?api=1&query=Hotel%20VistaMare%2C%20%C4%B0skele%2C%20Long%20Beach%2C%20Cyprus',
          target: '_blank',
          rel: 'noreferrer',
          className: 'hub-foot-item'
        },
          R.createElement('span', { className: 'hub-fic pink' }, '📍'),
          R.createElement('span', null, 'Iskele, Long Beach', R.createElement('br'), R.createElement('b', null, 'Hotel VistaMare'))
        ),
        R.createElement('div', { className: 'hub-foot-item' },
          R.createElement('span', { className: 'hub-fic red' }, '🕒'),
          R.createElement('span', null, 'OPEN EVERYDAY', R.createElement('br'), R.createElement('b', null, '11:00 – 23:50'))
        ),
        R.createElement('a', { href: 'https://wa.me/905391123747', target: '_blank', rel: 'noreferrer', className: 'hub-foot-item' },
          R.createElement('span', { className: 'hub-fic green' }, '💬'),
          R.createElement('span', null, 'WHATSAPP', R.createElement('br'), R.createElement('b', null, '+90 539 112 37 47'))
        ),
        R.createElement('a', { href: 'https://instagram.com/bazinopro', target: '_blank', rel: 'noreferrer', className: 'hub-foot-item' },
          R.createElement('span', { className: 'hub-fic ig' }, '📷'),
          R.createElement('span', null, 'INSTAGRAM', R.createElement('br'), R.createElement('b', null, '@bazinopro'))
        ),
        R.createElement('div', { className: 'hub-foot-sign' },
          '👑 More Than a Game',
          R.createElement('i', null, ' A Community')
        )
      ),
      R.createElement('div', { className: 'hub-foot-legal' },
        R.createElement('a', { href: '/hub/rules' }, 'RULES'),
        R.createElement('span', null, ' · '),
        R.createElement('a', { href: '/hub/privacy' }, 'PRIVACY'),
        R.createElement('span', null, ' · '),
        R.createElement('a', { href: '/hub/contact' }, 'CONTACT'),
        R.createElement('small', null, ' © 2026 BAZINO GAMING CLUB — Good Games · Better People')
      )
    );
  }

  function HubHome(props) {
    var p = props || {};
    var activeSlide = 0;
    try {
      var state = R.useState(0);
      activeSlide = state[0];
      var setActiveSlide = state[1];
    } catch (e) { /* SSR fallback */ }

    var base = p.assetsBase || '/api/themes/bazino-hub/assets';

    var slides = [
      {
        badge: 'NOW',
        badgeClass: 'is-live',
        title: 'FC 26 TOURNAMENT',
        body: 'Saturday night bracket. 32 players. Live on the club TVs.',
        cta: 'VIEW BRACKET',
        img: base + '/slide-fc26.jpg'
      },
      {
        badge: 'COMING SOON',
        badgeClass: 'is-soon',
        title: 'GRAND THEFT AUTO VI',
        body: 'The next generation of crime. Stay tuned at Bazino.',
        cta: 'MORE INFO',
        img: base + '/slide-city.jpg'
      },
      {
        badge: 'LIVE MATCH',
        badgeClass: 'is-live',
        title: 'REAL MADRID vs BARCELONA',
        body: 'TONIGHT 21:00 • Big screen football in the lounge.',
        cta: 'RESERVE A BAY',
        img: base + '/slide-match.jpg'
      }
    ];

    var tiles = [
      { href: '/hub/games', title: 'GAMES', sub: 'Explore all games for kids & adults', tone: 'cyan', icon: '🎮' },
      { href: '/hub/events', title: 'EVENTS', sub: 'Tournaments, matches and special events', tone: 'magenta', icon: '🏆' },
      { href: '/hub/shop', title: 'SHOP', sub: 'Gaming gear, accessories & more', tone: 'gold', icon: '⭐' },
      { href: '/hub/food', title: 'FOOD & DRINKS', sub: 'Snacks, drinks and delicious food', tone: 'gold', icon: '🍔' },
      { href: '/hub/club', title: 'CLUB', sub: 'Credits, member card, loyalty rewards', tone: 'green', icon: '👥' },
      { href: '/hub/blog', title: 'BLOG', sub: 'Club news and match reports', tone: 'purple', icon: '📅' },
      { href: '/hub/chat', title: 'CHAT', sub: 'Lobby, tables and staff', tone: 'cyan', icon: '💬' }
    ];

    var current = slides[activeSlide] || slides[0];

    return R.createElement('div', { className: 'hub-page', dir: 'ltr' },
      R.createElement(HubHeader, p),
      R.createElement('main', { className: 'hub-main' },
        R.createElement('section', { className: 'hub-slider' },
          R.createElement('div', {
            className: 'hub-slide is-on',
            style: { backgroundImage: 'url(' + current.img + ')' }
          },
            R.createElement('div', { className: 'hub-slide-body' },
              R.createElement('span', { className: 'hub-badge ' + current.badgeClass }, current.badge),
              R.createElement('h2', null, current.title),
              R.createElement('p', null, current.body),
              R.createElement('a', {
                href: '/hub/events/brackets',
                className: 'hub-slide-cta',
                onClick: function (e) {
                  if (p.onNavigate) { e.preventDefault(); p.onNavigate('brackets'); }
                }
              }, current.cta)
            )
          ),
          R.createElement('button', {
            className: 'hub-sarrow hub-sarrow-l hub-neon-box',
            type: 'button',
            onClick: function () {
              if (setActiveSlide) setActiveSlide((activeSlide + slides.length - 1) % slides.length);
            }
          }, '‹'),
          R.createElement('button', {
            className: 'hub-sarrow hub-sarrow-r hub-neon-box',
            type: 'button',
            onClick: function () {
              if (setActiveSlide) setActiveSlide((activeSlide + 1) % slides.length);
            }
          }, '›'),
          R.createElement('div', { className: 'hub-sdots' },
            slides.map(function (_, n) {
              return R.createElement('i', {
                key: n,
                className: n === activeSlide ? 'is-on' : '',
                onClick: function () { if (setActiveSlide) setActiveSlide(n); }
              });
            })
          )
        ),
        R.createElement('section', { className: 'hub-quick' },
          tiles.map(function (t) {
            return R.createElement('a', {
              key: t.href,
              href: t.href,
              className: 'hub-qcard hub-neon-box hub-neon-box--' + t.tone + ' is-' + t.tone,
              onClick: function (e) {
                if (p.onNavigate) {
                  e.preventDefault();
                  p.onNavigate(t.title.toLowerCase().replace(/ & /g, '-'));
                }
              }
            },
              R.createElement('span', { className: 'hub-qic' }, t.icon),
              R.createElement('b', null, t.title),
              R.createElement('small', null, t.sub)
            );
          })
        )
      ),
      R.createElement(HubFooter, p)
    );
  }

  function GenericHubSection(title) {
    return function (props) {
      return R.createElement('div', { className: 'hub-page', dir: 'ltr' },
        R.createElement(HubHeader, props),
        R.createElement('main', { className: 'hub-main' },
          R.createElement('div', { style: { padding: '60px 24px', textAlign: 'center', color: '#fff' } },
            R.createElement('h1', { style: { fontFamily: 'var(--hub-font-display)', color: 'var(--hub-cyan)' } }, title),
            R.createElement('p', { style: { color: 'var(--hub-muted)', marginTop: '12px' } }, 'Bazino Hub Experience')
          )
        ),
        R.createElement(HubFooter, props)
      );
    };
  }

  /* Portal SDK allowed regions registration */
  SDK.registerComponent('home', makeFactory(HubHome));
  SDK.registerComponent('header', makeFactory(HubHeader));
  SDK.registerComponent('hero', makeFactory(HubHome));
  SDK.registerComponent('hub.home', makeFactory(HubHome));
  SDK.registerComponent('hub.games', makeFactory(GenericHubSection('GAMES & STATIONS')));
  SDK.registerComponent('hub.events', makeFactory(GenericHubSection('EVENTS & TOURNAMENTS')));
  SDK.registerComponent('hub.weekly', makeFactory(GenericHubSection('WEEKLY BRACKETS')));
  SDK.registerComponent('hub.special', makeFactory(GenericHubSection('SPECIAL EVENTS')));
  SDK.registerComponent('hub.season', makeFactory(GenericHubSection('SEASON 4 CHAMPIONSHIP')));
  SDK.registerComponent('hub.brackets', makeFactory(GenericHubSection('32-PLAYER TOURNAMENT BRACKET')));
  SDK.registerComponent('hub.register', makeFactory(GenericHubSection('REGISTER AT DESK')));
  SDK.registerComponent('hub.shop', makeFactory(GenericHubSection('GAMING SHOP & GEAR')));
  SDK.registerComponent('hub.food', makeFactory(GenericHubSection('CAFE & FOOD & DRINKS')));
  SDK.registerComponent('hub.club', makeFactory(GenericHubSection('BAZINO GAMING CLUB')));
  SDK.registerComponent('hub.blog', makeFactory(GenericHubSection('COMMUNITY BLOG')));
  SDK.registerComponent('hub.chat', makeFactory(GenericHubSection('LIVE CHAT & TABLES')));
  SDK.registerComponent('hub.contact', makeFactory(GenericHubSection('CONTACT HOTEL VISTAMARE')));
  SDK.registerComponent('hub.rules', makeFactory(GenericHubSection('CLUB RULES')));
  SDK.registerComponent('hub.privacy', makeFactory(GenericHubSection('PRIVACY POLICY')));

  console.log('Bazino Hub Neon Theme registered successfully.');
})();
