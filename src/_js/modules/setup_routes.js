'use strict';

module.exports = function($, globals, util, audio_player, router) {

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


  router.get('/works/music/:track_date', function(request) {
    console.log(request.params.track_date);

    console.log(Object.keys(globals.tracks));
    var idx = Object.keys(globals.tracks).indexOf(
      request.params.track_date.replace(/-/g, '/')
    );
  audio_player.load_track(idx);

    //router.navigate([
    //  '/works/music',
    //  keys[index].replace(/\//g, '-')
    //].join("/"));

  });


};
