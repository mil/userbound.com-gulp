module.exports = function(gulp, util, $, globals) {
  gulp.task('clean', function() {
    $.rimraf.sync(util.fs_out());
  });
}
