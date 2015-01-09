#!/usr/bin/env node
var _              = require('underscore');
var fs             = require('fs');
var gulp           = require('gulp');
var rimraf         = require('rimraf');
var yaml_extractor = require('yaml-front-matter');

var replace        = require('gulp-replace');
var concat         = require('gulp-concat');
var connect        = require('gulp-connect');
var data           = require('gulp-data');
var dom            = require('gulp-dom');
var fem            = require('gulp-front-matter');
var insert         = require('gulp-insert');
var markdown       = require('gulp-markdown');
var minify         = require('gulp-minify');
var rename         = require('gulp-rename');
var sass           = require('gulp-ruby-sass');
var swig           = require('gulp-swig');
var uglify         = require('gulp-uglify');

var model_image_accumulator = [];
var site_sections           = [ 'blog', 'models', 'interfaces', 'objects' ];
var prefs                   = { in_folder  : "src", out_folder : "userbound.com" };
var section_tasks           = _.union(
  _.map(site_sections, function(section) { return section + "_listing"; }),
  _.map(site_sections, function(section) { return section + "_entries"; })
);

function pp(buffer) { console.log(JSON.stringify(buffer)); }
function fs_in(path)  { return prefs.in_folder  + "/" + path; }
function fs_out(path) { return prefs.out_folder + "/" + (path || ''); }
function read_file(path) { return fs.readFileSync(path, 'utf8'); }
function source_filepath_to_url(source_filepath) {
  var x = /^\d{4}-\d{2}-\d{2}-(.+)(?=\.md)?/.exec(source_filepath);
  // ... until i can get my regex to cooperate
  return x[1].split(".md")[0];
}
function date_to_string(obj) {
  var months = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September",
    "October", "November", "December"
  ];
  return months[obj.getMonth()] + " " + obj.getDate() + ", " + obj.getFullYear();
}





var DomMutators = {};
DomMutators.external_href_blank_as_target_blank = function() {
  // well marked is no longer maintained, so semi-dirty, but alright
  _.each(this.querySelectorAll('a'), function(link) {
    if (link.getAttribute('href').match(/^http:\/\//) !== null) {
      link.setAttribute('target', '_blank');
    }
  });
  return this;
}
DomMutators.activate_subsection = function(section) {
  this.querySelector('.filter-by .active').setAttribute('class', '');
  _.each(this.querySelectorAll('.filter-by button'), function(button) {
    if (section == button.textContent.toLowerCase()) {
      button.setAttribute('class', 'active');
    }
  });
  this.querySelector('.filter-el').setAttribute('class', 'filter-el');
  this.querySelector('.filter-el[data-category-' + section + ']')
  .setAttribute('class', 'filter-el visible');
  return this;
}



//
//
// For Collection Entries
function extract_collection_entries(collection) {
  var entries = _.map(fs.readdirSync(fs_in(collection + "/entries")), 
    function(source_filepath) { return _.extend(
        yaml_extractor.loadFront(fs_in(
          collection + "/entries/" + source_filepath
        )), { url :  "/" + collection + "/" + source_filepath_to_url(source_filepath) }
    ); }
  ).reverse();


  if (collection == "blog") {
    _.each(entries, function(e) {
      e.date = date_to_string(e.date);
    });
  }

  return entries;
}






//
//
// Gulp Data Functions
function extract_nav_links(page_object) {
  page_object.vars = page_object.vars || {};


  page_object.vars.nav_links = yaml_extractor.loadFront(
    fs_in("_data/nav_links.yaml")
  ).nav_links;


  var dir_parts = page_object.base.split("/");
  var path      = dir_parts.splice(dir_parts.indexOf(prefs.in_folder) + 1);


  page_object.vars.active_title = path[0] != "" ? path[0] : "NONE";
  _.each( page_object.vars.nav_links, function(l,i) {
    if (l && l.title.toLowerCase() == page_object.vars.active_title) {
      l.active_section = true;
      //page_object.vars.active_section = l;
      //page_object.vars.top_nav_links.splice(i, 1);
    }
  });


  // 'entry', 'section', or 'home'
  page_object.vars.page_type = null;
  if (path.indexOf("entries") != -1) {
    page_object.vars.page_type = "entry";
  } else if (page_object.vars.active_section != "NONE") {
    page_object.vars.page_type = "section";
  } else {
    page_object.vars.page_type = "home";
  }
}


//
//
// Tasks
gulp.task('clean', function() { rimraf.sync(fs_out()); });




// Homepage
gulp.task('about', function() {
  return gulp
    .src(fs_in("about/index.html"))
    .pipe(data(extract_nav_links))

    .pipe(data(function(page_object) {
      page_object.vars.title = "About";
      return page_object.vars;
    }))

    .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
    .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
    .pipe(swig())
    .pipe(gulp.dest(fs_out("about")));
});

gulp.task('assets_folder', function() {
  gulp
    .src(
      _.map([
            //'FancyZoomHTML.js',
            //'FancyZoom.js',
            'sh_main.js',
            'zepto.min.js',
            'zepto.fx.js',
            //'onload.js',
            'new_onload.js'
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
gulp.task('assets_pipeline', ['models_entries'], function() {
  _.each(model_image_accumulator, function(val) {
    gulp
    .src(fs_in("models/images/" + val.image))
    .pipe(rename(function(path) {
      path.basename  = val.title;
    }))
    .pipe(gulp.dest(fs_out("models")));
  });


  _.each([
      ["assets/images/*", "assets/images"],
      ["assets/ttf/*", "assets/ttf"],
      ["models/scads/*", "models"],
      ["objects/images/*/*",  "objects"],
      ["blog/images/*/*",  "blog"],
      ["interfaces/images/*/*", "interfaces"],
      ["interfaces/demos/**/*", "interfaces"] 
  ], function(source_dest_tuple,i) {
    gulp
      .src(fs_in(source_dest_tuple[0]))
      .pipe(gulp.dest(fs_out(source_dest_tuple[1])));
  });

});
gulp.task('homepage', function() {
// Homepage
  gulp
    .src(fs_in("index.html"))
    .pipe(data(extract_nav_links))
    .pipe(data(function(page_object) {
      page_object.vars.title = "Userbound";
      return page_object.vars;
    }))


    .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
    .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))


    .pipe(swig())
    .pipe(gulp.dest(fs_out()));
});
gulp.task('watch', function() {
  _.each(_.union(
    [
      ["_partials/*", _.union(['homepage'], site_sections)],
      ["*", ["homepage"]],
      ["about/*", ["about"]],
      ["_sass/*", ["assets_folder"]],
      ["_sass/*/*", ["assets_folder"]],
      ["_js/*", ["assets_folder"]]
    ],
    _.map(section_tasks, function(section) {
      return [section.split("_")[0] + "/*", [section]];
    }),
    _.map(section_tasks, function(section) {
      return [section.split("_")[0] + "/*/*", [section]];
    })
  ), function(path_tuple) {
    gulp.watch(
      fs_in(path_tuple[0]),
      _.union(path_tuple[1], ["reload"])
    );
  });
});
gulp.task("reload", _.union(
  section_tasks, ['assets_pipeline', 'assets_folder']), function() {
  gulp.src("*").pipe(connect.reload());
});
gulp.task('webserver', function() {
  connect.server({
    root: "userbound.com",
    port: 4000,
    livereload: true
  });
});
_.each(site_sections, function(collection_name) {
  var collection_entries = extract_collection_entries(collection_name);
    
  // Collection listing
  gulp.task(collection_name + "_listing", function() { 
    return gulp
      .src(fs_in(collection_name + "/index.html"))
      .pipe(data(extract_nav_links))
      .pipe(data(function(page_object) {
          page_object.vars.title = 
            collection_name.charAt(0).toUpperCase() +
            collection_name.slice(1);
          page_object.vars.entries = collection_entries;

          if (collection_name == "interfaces") {
            page_object.vars.categories = {};

            _.each( page_object.vars.entries, function(entry) {
              if (!page_object.vars.categories[entry.category]) {
                page_object.vars.categories[entry.category] = [];
              }
              page_object.vars.categories[entry.category].push(entry);
            });

            _.each(page_object.vars.categories, function(entries,key) {
              page_object.vars.categories[key] = entries.sort(function(a,b) {
                return a.sort_index - b.sort_index;
              });
            });

          }

          return page_object.vars;
      }))      
      .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
      .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
      .pipe(swig())
      .pipe(gulp.dest(fs_out(collection_name)));
  });

  // Collection entries
  gulp.task(collection_name + "_entries", function() { 
    return gulp
      .src([fs_in(collection_name + "/entries/*.md")])
      .pipe(fem({ property: 'vars', remove : true }))
      .pipe(data(extract_nav_links))
      .pipe(markdown())
      // Content is stored in 'yield' template vars property
      .pipe(data(function(p) { p.vars.yield = p.contents.toString(); }))
      // Replace content with template itself
      .pipe(replace(/[\s\S]*/, read_file(fs_in(collection_name + "/entry_template.html"))))
      // Install pagination links
      .pipe(data(function install_pagination_links(page_object) {   
        var entry_position = null;
        _.each(collection_entries, function(entry, i) {
          if (entry.title == page_object.vars.title) { entry_position = i; }
        });
        
        page_object.vars.next_entry = entry_position < collection_entries.length ?
          collection_entries[entry_position + 1] : null;
        page_object.vars.previous_entry = entry_position > 0 ?
          collection_entries[entry_position - 1] : null; 
      }))

      // Preparing special cases --
      .pipe(data(function(page_object) {
        if (collection_name == "models") {
          model_image_accumulator.push({ title: page_object.vars.title, image: page_object.vars.image });
          page_object.vars.scad_source = read_file(
            fs_in( "models/scads/" + page_object.vars.title) + ".scad"
          );
        } 
        if (collection_name == "blog") {
          page_object.vars.date = date_to_string(page_object.vars.date);
        }
        return page_object.vars;
      }))

      //// Wrap page template in header & footer
      .pipe(insert.prepend(read_file(fs_in("_partials/header.html"))))
      .pipe(insert.append(read_file(fs_in("_partials/footer.html"))))
      .pipe(swig())
      .pipe(rename(function(path) {
        path.dirname += "/" + source_filepath_to_url(path.basename);
        path.basename = "index";
        return path;
      }))
      .pipe(dom(DomMutators.external_href_blank_as_target_blank))
      .pipe(gulp.dest(function(p) {
        return fs_out(collection_name);
      }));
    });
});
// Activate subsections as they would be activated through 
// javascript -- this way there are subsections stubs (e.g. about/music/) 
// correlated to js fade in/out router yet site can still be used JS-free
gulp.task('site_subsection_stubs', ['about', 'interfaces_entries'], function() {
  var pages_subsections = [
    { section_name : 'about', sub_sections : ['general', 'tech', 'music', 'quotes'] },
    { section_name : 'interfaces', sub_sections : ['linux', 'web'] }
  ];

  _.each(pages_subsections, function(obj) {
    _.each(obj.sub_sections, function(subsection) {
      gulp
        .src(fs_out("/" + obj.section_name + "/index.html"))
        .pipe(dom(function() { return DomMutators.activate_subsection.call(this, subsection); }))
        .pipe(gulp.dest(fs_out("/" + obj.section_name + "/" + subsection)));
    });
  });
});




gulp.task('default', _.union(
  ['clean', 'homepage', 'about'],
  section_tasks,
  [ 'assets_pipeline', 'assets_folder', 'site_subsection_stubs'],
  [ 'webserver', 'watch']
));

