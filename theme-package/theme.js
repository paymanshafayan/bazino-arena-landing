/*
 * BAZINO THEME — ARENA OF LEGENDS (v2) — home component.
 * Registered with the Theme SDK exactly like the system homes:
 *   window.BazinoThemeSDK.registerComponent('home', factory)
 *
 * Performance contract kept here:
 *   • hero renders the poster (first frame of the video) immediately;
 *   • the <video> element starts with preload="none" and gets its src only
 *     after window 'load' + idle time, so it never competes with LCP;
 *   • muted + playsInline autoplay after load; clicking the hero replays;
 *   • playback pauses off-screen / when the tab is hidden (IntersectionObserver,
 *     visibilitychange) — no setInterval anywhere;
 *   • prefers-reduced-motion: poster only, manual replay still allowed;
 *   • zero third-party origins; all media served from this package's assets.
 */
(function () {
  var SDK = (typeof window !== 'undefined') ? window.BazinoThemeSDK : null;
  if (!SDK || !SDK.registerComponent) return;
  var R = SDK.React;
  if (!R) return;

  var COPY = {
    tr: { hero: 'ŞAMPİYONSAN, İŞTE BURASI.', sub: 'PS5 ve Xbox Series X deneyimi. VIP salon. 85 inç ekranlar.', cta: 'Rezervasyon yap', genres: 'Oyun arenası', tournaments: 'Aktif turnuvalar', results: 'Maç geçmişi', lounges: 'VIP ve kafe', passes: 'Giriş sinyali', coaches: 'Koç kadrosu', visit: 'İskele’de buluşalım', app: 'Sinyali yanında taşı.', appBody: 'Rezervasyonlar, kulüp bildirimleri ve resmi güncellemeler tek dokunuşta.', cue: 'VİDEOYU OYNAT', replay: 'TEKRAR OYNAT', search: 'Turnuva ara', sort: 'Sırala', sortFeatured: 'Öne çıkan', sortDate: 'Tarihe göre', sortPrize: 'Ödüle göre', all: 'TÜMÜ', openHub: 'Turnuva merkezini aç', openCafe: 'Kafeyi keşfet', official: 'Resmi bilgiler', empty: 'Portal verisi bekleniyor.' },
    fa: { hero: 'اگر قهرمانی، اینجاست.', sub: 'تجربه‌ی PS5 و Xbox Series X، سالن VIP و نمایشگرهای ۸۵ اینچی.', cta: 'رزرو کن', genres: 'آرنای بازی', tournaments: 'تورنومنت‌های فعال', results: 'نتایج مسابقات', lounges: 'VIP و کافه', passes: 'سیگنال ورود', coaches: 'کادر مربیان', visit: 'در ایسکله ببینمت', app: 'سیگنال را همراهت داشته باش.', appBody: 'رزروها، اعلان‌های باشگاه و به‌روزرسانی‌های رسمی، همه در یک‌جا.', cue: 'پخش ویدئو', replay: 'پخش دوباره', search: 'جستجوی تورنومنت', sort: 'مرتب‌سازی', sortFeatured: 'پیشنهادی', sortDate: 'بر اساس تاریخ', sortPrize: 'بر اساس جایزه', all: 'همه', openHub: 'مرکز تورنمنت‌ها', openCafe: 'کافه را ببین', official: 'اطلاعات رسمی', empty: 'در انتظار داده‌ی پورتال.' },
    en: { hero: 'IF YOU ARE A CHAMP, THIS IS IT.', sub: 'PS5 and Xbox Series X. A VIP lounge. 85-inch screens.', cta: 'Reserve your round', genres: 'Game arena', tournaments: 'Active tournaments', results: 'Match history', lounges: 'VIP and café', passes: 'Entry signal', coaches: 'Coaching crew', visit: 'Meet us in İskele', app: 'Keep the signal close.', appBody: 'Reservations, club notifications and official updates in one place.', cue: 'PLAY VIDEO', replay: 'REPLAY', search: 'Search tournaments', sort: 'Sort', sortFeatured: 'Featured', sortDate: 'By date', sortPrize: 'By prize', all: 'ALL', openHub: 'Open tournament hub', openCafe: 'Explore café', official: 'Official details', empty: 'Awaiting portal data.' },
    ru: { hero: 'ЕСЛИ ТЫ ЧЕМПИОН, ТЕБЕ СЮДА.', sub: 'PS5 и Xbox Series X, VIP-зал и экраны 85 дюймов.', cta: 'Забронировать раунд', genres: 'Игровая арена', tournaments: 'Активные турниры', results: 'Результаты матчей', lounges: 'VIP и кафе', passes: 'Сигнал входа', coaches: 'Тренерский состав', visit: 'Встретимся в Искеле', app: 'Держи сигнал рядом.', appBody: 'Брони, уведомления клуба и официальные обновления — в одном месте.', cue: 'СМОТРЕТЬ ВИДЕО', replay: 'ПОВТОРИТЬ', search: 'Поиск турниров', sort: 'Сортировка', sortFeatured: 'Избранное', sortDate: 'По дате', sortPrize: 'По призу', all: 'ВСЕ', openHub: 'Центр турниров', openCafe: 'Смотреть кафе', official: 'Официальные детали', empty: 'Ожидаем данные портала.' }
  };

  function loc(value, lang) {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return value[lang] || value.en || value.fa || value.tr || value.ru || '';
    return String(value);
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
    var language = p.language || 'tr';
    var dir = p.dir || (language === 'fa' ? 'rtl' : 'ltr');
    var text = COPY[language] || COPY.en;
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
        for (var i = 0; i < entries.length; i++) {
          heroVisibleRef.current = entries[i].isIntersecting;
          var v = videoRef.current;
          if (!v) continue;
          if (!entries[i].isIntersecting) { try { v.pause(); } catch (e) {} }
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

    function onHeroClick() {
      if (!videoSrc) setVideoSrc(videoUrl);
      startPlayback();
    }

    /* ---------- tournament discovery state ---------- */
    var genreState = R.useState('all');
    var searchState = R.useState('');
    var sortState = R.useState('featured');

    var genreLabels = { all: text.all, shooter: language === 'fa' ? 'شوتر' : language === 'ru' ? 'ШУТЕРЫ' : language === 'en' ? 'SHOOTERS' : 'NİŞANCI', moba: 'MOBA', sports: language === 'fa' ? 'ورزشی' : language === 'ru' ? 'СПОРТ' : language === 'en' ? 'SPORTS' : 'SPOR', rpg: 'RPG' };
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

    /* ---------- lounge gallery (rAF driven, no setInterval) ---------- */
    var galleryState = R.useState(0);
    var galleryPauseState = R.useState(false);
    var galleryBoxRef = R.useRef(null);
    var galleryVisibleRef = R.useRef(true);
    var loungeImages = lounges.filter(function (l) { return l && (l.imageUrl || l.image); });

    R.useEffect(function () {
      if (!window.IntersectionObserver || !galleryBoxRef.current) return;
      var io = new window.IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) galleryVisibleRef.current = entries[i].isIntersecting;
      }, { threshold: 0.1 });
      io.observe(galleryBoxRef.current);
      return function () { io.disconnect(); };
    }, [loungeImages.length]);

    R.useEffect(function () {
      if (reducedMotion || galleryPauseState[0] || loungeImages.length < 2) return;
      var raf = 0;
      var last = 0;
      var acc = 0;
      var STEP = 5200;
      var loop = function (ts) {
        if (last) acc += Math.min(ts - last, 200);
        last = ts;
        if (acc >= STEP && galleryVisibleRef.current && !document.hidden) {
          acc = 0;
          galleryState[1](function (i) { return (i + 1) % loungeImages.length; });
        }
        raf = window.requestAnimationFrame(loop);
      };
      raf = window.requestAnimationFrame(loop);
      return function () { window.cancelAnimationFrame(raf); };
    }, [galleryPauseState[0], loungeImages.length, reducedMotion]);

    var loungeIndex = loungeImages.length ? galleryState[0] % loungeImages.length : 0;
    var activeLounge = loungeImages[loungeIndex];

    /* ---------- builders ---------- */
    function sectionHead(chapter, title, meta) {
      return h('div', { className: 'bazino-section-head' },
        h('span', { className: 'theme-chapter-label' }, 'CHAPTER ' + chapter),
        h('h2', null, title),
        h('p', null, meta)
      );
    }

    function card(entry, index, prefix, withMedia) {
      entry = entry || {};
      var kids = [
        h('div', { key: 'top', className: 'bazino-home-card-top' }, h('span', null, prefix + ' / 0' + (index + 1)), h('span', null, 'BAZINO')),
        h('span', { key: 'label', className: 'theme-chapter-label' }, loc(entry.label || entry.badge || entry.status, language) || 'SIGNAL')
      ];
      if (withMedia && (entry.imageUrl || entry.image)) {
        kids.push(h('img', { key: 'media', className: 'bazino-home-card-media', src: entry.imageUrl || entry.image, alt: loc(entry.title, language) || 'Bazino', loading: 'lazy', decoding: 'async' }));
      }
      kids.push(h('h3', { key: 'h' }, loc(entry.title || entry.name, language) || 'Next round'));
      kids.push(h('p', { key: 'p' }, loc(entry.subtitle || entry.desc || entry.description, language) || loc(entry.body, language) || 'Official information is supplied by the Bazino portal.'));
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

    var genreFallback = [
      { title: 'PS5 Arena', body: 'Next-gen control and a focused console scene.' },
      { title: 'Xbox Series X', body: 'Team play on the big screen.' },
      { title: '85-inch focus', body: 'A cinematic field of view for every move.' },
      { title: 'VIP between rounds', body: 'More comfort between matches.' }
    ];

    var heroTitle = text.hero;
    var heroImage = featured[0] && (featured[0].imageUrl || featured[0].image);

    return h('div', { className: 'bazino-home', dir: dir, 'data-theme-id': p.themeId || 'bazino-arena' },

      /* ── 01 HERO: poster first, video deferred ── */
      h('section', { className: 'bazino-chapter bazino-home-hero' + (phase === 2 ? ' is-playing' : ''), 'data-chapter': '01', ref: heroRef },
        h('div', { className: 'bazino-hero-media', onClick: onHeroClick, role: 'button', tabIndex: 0, 'aria-label': text.cue, onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onHeroClick(); } } },
          h('div', { className: 'bazino-hero-poster-layer', style: heroImage ? { backgroundImage: 'url(' + heroImage + ')' } : null }),
          h('video', {
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
          }),
          h('div', { className: 'bazino-hero-grid' }),
          h('div', { className: 'bazino-hero-overlay' }),
          phase < 2 ? h('span', { className: 'bazino-hero-cue' }, text.cue) : null,
          phase === 3 || phase === 4 ? h('button', { className: 'bazino-hero-replay', onClick: function (e) { e.stopPropagation(); onHeroClick(); } }, text.replay) : null
        ),
        h('div', { className: 'bazino-hero-content theme-frame' },
          h('img', { className: 'theme-brand-logo', src: logo, alt: settings.club_name || 'Bazino', width: 160, height: 42 }),
          h('span', { className: 'theme-chapter-label' }, 'CHAPTER 01 / HALL OF LEGENDS'),
          h('h1', null, heroTitle),
          h('p', null, text.sub),
          h('button', { className: 'btn cta-primary', onClick: function (e) { e.stopPropagation(); navigate('reservations'); } }, text.cta + '  ↗')
        )
      ),

      /* ── 02 GENRES ── */
      h('section', { className: 'bazino-chapter', 'data-chapter': '02' },
        sectionHead('02', text.genres, 'PS5 / XBOX SERIES X / 85 INCH / VIP'),
        cardGrid(genres, 'LOADOUT', genreFallback)
      ),

      /* ── 03 TOURNAMENTS ── */
      h('section', { className: 'bazino-chapter bazino-tournament-surface', 'data-chapter': '03' },
        sectionHead('03', text.tournaments, 'STATUS / DATE / PRIZE INFORMATION'),
        h('div', { className: 'bazino-genre-filter', role: 'group', 'aria-label': text.sort }, genreKeys.map(function (key) {
          return h('button', { key: key, type: 'button', className: genreState[0] === key ? 'is-active' : '', 'aria-pressed': genreState[0] === key, onClick: function () { genreState[1](key); } }, genreLabels[key]);
        })),
        h('div', { className: 'bazino-tournament-tools' },
          h('label', { className: 'bazino-tournament-search' },
            h('span', { className: 'sr-only' }, text.search),
            h('input', { type: 'search', value: searchState[0], placeholder: text.search, onChange: function (e) { searchState[1](e.target.value); } })
          ),
          h('label', { className: 'bazino-tournament-sort' },
            h('span', null, text.sort),
            h('select', { value: sortState[0], onChange: function (e) { sortState[1](e.target.value); } },
              h('option', { value: 'featured' }, text.sortFeatured),
              h('option', { value: 'date' }, text.sortDate),
              h('option', { value: 'prize' }, text.sortPrize)
            )
          )
        ),
        cardGrid(visibleTournaments, 'TOURNAMENT', [{ title: 'Next tournament', status: 'OPEN', body: 'Dates, entry conditions and official prizes.' }]),
        routeLink(text.openHub, 'tournaments')
      ),

      /* ── 04 RESULTS ── */
      h('section', { className: 'bazino-chapter bazino-score-surface', 'data-chapter': '04' },
        sectionHead('04', text.results, 'VERIFIED / PORTAL DATA'),
        h('div', { className: 'bazino-scoreboard' }, history.length ? history.slice(0, 5).map(function (entry, index) {
          var e = entry || {};
          var score = (e.scoreA !== undefined || e.scoreB !== undefined) ? (e.scoreA + ' : ' + e.scoreB) : (e.score || e.result || '— —');
          return h('div', { className: 'bazino-score-row', key: e.id || index },
            h('span', null, (e.teamA || 'TEAM A') + '  vs  ' + (e.teamB || 'TEAM B')),
            h('strong', null, String(score)),
            h('span', null, (e.status || 'FINAL') + ' / ' + (e.game || loc(e.title, language) || 'MATCH'))
          );
        }) : h('div', { className: 'bazino-empty-signal' }, text.empty)),
        routeLink(text.results, 'tournaments')
      ),

      /* ── 05 LOUNGES ── */
      h('section', { className: 'bazino-chapter bazino-lounge-surface', 'data-chapter': '05' },
        sectionHead('05', text.lounges, 'VIP / CAFÉ / BETWEEN ROUNDS'),
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
          h('div', { className: 'bazino-theme-slider-status' }, String(loungeIndex + 1).padStart(2, '0') + ' / ' + String(loungeImages.length).padStart(2, '0') + (reducedMotion ? '' : (galleryPauseState[0] ? ' / PAUSED' : ' / AUTO')))
        ) : null,
        cardGrid(lounges, 'LOUNGE', [
          { title: 'VIP Lounge', body: 'More room, more comfort, a quieter pace.' },
          { title: 'Gaming Café', body: 'A social pause without leaving the night.' }
        ]),
        routeLink(text.openCafe, 'cafe')
      ),

      /* ── 06 PASSES ── */
      h('section', { className: 'bazino-chapter bazino-passes-surface', 'data-chapter': '06' },
        sectionHead('06', text.passes, 'CHOOSE / RESERVE / PLAY'),
        h('div', { className: 'bazino-pass-grid' }, (pricing.length ? pricing : [
          { title: 'Console round', body: 'Choose your PS5 or Xbox Series X scene.' },
          { title: 'VIP pace', body: 'Reserve the lounge experience.' },
          { title: 'Tournament night', body: 'Check official event availability.' }
        ]).slice(0, 3).map(function (entry, index) {
          var e = entry || {};
          var kids = [
            h('span', { key: 'l', className: 'theme-chapter-label' }, 'PASS / 0' + (index + 1) + (e.popular ? ' ★' : '')),
            h('h3', { key: 'h' }, loc(e.title || e.name, language) || 'Bazino pass')
          ];
          if (e.price !== undefined && e.price !== null) {
            kids.push(h('span', { key: 'price', className: 'bazino-pass-price' }, Number(e.price).toLocaleString(language === 'fa' ? 'fa-IR' : undefined) + (language === 'fa' ? ' تومان' : ' T')));
          }
          if (e.duration) kids.push(h('p', { key: 'd' }, loc(e.duration, language)));
          if (e.features && e.features.length) {
            kids.push(h('ul', { key: 'f', className: 'bazino-pass-features' }, e.features.slice(0, 4).map(function (f, i) { return h('li', { key: i }, loc(f, language)); })));
          }
          kids.push(h('p', { key: 'p' }, loc(e.body || e.description, language)));
          kids.push(h('span', { key: 'line', className: 'bazino-pass-line' }));
          return h('article', { key: e.id || index, className: 'bazino-pass' + (e.popular ? ' is-popular' : '') }, kids);
        })),
        routeLink(text.cta, 'reservations')
      ),

      /* ── 06.5 COACHES (optional) ── */
      staff && staff.length ? h('section', { className: 'bazino-chapter', 'data-chapter': '06.5' },
        sectionHead('06.5', text.coaches, 'BAZINO CREW'),
        h('div', { className: 'bazino-staff-strip' }, staff.slice(0, 4).map(function (member, index) {
          var m = member || {};
          return h('div', { key: m.id || index, className: 'bazino-staff-chip' },
            h('div', null,
              h('strong', null, loc(m.name, language) || (m.gamerTag || 'COACH')),
              h('span', null, (m.gamerTag ? m.gamerTag + ' — ' : '') + loc(m.role, language))
            )
          );
        }))
      ) : null,

      /* ── 07 VISIT + APP ── */
      h('section', { className: 'bazino-chapter bazino-visit-surface', 'data-chapter': '07' },
        h('div', { className: 'bazino-visit-copy' },
          h('span', { className: 'theme-chapter-label' }, 'CHAPTER 07'),
          h('h2', null, text.visit),
          h('p', null, settings.club_address || 'Vistamare Hotel • İskele, Cyprus'),
          h('button', { className: 'btn btn-outline', onClick: function () { navigate('reservations'); } }, text.cta + '  ↗')
        ),
        h('div', { className: 'bazino-app-card' },
          h('span', { className: 'theme-chapter-label' }, 'BAZINO MOBILE SIGNAL'),
          h('h3', null, text.app),
          h('p', null, text.appBody),
          h('div', { className: 'bazino-app-downloads' },
            h('button', { className: 'btn btn-outline', onClick: function () { navigate('loyalty'); } }, 'iOS  ↗'),
            h('button', { className: 'btn btn-outline', onClick: function () { navigate('loyalty'); } }, 'ANDROID  ↗')
          )
        )
      )
    );
  }

  SDK.registerComponent('home', function () {
    return {
      apiVersion: 1,
      render: function (props) {
        return R.createElement(ArenaHome, props);
      }
    };
  });
})();
