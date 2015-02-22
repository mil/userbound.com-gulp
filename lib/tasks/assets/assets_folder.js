'use strict';

// generation of assets/ folder
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

    $.sass(util.fs_in("_sass/all.sass"), {
        sourcemap: true,
        style: 'compressed',
        precision: 10,
        loadPath: ['.']
      })
      .on('error', function(error) {})
      .pipe($.postcss([ $.autoprefixer({browsers: ['last 2 version']}) ]))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(util.fs_out("assets/")));
  });
}
