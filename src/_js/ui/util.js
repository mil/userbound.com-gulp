'use strict';
window.UserboundInterface = (function(self) {

  function strip_leading_and_trailing_slashes(str) {
    return str.replace(/^\/|\/$/g, '');
  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');
  }

  function current_active_section() {
    return $(".filter-by button.active").length > 0 ?
      $(".filter-by button.active").text().toLowerCase().replace(" ", "-") :
      false;
  }

  function load_href(href) {
    window.location = href;
  }

  function fade_up_out(new_href) {
    var transition_duration_ms = 1000;
    $("nav").addClass('fade-out');
    $("main").addClass('fade-up');

    setTimeout(function() {
      if (new_href) { self.util.load_href(new_href); }
    }, transition_duration_ms);
  };

  function redirect_homepage_to(path) {
    var is_homepage = $("html head title").text().match(/^Userbound/);
    if (is_homepage) {
      self.util.load_href(path);
      return;
    }
  }


  function activate_subsection(subsection) {
    console.log('activating');
    if (
      // Already activated on that button
      current_active_section() === subsection ||

      // Pageload for secondary page
      trim($("h1").text()) === subsection
    ) { return; }

    var active_subsection_el  = $(".filter-el.visible");
    var active_subsection_btn = $(".filter-by button");
    var out_els = [], in_els = [];


    active_subsection_btn.removeClass("active");
    $(".filter-by button").each(function(i, el) {
      if ($(el).text().toLowerCase().replace(" ", "-") == subsection) {
        $(el).addClass("active");
      }
    });

    active_subsection_el.animate({ opacity: 0 }, function() {
      self.sync_audio_track_buttons_visibility();
      var new_subsection_el =
        $(".filter-el[data-category-" + subsection.replace(" ", "-") + "]");
      active_subsection_el.removeClass("visible");
      new_subsection_el.css("opacity", 0).addClass("visible");
      new_subsection_el.animate({ opacity: 1 }, function() {});
    });
  }

  return $.extend(self, {
    util: {
      strip_leading_and_trailing_slashes: strip_leading_and_trailing_slashes,
      trim: trim,
      current_active_section: current_active_section,
      load_href: load_href,
      activate_subsection: activate_subsection,
      fade_up_out: fade_up_out,
      redirect_homepage_to: redirect_homepage_to
    }
  });
})(window.UserboundInterface || {});
