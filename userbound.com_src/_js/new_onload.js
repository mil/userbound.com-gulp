var UserboundInterface = (function(my) {
  my.init = function() {
    //$(window).on("unload", function() {
    //});
    

    $(".filter-by button").on("click", function(e) {
      var filter_by = e.target.innerHTML.toLowerCase();
      $(".filter-by button").removeClass("active");
      $(e.target).addClass("active");

      $(".filter-el").each(function(i, el) {
        var out_els = [];
        var in_els = [];

        if (
          ($(el).attr("data-category-" + filter_by) != null) || 
          (filter_by == "all")
        ) { in_els.push(el); } else { out_els.push(el); }



        var p = $(in_els[0]).parent();
        $(".page-info").after(in_els);
        $(in_els).css('position', 'absolute');
          $(out_els).css('position', 'static');

        $(out_els).animate({
          opacity: 0
        }, function() {


          $(in_els).css('position', 'static');
          $(out_els).css('position', 'absolute');

          $(in_els).css("display", "block").animate({
            opacity : 1
          }, function() {
            $(in_els).addClass("visible");
            $(out_els).css("display", "none").removeClass("visible");
          });


        });



      });
    });

    sh_highlightDocument();
  };

  return my;
})(UserboundInterface || {});


// Page load
$(function($) { UserboundInterface.init(); });
