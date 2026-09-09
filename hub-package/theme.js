/*
 * BAZINO HUB NEON THEME — SDK v2 Package
 * Full neon dark-mode theme implementation for the Bazino Portal.
 */
(function () {
  var SDK = (typeof window !== 'undefined') ? window.BazinoThemeSDK : null;
  if (!SDK || !SDK.registerComponent) return;
  var R = SDK.React;
  if (!R) return;

  function safeString(props, key, fallback) {
    if (props && props.ts) {
      var val = props.ts(key);
      if (val) return val;
    }
    return fallback || key;
  }

  function HeaderFactory(props) {
    var p = props || {};
    var base = String(p.assetsBase || '/assets/');
    if (base && base.charAt(base.length - 1) !== '/') base += '/';

    return R.createElement('header', { className: 'hub-header' },
      R.createElement('div', { className: 'hub-header-wrap' },
        R.createElement('a', { href: '/', className: 'hub-logo' },
          R.createElement('span', { className: 'hub-logo-mark' }, 'B'),
          R.createElement('span', { className: 'hub-logo-text' }, 'BAZINO HUB')
        ),
        R.createElement('nav', { className: 'hub-nav' },
          R.createElement('a', { href: '/games', className: 'hub-nav-item' }, safeString(props, 'nav.games', 'بازی‌ها')),
          R.createElement('a', { href: '/events', className: 'hub-nav-item' }, safeString(props, 'nav.events', 'مسابقات')),
          R.createElement('a', { href: '/events/brackets', className: 'hub-nav-item is-active' }, safeString(props, 'bracket32', 'براکت ۳۲ نفره')),
          R.createElement('a', { href: '/food', className: 'hub-nav-item' }, safeString(props, 'nav.food', 'کافه')),
          R.createElement('a', { href: '/shop', className: 'hub-nav-item' }, safeString(props, 'nav.shop', 'فروشگاه')),
          R.createElement('a', { href: '/club', className: 'hub-nav-item' }, safeString(props, 'nav.club', 'باشگاه'))
        ),
        R.createElement('div', { className: 'hub-header-actions' },
          R.createElement('a', { href: '/reservations', className: 'hub-btn-gold' }, safeString(props, 'holdBay', 'رزرو نوبت در کلاب'))
        )
      )
    );
  }

  function HomeFactory(props) {
    var p = props || {};
    var base = String(p.assetsBase || '');
    if (base && base.charAt(base.length - 1) !== '/') base += '/';

    var slideIndexState = R.useState(0);
    var slideIdx = slideIndexState[0];
    var setSlideIdx = slideIndexState[1];

    var slides = [
      {
        badge: 'NOW',
        badgeClass: 'is-live',
        title: 'EA SPORTS FC 26 CUP',
        sub: 'مسابقات شنبه شب ۳۲ نفره زنده روی نمایشگرهای ۸۵ اینچی کلاب.',
        cta: 'مشاهده براکت مسابقات',
        href: '/events/brackets',
        img: base + 'slide-fc26.jpg'
      },
      {
        badge: 'COMING SOON',
        badgeClass: 'is-soon',
        title: 'GRAND THEFT AUTO VI',
        sub: 'نسل آینده بازی‌های کنسولی و رویدادهای ویژه در بازینو.',
        cta: 'اخبار کلاب',
        href: '/blog',
        img: base + 'slide-city.jpg'
      },
      {
        badge: 'LIVE MATCH',
        badgeClass: 'is-live',
        title: 'TONIGHT 21:00 LIVE',
        sub: 'پخش زنده فوتبال روی مانیتورهای گیمینگ و سالن VIP اختصاصی.',
        cta: 'رزرو جایگاه در کلاب',
        href: '/reservations',
        img: base + 'slide-match.jpg'
      }
    ];

    var tiles = [
      { href: '/games', title: 'GAMES', sub: 'جایگاه‌های PS5 و Xbox', icon: '🎮', tone: 'cyan' },
      { href: '/events', title: 'EVENTS', sub: 'براکت‌های هفتگی و فصلی', icon: '🏆', tone: 'magenta' },
      { href: '/shop', title: 'SHOP', sub: 'محصولات و اکسسوری گیمینگ', icon: '⭐', tone: 'gold' },
      { href: '/food', title: 'CAFE', sub: 'کافه، نوشیدنی انرژی‌زا و پیتزا', icon: '🍕', tone: 'gold' },
      { href: '/club', title: 'CLUB', sub: 'عضویت VIP و امتیازات فصل', icon: '👥', tone: 'green' },
      { href: '/blog', title: 'BLOG', sub: 'گزارش مسابقات و اخبار', icon: '📅', tone: 'purple' },
      { href: '/chat', title: 'CHAT', sub: 'اتاق گفتگو و لابی بازیکنان', icon: '💬', tone: 'cyan' }
    ];

    var curSlide = slides[slideIdx % slides.length];

    return R.createElement('div', { className: 'hub-home-root' },
      R.createElement(HeaderFactory, props),
      R.createElement('main', { className: 'hub-main' },
        R.createElement('section', { className: 'hub-slider' },
          R.createElement('div', {
            className: 'hub-slide is-on',
            style: { backgroundImage: 'url(' + curSlide.img + ')' }
          },
            R.createElement('div', { className: 'hub-slide-body' },
              R.createElement('span', { className: 'hub-badge ' + curSlide.badgeClass }, curSlide.badge),
              R.createElement('h2', null, curSlide.title),
              R.createElement('p', null, curSlide.sub),
              R.createElement('a', { href: curSlide.href, className: 'hub-slide-cta' }, curSlide.cta + ' ↗')
            )
          ),
          R.createElement('button', {
            className: 'hub-sarrow hub-sarrow-l hub-neon-box',
            type: 'button',
            onClick: function () { setSlideIdx((slideIdx + slides.length - 1) % slides.length); }
          }, '‹'),
          R.createElement('button', {
            className: 'hub-sarrow hub-sarrow-r hub-neon-box',
            type: 'button',
            onClick: function () { setSlideIdx((slideIdx + 1) % slides.length); }
          }, '›'),
          R.createElement('div', { className: 'hub-sdots' },
            slides.map(function (_, n) {
              return R.createElement('i', {
                key: n,
                className: n === (slideIdx % slides.length) ? 'is-on' : '',
                onClick: function () { setSlideIdx(n); }
              });
            })
          )
        ),
        R.createElement('section', { className: 'hub-quick' },
          tiles.map(function (t) {
            return R.createElement('a', {
              key: t.href,
              href: t.href,
              className: 'hub-qcard hub-neon-box hub-neon-box--' + t.tone + ' is-' + t.tone
            },
              R.createElement('span', { className: 'hub-qic', style: { fontSize: '24px' } }, t.icon),
              R.createElement('b', null, t.title),
              R.createElement('small', null, t.sub)
            );
          })
        )
      )
    );
  }

  function GenericFactory(name) {
    return function (props) {
      return R.createElement('div', { className: 'hub-page-root' },
        R.createElement(HeaderFactory, props),
        R.createElement('div', { className: 'hub-page-content' },
          R.createElement('h2', { className: 'hub-page-title' }, name),
          R.createElement('p', { style: { color: '#8E98A8', fontSize: '14px' } }, 'بخش اختصاصی ' + name + ' در تم نئونی کلاب بازینو.')
        )
      );
    };
  }

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

  /* Explicit string literals matching portal SDK allowed regions whitelist */
  SDK.registerComponent('home', makeFactory(HomeFactory));
  SDK.registerComponent('header', makeFactory(HeaderFactory));
  SDK.registerComponent('hero', makeFactory(HomeFactory));
  SDK.registerComponent('hub.home', makeFactory(HomeFactory));
  SDK.registerComponent('hub.games', makeFactory(GenericFactory('GAMES')));
  SDK.registerComponent('hub.events', makeFactory(GenericFactory('EVENTS')));
  SDK.registerComponent('hub.weekly', makeFactory(GenericFactory('WEEKLY')));
  SDK.registerComponent('hub.special', makeFactory(GenericFactory('SPECIAL')));
  SDK.registerComponent('hub.season', makeFactory(GenericFactory('SEASON')));
  SDK.registerComponent('hub.brackets', makeFactory(GenericFactory('BRACKETS')));
  SDK.registerComponent('hub.register', makeFactory(GenericFactory('REGISTER')));
  SDK.registerComponent('hub.shop', makeFactory(GenericFactory('SHOP')));
  SDK.registerComponent('hub.food', makeFactory(GenericFactory('FOOD')));
  SDK.registerComponent('hub.club', makeFactory(GenericFactory('CLUB')));
  SDK.registerComponent('hub.blog', makeFactory(GenericFactory('BLOG')));
  SDK.registerComponent('hub.chat', makeFactory(GenericFactory('CHAT')));
  SDK.registerComponent('hub.contact', makeFactory(GenericFactory('CONTACT')));
  SDK.registerComponent('hub.rules', makeFactory(GenericFactory('RULES')));
  SDK.registerComponent('hub.privacy', makeFactory(GenericFactory('PRIVACY')));

  console.log('Bazino Hub Neon Theme registered successfully.');
})();
