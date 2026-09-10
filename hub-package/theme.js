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
    return R.createElement('header', { className: 'hub-header' },
      R.createElement('div', { className: 'hub-header-wrap' },
        R.createElement('a', { href: '/', className: 'hub-logo' },
          R.createElement('span', { className: 'hub-logo-mark' }, 'B'),
          R.createElement('span', { className: 'hub-logo-text' }, 'BAZINO HUB')
        ),
        R.createElement('nav', { className: 'hub-nav' },
          R.createElement('a', { href: '/games', className: 'hub-nav-item' }, safeString(props, 'nav.games', 'بازی‌ها')),
          R.createElement('a', { href: '/events/weekly', className: 'hub-nav-item' }, safeString(props, 'nav.events', 'مسابقات')),
          R.createElement('a', { href: '/events/brackets', className: 'hub-nav-item is-active' }, safeString(props, 'bracket32', 'براکت ۳۲ نفره')),
          R.createElement('a', { href: '/events/season', className: 'hub-nav-item' }, 'فصل'),
          R.createElement('a', { href: '/food', className: 'hub-nav-item' }, safeString(props, 'nav.food', 'کافه')),
          R.createElement('a', { href: '/shop', className: 'hub-nav-item' }, safeString(props, 'nav.shop', 'فروشگاه'))
        ),
        R.createElement('div', { className: 'hub-header-actions' },
          R.createElement('a', { href: '/games', className: 'hub-btn-gold' }, safeString(props, 'holdBay', 'رزرو نوبت در کلاب'))
        )
      )
    );
  }

  function HomeFactory(props) {
    return R.createElement('div', { className: 'hub-home-root' },
      R.createElement(HeaderFactory, props),
      R.createElement('main', { className: 'hub-main' },
        R.createElement('div', { className: 'hub-hero' },
          R.createElement('h1', { className: 'hub-title' }, 'BAZINO ARENA OF LEGENDS'),
          R.createElement('p', { className: 'hub-sub' }, 'برترین تجربه گیمینگ کنسولی و مسابقات زنده در ایسکله قبرس.')
        )
      )
    );
  }

  function GenericFactory(name) {
    return function (props) {
      return R.createElement('div', { className: 'hub-page-root' },
        R.createElement(HeaderFactory, props),
        R.createElement('div', { className: 'hub-page-content' },
          R.createElement('h2', { className: 'hub-page-title' }, name)
        )
      );
    };
  }

  var regions = [
    'home',
    'header',
    'games',
    'events',
    'bracket',
    'season',
    'shop',
    'food',
    'club',
    'blog',
    'chat',
    'profile',
    'contact',
    'rules',
    'privacy'
  ];

  for (var i = 0; i < regions.length; i++) {
    var reg = regions[i];
    if (reg === 'home') {
      SDK.registerComponent(reg, HomeFactory);
    } else if (reg === 'header') {
      SDK.registerComponent(reg, HeaderFactory);
    } else {
      SDK.registerComponent(reg, GenericFactory(reg.toUpperCase()));
    }
  }

  console.log('Bazino Hub Neon Theme registered successfully: ' + regions.join(', '));
})();
