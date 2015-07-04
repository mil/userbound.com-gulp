'use strict';
window.UserboundInterface = (function(self) {

  return $.extend(self, {
    init: function() {
      if (self.util.redirect_homepage_to('/works')) { return; }
      if (self.install_consulting_toggle() === 'toggling consulting') { return; }

      // Install Page routing
      self.install_routing();

      // Syntax highlighting, Asciiw Demo, Audio player, Dom Events
      sh_highlightDocument();
      self.asciiw_demo();
      self.setup_audio_player();
      self.install_dom_event_bindings();

      $("nav").addClass("fade-in");
      $("main").addClass("fade-down");
    }
  });

})(window.UserboundInterface || {});

// Page load
$(window.UserboundInterface.init);
