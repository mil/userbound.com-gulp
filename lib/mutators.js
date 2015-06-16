'use strict';
module.exports = function($, globals) { 
  function activate_subsection_stub(subsection, entry) {
    this.querySelector('.filter-by .active').setAttribute('class', '');
    $._.each(this.querySelectorAll('.filter-by button'), function(button) {
      if (subsection == button.textContent.toLowerCase().replace(" ", "-")) {
        button.setAttribute('class', 'active');
      }
    });

    if (this.querySelectorAll('.filter-el').length == 0) { return; }

    $._.each(this.querySelectorAll('.filter-el'), function(el) {
      var classes = el.getAttribute('class');
      if (el.getAttribute('data-category-' + subsection.replace(" ", "-")) == null) {
        classes = classes.replace("visible", "");
      } else {
        if (!classes.match("visible")) {
          classes = classes + " visible";
        }
      }
      el.setAttribute('class', classes);
    });

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
