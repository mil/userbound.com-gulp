'use strict';
module.exports = function(gulp, $, util, mutators, globals) {
  $._.each(globals.site_sections, function(collection_name) {
    var layout = collection_name + "_entry";


    gulp.task(collection_name + "_entries", function() {
      return gulp
        .src([util.fs_in(collection_name + "/entries/*.md")])
        .pipe($.fem({ property: 'vars', remove : true }))
        .pipe($.data(util.extract_nav_links))
        .pipe($.markdown())
        .pipe($.data(util.install_templating_vars({
          collection_name: collection_name,
          page_layout: layout
        })))
        .pipe($.data(function install_path(page_object) {
          page_object.vars.path = [
            collection_name,
            "/",
            util.source_filepath_to_url(
              page_object.history[1].split('/').pop()
            ).split(".html")[0]
          ].join("");
          return page_object.vars;
        }))

        // 1. Installs pagination links
        .pipe($.data(function install_pagination_links(page_object) {
          var entry_position = null;
          var collection_entries =
            util.extract_collection_entries(collection_name);

          // Only pagination print entries for work/print entries
          var is_cad = (page_object.vars.category === 'cad');
          if (is_cad) {
            collection_entries = $._.filter(collection_entries, function(entry, i) {
              return entry.category === 'cad';
            });
          }

          $._.each(collection_entries, function(entry, i) {
            if (entry.title == page_object.vars.title) { entry_position = i; }
          });

          page_object.vars.previous_entry =
            entry_position < collection_entries.length ?
            collection_entries[entry_position + 1] : null;
          page_object.vars.next_entry = entry_position > 0 ?
            collection_entries[entry_position - 1] : null;
          return page_object.vars;
        }))

        // 2. Installs filter btns for models section
        .pipe($.data(function(page_object) {
          if (collection_name !== "works") { return; }

          page_object.vars.scad_source = util.read_file(
            util.fs_in( "works/scads/" + page_object.vars.title) + ".scad"
          );
          page_object.vars.filter_btns = [ "Model", "Code" ];
          return page_object.vars;

        }))

        // 3. Installs date and decription for blog section
        .pipe($.data(function(page_object) {
          if (collection_name !== "blog") { return; }

          page_object.vars.date = util.date_to_string(page_object.vars.date);
          page_object.vars.description = [
            page_object.vars.date,
            page_object.vars.time
          ].join(" at ");
          return page_object.vars;
        }))


        .pipe($.replace(/[\s\S]*/,  util.read_file(
          util.fs_in("_layouts/" + layout + ".html")
        )))
        .pipe($.swig(globals.swig_opts))
        .pipe($.rename(function(path) {
          path.dirname += "/" + util.source_filepath_to_url(path.basename);
          path.basename = "index";
          return path;
        }))
        .pipe($.dom(function() {
          return mutators.target_blank_external_links.call(this)
        }))
        .pipe(gulp.dest(util.fs_out(collection_name)));

    });
  });
}
