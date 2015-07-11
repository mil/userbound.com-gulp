'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  // todo for when gulpfile is re-work'd
  // currently works_entries is not 'finishing'
  gulp.task('works_stubs', ['blog_entries'], function() {
    var track_list = require('../../../../' + util.fs_in('_js/ui/audio_tracks.js'));
    $._.each(track_list, function(v, date) {
      var date = date.replace(/\//g, '-');
      gulp
        .src(util.fs_out('works/music/index.html'))
        .pipe(gulp.dest(util.fs_out('works/music/' + date)));
    });


    $._.each(["code", "model"], function(subsection) {
      $._.each(util.extract_collection_entries("works"), function(entry) {
        gulp
          .src(util.fs_out("works/" + entry.title + "/index.html"))
          .pipe($.dom(function() {
            return mutators.activate_subsection_stub.call(
              this, subsection, entry
            );
          }))
          .pipe(gulp.dest(
            util.fs_out("works/" + entry.title + "/" + subsection)
          ));

      });
    });
  });
}
