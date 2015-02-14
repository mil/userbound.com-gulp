'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('default', $._.union(
    ['clean', 'homepage', 'about', 'clients'],
    globals.section_tasks,
    [ 'assets_pipeline', 'assets_folder'],
    ['subsection_stubs', 'models_stubs', 'consulting_stubs'],
    [ 'webserver', 'watch']
  ));
}
