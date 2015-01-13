module.exports = function(gulp, util, $, globals) {
  gulp.task('assets_folder', function() {
    gulp
      .src(
        $._.map([
              //'FancyZoomHTML.js',
              //'FancyZoom.js',
              'sh_main.js',
              'zepto.min.js',
              'zepto.fx.js',
              //'onload.js',
              'new_onload.js'
        ], function(js) { return util.fs_in("_js/" + js); })
        .concat(util.fs_in("_js/lang/*.js"))
      )

      .pipe($.concat('all.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(util.fs_out('assets/'))); 

    gulp
      .src(util.fs_in("_sass/all.sass"))
      .pipe($.sass({}))
      .on('error', function(error) {})
      .pipe(gulp.dest(util.fs_out('assets/')));

  });
}
