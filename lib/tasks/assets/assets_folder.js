'use strict';

// generation of assets/ folder
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('assets_folder', function() {

    gulp
      .src(util.fs_in('_js/all.js'))
      .pipe($.transform(function(filename) {
        var b = $.browserify({ entries: filename, debug: true });
        return b.bundle();
      }))
      .pipe($.sourcemaps.init({ loadMaps: true }))
      //.pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(util.fs_out('assets/')));


    return gulp
      .src(util.fs_in('_sass/all.sass'))
      .pipe($.sourcemaps.init())
      .pipe($.sass({ indentedSyntax: true }))
      .on('error', function(error) {
        console.log('Sass Error', error);
      })
      .pipe($.postcss([ $.autoprefixer({browsers: ['last 2 version']}) ]))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(util.fs_out('assets/')));
  });
}
