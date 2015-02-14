'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('about', function() {

    var layout = "default";

    return gulp
      .src(util.fs_in("about/index.html"))
      .pipe($.markdown())

      .pipe($.data(util.extract_nav_links))
      // Load page contents into yield, replace contents with Swig template
      .pipe($.data(function(page_object) {
        page_object.vars.title = "About";
        page_object.vars.path = "about";
        page_object.vars.yield = page_object.contents.toString();
        return page_object.vars;
      }))
      .pipe($.replace(/[\s\S]*/,  util.read_file(util.fs_in("_layouts/" + layout + ".html"))))

      // Run markdown and swig
      .pipe($.swig(globals.swig_opts))

      // Mutator
      .pipe($.dom(function() { return mutators.target_blank_external_links.call(this); }))

      // Output
      .pipe(gulp.dest(util.fs_out("about")));
  });
}
