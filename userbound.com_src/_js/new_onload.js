var UserboundInterface = (function(my) {
  my.init = function() {
    //$(window).on("unload", function() {
    //});
    

    $(".filter-by button").on("click", function(e) {
      var filter_by = e.target.innerHTML.toLowerCase();

      $(".interfaces-list a").each(function(i, el) {
        if (($(el).attr("data-category-" + filter_by) != null) || filter_by == "all") {
          $(el).css("display", "block");

        } else {
          $(el).css("display", "none");

        }

      });
    });

    sh_highlightDocument();
  };

  return my;
})(UserboundInterface || {});


// Page load
$(function($) { UserboundInterface.init(); });
