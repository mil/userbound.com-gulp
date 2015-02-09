module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('clients', function() {

    return gulp
      .src(util.fs_in("clients/index.html"))
      .pipe($.markdown())
      .pipe($.data(util.extract_nav_links))

      .pipe($.data(function(page_object) {
        page_object.vars.title = "Clients";
        page_object.vars.path = "clients";
        return page_object.vars;
      }))


      .pipe($.insert.prepend(util.read_file(util.fs_in("_partials/header.html"))))
      .pipe($.insert.append(util.read_file(util.fs_in("_partials/footer.html"))))
      .pipe($.swig())
      .pipe($.dom(function() { return mutators.target_blank_external_links.call(this); }))
      .pipe(gulp.dest(util.fs_out("clients")));
  });
}
