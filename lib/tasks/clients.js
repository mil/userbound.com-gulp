'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('clients', function() {

    var layout = "default";

    return gulp
      .src(util.fs_in("clients/index.html"))
      .pipe($.markdown())
      .pipe($.data(util.extract_nav_links))
      .pipe($.data(util.install_templating_vars({
        title: "Clients",
        path: "clients",
        layout: layout
      })))
      .pipe($.replace(/[\s\S]*/,  util.read_file(util.fs_in("_layouts/" + layout + ".html"))))
      .pipe($.swig(globals.swig_opts))
      .pipe($.dom(function() { return mutators.target_blank_external_links.call(this); }))
      .pipe(gulp.dest(util.fs_out("clients")));
  });
}
