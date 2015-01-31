module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('clean', function() {
    $.rimraf.sync(util.fs_out());
  });
}
