module.exports = function($, globals) { 
  function activate_subsection_stub(subsection, entry) {
    this.querySelector('.filter-by .active').setAttribute('class', '');
    $._.each(this.querySelectorAll('.filter-by button'), function(button) {
      if (subsection == button.textContent.toLowerCase().replace(" ", "-")) {
        button.setAttribute('class', 'active');
      }
    });
    this.querySelector('.filter-el').setAttribute('class', 'filter-el');
    // ok -- sh_c doesn't need to be in the class list every time
    // but why write extra logic
    this.querySelector('.filter-el[data-category-' + subsection.replace(" ", "-") + ']')
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
 
  return {
    activate_subsection_stub: activate_subsection_stub,
    target_blank_external_links: target_blank_external_links
  }
}
