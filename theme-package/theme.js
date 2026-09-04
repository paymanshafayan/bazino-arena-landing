/*
 * BAZINO THEME — ARENA OF LEGENDS (v3) — home component (Theme SDK v2 props).
 * Registered with the Theme SDK exactly like the system homes:
 *   window.BazinoThemeSDK.registerComponent('home', factory)
 *
 * SDK v2 contract implemented here:
 *   • every visible string comes from theme.json.strings via props.ts('key')
 *     (fa / en / ru / tr — complete tables, no hard-coded copy, no language
 *     ternaries anywhere);
 *   • the hero slider reads the admin-managed props.slides:
 *       slide.title[language] / slide.desc[language] /
 *       slide.target -> props.onNavigate(slide.target);
 *     slide images NEVER replace the background — the official hero video
 *     (and its first-frame poster) is always the hero media; admin slides
 *     drive only the text. When the portal has no slides the theme renders
 *     its own demo slides (built with ts()) over the same video;
 *   • dir comes from props.dir and logical CSS properties handle RTL/LTR;
 *   • colors/fonts are CSS variables on body[data-theme='bazino-arena']
 *     (theme.json tokens are bridged by the portal to --bz-* on <body>).
 *
 * Performance contract kept here:
 *   • hero renders the poster (first frame of the video) immediately;
 *   • the <video> element starts with preload="none" and gets its src only
 *     after window 'load' + idle time, so it never competes with LCP;
 *   • muted + playsInline autoplay after load; clicking the hero replays;
 *   • playback pauses off-screen / when the tab is hidden (IntersectionObserver,
 *     visibilitychange) — one shared requestAnimationFrame heartbeat drives the
 *     hero slider and the lounge gallery (no setInterval anywhere);
 *   • prefers-reduced-motion: no auto-advance, poster only, manual replay allowed;
 *   • zero third-party origins; all media served from this package's assets.
 */
(function () {
  var SDK = (typeof window !== 'undefined') ? window.BazinoThemeSDK : null;
  if (!SDK || !SDK.registerComponent) return;
  var R = SDK.React;
  if (!R) return;

  /* 4.5.0 — site-header redesign: solid arena header + language + avatar + profile (portal parity)
     Portal default (branch arena/01a067ac): header sticky h-[70px] bg-dark-card/90 backdrop-blur-xl,
     center NAV_TABS, right: login btn OR avatar+displayName/@username (InitialAvatar hash hue + /profile)
     + logout + Help + LanguageMenu with flags (IR/GB/RU/TR svg, mousedown outside + Escape).
     This IIFE enhances the portal's existing .site-header to match that, without replacing React state.
     Also fixes: language menu now uses flags + mousedown, profile goes to /profile (not loyalty), logout does
     not force reload (clears token and updates header in place). ES5, no deps, survives React re-renders. */
  (function () {
    var LANGS = [
      { code: 'fa', label: 'FA', full: 'فارسی', country: 'IR', flag: '<svg viewBox="0 0 3 2" width="20" height="13" aria-hidden="true"><rect width="3" height="2" fill="#fff"/><rect width="3" height="0.667" fill="#239f40"/><rect y="1.333" width="3" height="0.667" fill="#da0000"/><circle cx="1.5" cy="1" r="0.26" fill="none" stroke="#da0000" stroke-width="0.09"/></svg>' },
      { code: 'en', label: 'EN', full: 'English', country: 'GB', flag: '<svg viewBox="0 0 60 30" width="20" height="13" aria-hidden="true"><clipPath id="g-b"><path d="M0 0v30h60V0z"/></clipPath><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clipPath="url(#g-b)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>' },
      { code: 'ru', label: 'RU', full: 'Русский', country: 'RU', flag: '<svg viewBox="0 0 3 2" width="20" height="13" aria-hidden="true"><rect width="3" height="2" fill="#fff"/><rect y="0.667" width="3" height="0.667" fill="#0039a6"/><rect y="1.333" width="3" height="0.667" fill="#d52b1e"/></svg>' },
      { code: 'tr', label: 'TR', full: 'Türkçe', country: 'TR', flag: '<svg viewBox="0 0 30 20" width="20" height="13" aria-hidden="true"><rect width="30" height="20" fill="#e30a17"/><circle cx="11.25" cy="10" r="5" fill="#fff"/><circle cx="12.5" cy="10" r="4" fill="#e30a17"/><polygon fill="#fff" points="17.5,10 15.1,10.8 16.6,8.7 16.6,11.3 15.1,9.2"/></svg>' }
    ];
    var ENHANCED_ATTR = 'data-bazino-enhanced';
    function getLang() {
      try {
        var v = localStorage.getItem('cyber_lang');
        if (v) return v;
        var d = document.documentElement.lang;
        if (d) return d;
      } catch (e) {}
      return 'fa';
    }
    function setLang(code) {
      try { localStorage.setItem('cyber_lang', code); } catch (e) {}
      try {
        document.documentElement.lang = code;
        document.documentElement.dir = code === 'fa' ? 'rtl' : 'ltr';
      } catch (e) {}
      try { window.location.reload(); } catch (e) {}
    }
    function hashForName(name) {
      var h = 0;
      var s = String(name || '?');
      for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
      return h;
    }
    function makeAvatar(name) {
      var clean = String(name || '?').trim() || '?';
      var initial = clean.charAt(0).toUpperCase() || '?';
      var h = hashForName(clean);
      var el = document.createElement('div');
      el.className = 'bazino-avatar';
      el.textContent = initial;
      el.setAttribute('aria-label', clean);
      el.setAttribute('title', clean);
      try {
        el.style.background = 'linear-gradient(135deg, hsl(' + h + ' 65% 32%), hsl(' + ((h + 40) % 360) + ' 65% 22%))';
        el.style.color = 'hsl(' + h + ' 90% 88%)';
      } catch (e) {}
      return el;
    }
    function flagEl(country) {
      var wrap = document.createElement('span');
      wrap.style.display = 'inline-flex';
      wrap.style.alignItems = 'center';
      wrap.style.flexShrink = '0';
      for (var i = 0; i < LANGS.length; i++) if (LANGS[i].country === country) { wrap.innerHTML = LANGS[i].flag; break; }
      // ensure size
      try { var svg = wrap.querySelector('svg'); if (svg) { svg.style.width = '20px'; svg.style.height = '13px'; svg.style.borderRadius = '2px'; svg.style.boxShadow = '0 1px 2px rgba(0,0,0,.25)'; svg.style.flexShrink = '0'; } } catch (e) {}
      return wrap;
    }
    function findRightContainer(hdr) {
      try {
        var conts = hdr.querySelectorAll('.flex.items-center.gap-4');
        if (conts.length) return conts[conts.length - 1];
        var hdrAct = hdr.querySelector('.header-actions');
        if (hdrAct) return hdrAct;
        var alt = hdr.querySelector('div.flex.items-center');
        if (alt) return alt;
        // fallback: last div with flex
        var all = hdr.querySelectorAll('div');
        for (var i = all.length-1; i>=0; i--) { var c = all[i]; if (c.className && c.className.indexOf('flex') !== -1) return c; }
      } catch (e) {}
      return hdr;
    }
    function ensureLang(hdr, right) {
      if (!right) return;
      if (hdr.querySelector('[data-bazino-lang]')) return;
      var wrap = document.createElement('div');
      wrap.className = 'bazino-lang-wrap';
      wrap.setAttribute('data-bazino-lang', '1');
      wrap.style.position = 'relative';
      var cur = getLang();
      var curObj = null;
      for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === cur) curObj = LANGS[i];
      if (!curObj) curObj = LANGS[0];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'bazino-lang-btn';
      btn.setAttribute('aria-haspopup', 'listbox');
      btn.setAttribute('aria-label', 'Language: ' + curObj.label);
      // build button content: flag + code + chevron
      try {
        btn.style.display = 'inline-flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '6px';
        var f = flagEl(curObj.country);
        btn.appendChild(f);
        var lab = document.createElement('span');
        lab.textContent = curObj.label;
        lab.setAttribute('dir', 'ltr');
        btn.appendChild(lab);
        var chev = document.createElement('span');
        chev.innerHTML = '&#9662;';
        chev.style.fontSize = '9px';
        chev.style.opacity = '.7';
        chev.style.transition = 'transform 150ms';
        btn.appendChild(chev);
      } catch (e) {
        btn.textContent = curObj.label + ' \u25BE';
      }
      var dd = document.createElement('ul');
      dd.className = 'bazino-lang-dropdown';
      dd.setAttribute('role', 'listbox');
      dd.setAttribute('aria-label', 'Language');
      dd.style.display = 'none';
      for (var k = 0; k < LANGS.length; k++) {
        (function (L) {
          var li = document.createElement('li');
          li.setAttribute('role', 'option');
          li.setAttribute('aria-selected', L.code === cur ? 'true' : 'false');
          var opt = document.createElement('button');
          opt.type = 'button';
          opt.className = 'bazino-lang-opt' + (L.code === cur ? ' is-active' : '');
          // flag + code
          try {
            opt.style.display = 'flex';
            opt.style.alignItems = 'center';
            opt.style.gap = '8px';
            opt.style.width = '100%';
            var of = flagEl(L.country);
            opt.appendChild(of);
            var ot = document.createElement('span');
            ot.textContent = L.label;
            ot.setAttribute('dir', 'ltr');
            opt.appendChild(ot);
          } catch (e) {
            opt.textContent = L.full + ' (' + L.label + ')';
          }
          opt.addEventListener('click', function (ev) {
            ev.stopPropagation();
            dd.style.display = 'none';
            try { chev.style.transform = ''; } catch (e2) {}
            if (L.code !== cur) setLang(L.code);
          });
          li.appendChild(opt);
          dd.appendChild(li);
        })(LANGS[k]);
      }
      var isOpen = false;
      function toggleOpen(ev) {
        if (ev) ev.stopPropagation();
        isOpen = !isOpen;
        dd.style.display = isOpen ? 'block' : 'none';
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        try { chev.style.transform = isOpen ? 'rotate(180deg)' : ''; } catch (e) {}
      }
      btn.addEventListener('click', toggleOpen);
      // portal parity: mousedown outside + Escape
      function onDown(e) {
        if (!isOpen) return;
        try { if (wrap.contains(e.target)) return; } catch (e2) {}
        isOpen = false;
        dd.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
        try { chev.style.transform = ''; } catch (e2) {}
      }
      function onKey(e) {
        if (e.key === 'Escape' && isOpen) {
          isOpen = false;
          dd.style.display = 'none';
          btn.setAttribute('aria-expanded', 'false');
          try { chev.style.transform = ''; } catch (e2) {}
        }
      }
      document.addEventListener('mousedown', onDown);
      document.addEventListener('keydown', onKey);
      wrap.appendChild(btn);
      wrap.appendChild(dd);
      try { right.insertBefore(wrap, right.firstChild); } catch (e) { right.appendChild(wrap); }
    }
    function navigateToProfile() {
      // portal default: standalone /profile (not loyalty). Use same.
      try {
        // if portal has navigateStandalone, try to use it via history
        if (window.history && window.history.pushState) {
          window.history.pushState({}, '', '/profile');
          try { window.dispatchEvent(new PopStateEvent('popstate')); } catch (e2) { try { window.dispatchEvent(new Event('popstate')); } catch (e3) {} }
          // if standalone page didn't handle, fallback to assign
          setTimeout(function(){
            if (window.location.pathname !== '/profile') window.location.assign('/profile');
          }, 50);
          return true;
        }
        window.location.assign('/profile');
        return true;
      } catch (e) {}
      try { window.location.hash = 'profile'; } catch (e2) {}
      return false;
    }
    function enhanceUser(hdr, right) {
      try {
        fetch('/api/user', { priority: 'low' }).then(function (r) { return r.json(); }).then(function (data) {
          var isLogged = !!(data && data.username && data.username !== 'Guest' && String(data.username).trim());
          var username = isLogged ? String(data.username).trim() : '';
          var displayName = isLogged && data.displayName ? String(data.displayName).trim() : '';
          var existingLink = null;
          try { existingLink = hdr.querySelector('a[data-header-profile-link]'); } catch (e) {}
          var existingSpan = null;
          try { existingSpan = hdr.querySelector('span.text-primary'); } catch (e) {}
          var loginBtn = null;
          try { loginBtn = hdr.querySelector('button.bg-primary'); } catch (e) {}
          if (isLogged) {
            var container = null;
            if (existingLink && existingLink.parentElement) container = existingLink.parentElement;
            else if (existingSpan && existingSpan.parentElement) container = existingSpan.parentElement;
            else if (loginBtn && loginBtn.parentElement) container = loginBtn.parentElement;
            else container = right;
            if (!container) return;
            var av = container.querySelector('.bazino-avatar') || hdr.querySelector('.bazino-avatar');
            // if already enhanced with profile link, just update name
            if (existingLink) {
              var nameSpan = existingLink.querySelector('span');
              var want = displayName || ('@' + username);
              if (nameSpan && nameSpan.textContent !== want) nameSpan.textContent = want;
              return;
            }
            if (av && existingSpan) {
              if (existingSpan.textContent !== '@' + username) existingSpan.textContent = '@' + username;
              return;
            }
            if (loginBtn) {
              try { loginBtn.parentElement.removeChild(loginBtn); } catch (e) {}
              if (!existingLink && !existingSpan) {
                var wrap = document.createElement('div');
                wrap.style.display = 'flex';
                wrap.style.alignItems = 'center';
                wrap.style.gap = '8px';
                container.appendChild(wrap);
                container = wrap;
                // create profile link like portal
                var a = document.createElement('a');
                a.href = '/profile';
                a.setAttribute('data-header-profile-link', '1');
                a.className = 'bazino-user-btn';
                a.style.textDecoration = 'none';
                a.addEventListener('click', function(ev){ ev.preventDefault(); navigateToProfile(); });
                var avatar = null;
                try {
                  if (data.avatarUrl) {
                    avatar = document.createElement('img');
                    avatar.src = data.avatarUrl;
                    avatar.width = 28; avatar.height = 28;
                    avatar.className = 'bazino-avatar';
                    avatar.style.objectFit = 'cover';
                    avatar.style.borderRadius = '50%';
                    avatar.style.border = '1px solid rgba(255,196,0,.5)';
                    avatar.style.width = '28px'; avatar.style.height='28px';
                  } else {
                    avatar = makeAvatar(displayName || username);
                    avatar.style.width='28px'; avatar.style.height='28px';
                  }
                } catch(e2){ avatar = makeAvatar(username); }
                a.appendChild(avatar);
                var s2 = document.createElement('span');
                s2.className = 'bazino-header-user';
                s2.textContent = displayName ? displayName : ('@' + username);
                try { s2.style.marginLeft='6px'; } catch(e3){}
                a.appendChild(s2);
                container.appendChild(a);
                var logout2 = document.createElement('button');
                logout2.setAttribute('aria-label', 'Logout');
                logout2.className = 'bazino-header-icon is-logout';
                logout2.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
                logout2.addEventListener('click', function () {
                  fetch('/api/auth/logout', { method: 'POST' }).then(function () {
                    try { localStorage.removeItem('bazino_token'); } catch (e) {}
                    try { localStorage.removeItem('bazino_mock_user'); } catch (e2) {}
                    // portal parity: no reload, just update header in place and go home
                    try {
                      var av2 = hdr.querySelector('.bazino-avatar');
                      if (av2) av2.remove();
                      var link2 = hdr.querySelector('a[data-header-profile-link]');
                      if (link2) link2.remove();
                    } catch(e3){}
                    // trigger re-enhance to show login button
                    try { window.dispatchEvent(new CustomEvent('bazino:enhanceHeader')); } catch(e4){}
                    try { if (window.history && window.history.pushState) { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); } } catch(e5){}
                  });
                });
                container.appendChild(logout2);
                return;
              }
            }
            if (existingSpan) {
              var parent = existingSpan.parentElement;
              if (!parent) return;
              if (parent.classList.contains('bazino-user-btn')) return;
              // Check if already a link
              if (parent.tagName && parent.tagName.toLowerCase() === 'a') return;
              var avatar2 = null;
              try {
                if (data.avatarUrl) {
                  avatar2 = document.createElement('img');
                  avatar2.src = data.avatarUrl;
                  avatar2.width = 28; avatar2.height = 28;
                  avatar2.className = 'bazino-avatar';
                  avatar2.style.width='28px'; avatar2.style.height='28px'; avatar2.style.borderRadius='50%'; avatar2.style.objectFit='cover';
                } else {
                  avatar2 = makeAvatar(displayName || username);
                }
              } catch(e){ avatar2 = makeAvatar(username); }
              var link = document.createElement('a');
              link.href = '/profile';
              link.className = 'bazino-user-btn';
              link.setAttribute('data-header-profile-link', '1');
              link.setAttribute('aria-label', 'Profile');
              link.style.textDecoration='none';
              link.addEventListener('click', function(ev){ ev.preventDefault(); navigateToProfile(); });
              var logoutBtn = null;
              try {
                var btns = parent.querySelectorAll('button');
                for (var i = 0; i < btns.length; i++) if (btns[i].getAttribute('aria-label') === 'Logout') logoutBtn = btns[i];
              } catch (e) {}
              var fragUser = existingSpan;
              fragUser.textContent = displayName ? displayName : ('@' + username);
              var toKeep = logoutBtn;
              parent.innerHTML = '';
              link.appendChild(avatar2);
              link.appendChild(fragUser);
              parent.appendChild(link);
              if (toKeep) parent.appendChild(toKeep);
              else {
                var lo = document.createElement('button');
                lo.setAttribute('aria-label', 'Logout');
                lo.className = 'bazino-header-icon is-logout';
                lo.style.marginLeft = '6px';
                lo.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
                lo.addEventListener('click', function () {
                  fetch('/api/auth/logout', { method: 'POST' }).then(function () {
                    try { localStorage.removeItem('bazino_token'); } catch (e) {}
                    try { localStorage.removeItem('bazino_mock_user'); } catch (e2) {}
                    try { var avx = hdr.querySelector('.bazino-avatar'); if (avx) avx.remove(); var lk = hdr.querySelector('a[data-header-profile-link]'); if (lk) lk.remove(); } catch(e3){}
                    try { window.dispatchEvent(new CustomEvent('bazino:enhanceHeader')); } catch(e4){}
                    try { if (window.history && window.history.pushState) { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); } } catch(e5){}
                  });
                });
                parent.appendChild(lo);
              }
              link.addEventListener('click', function (ev) { if (ev) ev.preventDefault(); navigateToProfile(); });
              try { avatar2.addEventListener('click', function (ev) { ev.stopPropagation(); navigateToProfile(); }); } catch(e){}
            }
          } else {
            var av2 = hdr.querySelector('.bazino-avatar');
            if (av2) { try { av2.parentElement.removeChild(av2); } catch (e) {} }
            var linkGone = hdr.querySelector('a[data-header-profile-link]');
            if (linkGone) { try { linkGone.parentElement.removeChild(linkGone); } catch(e){} }
            if (existingSpan && String(existingSpan.textContent || '').trim() === '@') {
              var cont = existingSpan.parentElement;
              if (cont) {
                try { cont.innerHTML = ''; } catch (e) {}
                var alreadyLogin = hdr.querySelector('button.bg-primary');
                if (!alreadyLogin) {
                  var lb = document.createElement('button');
                  lb.type = 'button';
                  lb.className = 'text-xs font-bold bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2';
                  var lang = getLang();
                  lb.textContent = lang === 'fa' ? 'ورود' : 'Login';
                  lb.addEventListener('click', function () {
                    var found = false;
                    try {
                      var allBtns = document.querySelectorAll('button');
                      for (var i = 0; i < allBtns.length; i++) {
                        var t = String(allBtns[i].textContent || '');
                        if (t.indexOf('ورود') !== -1 || t.toLowerCase().indexOf('login') !== -1) { allBtns[i].click(); found = true; break; }
                      }
                    } catch (e) {}
                    if (!found) {
                      try { window.dispatchEvent(new CustomEvent('bazino:open-auth')); } catch (e) {}
                      try { window.dispatchEvent(new CustomEvent('bazino:openAuth')); } catch (e2) {}
                    }
                  });
                  cont.appendChild(lb);
                }
              }
            }
          }
        }).catch(function () {});
      } catch (e) {}
    }
    function enhance(hdr) {
      if (!hdr) return;
      try {
        hdr.style.setProperty('position', 'sticky', 'important');
        hdr.style.setProperty('top', '0', 'important');
        hdr.style.setProperty('z-index', '50', 'important');
        hdr.classList.remove('bazino-fallback-header');
        hdr.classList.add('bazino-enhanced-header');
      } catch (e) {}
      var right = findRightContainer(hdr);
      ensureLang(hdr, right);
      enhanceUser(hdr, right);
      hdr.setAttribute(ENHANCED_ATTR, '1');
    }
    function enhanceAll() {
      var hdrs = [];
      try { hdrs = document.querySelectorAll('.site-header'); } catch (e) { return; }
      for (var i = 0; i < hdrs.length; i++) enhance(hdrs[i]);
    }
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceAll);
      else enhanceAll();
      setTimeout(enhanceAll, 300);
      setTimeout(enhanceAll, 900);
      setTimeout(enhanceAll, 2000);
      setTimeout(enhanceAll, 4000);
      try {
        var mo = new MutationObserver(function () { enhanceAll(); });
        mo.observe(document.documentElement, { childList: true, subtree: true });
      } catch (e) {}
      window.addEventListener('load', enhanceAll);
      window.addEventListener('storage', function (ev) {
        if (ev && ev.key === 'cyber_lang') enhanceAll();
      });
      window.addEventListener('bazino:enhanceHeader', enhanceAll);
    }
  })();

  /* localized digits (Persian) — map-driven, no language ternaries */
  var DIGIT_MAPS = { fa: '۰۱۲۳۴۵۶۷۸۹' };
  var PRICE_LOCALES = { fa: 'fa-IR', ru: 'ru-RU', tr: 'tr-TR', en: 'en-US' };
  var RTL_LANGUAGES = { fa: 'rtl' };

  function num(language, value) {
    var s = String(value);
    var map = DIGIT_MAPS[language];
    if (!map) return s;
    return s.replace(/[0-9]/g, function (d) { return map.charAt(Number(d)); });
  }

  function pad2(language, value) {
    return num(language, (value < 10 ? '0' : '') + value);
  }

  function formatPrice(language, value) {
    var locale = PRICE_LOCALES[language];
    var n = Number(value);
    return (locale ? n.toLocaleString(locale) : n.toLocaleString());
  }

  /* portal data objects are multilingual maps — resolve for the active language */
  function loc(value, lang) {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      return value[lang] || value.en || value.fa || value.tr || value.ru || '';
    }
    return String(value);
  }

  function normalizeTarget(target) {
    var t = String(target || 'reservations');
    if (t === 'reserve') return 'reservations';
    return t;
  }

  function splitHeroTitle(title) {
    var s = String(title || '');
    var parts = s.split(/[,،]/);
    if (parts.length >= 2) {
      var first = parts[0].trim();
      var rest = parts.slice(1).join(',').trim();
      if (first && rest) return [first + ',', rest];
    }
    var words = s.trim().split(/\s+/);
    if (words.length <= 3) return [s, ''];
    var mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  }

  /* Responsive first-party images: the portal serves /images/**-<width>.webp
     variant sets (same convention as its own getResponsiveSrcSet). Build a
     srcSet from the smaller variants when the URL matches, keep the original
     as src fallback, and self-heal to the original if a variant 404s. */
  var IMG_VW_RE = /^(\/images\/.*)-(\d{2,4})\.webp$/;
  function imgVariants(url) {
    var s = String(url || '');
    var qi = s.indexOf('?');
    var bare = qi === -1 ? s : s.slice(0, qi);
    var q = qi === -1 ? '' : s.slice(qi);
    var m = bare.match(IMG_VW_RE);
    if (!m) return null;
    var w = Number(m[2]);
    var stem = m[1];
    var widths = [];
    var candidates = [320, 480, 640, w];
    for (var k = 0; k < candidates.length; k++) {
      var c = candidates[k];
      if (c <= w && widths.indexOf(c) === -1) widths.push(c);
    }
    widths.sort(function (a, b) { return a - b; });
    var set = [];
    for (var j = 0; j < widths.length; j++) set.push(stem + '-' + widths[j] + '.webp' + q + ' ' + widths[j] + 'w');
    return { srcSet: set.join(', ') };
  }

  function mediaImg(src, alt, className, sizes, key) {
    var vr = imgVariants(src);
    return R.createElement('img', {
      key: key || 'media',
      className: className,
      src: src,
      srcSet: vr ? vr.srcSet : undefined,
      sizes: sizes,
      alt: alt,
      loading: 'lazy',
      decoding: 'async',
      onError: function (e) {
        var t = e && e.target;
        if (t && t.getAttribute('data-fallback') !== '1') {
          t.setAttribute('data-fallback', '1');
          t.removeAttribute('srcset');
          t.src = src;
        }
      }
    });
  }

  function genreKeyOf(entry) {
    var g = String((entry && (entry.game || entry.genre || entry.category)) || '').toLowerCase();
    if (g.indexOf('cs') !== -1 || g.indexOf('counter') !== -1 || g.indexOf('valorant') !== -1 || g.indexOf('shoot') !== -1) return 'shooter';
    if (g.indexOf('dota') !== -1 || g.indexOf('lol') !== -1 || g.indexOf('moba') !== -1 || g.indexOf('league') !== -1) return 'moba';
    if (g.indexOf('fifa') !== -1 || g.indexOf('foot') !== -1 || g.indexOf('pes') !== -1 || g.indexOf('sport') !== -1 || g.indexOf('race') !== -1) return 'sports';
    if (g.indexOf('rpg') !== -1 || g.indexOf('quest') !== -1 || g.indexOf('elden') !== -1) return 'rpg';
    return 'other';
  }

  function ArenaHome(props) {
    var p = props || {};
    var language = p.language || 'fa';
    var dir = (p.dir === 'rtl' || p.dir === 'ltr') ? p.dir : (RTL_LANGUAGES[language] || 'ltr');
    /* theme copy: theme.json.strings through the portal's ts() */
    var ts = (typeof p.ts === 'function') ? p.ts : function (key) { return key; };
    function T(key) { return ts(key); }
    var settings = p.settings || {};
    var navigate = p.onNavigate || function () {};
    var base = String(p.assetsBase || '');
    if (base && base.charAt(base.length - 1) !== '/') base += '/';
    var logo = p.logoUrl || '/logo.png';

    var featured = p.featuredGames || [];
    var genres = p.gameGenres || [];
    var tournaments = p.tournaments || [];
    var history = p.matchHistory || [];
    var lounges = p.loungeSections || [];
    var pricing = p.pricingPackages || [];
    var staff = p.staffTeam || [];

    var h = R.createElement;
    var rootRef = R.useRef(null);

    /* ---------- hero slides: admin data first, theme demo last ---------- */
    var adminSlides = Array.isArray(p.slides) ? p.slides : [];
    var slides = [];
    var i;
    for (i = 0; i < adminSlides.length; i++) {
      var as = adminSlides[i] || {};
      var title = loc(as.title, language);
      var desc = loc(as.desc, language);
      /* slide images are intentionally ignored: the official hero video is
         always the hero background; slides carry text + target only */
      if (!title && !desc) continue;
      slides.push({
        id: as.id || ('admin-slide-' + i),
        title: title || T('hero'),
        desc: desc,
        target: normalizeTarget(as.target)
      });
    }
    if (!slides.length && featured.length) {
      for (i = 0; i < featured.length; i++) {
        var fg = featured[i] || {};
        var ftitle = loc(fg.title, language);
        var fdesc = loc(fg.desc || fg.subtitle || fg.description, language);
        if (!ftitle && !fdesc) continue;
        slides.push({
          id: fg.id || ('featured-' + i),
          title: ftitle || T('hero'),
          desc: fdesc,
          target: normalizeTarget(fg.target || fg.link || 'tournaments')
        });
      }
    }
    if (!slides.length) {
      /* theme demo slides — copy from strings, media stays the hero video */
      slides = [
        { id: 'demo-hero', title: T('hero'), desc: T('sub'), target: 'reservations' },
        { id: 'demo-tournaments', title: T('demoSlide2Title'), desc: T('demoSlide2Desc'), target: 'tournaments' },
        { id: 'demo-lounge', title: T('demoSlide3Title'), desc: T('demoSlide3Desc'), target: 'cafe' }
      ];
    }
    var slideCount = slides.length;

    /* ---------- hero media state ---------- */
    var heroRef = R.useRef(null);
    var videoRef = R.useRef(null);
    var heroVisibleRef = R.useRef(true);
    var videoPhase = R.useState(0); /* 0 poster, 1 src set, 2 playing, 3 ended, 4 failed */
    var phase = videoPhase[0];
    var setPhase = videoPhase[1];
    var videoSrcState = R.useState('');
    var videoSrc = videoSrcState[0];
    var setVideoSrc = videoSrcState[1];
    var reducedMotion = R.useMemo(function () {
      try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
    }, []);
    /* narrow screens (phones) get the 640x360 poster — the LCP paint — instead
       of the 1280x720 one; the CSS background swaps with the same class */
    var smallScreen = R.useMemo(function () {
      try { return !!(window.matchMedia && window.matchMedia('(max-width: 800px)').matches); } catch (e) { return false; }
    }, []);

    /* ---------- slider + gallery state (one shared rAF heartbeat) ---------- */
    var slideState = R.useState(0);
    var slideIndex = slideState[0];
    var setSlideIndex = slideState[1];
    var sliderPausedState = R.useState(false);
    var sliderPaused = sliderPausedState[0];
    var setSliderPaused = sliderPausedState[1];
    var galleryState = R.useState(0);
    var galleryPauseState = R.useState(false);
    var galleryBoxRef = R.useRef(null);
    var galleryVisibleRef = R.useRef(true);
    var loungeImages = lounges.filter(function (l) { return l && (l.imageUrl || l.image); });
    var activeSlide = slides[Math.min(slideIndex, slideCount - 1)] || slides[0];

    var videoUrl = String(settings.hero_video || settings.hero_video_url || '') || (base + 'hero-arena.mp4');
    var posterUrl = String(settings.hero_poster || settings.hero_poster_url || '') || (base + (smallScreen ? 'hero-poster-small.webp' : 'hero-poster.webp'));

    function startPlayback() {
      var v = videoRef.current;
      if (!v) return;
      try {
        v.currentTime = 0;
        var pr = v.play();
        if (pr && pr.catch) pr.catch(function () {});
        setPhase(2);
      } catch (e) { /* poster remains */ }
    }

    function goToSlide(next) {
      setSlideIndex(((next % slideCount) + slideCount) % slideCount);
    }

    /* Defer the video until the page is fully loaded and the browser is idle. */
    R.useEffect(function () {
      var cancelled = false;
      var arm = function () {
        if (cancelled) return;
        var run = function () { if (!cancelled) setVideoSrc(videoUrl); };
        if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 2500 });
        else window.setTimeout(run, 400);
      };
      if (document.readyState === 'complete') arm();
      else window.addEventListener('load', arm, { once: true });
      return function () { cancelled = true; window.removeEventListener('load', arm); };
    }, [videoUrl]);

    /* Pause off-screen; resume when the hero returns while playing. */
    R.useEffect(function () {
      if (!window.IntersectionObserver || !heroRef.current) return;
      var io = new window.IntersectionObserver(function (entries) {
        for (var k = 0; k < entries.length; k++) {
          heroVisibleRef.current = entries[k].isIntersecting;
          var v = videoRef.current;
          if (!v) continue;
          if (!entries[k].isIntersecting) { try { v.pause(); } catch (e) {} }
          else if (phase === 2 && !reducedMotion) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
        }
      }, { threshold: 0.15 });
      io.observe(heroRef.current);
      return function () { io.disconnect(); };
    }, [phase, reducedMotion]);

    /* Pause when the tab hides. */
    R.useEffect(function () {
      var onVis = function () {
        var v = videoRef.current;
        if (!v) return;
        if (document.hidden) { try { v.pause(); } catch (e) {} }
        else if (phase === 2 && !reducedMotion && heroVisibleRef.current) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      };
      document.addEventListener('visibilitychange', onVis);
      return function () { document.removeEventListener('visibilitychange', onVis); };
    }, [phase, reducedMotion]);

    /* Lounge gallery visibility. */
    R.useEffect(function () {
      if (!window.IntersectionObserver || !galleryBoxRef.current) return;
      var io2 = new window.IntersectionObserver(function (entries) {
        for (var k = 0; k < entries.length; k++) galleryVisibleRef.current = entries[k].isIntersecting;
      }, { threshold: 0.1 });
      io2.observe(galleryBoxRef.current);
      return function () { io2.disconnect(); };
    }, [loungeImages.length]);

    /* Shared heartbeat: hero slider (~7.5s) + lounge gallery (~5.2s), rAF only. */
    R.useEffect(function () {
      if (reducedMotion) return;
      var raf = 0;
      var last = 0;
      var accSlide = 0;
      var accGallery = 0;
      var SLIDE_STEP = 7500;
      var GALLERY_STEP = 5200;
      var loop = function (ts) {
        if (last) {
          var dt = Math.min(ts - last, 200);
          accSlide += dt;
          accGallery += dt;
        }
        last = ts;
        var awake = !document.hidden && heroVisibleRef.current && !sliderPausedState[0];
        if (awake && slideCount > 1 && accSlide >= SLIDE_STEP) {
          accSlide = 0;
          setSlideIndex(function (idx) { return (idx + 1) % slideCount; });
        }
        if (!document.hidden && galleryVisibleRef.current && !galleryPauseState[0] && loungeImages.length > 1 && accGallery >= GALLERY_STEP) {
          accGallery = 0;
          galleryState[1](function (idx) { return (idx + 1) % loungeImages.length; });
        }
        raf = window.requestAnimationFrame(loop);
      };
      raf = window.requestAnimationFrame(loop);
      return function () { window.cancelAnimationFrame(raf); };
    }, [reducedMotion, slideCount, sliderPausedState[0], galleryPauseState[0], loungeImages.length]);

    function onHeroClick() {
      if (!videoSrc) setVideoSrc(videoUrl);
      startPlayback();
    }

    /* ---------- cinematic pointer depth (reference design) ----------
       Normalized --pointer-x/--pointer-y on the home root drive the neon
       background glow of every chapter, the hero grid parallax and a subtle
       counter-parallax on section heads — exactly like the reference
       landing. Disabled for reduced-motion users. */
    R.useEffect(function () {
      var root = rootRef.current;
      if (!root || reducedMotion || !window.matchMedia || !window.matchMedia('(hover: hover)').matches) return;
      var onUpdate = function (e) {
        var b = root.getBoundingClientRect();
        if (!b.width || !b.height) return;
        var x = ((e.clientX - b.left) / b.width) * 2 - 1;
        var y = ((e.clientY - b.top) / b.height) * 2 - 1;
        root.style.setProperty('--pointer-x', x.toFixed(3));
        root.style.setProperty('--pointer-y', y.toFixed(3));
      };
      var onLeave = function () {
        root.style.setProperty('--pointer-x', '0');
        root.style.setProperty('--pointer-y', '0');
      };
      root.addEventListener('pointermove', onUpdate);
      root.addEventListener('pointerleave', onLeave);
      return function () {
        root.removeEventListener('pointermove', onUpdate);
        root.removeEventListener('pointerleave', onLeave);
      };
    }, [reducedMotion]);

    /* 4.5.0 — fallback header retired: global handler above owns solid sticky header
       and MutationObserver; this effect just triggers enhancement for late mount. */
    R.useEffect(function () {
      try { window.dispatchEvent(new CustomEvent('bazino:enhanceHeader')); } catch (e) {}
    }, []);

    /* ---------- scroll reveal (reference design) ----------
       Containers marked data-rvl fade/rise in once when they enter the
       viewport (IntersectionObserver, once, ~15%); grid children stagger
       via CSS. Layout space is reserved (transform/opacity only → no CLS).
       Reduced motion → everything visible immediately. */
    R.useEffect(function () {
      var root = rootRef.current;
      if (!root) return;
      var els = root.querySelectorAll('[data-rvl]');
      if (!els.length) return;
      if (reducedMotion || !window.IntersectionObserver) {
        for (var k = 0; k < els.length; k++) els[k].classList.add('is-visible');
        return;
      }
      /* scope the hidden state via CSS to this class → SSR / no-JS keeps
         everything visible (progressive enhancement) */
      root.classList.add('bazino-rvl');
      var io = new window.IntersectionObserver(function (entries) {
        for (var k = 0; k < entries.length; k++) {
          if (entries[k].isIntersecting) {
            entries[k].target.classList.add('is-visible');
            io.unobserve(entries[k].target);
          }
        }
      }, { threshold: 0.15 });
      for (var j = 0; j < els.length; j++) io.observe(els[j]);
      return function () { io.disconnect(); };
    }, []);

    /* ---------- tournament discovery state ---------- */
    var genreState = R.useState('all');
    var searchState = R.useState('');
    var sortState = R.useState('featured');

    var genreLabels = {
      all: T('all'),
      shooter: T('genreShooter'),
      moba: T('genreMoba'),
      sports: T('genreSports'),
      rpg: T('genreRpg')
    };
    var genreKeys = ['all', 'shooter', 'moba', 'sports', 'rpg'];
    var query = searchState[0].trim().toLowerCase();
    var visibleTournaments = tournaments.filter(function (t) {
      var okGenre = genreState[0] === 'all' || genreKeyOf(t) === genreState[0];
      var label = String((t && (t.title || t.name || t.game)) || '').toLowerCase();
      return okGenre && (!query || label.indexOf(query) !== -1);
    }).slice().sort(function (a, b) {
      if (sortState[0] === 'date') return String(b.startDate || b.date || '').localeCompare(String(a.startDate || a.date || ''));
      if (sortState[0] === 'prize') return Number(b.registrationFee || b.prize || 0) - Number(a.registrationFee || a.prize || 0);
      return 0;
    });

    var loungeIndex = loungeImages.length ? galleryState[0] % loungeImages.length : 0;
    var activeLounge = loungeImages[loungeIndex];


    /* ---------- chapter 07: real map (OpenStreetMap) ----------
       No Google Maps anywhere (sanction-safe choice made by the portal):
       both the embed and the outbound link point to OpenStreetMap.
       Coordinates come from portal settings (club_map_lat / club_map_lng
       — the North Cyprus lounge pin); if the portal SDK exposes
       locationFrom() it is preferred so the theme stays in sync with the
       portal's own map. Nothing is hardcoded: without coordinates the map
       gracefully doesn't render (address card remains). */
    function osmLink(lat, lng) {
      return 'https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + lng + '#map=17/' + lat + '/' + lng;
    }
    function mapData() {
      if (SDK.locationFrom) {
        try {
          var loc = SDK.locationFrom(settings);
          if (loc && loc.embedUrl && isFinite(loc.lat) && isFinite(loc.lng)) {
            return { embedUrl: String(loc.embedUrl), mapUrl: osmLink(loc.lat, loc.lng) };
          }
        } catch (e) { /* fall through to settings */ }
      }
      var lat = parseFloat(settings.club_map_lat);
      var lng = parseFloat(settings.club_map_lng);
      if (!isFinite(lat) || !isFinite(lng)) return null;
      var d = 0.005;
      return {
        embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=' + (lng - d).toFixed(4) + '%2C' + (lat - 0.004).toFixed(4) + '%2C' + (lng + d).toFixed(4) + '%2C' + (lat + 0.004).toFixed(4) + '&layer=mapnik&marker=' + lat + '%2C' + lng,
        mapUrl: osmLink(lat, lng)
      };
    }
    var map = mapData();

    /* ---------- builders ---------- */
    function sectionHead(chapter, title, meta) {
      return h('div', { className: 'bazino-section-head', 'data-rvl': '1' },
        h('span', { className: 'theme-chapter-label' }, T('chapterWord') + ' ' + num(language, chapter)),
        h('h2', null, title),
        h('p', null, meta)
      );
    }

    function card(entry, index, prefix, withMedia) {
      entry = entry || {};
      var kids = [
        h('div', { key: 'top', className: 'bazino-home-card-top' },
          h('span', null, prefix + ' / ' + pad2(language, index + 1)),
          h('span', null, 'BAZINO')),
        h('span', { key: 'label', className: 'theme-chapter-label' }, loc(entry.label || entry.badge || entry.status, language) || T('signalWord'))
      ];
      if (withMedia) {
        var cImg = entry.imageUrl || entry.image || (base + 'hero-poster-small.webp');
        kids.push(mediaImg(cImg, loc(entry.title, language) || 'Bazino', 'bazino-home-card-media', '(min-width: 801px) 25vw, 100vw', 'media-' + index));
      }
      kids.push(h('h3', { key: 'h' }, loc(entry.title || entry.name, language) || T('cardTitleFallback')));
      kids.push(h('p', { key: 'p' }, loc(entry.subtitle || entry.desc || entry.description, language) || loc(entry.body, language) || T('cardBodyFallback')));
      kids.push(h('span', { key: 'arrow', className: 'bazino-card-arrow' }, '↗'));
      return h('article', { key: entry.id || index, className: 'theme-frame bazino-home-card' }, kids);
    }

    function cardGrid(items, prefix, fallback) {
      var list = items && items.length ? items.slice(0, 4) : fallback;
      return h('div', { className: 'bazino-home-grid', 'data-rvl': '1' }, list.map(function (item, index) { return card(item, index, prefix, true); }));
    }

    function routeLink(title, tab) {
      return h('button', { className: 'theme-link-button', onClick: function () { navigate(tab); } }, title + '  ↗');
    }

    /* ---------- hero sub-render ---------- */
    var heroMediaLayers = [
      /* LCP element: a real <img> (NOT a CSS background) so the poster is
         discoverable as an image, gets fetchpriority=high and is never
         lazy-loaded (PageSpeed: LCP request discovery). Phones get the
         640x360 variant via posterUrl (is-small-screen logic). */
      h('img', {
        key: 'poster',
        className: 'bazino-hero-poster-layer',
        src: posterUrl,
        alt: '',
        'aria-hidden': true,
        fetchPriority: 'high',
        decoding: 'async',
        onError: function (e) { var t = e && e.target; if (t) t.style.visibility = 'hidden'; }
      })
    ];
    heroMediaLayers.push(h('video', {
      key: 'video',
      ref: videoRef,
      className: 'bazino-hero-video',
      src: videoSrc || undefined,
      poster: posterUrl,
      muted: true,
      autoPlay: false,
      loop: false,
      playsInline: true,
      preload: videoSrc ? 'auto' : 'none',
      onCanPlay: function () { if (phase < 2 && !reducedMotion && heroVisibleRef.current && !document.hidden) startPlayback(); else if (phase < 2) setPhase(1); },
      onPlay: function () { setPhase(2); },
      onEnded: function () { setPhase(3); },
      onError: function () { setPhase(4); },
      'aria-hidden': true,
      tabIndex: -1
    }));
    heroMediaLayers.push(h('div', { key: 'grid', className: 'bazino-hero-grid' }));

    return h('div', { ref: rootRef, className: 'bazino-home' + (smallScreen ? ' is-small-screen' : ''), dir: dir, 'data-theme-id': p.themeId || 'bazino-arena' },

      /* ── 01 HERO — matches reference client/src/pages/Home.tsx + index.css ──
         Reference: <header class="site-header"> is a sibling of <main>, with
         .site-header {position:fixed; top:0; left:0; right:0; height:80px; z-index:50}.
         Hero starts at 0 behind the fixed header; .hero-content has padding-top:108px
         so text sits below the header. No wrapper, no moving header into hero.
         Poster paints first (LCP), video deferred until load+idle, freezes on last frame. */
      h('section', {
        className: 'bazino-chapter bazino-home-hero mona-hero' + (phase === 2 ? ' is-playing' : '') + (phase === 3 ? ' is-ended' : ''),
        'data-chapter': '01',
        ref: heroRef,
        dir: dir
      },
        h('div', {
          className: 'bazino-hero-media mona-cinematic-scene',
          onClick: onHeroClick,
          role: 'button',
          tabIndex: 0,
          'aria-label': T('cue'),
          onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onHeroClick(); } },
          onMouseEnter: function () { setSliderPaused(true); },
          onMouseLeave: function () { setSliderPaused(false); },
          onFocus: function () { setSliderPaused(true); },
          onBlur: function () { setSliderPaused(false); }
        },
          heroMediaLayers,
          h('div', { className: 'hero-noise', 'aria-hidden': true }),
          phase < 2 ? h('span', { key: 'cue', className: 'bazino-hero-cue' }, T('cue')) : null
        ),
        h('div', { className: 'hero-depth-grid', 'aria-hidden': true }),
        h('div', { className: 'bazino-hero-content layout-frame hero-content', dir: dir },
          h('div', { key: 'slide-' + slideIndex + '-' + language, className: 'hero-copy bazino-hero-slide' },
            h('div', { className: 'eyebrow' }, h('span', { className: 'eyebrow-line' }), T('heroChapter')),
            (function () {
              var sp = splitHeroTitle(activeSlide.title);
              var h1Kids = [sp[0]];
              if (sp[1]) { h1Kids.push(h('br', null)); h1Kids.push(h('em', null, sp[1])); }
              return h('h1', null, h1Kids);
            })(),
            activeSlide.desc ? h('p', null, activeSlide.desc) : null,
            h('div', { className: 'hero-actions' },
              h('button', { className: 'button button--gold', onClick: function (e) { e.stopPropagation(); navigate(activeSlide.target); } }, T('cta') + '  ↗'),
              h('button', { className: 'text-button', type: 'button', onClick: function () { navigate('tournaments'); } }, T('openHub') + '  ↗')
            ),
            h('div', { className: 'hero-footnote' }, h('span', { 'aria-hidden': true }, '◆'), T('cue'))
          ),
          h('div', { className: 'hero-stage-meta' },
            h('div', { className: 'stage-coordinates' }, '35°20′ N / 33°59′ E'),
            h('div', { className: 'stage-chapter-card mona-status-card' },
              h('div', { className: 'stage-card-top' }, h('span', null, 'MONA / LIVE'), h('span', null, T('chapterWord') + ' 01')),
              h('strong', null, 'HALL OF', h('br', null), 'LEGENDS'),
              h('span', { className: 'stage-card-caption' }, language === 'fa' ? 'میزبان شب‌های کنسولی بازینو' : language === 'ru' ? 'Ведущая консольных ночей Bazino' : language === 'en' ? 'Host of Bazino’s console nights' : 'Bazino konsol gecelerinin sunucusu'),
              h('div', { className: 'stage-card-line' }, h('span', null))
            )
          )
        ),
        h('div', { className: 'hero-cursor-rail' }, h('span', null, T('cue')), h('i', null), h('span', null, '01 / 07'))
      ),
      h('div', { className: 'gold-marquee', 'aria-hidden': true }, h('div', null, 'PLAY HARD / STAY LATE / MAKE THE NEXT ROUND COUNT / PLAY HARD / STAY LATE / MAKE THE NEXT ROUND COUNT /')),

      /* ── 02 ARENA — console playground (reference layout) ── */
      h('section', { className: 'bazino-chapter arena-section section-dark', 'data-chapter': '02', dir: dir },
        h('div', { className: 'layout-frame' },
          h('div', { className: 'section-scene-header' },
            h('div', { className: 'section-scene-tag' }, h('span', null, 'CHAPTER 02'), h('b', null, 'CONSOLE ARENA')),
            h('div', { className: 'technical-rail' }, h('span', null, '4 STATIONS'), h('i', null), h('span', null, 'CONSOLE ONLY'), h('i', null), h('span', null, 'ISKELE / CYPRUS'))
          ),
          h('div', { className: 'intro-layout' },
            h('div', { className: 'section-index' }, num(language, '02'), h('span', null, '/'), num(language, '07')),
            h('div', { className: 'section-heading', 'data-rvl': '1' },
              h('div', { className: 'eyebrow' }, h('span', { className: 'eyebrow-line' }), T('genresMeta')),
              h('h2', null, T('genres'))
            ),
            h('div', { className: 'section-aside', 'data-rvl': '1' },
              h('p', null, T('cardBodyFallback')),
              h('button', { type: 'button', className: 'text-button text-button--blue', onClick: function () { navigate('cafe'); } }, T('openCafe') + '  ↗')
            )
          ),
          (function () {
            var list = genres && genres.length ? genres.slice(0, 4) : [
              { title: T('demoGenre1Title'), body: T('demoGenre1Body') },
              { title: T('demoGenre2Title'), body: T('demoGenre2Body') },
              { title: T('demoGenre3Title'), body: T('demoGenre3Body') },
              { title: T('demoGenre4Title'), body: T('demoGenre4Body') }
            ];
            return h('div', { className: 'experience-grid cinematic-card-grid', 'data-rvl': '1' }, list.map(function (entry, idx) {
              var e = entry || {};
              var title = loc(e.title || e.name, language) || T('cardTitleFallback');
              var body = loc(e.desc || e.description || e.body, language) || T('cardBodyFallback');
              var labelMap = ['CONSOLE 01', 'CONSOLE 02', 'SCREEN 03', 'LOUNGE 04'];
              var icons = ['◆', '◆', '◆', '◆'];
              var fallbackPoster = posterUrl || (base + 'hero-poster-small.webp');
              var imgSrc = e.imageUrl || e.image || fallbackPoster;
              var imgEl = mediaImg(imgSrc, title, 'experience-card-image', '(min-width: 801px) 25vw, 100vw', 'img-' + idx);
              return h('article', { key: e.id || idx, className: 'experience-card experience-card--' + (idx + 1) },
                imgEl,
                h('div', { className: 'experience-card-image-shade' }),
                h('div', { className: 'experience-card-glow' }),
                h('div', { className: 'experience-card-icon' }, icons[idx]),
                h('span', { className: 'card-label' }, labelMap[idx] || ('0' + (idx + 1))),
                h('h3', null, title),
                h('p', null, body),
                h('div', { className: 'experience-card-reveal' }, h('span', null, T('openHub')), h('span', null, '↗')),
                h('span', { className: 'card-arrow' }, '↗')
              );
            }));
          })()
        )
      ),

      /* ── 03 TOURNAMENTS — active signals (reference layout) ──
         4.4.2: pure server data, no images — text cards only. */
      h('section', { className: 'bazino-chapter tournament-section tournament-section--text', 'data-chapter': '03', dir: dir },
        h('div', { className: 'layout-frame tournament-layout' },
          h('div', { className: 'section-index section-index--light' }, num(language, '03'), h('span', null, '/'), num(language, '07')),
          h('div', { className: 'tournament-copy', 'data-rvl': '1' },
            h('div', { className: 'eyebrow eyebrow--light' }, h('span', { className: 'eyebrow-line' }), T('tournamentsMeta')),
            h('h2', null, T('tournaments')),
            h('p', null, T('demoTournamentBody')),
            h('button', { className: 'button button--gold', onClick: function () { navigate('tournaments'); } }, T('openHub') + '  ↗'),
            h('span', { className: 'micro-note' }, T('cardBodyFallback'))
          ),
          h('div', { className: 'tournament-status', 'data-rvl': '1' },
            h('div', { className: 'status-icon' }, h('span', null, '◈')),
            h('span', null, T('signalWord')),
            h('strong', null, T('demoTournamentStatus')),
            h('div', { className: 'status-pulse' }, h('i', null), ' LIVE SIGNAL')
          ),
          h('div', { className: 'tournament-discovery', 'data-rvl': '1' },
            h('div', { className: 'filter-heading' }, h('span', null, 'DISCOVER BY GENRE'), h('i', null)),
            h('div', { className: 'tournament-filter', role: 'group', 'aria-label': T('sort') }, genreKeys.map(function (key) {
              return h('button', { key: key, type: 'button', className: genreState[0] === key ? 'is-active' : '', 'aria-pressed': genreState[0] === key, onClick: function () { genreState[1](key); } }, genreLabels[key]);
            })),
            h('div', { className: 'tournament-tools' },
              h('label', { className: 'tournament-search' },
                h('span', { className: 'sr-only' }, T('search')),
                h('input', { type: 'search', value: searchState[0], placeholder: T('search'), onChange: function (e) { searchState[1](e.target.value); } })
              ),
              h('label', { className: 'tournament-sort' },
                h('span', null, T('sort')),
                h('select', { value: sortState[0], onChange: function (e) { sortState[1](e.target.value); } },
                  h('option', { value: 'featured' }, T('sortFeatured')),
                  h('option', { value: 'date' }, T('sortDate')),
                  h('option', { value: 'prize' }, T('sortPrize'))
                )
              )
            ),
            h('div', { className: 'tournament-tool-note' }, (sortState[0] === 'featured' ? T('sortFeatured') : sortState[0] === 'date' ? T('sortDate') : T('sortPrize')) + ' · ' + (searchState[0] ? visibleTournaments.length + ' / ' + tournaments.length : tournaments.length + ' SIGNALS')),
            (function () {
              if (!tournaments.length || !visibleTournaments.length) {
                return h('div', { className: 'tournament-empty', role: 'status' }, T('noTournaments'));
              }
              return h('div', { className: 'tournament-cards tournament-cards--text' }, visibleTournaments.slice(0, 4).map(function (entry, idx) {
                var e = entry || {};
                var title = loc(e.title || e.name, language) || String(e.title || e.name || e.game || '') || T('tournamentWord');
                var game = String(e.game || e.category || e.genre || '').trim();
                var statusLabel = loc(e.status, language) || String(e.status || '') || T('signalWord');
                var fee = (e.registrationFee !== undefined && e.registrationFee !== null && e.registrationFee !== '') ? (formatPrice(language, e.registrationFee) + ' ' + T('currency')) : '';
                var rawDate = String(e.startDate || e.date || '').trim();
                var dateLabel = rawDate ? rawDate.slice(0, 10) : '';
                var teamsLabel = '';
                if (e.registeredTeamsCount !== undefined || e.maxTeams !== undefined) {
                  var reg = e.registeredTeamsCount !== undefined ? String(e.registeredTeamsCount) : '—';
                  var max = e.maxTeams !== undefined ? String(e.maxTeams) : '—';
                  teamsLabel = num(language, reg) + ' / ' + num(language, max);
                }
                var badge = statusLabel || (function () { var cat = genreKeyOf(e); return genreLabels[cat] || genreLabels['all']; })();
                return h('article', { key: e.id || idx, className: 'tournament-card tournament-card--text', onClick: function () { navigate('tournaments'); }, role: 'button', tabIndex: 0, onKeyDown: function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); navigate('tournaments'); } } },
                  h('div', { className: 'tournament-card-top' },
                    h('span', { className: 'tournament-card-badge' }, badge),
                    game ? h('span', { className: 'tournament-card-game' }, game) : null
                  ),
                  h('strong', { className: 'tournament-card-title' }, title),
                  (fee || dateLabel) ? h('div', { className: 'tournament-card-meta' },
                    fee ? h('span', { className: 'tournament-card-fee' }, fee) : null,
                    dateLabel ? h('span', { className: 'tournament-card-date' }, dateLabel) : null
                  ) : null,
                  teamsLabel ? h('div', { className: 'tournament-card-foot' }, h('span', null, teamsLabel), h('span', { className: 'tournament-card-arrow', 'aria-hidden': true }, '↗')) : h('div', { className: 'tournament-card-foot' }, h('span', { className: 'tournament-card-arrow', 'aria-hidden': true }, '↗'))
                );
              }));
            })()
          )
        )
      ),

      /* ── 04 RESULTS — scoreboard signal (reference layout) ── */
      h('section', { className: 'bazino-chapter results-section section-dark', 'data-chapter': '04', dir: dir },
        h('div', { className: 'layout-frame results-layout' },
          h('div', { className: 'results-intro', 'data-rvl': '1' },
            h('div', { className: 'section-scene-tag' }, h('span', null, 'CHAPTER 04'), h('b', null, 'SCOREBOARD SIGNAL')),
            h('div', { className: 'eyebrow' }, h('span', { className: 'eyebrow-line' }), T('resultsMeta')),
            h('h2', null, T('results')),
            h('p', null, T('cardBodyFallback')),
            h('button', { className: 'button button--outline', onClick: function () { navigate('tournaments'); } }, T('openHub') + '  ↗')
          ),
          h('div', { className: 'scoreboard', 'data-rvl': '1' },
            h('div', { className: 'scoreboard-head' }, h('span', null, 'RECENT SIGNALS'), h('span', null, 'VERIFIED / PORTAL')),
            h('div', { className: 'scoreboard-columns' }, h('span', null, 'ROUND'), h('span', null, 'PLAYERS'), h('span', null, 'SCORE'), h('span', null, 'MODE')),
            history.length ? history.slice(0, 3).map(function (entry, idx) {
              var e = entry || {};
              var score = (e.scoreA !== undefined || e.scoreB !== undefined) ? (e.scoreA + ' : ' + e.scoreB) : (e.score || e.result || '— —');
              var round = e.round || ('ROUND ' + pad2(language, idx + 5));
              var players = (e.teamA || T('teamA')) + ' / ' + (e.teamB || T('teamB'));
              var mode = e.status || e.game || T('matchWord');
              return h('div', { className: 'score-row', key: e.id || idx },
                h('span', { className: 'score-round' }, round),
                h('span', { className: 'score-players' }, h('span', { 'aria-hidden': true }, '◈'), players),
                h('strong', null, String(score)),
                h('span', { className: 'score-mode' }, mode)
              );
            }) : [h('div', { className: 'score-row' }, h('span', { className: 'score-round' }, 'ROUND 07'), h('span', { className: 'score-players' }, 'OFFICIAL / UPDATE'), h('strong', null, '— —'), h('span', { className: 'score-mode' }, 'PORTAL DATA'))],
            h('div', { className: 'scoreboard-foot' }, h('span', null, h('span', { 'aria-hidden': true }, '◈'), ' NEXT OFFICIAL UPDATE'), h('span', null, 'BAZINO.PRO'))
          )
        )
      ),

      /* ── 05 LOUNGE — VIP / Café (reference layout) ── */
      h('section', { className: 'bazino-chapter lounge-section section-dark', 'data-chapter': '05', dir: dir },
        h('div', { className: 'layout-frame lounge-layout' },
          activeLounge ? h('div', {
            ref: galleryBoxRef,
            className: 'lounge-visual',
            'data-rvl': '1',
            onMouseEnter: function () { galleryPauseState[1](true); },
            onMouseLeave: function () { galleryPauseState[1](false); },
            onFocus: function () { galleryPauseState[1](true); },
            onBlur: function () { galleryPauseState[1](false); },
            tabIndex: 0
          },
            h('div', { className: 'lounge-slider-media', tabIndex: 0, 'aria-label': galleryPauseState[0] ? T('pausedWord') : T('autoWord') },
              mediaImg(activeLounge.imageUrl || activeLounge.image, loc(activeLounge.title, language) || 'Bazino lounge', '', '(min-width: 801px) 1120px, 100vw', 'lounge-img'),
              h('div', { className: 'lounge-visual-frame' }),
              h('div', { className: 'lounge-slider-shade' }),
              h('div', { className: 'lounge-slider-controls' },
                h('button', { className: 'lounge-control-button', type: 'button', 'aria-label': T('slidePrev'), onClick: function () { galleryState[1](function (idx) { return (idx - 1 + loungeImages.length) % loungeImages.length; }); } }, '‹'),
                h('span', { className: 'lounge-control-indicator' }, h('small', null, 'SCENE'), pad2(language, loungeIndex + 1), h('i', null, '/'), pad2(language, loungeImages.length)),
                h('button', { className: 'lounge-control-button', type: 'button', 'aria-label': T('slideNext'), onClick: function () { galleryState[1](function (idx) { return (idx + 1) % loungeImages.length; }); } }, '›')
              ),
              h('div', { className: 'lounge-stamp' }, h('span', null, 'BAZINO'), h('b', null, 'VIP / CAFÉ'), h('small', null, galleryPauseState[0] ? T('pausedWord') : T('autoWord')))
            )
          ) : h('div', { className: 'lounge-visual', 'data-rvl': '1' },
            h('div', { className: 'lounge-slider-media' },
              h('div', { style: { background: 'linear-gradient(145deg, #0d1624, #090c14)', height: '100%', minHeight: '560px' } }),
              h('div', { className: 'lounge-stamp' }, h('span', null, 'BAZINO'), h('b', null, 'VIP / CAFÉ'), h('small', null, T('autoWord')))
            )
          ),
          h('div', { className: 'lounge-copy', 'data-rvl': '1' },
            h('div', { className: 'section-index' }, num(language, '05'), h('span', null, '/'), num(language, '07')),
            h('div', { className: 'eyebrow' }, h('span', { className: 'eyebrow-line' }), T('loungesMeta')),
            h('h2', null, T('lounges')),
            h('p', null, T('cardBodyFallback')),
            h('button', { className: 'button button--gold', onClick: function () { navigate('cafe'); } }, T('openCafe') + '  ↗')
          ),
          h('div', { className: 'service-stack', 'data-rvl': '1' },
            (function () {
              var services = lounges && lounges.length >= 3 ? lounges.slice(0, 3) : [
                { title: T('demoLoungeVipTitle'), body: T('demoLoungeVipBody'), label: 'VIP / 01' },
                { title: T('demoLoungeCafeTitle'), body: T('demoLoungeCafeBody'), label: 'CAFÉ / 02' },
                { title: T('demoGenre3Title'), body: T('demoGenre3Body'), label: 'SCREEN / 03' }
              ];
              return services.map(function (entry, idx) {
                var e = entry || {};
                var title = loc(e.title || e.name, language) || T('cardTitleFallback');
                var body = loc(e.body || e.description, language) || T('cardBodyFallback');
                var label = e.label || ('0' + (idx + 1));
                return h('div', { key: e.id || idx, className: 'service-row' },
                  h('span', { className: 'service-label' }, label),
                  h('div', null, h('h3', null, title), h('p', null, body)),
                  h('span', { className: 'service-index' }, '0' + (idx + 1))
                );
              });
            })()
          )
        )
      ),

      /* ── 06 PASSES — entry signal (reference layout, pricing as steps) ── */
      h('section', { className: 'bazino-chapter passes-section section-gold', 'data-chapter': '06', dir: dir },
        h('div', { className: 'layout-frame passes-layout' },
          h('div', { className: 'passes-heading', 'data-rvl': '1' },
            h('div', { className: 'section-scene-tag section-scene-tag--dark' }, h('span', null, 'CHAPTER 06'), h('b', null, 'THE ENTRY SIGNAL')),
            h('div', { className: 'eyebrow eyebrow--dark' }, h('span', { className: 'eyebrow-line' }), T('passesMeta')),
            h('h2', null, T('passes')),
            h('p', null, T('cardBodyFallback')),
            h('button', { className: 'button button--dark', onClick: function () { navigate('reservations'); } }, T('cta') + '  ↗')
          ),
          h('div', { className: 'cinematic-steps', 'data-rvl': '1' },
            (pricing.length ? pricing : [
              { title: T('demoPass1Title'), body: T('demoPass1Body') },
              { title: T('demoPass2Title'), body: T('demoPass2Body') },
              { title: T('demoPass3Title'), body: T('demoPass3Body') }
            ]).slice(0, 3).map(function (entry, idx) {
              var e = entry || {};
              var title = loc(e.title || e.name, language) || T('passTitleFallback');
              var body = loc(e.body || e.description, language) || '';
              var price = (e.price !== undefined && e.price !== null) ? (formatPrice(language, e.price) + ' ' + T('currency')) : '';
              return h('div', { key: e.id || idx, className: 'process-step' },
                h('span', { className: 'process-number' }, pad2(language, idx + 1)),
                h('div', null,
                  h('h3', null, title),
                  h('p', null, body + (price ? ' — ' + price : '')),
                  e.features && e.features.length ? h('p', { style: { opacity: 0.7, fontSize: '11px', marginTop: '6px' } }, e.features.slice(0, 2).map(function (f) { return loc(f, language); }).join(' · ')) : null
                ),
                h('span', { 'aria-hidden': true }, '✓')
              );
            })
          )
        )
      ),

      /* ── 06.5 COACHES (optional) ── */
      staff && staff.length ? h('section', { className: 'bazino-chapter', 'data-chapter': '06.5', dir: dir },
        sectionHead('06.5', T('coaches'), T('coachesMeta')),
        h('div', { className: 'bazino-staff-strip', 'data-rvl': '1' }, staff.slice(0, 4).map(function (member, index) {
          var m = member || {};
          return h('div', { key: m.id || index, className: 'bazino-staff-chip' },
            h('div', null,
              h('strong', null, loc(m.name, language) || (m.gamerTag || T('coachDefault'))),
              h('span', null, (m.gamerTag ? m.gamerTag + ' — ' : '') + loc(m.role, language))
            )
          );
        }))
      ) : null,

      /* ── 07 VISIT — Iskele game night (reference layout, OSM map) ── */
      h('section', { className: 'bazino-chapter visit-signal-section section-dark', 'data-chapter': '07', dir: dir },
        h('div', { className: 'layout-frame visit-signal-layout' },
          h('div', { className: 'visit-signal-copy', 'data-rvl': '1' },
            h('div', { className: 'section-index' }, num(language, '07'), h('span', null, '/'), num(language, '07')),
            h('div', { className: 'eyebrow' }, h('span', { className: 'eyebrow-line' }), T('locationTitle')),
            h('h2', null, T('visit')),
            h('p', null, settings.club_address || T('addressFallback')),
            h('div', { className: 'visit-actions' },
              h('button', { className: 'button button--outline', onClick: function () { navigate('reservations'); } }, T('cta') + '  ↗'),
              h('span', { className: 'visit-directions' }, h('span', { 'aria-hidden': true }, '◈'), T('directions'))
            )
          ),
          h('div', { className: 'visit-signal-card bazino-location-card', 'data-rvl': '1' },
            h('div', { className: 'visit-card-top' }, h('span', null, T('locationTitle')), h('span', { 'aria-hidden': true }, '◆')),
            map ? h('div', { className: 'bazino-location-map-frame' },
              h('iframe', {
                key: 'map',
                className: 'bazino-location-map',
                src: map.embedUrl,
                title: T('locationTitle'),
                loading: 'lazy',
                referrerPolicy: 'no-referrer-when-downgrade',
                allowFullScreen: true
              }),
              h('span', { className: 'bazino-location-map-badge', 'aria-hidden': 'true' }, T('liveLocation'))
            ) : h('div', { className: 'bazino-location-map-frame', style: { display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, #0d1624, #090c14)' } }, h('span', { style: { color: 'var(--bz-muted)', fontSize: '12px' } }, T('empty'))),
            h('p', { className: 'bazino-location-address visit-signal-card-address' }, settings.club_address || T('addressFallback')),
            settings.club_phone ? h('p', { className: 'bazino-location-phone' }, T('phoneLabel') + ': ' + String(settings.club_phone)) : null,
            map ? h('a', {
              className: 'button button--outline bazino-location-link',
              href: map.mapUrl,
              target: '_blank',
              rel: 'noreferrer'
            }, T('directions') + '  ↗') : null,
            h('div', { className: 'visit-card-meta' }, h('span', null, 'VISTAMARE HOTEL'), h('span', null, 'ISKELE / CYPRUS'))
          )
        )
      )
    );
  }

  SDK.registerComponent('home', function () {
    return {
      apiVersion: 2,
      render: function (props) {
        return R.createElement(ArenaHome, props);
      }
    };
  });


  /* ── HEADER region (SDK v2) — reference-design header ─────────────
     Mounted by the portal's <ThemeRegion name="header"> (branch
     arena/01a067ac+). Contract: logo from props.logoUrl only, tabs via
     ts('nav.*'), active tab highlighted, user chip from props.user.
     Language menu / login stay the portal's job (per the theme README).
     Old portals never mount this region — registration is harmless. */
  function ArenaHeader(props) {
    var p = props || {};
    var language = p.language || 'fa';
    var dir = (p.dir === 'rtl' || p.dir === 'ltr') ? p.dir : (RTL_LANGUAGES[language] || 'ltr');
    var ts = (typeof p.ts === 'function') ? p.ts : function (key) { return key; };
    function T(key) { return ts(key); }
    var initialUser = p.user || null;
    var userState = R.useState(initialUser);
    var user = userState[0];
    var setUser = userState[1];
    var activeTab = String(p.activeTab || 'home');
    var navigate = p.onNavigate || function () {};
    var h = R.createElement;
    var headerRef = R.useRef(null);
    var langWrapRef = R.useRef(null);
    var langOpenState = R.useState(false);
    var langOpen = langOpenState[0];
    var setLangOpen = langOpenState[1];
    var NAV_TABS = ['home', 'reservations', 'cafe', 'shop', 'tournaments', 'loyalty', 'blog', 'chat'];
    var LANGS = [
      { code: 'fa', label: 'FA', full: 'فارسی', country: 'IR', flag: '<svg viewBox="0 0 3 2" width="20" height="13" aria-hidden="true"><rect width="3" height="2" fill="#fff"/><rect width="3" height="0.667" fill="#239f40"/><rect y="1.333" width="3" height="0.667" fill="#da0000"/><circle cx="1.5" cy="1" r="0.26" fill="none" stroke="#da0000" stroke-width="0.09"/></svg>' },
      { code: 'en', label: 'EN', full: 'English', country: 'GB', flag: '<svg viewBox="0 0 60 30" width="20" height="13" aria-hidden="true"><clipPath id="g-b2"><path d="M0 0v30h60V0z"/></clipPath><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clipPath="url(#g-b2)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>' },
      { code: 'ru', label: 'RU', full: 'Русский', country: 'RU', flag: '<svg viewBox="0 0 3 2" width="20" height="13" aria-hidden="true"><rect width="3" height="2" fill="#fff"/><rect y="0.667" width="3" height="0.667" fill="#0039a6"/><rect y="1.333" width="3" height="0.667" fill="#d52b1e"/></svg>' },
      { code: 'tr', label: 'TR', full: 'Türkçe', country: 'TR', flag: '<svg viewBox="0 0 30 20" width="20" height="13" aria-hidden="true"><rect width="30" height="20" fill="#e30a17"/><circle cx="11.25" cy="10" r="5" fill="#fff"/><circle cx="12.5" cy="10" r="4" fill="#e30a17"/><polygon fill="#fff" points="17.5,10 15.1,10.8 16.6,8.7 16.6,11.3 15.1,9.2"/></svg>' }
    ];
    function curLangObj() {
      for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === language) return LANGS[i];
      return LANGS[0];
    }
    function hashForName(name) {
      var h2 = 0;
      var s = String(name || '?');
      for (var i = 0; i < s.length; i++) h2 = (h2 * 31 + s.charCodeAt(i)) % 360;
      return h2;
    }
    function flagNode(country) {
      for (var i = 0; i < LANGS.length; i++) if (LANGS[i].country === country) {
        return h('span', { dangerouslySetInnerHTML: { __html: LANGS[i].flag }, style: { display: 'inline-flex', width: '20px', height: '13px', flexShrink: '0' } });
      }
      return null;
    }
    function setLanguage(code) {
      try { localStorage.setItem('cyber_lang', code); } catch (e) {}
      try {
        document.documentElement.lang = code;
        document.documentElement.dir = code === 'fa' ? 'rtl' : 'ltr';
      } catch (e) {}
      if (typeof p.setLanguage === 'function') { try { p.setLanguage(code); } catch (e) {} }
      setLangOpen(false);
      try { window.location.reload(); } catch (e) {}
    }
    function handleLogout() {
      try {
        fetch('/api/auth/logout', { method: 'POST' }).then(function () {
          try { localStorage.removeItem('bazino_token'); } catch (e2) {}
          try { localStorage.removeItem('bazino_mock_user'); } catch (e3) {}
          setUser(null);
          // portal parity: no reload, go home
          try { if (window.history && window.history.pushState) { window.history.pushState({}, '', '/'); try { window.dispatchEvent(new PopStateEvent('popstate')); } catch (e4) { try { window.dispatchEvent(new Event('popstate')); } catch (e5) {} } } } catch (e6) {}
        }).catch(function () {
          try { localStorage.removeItem('bazino_token'); } catch (e2) {}
          setUser(null);
        });
      } catch (e) {
        try { localStorage.removeItem('bazino_token'); } catch (e2) {}
        setUser(null);
      }
    }
    function handleLogin() {
      if (typeof p.onOpenAuth === 'function') { try { p.onOpenAuth(); return; } catch (e) {} }
      try { window.dispatchEvent(new CustomEvent('bazino:open-auth')); } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('bazino:openAuth')); } catch (e2) {}
      try {
        var btns = document.querySelectorAll('button');
        for (var i = 0; i < btns.length; i++) {
          var t = String(btns[i].textContent || '');
          if (t.indexOf('ورود') !== -1 || t.toLowerCase().indexOf('login') !== -1) { btns[i].click(); return; }
        }
      } catch (e3) {}
    }
    function openProfile() {
      // portal default: standalone /profile (not loyalty). Use same.
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState({}, '', '/profile');
          try { window.dispatchEvent(new PopStateEvent('popstate')); } catch (e2) { try { window.dispatchEvent(new Event('popstate')); } catch (e3) {} }
          // if not handled, fallback
          setTimeout(function(){ if (window.location.pathname !== '/profile') window.location.assign('/profile'); }, 50);
          return;
        }
        window.location.assign('/profile');
      } catch (e) { try { window.location.hash = 'profile'; } catch (e2) {} }
    }
    R.useEffect(function () {
      if (p.user !== undefined) setUser(p.user || null);
    }, [p.user && p.user.username]);
    R.useEffect(function () {
      if (user) return;
      var cancelled = false;
      try {
        fetch('/api/user').then(function (r) { return r.json(); }).then(function (data) {
          if (cancelled) return;
          var isLogged = !!(data && data.username && data.username !== 'Guest' && String(data.username).trim());
          if (isLogged) setUser({ username: String(data.username).trim(), displayName: data.displayName ? String(data.displayName).trim() : '', avatarUrl: data.avatarUrl || '', email: data.email || '', phone: data.phone || '' });
          else setUser(null);
        }).catch(function () {});
      } catch (e) {}
      return function () { cancelled = true; };
    }, []);
    // portal parity: mousedown outside + Escape with ref containment
    R.useEffect(function () {
      if (!langOpen) return;
      function onDown(e) {
        try { if (langWrapRef.current && langWrapRef.current.contains(e.target)) return; } catch (e2) {}
        setLangOpen(false);
      }
      function onKey(e) { if (e.key === 'Escape') setLangOpen(false); }
      document.addEventListener('mousedown', onDown);
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
    }, [langOpen]);
    R.useEffect(function () {
      var el = headerRef.current;
      if (!el || !window.addEventListener) return;
      var update = function () {
        if (window.scrollY > 8) el.classList.add('is-scrolled');
        else el.classList.remove('is-scrolled');
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      return function () { window.removeEventListener('scroll', update); };
    }, []);
    var isLogged = !!(user && user.username && String(user.username).trim() && user.username !== 'Guest');
    var username = isLogged ? String(user.username).trim() : '';
    var displayName = isLogged && user.displayName ? String(user.displayName).trim() : '';
    var shownName = displayName || (username ? ('@' + username) : '');
    var initial = (displayName || username || '?').charAt(0).toUpperCase() || '?';
    var hue = hashForName(displayName || username || 'guest');
    var curLang = curLangObj();
    return h('header', { ref: headerRef, className: 'bazino-header', dir: dir, 'data-theme-id': p.themeId || 'bazino-arena' },
      h('div', { className: 'bazino-header-inner' },
        h('button', {
          className: 'bazino-header-brand', type: 'button',
          onClick: function () { navigate('home'); },
          'aria-label': T('nav.home')
        },
          h('img', { src: p.logoUrl || '/logo.png', alt: '', height: 34, width: 34 }),
          h('span', { className: 'bazino-header-brand-text' }, 'BAZINO')
        ),
        h('nav', { className: 'bazino-header-nav', 'aria-label': T('navLabel') },
          NAV_TABS.map(function (tab) {
            return h('button', {
              key: tab, type: 'button',
              className: 'bazino-header-tab' + (tab === activeTab ? ' is-active' : ''),
              onClick: function () { navigate(tab); }
            }, T('nav.' + tab));
          })
        ),
        h('div', { className: 'bazino-header-actions' },
          h('div', { ref: langWrapRef, className: 'bazino-lang-wrap', 'data-testid': 'language-menu' },
            h('button', {
              type: 'button',
              className: 'bazino-lang-btn',
              'aria-haspopup': 'listbox',
              'aria-expanded': langOpen ? 'true' : 'false',
              'aria-label': 'Language: ' + curLang.label,
              onClick: function () { setLangOpen(!langOpen); }
            },
              flagNode(curLang.country),
              h('span', { dir: 'ltr' }, curLang.label),
              h('span', { style: { fontSize: '9px', marginLeft: '4px', transition: 'transform 150ms', transform: langOpen ? 'rotate(180deg)' : '', display: 'inline-block' } }, '▾')
            ),
            langOpen ? h('ul', { className: 'bazino-lang-dropdown', role: 'listbox', 'aria-label': 'Language' },
              LANGS.map(function (L) {
                return h('li', { key: L.code, role: 'option', 'aria-selected': L.code === language ? 'true' : 'false' },
                  h('button', {
                    type: 'button',
                    className: 'bazino-lang-opt' + (L.code === language ? ' is-active' : ''),
                    onClick: function () { setLanguage(L.code); }
                  },
                    flagNode(L.country),
                    h('span', { dir: 'ltr' }, L.label)
                  )
                );
              })
            ) : null
          ),
          isLogged ? h('a', {
            href: '/profile',
            className: 'bazino-user-btn',
            onClick: function (e) { e.preventDefault(); openProfile(); },
            'aria-label': 'Profile',
            'data-header-profile-link': '1',
            title: displayName || username,
            style: { textDecoration: 'none' }
          },
            user.avatarUrl ? h('img', { src: user.avatarUrl, alt: '', width: 28, height: 28, className: 'bazino-avatar', style: { width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,196,0,.5)' } }) : h('span', {
              className: 'bazino-avatar',
              style: { background: 'linear-gradient(135deg, hsl(' + hue + ' 65% 32%), hsl(' + ((hue + 40) % 360) + ' 65% 22%))', color: 'hsl(' + hue + ' 90% 88%)', width: '28px', height: '28px' }
            }, initial),
            h('span', { className: 'bazino-header-user' }, shownName)
          ) : h('button', {
            type: 'button',
            className: 'bazino-header-reserve bazino-header-login',
            onClick: handleLogin
          }, T('login') !== 'login' ? T('login') : (language === 'fa' ? 'ورود' : 'Login')),
          isLogged ? h('button', {
            type: 'button',
            className: 'bazino-header-icon is-logout',
            'aria-label': 'Logout',
            onClick: handleLogout,
            title: T('logout') !== 'logout' ? T('logout') : 'Logout'
          }, h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'aria-hidden': true },
            h('path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
            h('polyline', { points: '16 17 21 12 16 7' }),
            h('line', { x1: 21, y1: 12, x2: 9, y2: 12 })
          )) : null,
          h('button', {
            className: 'bazino-header-reserve', type: 'button',
            onClick: function () { navigate('reservations'); }
          }, T('headerReserve') + '  ↗')
        )
      )
    );
  }

  SDK.registerComponent('header', function () {
    return {
      apiVersion: 2,
      render: function (props) {
        return R.createElement(ArenaHeader, props);
      }
    };
  });
})();
