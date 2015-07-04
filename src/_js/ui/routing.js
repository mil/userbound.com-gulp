'use strict';
window.UserboundInterface = (function(self) {
  // Initialize routing with Grapnel
  return $.extend(self, {
    install_routing: function() {
      ['clients', 'about', 'interfaces', 'works'].forEach(function(section) { 

        if ($(".filter-by button").length > 0) {
          self.globals.router.get('/' + section, function(request) {
            self.util.activate_subsection(
              $($(".filter-by button")[0]).text().toLowerCase().replace(" ", "-")
            );
          });
        }

        self.globals.router.get('/' + section + '/:subsection', function(request) {
          var subsection = request.params.subsection;
          self.util.activate_subsection(subsection);
        });

        // nested subsection
        self.globals.router.get('/' + section + '/:page/:nested', function(request) {
          self.util.activate_subsection(request.params.nested);
        });
      });
    }
  });
})(window.UserboundInterface || {});
