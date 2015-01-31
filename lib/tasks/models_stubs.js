module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('models_stubs', ['models_entries'], function() {
    $._.each(["code", "model"], function(subsection) {
      $._.each(util.extract_collection_entries("models"), function(entry) {
        gulp.src(util.fs_out("models/" + entry.title + "/index.html"))
        .pipe($.dom(function() { 
          return mutators.activate_subsection_stub.call(this, subsection, entry)
        }))
        .pipe(gulp.dest(util.fs_out("models/" + entry.title + "/" + subsection)));                
      });
    });
  });
}
