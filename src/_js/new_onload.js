function smoothScroll(el, to, duration) {
    if (duration < 0) {
        return;
    }
    var difference = to - $(window).scrollTop();
    var perTick = difference / duration * 10;
    this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            smoothScroll(el, to, duration - 10);
        }
    }.bind(this), 10);
}

var undo_stack = [];
var redo_stack = [];


function trigger_state(state) {
  window.history.pushState(null, null, state.href);
  state.cb();
}
function push_state(state) {
  var old_section = current_active_section();
  console.log(old_section);
  undo_stack.push({
    href: window.location.pathname,
    cb:   function() { 
      activate_subsection(old_section); 
    }
  });
  trigger_state(state);
}
function pop_state() {
  if (!undo_stack.length) { window.history.back(); }
  trigger_state(undo_stack[undo_stack.length - 1]);
  undo_stack.pop();
}

function current_active_section() {
  return $(".filter-by button.active").text().toLowerCase();
}

function activate_subsection(subsection) {
  $(".filter-by button").removeClass("active");
  $(".filter-by button").each(function(i, el) {
    if ($(el).text().toLowerCase() == subsection) {
      $(el).addClass("active");
    }
  });

  var out_els = [], in_els = [];
  $(".filter-el").each(function(i, el) { 
    if (
      ($(el).attr("data-category-" + subsection) != null) || 
          (subsection == "all")
    ) { in_els.push(el); } else { out_els.push(el); }
  });

  $("header").after(in_els);
  $(out_els).animate({ opacity: 0 }, function() {
    $(in_els).css("display", "block").animate({ opacity : 1 }, function() {
      $(in_els).addClass("visible");
      $(out_els).removeClass("visible").css("display", "none");
    });
  });
}




var UserboundInterface = (function(my) {
  my.init = function() {
    //$(window).on("unload", function() {});
    $(window).bind("popstate", pop_state);

    $("a").on("click", function(e) {
      if ($(e.target).attr("target") === "_blank") { return; }
        e.preventDefault();
        var new_href = $($(e.target).is("a") ? 
          $(e.target) : $(e.target).closest("a")
         ).attr("href");


      smoothScroll($(window), 0, 100);

      setTimeout(function() {
        
        $("nav").addClass('fade-out');
        $("main").addClass('fade-up');

        setTimeout(function() {
          window.location = new_href;
        }, 1000);
      }, 100);
    });
    
 
    $(".filter-by button").on("click", function(e) {
      var subsection = e.target.innerHTML.toLowerCase()

      e.preventDefault();
      push_state({
        href: "/" + $("h1").text().toLowerCase() + "/" + subsection,
        cb: function() { activate_subsection(subsection); },
      });  
    });

    sh_highlightDocument();
  };

  return my;
})(UserboundInterface || {});


// Page load
$(function($) { UserboundInterface.init(); });
