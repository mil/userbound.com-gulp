window.UserboundInterface = (function() {
  var $ = {
    z: require('./libs/zepto.js'),
    grapnel: require('grapnel'),
    simpleStorage: require('./libs/simpleStorage.js'),
    WaveSurfer: require('./libs/wavesurfer.min.js'),
    highlighter: require('./libs/highlight.js')
  };

  $.highlighter.registerLanguage('clojure', require('./libs/lang/clojure.js'));
  $.highlighter.registerLanguage('scss', require('./libs/lang/scss.js'));
  $.highlighter.registerLanguage('c++', require('./libs/lang/cpp.js'));
  $.highlighter.registerLanguage('ruby', require('./libs/lang/ruby.js'));
  $.highlighter.registerLanguage('openscad', require('./libs/lang/openscad.js'));
  $.highlighter.registerLanguage('js', require('./libs/lang/javascript.js'));
  $.highlighter.registerLanguage('smalltalk', require('./libs/lang/smalltalk.js'));


  var globals = require('./modules/globals.js');
  var util = require('./modules/util.js')($, globals);
  var router = new $.grapnel({ pushState: true });
  var event_handlers = require('./modules/event_handlers.js')($, globals, util, router);
  var setup_asciiw_demo = require('./modules/asciiw_demo.js')($, globals, util, router);
  var consulting_toggle = require('./modules/consulting_toggle.js')($, globals, util, router);
  var audio_player = require('./modules/audio_player.js')($, globals, util, router);

  return {
    init: function() {
      if (util.redirect_homepage_to('/interfaces')) { return; }
      if (consulting_toggle.install_consulting_toggle() === 'toggling consulting') { return; }

      // Seting up routes
      require('./modules/setup_routes.js')($, globals, util, audio_player, router);

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
