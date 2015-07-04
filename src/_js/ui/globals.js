'use strict';
window.UserboundInterface = (function(self) {
  return $.extend(self, {
    globals: {
      router: new Grapnel({ pushState: true })
    }
  });
})(window.UserboundInterface || {});
