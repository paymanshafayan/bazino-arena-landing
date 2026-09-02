/*
 * Bazino Arena of Legends — seven-chapter home component.
 * This package entry follows the Theme Engine SDK contract and keeps the home page
 * data-driven: required surfaces come from gameGenres, tournaments, matchHistory and
 * loungeSections; optional passes and featured content come from standard props.
 */
(function () {
  var SDK = window.BazinoThemeSDK;
  if (!SDK || !SDK.registerComponent) return;

  SDK.registerComponent('home', function () {
    return {
      apiVersion: 1,
      render: function (props) {
        var R = SDK.React;
        var h = R.createElement;
        var genres = props.gameGenres || [];
        var tournaments = props.tournaments || [];
        var history = props.matchHistory || [];
        var lounges = props.loungeSections || [];
        var featured = props.featuredGames || [];
        var pricing = props.pricingPackages || [];
        var navigate = props.onNavigate || function () {};
        var language = props.language || 'tr';
        var dir = props.dir || (language === 'fa' ? 'rtl' : 'ltr');
        var genreState = R.useState ? R.useState('all') : ['all', function () {}];
        var activeGenre = genreState[0];
        var settings = props.settings || {};
        var copy = {
          tr: { hero: 'ŞAMPİYONSAN, İŞTE BURASI.', sub: 'PS5 ve Xbox Series X deneyimi. VIP salon. 85 inç ekranlar.', cta: 'Rezervasyon yap', genres: 'Console arena', tournaments: 'Aktif turnuvalar', results: 'Match history', lounges: 'VIP ve kafe', passes: 'Giriş sinyali', visit: 'İskele’de buluşalım', app: 'Sinyali yanında taşı.' },
          fa: { hero: 'اگر قهرمانی، اینجاست.', sub: 'تجربه‌ی PS5 و Xbox Series X، سالن VIP و نمایشگرهای ۸۵ اینچی.', cta: 'رزرو کن', genres: 'آرنای کنسول', tournaments: 'تورنومنت‌های فعال', results: 'نتایج مسابقات', lounges: 'VIP و کافه', passes: 'سیگنال ورود', visit: 'در ایسکله ببینمت', app: 'سیگنال را همراهت داشته باش.' },
          en: { hero: 'IF YOU ARE A CHAMP, THIS IS IT.', sub: 'PS5 and Xbox Series X. A VIP lounge. 85-inch screens.', cta: 'Reserve your round', genres: 'Console arena', tournaments: 'Active tournaments', results: 'Match history', lounges: 'VIP and café', passes: 'Entry signal', visit: 'Meet us in İskele', app: 'Keep the signal close.' },
          ru: { hero: 'ЕСЛИ ТЫ ЧЕМПИОН, ТЕБЕ СЮДА.', sub: 'PS5 и Xbox Series X, VIP-зал и экраны 85 дюймов.', cta: 'Забронировать раунд', genres: 'Консольная арена', tournaments: 'Активные турниры', results: 'Результаты матчей', lounges: 'VIP и кафе', passes: 'Сигнал входа', visit: 'Встретимся в Искеле', app: 'Держи сигнал рядом.' }
        }[language] || null;
        var text = copy || { hero: 'IF YOU ARE A CHAMP, THIS IS IT.', sub: 'PS5 and Xbox Series X. VIP lounge. 85-inch screens.', cta: 'Reserve your round', genres: 'Console arena', tournaments: 'Active tournaments', results: 'Match history', lounges: 'VIP and café', passes: 'Entry signal', visit: 'Meet us in İskele', app: 'Keep the signal close.' };
        var logo = props.logoUrl || '/logo.png';
        var base = props.assetsBase || '';
        var image = featured[0] && (featured[0].imageUrl || featured[0].image) || (base + '/hero.webp');
        var label = function (value, fallback) { return value || fallback; };
        var card = function (entry, index, prefix) {
          entry = entry || {};
          return h('article', { key: entry.id || index, className: 'theme-frame bazino-home-card', 'data-depth': index + 1 },
            h('div', { className: 'bazino-home-card-top' }, h('span', null, prefix + ' / 0' + (index + 1)), h('span', null, 'BAZINO')),
            h('span', { className: 'theme-chapter-label' }, label(entry.label, entry.status || 'CONSOLE SIGNAL')),
            h('h3', null, label(entry.title, entry.name || 'Next round')),
            h('p', null, label(entry.desc || entry.description, entry.body || 'Official information is supplied by the Bazino portal.')),
            h('span', { className: 'bazino-card-arrow' }, '↗')
          );
        };
        var cardGrid = function (items, prefix, fallback) {
          var list = items.length ? items.slice(0, 4) : fallback;
          return h('div', { className: 'bazino-home-grid' }, list.map(function (item, index) { return card(item, index, prefix); }));
        };
        var routeLink = function (title, tab) {
          return h('button', { className: 'theme-link-button', onClick: function () { navigate(tab); } }, title + '  ↗');
        };
        var genreLabels = language === 'fa' ? ['همه', 'فوتبال', 'مسابقه‌ای', 'تاکتیکی', 'نقش‌آفرینی'] : language === 'ru' ? ['ВСЕ', 'ФУТБОЛ', 'ГОНКИ', 'ТАКТИКА', 'RPG'] : language === 'en' ? ['ALL', 'FOOTBALL', 'RACING', 'TACTICAL', 'RPG / QUEST'] : ['TÜMÜ', 'FUTBOL', 'YARIŞ', 'TAKTİK', 'RPG / GÖREV'];
        var genreKeys = ['all', 'football', 'racing', 'tactical', 'rpg'];
        var visibleTournaments = activeGenre === 'all' ? tournaments : tournaments.filter(function (entry) { return (entry.genre || entry.category || '').toLowerCase() === activeGenre; });
        var genreFilter = h('div', { className: 'bazino-genre-filter', role: 'group', 'aria-label': 'Filter tournaments by game category' }, genreKeys.map(function (key, index) { return h('button', { key: key, type: 'button', className: activeGenre === key ? 'is-active' : '', 'aria-pressed': activeGenre === key, onClick: function () { genreState[1](key); } }, genreLabels[index]); }));
        return h('div', { className: 'bazino-home', dir: dir, 'data-theme-id': props.themeId || 'bazino-arena' },
          h('section', { className: 'bazino-chapter bazino-home-hero', 'data-chapter': '01' },
            h('div', { className: 'bazino-hero-image', style: { backgroundImage: 'url(' + image + ')' } }),
            h('div', { className: 'bazino-hero-grid' }),
            h('div', { className: 'bazino-hero-overlay' }),
            h('div', { className: 'bazino-hero-content theme-frame' },
              h('img', { className: 'theme-brand-logo', src: logo, alt: settings.club_name || 'Bazino' }),
              h('span', { className: 'theme-chapter-label' }, 'CHAPTER 01 / HALL OF LEGENDS'),
              h('h1', null, text.hero),
              h('p', null, text.sub),
              h('button', { className: 'btn cta-primary', onClick: function () { navigate('reservations'); } }, text.cta + '  ↗')
            )
          ),
          h('section', { className: 'bazino-chapter bazino-section-dark', 'data-chapter': '02' },
            h('div', { className: 'bazino-section-head' }, h('span', { className: 'theme-chapter-label' }, 'CHAPTER 02'), h('h2', null, text.genres), h('p', null, 'PS5 / XBOX SERIES X / 85 INCH / VIP')),
            cardGrid(genres, 'LOADOUT', [ { title: 'PS5 Arena', body: 'Next-gen control and a focused console scene.' }, { title: 'Xbox Series X', body: 'Team play on the big screen.' }, { title: '85-inch focus', body: 'A cinematic field of view for every move.' }, { title: 'VIP between rounds', body: 'More comfort between matches.' } ])
          ),
          h('section', { className: 'bazino-chapter bazino-tournament-surface', 'data-chapter': '03' },
            h('div', { className: 'bazino-section-head' }, h('span', { className: 'theme-chapter-label' }, 'CHAPTER 03'), h('h2', null, text.tournaments), h('p', null, 'STATUS / DATE / PRIZE INFORMATION')),
            genreFilter,
            cardGrid(visibleTournaments, 'TOURNAMENT', [ { title: 'Next tournament', status: 'OPEN', body: 'Dates, entry conditions and official prizes.' } ]),
            routeLink('Open tournament hub', 'tournaments')
          ),
          h('section', { className: 'bazino-chapter bazino-score-surface', 'data-chapter': '04' },
            h('div', { className: 'bazino-section-head' }, h('span', { className: 'theme-chapter-label' }, 'CHAPTER 04'), h('h2', null, text.results), h('p', null, 'VERIFIED / PORTAL DATA')),
            h('div', { className: 'bazino-scoreboard' }, history.length ? history.slice(0, 5).map(function (entry, index) { return h('div', { className: 'bazino-score-row', key: entry.id || index }, h('span', null, entry.round || ('ROUND 0' + (index + 1))), h('strong', null, entry.score || entry.result || '— —'), h('span', null, entry.mode || entry.title || 'OFFICIAL UPDATE')); }) : h('div', { className: 'bazino-empty-signal' }, 'Awaiting verified match history from the portal.')),
            routeLink('Open results', 'tournaments')
          ),
          h('section', { className: 'bazino-chapter bazino-lounge-surface', 'data-chapter': '05' },
            h('div', { className: 'bazino-section-head' }, h('span', { className: 'theme-chapter-label' }, 'CHAPTER 05'), h('h2', null, text.lounges), h('p', null, 'VIP / CAFÉ / BETWEEN ROUNDS')),
            cardGrid(lounges, 'LOUNGE', [ { title: 'VIP Lounge', body: 'More room, more comfort, a quieter pace.' }, { title: 'Gaming Café', body: 'A social pause without leaving the night.' } ]),
            routeLink('Explore café', 'cafe')
          ),
          h('section', { className: 'bazino-chapter bazino-passes-surface', 'data-chapter': '06' },
            h('div', { className: 'bazino-section-head' }, h('span', { className: 'theme-chapter-label' }, 'CHAPTER 06'), h('h2', null, text.passes), h('p', null, 'CHOOSE / RESERVE / PLAY')),
            h('div', { className: 'bazino-pass-grid' }, (pricing.length ? pricing : [ { title: 'Console round', body: 'Choose your PS5 or Xbox Series X scene.' }, { title: 'VIP pace', body: 'Reserve the lounge experience.' }, { title: 'Tournament night', body: 'Check official event availability.' } ]).slice(0, 3).map(function (entry, index) { return h('article', { className: 'bazino-pass', key: entry.id || index }, h('span', { className: 'theme-chapter-label' }, 'PASS / 0' + (index + 1)), h('h3', null, entry.title || entry.name || 'Bazino pass'), h('p', null, entry.body || entry.description || entry.desc || 'Official availability is handled by the portal.'), h('span', { className: 'bazino-pass-line' })); })),
            routeLink(text.cta, 'reservations')
          ),
          h('section', { className: 'bazino-chapter bazino-visit-surface', 'data-chapter': '07' },
            h('div', { className: 'bazino-visit-copy' }, h('span', { className: 'theme-chapter-label' }, 'CHAPTER 07'), h('h2', null, text.visit), h('p', null, settings.club_address || 'Vistamare Hotel • İskele, Cyprus'), h('a', { className: 'btn btn-outline', href: 'https://www.google.com/maps/search/?api=1&query=Vistamare+Hotel+Iskele+Cyprus', target: '_blank', rel: 'noreferrer' }, 'Open directions  ↗')),
            h('div', { className: 'bazino-app-card' }, h('span', { className: 'theme-chapter-label' }, 'BAZINO MOBILE SIGNAL'), h('h3', null, text.app), h('p', null, 'Reservations, club notifications and official updates stay within reach.'), h('div', { className: 'bazino-app-downloads' }, h('a', { className: 'btn btn-outline', href: 'https://bazino.pro', target: '_blank', rel: 'noreferrer' }, 'iOS APP  ↗'), h('a', { className: 'btn btn-outline', href: 'https://bazino.pro', target: '_blank', rel: 'noreferrer' }, 'ANDROID  ↗')))
          )
        );
      }
    };
  });
})();
