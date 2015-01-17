module.exports = function(gulp, util, $, globals) {


  gulp.task('watch', function() {
    $._.each($._.union(
      [
        ["_partials/*", $._.union(['homepage'], globals.section_tasks)],
        ["*", ["homepage"]],
        ["about/*", ["about"]],
        ["_sass/*", ["assets_folder"]],
        ["_sass/*/*", ["assets_folder"]],
        ["_js/*", ["assets_folder"]]
    ],
    $._.map(globals.section_tasks, function(section) {
      return [section.split("_")[0] + "/*", [section]];
    }),
    $._.map(globals.section_tasks, function(section) {
      return [section.split("_")[0] + "/*/*", [section]];
    })
    ), function(path_tuple) {
      gulp.watch(
        util.fs_in(path_tuple[0]),
        $._.union(path_tuple[1], ["reload"])
      );
    });
  });
}
