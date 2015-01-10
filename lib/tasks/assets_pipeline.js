module.exports = function(gulp, util, $, globals) {
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
             ["assets/images/*", "assets/images"],
             ["assets/ttf/*", "assets/ttf"],
             ["models/scads/*", "models"],
             ["objects/images/*/*",  "objects"],
             ["blog/images/*/*",  "blog"],
             ["interfaces/images/*/*", "interfaces"],
             ["interfaces/demos/**/*", "interfaces"] 
    ], function(source_dest_tuple,i) {
      gulp
      .src(util.fs_in(source_dest_tuple[0]))
      .pipe(gulp.dest(util.fs_out(source_dest_tuple[1])));
    });

  });
}
