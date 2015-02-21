'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('homepage', function() {

    var layout = "default";
    return gulp
      .src(util.fs_in("index.html"))
      .pipe($.data(util.extract_nav_links))
      .pipe($.data(util.install_templating_vars({
        title: "Userbound",
        path: "",
        page_layout: "home"
      })))
      .pipe($.replace(/[\s\S]*/,  util.read_file(util.fs_in("_layouts/" + layout + ".html"))))
      .pipe($.swig(globals.swig_opts))
      .pipe(gulp.dest(util.fs_out()));
  });
}
