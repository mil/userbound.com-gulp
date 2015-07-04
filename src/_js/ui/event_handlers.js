console.log('run');
'use strict';
window.UserboundInterface = (function(self) {
  function link_click(e) {
    var target_link = $(e.target).is("a") ? e.target : $(e.target).closest("a");
    if ($(target_link).attr("target") === "_blank") { return; }
    if ($(target_link).attr("href").match(/^mailto\:/)) { return; }
    if ($(target_link).attr("href") === 'false') { return; }
    if ($(target_link).attr("href") === "#") { return; }
    if ($(target_link).parent().is(".controls")) { return; }

    e.preventDefault();
    var current_section = window.location.href.replace(/^.*\/\/[^\/]+/, '').split('/')[1];
    var href = $(target_link).attr('href');
    if (!href.match(current_section)) { $("nav a.active").removeClass("active"); }
    self.util.fade_up_out(href);
  }

  function subsection_button_click(e) {
    var subsection = e.target.innerHTML.toLowerCase();

    // Models follows a different schema since its only subpage with stubs
    self.globals.router.navigate(
      window.location.href.match(/\/works\/(?!music|print|mixtapes).+/) ?
        "/works/" + self.util.trim($("h1").text()) + "/" + subsection.replace(" ", "-") :
        "/" + $("h1").text().toLowerCase() + "/" + subsection.replace(" ", "-")
      );
  }

  function install_dom_event_bindings() {
    // Setup click callbacks for links and subsection clicking
    $("a").on("click", link_click);
    $(".filter-by button").on("click", subsection_button_click);
    $("img[data-category-model]").on("click", function() {$($(".filter-by button")[1]).click()});
  }

  return $.extend(self, {
    install_dom_event_bindings: install_dom_event_bindings
  });
})(window.UserboundInterface || {});
