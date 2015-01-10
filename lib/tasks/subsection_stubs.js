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

          this.querySelector('.filter-by .active').setAttribute('class', '');
          $._.each(this.querySelectorAll('.filter-by button'), function(button) {
            if (subsection == button.textContent.toLowerCase()) {
              button.setAttribute('class', 'active');
            }
          });
          this.querySelector('.filter-el').setAttribute('class', 'filter-el');
          this.querySelector('.filter-el[data-category-' + subsection + ']')
          .setAttribute('class', 'filter-el visible');
          return this;
        }))
        .pipe(gulp.dest(util.fs_out("/" + obj.section_name + "/" + subsection)));
      });                                                                                                             
    });
  });
}
