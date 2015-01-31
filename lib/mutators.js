module.exports = function($, globals) { 
  function activate_subsection_stub(subsection, entry) {
    this.querySelector('.filter-by .active').setAttribute('class', '');
    $._.each(this.querySelectorAll('.filter-by button'), function(button) {
      if (subsection == button.textContent.toLowerCase()) {
        button.setAttribute('class', 'active');
      }
    });
    this.querySelector('.filter-el').setAttribute('class', 'filter-el');
    // ok -- sh_c doesn't need to be in the class list every time
    // but why write extra logic
    this.querySelector('.filter-el[data-category-' + subsection + ']')
    .setAttribute('class', 'filter-el sh_c visible'); 
    return this;
  };
  function target_blank_external_links() {
    $._.each(this.querySelectorAll('a'), function(link) {
      if (link.getAttribute('href').match(/^https?:\/\//)) {
        link.setAttribute('target', '_blank');
      }
    });
    return this;
  };
  function replace_validation_href(path) {
    var w3c_url = "http://validator.w3.org/check?uri=";
    var domain_root = "http://userbound.com/re/";
    $._.each(this.querySelectorAll('footer a.validate'), function(link) {
      var url = [w3c_url, domain_root, path].join("");
      link.setAttribute('href', url);
    });
    return this;
  }
  
  return {
    activate_subsection_stub: activate_subsection_stub,
    target_blank_external_links: target_blank_external_links,
    replace_validation_href: replace_validation_href
  }
}
