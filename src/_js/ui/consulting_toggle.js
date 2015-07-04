'use strict';
window.UserboundInterface = (function(self) {
  var toggling_consulting = false;

  function install_consulting_routing() {
    // Only show clients section if consulting mode enabled
    [
      { url: "/consulting", consulting_mode_enabled: true },
      { url: "/noncommercial", consulting_mode_enabled: false  }
    ].forEach(function(state) {
      self.globals.router.get(state.url, function(request) {
        toggling_consulting = true;
        simpleStorage.flush();
        simpleStorage.set('consulting-mode', state.consulting_mode_enabled);
        self.util.load_href('/clients');
      });
    });

    // Only allow showing clients if on
    self.globals.router.get("/clients/:subsection?", function(request) {
      if (!simpleStorage.get('consulting-mode')) {
        self.util.load_href('/');
      }
    });
  }

  function install_clients_navigation_link() {
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

  function install_consulting_toggle() {
    install_consulting_routing();
    if (simpleStorage.get('consulting-mode')) { 
      install_clients_navigation_link(); 
    }
    if (toggling_consulting) { 
      return 'toggling consulting';
    }
  }

  return $.extend(self, {
    install_consulting_toggle: install_consulting_toggle
  });
})(UserboundInterface || {});
