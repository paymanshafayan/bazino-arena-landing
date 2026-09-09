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

  function createSdkEntry(Component) {
    function UniversalWrapper(props) {
      if (!props || typeof props !== 'object' || (!props.settings && !props.lang && !props.language && !props.ts)) {
        return {
          apiVersion: 2,
          render: function (p) {
            return R.createElement(Component, p);
          }
        };
      }
      return R.createElement(Component, props);
    }
    UniversalWrapper.apiVersion = 2;
    UniversalWrapper.render = function (props) {
      return R.createElement(Component, props);
    };
    return UniversalWrapper;
  }

  /* Explicit string literals matching portal SDK allowed regions whitelist */
  SDK.registerComponent('home', createSdkEntry(HomeFactory));
  SDK.registerComponent('header', createSdkEntry(HeaderFactory));
  SDK.registerComponent('hero', createSdkEntry(HomeFactory));
  SDK.registerComponent('hub.home', createSdkEntry(HomeFactory));
  SDK.registerComponent('hub.games', createSdkEntry(GenericFactory('GAMES')));
  SDK.registerComponent('hub.events', createSdkEntry(GenericFactory('EVENTS')));
  SDK.registerComponent('hub.weekly', createSdkEntry(GenericFactory('WEEKLY')));
  SDK.registerComponent('hub.special', createSdkEntry(GenericFactory('SPECIAL')));
  SDK.registerComponent('hub.season', createSdkEntry(GenericFactory('SEASON')));
  SDK.registerComponent('hub.brackets', createSdkEntry(GenericFactory('BRACKETS')));
  SDK.registerComponent('hub.register', createSdkEntry(GenericFactory('REGISTER')));
  SDK.registerComponent('hub.shop', createSdkEntry(GenericFactory('SHOP')));
  SDK.registerComponent('hub.food', createSdkEntry(GenericFactory('FOOD')));
  SDK.registerComponent('hub.club', createSdkEntry(GenericFactory('CLUB')));
  SDK.registerComponent('hub.blog', createSdkEntry(GenericFactory('BLOG')));
  SDK.registerComponent('hub.chat', createSdkEntry(GenericFactory('CHAT')));
  SDK.registerComponent('hub.contact', createSdkEntry(GenericFactory('CONTACT')));
  SDK.registerComponent('hub.rules', createSdkEntry(GenericFactory('RULES')));
  SDK.registerComponent('hub.privacy', createSdkEntry(GenericFactory('PRIVACY')));

  console.log('Bazino Hub Neon Theme registered successfully.');
})();
