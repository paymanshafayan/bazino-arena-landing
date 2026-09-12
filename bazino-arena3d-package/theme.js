(function () {
  'use strict';
  var S = window.BazinoThemeSDK;
  if (!S || !S.registerComponent || !S.React) return;
  var R = S.React;
  var h = R.createElement;
  function txt(v, l) { return typeof v === 'string' ? v : (v && (v[l] || v.fa || v.en)) || ''; }
  function pad(n) { n = String(n); while (n.length < 4) n = '0' + n; return n; }
  var dockItems = [
    ['home', 'خانه', 'Home', 'portal-menu/home.jpg'],
    ['games', 'بازی‌ها', 'Games', 'portal-menu/games.jpg'],
    ['cafe', 'کافه', 'Cafe', 'portal-menu/cafe.jpg'],
    ['shop', 'فروشگاه', 'Shop', 'portal-menu/shop.jpg'],
    ['tournaments', 'مسابقات', 'Arena', 'portal-menu/tournaments.jpg'],
    ['loyalty', 'باشگاه', 'Club', 'portal-menu/loyalty.jpg'],
    ['blog', 'بلاگ', 'Blog', 'portal-menu/blog.jpg']
  ];
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
        var d = Math.min(devicePixelRatio || 1, 1.5), w = box.clientWidth, ht = box.clientHeight;
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
    function card(item, i) {
      var image = item.imageUrl || item.image || item.avatar || '';
      var title = txt(item.title || item.name, l) || item.game || item.gamerTag || '';
      var body = txt(item.subtitle || item.desc || item.description || item.role || item.duration, l) || item.specialty || '';
      return h('article', { className: 'a3-card a3-card-' + i, key: item.id || i, onPointerMove: cardMove }, image ? h('img', { src: image, alt: '' }) : h('div', { className: 'a3-graphic' }, h('i'), h('i'), h('i')), h('span', null, '0' + (i + 1)), h('h3', null, title), body ? h('p', null, body) : null, item.teamA ? h('strong', null, item.teamA + '  ' + item.scoreA + ' : ' + item.scoreB + '  ' + item.teamB) : null);
    }
    var groups = [['03', 'genres', p.gameGenres || []], ['04', 'lounges', p.loungeSections || []], ['05', 'results', p.matchHistory || []], ['06', 'tournaments', p.tournaments || []], ['07', 'pricing', p.pricingPackages || []], ['08', 'staff', p.staffTeam || []]];
    var selected = dockItems[active];
    return h('main', { className: 'a3-root', ref: root, dir: dir },
      h('section', { className: 'a3-hero', ref: hero, onPointerMove: heroMove, onPointerLeave: function () { last.current = null; if (aura.current) aura.current.classList.remove('is-visible'); } },
        h('canvas', { ref: canvas }), h('div', { className: 'a3-shade' }), h('div', { className: 'a3-aura', ref: aura }, h('i')),
        h('div', { className: 'a3-hero-copy' }, h('small', null, 'BAZINO PRO / VIRTUAL TOUR'), h('h1', null, l === 'fa' ? 'وارد بازی شو.' : 'ENTER THE GAME.'), h('p', null, l === 'fa' ? 'مسیر واقعی بازینو، فریم‌به‌فریم.' : 'Bazino, frame by frame.'), h('button', { onClick: function () { if (p.onNavigate) p.onNavigate('reservations'); } }, ts('reserve')))),
      h('section', { className: 'a3-dock-scene' },
        h('nav', { className: 'a3-dock', 'aria-label': 'Portal' }, dockItems.map(function (d, i) { return h('button', { key: d[0], className: i === active ? 'is-active' : '', onClick: function () { setActive(i); } }, i ? h('b', null, h('i')) : null, h('em'), h('span', null, l === 'fa' ? d[1] : d[2])); })),
        h('div', { className: 'a3-destination', key: selected[0] }, h('img', { src: base + selected[3], alt: '' }), h('div', null, h('small', null, 'PORTAL DESTINATION / 0' + (active + 1)), h('h2', null, l === 'fa' ? selected[1] : selected[2]), h('button', { onClick: function () { if (p.onNavigate) p.onNavigate(selected[0]); } }, ts('reserve') + '  ←')))),
      groups.map(function (g) { var list = g[2]; if (!list.length) return null; return h('section', { className: 'a3-section', key: g[1], 'data-reveal': '1' }, h('header', null, h('small', null, g[0] + ' / ARENA CIRCUIT'), h('h2', null, ts(g[1]))), h('div', { className: 'a3-cluster' }, list.slice(0, 4).map(card))); }),
      h('section', { className: 'a3-section a3-location', 'data-reveal': '1' }, h('header', null, h('small', null, '09 / FINAL COORDINATES'), h('h2', null, ts('location'))), h('div', { className: 'a3-map' }, h('i'), h('p', null, (p.settings && p.settings.club_address) || ts('empty')))));
  }
  S.registerComponent('home', { apiVersion: 2, render: function (p) { return h(Home, p || {}); } });
})();
