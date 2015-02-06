module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('assets_folder', function() {
    var js_libs = [
      'zepto.min.js', 'zepto.fx.js',
      'sh_main.js', 'grapnel.min.js',
      'onload.js',
    ];


    gulp
      .src(
        $._.map(js_libs, function(js) { return util.fs_in("_js/" + js); })
        .concat(util.fs_in("_js/lang/*.js"))
      )
      .pipe($.concat('all.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(util.fs_out("assets/"))); 

    $.sass(util.fs_in("_sass/all.sass"), { "sourcemap=none":  true})
      .pipe($.autoprefixer({
        browsers: ['last 2 version', 'ie 8', 'ie 9', 'ios 6', 'android 4']
      }))
      //.on('error', function (err) {
      //  console.error('Error!', err.message);
      //}) 
      //.pipe($.data(function(page) {
      //  console.log(JSON.stringify(page));
      //  //x = $.prefixer.process(
      //  //  util.read_file(
      //  //    util.fs_out("assets/all.css")
      //  //  )
      //  //);
      //  //console.log(x);
      //  //$.autoprefixer-core({
      //  //  browsers: ['last 2 version', 'ie 9', 'ios 6', 'android 4']
      //  //})}))

      ////.pipe($.replace(/[\s\S]*/, util.read_file(util.fs_in(collection_name + "/entry_template.html"))))
      //}))
      .pipe(gulp.dest(util.fs_out("assets/")));
  });
}
