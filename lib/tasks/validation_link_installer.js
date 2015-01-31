module.exports = function(gulp, $, util, mutators, globals) {

  var deps = $._.union(globals.section_tasks, [
    'homepage', 
    'about',
    'subsection_stubs',
    'models_stubs'
  ]);
  gulp.task('validation_link_installer', deps, function() {
    var x ={};
    var paths = $.globby.sync([util.fs_out("**/*.html")]);
    $._.each(paths, function(path) {
      var stripped_path = path.split(util.fs_out())[1];

      var dest = path.split('/')
      dest.pop();
      dest = dest.join("/");

      gulp.src(path)
      .pipe($.dom(function() {
        return mutators.replace_validation_href.call(this, stripped_path);
      }))
      .pipe(gulp.dest(dest));
    });
  });
}
