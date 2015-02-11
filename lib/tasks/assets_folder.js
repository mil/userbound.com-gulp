'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('assets_folder', function() {
    var js_libs = [
      'zepto.min.js', 'zepto.fx.js',
      'sh_main.js', 'grapnel.min.js',
      'simpleStorage.js', 'onload.js'
    ];


    gulp
      .src(
        $._.map(js_libs, function(js) { return util.fs_in("_js/" + js); })
        .concat(util.fs_in("_js/lang/*.js"))
      )
      .pipe($.concat('all.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(util.fs_out("assets/"))); 

    gulp
      .src(util.fs_in("_sass/all.sass"))
      .pipe($.sass({}))
      .on('error', function(error) {})
      .pipe(gulp.dest(util.fs_out("assets/")));
  });
}
