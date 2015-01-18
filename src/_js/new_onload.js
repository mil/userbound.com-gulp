var UserboundInterface = (function(my) {
  var router = new Grapnel({ pushState: true });

  function activate_subsection(subsection) {
    if (current_active_section() == subsection) { return; }

    var active_subsection_el  = $(".filter-el.visible");
    var active_subsection_btn = $(".filter-by button");
    var out_els = [], in_els = [];


    active_subsection_btn.removeClass("active");
    $(".filter-by button").each(function(i, el) {
      if ($(el).text().toLowerCase() == subsection) {
        $(el).addClass("active");
      }
    });


    active_subsection_el.animate({ opacity: 0 }, function() {
      var new_subsection_el = 
        $(".filter-el[data-category-" + subsection + "]");
      active_subsection_el.removeClass("visible");
      new_subsection_el.css("opacity", 0).addClass("visible");
      new_subsection_el.animate({ opacity: 1 }, function() {});
    });
  }

  function current_active_section() {
    return $(".filter-by button.active").text().toLowerCase();
  }


  function link_click(e) {
    if ($(e.target).attr("target") === "_blank") { return; }

    var scroll_speed_ms  = 100; 
    var css_animation_ms = 1000;
    var target_link      = $(e.target).is("a") ? $(e.target) : $(e.target).closest("a");
    var load_new_page_fn = function() { 
      window.location = $(target_link).attr('href'); 
    };

    e.preventDefault();
    smooth_scroll($(window), 0, scroll_speed_ms);
    setTimeout(function() {
      $("nav").addClass('fade-out');
      $("main").addClass('fade-up');
      setTimeout(load_new_page_fn, css_animation_ms);
    }, scroll_speed_ms);
  }
 
  function smooth_scroll(el, to, duration) {
    // adapted from: http://austinpray.com/blog/zepto-js-smooth-vertical-scrolling/ 
    if (duration < 0) { return; }
    var difference = to - $(window).scrollTop();
    var perTick = difference / duration * 10;
    this.scrollToTimerCache = setTimeout(function() {
      if (!isNaN(parseInt(perTick, 10))) {
        window.scrollTo(0, $(window).scrollTop() + perTick);
        smooth_scroll(el, to, duration - 10);
      }
    }.bind(this), 10);
  }  

  function subsection_button_click(e) {
    var subsection = e.target.innerHTML.toLowerCase();

    // Models follows a different schema since its only subpage with stubs
    var new_href = (window.location.href.match("/models")) ?
      "/models/" + $("h1").text() + "/" + subsection :
        "/" + $("h1").text().toLowerCase() + "/" + subsection; 

    e.preventDefault();
    router.navigate(new_href);
  }
  

  return { 
    init: function() {
      // Setup click callbacks for links and subsection clicking
      $("a").on("click", link_click);
      $(".filter-by button").on("click", subsection_button_click);
      $("img[data-category-model]").on("click", $($(".filter-by button")[1]).click);

      // Initialize routing with Grapnel
      ['about', 'interfaces', 'models/:section'].forEach(function(section) {
        router.get('/' + section, function(request) {
          activate_subsection(
            $($(".filter-by button")[0]).text().toLowerCase()
          );   
        });
        router.get('/' + section + '/:subsection', function(request) {
          var subsection = request.params.subsection;
          activate_subsection(subsection);   
        });
      });

      // Enable syntax highlighting with sh_ classes on <pre>'s
      sh_highlightDocument();
    }
  };
})(UserboundInterface || {});

// Page load
$(UserboundInterface.init);
