var UserboundInterface = (function(my) {
  my.init = function() {
    $(window).on("unload", function() {
      console.log(window.location);
      console.log("UNLOAD");

    });

  };

  return my;
})(UserboundInterface || {});


// Page load
$(function($) { UserboundInterface.init(); });
