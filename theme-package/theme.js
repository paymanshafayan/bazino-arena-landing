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
    var posterUrl = String(settings.hero_poster || settings.hero_poster_url || '') || (base + 'hero-poster.webp');

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

    /* ---------- builders ---------- */
    function sectionHead(chapter, title, meta) {
      return h('div', { className: 'bazino-section-head' },
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
      if (withMedia && (entry.imageUrl || entry.image)) {
        kids.push(h('img', { key: 'media', className: 'bazino-home-card-media', src: entry.imageUrl || entry.image, alt: loc(entry.title, language) || 'Bazino', loading: 'lazy', decoding: 'async' }));
      }
      kids.push(h('h3', { key: 'h' }, loc(entry.title || entry.name, language) || T('cardTitleFallback')));
      kids.push(h('p', { key: 'p' }, loc(entry.subtitle || entry.desc || entry.description, language) || loc(entry.body, language) || T('cardBodyFallback')));
      kids.push(h('span', { key: 'arrow', className: 'bazino-card-arrow' }, '↗'));
      return h('article', { key: entry.id || index, className: 'theme-frame bazino-home-card' }, kids);
    }

    function cardGrid(items, prefix, fallback) {
      var list = items && items.length ? items.slice(0, 4) : fallback;
      return h('div', { className: 'bazino-home-grid' }, list.map(function (item, index) { return card(item, index, prefix, true); }));
    }

    function routeLink(title, tab) {
      return h('button', { className: 'theme-link-button', onClick: function () { navigate(tab); } }, title + '  ↗');
    }

    /* ---------- hero sub-render ---------- */
    var heroMediaLayers = [
      h('div', { key: 'poster', className: 'bazino-hero-poster-layer' })
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
    heroMediaLayers.push(h('div', { key: 'overlay', className: 'bazino-hero-overlay' }));

    var sliderControls = slideCount > 1 ? [
      h('button', {
        key: 'prev', type: 'button', className: 'bazino-slider-arrow bazino-slider-arrow-prev',
        'aria-label': T('slidePrev'),
        onClick: function (e) { e.stopPropagation(); goToSlide(slideIndex - 1); }
      }, '‹'),
      h('button', {
        key: 'next', type: 'button', className: 'bazino-slider-arrow bazino-slider-arrow-next',
        'aria-label': T('slideNext'),
        onClick: function (e) { e.stopPropagation(); goToSlide(slideIndex + 1); }
      }, '›')
    ] : null;

    var slideDots = slideCount > 1 ? h('div', { key: 'dots', className: 'bazino-slider-dots', role: 'group', 'aria-label': T('slidesLabel') },
      slides.map(function (s, idx) {
        return h('button', {
          key: s.id, type: 'button',
          className: 'bazino-slider-dot' + (idx === slideIndex ? ' is-active' : ''),
          'aria-label': T('slidesLabel') + ' — ' + pad2(language, idx + 1),
          'aria-current': idx === slideIndex,
          onClick: function (e) { e.stopPropagation(); goToSlide(idx); }
        }, pad2(language, idx + 1));
      })
    ) : null;

    var sliderStatus = slideCount > 1 ? h('span', { key: 'status', className: 'bazino-slider-status' },
      pad2(language, slideIndex + 1) + ' / ' + pad2(language, slideCount) +
      (reducedMotion ? '' : (sliderPaused ? ' / ' + T('pausedWord') : ' / ' + T('autoWord')))
    ) : null;

    return h('div', { className: 'bazino-home', dir: dir, 'data-theme-id': p.themeId || 'bazino-arena' },

      /* ── 01 HERO: poster first, admin slides over it, video deferred ── */
      h('section', {
        className: 'bazino-chapter bazino-home-hero' + (phase === 2 ? ' is-playing' : ''),
        'data-chapter': '01',
        ref: heroRef,
        dir: dir
      },
        h('div', {
          className: 'bazino-hero-media',
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
          sliderControls,
          phase < 2 ? h('span', { key: 'cue', className: 'bazino-hero-cue' }, T('cue')) : null,
          (phase === 3 || phase === 4) ? h('button', {
            key: 'replay', className: 'bazino-hero-replay',
            onClick: function (e) { e.stopPropagation(); onHeroClick(); }
          }, T('replay')) : null
        ),
        h('div', { className: 'bazino-hero-content theme-frame', dir: dir },
          h('img', { className: 'theme-brand-logo', src: logo, alt: settings.club_name || 'Bazino', width: 160, height: 42 }),
          h('span', { className: 'theme-chapter-label' }, T('heroChapter')),
          h('div', { key: 'slide-' + slideIndex + '-' + language, className: 'bazino-hero-slide' },
            h('h1', null, activeSlide.title),
            activeSlide.desc ? h('p', null, activeSlide.desc) : null
          ),
          h('button', { className: 'btn cta-primary', onClick: function (e) { e.stopPropagation(); navigate(activeSlide.target); } }, T('cta') + '  ↗'),
          h('div', { className: 'bazino-slider-meta' }, slideDots, sliderStatus)
        )
      ),

      /* ── 02 GENRES ── */
      h('section', { className: 'bazino-chapter', 'data-chapter': '02', dir: dir },
        sectionHead('02', T('genres'), T('genresMeta')),
        cardGrid(genres, T('loadout'), [
          { title: T('demoGenre1Title'), body: T('demoGenre1Body') },
          { title: T('demoGenre2Title'), body: T('demoGenre2Body') },
          { title: T('demoGenre3Title'), body: T('demoGenre3Body') },
          { title: T('demoGenre4Title'), body: T('demoGenre4Body') }
        ])
      ),

      /* ── 03 TOURNAMENTS ── */
      h('section', { className: 'bazino-chapter bazino-tournament-surface', 'data-chapter': '03', dir: dir },
        sectionHead('03', T('tournaments'), T('tournamentsMeta')),
        h('div', { className: 'bazino-genre-filter', role: 'group', 'aria-label': T('sort') }, genreKeys.map(function (key) {
          return h('button', { key: key, type: 'button', className: genreState[0] === key ? 'is-active' : '', 'aria-pressed': genreState[0] === key, onClick: function () { genreState[1](key); } }, genreLabels[key]);
        })),
        h('div', { className: 'bazino-tournament-tools' },
          h('label', { className: 'bazino-tournament-search' },
            h('span', { className: 'sr-only' }, T('search')),
            h('input', { type: 'search', value: searchState[0], placeholder: T('search'), onChange: function (e) { searchState[1](e.target.value); } })
          ),
          h('label', { className: 'bazino-tournament-sort' },
            h('span', null, T('sort')),
            h('select', { value: sortState[0], onChange: function (e) { sortState[1](e.target.value); } },
              h('option', { value: 'featured' }, T('sortFeatured')),
              h('option', { value: 'date' }, T('sortDate')),
              h('option', { value: 'prize' }, T('sortPrize'))
            )
          )
        ),
        cardGrid(visibleTournaments, T('tournamentWord'), [
          { title: T('demoTournamentTitle'), status: T('demoTournamentStatus'), body: T('demoTournamentBody') }
        ]),
        routeLink(T('openHub'), 'tournaments')
      ),

      /* ── 04 RESULTS ── */
      h('section', { className: 'bazino-chapter bazino-score-surface', 'data-chapter': '04', dir: dir },
        sectionHead('04', T('results'), T('resultsMeta')),
        h('div', { className: 'bazino-scoreboard' }, history.length ? history.slice(0, 5).map(function (entry, index) {
          var e = entry || {};
          var score = (e.scoreA !== undefined || e.scoreB !== undefined) ? (e.scoreA + ' : ' + e.scoreB) : (e.score || e.result || '— —');
          return h('div', { className: 'bazino-score-row', key: e.id || index },
            h('span', null, (e.teamA || T('teamA')) + '  vs  ' + (e.teamB || T('teamB'))),
            h('strong', null, String(score)),
            h('span', null, (e.status || T('scoreFinal')) + ' / ' + (e.game || loc(e.title, language) || T('matchWord')))
          );
        }) : h('div', { className: 'bazino-empty-signal' }, T('empty'))),
        routeLink(T('results'), 'tournaments')
      ),

      /* ── 05 LOUNGES ── */
      h('section', { className: 'bazino-chapter bazino-lounge-surface', 'data-chapter': '05', dir: dir },
        sectionHead('05', T('lounges'), T('loungesMeta')),
        activeLounge ? h('div', {
          ref: galleryBoxRef,
          className: 'bazino-theme-lounge-slider',
          onMouseEnter: function () { galleryPauseState[1](true); },
          onMouseLeave: function () { galleryPauseState[1](false); },
          onFocus: function () { galleryPauseState[1](true); },
          onBlur: function () { galleryPauseState[1](false); },
          tabIndex: 0
        },
          h('img', { src: activeLounge.imageUrl || activeLounge.image, alt: loc(activeLounge.title, language) || 'Bazino lounge', loading: 'lazy', decoding: 'async' }),
          h('div', { className: 'bazino-theme-slider-status' }, pad2(language, loungeIndex + 1) + ' / ' + pad2(language, loungeImages.length) + (reducedMotion ? '' : (galleryPauseState[0] ? ' / ' + T('pausedWord') : ' / ' + T('autoWord'))))
        ) : null,
        cardGrid(lounges, T('loungeWord'), [
          { title: T('demoLoungeVipTitle'), body: T('demoLoungeVipBody') },
          { title: T('demoLoungeCafeTitle'), body: T('demoLoungeCafeBody') }
        ]),
        routeLink(T('openCafe'), 'cafe')
      ),

      /* ── 06 PASSES ── */
      h('section', { className: 'bazino-chapter bazino-passes-surface', 'data-chapter': '06', dir: dir },
        sectionHead('06', T('passes'), T('passesMeta')),
        h('div', { className: 'bazino-pass-grid' }, (pricing.length ? pricing : [
          { title: T('demoPass1Title'), body: T('demoPass1Body') },
          { title: T('demoPass2Title'), body: T('demoPass2Body') },
          { title: T('demoPass3Title'), body: T('demoPass3Body') }
        ]).slice(0, 3).map(function (entry, index) {
          var e = entry || {};
          var kids = [
            h('span', { key: 'l', className: 'theme-chapter-label' }, T('passWord') + ' / ' + pad2(language, index + 1) + (e.popular ? ' ★' : '')),
            h('h3', { key: 'h' }, loc(e.title || e.name, language) || T('passTitleFallback'))
          ];
          if (e.price !== undefined && e.price !== null) {
            kids.push(h('span', { key: 'price', className: 'bazino-pass-price' }, formatPrice(language, e.price) + ' ' + T('currency')));
          }
          if (e.duration) kids.push(h('p', { key: 'd' }, loc(e.duration, language)));
          if (e.features && e.features.length) {
            kids.push(h('ul', { key: 'f', className: 'bazino-pass-features' }, e.features.slice(0, 4).map(function (f, fi) { return h('li', { key: fi }, loc(f, language)); })));
          }
          kids.push(h('p', { key: 'p' }, loc(e.body || e.description, language)));
          kids.push(h('span', { key: 'line', className: 'bazino-pass-line' }));
          return h('article', { key: e.id || index, className: 'bazino-pass' + (e.popular ? ' is-popular' : '') }, kids);
        })),
        routeLink(T('cta'), 'reservations')
      ),

      /* ── 06.5 COACHES (optional) ── */
      staff && staff.length ? h('section', { className: 'bazino-chapter', 'data-chapter': '06.5', dir: dir },
        sectionHead('06.5', T('coaches'), T('coachesMeta')),
        h('div', { className: 'bazino-staff-strip' }, staff.slice(0, 4).map(function (member, index) {
          var m = member || {};
          return h('div', { key: m.id || index, className: 'bazino-staff-chip' },
            h('div', null,
              h('strong', null, loc(m.name, language) || (m.gamerTag || T('coachDefault'))),
              h('span', null, (m.gamerTag ? m.gamerTag + ' — ' : '') + loc(m.role, language))
            )
          );
        }))
      ) : null,

      /* ── 07 VISIT + APP ── */
      h('section', { className: 'bazino-chapter bazino-visit-surface', 'data-chapter': '07', dir: dir },
        h('div', { className: 'bazino-visit-copy' },
          h('span', { className: 'theme-chapter-label' }, T('chapterWord') + ' ' + num(language, '07')),
          h('h2', null, T('visit')),
          h('p', null, settings.club_address || T('addressFallback')),
          h('button', { className: 'btn btn-outline', onClick: function () { navigate('reservations'); } }, T('cta') + '  ↗')
        ),
        h('div', { className: 'bazino-app-card' },
          h('span', { className: 'theme-chapter-label' }, T('appSignal')),
          h('h3', null, T('app')),
          h('p', null, T('appBody')),
          h('div', { className: 'bazino-app-downloads' },
            h('button', { className: 'btn btn-outline', onClick: function () { navigate('loyalty'); } }, T('ios') + '  ↗'),
            h('button', { className: 'btn btn-outline', onClick: function () { navigate('loyalty'); } }, T('android') + '  ↗')
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
})();
