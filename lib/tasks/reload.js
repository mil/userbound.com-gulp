module.exports = function(gulp, util, $, globals) {
  gulp.task("reload", $._.union(
    globals.section_tasks, ['assets_pipeline', 'assets_folder']), function() {
    gulp.src("*").pipe($.connect.reload());
  });
}
