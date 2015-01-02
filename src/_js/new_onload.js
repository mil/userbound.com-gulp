function smoothScroll(el, to, duration) {
    if (duration < 0) {
        return;
    }
    var difference = to - $(window).scrollTop();
    var perTick = difference / duration * 10;
    this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            smoothScroll(el, to, duration - 10);
        }
    }.bind(this), 10);
}


var UserboundInterface = (function(my) {
  my.init = function() {
    //$(window).on("unload", function() {
    //});
    //
    $("a").on("click", function(e) {
        e.preventDefault();
var new_href = $($(e.target).is("a") ? 
          $(e.target) : $(e.target).closest("a")
         ).attr("href");


      smoothScroll($(window), 0, 100);

      setTimeout(function() {
        
        $("nav").addClass('fade-out');
        $("main").addClass('fade-up');

        setTimeout(function() {
          window.location = new_href;
        }, 1000);
      }, 100);
    });
    

    $(".filter-by button").on("click", function(e) {
      e.preventDefault();
      var filter_by = e.target.innerHTML.toLowerCase();
      $(".filter-by button").removeClass("active");
      $(e.target).addClass("active");

      $(".filter-el").each(function(i, el) {
        var out_els = [];
        var in_els = [];

        window.history.pushState(null, null, "/tessft");
        if (
          ($(el).attr("data-category-" + filter_by) != null) || 
          (filter_by == "all")
        ) { in_els.push(el); } else { out_els.push(el); }


        $(out_els).animate({
          opacity: 0
        }, function() {
          $("header").after(in_els);
          

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

