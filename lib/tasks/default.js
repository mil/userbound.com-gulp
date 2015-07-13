'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('default', $._.union(
    ['clean', 'about', 'clients', 'cv'],
    globals.section_tasks,
    [ 'assets' ],
    ['subsection_stubs', 'consulting_stubs', 'works_stubs'],
    [ 'webserver', 'watch']
  ));
}
