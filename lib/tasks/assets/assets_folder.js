'use strict';

// generation of assets/ folder
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('assets_folder', function() {
    var js_libs = [
      'zepto.min.js', 'zepto.fx.js',
      'sh_main.js', 'grapnel.min.js',
      'wavesurfer.min.js', 'simpleStorage.js', 
      'audio_tracks.js', 'audio_player.js', 
      'onload.js'
    ];

    gulp
      .src(
        $._.map(js_libs, function(js) { return util.fs_in("_js/" + js); })
        .concat(util.fs_in("_js/lang/*.js"))
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
