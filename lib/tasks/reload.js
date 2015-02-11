'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task("reload", $._.union(
    globals.section_tasks, ['assets_pipeline', 'assets_folder']), function() {
    gulp.src("*").pipe($.connect.reload());
  });
}
