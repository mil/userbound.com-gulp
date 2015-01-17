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

function update_head_rotation() {
  return;
  var total   = $("body").offset().height / 2;
  var scroll  = $(window).scrollTop();
  var percent = scroll / total;

  var head_min_rotation = 0;
  var head_max_rotation = 20;
  var range = Math.abs(head_max_rotation - head_min_rotation);
  var head_position = Math.max(Math.min(
      head_max_rotation - parseInt(percent * range),
      head_max_rotation
  ), head_min_rotation);

  $(".guy .head").css(
    'transform', 'rotate(' + head_position + 'deg)'
  );
}

function home_animation() {
  if (!$(".home").length) { return; }

  function cb() {

    
    var n = $(".guy").parent().index();
    while (n == $(".guy").parent().index()) {
      n = $(".home a")[parseInt(Math.random()*4)]; 
    }




    $(".guy").animate({
      'margin-top' : "50px",
      'opacity' : 0
    }, {
      duration: 2000,
      complete: function() {

        $(n).prepend($(".guy"));
        $(".guy").animate({
          'margin-top' : "-60px",
          'opacity' : 1
        }, 2000, function() {
          setTimeout(cb, 5000);
        });
      }
    });

  }

  $(".guy").css("position", "absolute");
  $(".guy").css("margin-top", "100px");
  $(".guy").css("display", "inline-block");
  $(".guy").css("width", "18px");
  //setInterval(cb, 2000);
  cb();
 
}


function trigger_state(state) {
  window.history.pushState(null, null, state.href);
  state.cb();
}
function push_state(state) {
  var old_section = current_active_section();
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
  var x = $(".filter-el.visible");

  $(".filter-el.visible").animate({
    opacity: 0
  }, function() {


    var i = $(".filter-el[data-category-" + subsection + "]");

    x.removeClass("visible");
    i.css("opacity", 0).addClass("visible");

    i.animate({
      opacity: 1
    }, function() {});
  });
}


function link_click(e) {
  if ($(e.target).attr("target") === "_blank") { return; }
    e.preventDefault();
    var new_href = $($(e.target).is("a") ? 
      $(e.target) : $(e.target).closest("a")
     ).attr("href");


  smoothScroll($(window), 0, 100);

  setTimeout(function() {
    
    $("nav").addClass('fade-out');
    $("main").addClass('fade-up');

    setTimeout(function() { window.location = new_href; }, 1000);
  }, 100);
}
function filter_click(e) {
  var subsection = e.target.innerHTML.toLowerCase()

  // Models follows a different schema since its only subpage with stubs
  var new_href = (window.location.href.match("/models")) ?
    "/models/" + $("h1").text() + "/" + subsection :
    "/" + $("h1").text().toLowerCase() + "/" + subsection; 

  e.preventDefault();
  push_state({
    href: new_href,
    cb: function() { activate_subsection(subsection); },
  });  
}


var UserboundInterface = (function(my) {
  my.init = function() {
    //$(window).on("unload", function() {});
    $(window).on("popstate", pop_state);
    $(window).on("scroll", update_head_rotation);
    $("a").on("click", link_click);
    $(".filter-by button").on("click", filter_click);
    $("img[data-category-model]").on("click", function() {
      $($(".filter-by button")[1]).click();
    });

    update_head_rotation();
    //home_animation();
    sh_highlightDocument();
  };

  return my;
})(UserboundInterface || {});

// Page load
$(function($) { UserboundInterface.init(); });
