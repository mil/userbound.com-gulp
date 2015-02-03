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

  function asciiw_demo() {
    if ($("pre.ascii-frames").length == 0 || typeof slides == "undefined") {
      return;
    }
    var condition = 'raining';
    window.slide_count = 0;
    setInterval(function() {
      var frame = slides[condition]['frames'][window.slide_count].join("\n");

      window.slide_count = 
        (window.slide_count == slides[condition]['frames'].length - 1) ?
        0 : window.slide_count + 1;

      $("pre.ascii-frames").html(frame);

    }, slides[condition]['interval']);
    $("pre.ascii-frames")

  }

  function link_hover(e)   { $(".guy .head").addClass("hovering"); }
  function link_unhover(e) { $(".guy .head").removeClass("hovering"); }

  function link_click(e) {
    var target_link = $(e.target).is("a") ? e.target : $(e.target).closest("a");
    if ($(target_link).attr("target") === "_blank") { return; }
    if ($(target_link).attr("href").match(/^mailto\:/)) { return; }
    if ($(target_link).attr("href") === "#") { return; }

    var scroll_speed_ms  = 100; 
    var css_animation_ms = 1000;
    var load_new_page_fn = function() { 
      window.location = $(target_link).attr('href'); 
    };

    e.preventDefault();


    function fade_up_out() {
      $("nav").addClass('fade-out');
      $("main").addClass('fade-up');
      setTimeout(load_new_page_fn, css_animation_ms);
    };

    if (window.scrollY > 276) {
      flicker_out_in({ complete: fade_up_out});
    } else {
      fade_up_out();
    }

  } 
 
  function flicker_out_in(params) {
    $("body").animate({
      opacity: 0,
      'margin-top': '-10px'
    }, {
      duration: 300,
      complete: function() {
      document.body.scrollTop = 0;
      $("body").css('margin-top', '0');

      $("body").animate({ opacity: 1 }, {
        duration: 100,
        complete: params.complete
      });
      }
    });
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
    router.navigate(window.location.href.match("/models") ?
      "/models/" + $("h1").text() + "/" + subsection :
      "/" + $("h1").text().toLowerCase() + "/" + subsection
    );
  }
  

  return { 
    init: function() {
      // Setup click callbacks for links and subsection clicking
      $("a").on("click", link_click);
      $("a").on("mouseover", link_hover);
      $("a").on("mouseout", link_unhover);
      $(".filter-by button").on("click", subsection_button_click);
      $("img[data-category-model]").on("click", function() {$($(".filter-by button")[1]).click()});

      // Initialize routing with Grapnel
      ['about', 'interfaces', 'models/:section'].forEach(function(section) { try {
        router.get('/' + section, function(request) {
          activate_subsection(
            $($(".filter-by button")[0]).text().toLowerCase()
          );   
        });
        router.get('/' + section + '/:subsection', function(request) {
          var subsection = request.params.subsection;
          activate_subsection(subsection);   
        });
      } catch(e) { /* not a page with subsection routing */ } });

      // Enable syntax highlighting with sh_ classes on <pre>'s
      sh_highlightDocument();

      // Asciiw-demo
      asciiw_demo();
    }
  };
})(UserboundInterface || {});

// Page load
$(UserboundInterface.init);
