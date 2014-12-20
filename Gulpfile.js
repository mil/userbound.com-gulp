#!/usr/bin/env node
var _              = require('underscore');
var rimraf         = require('rimraf');
var fs             = require('fs');
var gulp           = require('gulp');
var replace        = require('gulp-replace');
var data           = require('gulp-data');
var uglify         = require('gulp-uglify');
var wrap           = require('gulp-wrap');
var sass           = require('gulp-ruby-sass');
var markdown       = require('gulp-markdown');
var fem            = require('gulp-front-matter');
var mustache       = require('gulp-mustache');
var vartree        = require('gulp-vartree');
var template       = require('gulp-template');
var ejs            = require('gulp-ejs');
var consolidate    = require('gulp-consolidate');
var insert         = require('gulp-insert');
var concat         = require('gulp-concat');
var rename         = require('gulp-rename');
var minify         = require('gulp-minify');
var connect        = require('gulp-connect');
var yaml_extractor = require('yaml-front-matter');

var prefs = {
  in_folder  : "userbound.com_src/",
  out_folder : "userbound.com/"
};
var image_accumulator = [];

function fs_in(path)  { return prefs.in_folder  + path; }
function fs_out(path) { return prefs.out_folder + (path || ''); }
function read_file(path) {
  return fs.readFileSync(path, 'utf8');
}
function source_filepath_to_url(source_filepath) {
  var x = /^\d{4}-\d{2}-\d{2}-(.+)(?=\.md)?/.exec(source_filepath);

  // ... until i can get my regex to cooperate
  return x[1].split(".md")[0];
}

function extract_top_nav_links(page_object) {
  page_object.top_nav_links = yaml_extractor.loadFront(
    fs_in("_data/top_nav_links.yaml")
  ).top_nav_links;
  return page_object;
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


_.each(['models', 'blog', 'poems'], function(collection_name) {
  // Blog pages
  gulp.task(collection_name, function() { 

    //  Blog listing index page
    gulp
      .src(fs_in(collection_name + "/index.html"))
      .pipe(data(extract_top_nav_links))
      .pipe(data(function(page_object) {

        page_object.entries = _.map(
          fs.readdirSync(fs_in(collection_name + "/entries")), 
          function(source_filepath) {

            return _.extend(
              yaml_extractor.loadFront(fs_in(collection_name + "/entries/" + source_filepath)),
              { url :  source_filepath_to_url(source_filepath) }
            );
          }
        ).reverse();

        page_object.fem = {};
        page_object.fem.title = 
          collection_name.charAt(0).toUpperCase() +
          collection_name.slice(1);
        return page_object;
      }))
      
      .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
      .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
      .pipe(template())

      .pipe(gulp.dest(fs_out(collection_name)));



    return gulp
      .src(fs_in(collection_name + "/entries/*.md"))
      .pipe(data(extract_top_nav_links))

      // Extract FEM into page.fem
      .pipe(fem({ property: 'fem', remove : true }))
      .pipe(markdown())

      // Transform page stream into template file
      // Put page markdown into buffer 'page.stored_content' temporarily
      .pipe(data(function(page) { 
        page.yield = page.contents; 
        return page; 
      }))
      .pipe(replace(
        /[\s\S]*/, 
        read_file(fs_in(collection_name + "/entry_template.html"))
      ))

      // Load data return with FEM and page (HTML)-post-content
      .pipe(data(function(d) {

        // Create array for looping models
        if (collection_name == "models") {
          image_accumulator.push({ title: d.fem.title, image: d.fem.image });
        }
        d.top_nav_links = yaml_extractor.loadFront(
          fs_in("_data/top_nav_links.yaml")
        ).top_nav_links;


        return d;
      }))





      // Wrap page template in header & footer
      .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
      .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
      .pipe(template())

      .pipe(rename(function(path) {
        path.dirname += "/" + source_filepath_to_url(path.basename);
        path.basename = "index";
      }))
      .pipe(gulp.dest(fs_out(collection_name)));
    });



});

// Rename each model image with same title .png, etc...
gulp.task('model_images', ['models'], function() {
  _.each(image_accumulator, function(val) {
    gulp
    .src(fs_in("models/images/" + val.image))
    .pipe(rename(function(path) {
      path.basename  = val.title;
    }))
    .pipe(gulp.dest(fs_out("models")));
  });
});



gulp.task('watch', function() {
  _.each(
    [
      ["_partials/*", ["homepage", "blog", "models"]],
      ["*", ["homepage"]],
      ["blog/*", ["blog"]],
      ["models/*", ["models"]],
      ["poems/*", ["poems"]],
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
   'model_images',
   'poems',
   'assets_folder', 
    'webserver', 'watch'
]);
