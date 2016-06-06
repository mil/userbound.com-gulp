'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  $._.each(globals.site_sections, function(collection_name) {


    gulp.task(collection_name + "_listing", function() {
      var layout = collection_name + "_listing";

      return gulp
        .src(util.fs_in(collection_name + "/index.html"))
        .pipe($.data(util.extract_nav_links))
        .pipe($.data(function(p) { p.vars.yield = p.contents.toString(); }))
        .pipe($.data(util.install_templating_vars({
          title:
            collection_name.charAt(0).toUpperCase() + collection_name.slice(1),
          entries: util.extract_collection_entries(collection_name),
          path: collection_name
        })))

        // Install categories for interfaces/shit
        .pipe($.data(function(page_object) {
          //if (collection_name !== "interfaces") { return; }

          page_object.vars.categories = {};
          $._.each( page_object.vars.entries, function(entry) {
            if (!page_object.vars.categories[entry.category]) {
              page_object.vars.categories[entry.category] = [];
            }
            page_object.vars.categories[entry.category].push(entry);
          });

          $._.each(page_object.vars.categories, function(entries,key) {
            page_object.vars.categories[key] = entries.sort(function(a,b) {
              return a.sort_index - b.sort_index;
            });
          });

          var x = {};
          if (collection_name === "interfaces") {
            x.web = page_object.vars.categories.web;
            x.physical= page_object.vars.categories.physical;
            x.linux = page_object.vars.categories.linux;
          } else if (collection_name === "works") {
            x.cad = page_object.vars.categories.cad;
            x.music = page_object.vars.categories.music;
          }
          page_object.vars.categories = x;

          return page_object.vars;
        }))

        // Install blog category for blog
        .pipe($.data(function(page_object) {
          if (collection_name !== "blog") { return; }
          page_object.vars.categories = {};
          page_object.vars.categories.blog = page_object.vars.entries;
          return page_object.vars;
        }))

        .pipe($.replace(/[\s\S]*/,  util.read_file(
          util.fs_in("_layouts/" + layout + ".html")
        )))
        .pipe($.swig(globals.swig_opts))
        .pipe(gulp.dest(util.fs_out(collection_name)))
        .pipe(gulp.dest(collection_name === "blog" ? util.fs_out() : util.fs_out(collection_name)));
      });

  });
}
