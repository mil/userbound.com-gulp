'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  // todo for when gulpfile is re-work'd
  // currently works_entries is not 'finishing'
  gulp.task('works_stubs', ['blog_entries'], function() {
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
