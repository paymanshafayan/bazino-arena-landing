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
  HeaderFactory.apiVersion = 2;
  HeaderFactory.render = function (props) { return R.createElement(HeaderFactory, props); };

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
  HomeFactory.apiVersion = 2;
  HomeFactory.render = function (props) { return R.createElement(HomeFactory, props); };

  function GenericFactory(name) {
    var fn = function (props) {
      return R.createElement('div', { className: 'hub-page-root' },
        R.createElement(HeaderFactory, props),
        R.createElement('div', { className: 'hub-page-content' },
          R.createElement('h2', { className: 'hub-page-title' }, name)
        )
      );
    };
    fn.apiVersion = 2;
    fn.render = function (props) { return R.createElement(fn, props); };
    return fn;
  }

  /* Explicit string literals for portal regex validation */
  SDK.registerComponent('home', HomeFactory);
  SDK.registerComponent('header', HeaderFactory);
  SDK.registerComponent('hero', HomeFactory);
  SDK.registerComponent('games', GenericFactory('GAMES'));
  SDK.registerComponent('events', GenericFactory('EVENTS'));
  SDK.registerComponent('bracket', GenericFactory('BRACKET'));
  SDK.registerComponent('season', GenericFactory('SEASON'));
  SDK.registerComponent('shop', GenericFactory('SHOP'));
  SDK.registerComponent('food', GenericFactory('FOOD'));
  SDK.registerComponent('club', GenericFactory('CLUB'));
  SDK.registerComponent('blog', GenericFactory('BLOG'));
  SDK.registerComponent('chat', GenericFactory('CHAT'));
  SDK.registerComponent('profile', GenericFactory('PROFILE'));
  SDK.registerComponent('contact', GenericFactory('CONTACT'));
  SDK.registerComponent('rules', GenericFactory('RULES'));
  SDK.registerComponent('privacy', GenericFactory('PRIVACY'));

  console.log('Bazino Hub Neon Theme registered successfully.');
})();
