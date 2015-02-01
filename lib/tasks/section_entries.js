module.exports = function(gulp, $, util, mutators, globals) {
  $._.each(globals.site_sections, function(collection_name) {

    gulp.task(collection_name + "_entries", function() {
      return gulp
      .src([util.fs_in(collection_name + "/entries/*.md")])
      .pipe($.fem({ property: 'vars', remove : true }))
      .pipe($.data(util.extract_nav_links))
      .pipe($.markdown())
      .pipe($.data(function(p) { p.vars.yield = p.contents.toString(); }))
      .pipe($.replace(/[\s\S]*/, util.read_file(util.fs_in(collection_name + "/entry_template.html"))))
      .pipe($.data(function install_pagination_links(page_object) {

        var entry_position = null;
        var collection_entries = util.extract_collection_entries(collection_name);

        $._.each(collection_entries, function(entry, i) {
          if (entry.title == page_object.vars.title) { entry_position = i; }
        });

        page_object.vars.previous_entry = entry_position < collection_entries.length ?
          collection_entries[entry_position + 1] : null;
        page_object.vars.next_entry = entry_position > 0 ?
          collection_entries[entry_position - 1] : null;

      }))

      .pipe($.data(function(page_object) {
        if (collection_name == "models") {
          globals.model_image_accumulator.push({ title: page_object.vars.title, image: page_object.vars.image });
          page_object.vars.scad_source = util.read_file(
            util.fs_in( "models/scads/" + page_object.vars.title) + ".scad"
          );
        }
        if (collection_name == "blog") {
          page_object.vars.date = util.date_to_string(page_object.vars.date);
        }
        return page_object.vars;
      }))

      .pipe($.insert.prepend(util.read_file(util.fs_in("_partials/header.html"))))
      .pipe($.insert.append(util.read_file(util.fs_in("_partials/footer.html"))))
      .pipe($.swig())
      .pipe($.rename(function(path) {
        path.dirname += "/" + util.source_filepath_to_url(path.basename);
        path.basename = "index";                                                                                                                       
        return path;
      }))
      .pipe($.dom(function() {    
        return mutators.target_blank_external_links.call(this)
      }))
      .pipe($.dom(function() {
        this.querySelectorAll('html')[0].setAttribute('id', 'section-entry');
        this.querySelectorAll('html')[0].setAttribute('class', collection_name);
        return this;
      }))
      .pipe(gulp.dest(util.fs_out(collection_name)));
    });
  });
}
