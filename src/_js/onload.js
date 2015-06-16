'use strict';
var UserboundInterface = (function(my) {
  var router = new Grapnel({ pushState: true });
  var toggling_consulting = false;

  function activate_subsection(subsection) {
    if (current_active_section() == subsection) { return; }

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
      var new_subsection_el =
        $(".filter-el[data-category-" + subsection.replace(" ", "-") + "]");
      active_subsection_el.removeClass("visible");
      new_subsection_el.css("opacity", 0).addClass("visible");
      new_subsection_el.animate({ opacity: 1 }, function() {});
    });
  }

  function current_active_section() {
    return $(".filter-by button.active").text().toLowerCase().replace(" ", "-");
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

  function load_href(href) { window.location = href; };
  function fade_up_out(new_href) {

    var transition_duration_ms = 1000;
    $("nav").addClass('fade-out');
    $("main").addClass('fade-up');

    setTimeout(function() {
      if (new_href) { load_href(new_href); }
    }, transition_duration_ms);
  };

  function link_hover(e)   { $(".guy .head").addClass("hovering"); }
  function link_unhover(e) { $(".guy .head").removeClass("hovering"); }

  function link_click(e) {
    var target_link = $(e.target).is("a") ? e.target : $(e.target).closest("a");
    if ($(target_link).attr("target") === "_blank") { return; }
    if ($(target_link).attr("href").match(/^mailto\:/)) { return; }
    if ($(target_link).attr("href") === "#") { return; }

    e.preventDefault();

    var current_section = window.location.href.replace(/^.*\/\/[^\/]+/, '').split('/')[1];
    var href = $(target_link).attr('href');
    if (!href.match(current_section)) { $("nav a.active").removeClass("active"); }
    fade_up_out(href);
  } 
 
  function subsection_button_click(e) {
    var subsection = e.target.innerHTML.toLowerCase();

    // Models follows a different schema since its only subpage with stubs
    router.navigate(
      //window.location.href.match("/models") ?
      //"/models/" + $("h1").text().replace(/^\s+|\s+$/g,'') + "/" + subsection.replace(" ", "-") :
      "/" + $("h1").text().toLowerCase() + "/" + subsection.replace(" ", "-")
    );
  }

  function install_dom_event_bindings() {
    // Setup click callbacks for links and subsection clicking
    $("a").on("click", link_click);
    $("a").on("mouseover", link_hover);
    $("a").on("mouseout", link_unhover);
    $(".filter-by button").on("click", subsection_button_click);
    $("img[data-category-model]").on("click", function() {$($(".filter-by button")[1]).click()});
  }

  // Initialize routing with Grapnel
  function install_routing() {
    ['clients', 'about', 'interfaces', 'works'].forEach(function(section) { 
      try {
        router.get('/' + section, function(request) {
          activate_subsection(
            $($(".filter-by button")[0]).text().toLowerCase().replace(" ", "-")
          );
        });
        router.get('/' + section + '/:subsection', function(request) {
          var subsection = request.params.subsection;
          activate_subsection(subsection);
        });
      } catch(e) { /* not a page with subsection routing */ }
    });

    // Only show clients section if consulting mode enabled
    [
      { url: "/consulting", consulting_mode_enabled: true },
      { url: "/noncommercial", consulting_mode_enabled: false  }
    ].forEach(function(state) {
      router.get(state.url, function(request) {
        toggling_consulting = true;
        simpleStorage.flush();
        simpleStorage.set('consulting-mode', state.consulting_mode_enabled);
        load_href('/clients');
      });
    });

    // Only allow showing clients if on 
    router.get("/clients/:subsection?", function(request) {
      if (!simpleStorage.get('consulting-mode')) {
        load_href('/');
      }
    });


  }


  function install_clients_navlink() {
    // only installs if in consulting mode
    var clients_section_active = window.location.pathname.match(/^\/clients/);
    var is_homepage = $("html head title").text().match(/^Userbound/);

    // makes it active, if on /clients*
    var clients_link = $("<a href='/clients' title='Clients'></a>")
      .addClass(clients_section_active ? "active" : "")
      .attr("title", is_homepage ? "" : "Clients")
      .append([
        "<span class='symbol'>",
        "<svg class='icon-screen'>",
        "<use xlink:href='/assets/images/icons.svg#icon-screen'></use>",
        "</svg>",
        "</span>\n",
        "<span class='title'>Clients</span>"
      ].join(""));

    $(clients_link).insertBefore($("nav a")[1]);
  }

  var random_pages = [
    'interfaces/Asciiw',
    'interfaces/Mmvp.js',
    'interfaces/Markdown-Tree',
    'interfaces/Foo-Wm',
    'interfaces/Mil-Edit',
    'interfaces/Asciiw',
    'works/Blockhead',
    'works/Mountains',
    'works/World',
    'interfaces/Cream-Minitouch',
    'interfaces/Piply',
    'blog/Gulp-for-Sitebuilds',
    'blog/A-Map-Function-for-Sass'
  ];

  function strip_leading_and_trailing_slashes(str) {
    return str.replace(/^\/|\/$/g, '');
  }


  function get_random_page() {
    return random_pages[
      Math.floor(Math.random() * random_pages.length)
    ];
  }

  function set_guy_link_to_random_page() {
    var current_page = strip_leading_and_trailing_slashes(
      window.location.pathname
    );
    var page = current_page;
    while (page === current_page) {
      page = get_random_page();
    }
    $("a.guy").attr('href', '/' + page);
  }


  return {
    init: function() {
      sh_highlightDocument();
      asciiw_demo();
      install_routing();

      if (simpleStorage.get('consulting-mode')) { 
        install_clients_navlink();
      }
      if (toggling_consulting) { return; }


      var is_homepage = $("html head title").text().match(/^Userbound/);
      if (is_homepage) {
        load_href(get_random_page());
      } else {
        install_dom_event_bindings();
        set_guy_link_to_random_page();
        $("nav").addClass("fade-in");
        $("main").addClass("fade-down");
      }
    }
  };
})(UserboundInterface || {});

// Page load
$(UserboundInterface.init);
