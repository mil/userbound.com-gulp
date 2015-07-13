'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('consulting_stubs', function() {
    $._.each(['consulting', 'noncommercial'], function(stub) {

      gulp
        .src(util.fs_out("index.html"))
        .pipe(gulp.dest(util.fs_out(stub)));

    });
  });
}
