'use strict';
module.exports = function(gulp, $, util, mutators, globals) {

  var deps = ['about', 'clients', 'interfaces_entries'];
  gulp.task('subsection_stubs', deps, function() {
    var pages_subsections = [
      { section_name : 'clients', sub_sections : ['ibm-design', 'enola-labs'] },
      { section_name : 'about', sub_sections : ['general', 'web', 'linux', 'music', 'quotes'] },
      { section_name : 'interfaces', sub_sections : ['linux', 'web', 'physical'] },
      { section_name : 'works', sub_sections : ['models', 'music'] }
    ];

    $._.each(pages_subsections, function(obj) {
      $._.each(obj.sub_sections, function(subsection) {

        gulp
          .src(util.fs_out("/" + obj.section_name + "/index.html"))
          .pipe($.dom(function() {
            return mutators.activate_subsection_stub.call(this, subsection, obj)
          }))
          .pipe(gulp.dest(
            util.fs_out("/" + obj.section_name + "/" + subsection)
          ));

      });
    });
  });
}
