/* BAZINO HUB ARENA THEME v2.1.8 — SDK v2, ES5 only.
   Visuals per employer WhatsApp mockups (2026-09-04 set).
   Menus & page names per portal HUB_PAGES. */
(function () {
  var SDK = window.BazinoThemeSDK;
  if (!SDK || !SDK.registerComponent) { return; }
  var R = SDK.React;
  var h = R.createElement;
  var useState = R.useState;
  var useEffect = R.useEffect;
  var useRef = R.useRef;

  /* ── helpers ── */
  function asset(p, n) { return (p && p.assetsBase ? p.assetsBase + '/' : '') + n; }
  function dynUrl(row) {
    if (!row) return '';
    var u = row.imageUrl || row.image || row.coverUrl || row.cover || row.bannerUrl || row.artUrl || '';
    if (typeof u !== 'string') return '';
    u = u.trim();
    if (!u) return '';
    if (u.charAt(0) === '/' || u.indexOf('http://') === 0 || u.indexOf('https://') === 0) return u;
    return '';
  }
  function normName(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ''); }
  function dynCover(p, title) {
    var key = normName(title);
    if (!key) return '';
    var pools = [];
    var srcs = [p && p.systems, p && p.featuredGames, p && p.tournaments];
    var i, j, row, n, u, feed;
    for (i = 0; i < srcs.length; i++) {
      if (srcs[i] && srcs[i].length) for (j = 0; j < srcs[i].length; j++) pools.push(srcs[i][j]);
    }
    feed = p && p.eventsFeed;
    if (feed) {
      if (feed.weekly) for (j = 0; j < feed.weekly.length; j++) pools.push(feed.weekly[j]);
      if (feed.special) for (j = 0; j < feed.special.length; j++) pools.push(feed.special[j]);
    }
    for (i = 0; i < pools.length; i++) {
      row = pools[i];
      n = normName(pick(row.name || row.title || row.game || row.titleEn || '', langOf(p)));
      if (!n || n.length < 3) continue;
      if (key.indexOf(n) !== -1 || n.indexOf(key.slice(0, 6)) !== -1) {
        u = dynUrl(row);
        if (u) return u;
      }
    }
    return '';
  }
  function themeImg(p, n) {
    if (!n) return '';
    return asset(p, String(n).replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  }
  function coverSrc(p, title, fallbackPath) {
    var d = dynCover(p, title);
    if (d) return d;
    return themeImg(p, fallbackPath);
  }
  function CoverBox(p, title, fallbackPath, cls) {
    var fb = fallbackPath ? asset(p, fallbackPath) : '';
    var src = coverSrc(p, title, fallbackPath);
    if (!src) return h('div', { className: (cls || 'hb-grow-art') + ' hb-grow-art--typo' }, h('b', null, title));
    return h('div', { className: cls || 'hb-grow-art' },
      h('img', { src: src, alt: '', onError: function (e) {
        var el = e.target;
        if (!el) return;
        var cur = el.src || '';
        var step = el.getAttribute('data-fb') || '0';
        if (step === '0' && cur.indexOf('.webp') !== -1) {
          el.setAttribute('data-fb', '1');
          el.src = cur.replace('.webp', '.jpg');
          return;
        }
        if (fb && step !== '2') { el.setAttribute('data-fb', '2'); el.src = fb; }
      } })
    );
  }

  var AVATARS = ['arman', 'reza', 'mahan', 'shayan', 'ali', 'darklord', 'nima', 'reza', 'darklord', 'shayan'];
  function Av(p, idx, cls) {
    var n = AVATARS[(idx || 0) % AVATARS.length];
    return h('img', { className: cls || 'hb-avimg', src: themeImg(p, 'avatars/' + n + '.jpg'), alt: '',
      onError: function (e) { if (e && e.target && String(e.target.src).indexOf('.webp') !== -1) e.target.src = asset(p, 'avatars/' + n + '.jpg'); } });
  }
  function extraGames(p, catalog) {
    var extras = [];
    var seen = {};
    var i, g, t, key, list;
    for (i = 0; i < catalog.length; i++) seen[normName(catalog[i].t)] = 1;
    list = (p && p.featuredGames) || [];
    for (i = 0; i < list.length; i++) {
      g = list[i];
      t = pick(g.title || g.name || g.game || g.titleEn || '', langOf(p));
      key = normName(t);
      if (!key || seen[key]) continue;
      seen[key] = 1;
      extras.push({
        t: t,
        tags: (g.tags && g.tags.length) ? g.tags : ['Featured'],
        pegi: Number(g.pegi || g.ageRating || 12) || 12,
        pl: g.players || '1–4 Players',
        on: g.online === false ? 'Offline' : 'Online & Offline',
        d: pick(g.description || g.summary || '', langOf(p)) || t,
        cov: ''
      });
    }
    return extras;
  }
  function langOf(p) { return (p && p.language) || 'en'; }
  function ts(p, k, f) { return p && typeof p.ts === 'function' ? p.ts(k, f) : (f || k); }
  function go(p, path) { if (p && p.onNavigate) p.onNavigate(path); }
  function doLogin(p) { if (p && p.onLogin) p.onLogin(); else if (window.CustomEvent) window.dispatchEvent(new CustomEvent('bazino:open-auth')); }
  function doLogout(p) { if (p && p.onLogout) p.onLogout(); }
  function pick(v, lang) { if (!v) return ''; if (typeof v === 'string') return v; return v[lang] || v.en || v.fa || ''; }
  function wrap(Page) { return { apiVersion: 2, render: function (props) { return h('div', { dir: (props && props.dir) || 'ltr', className: (props && props.dir) === 'rtl' ? 'hb-rtl' : '' }, h(Page, props)); } }; }
  function icoPng(p, name, size) {
    return h('img', { className: 'hb-ico', src: asset(p, 'icons/' + name + '.webp'), width: size || 44, height: size || 44, alt: '', draggable: 'false',
      onError: function (e) { if (e && e.target && e.target.src && e.target.src.indexOf('.webp') !== -1) e.target.src = asset(p, 'icons/' + name + '.png'); } });
  }
  var HAS_ICO = { pad: 1, trophy: 1, cart: 1, food: 1, info: 1, pin: 1, clock: 1, whatsapp: 1, instagram: 1, cal: 1, chart: 1, brk: 1, users: 1, gift: 1, star: 1, crown: 1, coins: 1 };
  function ico(p, name, size) {
    if (p && HAS_ICO[name]) return icoPng(p, name, size || 22);
    return svg(ICO[name] || ICO.star, size || 18);
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
      ico(p, 'globe', 15), h('span', null, lang.toUpperCase()),
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
              h('button', { type: 'button', className: 'hb-bell', 'aria-label': 'notifications', onClick: function () { go(p, '/club'); } }, ico(p, 'bell', 20), h('i', null)),
              h('a', { href: '/club', className: 'hb-user', onClick: function (e) { e.preventDefault(); go(p, '/club'); } },
                h('span', { className: 'hb-av' }, ((u.displayName || u.username || '?').charAt(0) || '?').toUpperCase()),
                h('span', null, h('b', null, u.displayName || u.username), h('small', null, '#' + (u.username || 'BZN'))),
                h('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: '#33cfff', strokeWidth: 3 }, h('path', { d: 'M6 9l6 6 6-6' }))
              ),
              h('button', { type: 'button', className: 'hb-btn hb-btn--out', onClick: function () { doLogout(p); } }, ico(p, 'logout', 15), ts(p, 'hdr.logout'))
            ) : h('span', { style: { display: 'inline-flex', gap: 10 } },
              h('button', { type: 'button', className: 'hb-btn hb-btn--reg', onClick: function () { setRegOpen(true); } }, ico(p, 'user', 15), h('span', null, ts(p, 'hdr.register'))),
              h('button', { type: 'button', className: 'hb-btn hb-btn--login', onClick: function () { doLogin(p); } }, ico(p, 'user', 15), h('span', null, ts(p, 'hdr.login')))
            ),
            h('button', { type: 'button', className: 'hb-burger', 'aria-label': 'menu', onClick: function () { setMob(!mob); } }, mob ? '✕' : '☰')
          )
        )
      ),
      h('nav', { className: 'hb-mnav' + (mob ? ' is-on' : '') }, items),
      regOpen ? h(RegisterModal, { p: p, onClose: function () { setRegOpen(false); } }) : null
    );
  }

  function HoursModal(p) { var _pp = p.p || p;
    var s = (p.p && p.p.settings) || {};
    var hours = s.club_hours || s.opening_hours || '11:00 – 23:50';
    var days = [['day.mon','Monday'],['day.tue','Tuesday'],['day.wed','Wednesday'],['day.thu','Thursday'],['day.fri','Friday'],['day.sat','Saturday'],['day.sun','Sunday']];
    var rows = [];
    for (var i = 0; i < days.length; i++) rows.push(h('div', { key: days[i][0] }, h('span', null, ts(_pp, days[i][0], days[i][1])), h('b', null, hours)));
    return h('div', { className: 'hb-modalbg', onClick: p.onClose },
      h('div', { className: 'hb-modal', onClick: function (e) { e.stopPropagation(); } },
        h('button', { type: 'button', className: 'hb-x', onClick: p.onClose }, '✕'),
        h('div', { className: 'hb-hours-head' },
          h('span', { style: { color: '#ff2e6f' } }, ico(_pp, 'clock', 54)),
          h('div', null, h('h2', null, ts(p.p, 'hours.title')), h('p', null, ts(p.p, 'hours.sub')))
        ),
        h('div', { className: 'hb-hours-list' }, rows),
        h('div', { className: 'hb-hours-see' }, h('span', { style: { color: '#4dd7ff' } }, ico(_pp, 'pad', 26)), ts(p.p, 'hours.see'))
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
      h('div', { className: 'hb-wrap hb-foot-slogan' }, h('span', null, ts(p, 'foot.slogan'), ' ', h('b', null, ts(p, 'foot.community', 'A Community')))),
      h('div', { className: 'hb-legal' },
        h('a', { href: '/rules', onClick: function (e) { e.preventDefault(); go(p, '/rules'); } }, ts(p, 'foot.rules', 'RULES')),
        h('span', null, '·'),
        h('a', { href: '/privacy', onClick: function (e) { e.preventDefault(); go(p, '/privacy'); } }, ts(p, 'foot.privacy', 'PRIVACY')),
        h('span', null, '·'),
        h('small', null, '© ' + new Date().getFullYear() + ' BAZINO GAMING CLUB — ' + ts(p, 'foot.tagline'))
      )
    );
  }

  function RegisterModal(x) {
    var p = x.p;
    var fields = [
      [ts(p, 'reg.first', 'First Name'), ICO.user], [ts(p, 'reg.last', 'Last Name'), ICO.user], [ts(p, 'reg.user', 'Choose a Username'), ICO.user],
      [ts(p, 'reg.dob', 'Date of Birth'), ICO.cal], [ts(p, 'reg.phone', 'Phone Number'), ICO.chat], [ts(p, 'reg.pass', 'Create a Password'), ICO.lock], [ts(p, 'reg.pass2', 'Confirm Your Password'), ICO.lock]
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
            h('span', { style: { color: '#ff2ea6' } }, ico(p, 'pad', 64)),
            h('div', { className: 'hb-logo', style: { marginTop: 4 } }, h('b', null, 'BAZINO'), h('small', null, 'GAMING CLUB')),
            h('div', { style: { letterSpacing: 3, color: '#dfe6ff', fontWeight: 700, fontSize: 12 } }, ts(p, 'reg.play', 'PLAY • COMPETE • BELONG')),
            h('div', { className: 'hb-script2' }, 'Good Games', h('br', null), 'Better', h('br', null), 'People'),
            h('span', { style: { color: '#a05cf7' } }, ico(p, 'pad', 90)),
            h('div', { className: 'hb-join' }, ts(p, 'reg.join', 'JOIN OUR COMMUNITY'))
          ),
          h('form', { className: 'hb-form', onSubmit: function (e) { e.preventDefault(); x.onClose(); doLogin(p); } },
            h('h2', null, ts(p, 'reg.title', 'CREATE YOUR ACCOUNT')),
            h('p', { className: 'hb-fsub' }, ts(p, 'reg.sub', 'Join Bazino Gaming Club and be part of our community!')),
            h('div', { className: 'hb-frow' }, nodes[0], nodes[1]),
            nodes[2],
            h('div', { className: 'hb-frow' }, nodes[3],
              h('div', { className: 'hb-field' }, ico(p, 'chat', 16), h('input', { type: 'tel', placeholder: '+90 · Phone Number' }))),
            nodes[4], nodes[4] ? null : null,
            nodes[5], nodes[6],
            h('div', { className: 'hb-gender' }, h('span', null, ts(p, 'reg.gender', 'Gender')),
              h('label', null, h('input', { type: 'radio', name: 'g', defaultChecked: true }), 'Male'),
              h('label', null, h('input', { type: 'radio', name: 'g' }), 'Female'),
              h('label', null, h('input', { type: 'radio', name: 'g' }), 'Other')),
            h('label', { className: 'hb-accept' }, h('input', { type: 'checkbox' }), h('span', null, ts(p, 'reg.accept', 'I accept the '), ' ', h('a', { href: '/rules', onClick: function (e) { e.preventDefault(); x.onClose(); go(p, '/rules'); } }, ts(p, 'foot.rules', 'RULES')), ' ', ts(p, 'reg.and', 'and'), ' ', h('a', { href: '/privacy', onClick: function (e) { e.preventDefault(); x.onClose(); go(p, '/privacy'); } }, ts(p, 'foot.privacy', 'PRIVACY')))),
            h('button', { type: 'submit', className: 'hb-cta' }, ts(p, 'reg.create', 'CREATE ACCOUNT')),
            h('p', { style: { textAlign: 'center', color: '#97a1c2', fontWeight: 600, margin: '4px 0 0' } }, ts(p, 'reg.have', 'Already have an account? '), ' ', h('a', { href: '#', style: { color: '#ff2ea6' }, onClick: function (e) { e.preventDefault(); x.onClose(); doLogin(p); } }, ts(p, 'hdr.login', 'LOGIN')))
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
        x.back ? h('button', { type: 'button', className: 'hb-back', onClick: x.back }, '←', x.backLabel || ts(x.p || {}, 'common.back', 'BACK')) : null,
        h('div', { className: 'hb-in' },
          h('h1', { className: 'hb-ptitle' }, x.icon || null, x.title, x.em ? h('em', null, x.em) : null),
          h('p', { className: 'hb-psub' }, x.sub || ''),
          x.tags ? h('p', { className: 'hb-ptags' }, x.tags) : null,
          x.extra || null
        ),
        x.chip ? h('div', { className: 'hb-phero-chip' }, x.chip) : null
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
      { img: asset(p, 'hero-gta6.jpg'), badge: ts(p,'home.soon','COMING SOON'), title: ts(p,'home.gtaTitle','grand theft auto VI'), sub: ts(p,'home.gtaSub','THE NEXT GENERATION OF CRIME') },
      { img: asset(p, 'slide-fc26.jpg'), badge: ts(p,'home.now','NOW'), title: ts(p,'home.fc26Title','FC 26 TOURNAMENT'), sub: ts(p,'home.fc26Sub','SATURDAY NIGHT BRACKET • 32 PLAYERS') },
      { img: asset(p, 'slide-match.jpg'), badge: ts(p,'home.live','LIVE MATCH'), title: ts(p,'home.clasico','EL CLASICO ON THE WALL'), sub: ts(p,'home.clasicoSub','TONIGHT 21:00 • LOUNGE') }
    ];
    var c = center[i % center.length];
    var dots = [];
    for (var d = 0; d < center.length; d++) {
      (function (k) { dots.push(h('button', { key: k, type: 'button', 'aria-label': 'slide ' + (k + 1), className: k === i % center.length ? 'is-on' : '', onClick: function () { setI(k); } })); })(d);
    }
    var tiles = [
      { c: '#33cfff', ic: 'pad', k: 'nav.games', subk: 'tile.games', href: '/games' },
      { c: '#ff2e6f', ic: 'trophy', k: 'nav.events', subk: 'tile.events', href: '/events' },
      { c: '#a05cf7', ic: 'cart', k: 'nav.shop', subk: 'tile.shop', href: '/shop' },
      { c: '#ff9a1f', ic: 'food', k: 'nav.food', subk: 'tile.food', href: '/food' },
      { c: '#2ee87e', ic: 'users', k: 'nav.club', subk: 'tile.club', href: '/club' },
      { c: '#ff2ea6', ic: 'star', k: 'nav.blog', subk: 'tile.blog', href: '/blog' },
      { c: '#7a5cff', ic: 'info', k: 'nav.contact', subk: 'tile.contact', href: '/contact' }
    ];
    var tnodes = [];
    for (var t = 0; t < tiles.length; t++) {
      (function (tl) {
        tnodes.push(h('a', { key: tl.k, href: tl.href, className: 'hb-tile', style: { '--c': tl.c }, onClick: function (e) { e.preventDefault(); go(p, tl.href); } },
          icoPng(p, tl.ic, 52), h('b', null, ts(p, tl.k)), h('small', null, ts(p, tl.subk, '')), h('span', { className: 'hb-tile-arr' }, '→')));
      })(tiles[t]);
    }
    return h('div', null,
      h('section', { className: 'hb-hero' },
        h('div', { className: 'hb-wrap' },
          h('div', { className: 'hb-hero-grid' },
            h('div', { className: 'hb-panel hb-panel--l', style: { backgroundImage: 'url(' + asset(p, 'hero-fc-player.jpg') + ')' } },
              h('div', { className: 'hb-panel-body' },
                h('h2', { className: 'hb-hero-title' }, 'FC24'),
                h('div', { className: 'hb-hero-sub' }, ts(p, 'home.fcTour', 'TOURNAMENT')),
                h('div', { className: 'hb-hero-meta' }, ts(p, 'home.fcMeta', 'SATURDAY • 16:00'))
              )),
            h('div', { className: 'hb-panel hb-panel--c', style: { backgroundImage: 'url(' + c.img + ')' } },
              h('div', { className: 'hb-panel-body' },
                h('span', { className: 'hb-badge' }, c.badge),
                h('h2', { className: 'hb-hero-title', style: { fontSize: 46 } }, c.title),
                h('div', { className: 'hb-hero-meta' }, c.sub),
                h('button', { type: 'button', className: 'hb-hero-cta', onClick: function () { go(p, '/events'); } }, ts(p, 'common.more', 'MORE INFO'), '→')
              )),
            h('div', { className: 'hb-panel hb-panel--r', style: { backgroundImage: 'url(' + asset(p, 'slide-match.jpg') + ')' } },
              h('span', { className: 'hb-live-badge' }, ts(p, 'home.live', 'LIVE MATCH')),
              h('div', { className: 'hb-vs' },
                h('span', { className: 'hb-crest hb-crest--rm', title: 'Real Madrid' }),
                h('b', null, 'VS'),
                h('span', { className: 'hb-crest hb-crest--fcb' }, 'FCB')
              ),
              h('div', { style: { display: 'flex', justifyContent: 'space-around', position: 'relative', zIndex: 2, color: '#eef2ff', fontWeight: 700, fontSize: 11, letterSpacing: 1, padding: '8px 8px 0' } }, h('span', null, 'REAL MADRID'), h('span', null, 'BARCELONA')),
              h('div', { className: 'hb-live-t' }, ts(p, 'home.tonight', 'TONIGHT 21:00'))
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
    { t: "Astro's Playroom", tags: ['Platformer', 'Adventure', 'Kids'], pegi: 3, pk: 'pl.12', ok: 'on.off', dk: 'gd.astro', cov: 'covers/astro.jpg' },
    { t: 'Minecraft', tags: ['Adventure', 'Creative', 'Sandbox'], pegi: 7, pk: 'pl.14', ok: 'on.both', dk: 'gd.minecraft', cov: 'covers/minecraft.jpg' },
    { t: 'LEGO Fortnite', tags: ['Action', 'Adventure', 'Survival'], pegi: 7, pk: 'pl.14', ok: 'on.on', dk: 'gd.legoFn', cov: 'covers/lego-fortnite.jpg' },
    { t: 'Sackboy: A Big Adventure', tags: ['Platformer', 'Adventure', 'Co-op'], pegi: 7, pk: 'pl.14', ok: 'on.off', dk: 'gd.sackboy', cov: 'covers/sackboy.jpg' },
    { t: 'LEGO Harry Potter Collection', tags: ['Adventure', 'Action', 'Puzzle'], pegi: 7, pk: 'pl.12', ok: 'on.off', dk: 'gd.legoHp', cov: 'covers/lego-hp.jpg' },
    { t: 'Rocket League', tags: ['Sports', 'Racing', 'Multiplayer'], pegi: 3, pk: 'pl.14', ok: 'on.both', dk: 'gd.rocket', cov: 'covers/rocket-league.jpg' },
    { t: 'Fall Guys', tags: ['Party', 'Action', 'Multiplayer'], pegi: 3, pk: 'pl.14', ok: 'on.on', dk: 'gd.fall', cov: 'covers/fall-guys.jpg' }
  ];
  var ADULTS = [
    { t: 'EA SPORTS FC 26', tags: ['Sports', 'Football', 'Multiplayer', 'Competitive'], pegi: 3, pk: 'pl.14', ok: 'on.both', dk: 'gd.fc26', cov: 'covers/fc26.jpg' },
    { t: 'NBA 2K24', tags: ['Sports', 'Basketball', 'Multiplayer', 'Competitive'], pegi: 3, pk: 'pl.14', ok: 'on.both', dk: 'gd.nba', cov: 'covers/nba2k24.jpg' },
    { t: 'Call of Duty: Modern Warfare III', tags: ['Action', 'Shooter', 'Multiplayer', 'War'], pegi: 18, pk: 'pl.14', ok: 'on.on', dk: 'gd.cod', cov: 'covers/cod-mw3.jpg' },
    { t: 'Grand Theft Auto V', tags: ['Action', 'Open World', 'Adventure', 'Multiplayer'], pegi: 18, pk: 'pl.14', ok: 'on.both', dk: 'gd.gta', cov: 'covers/gtav.jpg' },
    { t: 'Tekken 8', tags: ['Fighting', 'Arcade', 'Multiplayer', 'Competitive'], pegi: 16, pk: 'pl.12', ok: 'on.off', dk: 'gd.tekken', cov: 'covers/tekken8.jpg' },
    { t: 'UFC 5', tags: ['Sports', 'Fighting', 'Multiplayer', 'Competitive'], pegi: 16, pk: 'pl.12', ok: 'on.both', dk: 'gd.ufc', cov: 'covers/ufc5.jpg' },
    { t: 'Assetto Corsa Competizione', tags: ['Racing', 'Simulation', 'Multiplayer', 'Competitive'], pegi: 3, pk: 'pl.14', ok: 'on.both', dk: 'gd.assetto', cov: 'covers/assetto.jpg' }
  ];

  function GameRow(g, color, p) {
    return h('div', { className: 'hb-grow', style: { '--c': color } },
      CoverBox(p, g.t, g.cov, 'hb-grow-art'),
      h('div', { className: 'hb-grow-mid' },
        h('h3', null, g.t),
        h('div', { className: 'hb-chips' }, g.tags.map(function (t) { return h('span', { key: t, className: 'hb-chip2' }, ts(p, 'tag.' + t, t)); })),
        h('p', null, ts(p, g.dk, g.d || ''))
      ),
      h('div', { className: 'hb-grow-side' },
        h('div', { className: 'hb-line' }, h('span', { className: 'hb-pegi hb-pegi--' + g.pegi }, String(g.pegi)), h('span', null, ts(p, 'common.pegi', 'PEGI') + ' ' + g.pegi)),
        h('div', { className: 'hb-line' }, h('span', { style: { color: '#8ea2d8' } }, ico(p, 'users', 16)), ts(p, g.pk, g.pl || '')),
        h('div', { className: 'hb-line' }, h('span', { style: { color: '#8ea2d8' } }, ico(p, 'pad', 16)), 'PS5'),
        h('div', { className: 'hb-line' }, h('span', { style: { color: '#8ea2d8' } }, ico(p, 'wifi', 16)), ts(p, g.ok, g.on || ''))
      )
    );
  }

  function sysLabel(p, sys) {
    return pick({ fa: sys.nameFa, en: sys.nameEn || sys.name, tr: sys.nameTr, ru: sys.nameRu }, langOf(p)) || sys.name || sys.id;
  }
  function liveSystems(p) {
    var list = p.systems || [];
    var out = [];
    var i, s;
    for (i = 0; i < list.length; i++) {
      s = list[i];
      if (!s || s.isActive === false) continue;
      out.push(s);
    }
    return out;
  }
  function filterAudience(list, audience) {
    var out = [];
    var i, a;
    for (i = 0; i < list.length; i++) {
      a = String(list[i].audience || '').toLowerCase();
      if (!audience || !a || a === audience) out.push(list[i]);
    }
    return out;
  }
  function nextSlot() {
    var d = new Date(Date.now() + 90 * 60000);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1); if (m.length < 2) m = '0' + m;
    var day = String(d.getDate()); if (day.length < 2) day = '0' + day;
    var h = String(d.getHours()); if (h.length < 2) h = '0' + h;
    return { date: y + '-' + m + '-' + day, hour: h };
  }
  function holdBay(p, sys, hours, extras, reqGame) {
    if (!sys) return false;
    if (sys.isReserved) return false;
    if (!p.user) { doLogin(p); return false; }
    if (String(sys.id).indexOf('demo-') === 0) return 'desk';
    var slot = nextSlot();
    var startH = Number(slot.hour);
    var endH = (startH + hours) % 24;
    var sh = String(startH); if (sh.length < 2) sh = '0' + sh;
    var eh = String(endH); if (eh.length < 2) eh = '0' + eh;
    var extraRate = Number((p.settings || {}).extra_controller_hourly) || 25;
    var amt = (Number(sys.hourlyRate) || 0) * hours + (extras || 0) * extraRate * hours;
    var params = { systemId: sys.id, startTime: sh + ':00', endTime: eh + ':00', date: slot.date };
    if (extras) params.extraControllers = extras;
    if (reqGame) params.requestedGame = reqGame;
    if (p.onCheckout) p.onCheckout('reservation', params, amt);
    return true;
  }

  function GamesPage(p) {
    var st = useState('cats'); var view = st[0], setView = st[1];
    var selSt = useState(null); var selId = selSt[0], setSelId = selSt[1];
    var hrSt = useState(2); var hours = hrSt[0], setHours = hrSt[1];
    var exSt = useState(0); var extras = exSt[0], setExtras = exSt[1];
    var rqSt = useState(''); var reqGame = rqSt[0], setReqGame = rqSt[1];
    var msgSt = useState(''); var flash = msgSt[0], setFlash = msgSt[1];
    var systems = liveSystems(p);
    var extraRate = Number((p.settings || {}).extra_controller_hourly) || 25;
    var demo = [
      { id: 'demo-85', name: ts(p, 'games.tv85', '85" TV'), type: 'PS5', hourlyRate: 250, audience: 'adults', isReserved: false, art: asset(p, 'hero-setup.jpg'), sub: ts(p, 'games.plus2', '+ 2 CONTROLLERS'), c: '#33cfff' },
      { id: 'demo-65', name: ts(p, 'games.tv65', '65" TV'), type: 'PS5', hourlyRate: 200, audience: '', isReserved: false, art: asset(p, 'slide-match.jpg'), sub: ts(p, 'games.plus2', '+ 2 CONTROLLERS'), c: '#ff2ea6' }
    ];
    var audience = view === 'kids' ? 'kids' : (view === 'adults' ? 'adults' : null);
    var grid = systems.length ? filterAudience(systems, audience) : demo;
    var selected = null;
    var gi;
    for (gi = 0; gi < grid.length; gi++) if (grid[gi].id === selId) selected = grid[gi];
    var colors = ['#33cfff', '#ff2ea6', '#2ee87e', '#a05cf7', '#ff9a1f'];
    var cards = [];
    for (gi = 0; gi < grid.length; gi++) {
      (function (sys, idx) {
        var c = sys.c || colors[idx % colors.length];
        var art = sys.art || (sys.type === 'PS5' ? asset(p, 'hero-setup.jpg') : asset(p, 'games-gear.jpg'));
        cards.push(h('button', { key: sys.id, type: 'button', className: 'hb-price' + (selId === sys.id ? ' is-on' : ''), style: { '--c': c }, onClick: function () {
          setSelId(sys.id); setFlash('');
          if (sys.isReserved) return;
          var r = holdBay(p, sys, hours, extras, reqGame);
          if (r) setFlash(ts(p, 'games.held', 'Bay held — pay cash or card at the desk.'));
        } },
          h('div', { className: 'hb-price-art', style: { backgroundImage: 'url(' + art + ')' } }),
          h('div', { className: 'hb-price-body' },
            h('h3', null, sysLabel(p, sys)),
            h('small', null, sys.sub || (sys.type || 'PS5')),
            h('div', { className: 'hb-price-tag' }, h('b', null, String(sys.hourlyRate || 0) + ' TL'), h('span', null, ts(p, 'common.hour', '/ HOUR'))),
            h('span', { className: 'hb-price-btn' }, sys.isReserved ? ts(p, 'games.busy', 'IN USE') : ts(p, 'games.hold', 'HOLD MY BAY'))
          )));
      })(grid[gi], gi);
    }
    cards.push(h('button', { key: 'extra', type: 'button', className: 'hb-price' + (extras > 0 ? ' is-on' : ''), style: { '--c': '#2ee87e' }, onClick: function () { setExtras(extras >= 4 ? 0 : extras + 1); } },
      h('div', { className: 'hb-price-art', style: { backgroundImage: 'url(' + asset(p, 'games-gear.jpg') + ')' } }),
      h('div', { className: 'hb-price-body' },
        h('h3', null, ts(p, 'games.extra', 'EXTRA CONTROLLER')),
        h('small', null, ts(p, 'games.extraSub', 'PER ADDITIONAL CONTROLLER')),
        h('div', { className: 'hb-price-tag' }, h('b', null, String(extraRate) + ' TL'), h('span', null, ts(p, 'common.hour', '/ HOUR'))),
        h('span', { className: 'hb-price-btn' }, extras ? ('+' + extras) : ts(p, 'games.bookNow', 'BOOK'))
      )));

    var hourBtns = [];
    [1, 2, 3, 4].forEach(function (n) {
      hourBtns.push(h('button', { key: n, type: 'button', className: 'hb-hbtn' + (hours === n ? ' is-on' : ''), onClick: function () { setHours(n); } }, n + ' ' + ts(p, 'common.hours', 'H')));
    });
    var bookAmt = selected ? (Number(selected.hourlyRate) || 0) * hours + extras * extraRate * hours : extras * extraRate * hours;
    var bookBox = h('div', { className: 'hb-book hb-box', style: { '--c': '#33cfff' } },
      h('div', { className: 'hb-card-head' }, h('span', { style: { color: '#33cfff' } }, ico(p, 'cal', 22)), h('b', null, ts(p, 'games.bookTitle', 'BOOK A STATION'))),
      h('p', { className: 'hb-book-hint' }, ts(p, 'games.bookHint', 'Pick a station, hours and extra pads — pay cash or card at the desk.')),
      selected ? h('div', { className: 'hb-book-sel' }, h('small', null, ts(p, 'games.selected', 'Selected')), h('b', null, sysLabel(p, selected)), h('span', null, String(selected.hourlyRate) + ' TL ' + ts(p, 'common.hour', '/ HOUR')))
        : h('p', { className: 'hb-book-hint' }, ts(p, 'games.needSys', 'Select a station first')),
      h('div', { className: 'hb-book-row' }, h('small', null, ts(p, 'games.duration', 'Duration')), h('div', { className: 'hb-hbtns' }, hourBtns)),
      h('div', { className: 'hb-book-row' }, h('small', null, ts(p, 'games.extras', 'Extra controllers') + ' × ' + extras)),
      h('input', { className: 'hb-book-input', value: reqGame, placeholder: ts(p, 'games.reqTitle', 'Game title'), onChange: function (e) { setReqGame(e.target.value); } }),
      h('div', { className: 'hb-book-total' }, h('b', null, String(bookAmt) + ' TL'), h('span', null, ts(p, 'games.deskPay', 'Cash or card at the desk — no online payment.'))),
      flash ? h('p', { className: 'hb-book-ok' }, flash) : null,
      h('button', { type: 'button', className: 'hb-cta hb-hold-cta', onClick: function () {
        if (!selected) { setFlash(ts(p, 'games.needSys', 'Select a station first')); return; }
        if (selected.isReserved) { setFlash(ts(p, 'games.busy', 'IN USE')); return; }
        if (!p.user) { doLogin(p); return; }
        var r = holdBay(p, selected, hours, extras, reqGame);
        setFlash(r ? ts(p, 'games.held', 'Bay held — pay cash or card at the desk.') : ts(p, 'games.hold', 'HOLD MY BAY'));
      } }, ts(p, 'games.hold', 'HOLD MY BAY'))
    );

    var systemsBlock = h('div', { className: 'hb-wrap' },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 14, margin: '6px 0 14px' } },
        h('span', { style: { color: '#ffc93c' } }, ico(p, 'monitor', 26)),
        h('b', { style: { fontFamily: 'var(--hb-font-d)', letterSpacing: 2, fontSize: 17 } }, ts(p, 'games.systems', 'SYSTEMS & GEAR')),
        h('small', { style: { color: '#97a1c2', fontWeight: 600 } }, ts(p, 'games.systemsHint', '— book a station'))
      ),
      grid.length ? h('div', { className: 'hb-prices' }, cards) : h('p', { style: { color: '#97a1c2', fontWeight: 600 } }, ts(p, 'games.noSys', 'No systems yet.')),
      bookBox
    );

    var body;
    if (view === 'kids') {
      body = h('div', null,
        h(PHero, { img: asset(p, 'games-kids.jpg'), icon: h('span', { style: { color: '#33cfff' } }, ico(p, 'users', 44)), title: ts(p, 'games.kids', 'KIDS'), em: ts(p, 'games.kidsEm', 'GAMES'), sub: ts(p, 'games.kidsSub', 'FUN & SAFE GAMES FOR YOUNGER PLAYERS'), back: function () { setView('cats'); }, backLabel: ts(p, 'common.backGames', 'BACK TO GAMES'), scriptR: ts(p, 'common.script', 'Good Games\nGood People') }),
        h('div', { className: 'hb-wrap hb-rows' }, KIDS.map(function (g) { return GameRow(g, '#a05cf7', p); }))
      );
    } else if (view === 'adults') {
      body = h('div', null,
        h(PHero, { img: asset(p, 'games-adults.jpg'), icon: h('span', { style: { color: '#ff2e6f' } }, ico(p, 'pad', 44)), title: ts(p, 'games.adults', 'ADULTS'), em: ts(p, 'games.adultsEm', 'GAMES'), sub: ts(p, 'games.adultsSub', 'ACTION • SPORTS • RACING • AND MORE'), back: function () { setView('cats'); }, backLabel: ts(p, 'common.backGames', 'BACK TO GAMES'), scriptR: ts(p, 'common.script', 'Good Games\nGood People') }),
        h('div', { className: 'hb-wrap hb-rows' }, ADULTS.concat(extraGames(p, KIDS.concat(ADULTS))).map(function (g) { return GameRow(g, '#ff2e6f', p); }))
      );
    } else if (view === 'requests') {
      body = h('div', null,
        h(PHero, { img: asset(p, 'games-requests.jpg'), icon: h('span', { style: { color: '#ff9a1f' } }, ico(p, 'chat', 44)), title: ts(p, 'games.req', 'GAME'), em: ts(p, 'games.reqEm', 'REQUESTS'), sub: ts(p, 'games.reqSub', 'SUGGEST NEW GAMES AND JOIN THE COMMUNITY'), back: function () { setView('cats'); }, backLabel: ts(p, 'common.backGames', 'BACK TO GAMES') }),
        h('div', { className: 'hb-wrap' },
          h('form', { className: 'hb-box', style: { '--c': '#ff9a1f', padding: 24, marginBottom: 26 }, onSubmit: function (e) { e.preventDefault(); setFlash(ts(p, 'games.reqOk', 'Request saved')); } },
            h('div', { className: 'hb-frow' },
              h('div', { className: 'hb-field hb-field--plain' }, h('input', { placeholder: ts(p, 'games.reqTitle', 'Game title'), value: reqGame, onChange: function (e) { setReqGame(e.target.value); } })),
              h('div', { className: 'hb-field hb-field--plain' }, h('input', { placeholder: ts(p, 'games.reqPlat', 'Platform (PS5 / PC …)') }))
            ),
            h('div', { className: 'hb-field hb-field--plain' }, h('input', { placeholder: ts(p, 'games.reqWhy', 'Why should Bazino add it?') })),
            h('button', { type: 'submit', className: 'hb-cta', style: { marginTop: 12 } }, ts(p, 'games.reqSend', 'SEND REQUEST')),
            flash ? h('p', { className: 'hb-book-ok' }, flash) : null
          ))
      );
    } else {
      body = h('div', { className: 'hb-cats-panel' },
        h('div', { className: 'hb-cats-title' }, h('span', { style: { color: '#ff2ea6' } }, ico(p, 'pad', 34)), ts(p, 'nav.games', 'GAMES')),
        h('div', { className: 'hb-cats-sub' }, ts(p, 'games.choose', 'CHOOSE A CATEGORY')),
        h('div', { className: 'hb-cats' },
          h('button', { type: 'button', className: 'hb-cat', style: { '--c': '#33cfff' }, onClick: function () { setView('kids'); } },
            h('div', { className: 'hb-cat-art', style: { backgroundImage: 'url(' + asset(p, 'games-kids.jpg') + ')' } }, h('span', { className: 'hb-cat-pad' }, ico(p, 'pad', 34))),
            h('div', { className: 'hb-cat-body' }, h('span', null, h('b', null, ts(p, 'games.kids', 'KIDS')), h('small', null, ts(p, 'games.kidsDesc', 'Fun & safe games for younger players'))), h('span', { className: 'hb-cat-go' }, '→'))),
          h('button', { type: 'button', className: 'hb-cat', style: { '--c': '#ff2ea6' }, onClick: function () { setView('adults'); } },
            h('div', { className: 'hb-cat-art', style: { backgroundImage: 'url(' + asset(p, 'games-adults.jpg') + ')' } }, h('span', { className: 'hb-cat-pad' }, ico(p, 'pad', 34))),
            h('div', { className: 'hb-cat-body' }, h('span', null, h('b', null, ts(p, 'games.adults', 'ADULTS')), h('small', null, ts(p, 'games.adultsDesc', 'Action, sports, racing and more'))), h('span', { className: 'hb-cat-go' }, '→'))),
          h('button', { type: 'button', className: 'hb-cat', style: { '--c': '#ff9a1f' }, onClick: function () { setView('requests'); } },
            h('div', { className: 'hb-cat-art', style: { background: 'radial-gradient(120% 120% at 30% 20%, #241505 0%, #0a0f1e 70%)' } }, h('span', { className: 'hb-cat-pad' }, ico(p, 'chat', 34))),
            h('div', { className: 'hb-cat-body' }, h('span', null, h('b', null, ts(p, 'games.req', 'GAME REQUESTS')), h('small', null, ts(p, 'games.reqDesc', 'Suggest new games and join the community'))), h('span', { className: 'hb-cat-go' }, '→')))
        )
      );
    }
    return h('div', null, body, systemsBlock);
  }

  /* ══ EVENTS ══ */
  function EventsSubnav(p, active) {
    var items = [
      { id: 'events', href: '/events', k: 'ev.hero', f: 'EVENTS' },
      { id: 'weekly', href: '/events/weekly', k: 'wk.title', f: 'WEEKLY' },
      { id: 'special', href: '/events/special', k: 'sp.title', f: 'SPECIAL' },
      { id: 'season', href: '/events/season', k: 'sn.title', f: 'SEASON' },
      { id: 'brackets', href: '/events/brackets', k: 'bk.em', f: 'BRACKETS' }
    ];
    var nodes = [];
    var i;
    for (i = 0; i < items.length; i++) {
      (function (it) {
        nodes.push(h('a', {
          key: it.id, href: it.href,
          className: 'hb-esub' + (active === it.id ? ' is-on' : ''),
          onClick: function (e) { e.preventDefault(); go(p, it.href); }
        }, ts(p, it.k, it.f)));
      })(items[i]);
    }
    return h('div', { className: 'hb-wrap' }, h('nav', { className: 'hb-esubnav', 'aria-label': 'events' }, nodes));
  }
  function EventsPage(p) {
    var portals = [
      { c: '#ff2ea6', ic: 'cal', tk: 'ev.weekly', sk: 'ev.weeklyS', art: themeImg(p, 'covers/fc26.jpg'), href: '/events/weekly', btnk: 'ev.weeklyB',
        lik: [['trophy','ev.li1'],['users','ev.li2'],['cal','ev.li3'],['pad','ev.li4'],['star','ev.li5']], dk: 'ev.weeklyD' },
      { c: '#33cfff', ic: 'trophy', tk: 'ev.special', tri: 1, sk: 'ev.specialS', art: themeImg(p, 'covers/ufc5.jpg'), href: '/events/special', btnk: 'ev.specialB',
        lik: [['trophy','ev.li6'],['gift','ev.li7'],['pad','ev.li4'],['star','ev.li8'],['trophy','ev.li9']], dk: 'ev.specialD' },
      { c: '#2ee87e', ic: 'chart', tk: 'ev.season', sk: 'ev.seasonS', art: themeImg(p, 'covers/season-crown.jpg'), href: '/events/season', btnk: 'ev.seasonB',
        lik: [['chart','ev.li10'],['star','ev.li11'],['trophy','ev.li12'],['users','ev.li13'],['crown','ev.li14']], dk: 'ev.seasonD' },
      { c: '#ff9a1f', ic: 'brk', tk: 'ev.brk', sk: 'ev.brkS', art: themeImg(p, 'covers/banner-bracket.jpg'), href: '/events/brackets', btnk: 'ev.brkB',
        lik: [['trophy','ev.li15'],['cal','ev.li16'],['brk','ev.li17'],['eye','ev.li18'],['users','ev.li19']], dk: 'ev.brkD' }
    ];
    var cards = [];
    for (var i = 0; i < portals.length; i++) {
      (function (x) {
        cards.push(h('button', { key: x.tk, type: 'button', className: 'hb-portal', style: { '--c': x.c }, onClick: function () { go(p, x.href); } },
          h('div', { className: 'hb-portal-head' }, h('span', { style: { color: x.c } }, ico(p, x.ic, 34)), h('span', null, h('b', null, ts(p, x.tk, x.tk)), h('small', null, ts(p, x.sk, '')))),
          x.tri ? h('div', { className: 'hb-portal-art hb-portal-art--tri' },
            h('i', { style: { backgroundImage: 'url(' + themeImg(p, 'covers/ufc5.jpg') + ')' } }),
            h('i', { style: { backgroundImage: 'url(' + themeImg(p, 'covers/fc26.jpg') + ')' } }),
            h('i', { style: { backgroundImage: 'url(' + themeImg(p, 'covers/mk1.jpg') + ')' } })
          ) : h('div', { className: 'hb-portal-art', style: { backgroundImage: 'url(' + x.art + ')' } }),
          h('ul', null, x.lik.map(function (li) { return h('li', { key: li[1] }, ico(p, li[0], 15), ts(p, li[1], li[1])); })),
          h('p', null, ts(p, x.dk, '')),
          h('span', { className: 'hb-cta hb-cta--line', style: { '--c': x.c } }, ts(p, x.btnk, x.btnk), ' →')
        ));
      })(portals[i]);
    }
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, ico(p, 'pad', 46)), title: '', em: ts(p,'ev.page','EVENTS'), sub: ts(p,'ev.sub','PLAY • COMPETE • EARN • BE A LEGEND'), tags: ts(p,'ev.tags','TOURNAMENTS   |   SEASON RANKINGS   |   SPECIAL EVENTS   |   REAL PLAYERS   |   REAL PRIZES'), scriptR: 'Play\nCompete\nWin' }),
      h('div', { className: 'hb-wrap hb-portals' }, cards)
    );
  }

  var WEEKLY = [
    { t: 'FC 26 WEEKLY TOURNAMENT', d: 'Show your skills, compete with other players and become this week’s champion!', tags: ['Football', 'Sports', '1v1'], every: 'EVERY', day: 'SATURDAY', maxL: 'MAX', max: '32 PLAYERS', prizeL: 'PRIZE', prize: '500 BC', c: '#ff2ea6', cov: 'covers/fc26.jpg' },
    { t: 'UFC 5 WEEKLY TOURNAMENT', d: 'Step into the octagon and prove you are the best!', tags: ['Fighting', 'Sports', '1v1'], every: 'EVERY', day: 'TUESDAY', maxL: 'MAX', max: '16 PLAYERS', prizeL: 'PRIZE', prize: '300 BC', c: '#33cfff', cov: 'covers/ufc5.jpg' },
    { t: 'MORTAL KOMBAT 1 WEEKLY TOURNAMENT', d: 'Choose your fighter, master your skills and claim victory!', tags: ['Fighting', 'Action', '1v1'], every: 'EVERY', day: 'THURSDAY', maxL: 'MAX', max: '16 PLAYERS', prizeL: 'PRIZE', prize: '300 BC', c: '#ff9a1f', cov: 'covers/mk1.jpg' },
    { t: 'TEKKEN 8 WEEKLY TOURNAMENT', d: 'Fast fights, high skills and non-stop action. Are you ready?', tags: ['Fighting', 'Action', '1v1'], every: 'EVERY', day: 'FRIDAY', maxL: 'MAX', max: '16 PLAYERS', prizeL: 'PRIZE', prize: '300 BC', c: '#ff2ea6', cov: 'covers/tekken8.jpg' }
  ];
  function WeeklyRow(w, p) {
    return h('div', { className: 'hb-erow hb-erow--wk', style: { '--c': w.c } },
      CoverBox(p, w.t, w.cov, 'hb-erow-art'),
      h('div', { className: 'hb-erow-mid' },
        h('h3', null, w.t), h('p', null, w.d),
        h('div', { className: 'hb-chips' }, w.tags.map(function (tg) { return h('span', { key: tg, className: 'hb-chip2' }, ts(p, 'tag.' + tg, tg)); }))
      ),
      h('div', { className: 'hb-wk-stats' },
        h('div', { className: 'hb-wk-stat', style: { color: '#d24bff' } }, ico(p, 'cal', 20), h('small', null, w.every), h('b', null, w.day)),
        h('div', { className: 'hb-wk-stat', style: { color: '#c7cfeb' } }, ico(p, 'users', 20), h('small', null, w.maxL), h('b', null, w.max)),
        h('div', { className: 'hb-wk-stat', style: { color: '#ffc93c' } }, ico(p, 'trophy', 20), h('small', null, w.prizeL), h('b', null, w.prize))
      ),
      h('button', { type: 'button', className: 'hb-cta hb-cta--line hb-erow-cta', style: { '--c': w.c }, onClick: function () { go(p, '/events/brackets'); } }, ts(p, 'wk.details', 'VIEW DETAILS'), ' →')
    );
  }
  function WeeklyPage(p) {
    var list = (p.eventsFeed && p.eventsFeed.weekly) || p.tournaments || [];
    return h('div', null,
      h(PHero, { img: asset(p, 'city-neon.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, ico(p, 'cal', 46)), title: ts(p,'wk.title','WEEKLY'), em: ts(p,'wk.em','TOURNAMENTS'), sub: ts(p,'wk.sub','PLAY • COMPETE • EARN CREDITS • BE A LEGEND'), back: function () { go(p, '/events'); }, backLabel: ts(p, 'common.backEvents', 'BACK TO EVENTS'), scriptR: 'Good Games\nGood People' }),
      h('div', { className: 'hb-wrap', style: { marginBottom: 12 } },
        h('button', { type: 'button', className: 'hb-cta hb-reg-tourney', onClick: function () { go(p, '/events/register'); } }, ts(p, 'rg.hold', 'HOLD MY SEAT'), ' — ', ts(p, 'rg.title', 'REGISTER'), ' ', ts(p, 'rg.em', 'TO PLAY'))
      ),
      h('div', { className: 'hb-wrap hb-rows' }, WEEKLY.map(function (w) { return WeeklyRow(w, p); }))
    );
  }

  var SPECIAL = [
    { t: 'FC 26 CHAMPIONS CUP', d: 'The biggest FC 26 tournament of the season! Compete with the best players and claim the champion title.', tags: ['Football', 'PS5', '1v1', 'Knockout'], date: '12 JULY 2025', time: '18:00', pl: '64 PLAYERS', fee: '150 ₺', p1: '2,000 ₺', p2: '800 ₺', p3: '400 ₺', c: '#33cfff', cov: 'covers/fc26.jpg' },
    { t: 'UFC 5 BAZINO FIGHT NIGHT', d: 'Step into the octagon! A special event with top fighters, bigger prizes and real competition.', tags: ['Fighting', 'PS5', '1v1', 'Knockout'], date: '26 AUGUST 2025', time: '20:00', pl: '32 PLAYERS', fee: '200 ₺', p1: '1,500 ₺', p2: '500 ₺', p3: '250 ₺', c: '#ff2e6f', cov: 'covers/ufc5.jpg' },
    { t: 'MORTAL KOMBAT 1 LEGENDS', d: 'A legendary showdown. Only the strongest will survive!', tags: ['Fighting', 'PS5', '1v1', 'Knockout'], date: 'TO BE ANNOUNCED', time: 'TBA', pl: '32 PLAYERS', fee: '150 ₺', p1: '1,200 ₺', p2: '400 ₺', p3: '250 ₺', c: '#ff9a1f', cov: 'covers/mk1.jpg' },
    { t: 'TEKKEN 8 CHAMPIONSHIP', d: 'A new generation of fighters. Prove your skills and be the legend!', tags: ['Fighting', 'PS5', '1v1', 'Knockout'], date: '10 SEPTEMBER 2025', time: '18:00', pl: '32 PLAYERS', fee: '200 ₺', p1: '1,000 ₺', p2: '350 ₺', p3: '150 ₺', c: '#a05cf7', cov: 'covers/tekken8.jpg' }
  ];
  function SpecialRow(s, p) {
    return h('div', { className: 'hb-erow', style: { '--c': s.c } },
      CoverBox(p, s.t, s.cov, 'hb-erow-art'),
      h('div', { className: 'hb-erow-mid' },
        h('h3', null, s.t), h('p', null, s.d),
        h('div', { className: 'hb-chips' }, s.tags.map(function (t) { return h('span', { key: t, className: 'hb-chip2' }, ts(p, 'tag.' + t, t)); })),
        h('div', { className: 'hb-erow-meta' },
          h('span', { style: { color: '#ff2ea6' } }, ico(p, 'cal', 15), s.date),
          h('span', { style: { color: '#ff2ea6' } }, ico(p, 'clock', 15), s.time),
          h('span', { style: { color: '#c7cfeb' } }, ico(p, 'users', 15), s.pl)
        )
      ),
      h('div', { className: 'hb-erow-side' },
        h('div', { className: 'hb-prizes hb-prizes--sp' },
          h('div', { className: 'hb-prize-cell hb-pc-fee', style: { color: '#ffc93c' } }, ico(p, 'coins', 22), h('span', null, h('small', null, ts(p, 'sp.fee', 'ENTRY FEE')), h('b', null, s.fee))),
          h('div', { className: 'hb-prize-cell', style: { color: '#ff2ea6' } }, ico(p, 'gift', 22), h('span', null, h('small', null, '+10 BC'), h('b', null, ts(p, 'sp.part', 'For Participation')))),
          h('div', { className: 'hb-prize-cell', style: { color: '#ffc93c' } }, ico(p, 'trophy', 20), h('span', null, h('small', null, ts(p, 'sp.1', '1ST PLACE')), h('b', null, s.p1))),
          h('div', { className: 'hb-prize-cell', style: { color: '#c0d0ff' } }, ico(p, 'trophy', 20), h('span', null, h('small', null, ts(p, 'sp.2', '2ND PLACE')), h('b', null, s.p2))),
          h('div', { className: 'hb-prize-cell', style: { color: '#ff8c3c' } }, ico(p, 'trophy', 20), h('span', null, h('small', null, ts(p, 'sp.3', '3RD PLACE')), h('b', null, s.p3)))
        )
      )
    );
  }
  function SpecialPage(p) {
    return h('div', null,
      h(PHero, { img: asset(p, 'slide-city.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, ico(p, 'trophy', 46)), title: ts(p,'sp.title','SPECIAL'), em: ts(p,'sp.em','EVENTS'), sub: ts(p,'sp.sub','BIGGER GAMES • HIGHER PRIZES • RARE MOMENTS'), back: function () { go(p, '/events'); }, backLabel: ts(p, 'common.backEvents', 'BACK TO EVENTS'), scriptL: 'Epic\nTournaments', scriptR: 'More\nThan\na Game' }),
      h('div', { className: 'hb-wrap hb-rows' }, SPECIAL.map(function (s) { return SpecialRow(s, p); }))
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
    [['SPRING','sn.spring'],['SUMMER','sn.summer'],['AUTUMN','sn.autumn'],['WINTER','sn.winter']].forEach(function (t) {
      tabs.push(h('button', { key: t[0], type: 'button', className: t[0] === tab ? 'is-on' : '', onClick: function () { setTab(t[0]); } }, ts(p, t[1], t[0])));
    });
    var ranges = {
      SPRING: 'SPRING SEASON   |   1 MARCH 2026 – 31 MAY 2026',
      SUMMER: 'SUMMER SEASON   |   1 JUNE 2026 – 31 AUGUST 2026',
      AUTUMN: 'AUTUMN SEASON   |   1 SEPTEMBER 2026 – 30 NOVEMBER 2026',
      WINTER: 'WINTER SEASON   |   1 DECEMBER 2026 – 28 FEBRUARY 2027'
    };
    var lb = [];
    for (var i = 0; i < rows.length; i++) {
      (function (r, idx) {
        var ids = ['1024','0876','0341','0287','0912','0674','0456','0789','0112','0398'];
        lb.push(h('div', { key: r[0] + idx, className: 'hb-lb-row' + (idx < 3 ? ' is-' + (idx + 1) : '') },
          h('span', { className: idx < 3 ? 'hb-medal hb-medal--' + (idx + 1) : 'hb-rankn' }, String(idx + 1)),
          Av(p, idx, 'hb-avimg' + (idx < 3 ? ' hb-avimg--lg' : '')),
          h('span', { className: 'hb-lb-who' }, h('b', null, r[0], idx === 0 ? h('span', { className: 'hb-crownlet' }, '♛') : null), idx < 3 ? h('small', null, '#BZN' + (ids[idx] || '0000')) : null),
          idx < 3 ? h('span', { className: 'hb-gmark' }, 'FC26') : h('span', { className: 'hb-bznid' }, '#BZN' + (ids[idx] || '0000')),
          h('span', { className: 'hb-lb-pts' }, h('b', null, String(r[1])), idx < 3 ? h('small', null, ts(p, 'sn.points', 'POINTS')) : null)
        ));
      })(rows[i], i);
    }
    var top3 = [];
    var t3c = ['#ffc93c', '#c0d0ff', '#ff8c3c'];
    for (var k = 0; k < 3 && k < rows.length; k++) {
      (function (r, idx) {
        top3.push(h('div', { key: r[0], className: 'hb-t3 is-' + (idx + 1), style: { '--c': t3c[idx] } },
          h('span', { className: 'hb-medal hb-medal--' + (idx + 1) }, String(idx + 1)),
          Av(p, idx, 'hb-avimg hb-avimg--lg'),
          h('span', { className: 'hb-t3-who' },
            h('small', { style: { color: t3c[idx], letterSpacing: 1.5, fontSize: 10, fontWeight: 700 } }, (idx + 1) + (idx === 0 ? 'ST' : idx === 1 ? 'ND' : 'RD') + ' PLACE'),
            h('b', null, r[0]),
            h('small', null, '#BZN' + (['1024','0876','0341'][idx] || '0000')),
            h('strong', { className: 'hb-pts' }, String(r[1]) + ' Points')
          )
        ));
      })(rows[k], k);
    }
    var clock = h('span', { className: 'hb-season-clockchip' }, ico(p, 'clock', 16), ts(p,'sn.ends','SEASON ENDS IN'), h('b', null, (season && season.daysLeft != null ? season.daysLeft : 45) + ' ' + ts(p,'sn.days','DAYS')));
    return h('div', null,
      h(PHero, { img: asset(p, 'city-neon.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, ico(p, 'chart', 46)), title: ts(p,'sn.title','SEASON'), em: ts(p,'sn.em','RANKING'), sub: ts(p,'sn.sub','EARN POINTS • CLIMB THE LEADERBOARD • BECOME THE SEASON CHAMPION'), back: function () { go(p, '/events'); }, backLabel: ts(p, 'common.backEvents', 'BACK TO EVENTS'), scriptL: 'Play\nCompete\nClimb', scriptR: 'Good Players\nBetter Legends', extra: h('div', { className: 'hb-season-hero' }, h('div', { className: 'hb-season-tabs' }, tabs), h('div', { className: 'hb-season-range' }, ranges[tab] || ranges.SPRING)), chip: clock }),
      h('div', { className: 'hb-wrap' },
        h('div', { className: 'hb-season-grid' },
          h('div', { className: 'hb-box', style: { '--c': '#ff2ea6' } },
            h('div', { className: 'hb-ps-head' }, h('span', { style: { color: '#ffc93c' } }, ico(p, 'chart', 30)), h('span', null, h('b', null, ts(p,'sn.ptsSys','POINT SYSTEM')), h('small', null, ts(p,'sn.ptsHint','Earn season points by ranking in tournaments.')))),
            h('div', { className: 'hb-ps-box', style: { '--c2': '#33cfff' } },
              h('h4', null, h('span', { style: { color: '#33cfff' } }, ico(p, 'cal', 16)), ts(p,'sn.weekly','WEEKLY TOURNAMENTS')),
              h('div', { className: 'hb-line' }, h('span', null, ts(p,'sn.1st','1st Place')), h('b', null, '5 Points')),
              h('div', { className: 'hb-line' }, h('span', null, ts(p,'sn.2nd','2nd Place')), h('b', null, '2 Points')),
              h('div', { className: 'hb-line' }, h('span', null, ts(p,'sn.3rd','3rd Place')), h('b', null, '1 Point'))
            ),
            h('div', { className: 'hb-ps-box', style: { '--c2': '#a05cf7' } },
              h('h4', null, h('span', { style: { color: '#ff2ea6' } }, ico(p, 'star', 16)), ts(p,'sn.special','SPECIAL EVENTS')),
              h('div', { className: 'hb-line' }, h('span', null, ts(p,'sn.1st','1st Place')), h('b', null, '10 Points')),
              h('div', { className: 'hb-line' }, h('span', null, ts(p,'sn.2nd','2nd Place')), h('b', null, '4 Points')),
              h('div', { className: 'hb-line' }, h('span', null, ts(p,'sn.3rd','3rd Place')), h('b', null, '2 Points'))
            ),
            h('div', { style: { padding: '4px 18px 18px', display: 'flex', gap: 12, alignItems: 'center' } },
              h('span', { style: { color: '#ff2ea6' } }, ico(p, 'pad', 40)),
              h('span', { style: { fontFamily: 'var(--hb-font-s)', color: '#4dd7ff', fontSize: 17, lineHeight: 1.3, textShadow: '0 0 10px rgba(77,215,255,.7)' } }, 'Play More', h('br', null), 'Earn More', h('br', null), 'Be the Champion!')
            )
          ),
          h('div', { className: 'hb-box', style: { '--c': '#33cfff' } },
            h('div', { className: 'hb-ps-head' }, h('span', { style: { color: '#ffc93c' } }, ico(p, 'trophy', 28)), h('b', null, ts(p,'sn.lb','SEASON LEADERBOARD')), h('small', { style: { marginLeft: 'auto' } }, 'FC26 • PS5 • 1v1')),
            h('div', { className: 'hb-lb-cols' }, h('span', null, '#'), h('span', null, ''), h('span', null, ts(p,'sn.player','PLAYER')), h('span', null, 'BZN ID'), h('span', null, ts(p,'sn.points','POINTS'))),
            h('div', { className: 'hb-lb-list' }, lb)
          ),
          h('div', { className: 'hb-box', style: { '--c': '#ff2ea6' } },
            h('div', { className: 'hb-ps-head' }, h('span', { style: { color: '#ffc93c' } }, ico(p, 'crown', 26)), h('b', null, ts(p,'sn.top3','CURRENT SEASON TOP 3'))),
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
  function roundN(n) { return Math.round(n * 10) / 10; }
  function elbowPath(x1, y1, x2, y2, radius, split) {
    radius = radius == null ? 11 : radius;
    split = split == null ? 0.52 : split;
    var dx = x2 - x1, dy = y2 - y1;
    if (Math.abs(dy) < 0.8) return 'M ' + roundN(x1) + ' ' + roundN(y1) + ' L ' + roundN(x2) + ' ' + roundN(y2);
    var midX = x1 + dx * split;
    var sx = dx >= 0 ? 1 : -1;
    var sy = dy >= 0 ? 1 : -1;
    var r = Math.max(2, Math.min(radius, Math.abs(midX - x1) * 0.8, Math.abs(x2 - midX) * 0.8, Math.abs(dy) / 2));
    return 'M ' + roundN(x1) + ' ' + roundN(y1)
      + ' L ' + roundN(midX - sx * r) + ' ' + roundN(y1)
      + ' Q ' + roundN(midX) + ' ' + roundN(y1) + ' ' + roundN(midX) + ' ' + roundN(y1 + sy * r)
      + ' L ' + roundN(midX) + ' ' + roundN(y2 - sy * r)
      + ' Q ' + roundN(midX) + ' ' + roundN(y2) + ' ' + roundN(midX + sx * r) + ' ' + roundN(y2)
      + ' L ' + roundN(x2) + ' ' + roundN(y2);
  }
  function smoothPath(x1, y1, x2, y2, bend) {
    bend = bend == null ? 0.5 : bend;
    var dx = x2 - x1;
    var s = dx >= 0 ? 1 : -1;
    var c = Math.abs(dx) * bend;
    return 'M ' + roundN(x1) + ' ' + roundN(y1) + ' C ' + roundN(x1 + s * c) + ' ' + roundN(y1) + ', ' + roundN(x2 - s * c) + ' ' + roundN(y2) + ', ' + roundN(x2) + ' ' + roundN(y2);
  }
  function wireAnchor(el, lr, side) {
    var r = el.getBoundingClientRect();
    var x = r.left - lr.left, y = r.top - lr.top;
    if (side === 'left') return { x: x, y: y + r.height / 2 };
    if (side === 'right') return { x: x + r.width, y: y + r.height / 2 };
    if (side === 'top') return { x: x + r.width / 2, y: y };
    if (side === 'bottom') return { x: x + r.width / 2, y: y + r.height };
    return { x: x + r.width / 2, y: y + r.height / 2 };
  }
  function wireMerge(links, prefix, fromR, toR, nTargets, tone) {
    var i;
    for (i = 0; i < nTargets; i++) {
      links.push({ from: prefix + fromR + '-' + (i * 2), to: prefix + toR + '-' + i, tone: tone, kind: 'elbow' });
      links.push({ from: prefix + fromR + '-' + (i * 2 + 1), to: prefix + toR + '-' + i, tone: tone, kind: 'elbow' });
    }
  }
  function HbWireLayer(x) {
    var hold = useState(null);
    var layer = hold[0], setLayer = hold[1];
    var dr = useState([]);
    var paths = dr[0], setPaths = dr[1];
    function paint() {
      if (!layer) return;
      var lr = layer.getBoundingClientRect();
      var list = x.links || [];
      var out = [];
      var i, link, a, b, ar, br, fromA, toA, p1, p2, d;
      for (i = 0; i < list.length; i++) {
        link = list[i];
        a = layer.querySelector('[data-wire="' + link.from + '"]');
        b = layer.querySelector('[data-wire="' + link.to + '"]');
        if (!a || !b) continue;
        ar = a.getBoundingClientRect();
        br = b.getBoundingClientRect();
        fromA = link.fromAnchor || (ar.left <= br.left ? 'right' : 'left');
        toA = link.toAnchor || (ar.left <= br.left ? 'left' : 'right');
        p1 = wireAnchor(a, lr, fromA);
        p2 = wireAnchor(b, lr, toA);
        d = link.kind === 'smooth' ? smoothPath(p1.x, p1.y, p2.x, p2.y, link.bend) : elbowPath(p1.x, p1.y, p2.x, p2.y, link.radius, link.split);
        out.push({ key: link.from + '>' + link.to + '#' + i, d: d, tone: link.tone || 'cyan' });
      }
      setPaths(out);
    }
    useEffect(function () {
      paint();
      var t1 = window.setTimeout(paint, 40);
      var t2 = window.setTimeout(paint, 240);
      window.addEventListener('resize', paint);
      var ro = null;
      if (layer && typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(function () { paint(); });
        ro.observe(layer);
      }
      return function () {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.removeEventListener('resize', paint);
        if (ro) ro.disconnect();
      };
    }, [layer, x.rev]);
    var nodes = [];
    var k;
    for (k = 0; k < paths.length; k++) {
      nodes.push(h('g', { key: paths[k].key, className: 'hb-wire hb-wire--' + paths[k].tone },
        h('path', { className: 'hb-wire-glow', d: paths[k].d }),
        h('path', { className: 'hb-wire-mid', d: paths[k].d, stroke: 'url(#hb-wire-grad-' + paths[k].tone + ')' }),
        h('path', { className: 'hb-wire-core', d: paths[k].d })
      ));
    }
    return h('div', { className: 'hb-wire-layer', ref: function (el) { if (el && el !== layer) setLayer(el); } },
      h('svg', { className: 'hb-wire-svg', 'aria-hidden': 'true' },
        h('defs', null,
          h('linearGradient', { id: 'hb-wire-grad-cyan', x1: '0', y1: '0', x2: '1', y2: '1' }, h('stop', { offset: '0%', stopColor: '#33cfff' }), h('stop', { offset: '100%', stopColor: '#7a5cff' })),
          h('linearGradient', { id: 'hb-wire-grad-magenta', x1: '1', y1: '0', x2: '0', y2: '1' }, h('stop', { offset: '0%', stopColor: '#ff2ea6' }), h('stop', { offset: '100%', stopColor: '#a05cf7' })),
          h('linearGradient', { id: 'hb-wire-grad-gold', x1: '0', y1: '0', x2: '0', y2: '1' }, h('stop', { offset: '0%', stopColor: '#ffe08a' }), h('stop', { offset: '100%', stopColor: '#ff9a1f' }))
        ),
        nodes
      ),
      h('div', { className: x.className || undefined }, x.children)
    );
  }
  function MCard(m, seedA, seedB, wireId, tone) {
    var aw = m.sa > m.sb;
    return h('div', { className: 'hb-mcard' + (tone ? ' hb-mcard--' + tone : ''), 'data-wire': wireId || undefined },
      h('div', { className: 'hb-mrow' + (aw ? ' is-win' : '') }, h('span', { className: 'hb-mseed' }, String(seedA)), h('span', { className: 'hb-mav', style: { '--h': String((m.a.length * 53) % 360) } }), h('span', { className: 'hb-mname', title: m.a }, m.a), h('span', { className: 'hb-mscore' }, String(m.sa))),
      h('div', { className: 'hb-mrow' + (!aw ? ' is-win' : '') }, h('span', { className: 'hb-mseed' }, String(seedB)), h('span', { className: 'hb-mav', style: { '--h': String((m.b.length * 41) % 360) } }), h('span', { className: 'hb-mname', title: m.b }, m.b), h('span', { className: 'hb-mscore' }, String(m.sb)))
    );
  }
  function BracketsPage(p) {
    var st = useState(0); var sel = st[0], setSel = st[1];
    var filtSt = useState('all'); var filt = filtSt[0], setFilt = filtSt[1];
    var kindSt = useState('weekly'); var kind = kindSt[0], setKind = kindSt[1];
    var live = p.bracket || null;
    var rounds = buildTree();
    var champ = rounds[4][0];
    var champName = champ.sa > champ.sb ? champ.a : champ.b;
    var games = [
      { g: 'FC 26', cov: 'covers/fc26.jpg', n: 13, date: '29 Aug 2026', st: 'done', kind: 'weekly' },
      { g: 'UFC 5', cov: 'covers/ufc5.jpg', n: 12, date: '22 Aug 2026', st: 'done', kind: 'weekly' },
      { g: 'Mortal Kombat 1', cov: 'covers/mk1.jpg', n: 11, date: '15 Aug 2026', st: 'done', kind: 'weekly' },
      { g: 'Tekken 8', cov: 'covers/tekken8.jpg', n: 10, date: '8 Aug 2026', st: 'done', kind: 'weekly' },
      { g: 'FC 26', cov: 'covers/fc26.jpg', n: 14, date: '5 Sep 2026', st: 'next', kind: 'weekly' },
      { g: 'FC 26 Champions Cup', cov: 'covers/fc26.jpg', n: 'CUP', date: '12 Jul 2025', st: 'next', kind: 'special' },
      { g: 'UFC 5 Fight Night', cov: 'covers/ufc5.jpg', n: 'CUP', date: '26 Aug 2025', st: 'done', kind: 'special' },
      { g: 'Tekken 8 Championship', cov: 'covers/tekken8.jpg', n: 'CUP', date: '10 Sep 2025', st: 'next', kind: 'special' }
    ];
    var shown = [];
    var i;
    for (i = 0; i < games.length; i++) {
      if (games[i].kind !== kind) continue;
      if (filt === 'cur' && games[i].st !== 'live') continue;
      if (filt === 'up' && games[i].st !== 'next') continue;
      if (filt === 'done' && games[i].st !== 'done') continue;
      shown.push(games[i]);
    }
    if (!shown.length) shown = games.filter(function (g) { return g.kind === kind; });
    var cur = shown[sel] || shown[0] || games[0];
    var tlist = [];
    for (i = 0; i < shown.length; i++) {
      (function (row, idx) {
        var stKey = row.st === 'live' ? 'bk.cur' : (row.st === 'next' ? 'bk.up' : 'bk.done');
        var stCls = row.st === 'live' ? 'hb-st--live' : (row.st === 'next' ? 'hb-st--next' : 'hb-st--done');
        tlist.push(h('button', { key: row.g + row.n, type: 'button', className: 'hb-titem' + (idx === sel ? ' is-on' : ''), onClick: function () { setSel(idx); } },
          h('span', { className: 'hb-tcov', style: { backgroundImage: 'url(' + coverSrc(p, row.g, row.cov) + ')' } }),
          h('span', null,
            h('b', null, row.g),
            h('small', null, row.kind === 'special' ? ts(p, 'bk.specialTab', 'SPECIAL EVENTS') : (ts(p, 'bk.weekly', 'Weekly Tournament') + ' #' + row.n)),
            h('small', null, row.date + ' • 32 Players'),
            h('span', { className: 'hb-st ' + stCls }, ts(p, stKey, row.st.toUpperCase()))
          ),
          h('span', { style: { color: '#66719b' } }, '›')
        ));
      })(shown[i], i);
    }
    function col(roundIdx, label, seedsStart) {
      var ms = rounds[roundIdx];
      var half = [];
      for (var i = 0; i < ms.length / 2; i++) half.push(ms[i]);
      var nodes = [];
      for (var j = 0; j < half.length; j++) nodes.push(MCard(half[j], seedsStart + j * 2, seedsStart + j * 2 + 1, 'L' + roundIdx + '-' + j, 'cyan'));
      return h('div', { key: 'L' + roundIdx, className: 'hb-brk-col' }, h('h4', null, label), nodes);
    }
    function colR(roundIdx, label) {
      var ms = rounds[roundIdx];
      var half = [];
      for (var i = ms.length / 2; i < ms.length; i++) half.push(ms[i]);
      var nodes = [];
      for (var j = 0; j < half.length; j++) nodes.push(MCard(half[j], 17 + j * 2, 18 + j * 2, 'R' + roundIdx + '-' + j, 'magenta'));
      return h('div', { key: 'R' + roundIdx, className: 'hb-brk-col' }, h('h4', null, label), nodes);
    }
    var wires = [];
    wireMerge(wires, 'L', 0, 1, 4, 'cyan');
    wireMerge(wires, 'L', 1, 2, 2, 'cyan');
    wireMerge(wires, 'L', 2, 3, 1, 'cyan');
    wireMerge(wires, 'R', 0, 1, 4, 'magenta');
    wireMerge(wires, 'R', 1, 2, 2, 'magenta');
    wireMerge(wires, 'R', 2, 3, 1, 'magenta');
    wires.push({ from: 'L3-0', to: 'FINAL', tone: 'gold', kind: 'elbow' });
    wires.push({ from: 'R3-0', to: 'FINAL', tone: 'gold', kind: 'elbow' });
    wires.push({ from: 'FINAL', to: 'CHAMP', tone: 'gold', kind: 'smooth', fromAnchor: 'top', toAnchor: 'bottom' });
    var filtBtns = [
      ['all', 'bk.all', 'ALL'],
      ['cur', 'bk.cur', 'CURRENT'],
      ['up', 'bk.up', 'UPCOMING'],
      ['done', 'bk.done', 'COMPLETED']
    ];
    var fnode = [];
    var fi;
    for (fi = 0; fi < filtBtns.length; fi++) {
      (function (fb) {
        fnode.push(h('button', { key: fb[0], type: 'button', className: filt === fb[0] ? 'is-on' : '', onClick: function () { setFilt(fb[0]); setSel(0); } }, ts(p, fb[1], fb[2])));
      })(filtBtns[fi]);
    }
    var boardTitle = live && live.title ? live.title : (kind === 'special' ? (cur.g || '') : ('WEEKLY TOURNAMENT #' + cur.n));
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, ico(p, 'trophy', 46)), title: ts(p,'bk.title','TOURNAMENT'), em: ts(p,'bk.em','BRACKETS'), sub: ts(p,'bk.sub','LIVE & PAST TOURNAMENT RESULTS'), tags: 'REAL PLAYERS   •   REAL MATCHES   •   REAL COMPETITION   •   LASTING LEGENDS', back: function () { go(p, '/events'); }, backLabel: ts(p, 'common.backEvents', 'BACK TO EVENTS'), scriptL: 'Play\nCompete\nWin' }),
      h('div', { className: 'hb-wrap' },
        h('div', { className: 'hb-brk-tabs' },
          h('button', { type: 'button', className: kind === 'weekly' ? 'is-on' : '', onClick: function () { setKind('weekly'); setSel(0); } }, ico(p, 'cal', 16), h('span', null, ts(p, 'bk.weeklyTab', 'WEEKLY TOURNAMENTS'), h('small', null, ts(p, 'bk.weeklyHint', 'Play the weekly championship')))),
          h('button', { type: 'button', className: kind === 'special' ? 'is-on' : '', onClick: function () { setKind('special'); setSel(0); } }, ico(p, 'star', 16), h('span', null, ts(p, 'bk.specialTab', 'SPECIAL EVENTS'), h('small', null, ts(p, 'bk.specialHint', 'Big tournaments & exclusive cups'))))
        )
      ),
      h('div', { className: 'hb-wrap hb-wrap--wide hb-brk-layout' },
        h('div', { className: 'hb-brk-side hb-box', style: { '--c': '#33cfff' } },
          h('h3', null, ts(p,'bk.side','TOURNAMENTS')),
          h('p', null, ts(p,'bk.pick','Select a tournament to view the bracket')),
          h('div', { className: 'hb-filters' }, fnode),
          h('div', { className: 'hb-tlist' }, tlist)
        ),
        h('div', { className: 'hb-brk-board hb-box', style: { '--c': '#33cfff' } },
          h('div', { className: 'hb-brk-head' },
            h('span', { className: 'hb-glogo' }, (cur.g && cur.g.indexOf('FC') === 0) ? 'FC26' : String(cur.g || 'FC26').split(' ')[0]),
            h('h3', null, boardTitle),
            h('span', { className: 'hb-meta' },
              h('span', null, ico(p, 'cal', 14), ' ' + (cur.date || '29 AUGUST 2026')),
              h('span', null, ico(p, 'users', 14), ' 32 PLAYERS'),
              h('span', { style: { color: cur.st === 'live' ? '#2ee87e' : '#ffc93c' } }, ico(p, 'trophy', 14), ' ' + String(cur.st || 'done').toUpperCase())
            )
          ),
          h(HbWireLayer, { className: 'hb-brk-cols', links: wires, rev: kind + '-' + sel + '-' + filt },
            col(0, ts(p,'bk.r32','ROUND OF 32'), 1), col(1, ts(p,'bk.r16','ROUND OF 16'), 1), col(2, ts(p,'bk.qf','QUARTER FINALS'), 1), col(3, ts(p,'bk.sf','SEMI FINALS'), 1),
            h('div', { key: 'final', className: 'hb-brk-col hb-brk-col--final' },
              h('h4', null, ts(p,'bk.f','FINAL')),
              h('div', { className: 'hb-champ', 'data-wire': 'CHAMP' },
                h('span', { className: 'hb-trophy', style: { color: '#ffc93c' } }, ico(p, 'trophy', 64)),
                h('b', null, ts(p,'bk.champ','CHAMPION')),
                Av(p, 0, 'hb-avimg hb-avimg--champ'),
                h('b', { style: { fontSize: 14 } }, champName),
                h('small', null, '#BZN1024')
              ),
              MCard(champ, 1, 2, 'FINAL', 'gold')
            ),
            colR(3, ts(p,'bk.sf','SEMI FINALS')), colR(2, ts(p,'bk.qf','QUARTER FINALS')), colR(1, ts(p,'bk.r16','ROUND OF 16')), colR(0, ts(p,'bk.r32','ROUND OF 32'))
          )
        )
      )
    );
  }

  /* ══ REGISTER ══ */
  function RegisterPage(p) {
    var list = (p.eventsFeed && p.eventsFeed.weekly) || p.tournaments || [];
    var st = useState('0'); var tid = st[0], setTid = st[1];
    var tagSt = useState((p.user && (p.user.displayName || p.user.username)) || ''); var tag = tagSt[0], setTag = tagSt[1];
    var okSt = useState(''); var ok = okSt[0], setOk = okSt[1];
    var opts = [];
    for (var i = 0; i < WEEKLY.length; i++) opts.push(h('option', { key: i, value: String(i) }, WEEKLY[i].t + ' — 150 ₺'));
    return h('div', null,
      h(PHero, { img: themeImg(p, 'covers/mk1.jpg'), icon: h('span', { style: { color: '#2ee87e' } }, ico(p, 'edit', 44)), title: ts(p,'rg.title','REGISTER'), em: ts(p,'rg.em','TO PLAY'), sub: ts(p,'rg.sub','NAME ON THE BRACKET • PAY AT THE DESK'), back: function () { go(p, '/events'); }, backLabel: ts(p, 'common.backEvents', 'BACK TO EVENTS') }),
      h('div', { className: 'hb-wrap' },
        h('form', { className: 'hb-box', style: { '--c': '#2ee87e', padding: 26, marginBottom: 30, maxWidth: 640, marginInline: 'auto' }, onSubmit: function (e) {
          e.preventDefault();
          if (!p.user) { doLogin(p); return; }
          setOk('1');
        } },
          h('div', { className: 'hb-field hb-field--plain' }, h('select', { value: tid, onChange: function (e) { setTid(e.target.value); } }, opts.length ? opts : h('option', null, 'FC 26 WEEKLY — 150 ₺'))),
          h('div', { className: 'hb-field hb-field--plain' }, h('input', { value: tag, onChange: function (e) { setTag(e.target.value); }, placeholder: ts(p,'rg.tag','GAMERTAG ON BRACKET (e.g. ArmanK)') })),
          h('button', { type: 'submit', className: 'hb-cta hb-reg-submit', style: { width: '100%', marginTop: 6 } }, ts(p,'rg.hold','HOLD MY SEAT')),
          ok ? h('p', { className: 'hb-book-ok' }, ts(p,'rg.ok','Seat held — pay the entry fee at the desk. Your name will be on the bracket.')) : null,
          h('p', { style: { color: '#97a1c2', fontWeight: 600, fontSize: 13, textAlign: 'center', margin: '12px 0 0' } }, ts(p,'rg.pay','Entry is paid in cash, card or wallet at the club desk — no online payment.'))
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
          h('h1', null, x.title, h('em', null, ts(p, 'common.coming', 'COMING SOON!'))),
          h('div', { className: 'hb-soon-div' }, h('span', { style: { color: '#a05cf7' } }, ico(p, 'pad', 26))),
          h('p', null, x.l1, h('br', null), x.l2),
          h('button', { type: 'button', className: 'hb-cta hb-cta--line', style: { '--c': '#a05cf7' }, onClick: function () { go(p, '/contact'); } }, x.btn)
        )
      ),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-feats' }, feats))
    );
  }
  function ShopPage(p) {
    return h(SoonPage, { p: p, img: asset(p, 'shop-soon.jpg'), title: ts(p,'nav.shop','SHOP'), btn: ts(p,'common.stay','STAY TUNED'),
      icons: [[ICO.cart, '#a05cf7']], l1: ts(p,'shop.l1',''), l2: ts(p,'shop.l2',''),
      feats: [[ICO.gift, '#7a5cff', ts(p,'shop.f1','EXCLUSIVE ITEMS'), '', ts(p,'shop.f1d','')], [ICO.tag, '#ff2ea6', ts(p,'shop.f2','SPECIAL OFFERS'), '', ts(p,'shop.f2d','')], [ICO.star, '#ff2ea6', ts(p,'shop.f3','HIGH QUALITY'), '', ts(p,'shop.f3d','')], [ICO.lock, '#a05cf7', ts(p,'shop.f4','MEMBER BENEFITS'), '', ts(p,'shop.f4d','')]] });
  }
  function FoodPage(p) {
    return h(SoonPage, { p: p, img: asset(p, 'food-soon.jpg'), title: ts(p,'nav.food','FOOD & DRINKS'), btn: ts(p,'common.stay','STAY TUNED'),
      icons: [[ICO.burger, '#ffc93c'], [ICO.cup, '#ff2ea6'], [ICO.pizza, '#2ee87e']], l1: ts(p,'food.l1',''), l2: ts(p,'food.l2',''),
      feats: [[ICO.burger, '#ffc93c', ts(p,'food.f1','DELICIOUS FOOD'), '', ts(p,'food.f1d','')], [ICO.cup, '#ff2ea6', ts(p,'food.f2','REFRESHING DRINKS'), '', ts(p,'food.f2d','')], [ICO.pizza, '#2ee87e', ts(p,'food.f3','MORE VARIETY'), '', ts(p,'food.f3d','')], [ICO.pad, '#33cfff', ts(p,'food.f4','SAME GREAT ATMOSPHERE'), '', ts(p,'food.f4d','')]] });
  }

  /* ══ CLUB / PROFILE ══ */
  function ClubPage(p) {
    var u = p.user;
    if (!u) {
      return h('div', null,
        h(PHero, { img: asset(p, 'club-interior.jpg'), title: ts(p,'club.my','MY'), em: ts(p,'club.em','PROFILE'), sub: ts(p,'club.sub','GAMER • MEMBER • BAZINO FAMILY') }),
        h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-empty', style: { marginBottom: 30 } }, h('b', null, ts(p,'club.only','MEMBERS ONLY')), h('p', null, ts(p,'club.login','Login to see your profile, credits and member card.')), h('button', { type: 'button', className: 'hb-cta', style: { marginTop: 14 }, onClick: function () { doLogin(p); } }, ts(p, 'hdr.login'))))
      );
    }
    var name = u.displayName || u.username || 'ArmanK';
    var kv = [[ts(p,'club.fn','First Name'), name.split(' ')[0] || name], [ts(p,'club.ln','Last Name'), name.split(' ')[1] || '—'], [ts(p,'club.un','Username'), u.username || name], [ts(p,'club.id','BZN Member ID'), '#BZN1024'], [ts(p,'club.dob','Date of Birth'), '12 May 1998'], [ts(p,'club.ph','Phone Number'), '+90 539 112 37 47']];
    var kvs = [];
    for (var i = 0; i < kv.length; i++) kvs.push(h('div', { key: kv[i][0], className: 'hb-line' }, h('span', { style: { color: '#33cfff' } }, ico(p, 'user', 16)), h('small', null, kv[i][0]), h('b', null, kv[i][1])));
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), title: ts(p,'club.my','MY'), em: ts(p,'club.em','PROFILE'), sub: ts(p,'club.sub','GAMER • MEMBER • BAZINO FAMILY'), scriptL: 'Play\nCompete\nBelong', scriptR: 'Good Games\nGood People' }),
      h('div', { className: 'hb-wrap hb-prof-grid' },
        h('div', { className: 'hb-prof-left' },
          h('div', { className: 'hb-box', style: { '--c': '#33cfff' } },
            h('div', { className: 'hb-card-head' }, h('span', { style: { color: '#33cfff' } }, ico(p, 'user', 24)), h('b', null, ts(p,'club.info','PERSONAL INFORMATION'))),
            h('div', { className: 'hb-prof-main' },
              h('div', { className: 'hb-avatar' }, h('div', { className: 'hb-avin' }, name.charAt(0).toUpperCase())),
              h('div', null,
                h('div', { className: 'hb-kv' }, kvs),
                h('button', { type: 'button', className: 'hb-cta hb-cta--line', style: { '--c': '#ff2ea6', marginTop: 10 }, onClick: function () { go(p, '/profile'); } }, ico(p, 'lock', 15), ts(p,'club.pass','CHANGE PASSWORD'), '→')
              )
            )
          ),
          h('div', { className: 'hb-box', style: { '--c': '#ffc93c' } },
            h('div', { className: 'hb-card-head' }, h('span', { style: { color: '#ffc93c' } }, ico(p, 'trophy', 24)), h('b', null, ts(p,'club.stats','TOURNAMENT STATISTICS'))),
            h('div', { className: 'hb-stats' },
              h('div', { className: 'hb-stat', style: { '--c': '#ffc93c' } }, ico(p, 'trophy', 30), h('b', null, '5'), h('small', null, ts(p,'club.ch1','Championships'))),
              h('div', { className: 'hb-stat', style: { '--c': '#c0d0ff' } }, ico(p, 'medal', 30), h('b', null, '3'), h('small', null, ts(p,'club.ch2','Second Places'))),
              h('div', { className: 'hb-stat', style: { '--c': '#ff8c3c' } }, ico(p, 'medal', 30), h('b', null, '7'), h('small', null, ts(p,'club.ch3','Third Places')))
            )
          )
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
          h('div', { className: 'hb-box hb-credits', style: { '--c': '#ffc93c' } },
            h('span', { style: { color: '#ffc93c' } }, ico(p, 'coins', 40)),
            h('span', null, h('small', { style: { color: '#dfe6ff', letterSpacing: 2, fontWeight: 700 } }, ts(p,'club.credits','BAZINO CREDITS')), h('br', null), h('b', null, String(u.credits != null ? u.credits : '1,250')), h('span', null, ' BC'))
          ),
          h('div', { className: 'hb-box', style: { '--c': '#33cfff', paddingBottom: 12 } },
            h('div', { className: 'hb-card-head' }, h('span', { style: { color: '#c0d0ff' } }, ico(p, 'crown', 24)), h('b', null, ts(p,'club.card','BAZINO MEMBER CARD'))),
            h('div', { className: 'hb-memcard' },
              h('div', { className: 'hb-mc-logo' }, 'BAZINO'), h('small', null, 'GAMING CLUB'),
              h('div', { className: 'hb-mc-script' }, 'PLAY', h('br', null), 'COMPETE', h('br', null), 'EARN', h('br', null), 'BE A LEGEND'),
              h('div', { className: 'hb-mc-mid' },
                h('div', { className: 'hb-avatar', style: { width: 92, height: 92 } }, h('div', { className: 'hb-avin', style: { fontSize: 30 } }, name.charAt(0).toUpperCase())),
                h('span', null, h('b', { style: { fontSize: 19, color: '#fff' } }, name), h('small', { style: { display: 'block' } }, '#BZN1024'))
              ),
              h('div', { className: 'hb-mc-foot' },
                h('span', null, h('small', null, ts(p,'club.since','MEMBER SINCE')), h('b', { style: { color: '#dfe6ff' } }, 'AUG 2026')),
                h('span', null, h('small', { style: { display: 'block', textAlign: 'right' } }, ts(p,'club.status','STATUS')), h('span', { className: 'hb-pill' }, ts(p,'club.active','ACTIVE')))
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
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#ff2ea6' } }, ico(p, 'chat', 44)), title: 'BAZINO', em: ts(p,'blog.em','BLOG'), sub: ts(p,'blog.sub','CLUB NEWS • MATCH REPORTS • STORIES'), scriptR: 'More Than\na Game' }),
      h('div', { className: 'hb-wrap hb-blog-grid' }, posts)
    );
  }

  /* ══ CHAT (disabled by employer) ══ */
  function ChatPage(p) {
    return h('div', null,
      h(PHero, { img: asset(p, 'club-interior.jpg'), icon: h('span', { style: { color: '#33cfff' } }, ico(p, 'chat', 44)), title: ts(p,'nav.club','CLUB'), em: ts(p,'chat.em','CHAT'), sub: 'LOBBY • TABLES • STAFF' }),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-empty', style: { marginBottom: 30 } }, h('b', null, ts(p,'chat.off','CHAT DISABLED')), h('p', null, ts(p,'chat.p','The club chat is temporarily turned off. See you at the lounge!'))))
    );
  }

  /* ══ CONTACT / ABOUT ══ */
  function ContactPage(p) {
    var s = p.settings || {};
    var addr = s.club_address || 'İskele, Long Beach, Hotel VistaMare';
    var map = s.club_map_url || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr));
    var feats = [
      [ICO.pad, '#33cfff', ts(p,'ct.f1','PS5 GAMING'), ts(p,'ct.f1d','Play the latest games on next-gen consoles.')],
      [ICO.monitor, '#a05cf7', ts(p,'ct.f2','BIG SCREEN EXPERIENCE'), ts(p,'ct.f2d','Bigger screens. Bigger moments.')],
      [ICO.trophy, '#7a8cff', ts(p,'ct.f3','TOURNAMENTS & EVENTS'), ts(p,'ct.f3d','Join competitions and win amazing prizes.')],
      [ICO.users, '#ff2ea6', ts(p,'ct.f4','FRIENDLY GAMING SPACE'), ts(p,'ct.f4d','Play, meet, relax and be part of the community.')]
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
          h('div', { className: 'hb-eyebrow' }, ts(p,'ct.eyebrow','CONTACT')),
          h('h1', null, 'BAZINO'),
          h('div', { className: 'hb-clubline' }, 'GAMING CLUB'),
          h('div', { className: 'hb-tag' }, ts(p,'ct.tag','GOOD GAMES. GOOD PEOPLE.')),
          h('p', { className: 'hb-lead' }, ts(p,'ct.lead1','BAZINO is a gaming club created for people who love gaming, competition and spending great time together.')),
          h('p', { className: 'hb-lead', style: { marginTop: -6 } }, ts(p,'ct.lead2','Whether you are a casual player or a serious competitor, BAZINO is the place to play, meet and belong.')),
          h('div', { className: 'hb-about-feats' }, fn),
          h('div', { className: 'hb-visit' },
            h('span', { style: { color: '#d24bff' } }, ico(p, 'pin', 44)),
            h('span', { className: 'hb-vtxt' }, h('small', null, ts(p,'ct.visit','VISIT BAZINO')), h('b', null, addr)),
            h('a', { className: 'hb-cta hb-cta--line', style: { '--c': '#ff2ea6' }, href: map, target: '_blank', rel: 'noreferrer' }, ico(p, 'send', 16), ts(p,'ct.dir','GET DIRECTIONS'))
          )
        )
      )
    );
  }

  /* ══ RULES / PRIVACY ══ */
  function RulesPage(p) {
    var rules = ['ru.1','ru.2','ru.3','ru.4','ru.5','ru.6','ru.7','ru.8'];
    return h('div', null,
      h(PHero, { title: ts(p,'ru.title','CLUB'), em: ts(p,'ru.em','RULES'), sub: ts(p,'ru.sub','FAIR PLAY • RESPECT • FUN') }),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-box hb-legalbox', style: { '--c': '#33cfff' } },
        h('h3', null, ts(p,'ru.h','BAZINO CLUB RULES')),
        h('ol', null, rules.map(function (r) { return h('li', { key: r }, ts(p, r, r)); }))))
    );
  }
  function PrivacyPage(p) {
    return h('div', null,
      h(PHero, { title: ts(p,'pv.title','PRIVACY'), em: ts(p,'pv.em','POLICY'), sub: ts(p,'pv.sub','YOUR DATA • YOUR RIGHTS') }),
      h('div', { className: 'hb-wrap' }, h('div', { className: 'hb-box hb-legalbox', style: { '--c': '#a05cf7' } },
        h('h3', null, ts(p,'pv.title','PRIVACY')),
        h('p', { style: { color: '#c7cfeb', fontWeight: 600, lineHeight: 1.9 } }, ts(p,'pv.body','Bazino stores only the information you provide (name, username, phone) to run club memberships, tournaments and credits. Data is never sold. Contact the desk or WhatsApp for correction or deletion requests.'))))
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
