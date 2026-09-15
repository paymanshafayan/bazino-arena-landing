(function () {
  'use strict';
  var S = window.BazinoThemeSDK;
  if (!S || !S.registerComponent || !S.React) return;
  var R = S.React;
  var h = R.createElement;
  function txt(v, l) { return typeof v === 'string' ? v : (v && (v[l] || v.fa || v.en)) || ''; }
  function pad(n) { n = String(n); while (n.length < 4) n = '0' + n; return n; }
  var dockItems = [
    ['home', 'خانه', 'Home', 'portal-menu/home.jpg', 'menu-icons/home.png', '/'],
    ['games', 'بازی‌ها', 'Games', 'portal-menu/games.jpg', 'menu-icons/games.png', '/games'],
    ['cafe', 'کافه', 'Cafe', 'portal-menu/cafe.jpg', 'menu-icons/cafe.png', '/cafe'],
    ['shop', 'فروشگاه', 'Shop', 'portal-menu/shop.jpg', 'menu-icons/shop.png', '/shop'],
    ['tournaments', 'مسابقات', 'Arena', 'portal-menu/tournaments.jpg', 'menu-icons/tournaments.png', '/events'],
    ['loyalty', 'باشگاه', 'Club', 'portal-menu/loyalty.jpg', 'menu-icons/loyalty.png', '/club'],
    ['blog', 'بلاگ', 'Blog', 'portal-menu/blog.jpg', 'menu-icons/blog.png', '/blog']
  ];
  var destinationCtas = {
    fa: ['رفتن به خانه', 'مشاهده بازی‌ها', 'مشاهده منوی کافه', 'ورود به فروشگاه', 'مشاهده مسابقات', 'ورود به باشگاه', 'مطالعه بلاگ'],
    en: ['Go home', 'Explore games', 'View cafe menu', 'Enter shop', 'View tournaments', 'Enter club', 'Read blog'],
    tr: ['Ana sayfaya git', 'Oyunları keşfet', 'Kafe menüsünü gör', 'Mağazaya gir', 'Turnuvaları gör', 'Kulübe gir', 'Blogu oku'],
    ru: ['На главную', 'Смотреть игры', 'Меню кафе', 'Открыть магазин', 'Смотреть турниры', 'Войти в клуб', 'Читать блог']
  };
  function Home(p) {
    p = p || {};
    var l = p.language || p.lang || 'fa';
    var dir = p.dir || (l === 'fa' ? 'rtl' : 'ltr');
    var ts = typeof p.ts === 'function' ? p.ts : function (k) { return k; };
    var base = String(p.assetsBase || '');
    if (base && base.charAt(base.length - 1) !== '/') base += '/';
    var hero = R.useRef(null), canvas = R.useRef(null), aura = R.useRef(null), imgs = R.useRef([]);
    var target = R.useRef(0), current = R.useRef(0), last = R.useRef(null), root = R.useRef(null);
    var activeState = R.useState(0), active = activeState[0], setActive = activeState[1];
    var orbitState = R.useState({ genres: 0, staff: 0 }), orbit = orbitState[0], setOrbit = orbitState[1];
    R.useEffect(function () {
      var c = canvas.current, box = hero.current;
      if (!c || !box) return;
      var x = c.getContext('2d', { alpha: false }), dead = false, raf = 0, next = 0;
      function load(i) { if (imgs.current[i]) return; var im = new Image(); im.decoding = 'async'; im.onload = function () { if (!dead) imgs.current[i] = im; }; im.src = base + 'video-sequence/frame-' + pad(i + 1) + '.webp'; }
      for (var i = 0; i < 18; i++) load(i);
      next = 18;
      function batch() { if (dead || next >= 394) return; var e = Math.min(next + 20, 394); for (; next < e; next++) load(next); setTimeout(batch, 90); }
      setTimeout(batch, 250);
      function draw() {
        var d = Math.min(devicePixelRatio || 1, 1.5), w = c.clientWidth, ht = c.clientHeight;
        if (c.width !== Math.round(w * d) || c.height !== Math.round(ht * d)) { c.width = Math.round(w * d); c.height = Math.round(ht * d); }
        x.setTransform(d, 0, 0, d, 0, 0);
        current.current += (target.current - current.current) * .105;
        var im = imgs.current[Math.max(0, Math.min(393, Math.round(current.current * 393)))];
        x.fillStyle = '#020305'; x.fillRect(0, 0, w, ht);
        if (im) { var scale = Math.min(w / im.naturalWidth, ht / im.naturalHeight), dw = im.naturalWidth * scale, dh = im.naturalHeight * scale; x.drawImage(im, (w - dw) / 2, (ht - dh) / 2, dw, dh); }
        raf = requestAnimationFrame(draw);
      }
      raf = requestAnimationFrame(draw);
      return function () { dead = true; cancelAnimationFrame(raf); };
    }, [base]);
    R.useEffect(function () {
      var box = root.current; if (!box) return;
      var els = box.querySelectorAll('[data-reveal]');
      if (!window.IntersectionObserver) { for (var q = 0; q < els.length; q++) els[q].classList.add('is-in'); return; }
      var io = new IntersectionObserver(function (es) { for (var i = 0; i < es.length; i++) es[i].target.classList.toggle('is-in', es[i].isIntersecting); }, { threshold: .08, rootMargin: '-4% 0px' });
      for (var j = 0; j < els.length; j++) io.observe(els[j]);
      return function () { io.disconnect(); };
    }, []);
    function heroMove(e) {
      var b = hero.current.getBoundingClientRect(), prev = last.current;
      last.current = e.clientX;
      if (prev !== null) target.current = Math.max(0, Math.min(1, target.current + (e.clientX - prev) / b.width * 1.12));
      if (aura.current) { aura.current.style.transform = 'translate3d(' + (e.clientX - b.left) + 'px,' + (e.clientY - b.top) + 'px,0) translate(-50%,-50%)'; aura.current.classList.add('is-visible'); }
    }
    function cardMove(e) { var b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', (((e.clientX - b.left) / b.width - .5) * 2).toFixed(3)); e.currentTarget.style.setProperty('--my', (((e.clientY - b.top) / b.height - .5) * 2).toFixed(3)); }
    function card(item, i, orbitGroup, orbitActive, orbitLength) {
      var orbitPos = orbitGroup ? ((i - orbitActive + orbitLength) % orbitLength) : -1;
      var image = item.imageUrl || item.image || item.avatar || '';
      var title = txt(item.title || item.name, l) || item.game || item.gamerTag || '';
      var body = txt(item.subtitle || item.desc || item.description || item.role || item.duration, l) || item.specialty || '';
      return h('article', { className: 'a3-card a3-card-' + i + (orbitGroup ? ' a3-orbit-card a3-orbit-pos-' + orbitPos : ''), key: item.id || i, onPointerMove: cardMove }, image ? h('img', { src: image, alt: '' }) : h('div', { className: 'a3-graphic' }, h('i'), h('i'), h('i')), h('span', null, '0' + (i + 1)), h('h3', null, title), body ? h('p', null, body) : null, item.teamA ? h('strong', null, item.teamA + '  ' + item.scoreA + ' : ' + item.scoreB + '  ' + item.teamB) : null);
    }
    function orbitMove(group, count, e) {
      if (count < 2) return; var node = e.currentTarget, x = e.clientX, prior = Number(node.getAttribute('data-orbit-x'));
      if (!prior) { node.setAttribute('data-orbit-x', String(x)); return; } var delta = x - prior; if (Math.abs(delta) < 70) return;
      node.setAttribute('data-orbit-x', String(x)); setOrbit(function (old) { var next = { genres: old.genres, staff: old.staff }; next[group] = (next[group] + (delta > 0 ? 1 : -1) + count) % count; return next; });
    }
    var groups = [['03', 'genres', p.gameGenres || []], ['04', 'lounges', p.loungeSections || []], ['05', 'results', p.matchHistory || []], ['06', 'tournaments', p.tournaments || []], ['07', 'pricing', p.pricingPackages || []], ['08', 'staff', p.staffTeam || []]];
    var selected = dockItems[active], settings = p.settings || {};
    var address = settings.club_address || settings.address || '';
    var phone = settings.club_phone || settings.phone || settings.contact_phone || '';
    return h('main', { className: 'a3-root', ref: root, dir: dir },
      h('section', { className: 'a3-hero', ref: hero, onPointerMove: heroMove, onPointerLeave: function () { last.current = null; if (aura.current) aura.current.classList.remove('is-visible'); } },
        h('img', { className: 'a3-hero-worlds', src: base + 'hero-mona-worlds.jpg', alt: '' }), h('canvas', { ref: canvas }), h('div', { className: 'a3-shade' }), h('div', { className: 'a3-aura', ref: aura }, h('i')),
        h('div', { className: 'a3-hero-copy' }, h('small', null, 'BAZINO PRO / VIRTUAL TOUR'), h('h1', null, l === 'fa' ? 'وارد بازی شو.' : 'ENTER THE GAME.'), h('p', null, l === 'fa' ? 'مسیر واقعی بازینو، فریم‌به‌فریم.' : 'Bazino, frame by frame.'), h('button', { onClick: function () { if (p.onNavigate) p.onNavigate('reservations'); } }, ts('reserve')))),
      h('section', { className: 'a3-dock-scene' },
        h('nav', { className: 'a3-dock', 'aria-label': 'Portal' }, dockItems.map(function (d, i) { return h('button', { key: d[0], className: i === active ? 'is-active' : '', onPointerEnter: function () { setActive(i); }, onFocus: function () { setActive(i); }, onClick: function () { setActive(i); } }, i ? h('b', null, h('i')) : null, h('em', null, h('img', { src: base + d[4], alt: '', 'aria-hidden': 'true' })), h('span', null, l === 'fa' ? d[1] : d[2])); })),
        h('div', { className: 'a3-destination', key: selected[0] }, h('img', { src: base + selected[3], alt: '' }), h('div', null, h('small', null, 'PORTAL DESTINATION / 0' + (active + 1)), h('h2', null, l === 'fa' ? selected[1] : selected[2]), h('button', { onClick: function () { if (p.onNavigate) p.onNavigate(selected[5]); } }, (destinationCtas[l] || destinationCtas.en)[active] + '  ←')))),
      groups.map(function (g) { var list = g[2]; if (!list.length) return null; return h('section', { className: 'a3-section a3-' + g[1], key: g[1], 'data-reveal': '1' }, h('header', null, h('small', null, g[0] + ' / ARENA CIRCUIT'), h('h2', null, ts(g[1]))), h('div', { className: 'a3-cluster', onPointerMove: (g[1] === 'genres' || g[1] === 'staff') ? function (e) { orbitMove(g[1], Math.min(list.length, 4), e); } : null, onPointerLeave: function (e) { e.currentTarget.removeAttribute('data-orbit-x'); } }, list.slice(0, 4).map(function (item, i) { return card(item, i, (g[1] === 'genres' || g[1] === 'staff') ? g[1] : '', orbit[g[1]] || 0, Math.min(list.length, 4)); }))); }),
      h('div', { className: 'a3-version-badge' }, 'BAZINO ARENA 3D — PREVIEW v1.0.5'),
      h('section', { className: 'a3-section a3-location', 'data-reveal': '1' }, h('header', null, h('small', null, '09 / FINAL COORDINATES'), h('h2', null, ts('location'))), h('div', { className: 'a3-map' }, h('img', { src: (p.settings && (p.settings.map_image_url || p.settings.mapImageUrl || p.settings.location_image)) || (base + 'location-map.png'), alt: '' }), h('div', { className: 'a3-radar', 'aria-hidden': 'true' }, h('i'), h('b')), (address || phone) ? h('div', { className: 'a3-contact' }, address ? h('p', null, h('small', null, l === 'fa' ? 'آدرس' : 'Address'), h('strong', null, address)) : null, phone ? h('p', null, h('small', null, l === 'fa' ? 'تلفن تماس' : 'Phone'), h('a', { href: 'tel:' + phone }, phone)) : null) : null)));
  }
  function PortalHeader(p) {
    p = p || {}; var l = p.language || p.lang || 'fa'; var user = p.user || null;
    var openState = R.useState(false), langOpen = openState[0], setLangOpen = openState[1]; var menuRef = R.useRef(null);
    R.useEffect(function () { function close(e) { if (e.type === 'keydown' && e.key !== 'Escape') return; if (e.type === 'pointerdown' && menuRef.current && menuRef.current.contains(e.target)) return; setLangOpen(false); } document.addEventListener('pointerdown', close); document.addEventListener('keydown', close); return function () { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', close); }; }, []);
    var languages = [['fa','فارسی'],['en','English'],['tr','Türkçe'],['ru','Русский']];
    return h('header', { className: 'a3-site-header', dir: l === 'fa' ? 'rtl' : 'ltr' },
      h('button', { className: 'a3-site-brand', onClick: function () { if (p.onNavigate) p.onNavigate('home'); } }, p.logoUrl ? h('img', { src: p.logoUrl, alt: '' }) : h('b', null, 'B'), h('span', null, 'BAZINO ', h('i', null, 'PRO'))),
      h('div', { className: 'a3-site-actions' }, user ? h('div', { className: 'a3-user' }, h('span', null, user.displayName || user.username), typeof user.points === 'number' ? h('small', null, user.points + ' PT') : null, h('button', { onClick: p.onLogout }, l === 'fa' ? 'خروج' : 'Logout')) : h('button', { className: 'a3-login', onClick: p.onLogin }, l === 'fa' ? 'ورود' : 'Login'),
        h('div', { className: 'a3-language', ref: menuRef }, h('button', { className: 'a3-lang', 'aria-expanded': langOpen ? 'true' : 'false', onClick: function () { setLangOpen(!langOpen); } }, l.toUpperCase(), h('i', null, '⌄')), langOpen ? h('div', { className: 'a3-language-menu', role: 'menu' }, languages.map(function (item) { return h('button', { key: item[0], className: item[0] === l ? 'is-active' : '', role: 'menuitem', onClick: function () { if (p.onLanguage) p.onLanguage(item[0]); setLangOpen(false); } }, h('b', null, item[0].toUpperCase()), h('span', null, item[1])); })) : null)));
  }
  S.registerComponent('home', { apiVersion: 2, render: function (p) { return h(Home, p || {}); } });
  S.registerComponent('header', { apiVersion: 2, render: function (p) { return h(PortalHeader, p || {}); } });
  S.registerComponent('mobileNav', { apiVersion: 2, render: function (p) { return h(PortalHeader, p || {}); } });
})();
