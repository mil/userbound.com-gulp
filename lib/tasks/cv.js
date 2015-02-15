'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('cv', function() {

    var layout = "cv";
    
    return gulp
      .src(util.fs_in("cv/index.html"))
      .pipe($.fem({ property: 'vars', remove: true }))
      .pipe($.markdown())
      .pipe($.data(util.extract_nav_links))

      .pipe($.data(function(page_object) {
        page_object.vars.title = "Cv";
        page_object.vars.path = "cv";
        page_object.vars.yield = page_object.contents.toString();
        return page_object.vars;
      }))
      .pipe($.replace(/[\s\S]*/,  util.read_file(util.fs_in("_layouts/" + layout + ".html"))))


      .pipe($.swig(globals.swig_opts))
      .pipe($.dom(function() { return mutators.target_blank_external_links.call(this); }))
      .pipe(gulp.dest(util.fs_out("cv")));
  });
}
