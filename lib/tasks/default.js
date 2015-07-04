'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('default', $._.union(
    ['clean', 'homepage', 'about', 'clients', 'cv'],
    globals.section_tasks,
    [ 'assets_pipeline', 'assets_folder'],
    ['subsection_stubs', 'consulting_stubs', 'works_stubs'],
    [ 'webserver', 'watch']
  ));
}
