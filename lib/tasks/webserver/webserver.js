'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('webserver', function() {
    $.connect.server({
      root: util.fs_out(),
      port: 4000,
      livereload: true,
      host: '0.0.0.0'
    });
  });
}
