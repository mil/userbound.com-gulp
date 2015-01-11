module.exports = function($) {
  var site_sections =  [ 'blog', 'models', 'interfaces', 'things' ];
  return {
    model_image_accumulator: [],
    site_sections: site_sections,
    prefs: { 
      in_folder  : "src", 
      out_folder : "dist" 
    },
    section_tasks: $._.union(
      $._.map(site_sections, function(section) { return section + "_listing"; }),
      $._.map(site_sections, function(section) { return section + "_entries"; })
    )
  };
}
