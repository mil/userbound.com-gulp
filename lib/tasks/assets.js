'use strict';

// generation of assets/ folder
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('assets', function() {

    // Browserify
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


    // Sass
    gulp
      .src(util.fs_in('_scss/all.scss'))
      .pipe($.sourcemaps.init())
      .pipe($.sass({ indentedSyntax: true }))
      .on('error', function(error) {
        console.log('Sass Error', error);
      })
      .pipe($.postcss([ $.autoprefixer({browsers: ['last 2 version']}) ]))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(util.fs_out('assets/')));

    // Files within assets/ copied 1-for-1
    // Images, demos, and music/ folders copied into root of
    // blog, things, and interfaces respectivly --
    // Note: please rewrite, this is just added complexity, all should be 1-to-1
    $._.each([
      ["assets/**/*", "assets"],

      ["clients/images/*/*",  "clients"],
      ["things/images/*/*",  "things"],
      ["blog/images/*/*",  "blog"],
      ["interfaces/images/*/*", "interfaces"],
      ["interfaces/demos/**/*", "interfaces"],

      ["works/images/**/*", "works"],
      ["works/music/**/*", "works"],

      [".htaccess", ""],
      ["robots.txt", ""]
    ], function(source_dest_tuple,i) {
      gulp
        .src(util.fs_in(source_dest_tuple[0]))
        .pipe(gulp.dest(util.fs_out(source_dest_tuple[1])));
    });

  });
}
