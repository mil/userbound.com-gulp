'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('homepage', function() {

    var layout = "default";
    return gulp
      .src(util.fs_in("index.html"))
      .pipe($.data(util.extract_nav_links))
      .pipe($.data(function(page_object) {
        page_object.vars.title = "Userbound";
        page_object.vars.path = "";
        page_object.vars.yield = page_object.contents.toString();
        return page_object.vars;
      }))
      .pipe($.replace(/[\s\S]*/,  util.read_file(util.fs_in("_layouts/" + layout + ".html"))))


      .pipe($.swig(globals.swig_opts))
      .pipe($.dom(function() {
        this.querySelectorAll('html')[0].setAttribute('id', 'home');
        return this;
      }))

      .pipe(gulp.dest(util.fs_out()));
  });
}
