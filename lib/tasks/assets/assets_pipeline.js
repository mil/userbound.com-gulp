'use strict';

// assets not strictly dumped to assets/ folder
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('assets_pipeline', ['models_entries'], function() {
    $._.each(globals.model_image_accumulator, function(val) {
      gulp
        .src(util.fs_in("models/images/" + val.image))
        .pipe($.rename(function(path) {
          path.basename  = val.title;
        }))
        .pipe(gulp.dest(util.fs_out("models")));
    });

    $._.each([
             ["assets/**/*", "assets"],
             ["models/scads/*", "models"],
             ["clients/images/*/*",  "clients"],
             ["things/images/*/*",  "things"],
             ["blog/images/*/*",  "blog"],
             ["interfaces/images/*/*", "interfaces"],
             ["interfaces/demos/**/*", "interfaces"],
             [".htaccess", ""],
             ["robots.txt", ""]
    ], function(source_dest_tuple,i) {
      gulp
        .src(util.fs_in(source_dest_tuple[0]))
        .pipe(gulp.dest(util.fs_out(source_dest_tuple[1])));
    });

  });
}