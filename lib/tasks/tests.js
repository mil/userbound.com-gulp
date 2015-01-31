module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('tests', function() {
    $.globby([util.fs_out("**/*.html")], function(err, paths) {
      $._.each(paths, function(html_file) {
        var f = html_file;
        $.w3cjs.validate({
          file: f,
          callback: function (res) {
            console.log(res);
            if (!!res && !!res.message && res.messages.length > 0 ) {
              console.log("html errors have been found", res);
            };
          }
        });
      });
    });
  });
}
