'use strict';

module.exports = function($, util, router) {
  function link_click(e) {
    var target_link = $.z(e.target).is("a") ? e.target : $.z(e.target).closest("a");
    if ($.z(target_link).attr("target") === "_blank") { return; }
    if ($.z(target_link).attr("href").match(/^mailto\:/)) { return; }
    if ($.z(target_link).attr("href") === 'false') { return; }
    if ($.z(target_link).attr("href") === "#") { return; }
    if ($.z(target_link).parent().is(".controls")) { return; }

    e.preventDefault();
    var current_section = window.location.href.replace(/^.*\/\/[^\/]+/, '').split('/')[1];
    var href = $.z(target_link).attr('href');
    if (!href.match(current_section)) { $.z("nav a.active").removeClass("active"); }
    util.fade_up_out(href);
  }

  function subsection_button_click(e) {
    var subsection = e.target.innerHTML.toLowerCase();

    // Models follows a different schema since its only subpage with stubs
    router.navigate(
      window.location.href.match(/\/works\/(?!music|print|mixtapes).+/) ?
        "/works/" + util.trim($.z("h1").text()) + "/" + subsection.replace(" ", "-") :
        "/" + $.z("h1").text().toLowerCase() + "/" + subsection.replace(" ", "-")
      );
  }

  function install_dom_event_bindings() {
    // Setup click callbacks for links and subsection clicking
    $.z("a").on("click", link_click);
    $.z(".filter-by button").on("click", subsection_button_click);
    $.z("img[data-category-model]").on("click", function() {$.z($.z(".filter-by button")[1]).click()});
  }

  return {
    install_dom_event_bindings: install_dom_event_bindings
  };
}
