'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('watch', function() {
    $._.each($._.union(
      [
        ["_partials/*", globals.section_tasks],
        ["*"],
        ["about/*", ["about", "subsection_stubs"]],
        ["clients/*", ["clients", "subsection_stubs"]],
        ["_scss/*", ["assets"]],
        ["_scss/*/*", ["assets"]],
        ["_js/*", ["assets"]],
        ["_js/*/*", ["assets"]],
        ["assets/**", ["assets"]],
        ["cv/**", ["cv"]],
        ["_layouts/cv.html", ["cv"]]
    ],
    $._.map(globals.section_tasks, function(section) {
      return [section.split("_")[0] + "/**", [section]];
    })
    ), function(path_tuple) {
      gulp.watch(
        util.fs_in(path_tuple[0]),
        $._.union(path_tuple[1], ["reload"])
      );
    });
  });
}
