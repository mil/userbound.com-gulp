'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('about', function() {

    var layout = "default";

    return gulp
      .src(util.fs_in("about/index.html"))
      .pipe($.markdown())
      .pipe($.data(util.extract_nav_links))
      .pipe($.data(util.install_templating_vars({ 
        title: "About", 
        path: "about", 
        page_layout: layout 
      })))
      .pipe($.replace(/[\s\S]*/,  util.read_file(util.fs_in("_layouts/" + layout + ".html"))))
      .pipe($.swig(globals.swig_opts))
      .pipe($.dom(function() { return mutators.target_blank_external_links.call(this); }))
      .pipe(gulp.dest(util.fs_out("about")));
  });
}
