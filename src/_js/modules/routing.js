'use strict';

module.exports = function($, globals, util, router) {
  return {
    install_routing: function() {
      ['clients', 'about', 'interfaces', 'works'].forEach(function(section) { 

        if ($.z(".filter-by button").length > 0) {
          router.get('/' + section, function(request) {
            util.activate_subsection(
              $.z($.z(".filter-by button")[0]).text().toLowerCase().replace(" ", "-")
            );
          });
        }

        router.get('/' + section + '/:subsection', function(request) {
          var subsection = request.params.subsection;
          util.activate_subsection(subsection);
        });

        // nested subsection
        router.get('/' + section + '/:page/:nested', function(request) {
          util.activate_subsection(request.params.nested);
        });
      });
    }
  };
};
