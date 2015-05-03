'use strict';
module.exports = function($, globals) {
  var util = {
    pp: function(buffer) {
      console.log(JSON.stringify(buffer));
    },
    fs_in: function fs_in(path)  {
      return globals.prefs.in_folder  + "/" + path;
    },
    fs_out: function fs_out(path) {
      return globals.prefs.out_folder + "/" + (path || '');
    },
    read_file: function(path) {
      return $.fs.readFileSync(path, 'utf8');
    },
    source_filepath_to_url: function (source_filepath) {
      var x = /^\d{4}-\d{2}-\d{2}-(.+)(?=\.md)?/.exec(source_filepath);
      return x[1].split(".md")[0];
    },
    date_to_string: function(obj) {
      var months = [
        "January", "February", "March", "April", "May",
        "June", "July", "August", "September",
        "October", "November", "December"
      ];
      return months[obj.getMonth()] + " " + obj.getDate() + ", " + obj.getFullYear();
    }
  };


  util.extract_collection_entries = function(collection) {
    var entries = $._.map(
      $.fs.readdirSync(util.fs_in(collection + "/entries")),
      function(source_filepath) {
        return $._.extend(
          $.yaml_extractor.loadFront(
            util.fs_in(collection + "/entries/" + source_filepath)
          ), {
            url :  [
              "/",
              collection,
              "/",
              util.source_filepath_to_url(source_filepath)
            ].join("")
          }
        );
      }
    ).reverse();

    if (collection == "blog") {
      $._.each(entries, function(e) {
        e.date = util.date_to_string(e.date);
      });
    }

    if (collection == "things" || collection == "interfaces") {
      entries.sort(function(a,b) {
        return a.sort_index - b.sort_index;
      });
    }

    return entries;
  };


  util.extract_nav_links = function(page_object) {
    page_object.vars = page_object.vars || {};

    page_object.vars.build_date = parseInt(new Date().getTime() / 1000);

    $._.extend(
      page_object.vars,
      $.yaml_extractor.loadFront(util.fs_in("_data/nav_links.yaml"))
    );

    var dir_parts = page_object.base.split("/");
    var path = dir_parts.splice(dir_parts.indexOf(globals.prefs.in_folder) + 1);

    page_object.vars.active_title = path[0] != "" ? path[0] : "NONE";
    $._.each( page_object.vars.nav_links, function(l,i) {
      if (l && l.title.toLowerCase() == page_object.vars.active_title) {
        l.active_section = true;
      }
    });

    page_object.vars.page_type = null;
    if (path.indexOf("entries") != -1) {
      page_object.vars.page_type = "entry";
    } else if (page_object.vars.active_section != "NONE") {
      page_object.vars.page_type = "section";
    } else {
      page_object.vars.page_type = "home";
    }
  };

  util.install_templating_vars = function(vars) {
    return function(page_object) {  
      $._.extend(page_object.vars, vars);
      page_object.vars.yield = page_object.contents.toString();
      return page_object.vars;
    }
  };

  return util;
}
