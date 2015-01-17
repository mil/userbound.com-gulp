module.exports = function(gulp, util, $, globals) {
  gulp.task('subsection_stubs', ['about', 'interfaces_entries'], function() {
    var pages_subsections = [
      { section_name : 'about', sub_sections : ['general', 'tech', 'music', 'quotes'] },
      { section_name : 'interfaces', sub_sections : ['linux', 'web'] }
    ];

    $._.each(pages_subsections, function(obj) {
      $._.each(obj.sub_sections, function(subsection) {
        gulp
        .src(util.fs_out("/" + obj.section_name + "/index.html"))
        .pipe($.dom(function() { 
          return util.activate_subsection_stub_mutator.call(this, subsection, obj)
        }))
        .pipe(gulp.dest(util.fs_out("/" + obj.section_name + "/" + subsection)));
      });                                                                                                             
    });
  });
}
