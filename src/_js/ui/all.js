window.UserboundInterface = (function() {
  var $ = {
    z: require('../libs/zepto.js'),
    grapnel: require('grapnel'),
    simpleStorage: require('../libs/simpleStorage.js'),
    WaveSurfer: require('../libs/wavesurfer.min.js'),
    highlighter: require('../libs/highlight.js')
  };

  $.highlighter.registerLanguage('scss', require('../libs/lang/scss.js'));
  $.highlighter.registerLanguage('c++', require('../libs/lang/cpp.js'));
  $.highlighter.registerLanguage('ruby', require('../libs/lang/ruby.js'));
  $.highlighter.registerLanguage('openscad', require('../libs/lang/openscad.js'));

  var sync_btns_cb = function() {};

  var util = require('./util.js')($);
  var router = new $.grapnel({ pushState: true });
  var routing = require('./routing.js')($, util, router);
  var event_handlers = require('./event_handlers.js')($, util, router, sync_btns_cb);
  var setup_asciiw_demo = require('./asciiw_demo.js')($, util, router);
  var consulting_toggle = require('./consulting_toggle.js')($, util, router);

  var audio_tracks = require('./audio_tracks.js');
  var audio_player = require('./audio_player.js')($, util, router, audio_tracks, sync_btns_cb);

  return {
    init: function() {
      if (util.redirect_homepage_to('/works')) { return; }
      if (consulting_toggle.install_consulting_toggle() === 'toggling consulting') { return; }

      // Install Page routing
      routing.install_routing();


      // Syntax highlighting asciiw demo, audo player, event handlers 
      $.z("[data-language]").each(function(i, el) {
        $.highlighter.highlightBlock(el);
      });

      setup_asciiw_demo();
      audio_player.setup_audio_player();
      event_handlers.install_dom_event_bindings();

      $.z("nav").addClass("fade-in");
      $.z("main").addClass("fade-down");
    }
  };

})();

window.onload = UserboundInterface.init;
