'use strict';
module.exports = function($) {
  // Site sections with pagination
  var site_sections =  [ 'blog', 'works', 'interfaces' ];

  // Folder for input and output
  var prefs = {
    in_folder  : "src",
    out_folder : "dist"
  };

  // Create Swig options for partial {% include %}'s to load from proper relative path
  var swig_opts = {
    defaults: {
      cache: false,
      loader: $.swig_vendor.loaders.fs($.path.join(__dirname,"../", prefs.in_folder))
    }
  };

  return {
    model_image_accumulator: [],
    site_sections: site_sections,
    categories: {
      'interfaces': ['web', 'linux', 'physical'],
      'works': ['models', 'music']
    },
    prefs: prefs,
    section_tasks: $._.union(
      $._.map(site_sections, function(section) { return section + "_listing"; }),
      $._.map(site_sections, function(section) { return section + "_entries"; })
    ),
    swig_opts: swig_opts
  };
}
