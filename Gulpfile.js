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
var minify   = require('gulp-minify');
var connect = require('gulp-connect');
var yaml_extractor = require('yaml-front-matter');

var prefs = {
  in_folder  : "userbound.com_src/",
  out_folder : "userbound.com/"
};

function fs_in(path)  { return prefs.in_folder  + path; }
function fs_out(path) { return prefs.out_folder + (path || ''); }
function read_file(path) {
  return fs.readFileSync(path, 'utf8');
}
function source_filepath_to_url(source_filepath) {
  return "/" + (source_filepath.split("/")
  .slice(1, source_filepath.length).join("/")
  .replace(/\.md$/, ""));
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

gulp.task('homepage', function() {
  // Homepage
  gulp
    .src(fs_in("index.html"))


    .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
    .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
    .pipe(minify())

    .pipe(gulp.dest(fs_out()));
});

gulp.task('models', function() {

});

// Blog pages
gulp.task('blog', function() {


  //  Blog listing index page
  gulp
    .src(fs_in("blog/index.html"))
    .pipe(data(function(page_object) {
      // Maybe I should find a Dir.glob equivilant for node..
      var articles_paths = _.flatten(_.map(
        _.map(["2012", "2013", "2014"], function(year) {
          return fs_in("blog/" + year + "/");
        }), function(articles_dir_path) {
          return _.map(fs.readdirSync(articles_dir_path), function(path) {
            return articles_dir_path + path;
          });
        })
      ); 

      page_object.articles = _.map(articles_paths, function(source_filepath) {
        return _.extend(
          yaml_extractor.loadFront(source_filepath),
          { url :  source_filepath_to_url(source_filepath) }
        );
      });

      return page_object;
    }))

    .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
    .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
    
    .pipe(template())
    .pipe(gulp.dest(fs_out('blog')));


  // Blog listing individual pages
  gulp
    .src(fs_in("blog/*/*.md"))
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



gulp.task('watch', function() {
  _.each(
    [
      ["_partials/*", ["homepage", "blog", "models"]],
      ["*", ["homepage"]],
      ["blog/*", ["blog"]],
      ["models/*", ["models"]],
      ["_sass/*", ["assets_folder"]],
      ["_sass/*/*", ["assets_folder"]],
      ["_js/*", ["assets_folder"]]
  ], function(path_tuple) {
    gulp.watch(
      fs_in(path_tuple[0]),
      _.union(path_tuple[1], ["reload"])
    );
  });

});
gulp.task("reload", function() {
  gulp.src("*").pipe(connect.reload());
});
gulp.task('webserver', function() {
  connect.server({
    root: "userbound.com",
    port: 4000,
    livereload: true
  });
});



gulp.task(
  'default', [ 
    'clean', 
    'homepage', 
   'blog', 
   'models',
   'assets_folder', 
    'webserver', 'watch'
]);
