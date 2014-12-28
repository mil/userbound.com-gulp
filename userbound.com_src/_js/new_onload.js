var UserboundInterface = (function(my) {
  my.init = function() {
    //$(window).on("unload", function() {
    //});
    

    $(".filter-by button").on("click", function(e) {
      var filter_by = e.target.innerHTML.toLowerCase();
      $(".filter-by button").removeClass("active");
      $(e.target).addClass("active");

      $(".filter-el").each(function(i, el) {
        if (($(el).attr("data-category-" + filter_by) != null) || filter_by == "all") {
          $(el).css("display", "block");
          $(el).animate({
            opacity : 1
          }, function() {
            $(el).addClass("visible");
          });

        } else {
          $(el).animate({
            opacity : 0
          }, function() {
            $(el).css("display", "none");
            $(el).removeClass("visible");
          });
        }

      });
    });

    sh_highlightDocument();
  };

  return my;
})(UserboundInterface || {});


// Page load
$(function($) { UserboundInterface.init(); });
