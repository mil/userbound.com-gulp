'use strict';

// generation of assets/ folder
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('assets_folder', function() {
    var js_libs = [
      'libs/zepto.min.js', 'libs/zepto.fx.js',
      'libs/sh_main.js', 'libs/grapnel.min.js',
      'libs/wavesurfer.min.js', 'libs/simpleStorage.js',
      'libs/lang/*.js',

      'ui/globals.js', 'ui/util.js',
      'ui/routing.js', 'ui/event_handlers.js',
      'ui/asciiw_demo.js', 'ui/consulting_toggle.js',
      'ui/audio_tracks.js', 'ui/audio_player.js',
      'ui/onload.js'
    ];

    gulp
      .src(
        $._.map(js_libs, function(js) { return util.fs_in("_js/" + js); })
      )
      .pipe($.concat('all.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(util.fs_out("assets/")));

    return gulp
      .src(util.fs_in("_sass/all.sass"))
      .pipe($.sourcemaps.init())
      .pipe($.sass({ indentedSyntax: true }))
      .on('error', function(error) {
        console.log("Sass Error", error);
      })
      .pipe($.postcss([ $.autoprefixer({browsers: ['last 2 version']}) ]))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(util.fs_out("assets/")));
  });
}
