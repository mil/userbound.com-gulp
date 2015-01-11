module.exports = function(gulp, util, $, globals) {
  gulp.task('homepage', function() {
    gulp
    .src(util.fs_in("index.html"))
    .pipe($.data(util.extract_nav_links))
    .pipe($.data(function(page_object) {
      page_object.vars.title = "Userbound";
      return page_object.vars;
    }))


    .pipe($.insert.prepend(util.read_file(util.fs_in("_partials/header.html"))))
    .pipe($.insert.append(util.read_file(util.fs_in("_partials/footer.html"))))


    .pipe($.swig())
    .pipe(gulp.dest(util.fs_out()));
  });
}