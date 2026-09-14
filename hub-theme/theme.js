/* BAZINO HUB ARENA THEME v2.0.0 — SDK v2, ES5 only.
   Visuals per employer WhatsApp mockups (2026-09-04 set).
   Menus & page names per portal HUB_PAGES. */
(function () {
  var SDK = window.BazinoThemeSDK;
  if (!SDK || !SDK.registerComponent) { return; }
  var R = SDK.React;
  var h = R.createElement;
  var useState = R.useState;
  var useEffect = R.useEffect;

  /* ── helpers ── */
  function asset(p, n) { return (p && p.assetsBase ? p.assetsBase + '/' : '') + n; }
  function langOf(p) { return (p && p.language) || 'en'; }
  function ts(p, k, f) { return p && typeof p.ts === 'function' ? p.ts(k, f) : (f || k); }
  function go(p, path) { if (p && p.onNavigate) p.onNavigate(path); }
  function doLogin(p) { if (p && p.onLogin) p.onLogin(); else if (window.CustomEvent) window.dispatchEvent(new CustomEvent('bazino:open-auth')); }
  function doLogout(p) { if (p && p.onLogout) p.onLogout(); }
  function pick(v, lang) { if (!v) return ''; if (typeof v === 'string') return v; return v[lang] || v.en || v.fa || ''; }
  function wrap(Page) { return { apiVersion: 2, render: function (props) { return h(Page, props); } }; }
  function icoPng(p, name, size) {
    return h('img', { className: 'hb-ico', src: asset(p, 'icons/' + name + '.webp'), width: size || 44, height: size || 44, alt: '', draggable: 'false',
      onError: function (e) { if (e && e.target && e.target.src && e.target.src.indexOf('.webp') !== -1) e.target.src = asset(p, 'icons/' + name + '.png'); } });
  }

  function svg(d, size, sw) {
    return h('svg', { width: size || 18, height: size || 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: sw || 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }, h('path', { d: d }));
  }
  var ICO = {
    pad: 'M6 12h4M8 10v4M15 11h.01M18 13h.01M4 8h16v8H4z M4 8c-1.5 2-2 5-1 8 M20 8c1.5 2 2 5 1 8',
    trophy: 'M8 4h8v4a4 4 0 01-8 0V4zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 12v4M8 20h8M10 16h4v4h-4z',
    star: 'M12 3l2.4 6.6H21l-5.4 4.2 2 6.6L12 16.8 6.4 20.4l2-6.6L3 9.6h6.6z',
    crown: 'M3 18h18M5 18l2-10 5 5 5-5 2 10',
    users: 'M16 19v-1a3 3 0 00-3-3H7a3 3 0 00-3 3v1M12 11a3 3 0 100-6 3 3 0 000 6M20 19v-1a3 3 0 00-2-2.8M16 5.1a3 3 0 010 5.8',
    cal: 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zM8 12h2M14 12h2M8 16h2M14 16h2',
    chat: 'M4 5h16v10H8l-4 4V5z',
    pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3',
    clock: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z',
    globe: 'M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18M21 12A9 9 0 113 12a9 9 0 0118 0z',
    bell: 'M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 004 0',
    user: 'M12 11a3 3 0 100-6 3 3 0 000 6zM5 20a7 7 0 0114 0',
    tag: 'M3 12l9-9h9v9l-9 9-9-9zM16 7h.01',
    cart: 'M3 4h2l2.6 12H19M8 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2zM6 8h15l-2 6H8',
    food: 'M4 10h16M6 10a6 6 0 0112 0M5 14h14l-1 6H6l-1-6zM17 4l2 4',
    info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 10v6M12 7h.01',
    img: 'M4 5h16v14H4zM4 15l4-4 4 4 4-5 4 5M9 9h.01',
    monitor: 'M3 5h18v11H3zM9 20h6M12 16v4',
    gift: 'M4 10h16v10H4zM4 6h16v4H4zM12 6v14M12 6s-2-4-4-3 0 3 4 3M12 6s2-4 4-3 0 3-4 3',
    medal: 'M12 15a5 5 0 100-10 5 5 0 000 10zM8 3l2 4M16 3l-2 4M12 15v6M9 18h6',
    chart: 'M4 20h16M7 20v-6M12 20V8M17 20v-9',
    brk: 'M4 5h5v5H4zM15 14h5v5h-5zM9 7.5h3v9h3',
    eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zM12 14a2 2 0 100-4 2 2 0 000 4z',
    lock: 'M6 11h12v9H6zM9 11V8a3 3 0 016 0v3',
    wifi: 'M5 12a10 10 0 0114 0M8.5 15.5a5 5 0 017 0M12 19h.01',
    play: 'M6 4l14 8-14 8V4z',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    burger: 'M4 9h16a8 5 0 00-16 0zM4 12h16M5 15h14l-1 5H6l-1-5z',
    cup: 'M8 3h8l-1 18H9L8 3zM16 6l3 1-1 6-3 1',
    pizza: 'M12 3l9 18H3l9-18zM12 9h.01M10 13h.01M14 14h.01',
    edit: 'M4 20l4-1L20 7l-3-3L5 16l-1 4z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    heart: 'M12 21s-8-5.3-8-11a4.6 4.6 0 018-3 4.6 4.6 0 018 3c0 5.7-8 11-8 11z',
    coins: 'M12 8c4.4 0 8-1.1 8-2.5S16.4 3 12 3 4 4.1 4 5.5 7.6 8 12 8zM4 5.5V12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5.5M4 12v6.5C4 19.9 7.6 21 12 21s8-1.1 8-2.5V12',
    logout: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9'
  };

  function Flag(props) {
    var l = props.lang;
    if (l === 'tr') return h('svg', { className: 'hb-flag', viewBox: '0 0 22 15' }, h('rect', { width: 22, height: 15, fill: '#e30a17' }), h('circle', { cx: 9, cy: 7.5, r: 3.4, fill: '#fff' }), h('circle', { cx: 10, cy: 7.5, r: 2.8, fill: '#e30a17' }), h('path', { d: 'M13 7.5l1.8.6-.7-1.7 1.5-1.1-1.9-.1.6-1.8-1.3 1.1-1.3-1.1.6 1.8-1.9.1 1.5 1.1-.7 1.7z', fill: '#fff' }));
    if (l === 'fa') return h('svg', { className: 'hb-flag', viewBox: '0 0 22 15' }, h('rect', { width: 22, height: 5, fill: '#239f40' }), h('rect', { y: 5, width: 22, height: 5, fill: '#fff' }), h('rect', { y: 10, width: 22, height: 5, fill: '#da0000' }), h('circle', { cx: 11, cy: 7.5, r: 2, fill: 'none', stroke: '#da0000', strokeWidth: 1 }));
    if (l === 'ru') return h('svg', { className: 'hb-flag', viewBox: '0 0 22 15' }, h('rect', { width: 22, height: 5, fill: '#fff' }), h('rect', { y: 5, width: 22, height: 5, fill: '#0039a6' }), h('rect', { y: 10, width: 22, height: 5, fill: '#d52b1e' }));
    return h('svg', { className: 'hb-flag', viewBox: '0 0 22 15' }, h('rect', { width: 22, height: 15, fill: '#012169' }), h('path', { d: 'M0 0l22 15M22 0L0 15', stroke: '#fff', strokeWidth: 2.4 }), h('path', { d: 'M11 0v15M0 7.5h22', stroke: '#fff', strokeWidth: 4 }), h('path', { d: 'M11 0v15M0 7.5h22', stroke: '#C8102E', strokeWidth: 2.2 }));
  }

  /* ── shared chrome bits ── */
  var NAV = [
    { id: 'home', href: '/', key: 'nav.home' },
    { id: 'games', href: '/games', key: 'nav.games' },
    { id: 'events', href: '/events', key: 'nav.events' },
    { id: 'shop', href: '/shop', key: 'nav.shop' },
    { id: 'food', href: '/food', key: 'nav.food' },
    { id: 'club', href: '/club', key: 'nav.club' },
    { id: 'blog', href: '/blog', key: 'nav.blog' },
    { id: 'contact', href: '/contact', key: 'nav.contact' }
  ];
  function navOn(p, id) {
    var pg = p.hubPage || '';
    if (id === 'home') return pg === 'home' || pg === '';
    if (id === 'events') return pg === 'events' || pg === 'weekly' || pg === 'special' || pg === 'season' || pg === 'brackets' || pg === 'register';
    return pg === id;
  }
  function Logo(p) {
    return h('a', { href: '/', className: 'hb-logo', onClick: function (e) { e.preventDefault(); go(p, '/'); } },
      h('svg', { viewBox: '0 0 48 30', width: 44, height: 27, 'aria-hidden': 'true' },
        h('defs', null, h('linearGradient', { id: 'hbLG', x1: '0', y1: '0', x2: '1', y2: '1' }, h('stop', { offset: '0', stopColor: '#22d3ff' }), h('stop', { offset: '1', stopColor: '#ff2ea6' }))),
        h('g', { fill: 'none', stroke: 'url(#hbLG)', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' },
          h('path', { d: 'M14 23h20c4 0 7-3 7-7 0-5-3-8-8-8-3 0-5 1.4-9 1.4S18 8 15 8c-5 0-8 3-8 8 0 4 3 7 7 7z' }),
          h('path', { d: 'M17 13v5M14.5 15.5h5' }), h('path', { d: 'M30 14h.01M33 17h.01' }))
      ),
      icoPng(p, 'pad', 28),
      h('b', null, 'BAZINO'),
      h('small', null, 'GAMING CLUB')
    );
  }

  function LangChip(p) {
    var st = useState(false); var open = st[0], setOpen = st[1];
    var lang = langOf(p);
    var langs = [{ id: 'tr', t: 'Türkçe' }, { id: 'en', t: 'English' }, { id: 'fa', t: 'فارسی' }, { id: 'ru', t: 'Русский' }];
    var items = [];
    for (var i = 0; i < langs.length; i++) {
      (function (l) {
        items.push(h('button', { key: l.id, type: 'button', className: l.id === lang ? 'is-on' : '', onClick: function (e) { e.stopPropagation(); setOpen(false); if (p.onLanguage) p.onLanguage(l.id); } }, h(Flag, { lang: l.id }), l.t));
      })(langs[i]);
    }
    return h('button', { type: 'button', className: 'hb-chip' + (open ? ' is-open' : ''), onClick: function () { setOpen(!open); } },
      svg(ICO.globe, 15), h('span', null, lang.toUpperCase()),
      h('svg', { width: 10, height: 10, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 3 }, h('path', { d: 'M6 9l6 6 6-6' })),
      h('div', { className: 'hb-langmenu', onClick: function (e) { e.stopPropagation(); } }, items)
    );
  }

  function HubHeader(p) {
    var st = useState(false); var mob = st[0], setMob = st[1];
    var regSt = useState(false); var regOpen = regSt[0], setRegOpen = regSt[1];
    var u = p.user;
    var items = [];
    for (var i = 0; i < NAV.length; i++) {
      (function (n) {
        items.push(h('a', { key: n.id, href: n.href, className: navOn(p, n.id) ? 'is-on' : '', onClick: function (e) { e.preventDefault(); setMob(false); go(p, n.href); } }, ts(p, n.key)));
      })(NAV[i]);
    }
    return h('div', null,
      h('header', { className: 'hb-header' },
        h('div', { className: 'hb-wrap hb-in' },
          h(Logo, p),
          h('nav', { className: 'hb-nav' }, items),
          h('div', { className: 'hb-hright' },
            h(LangChip, p),
            u ? h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 10 } },
              h('button', { type: 'button', className: 'hb-bell', 'aria-label': 'notifications' }, svg(ICO.bell, 20), h('i', null)),
              h('a', { href: '/club', className: 'hb-user', onClick: function (e) { e.preventDefault(); go(p, '/club'); } },
                h('span', { className: 'hb-av' }, ((u.displayName || u.username || '?').charAt(0) || '?').toUpperCase()),
                h('span', null, h('b', null, u.displayName || u.username), h('small', null, '#' + (u.username || 'BZN'))),
                h('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: '#33cfff', strokeWidth: 3 }, h('path', { d: 'M6 9l6 6 6-6' }))
              ),
              h('button', { type: 'button', className: 'hb-btn hb-btn--out', onClick: function () { doLogout(p); } }, svg(ICO.logout, 15), ts(p, 'hdr.logout'))
            ) : h('span', { style: { display: 'inline-flex', gap: 10 } },
              h('button', { type: 'button', className: 'hb-btn hb-btn--reg', onClick: function () { setRegOpen(true); } }, svg(ICO.user, 15), h('span', null, ts(p, 'hdr.register'))),
              h('button', { type: 'button', className: 'hb-btn hb-btn--login', onClick: function () { doLogin(p); } }, svg(ICO.user, 15), h('span', null, ts(p, 'hdr.login')))
            ),
            h('button', { type: 'button', className: 'hb-burger', 'aria-label': 'menu', onClick: function () { setMob(!mob); } }, mob ? '✕' : '☰')
          )
        )
      ),
      h('nav', { className: 'hb-mnav' + (mob ? ' is-on' : '') }, items),
      regOpen ? h(RegisterModal, { p: p, onClose: function () { setRegOpen(false); } }) : null
    );
  }

  function HoursModal(p) {
    var s = (p.p && p.p.settings) || {};
    var hours = s.club_hours || s.opening_hours || '11:00 – 23:50';
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var rows = [];
    for (var i = 0; i < days.length; i++) rows.push(h('div', { key: days[i] }, h('span', null, days[i]), h('b', null, hours)));
    return h('div', { className: 'hb-modalbg', onClick: p.onClose },
      h('div', { className: 'hb-modal', onClick: function (e) { e.stopPropagation(); } },
        h('button', { type: 'button', className: 'hb-x', onClick: p.onClose }, '✕'),
        h('div', { className: 'hb-hours-head' },
          h('span', { style: { color: '#ff2e6f' } }, svg(ICO.clock, 54, 1.6)),
          h('div', null, h('h2', null, ts(p.p, 'hours.title')), h('p', null, ts(p.p, 'hours.sub')))
        ),
        h('div', { className: 'hb-hours-list' }, rows),
        h('div', { className: 'hb-hours-see' }, h('span', { style: { color: '#4dd7ff' } }, svg(ICO.pad, 26)), ts(p.p, 'hours.see'))
      )
    );
  }

  function ContactStrip(p) {
    var st = useState(false); var open = st[0], setOpen = st[1];
    var s = p.settings || {};
    var addr = s.club_address || 'İskele, Long Beach, Hotel VistaMare';
    var phone = s.club_phone || '+90 539 112 37 47';
    var hours = s.club_hours || '11:00 – 23:50';
    var map = s.club_map_url || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr));
    var ig = s.club_instagram || 'https://instagram.com/bazinopro';
    var wa = 'https://wa.me/' + String(phone).replace(/\D/g, '');
    return h('div', { className: 'hb-wrap' },
      h('div', { className: 'hb-strip' },
        h('a', { href: map, target: '_blank', rel: 'noreferrer' },
          h('span', { className: 'hb-fic hb-fic--pink' }, icoPng(p, 'pin', 28)),
          h('span', null, h('b', null, addr.split(',').slice(0, 2).join(',') || addr), h('small', null, addr.split(',').slice(2).join(',') || ' '))
        ),
        h('button', { type: 'button', onClick: function () { setOpen(true); } },
          h('span', { className: 'hb-fic hb-fic--red' }, icoPng(p, 'clock', 28)),
          h('span', null, h('b', null, ts(p, 'foot.hours')), h('small', null, hours))
        ),
        h('a', { href: wa, target: '_blank', rel: 'noreferrer' },
          h('span', { className: 'hb-fic hb-fic--green' }, icoPng(p, 'whatsapp', 28)),
          h('span', null, h('b', null, ts(p, 'foot.whatsapp')), h('small', null, phone))
        ),
        h('a', { href: ig, target: '_blank', rel: 'noreferrer' },
          h('span', { className: 'hb-fic hb-fic--ig' }, icoPng(p, 'instagram', 28)),
          h('span', null, h('b', null, ts(p, 'foot.instagram')), h('small', null, '@bazinopro'))
        )
      ),
      open ? h(HoursModal, { p: p, onClose: function () { setOpen(false); } }) : null
    );
  }

  function HubFooter(p) {
    return h('footer', { className: 'hb-footer' },
      h(ContactStrip, p),
      h('div', { className: 'hb-wrap hb-foot-slogan' }, h('span', null, ts(p, 'foot.slogan'), ' ', h('b', null, 'A Community'))),
      h('div', { className: 'hb-legal' },
        h('a', { href: '/rules', onClick: function (e) { e.preventDefault(); go(p, '/rules'); } }, 'RULES'),
        h('span', null, '·'),
        h('a', { href: '/privacy', onClick: function (e) { e.preventDefault(); go(p, '/privacy'); } }, 'PRIVACY'),
        h('span', null, '·'),
        h('small', null, '© ' + new Date().getFullYear() + ' BAZINO GAMING CLUB — ' + ts(p, 'foot.tagline'))
      )
    );
  }

  function RegisterModal(x) {
    var p = x.p;
    var fields = [
      ['First Name', ICO.user], ['Last Name', ICO.user], ['Choose a Username', ICO.user],
      ['Date of Birth', ICO.cal], ['Phone Number', ICO.chat], ['Create a Password', ICO.lock], ['Confirm Your Password', ICO.lock]
    ];
    var nodes = [];
    for (var i = 0; i < fields.length; i++) {
      (function (f, idx) {
        nodes.push(h('div', { key: f[0], className: 'hb-field' }, svg(f[1], 16), h('input', { type: idx >= 5 ? 'password' : 'text', placeholder: f[0] })));
      })(fields[i], i);
    }
    return h('div', { className: 'hb-modalbg', onClick: x.onClose },
      h('div', { className: 'hb-modal hb-modal--wide', onClick: function (e) { e.stopPropagation(); } },
        h('button', { type: 'button', className: 'hb-x', onClick: x.onClose }, '✕'),
        h('div', { className: 'hb-reg-grid' },
          h('div', { className: 'hb-reg-left' },
            h('span', { style: { color: '#ff2ea6' } }, svg(ICO.pad, 64, 1.6)),
            h('div', { className: 'hb-logo', style: { marginTop: 4 } }, h('b', null, 'BAZINO'), h('small', null, 'GAMING CLUB')),
            h('div', { style: { letterSpacing: 3, color: '#dfe6ff', fontWeight: 700, fontSize: 12 } }, 'PLAY • COMPETE • BELONG'),
            h('div', { className: 'hb-script2' }, 'Good Games', h('br', null), 'Better', h('br', null), 'People'),
            h('span', { style: { color: '#a05cf7' } }, svg(ICO.pad, 90, 1.4)),
            h('div', { className: 'hb-join' }, 'JOIN OUR COMMUNITY')
          ),
          h('form', { className: 'hb-form', onSubmit: function (e) { e.preventDefault(); x.onClose(); doLogin(p); } },
            h('h2', null, 'CREATE YOUR ACCOUNT'),
            h('p', { className: 'hb-fsub' }, 'Join Bazino Gaming Club and be part of our community!'),
            h('div', { className: 'hb-frow' }, nodes[0], nodes[1]),
            nodes[2],
            h('div', { className: 'hb-frow' }, nodes[3],
              h('div', { className: 'hb-field' }, svg(ICO.chat, 16), h('input', { type: 'tel', placeholder: '+90 · Phone Number' }))),
            nodes[4], nodes[4] ? null : null,
            nodes[5], nodes[6],
            h('div', { className: 'hb-gender' }, h('span', null, 'Gender'),
              h('label', null, h('input', { type: 'radio', name: 'g', defaultChecked: true }), 'Male'),
              h('label', null, h('input', { type: 'radio', name: 'g' }), 'Female'),
              h('label', null, h('input', { type: 'radio', name: 'g' }), 'Other')),
            h('label', { className: 'hb-accept' }, h('input', { type: 'checkbox' }), h('span', null, 'I accept the ', h('a', { href: '/rules', onClick: function (e) { e.preventDefault(); x.onClose(); go(p, '/rules'); } }, 'Bazino Rules'), ' and ', h('a', { href: '/privacy', onClick: function (e) { e.preventDefault(); x.onClose(); go(p, '/privacy'); } }, 'Privacy Policy'))),
            h('button', { type: 'submit', className: 'hb-cta' }, 'CREATE ACCOUNT'),
            h('p', { style: { textAlign: 'center', color: '#97a1c2', fontWeight: 600, margin: '4px 0 0' } }, 'Already have an account? ', h('a', { href: '#', style: { color: '#ff2ea6' }, onClick: function (e) { e.preventDefault(); x.onClose(); doLogin(p); } }, 'Login here'))
          )
        )
      )
    );
  }

  /* ── page hero band ── */
  function PHero(x) {
    return h('section', { className: 'hb-phero' },
      x.img ? h('div', { className: 'hb-bg', style: { backgroundImage: 'url(' + x.img + ')' } }) : null,
      x.scriptL ? h('span', { className: 'hb-script hb-script--l' }, x.scriptL) : null,
      x.scriptR ? h('span', { className: 'hb-script hb-script--r' }, x.scriptR) : null,
      h('div', { className: 'hb-wrap', style: { position: 'relative' } },
        x.back ? h('button', { type: 'button', className: 'hb-back', onClick: x.back }, '←', x.backLabel || 'BACK') : null,
        h('div', { className: 'hb-in' },
          h('h1', { className: 'hb-ptitle' }, x.icon || null, x.title, x.em ? h('em', null, x.em) : null),
          h('p', { className: 'hb-psub' }, x.sub || ''),
          x.tags ? h('p', { className: 'hb-ptags' }, x.tags) : null
        )
      )
    );
  }

  /* ══ HOME ══ */
  function HomePage(p) {
    var st = useState(0); var i = st[0], setI = st[1];
    var n = 3;
    useEffect(function () {
      var id = window.setTimeout(function tick() { setI(function (x) { return (x + 1) % n; }); id = window.setTimeout(tick, 7000); }, 7000);
      return function () { window.clearTimeout(id); };
    }, [n]);
    var center = [
      { img: asset(p, 'hero-gta6.jpg'), badge: 'COMING SOON', title: 'grand theft auto VI', sub: 'THE NEXT GENERATION OF CRIME' },
      { img: asset(p, 'slide-fc26.jpg'), badge: 'NOW', title: 'FC 26 TOURNAMENT', sub: 'SATURDAY NIGHT BRACKET • 32 PLAYERS' },
      { img: asset(p, 'slide-match.jpg'), badge: 'LIVE MATCH', title: 'EL CLASICO ON THE WALL', sub: 'TONIGHT 21:00 • LOUNGE' }
    ];
    var c = center[i % center.length];
    var dots = [];
    for (var d = 0; d < center.length; d++) {
      (function (k) { dots.push(h('button', { key: k, type: 'button', 'aria-label': 'slide ' + (k + 1), className: k === i % center.length ? 'is-on' : '', onClick: function () { setI(k); } })); })(d);
    }
    var tiles = [
      { c: '#33cfff', ic: 'pad', k: 'nav.games', sub: 'Kids & adults stations', href: '/games' },
      { c: '#ff2e6f', ic: 'trophy', k: 'nav.events', sub: 'Weekly cups & brackets', href: '/events' },
      { c: '#a05cf7', ic: 'cart', k: 'nav.shop', sub: 'Gaming gear & more', href: '/shop' },
      { c: '#ff9a1f', ic: 'food', k: 'nav.food', sub: 'Snacks, drinks & food', href: '/food' },
      { c: '#2ee87e', ic: 'pad', k: 'nav.club', sub: 'Credits & member card', href: '/club' },
      { c: '#ff2ea6', ic: 'info', k: 'nav.blog', sub: 'Club news & stories', href: '/blog' },
      { c: '#7a5cff', ic: 'info', k: 'nav.contact', sub: 'About, map & contact', href: '/contact' }
    ];
    var tnodes = [];
    for (var t = 0; t < tiles.length; t++) {
      (function (tl) {
        tnodes.push(h('a', { key: tl.k, href: tl.href, className: 'hb-tile', style: { '--c': tl.c }, onClick: function (e) { e.preventDefault(); go(p, tl.href); } },
          icoPng(p, tl.ic, 52), h('b', null, ts(p, tl.k)), h('small', null, tl.sub), h('span', { className: 'hb-tile-arr' }, '→')));
      })(tiles[t]);
    }
    return h('div', null,
      h('section', { className: 'hb-hero' },
        h('div', { className: 'hb-wrap' },
          h('div', { className: 'hb-hero-grid' },
            h('div', { className: 'hb-panel hb-panel--l', style: { backgroundImage: 'url(' + asset(p, 'slide-fc26.jpg') + ')' } },
              h('div', { className: 'hb-panel-body' },
                h('h2', { className: 'hb-hero-title' }, 'FC26'),
                h('div', { className: 'hb-hero-sub' }, 'TOURNAMENT'),
                h('div', { className: 'hb-hero-meta' }, 'SATURDAY • 16:00')
              )),
            h('div', { className: 'hb-panel hb-panel--c', style: { backgroundImage: 'url(' + c.img + ')' } },
              h('div', { className: 'hb-panel-body' },
                h('span', { className: 'hb-badge' }, c.badge),
                h('h2', { className: 'hb-hero-title', style: { fontSize: 46 } }, c.title),
                h('div', { className: 'hb-hero-meta' }, c.sub),
                h('button', { type: 'button', className: 'hb-hero-cta', onClick: function () { go(p, '/events'); } }, 'MORE INFO', '→')
              )),
            h('div', { className: 'hb-panel hb-panel--r', style: { backgroundImage: 'url(' + asset(p, 'slide-match.jpg') + ')' } },
              h('span', { className: 'hb-live-badge' }, 'LIVE MATCH'),
              h('div', { className: 'hb-vs' },
                h('span', { className: 'hb-crest hb-crest--rm' }, 'RM'),
                h('b', null, 'VS'),
                h('span', { className: 'hb-crest hb-crest--fcb' }, 'FCB')
              ),
              h('div', { style: { display: 'flex', justifyContent: 'space-around', position: 'relative', zIndex: 2, color: '#eef2ff', fontWeight: 700, fontSize: 11, letterSpacing: 1, padding: '8px 8px 0' } }, h('span', null, 'REAL MADRID'), h('span', null, 'BARCELONA')),
              h('div', { className: 'hb-live-t' }, 'TONIGHT 21:00')
            ),
            h('button', { type: 'button', className: 'hb-arr hb-arr--l', 'aria-label': 'prev', onClick: function () { setI((i - 1 + center.length) % center.length); } }, '‹'),
            h('button', { type: 'button', className: 'hb-arr hb-arr--r', 'aria-label': 'next', onClick: function () { setI((i + 1) % center.length); } }, '›')
          ),
          h('div', { className: 'hb-dots' }, dots)
        )
      ),
      h('section', { className: 'hb-wrap hb-tiles' }, tnodes)
    );
  }

  /* ══ GAMES ══ */
  var KIDS = [
    { t: "Astro's Playroom", tags: ['Platformer', 'Adventure', 'Kids'], pegi: 3, pl: '1–2 Players', on: 'Offline (Local Play)', d: 'Join Astro on a fun and exciting adventure through amazing worlds. A perfect game for young players!', cov: 'covers/astro.jpg' },
    { t: 'Minecraft', tags: ['Adventure', 'Creative', 'Sandbox'], pegi: 7, pl: '1–4 Players', on: 'Online & Offline', d: 'Build, explore and create your own world! A fun and imaginative game for kids.', cov: 'covers/minecraft.jpg' },
    { t: 'LEGO Fortnite', tags: ['Action', 'Adventure', 'Survival'], pegi: 7, pl: '1–4 Players', on: 'Online (Multiplayer)', d: 'Explore huge worlds, build, and play with friends in a safe and fun Lego version of Fortnite.', cov: 'covers/lego-fortnite.jpg' },
    { t: 'Sackboy: A Big Adventure', tags: ['Platformer', 'Adventure', 'Co-op'], pegi: 7, pl: '1–4 Players', on: 'Offline (Local Play)', d: 'A fun and creative platformer full of imagination and exciting levels. Play alone or with friends!', cov: 'covers/sackboy.jpg' },
    { t: 'LEGO Harry Potter Collection', tags: ['Adventure', 'Action', 'Puzzle'], pegi: 7, pl: '1–2 Players', on: 'Offline (Local Play)', d: 'Experience the magic of Hogwarts in a fun Lego world. Perfect for young wizards and fans!', cov: 'covers/lego-hp.jpg' },
    { t: 'Rocket League', tags: ['Sports', 'Racing', 'Multiplayer'], pegi: 3, pl: '1–4 Players', on: 'Online & Offline', d: 'Play fun and fast car football. Easy to learn and very exciting for all ages!', cov: 'covers/rocket-league.jpg' },
    { t: 'Fall Guys', tags: ['Party', 'Action', 'Multiplayer'], pegi: 3, pl: '1–4 Players', on: 'Online (Multiplayer)', d: 'Join the fun in this colorful and crazy obstacle course game. Perfect for playing with friends!', cov: 'covers/fall-guys.jpg' }
  ];
  var ADULTS = [
    { t: 'EA SPORTS FC 26', tags: ['Sports', 'Football', 'Multiplayer', 'Competitive'], pegi: 3, pl: '1–4 Players', on: 'Online & Offline', d: "The world's game. Real teams, real players, real competition. Play with friends or challenge others at Bazino.", cov: 'covers/fc26.png' },
    { t: 'NBA 2K24', tags: ['Sports', 'Basketball', 'Multiplayer', 'Competitive'], pegi: 3, pl: '1–4 Players', on: 'Online & Offline', d: 'Step on the court with the most realistic basketball experience. Play solo or with friends at Bazino.', art: 'NBA 2K24' },
    { t: 'Call of Duty: Modern Warfare III', tags: ['Action', 'Shooter', 'Multiplayer', 'War'], pegi: 18, pl: '1–4 Players', on: 'Online (Multiplayer)', d: 'Intense action, realistic combat and thrilling multiplayer battles. Team up and experience the next generation warfare.', art: 'MW III' },
    { t: 'Grand Theft Auto V', tags: ['Action', 'Open World', 'Adventure', 'Multiplayer'], pegi: 18, pl: '1–4 Players', on: 'Online & Offline', d: 'Explore a massive open world, complete missions and enjoy unlimited freedom. Play alone or with friends at Bazino.', art: 'GTA V' },
    { t: 'Tekken 8', tags: ['Fighting', 'Arcade', 'Multiplayer', 'Competitive'], pegi: 16, pl: '1–2 Players', on: 'Offline (Local Play)', d: 'The next generation of fighting games. Stunning graphics and epic battles. Challenge your friends at Bazino.', cov: 'covers/tekken8.png' },
    { t: 'UFC 5', tags: ['Sports', 'Fighting', 'Multiplayer', 'Competitive'], pegi: 16, pl: '1–2 Players', on: 'Online & Offline', d: 'Step into the octagon with the most realistic MMA experience. Fight your way to the top!', cov: 'covers/ufc5.png' },
    { t: 'Assetto Corsa Competizione', tags: ['Racing', 'Simulation', 'Multiplayer', 'Competitive'], pegi: 3, pl: '1–4 Players', on: 'Online & Offline', d: 'The most realistic racing simulation. Feel the true driving experience and compete at Bazino.', cov: 'covers/assetto.jpg' }
  ];

  function GameRow(g, color, p) {
    return h('div', { className: 'hb-grow', style: { '--c': color } },
      g.cov ? h('div', { className: 'hb-grow-art', style: { backgroundImage: 'url(' + asset(p, g.cov) + ')' } })
        : h('div', { className: 'hb-grow-art hb-grow-art--typo' }, h('b', null, g.art || g.t)),
      h('div', { className: 'hb-grow-mid' },
        h('h3', null, g.t),
        h('div', { className: 'hb-chips' }, g.tags.map(function (t) { return h('span', { key: t, className: 'hb-chip2' }, t); })),
        h('p', null, g.d)
      ),
      h('div', { className: 'hb-grow-side' },
        h('div', { className: 'hb-line' }, h('span', { className: 'hb-pegi hb-pegi--' + g.pegi }, String(g.pegi)), h('span', null, 'PEGI ' + g.pegi)),
        h('div', { className: 'hb-line' }, h('span', { style: { color: '#8ea2d8' } }, svg(ICO.users, 16)), g.pl),
        h('div', { className: 'hb-line' }, h('span', { style: { color: '#8ea2d8' } }, svg(ICO.pad, 16)), 'PS5'),
        h('div', { className: 'hb-line' }, h('span', { style: { color: '#8ea2d8' } }, svg(ICO.wifi, 16)), g.on)
      )
    );
  }

  function GamesPage(p) {
    var st = useState('cats'); var view = st[0], setView = st[1];
    var systems = p.systems || [];
    var priceCards = [
      { c: '#33cfff', t: '85" TV', sub: '+ 2 CONTROLLERS', price: '250 TL', art: asset(p, 'hero-setup.jpg') },
      { c: '#ff2ea6', t: '65" TV', sub: '+ 2 CONTROLLERS', price: '200 TL', art: asset(p, 'slide-match.jpg') },
      { c: '#2ee87e', t: 'EXTRA CONTROLLER', sub: 'PER ADDITIONAL CONTROLLER', price: '25 TL', art: asset(p, 'games-gear.jpg') }
    ];
    var pc = [];
    for (var i = 0; i < priceCards.length; i++) {
      (function (pcd) {
        pc.push(h('div', { key: pcd.t, className: 'hb-price', style: { '--c': pcd.c } },
          h('div', { className: 'hb-price-art', style: { backgroundImage: 'url(' + pcd.art + ')' } }),
          h('div', { className: 'hb-price-body' },
            h('h3', null, pcd.t), h('small', null, pcd.sub),
            h('div', { className: 'hb-price-tag' }, h('b', null, pcd.price), h('span', null, '/ HOUR'))
          )));
      })(priceCards[i]);
    }
    var body;
    if (view === 'kids') {
      body = h('div', null,
        h(PHero, { img: asset(p, 'games-kids.jpg'), icon: h('span', { style: { color: '#33cfff' } }, svg(ICO.users, 44, 1.5)), title: 'KIDS', em: 'GAMES', sub: 'FUN & SAFE GAMES FOR YOUNGER PLAYERS', back: function () { setView('cats'); }, backLabel: 'BACK TO GAMES', scriptR: 'Good Games\nGood People' }),
        h('div', { className: 'hb-wrap hb-rows' }, KIDS.map(function (g) { return GameRow(g, '#a05cf7', p); }))
      );
    } else if (view === 'adults') {
      body = h('div', null,
        h(PHero, { img: asset(p, 'games-adults.jpg'), icon: h('span', { style: { color: '#ff2e6f' } }, svg(ICO.pad, 44, 1.5)), title: 'ADULTS', em: 'GAMES', sub: 'ACTION • SPORTS • RACING • AND MORE', back: function () { setView('cats'); }, backLabel: 'BACK TO GAMES', scriptR: 'Good Games\nGood People' }),
        h('div', { className: 'hb-wrap hb-rows' }, ADULTS.map(function (g) { return GameRow(g, '#ff2e6f', p); }))
      );
    } else if (view === 'requests') {
      body = h('div', null,
        h(PHero, { img: asset(p, 'games-requests.jpg'), icon: h('span', { style: { color: '#ff9a1f' } }, svg(ICO.chat, 44, 1.5)), title: 'GAME', em: 'REQUESTS', sub: 'SUGGEST NEW GAMES AND JOIN THE COMMUNITY', back: function () { setView('cats'); }, backLabel: 'BACK TO GAMES' }),
        h('div', { className: 'hb-wrap' },
          h('form', { className: 'hb-box', style: { '--c': '#ff9a1f', padding: 24, marginBottom: 26 }, onSubmit: function (e) { e.preventDefault(); } },
            h('div', { className: 'hb-frow' },
              h('div', { className: 'hb-field hb-field--plain' }, h('input', { placeholder: 'Game title' })),
              h('div', { className: 'hb-field hb-field--plain' }, h('input', { placeholder: 'Platform (PS5 / PC …)' }))
            ),
            h('div', { className: 'hb-field hb-field--plain' }, h('input', { placeholder: 'Why should Bazino add it?' })),
            h('button', { type: 'submit', className: 'hb-cta', style: { marginTop: 12 } }, 'SEND REQUEST')
          ))
      );
    } else {
      body = h('div', { className: 'hb-cats-panel' },
        h('div', { className: 'hb-cats-title' }, h('span', { style: { color: '#ff2ea6' } }, svg(ICO.pad, 34, 1.6)), 'GAMES'),
        h('div', { className: 'hb-cats-sub' }, 'CHOOSE A CATEGORY'),
        h('div', { className: 'hb-cats' },
          h('button', { type: 'button', className: 'hb-cat', style: { '--c': '#33cfff' }, onClick: function () { setView('kids'); } },
            h('div', { className: 'hb-cat-art', style: { backgroundImage: 'url(' + asset(p, 'games-kids.jpg') + ')' } }, h('span', { className: 'hb-cat-pad' }, svg(ICO.pad, 34, 1.6))),
            h('div', { className: 'hb-cat-body' }, h('span', null, h('b', null, 'KIDS'), h('small', null, 'Fun & safe games for younger players')), h('span', { className: 'hb-cat-go' }, '→'))),
          h('button', { type: 'button', className: 'hb-cat', style: { '--c': '#ff2ea6' }, onClick: function () { setView('adults'); } },
            h('div', { className: 'hb-cat-art', style: { backgroundImage: 'url(' + asset(p, 'games-adults.jpg') + ')' } }, h('span', { className: 'hb-cat-pad' }, svg(ICO.pad, 34, 1.6))),
            h('div', { className: 'hb-cat-body' }, h('span', null, h('b', null, 'ADULTS'), h('small', null, 'Action, sports, racing and more')), h('span', { className: 'hb-cat-go' }, '→'))),
          h('button', { type: 'button', className: 'hb-cat', style: { '--c': '#ff9a1f' }, onClick: function () { setView('requests'); } },
            h('div', { className: 'hb-cat-art', style: { background: 'radial-gradient(120% 120% at 30% 20%, #241505 0%, #0a0f1e 70%)' } }, h('span', { className: 'hb-cat-pad' }, svg(ICO.chat, 34, 1.6))),
            h('div', { className: 'hb-cat-body' }, h('span', null, h('b', null, 'GAME REQUESTS'), h('small', null, 'Suggest new games and join the community')), h('span', { className: 'hb-cat-go' }, '→')))
        )
      );
    }
    return h('div', null, body,
      h('div', { className: 'hb-wrap' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 14, margin: '6px 0 14px' } },
          h('span', { style: { color: '#ffc93c' } }, svg(ICO.monitor, 26, 1.6)),
          h('b', { style: { fontFamily: 'var(--hb-font-d)', letterSpacing: 2, fontSize: 17 } }, 'SYSTEMS & GEAR'),
          h('small', { style: { color: '#97a1c2', fontWeight: 600 } }, '— reserve your station at the desk')
        )
      ),
      h('div', { className: 'hb-wrap hb-prices' }, pc)
    );
  }

  /* ══ EVENTS ══ */
  function EventsPage(p) {
    var portals = [
      { c: '#ff2ea6', ic: ICO.cal, t: 'WEEKLY TOURNAMENTS', s: 'Regular weekly competition', art: asset(p, 'covers/fc26.png'), href: '/events/weekly', btn: 'VIEW TOURNAMENTS',
        li: ['32 Players', 'Knockout Format', 'Every Saturday', 'Different Games', 'Earn Rewards'],
        d: 'Join our weekly tournaments, show your skills and compete for rewards!' },
      { c: '#33cfff', ic: ICO.trophy, t: 'SPECIAL EVENTS', s: 'Big competitions & unique cups', art: asset(p, 'covers/ufc5.png'), href: '/events/special', btn: 'VIEW EVENTS',
        li: ['Unique Tournaments', 'Bigger Prizes', 'Different Games', 'Special Rules & Formats', 'Exclusive Cups'],
        d: 'Take part in our special events and experience the biggest tournaments at Bazino!' },
      { c: '#2ee87e', ic: ICO.chart, t: 'SEASON RANKING', s: 'Spring • Summer • Autumn • Winter', art: asset(p, 'covers/mk1.png'), href: '/events/season', btn: 'VIEW RANKINGS',
        li: ['Live Season Rankings', 'Earn Points', 'Win Season Rewards', 'Compare with Other Players', 'Be the Season Champion'],
        d: 'Compete all season, collect points and climb the leaderboard. Make your name in Bazino history!' },
      { c: '#ff9a1f', ic: ICO.brk, t: 'TOURNAMENT BRACKETS', s: 'Live & Past Tournament Results', art: asset(p, 'covers/banner-bracket.jpg'), href: '/events/brackets', btn: 'VIEW BRACKETS',
        li: ['Current Tournament (Live)', 'Next Tournament', 'Full Tournament Brackets', 'Match Results', 'Players & Winners'],
        d: 'Follow the current tournament, see live results and explore all past tournaments with full brackets.' }
    ];
    var cards = [];
    for (var i = 0; i < portals.length; i++) {
      (function (x) {
        cards.push(h('div', { key: x.t, className: 'hb-portal', style: { '--c': x.c } },
          h('div', { className: 'hb-portal-head' }, h('span', { style: { color: x.c } }, svg(x.ic, 34, 1.5)), h('span', null, h('b', null, x.t), h('small', null, x.s))),
          h('div', { className: 'hb-portal-art', style: { backgroundImage: 'url(' + x.art + ')' } }),
          h('ul', null, x.li.map(function (li) { return h('li', { key: li }, svg(ICO.star, 15, 1.6), li); })),
          h('p', null, x.d),
          h('button', { type: 'button', className: 'hb-cta hb-cta--line', style: { '--c': x.c }, onClick: function () { go(p, x.href); } }, x.btn, '→')
        ));
      })(portals[i]);
    }
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, svg(ICO.pad, 46, 1.5)), title: 'EVENTS', em: '', sub: 'PLAY • COMPETE • EARN • BE A LEGEND', tags: 'TOURNAMENTS   |   SEASON RANKINGS   |   SPECIAL EVENTS   |   REAL PLAYERS   |   REAL PRIZES', scriptL: 'Good Games\nGood People', scriptR: 'Play\nCompete\nWin' }),
      h('div', { className: 'hb-wrap hb-portals' }, cards)
    );
  }

  var WEEKLY = [
    { t: 'FC 26 WEEKLY TOURNAMENT', d: 'Show your skills, compete with other players and become this week’s champion!', tags: ['Football', 'Sports', '1v1'], day: 'EVERY SATURDAY', max: '32 PLAYERS', prize: '500 BC', c: '#a05cf7', cov: 'covers/fc26.png' },
    { t: 'UFC 5 WEEKLY TOURNAMENT', d: 'Step into the octagon and prove you are the best!', tags: ['Fighting', 'Sports', '1v1'], day: 'EVERY TUESDAY', max: '16 PLAYERS', prize: '300 BC', c: '#33cfff', cov: 'covers/ufc5.png' },
    { t: 'MORTAL KOMBAT 1 WEEKLY TOURNAMENT', d: 'Choose your fighter, master your skills and claim victory!', tags: ['Fighting', 'Action', '1v1'], day: 'EVERY THURSDAY', max: '16 PLAYERS', prize: '300 BC', c: '#ff9a1f', cov: 'covers/mk1.png' },
    { t: 'TEKKEN 8 WEEKLY TOURNAMENT', d: 'Fast fights, high skills and non-stop action. Are you ready?', tags: ['Fighting', 'Action', '1v1'], day: 'EVERY FRIDAY', max: '16 PLAYERS', prize: '300 BC', c: '#ff2ea6', cov: 'covers/tekken8.png' }
  ];
  function WeeklyRow(w, p) {
    return h('div', { className: 'hb-erow', style: { '--c': w.c } },
      h('div', { className: 'hb-erow-art', style: { backgroundImage: 'url(' + asset(p, w.cov) + ')' } }),
      h('div', { className: 'hb-erow-mid' },
        h('h3', null, w.t), h('p', null, w.d),
        h('div', { className: 'hb-chips' }, w.tags.map(function (t) { return h('span', { key: t, className: 'hb-chip2' }, t); }))
      ),
      h('div', { className: 'hb-erow-side hb-wmeta' },
        h('div', { className: 'hb-wm', style: { color: '#ff2ea6' } }, svg(ICO.cal, 22, 1.6), h('small', null, 'EVERY'), h('b', null, w.day.replace('EVERY ', ''))),
        h('div', { className: 'hb-wm', style: { color: '#7a8cff' } }, svg(ICO.users, 22, 1.6), h('small', null, 'MAX'), h('b', null, w.max)),
        h('div', { className: 'hb-wm', style: { color: '#ffc93c' } }, svg(ICO.trophy, 22, 1.6), h('small', null, 'PRIZE'), h('b', null, w.prize)),
        h('button', { type: 'button', className: 'hb-cta hb-cta--line', style: { '--c': w.c }, onClick: function () { go(p, '/events/brackets'); } }, 'VIEW DETAILS', '→')
      )
    );
  }
  function WeeklyPage(p) {
    var list = (p.eventsFeed && p.eventsFeed.weekly) || p.tournaments || [];
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, svg(ICO.cal, 46, 1.5)), title: 'WEEKLY', em: 'TOURNAMENTS', sub: 'PLAY • COMPETE • EARN CREDITS • BE A LEGEND', back: function () { go(p, '/events'); }, backLabel: 'BACK TO EVENTS', scriptR: 'Good Games\nGood People' }),
      h('div', { className: 'hb-wrap' }, WEEKLY.map(function (w) { return WeeklyRow(w, p); }))
    );
  }

  var SPECIAL = [
    { t: 'FC 26 CHAMPIONS CUP', d: 'The biggest FC 26 tournament of the season! Compete with the best players and claim the champion title.', tags: ['Football', 'PS5', '1v1', 'Knockout'], date: '12 JULY 2025', time: '18:00', pl: '64 PLAYERS', fee: '150 ₺', p1: '2,000 ₺', p2: '800 ₺', p3: '400 ₺', c: '#33cfff', cov: 'covers/fc26.png' },
    { t: 'UFC 5 BAZINO FIGHT NIGHT', d: 'Step into the octagon! A special event with top fighters, bigger prizes and real competition.', tags: ['Fighting', 'PS5', '1v1', 'Knockout'], date: '26 AUGUST 2025', time: '20:00', pl: '32 PLAYERS', fee: '200 ₺', p1: '1,500 ₺', p2: '500 ₺', p3: '250 ₺', c: '#ff2e6f', cov: 'covers/ufc5.png' },
    { t: 'MORTAL KOMBAT 1 LEGENDS', d: 'A legendary showdown. Only the strongest will survive!', tags: ['Fighting', 'PS5', '1v1', 'Knockout'], date: 'TO BE ANNOUNCED', time: 'TBA', pl: '32 PLAYERS', fee: '150 ₺', p1: '1,200 ₺', p2: '400 ₺', p3: '250 ₺', c: '#ff9a1f', cov: 'covers/mk1.png' },
    { t: 'TEKKEN 8 CHAMPIONSHIP', d: 'A new generation of fighters. Prove your skills and be the legend!', tags: ['Fighting', 'PS5', '1v1', 'Knockout'], date: '10 SEPTEMBER 2025', time: '18:00', pl: '32 PLAYERS', fee: '200 ₺', p1: '1,000 ₺', p2: '350 ₺', p3: '150 ₺', c: '#a05cf7', cov: 'covers/tekken8.png' }
  ];
  function SpecialRow(s, p) {
    return h('div', { className: 'hb-erow', style: { '--c': s.c } },
      h('div', { className: 'hb-erow-art', style: { backgroundImage: 'url(' + asset(p, s.cov) + ')' } }),
      h('div', { className: 'hb-erow-mid' },
        h('h3', null, s.t), h('p', null, s.d),
        h('div', { className: 'hb-chips' }, s.tags.map(function (t) { return h('span', { key: t, className: 'hb-chip2' }, t); })),
        h('div', { className: 'hb-erow-meta' },
          h('span', { style: { color: '#ff2ea6' } }, svg(ICO.cal, 15), s.date),
          h('span', { style: { color: '#ff2ea6' } }, svg(ICO.clock, 15), s.time),
          h('span', { style: { color: '#c7cfeb' } }, svg(ICO.users, 15), s.pl)
        )
      ),
      h('div', { className: 'hb-erow-side' },
        h('div', { className: 'hb-prizes' },
          h('div', { className: 'hb-prize-cell', style: { color: '#ffc93c' } }, svg(ICO.coins, 22, 1.6), h('span', null, h('small', null, 'ENTRY FEE'), h('b', null, s.fee))),
          h('div', { className: 'hb-prize-cell', style: { color: '#ff2ea6' } }, svg(ICO.gift, 22, 1.6), h('span', null, h('small', null, '+10 BC'), h('b', null, 'For Participation'))),
          h('div', { className: 'hb-prize-cell', style: { color: '#ffc93c' } }, svg(ICO.trophy, 20, 1.6), h('span', null, h('small', null, '1ST PLACE'), h('b', null, s.p1))),
          h('div', { className: 'hb-prize-cell', style: { color: '#c0d0ff' } }, svg(ICO.trophy, 20, 1.6), h('span', null, h('small', null, '2ND PLACE'), h('b', null, s.p2))),
          h('div', { className: 'hb-prize-cell', style: { color: '#ff8c3c' } }, svg(ICO.trophy, 20, 1.6), h('span', null, h('small', null, '3RD PLACE'), h('b', null, s.p3)))
        )
      )
    );
  }
  function SpecialPage(p) {
    return h('div', null,
      h(PHero, { img: asset(p, 'slide-city.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, svg(ICO.trophy, 46, 1.5)), title: 'SPECIAL', em: 'EVENTS', sub: 'BIGGER GAMES • HIGHER PRIZES • RARE MOMENTS', back: function () { go(p, '/events'); }, backLabel: 'BACK TO EVENTS', scriptL: 'Epic\nTournaments', scriptR: 'More\nThan\na Game' }),
      h('div', { className: 'hb-wrap' }, SPECIAL.map(function (s) { return SpecialRow(s, p); }))
    );
  }

  /* ══ SEASON ══ */
  var STANDINGS = [
    ['ArmanK', 48], ['RezaB', 42], ['Mahan10', 35], ['Shayan', 28], ['AliGameR', 25],
    ['DarkLord', 23], ['NimaPro', 20], ['RezaMVP', 18], ['Hitman', 16], ['Parsa', 15]
  ];
  function seasonRowsOf(p) {
    var season = p.season;
    if (!season && p.eventsFeed) season = p.eventsFeed.season || null;
    if (!season || season.error || season.status === 404) return STANDINGS;
    var list = season.standings || season.leaderboard || season.players || season.rows || [];
    if (!list || !list.length) return STANDINGS;
    return list.map(function (r) {
      if (Object.prototype.toString.call(r) === '[object Array]') return [r[0], r[1] || 0];
      return [r.displayName || r.username || r.name || 'Player', r.points || r.score || 0];
    });
  }
  function SeasonPage(p) {
    var st = useState('SPRING'); var tab = st[0], setTab = st[1];
    var season = (p.season && !p.season.error) ? p.season : ((p.eventsFeed && p.eventsFeed.season) || null);
    var rows = seasonRowsOf(p);
    var tabs = [];
    ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'].forEach(function (t) {
      tabs.push(h('button', { key: t, type: 'button', className: t === tab ? 'is-on' : '', onClick: function () { setTab(t); } }, t));
    });
    var lb = [];
    for (var i = 0; i < rows.length; i++) {
      (function (r, idx) {
        lb.push(h('tr', { key: r[0], className: idx < 3 ? 'is-' + (idx + 1) : '' },
          h('td', null, idx < 3 ? h('span', { className: 'hb-medal hb-medal--' + (idx + 1) }, String(idx + 1)) : String(idx + 1)),
          h('td', null, h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 9 } }, h('span', { className: 'hb-mav', style: { '--h': String((idx * 47) % 360) } }), r[0])),
          h('td', null, '#BZN0' + (100 + idx * 7)),
          h('td', { style: { textAlign: 'right' } }, h('b', { style: { fontSize: 18, color: idx < 3 ? '#ffc93c' : '#dfe6ff' } }, String(r[1])), ' ', h('small', { style: { color: '#7f8ab0' } }, 'POINTS'))
        ));
      })(rows[i], i);
    }
    var top3 = [];
    var t3c = ['#ffc93c', '#c0d0ff', '#ff8c3c'];
    for (var k = 0; k < 3 && k < rows.length; k++) {
      (function (r, idx) {
        top3.push(h('div', { key: r[0], className: 'hb-t3', style: { '--c': t3c[idx] } },
          h('span', { style: { color: t3c[idx] } }, svg(ICO.crown, 22, 1.6)),
          h('span', { className: 'hb-mav', style: { '--h': String((idx * 47) % 360), width: 46, height: 46 } }),
          h('span', null, h('small', { style: { color: t3c[idx], letterSpacing: 1.5, fontSize: 10, fontWeight: 700 } }, (idx + 1) + (idx === 0 ? 'ST' : idx === 1 ? 'ND' : 'RD') + ' PLACE'), h('b', null, r[0]), h('small', null, '#BZN0' + (100 + idx * 7))),
          h('span', { className: 'hb-pts' }, r[1] + ' Points')
        ));
      })(rows[k], k);
    }
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, svg(ICO.chart, 46, 1.5)), title: 'SEASON', em: 'RANKING', sub: 'EARN POINTS • CLIMB THE LEADERBOARD • BECOME THE SEASON CHAMPION', back: function () { go(p, '/events'); }, backLabel: 'BACK TO EVENTS', scriptL: 'Play\nCompete\nClimb', scriptR: 'Good Players\nBetter Legends' }),
      h('div', { className: 'hb-wrap' },
        h('div', { className: 'hb-season-tabs' }, tabs),
        h('div', { className: 'hb-season-range' }, tab + ' SEASON   |   1 MARCH 2026 – 31 MAY 2026'),
        h('div', { className: 'hb-season-clock' }, h('span', null, svg(ICO.clock, 16), 'SEASON ENDS IN', h('b', null, (season && season.daysLeft != null ? season.daysLeft : 45) + ' DAYS'))),
        h('div', { className: 'hb-season-grid' },
          h('div', { className: 'hb-box', style: { '--c': '#ff2ea6' } },
            h('div', { className: 'hb-ps-head' }, h('span', { style: { color: '#ffc93c' } }, svg(ICO.chart, 30, 1.6)), h('span', null, h('b', null, 'POINT SYSTEM'), h('small', null, 'Earn season points by ranking in tournaments.'))),
            h('div', { className: 'hb-ps-box', style: { '--c2': '#33cfff' } },
              h('h4', null, h('span', { style: { color: '#33cfff' } }, svg(ICO.cal, 16, 1.6)), 'WEEKLY TOURNAMENTS'),
              h('div', { className: 'hb-line' }, h('span', null, '1st Place'), h('b', null, '5 Points')),
              h('div', { className: 'hb-line' }, h('span', null, '2nd Place'), h('b', null, '2 Points')),
              h('div', { className: 'hb-line' }, h('span', null, '3rd Place'), h('b', null, '1 Point'))
            ),
            h('div', { className: 'hb-ps-box', style: { '--c2': '#a05cf7' } },
              h('h4', null, h('span', { style: { color: '#ff2ea6' } }, svg(ICO.star, 16, 1.6)), 'SPECIAL EVENTS'),
              h('div', { className: 'hb-line' }, h('span', null, '1st Place'), h('b', null, '10 Points')),
              h('div', { className: 'hb-line' }, h('span', null, '2nd Place'), h('b', null, '4 Points')),
              h('div', { className: 'hb-line' }, h('span', null, '3rd Place'), h('b', null, '2 Points'))
            ),
            h('div', { style: { padding: '4px 18px 18px', display: 'flex', gap: 12, alignItems: 'center' } },
              h('span', { style: { color: '#ff2ea6' } }, svg(ICO.pad, 40, 1.5)),
              h('span', { style: { fontFamily: 'var(--hb-font-s)', color: '#4dd7ff', fontSize: 17, lineHeight: 1.3, textShadow: '0 0 10px rgba(77,215,255,.7)' } }, 'Play More', h('br', null), 'Earn More', h('br', null), 'Be the Champion!')
            )
          ),
          h('div', { className: 'hb-box', style: { '--c': '#33cfff' } },
            h('div', { className: 'hb-ps-head' }, h('span', { style: { color: '#ffc93c' } }, svg(ICO.trophy, 28, 1.6)), h('b', null, 'SEASON LEADERBOARD'), h('small', { style: { marginLeft: 'auto' } }, 'FC26 • PS5 • 1v1')),
            h('table', { className: 'hb-lb' },
              h('thead', null, h('tr', null, h('th', null, '#'), h('th', null, 'PLAYER'), h('th', null, 'BZN ID'), h('th', { style: { textAlign: 'right' } }, 'POINTS'))),
              h('tbody', null, lb)
            ),
            h('div', { style: { padding: 14 } })
          ),
          h('div', { className: 'hb-box', style: { '--c': '#ff2ea6' } },
            h('div', { className: 'hb-ps-head' }, h('span', { style: { color: '#ffc93c' } }, svg(ICO.crown, 26, 1.6)), h('b', null, 'CURRENT SEASON ', h('span', { style: { color: '#ff2ea6' } }, 'TOP 3'))),
            h('div', { className: 'hb-top3' }, top3),
            h('div', { style: { padding: '0 18px 18px', textAlign: 'center', fontFamily: 'var(--hb-font-s)', color: '#4dd7ff', fontSize: 18, textShadow: '0 0 12px rgba(77,215,255,.7)' } }, '“Same Games', h('br', null), 'Bigger Legends”', h('div', { style: { fontFamily: 'var(--hb-font-b)', fontSize: 10, letterSpacing: 3, color: '#7f8ab0', marginTop: 6 } }, 'BAZINO'))
          )
        )
      )
    );
  }

  /* ══ BRACKETS ══ */
  var B32 = ['ArmanK', 'RezaFun', 'AliGameR', 'Parham', 'Shayan', 'AmirT', 'NimaPro', 'DarkLord', 'RezaB', 'Hesam', 'Mahan10', 'AliReza', 'KianPro', 'Soroush', 'Hitman', 'Behrad', 'RezaMVP', 'Arash', 'Mahan10', 'Pouya', 'Amin', 'Sina', 'Mehrfad', 'Kasra', 'Farhad', 'AmirHossein', 'Erfan', 'Navid', 'Dave', 'Iman', 'ArmanT', 'Saeed'];
  function sc(i, r) { var a = (i * 7 + r * 3) % 5; var b = (i * 5 + r) % 4; if (a === b) b = (b + 1) % 5; return a > b ? [a, b] : [b, a]; }
  function buildTree() {
    var rounds = [];
    var names = B32.slice();
    var r, i, m, next, s;
    var cur = [];
    for (i = 0; i < 16; i++) { s = sc(i, 0); cur.push({ a: names[i * 2], b: names[i * 2 + 1], sa: s[0], sb: s[1] }); }
    rounds.push(cur);
    for (r = 1; r < 5; r++) {
      next = [];
      for (i = 0; i < cur.length; i += 2) {
        var w1 = cur[i].sa > cur[i].sb ? cur[i].a : cur[i].b;
        var w2 = cur[i + 1].sa > cur[i + 1].sb ? cur[i + 1].a : cur[i + 1].b;
        s = sc(i + r * 3, r);
        next.push({ a: w1, b: w2, sa: s[0], sb: s[1] });
      }
      rounds.push(next);
      cur = next;
    }
    return rounds;
  }
  function MCard(m, seedA, seedB) {
    var aw = m.sa > m.sb;
    return h('div', { className: 'hb-mcard' },
      h('div', { className: 'hb-mrow' + (aw ? ' is-win' : '') }, h('span', { className: 'hb-mseed' }, String(seedA)), h('span', { className: 'hb-mav', style: { '--h': String((m.a.length * 53) % 360) } }), h('span', { className: 'hb-mname', title: m.a }, m.a), h('span', { className: 'hb-mscore' }, String(m.sa))),
      h('div', { className: 'hb-mrow' + (!aw ? ' is-win' : '') }, h('span', { className: 'hb-mseed' }, String(seedB)), h('span', { className: 'hb-mav', style: { '--h': String((m.b.length * 41) % 360) } }), h('span', { className: 'hb-mname', title: m.b }, m.b), h('span', { className: 'hb-mscore' }, String(m.sb)))
    );
  }
  function BracketsPage(p) {
    var st = useState(0); var sel = st[0], setSel = st[1];
    var live = p.bracket || null;
    var rounds = buildTree();
    var champ = rounds[4][0];
    var champName = champ.sa > champ.sb ? champ.a : champ.b;
    var tlist = [];
    var games = [['FC 26', 'covers/fc26.png'], ['UFC 5', 'covers/ufc5.png'], ['Mortal Kombat 1', 'covers/mk1.png'], ['Tekken 8', 'covers/tekken8.png'], ['FC 26', 'covers/fc26.png'], ['UFC 5', 'covers/ufc5.png']];
    for (var t = 0; t < 6; t++) {
      (function (idx) {
        tlist.push(h('button', { key: idx, type: 'button', className: 'hb-titem' + (idx === sel ? ' is-on' : ''), onClick: function () { setSel(idx); } },
          h('span', { className: 'hb-tcov', style: { backgroundImage: 'url(' + asset(p, games[idx][1]) + ')' } }),
          h('span', null, h('b', null, games[idx][0]), h('small', null, 'Weekly Tournament #' + (13 - idx)), h('small', null, '29 Aug 2026 • 32 Players'), h('span', { className: 'hb-st hb-st--done' }, 'COMPLETED')),
          h('span', { style: { color: '#66719b' } }, '›')
        ));
      })(t);
    }
    function col(roundIdx, label, seedsStart) {
      var ms = rounds[roundIdx];
      var half = [];
      for (var i = 0; i < ms.length / 2; i++) half.push(ms[i]);
      var nodes = [];
      for (var j = 0; j < half.length; j++) nodes.push(MCard(half[j], seedsStart + j * 2, seedsStart + j * 2 + 1));
      return h('div', { key: label, className: 'hb-brk-col' }, h('h4', null, label), nodes);
    }
    function colR(roundIdx, label) {
      var ms = rounds[roundIdx];
      var half = [];
      for (var i = ms.length / 2; i < ms.length; i++) half.push(ms[i]);
      var nodes = [];
      for (var j = 0; j < half.length; j++) nodes.push(MCard(half[j], 17 + j * 2, 18 + j * 2));
      return h('div', { key: label, className: 'hb-brk-col' }, h('h4', null, label), nodes);
    }
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, svg(ICO.trophy, 46, 1.5)), title: 'TOURNAMENT', em: 'BRACKETS', sub: 'LIVE & PAST TOURNAMENT RESULTS', tags: 'REAL PLAYERS   •   REAL MATCHES   •   REAL COMPETITION   •   LASTING LEGENDS', scriptL: 'Play\nCompete\nWin', scriptR: 'Good Games\nGood People' }),
      h('div', { className: 'hb-wrap hb-wrap--wide hb-brk-layout' },
        h('div', { className: 'hb-brk-side hb-box', style: { '--c': '#33cfff' } },
          h('h3', null, 'TOURNAMENTS'),
          h('p', null, 'Select a tournament to view the bracket'),
          h('div', { className: 'hb-filters' },
            h('button', { type: 'button' }, 'ALL'), h('button', { type: 'button', className: 'is-on' }, 'CURRENT'), h('button', { type: 'button' }, 'UPCOMING'), h('button', { type: 'button' }, 'COMPLETED')),
          h('div', { className: 'hb-tlist' }, tlist)
        ),
        h('div', { className: 'hb-brk-board hb-box', style: { '--c': '#33cfff' } },
          h('div', { className: 'hb-brk-head' },
            h('span', { className: 'hb-glogo' }, 'FC26'),
            h('h3', null, live && live.title ? live.title : 'WEEKLY TOURNAMENT #13'),
            h('span', { className: 'hb-meta' },
              h('span', null, svg(ICO.cal, 14), ' 29 AUGUST 2026'),
              h('span', null, svg(ICO.users, 14), ' 32 PLAYERS'),
              h('span', { style: { color: '#2ee87e' } }, svg(ICO.trophy, 14), ' COMPLETED')
            )
          ),
          h('div', { className: 'hb-brk-cols' },
            col(0, 'ROUND OF 32', 1), col(1, 'ROUND OF 16', 1), col(2, 'QUARTER FINALS', 1), col(3, 'SEMI FINALS', 1),
            h('div', { key: 'final', className: 'hb-brk-col' },
              h('h4', null, 'FINAL'),
              h('div', { className: 'hb-champ' },
                h('span', { className: 'hb-trophy', style: { color: '#ffc93c' } }, svg(ICO.trophy, 64, 1.4)),
                h('b', null, 'CHAMPION'),
                h('span', { className: 'hb-chav' }, champName.charAt(0)),
                h('b', { style: { fontSize: 14 } }, champName),
                h('small', null, '#BZN1024')
              ),
              MCard(champ, 1, 2)
            ),
            colR(3, 'SEMI FINALS'), colR(2, 'QUARTER FINALS'), colR(1, 'ROUND OF 16'), colR(0, 'ROUND OF 32')
          )
        )
      )
    );
  }

  /* ══ REGISTER ══ */
  function RegisterPage(p) {
    var list = (p.eventsFeed && p.eventsFeed.weekly) || p.tournaments || [];
    var st = useState(''); var tid = st[0], setTid = st[1];
    var tagSt = useState((p.user && (p.user.displayName || p.user.username)) || ''); var tag = tagSt[0], setTag = tagSt[1];
    var opts = [];
    for (var i = 0; i < WEEKLY.length; i++) opts.push(h('option', { key: i, value: String(i) }, WEEKLY[i].t + ' — 150 ₺'));
    return h('div', null,
      h(PHero, { img: asset(p, 'covers/mk1.png'), icon: h('span', { style: { color: '#2ee87e' } }, svg(ICO.edit, 44, 1.5)), title: 'REGISTER', em: 'TO PLAY', sub: 'NAME ON THE BRACKET • PAY AT THE DESK', back: function () { go(p, '/events'); }, backLabel: 'BACK TO EVENTS' }),
      h('div', { className: 'hb-wrap' },
        h('form', { className: 'hb-box', style: { '--c': '#2ee87e', padding: 26, marginBottom: 30, maxWidth: 640, marginInline: 'auto' }, onSubmit: function (e) { e.preventDefault(); if (!p.user) doLogin(p); } },
          h('div', { className: 'hb-field hb-field--plain' }, h('select', { value: tid, onChange: function (e) { setTid(e.target.value); } }, opts.length ? opts : h('option', null, 'FC 26 WEEKLY — 150 ₺'))),
          h('div', { className: 'hb-field hb-field--plain' }, h('input', { value: tag, onChange: function (e) { setTag(e.target.value); }, placeholder: 'GAMERTAG ON BRACKET (e.g. ArmanK)' })),
          h('button', { type: 'submit', className: 'hb-cta', style: { width: '100%', marginTop: 6 } }, 'HOLD MY SEAT'),
          h('p', { style: { color: '#97a1c2', fontWeight: 600, fontSize: 13, textAlign: 'center', margin: '12px 0 0' } }, 'Entry is paid in cash, card or wallet at the club desk — no online payment.')
        )
      )
    );
  }

  /* ══ SOON (shop / food) ══ */
  function SoonPage(x) {
    var p = x.p;
    var feats = [];
    for (var i = 0; i < x.feats.length; i++) {
      (function (f) {
        feats.push(h('div', { key: f[2] }, h('span', { style: { color: f[3] } }, svg(f[0], 34, 1.5)), h('span', null, h('b', null, f[2]), h('small', null, f[4]))));
      })(x.feats[i]);
    }
    return h('div', null,
      h('section', { className: 'hb-soon' },
        h('div', { className: 'hb-bg', style: { backgroundImage: 'url(' + x.img + ')' } }),
        h('div', { className: 'hb-in' },
          h('div', { className: 'hb-soon-icons' }, x.icons.map(function (ic, k) { return h('span', { key: k, style: { color: ic[1] } }, svg(ic[0], 54, 1.5)); })),
          h('h1', null, x.title, h('em', null, 'COMING SOON!')),
          h('div', { className: 'hb-soon-div' }, h('span', { style: { color: '#a05cf7' } }, svg(ICO.pad, 26, 1.6))),
          h('p', null, x.l1, h('br', null), x.l2),
          h('button', { type: 'button', className: 'hb-cta hb-cta--line', style: { '--c': '#a05cf7' } }, x.btn)
        )
      ),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-feats' }, feats))
    );
  }
  function ShopPage(p) {
    return h(SoonPage, { p: p, img: asset(p, 'shop-soon.jpg'), title: 'SHOP', btn: 'STAY TUNED',
      icons: [[ICO.cart, '#a05cf7']], l1: 'Something exciting is coming to BAZINO.', l2: 'Amazing products, exclusive items and more!',
      feats: [[ICO.gift, '#7a5cff', 'EXCLUSIVE ITEMS', '', 'Unique products only for our gamers.'], [ICO.tag, '#ff2ea6', 'SPECIAL OFFERS', '', 'Discounts, bundles and limited deals.'], [ICO.star, '#ff2ea6', 'HIGH QUALITY', '', 'Carefully selected for true gamers.'], [ICO.lock, '#a05cf7', 'MEMBER BENEFITS', '', 'Special rewards for Bazino members.']] });
  }
  function FoodPage(p) {
    return h(SoonPage, { p: p, img: asset(p, 'food-soon.jpg'), title: 'FOOD & DRINKS', btn: 'STAY TUNED',
      icons: [[ICO.burger, '#ffc93c'], [ICO.cup, '#ff2ea6'], [ICO.pizza, '#2ee87e']], l1: 'Snacks, drinks & more are coming soon to BAZINO.', l2: 'Good food. Great games. Same place.',
      feats: [[ICO.burger, '#ffc93c', 'DELICIOUS FOOD', '', 'Tasty meals for every gamer.'], [ICO.cup, '#ff2ea6', 'REFRESHING DRINKS', '', 'Stay cool, play longer.'], [ICO.pizza, '#2ee87e', 'MORE VARIETY', '', 'Snacks, desserts and more.'], [ICO.pad, '#33cfff', 'SAME GREAT ATMOSPHERE', '', 'Good food, good games, good people.']] });
  }

  /* ══ CLUB / PROFILE ══ */
  function ClubPage(p) {
    var u = p.user;
    if (!u) {
      return h('div', null,
        h(PHero, { img: asset(p, 'club-interior.jpg'), title: 'MY', em: 'PROFILE', sub: 'GAMER • MEMBER • BAZINO FAMILY' }),
        h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-empty', style: { marginBottom: 30 } }, h('b', null, 'MEMBERS ONLY'), h('p', null, 'Login to see your profile, credits and member card.'), h('button', { type: 'button', className: 'hb-cta', style: { marginTop: 14 }, onClick: function () { doLogin(p); } }, ts(p, 'hdr.login'))))
      );
    }
    var name = u.displayName || u.username || 'ArmanK';
    var kv = [['First Name', name.split(' ')[0] || name], ['Last Name', name.split(' ')[1] || '—'], ['Username', u.username || name], ['BZN Member ID', '#BZN1024'], ['Date of Birth', '12 May 1998'], ['Phone Number', '+90 539 112 37 47']];
    var kvs = [];
    for (var i = 0; i < kv.length; i++) kvs.push(h('div', { key: kv[i][0], className: 'hb-line' }, h('span', { style: { color: '#33cfff' } }, svg(ICO.user, 16)), h('small', null, kv[i][0]), h('b', null, kv[i][1])));
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), title: 'MY', em: 'PROFILE', sub: 'GAMER • MEMBER • BAZINO FAMILY', scriptL: 'Play\nCompete\nBelong', scriptR: 'Good Games\nGood People' }),
      h('div', { className: 'hb-wrap hb-prof-grid' },
        h('div', { className: 'hb-prof-left' },
          h('div', { className: 'hb-box', style: { '--c': '#33cfff' } },
            h('div', { className: 'hb-card-head' }, h('span', { style: { color: '#33cfff' } }, svg(ICO.user, 24, 1.6)), h('b', null, 'PERSONAL INFORMATION')),
            h('div', { className: 'hb-prof-main' },
              h('div', { className: 'hb-avatar' }, h('div', { className: 'hb-avin' }, name.charAt(0).toUpperCase())),
              h('div', null,
                h('div', { className: 'hb-kv' }, kvs),
                h('button', { type: 'button', className: 'hb-cta hb-cta--line', style: { '--c': '#ff2ea6', marginTop: 10 } }, svg(ICO.lock, 15), 'CHANGE PASSWORD', '→')
              )
            )
          ),
          h('div', { className: 'hb-box', style: { '--c': '#ffc93c' } },
            h('div', { className: 'hb-card-head' }, h('span', { style: { color: '#ffc93c' } }, svg(ICO.trophy, 24, 1.6)), h('b', null, 'TOURNAMENT STATISTICS')),
            h('div', { className: 'hb-stats' },
              h('div', { className: 'hb-stat', style: { '--c': '#ffc93c' } }, svg(ICO.trophy, 30, 1.6), h('b', null, '5'), h('small', null, 'Championships')),
              h('div', { className: 'hb-stat', style: { '--c': '#c0d0ff' } }, svg(ICO.medal, 30, 1.6), h('b', null, '3'), h('small', null, 'Second Places')),
              h('div', { className: 'hb-stat', style: { '--c': '#ff8c3c' } }, svg(ICO.medal, 30, 1.6), h('b', null, '7'), h('small', null, 'Third Places'))
            )
          )
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
          h('div', { className: 'hb-box hb-credits', style: { '--c': '#ffc93c' } },
            h('span', { style: { color: '#ffc93c' } }, svg(ICO.coins, 40, 1.5)),
            h('span', null, h('small', { style: { color: '#dfe6ff', letterSpacing: 2, fontWeight: 700 } }, 'BAZINO CREDITS'), h('br', null), h('b', null, String(u.credits != null ? u.credits : '1,250')), h('span', null, ' BC'))
          ),
          h('div', { className: 'hb-box', style: { '--c': '#33cfff', paddingBottom: 12 } },
            h('div', { className: 'hb-card-head' }, h('span', { style: { color: '#c0d0ff' } }, svg(ICO.crown, 24, 1.6)), h('b', null, 'BAZINO MEMBER CARD')),
            h('div', { className: 'hb-memcard' },
              h('div', { className: 'hb-mc-logo' }, 'BAZINO'), h('small', null, 'GAMING CLUB'),
              h('div', { className: 'hb-mc-script' }, 'PLAY', h('br', null), 'COMPETE', h('br', null), 'EARN', h('br', null), 'BE A LEGEND'),
              h('div', { className: 'hb-mc-mid' },
                h('div', { className: 'hb-avatar', style: { width: 92, height: 92 } }, h('div', { className: 'hb-avin', style: { fontSize: 30 } }, name.charAt(0).toUpperCase())),
                h('span', null, h('b', { style: { fontSize: 19, color: '#fff' } }, name), h('small', { style: { display: 'block' } }, '#BZN1024'))
              ),
              h('div', { className: 'hb-mc-foot' },
                h('span', null, h('small', null, 'MEMBER SINCE'), h('b', { style: { color: '#dfe6ff' } }, 'AUG 2026')),
                h('span', null, h('small', { style: { display: 'block', textAlign: 'right' } }, 'STATUS'), h('span', { className: 'hb-pill' }, 'ACTIVE'))
              )
            )
          )
        )
      )
    );
  }

  /* ══ BLOG ══ */
  function BlogPage(p) {
    var arts = p.articles || [];
    var posts = [];
    var fallback = [
      { title: 'FC26 Saturday Cup — Recap', tag: 'TOURNAMENTS', date: 'SEP 06, 2026', img: asset(p, 'slide-fc26.jpg'), d: '32 players, 5 hours, one champion. See how ArmanK lifted the weekly cup again.' },
      { title: 'New Lounge Wall Is Live', tag: 'CLUB LIFE', date: 'SEP 02, 2026', img: asset(p, 'club-interior.jpg'), d: 'The 85" wall got an upgrade — El Clasico nights are back every week.' },
      { title: 'GTA VI Launch Night Plans', tag: 'NEWS', date: 'AUG 28, 2026', img: asset(p, 'slide-city.jpg'), d: 'First-play seats, snacks and the neon city on every screen. Reserve early.' }
    ];
    var src = arts.length ? arts.map(function (a) { return { title: pick(a.title, langOf(p)) || a.title, tag: 'NEWS', date: (a.createdAt || '').slice(0, 10), img: a.imageUrl || asset(p, 'club-interior.jpg'), d: pick(a.excerpt || a.desc, langOf(p)) || '' }; }) : fallback;
    for (var i = 0; i < src.length; i++) {
      (function (a) {
        posts.push(h('article', { key: a.title, className: 'hb-post' },
          h('div', { className: 'hb-post-art', style: { backgroundImage: 'url(' + a.img + ')' } }),
          h('div', { className: 'hb-post-body' },
            h('small', null, a.tag + ' • ' + a.date),
            h('b', null, a.title),
            h('p', null, a.d)
          )));
      })(src[i]);
    }
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, svg(ICO.chat, 44, 1.5)), title: 'BAZINO', em: 'BLOG', sub: 'CLUB NEWS • MATCH REPORTS • STORIES', scriptR: 'More Than\na Game' }),
      h('div', { className: 'hb-wrap hb-blog-grid' }, posts)
    );
  }

  /* ══ CHAT (disabled by employer) ══ */
  function ChatPage(p) {
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#33cfff' } }, svg(ICO.chat, 44, 1.5)), title: 'CLUB', em: 'CHAT', sub: 'LOBBY • TABLES • STAFF' }),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-empty', style: { marginBottom: 30 } }, h('b', null, 'CHAT DISABLED'), h('p', null, 'The club chat is temporarily turned off. See you at the lounge!')))
    );
  }

  /* ══ CONTACT / ABOUT ══ */
  function ContactPage(p) {
    var s = p.settings || {};
    var addr = s.club_address || 'İskele, Long Beach, Hotel VistaMare';
    var map = s.club_map_url || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr));
    var feats = [
      [ICO.pad, '#33cfff', 'PS5 GAMING', 'Play the latest games on next-gen consoles.'],
      [ICO.monitor, '#a05cf7', 'BIG SCREEN EXPERIENCE', 'Bigger screens. Bigger moments.'],
      [ICO.trophy, '#7a8cff', 'TOURNAMENTS & EVENTS', 'Join competitions and win amazing prizes.'],
      [ICO.users, '#ff2ea6', 'FRIENDLY GAMING SPACE', 'Play, meet, relax and be part of the community.']
    ];
    var fn = [];
    for (var i = 0; i < feats.length; i++) {
      (function (f) {
        fn.push(h('div', { key: f[2] }, h('span', { style: { color: f[1] } }, svg(f[0], 52, 1.4)), h('b', null, f[2]), h('small', null, f[3])));
      })(feats[i]);
    }
    return h('div', null,
      h('section', { className: 'hb-about' },
        h('span', { className: 'hb-script hb-script--l', style: { position: 'static', display: 'inline-block', transform: 'rotate(-8deg)', color: 'transparent', WebkitTextStroke: '1px #3a4a7a', textShadow: 'none' } }, 'PLAY MEET COMPETE BELONG'),
        h('div', { className: 'hb-wrap' },
          h('div', { className: 'hb-eyebrow' }, 'CONTACT'),
          h('h1', null, 'BAZINO'),
          h('div', { className: 'hb-clubline' }, 'GAMING CLUB'),
          h('div', { className: 'hb-tag' }, 'GOOD GAMES. GOOD PEOPLE.'),
          h('p', { className: 'hb-lead' }, 'BAZINO is a gaming club in Long Beach, İskele, created for people who love gaming, competition and spending great time together.'),
          h('p', { className: 'hb-lead', style: { marginTop: -6 } }, 'Whether you are a casual player or a serious competitor, BAZINO is the place to play, meet and belong.'),
          h('div', { className: 'hb-about-feats' }, fn),
          h('div', { className: 'hb-visit' },
            h('span', { style: { color: '#d24bff' } }, svg(ICO.pin, 44, 1.6)),
            h('span', { className: 'hb-vtxt' }, h('small', null, 'VISIT BAZINO'), h('b', null, addr)),
            h('a', { className: 'hb-cta hb-cta--line', style: { '--c': '#ff2ea6' }, href: map, target: '_blank', rel: 'noreferrer' }, svg(ICO.send, 16), 'GET DIRECTIONS')
          )
        )
      )
    );
  }

  /* ══ RULES / PRIVACY ══ */
  function RulesPage(p) {
    var rules = [
      'Respect all players, guests and staff.',
      'Take care of the equipment and the space.',
      'Follow game, tournament and event rules.',
      'Cheating, fighting, harassment or threats are forbidden.',
      'Offensive or misleading usernames are not allowed.',
      'Keep the environment clean and consume responsibly.',
      'Intentional damage includes repair/replacement costs.',
      'Serious or repeated violations may lead to temporary or permanent ban.'
    ];
    return h('div', null,
      h(PHero, { title: 'CLUB', em: 'RULES', sub: 'FAIR PLAY • RESPECT • FUN' }),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-box hb-legalbox', style: { '--c': '#33cfff' } },
        h('h3', null, 'BAZINO CLUB RULES'),
        h('ol', null, rules.map(function (r) { return h('li', { key: r }, r); }))))
    );
  }
  function PrivacyPage(p) {
    return h('div', null,
      h(PHero, { title: 'PRIVACY', em: 'POLICY', sub: 'YOUR DATA • YOUR RIGHTS' }),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-box hb-legalbox', style: { '--c': '#a05cf7' } },
        h('h3', null, 'PRIVACY'),
        h('p', { style: { color: '#c7cfeb', fontWeight: 600, lineHeight: 1.9 } }, 'Bazino stores only the information you provide (name, username, phone) to run club memberships, tournaments and credits. Data is never sold. Contact the desk or WhatsApp for correction or deletion requests.')))
    );
  }

  /* ── register all ── */
  SDK.registerComponent('header', wrap(HubHeader));
  SDK.registerComponent('footer', wrap(HubFooter));
  SDK.registerComponent('mobileNav', wrap(function () { return null; }));
  SDK.registerComponent('home', wrap(HomePage));
  SDK.registerComponent('hub.home', wrap(HomePage));
  SDK.registerComponent('hub.games', wrap(GamesPage));
  SDK.registerComponent('hub.events', wrap(EventsPage));
  SDK.registerComponent('hub.weekly', wrap(WeeklyPage));
  SDK.registerComponent('hub.special', wrap(SpecialPage));
  SDK.registerComponent('hub.season', wrap(SeasonPage));
  SDK.registerComponent('hub.brackets', wrap(BracketsPage));
  SDK.registerComponent('hub.register', wrap(RegisterPage));
  SDK.registerComponent('hub.shop', wrap(ShopPage));
  SDK.registerComponent('hub.food', wrap(FoodPage));
  SDK.registerComponent('hub.club', wrap(ClubPage));
  SDK.registerComponent('hub.blog', wrap(BlogPage));
  SDK.registerComponent('hub.chat', wrap(ChatPage));
  SDK.registerComponent('hub.contact', wrap(ContactPage));
  SDK.registerComponent('hub.rules', wrap(RulesPage));
  SDK.registerComponent('hub.privacy', wrap(PrivacyPage));
})();
