module.exports = function(gulp, $, util, mutators, globals) {
  $._.each(globals.site_sections, function(collection_name) {
    gulp.task(collection_name + "_listing", function() {                                                             
      return gulp
      .src(util.fs_in(collection_name + "/index.html"))
      .pipe($.data(util.extract_nav_links))
      .pipe($.data(function(page_object) {
        page_object.vars.title =
          collection_name.charAt(0).toUpperCase() +
            collection_name.slice(1);
        page_object.vars.entries = util.extract_collection_entries(collection_name);

        if (collection_name == "interfaces") {
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
        }

        return page_object.vars;
      }))
      .pipe($.insert.prepend(util.read_file(util.fs_in("_partials/header.html"))))
      .pipe($.insert.append(util.read_file(util.fs_in("_partials/footer.html"))))
      .pipe($.swig())
      .pipe(gulp.dest(util.fs_out(collection_name)));
    });
  });
}
