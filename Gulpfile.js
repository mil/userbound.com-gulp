#!/usr/bin/env node
var _        = require('underscore');
var rimraf   = require('rimraf');
var fs       = require('fs');
var gulp     = require('gulp');
var data     = require('gulp-data');
var uglify   = require('gulp-uglify');
var sass     = require('gulp-ruby-sass');
var markdown = require('gulp-markdown');
var fem      = require('gulp-front-matter');
var mustache = require('gulp-mustache');
var vartree      = require('gulp-vartree');
var template = require('gulp-template');
var ejs = require('gulp-ejs');
var consolidate = require('gulp-consolidate');
var insert   = require('gulp-insert');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
var minify   = require('gulp-minify')


var prefs = {
  in_folder  : "userbound.com_src/",
  out_folder : "userbound.com/"
};

function fs_in(path)  { return prefs.in_folder  + path; }
function fs_out(path) { return prefs.out_folder + (path || ''); }
function read_file(path) {
  return fs.readFileSync(path, 'utf8');
}

gulp.task('clean', function() {
  rimraf.sync(fs_out());
});


gulp.task('assets_folder', function() {
  gulp
    .src(
      _.map([
            'FancyZoomHTML.js',
            'FancyZoom.js',
            'sh_main.js',
            'zepto.js',
            'zepto.fx.js',
            'onload.js',
      ], function(js) { return fs_in("_js/" + js); })
      .concat(fs_in("_js/lang/*.js"))
    )

    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(fs_out('assets/'))); 

  gulp
    .src(fs_in("_sass/all.sass"))
    .pipe(sass())
    .pipe(gulp.dest(fs_out('assets/')));

});


gulp.task('pages', function() {
  gulp
    .src(fs_in("index.html"))


    .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
    .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
    .pipe(minify())

    .pipe(gulp.dest(fs_out()));


  gulp
    .src(fs_in("blog/*/*"))
    .pipe(fem({ property: 'fem', remove : true }))
    .pipe(markdown())
    .pipe(rename(function(path) {
      path.dirname += "/" + path.basename;
      path.basename = "index";
    }))

    .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
    .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))

    .pipe(data(function(d) {
      return d.fem;
    }))

    .pipe(template())


    .pipe(gulp.dest(fs_out('blog')));

});



gulp.task('default', [ 'clean', 'pages', 'assets_folder' ]);
