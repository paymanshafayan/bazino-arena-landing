/*
 * Bazino Arena of Legends — portal theme entry point.
 * This file intentionally uses the Bazino Theme SDK contract: it registers only the
 * home component while the portal retains ownership of routing and shared services.
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
        var navigate = props.onNavigate || function () {};
        var language = props.language || 'tr';
        var dir = props.dir || (language === 'fa' ? 'rtl' : 'ltr');
        var copy = {
          tr: { hero: 'GELECEK TURUN BURADA BAŞLAR.', sub: 'PS5 ve Xbox Series X deneyimi. VIP salon. 85 inç ekranlar.', cta: 'Rezervasyon yap', genres: 'Oyun türleri', tournaments: 'Aktif turnuvalar', results: 'Sonuçlar', lounges: 'Salonlar ve hizmetler' },
          fa: { hero: 'راند بعدی‌ات از اینجا شروع می‌شود.', sub: 'تجربه‌ی PS5 و Xbox Series X، سالن VIP و نمایشگرهای ۸۵ اینچی.', cta: 'رزرو کن', genres: 'ژانرهای بازی', tournaments: 'تورنومنت‌های فعال', results: 'نتایج مسابقات', lounges: 'سالن‌ها و خدمات' },
          en: { hero: 'YOUR NEXT ROUND STARTS HERE.', sub: 'PS5 and Xbox Series X. A VIP lounge. 85-inch screens.', cta: 'Reserve your round', genres: 'Game genres', tournaments: 'Active tournaments', results: 'Match history', lounges: 'Lounge and services' },
          ru: { hero: 'ТВОЙ СЛЕДУЮЩИЙ РАУНД НАЧИНАЕТСЯ ЗДЕСЬ.', sub: 'PS5 и Xbox Series X, VIP-зал и экраны 85 дюймов.', cta: 'Забронировать раунд', genres: 'Жанры игр', tournaments: 'Активные турниры', results: 'Результаты матчей', lounges: 'Зоны и услуги' }
        }[language] || null;
        var text = copy || { hero: 'YOUR NEXT ROUND STARTS HERE.', sub: 'PS5 and Xbox Series X. VIP lounge. 85-inch screens.', cta: 'Reserve your round', genres: 'Game genres', tournaments: 'Active tournaments', results: 'Match history', lounges: 'Lounge and services' };
        var logo = props.logoUrl || '/logo.png';
        var base = props.assetsBase || '';
        var image = featured[0] && (featured[0].imageUrl || featured[0].image) || (base + '/hero.webp');
        var item = function (title, data, icon) {
          return h('article', { className: 'theme-frame bazino-home-card' },
            h('span', { className: 'theme-chapter-label' }, icon),
            h('h3', null, title),
            h('div', { className: 'bazino-home-card-list' }, (data || []).slice(0, 4).map(function (entry, index) {
              return h('div', { key: entry.id || index, className: 'bazino-home-card-row' }, entry.title || entry.name || entry.label || ('Signal ' + (index + 1)));
            }))
          );
        };
        return h('div', { className: 'bazino-home', dir: dir, 'data-theme-id': props.themeId || 'bazino-arena' },
          h('section', { className: 'hero-scene theme-frame' },
            h('div', { className: 'hero-scene-layer', style: { backgroundImage: 'url(' + image + ')', backgroundSize: 'cover', backgroundPosition: 'center' } }),
            h('div', { className: 'hero-scene-overlay' }),
            h('div', { className: 'hero-copy' },
              h('img', { className: 'theme-brand-logo', src: logo, alt: props.settings && props.settings.club_name || 'Bazino' }),
              h('span', { className: 'theme-chapter-label' }, 'CHAPTER 01 / CONSOLE ARENA'),
              h('h1', { className: 'hero-title' }, text.hero),
              h('p', null, text.sub),
              h('button', { className: 'btn cta-primary', onClick: function () { navigate('reservations'); } }, text.cta)
            ),
            h('div', { className: 'hero-chapter-rail' }, 'ORBIT TO EXPLORE / 01 / 02 / 03')
          ),
          h('section', { className: 'bazino-required-surfaces' },
            item(text.genres, genres, 'SURFACE 01'),
            item(text.tournaments, tournaments, 'SURFACE 02'),
            item(text.results, history, 'SURFACE 03'),
            item(text.lounges, lounges, 'SURFACE 04')
          ),
          h('section', { className: 'bazino-optional-surfaces' },
            item('Featured games', featured, 'OPTIONAL 01'),
            item('Pricing packages', props.pricingPackages || [], 'OPTIONAL 02'),
            item('Staff team', props.staffTeam || [], 'OPTIONAL 03')
          )
        );
      }
    };
  });
})();
