'use strict';

module.exports = function($) {
  return function() {
    if ($.z("pre.ascii-frames").length == 0 || typeof slides == "undefined") {
      return;
    }
    var condition = 'raining';
    window.slide_count = 0;
    setInterval(function() {
      var frame = slides[condition]['frames'][window.slide_count].join("\n");

      window.slide_count =
        (window.slide_count == slides[condition]['frames'].length - 1) ?
          0 : window.slide_count + 1;

      $.z("pre.ascii-frames").html(frame);

    }, slides[condition]['interval']);
  };
};
