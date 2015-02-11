'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('tests', function() {
    $.globby([util.fs_out("**/*.html")], function(err, paths) {
      $._.each(paths, function(html_file) {
        var f = html_file;
        $.w3cjs.validate({
          file: f,
          callback: function (res) {
        

            console.log("-------------------------------");
            var warnings = $._.filter(res.messages, function(msg) {
              return msg.subtype == "warning";
            });
            var errors = $._.filter(res.messages, function(msg) {
              return msg.subtype == "error";
            });
            
            var status = errors.length === 0 ? 
              $.colors.green("Valid") : $.colors.red("Invalid");

            console.log(res.context + " is " + status);
           
             
            $._.each([
              { arr: errors, type: "Error", color: 'red' },
              { arr: warnings, type: "Warning", color: 'yellow' },
            ], function(msgs) {

              $._.each(msgs.arr, function(msg) {
                console.log("==> " + $.colors[msgs.color](msgs.type) +  "(Line " + msg.lastLine + ", Col " + msg.lastColumn + ")");
                console.log("    -- " + msg.message);
              });
            });
            console.log("-------------------------------\n\n");




          }
        });
      });
    });
  });
}
