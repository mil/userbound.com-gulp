'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('clients', function() {

    var layout = "default";

    return gulp
      .src(util.fs_in("clients/index.html"))
      .pipe($.markdown())

      .pipe($.data(util.extract_nav_links))

      .pipe($.data(function(page_object) {
        page_object.vars.title = "Clients";
        page_object.vars.path = "clients";
        page_object.vars.yield = page_object.contents.toString();
        page_object.vars.layout = layout;
        return page_object.vars;
      }))
      .pipe($.replace(/[\s\S]*/,  util.read_file(util.fs_in("_layouts/" + layout + ".html"))))

      .pipe($.swig(globals.swig_opts))
      .pipe($.dom(function() { return mutators.target_blank_external_links.call(this); }))
      .pipe(gulp.dest(util.fs_out("clients")));
  });
}
