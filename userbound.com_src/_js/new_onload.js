var UserboundInterface = (function(my) {
  my.init = function() {
    $(window).on("unload", function() {
      console.log("WO");
      //console.log(window.location);
      //console.log("UNLOAD");

    });

    sh_highlightDocument();
  };

  return my;
})(UserboundInterface || {});


// Page load
$(function($) { UserboundInterface.init(); });
