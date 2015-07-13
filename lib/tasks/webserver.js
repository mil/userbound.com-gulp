'use strict';
module.exports = function(gulp, $, util, mutators, globals) {

  gulp.task("reload",
    $._.union( globals.section_tasks, ['assets']),
    function() {
      return gulp.src("*").pipe($.connect.reload());
    }
  );

  gulp.task('webserver', function() {
    return $.connect.server({
      root: util.fs_out(),
      port: 4000,
      livereload: true,
      host: '0.0.0.0'
    });
  });

}
