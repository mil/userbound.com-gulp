/* For Front-End Section */
function get_pager_position() {
  if (window.location.hash == "") { return 0; }
  var position = parseInt(window.location.href.split("#")[1]);
  if (isNaN(position)) { return 0; }

  var pager_end = $(".front-end").children().length - 1;
  if (position >= pager_end) { 
    return pager_end; 
  } else if (position <= 0) {
    return 0;
  }

  return position;
}

function fade_in_element(new_element) {
  var current_active = $(".split.active");
  if ($(new_element).length == 0) { return;  }

  if (current_active.length == 0) {
      $(new_element).addClass('active');
      $(new_element).animate({'opacity' : '1'}, 500, function() {
      });
  } else {
    $(current_active).animate({'opacity' : '0'}, 500, function() {
      $(new_element).addClass('active');
      $(current_active).removeClass('active');

      $(new_element).animate({'opacity' : '1'}, 500, function() {
      });
    });
  }

  $("section.bar.front-end .split").each(function(i, el) {
    if (el == new_element || el == new_element[0]) { 
      window.location.hash = i; 
    }
  });


  $(".pager button.next.hidden").removeClass("hidden");
  if ($(new_element).next().length == 0) {
    $(".pager button.next").addClass("hidden");
  }

  $(".pager button.previous.hidden").removeClass("hidden");
  if ($(new_element).prev().length == 0) {
    $(".pager button.previous").addClass("hidden");
  }



  $(".fade-in").animate({'opacity': '1'}, 800);

}

function front_end_pager() {
  fade_in_element(
    $("section.bar.front-end").children()[get_pager_position()]
  );
    
  // Page Next
  $(".pager .next").on("click", function() {
    if ($(".pager .next").hasClass("hidden")) { return; }
    var current = $(".split.active");
    var next_item = $(current).next();
    fade_in_element(next_item);

  });


  // Page Previous
  $(".pager .previous").on("click", function() {
    if ($(".pager .previous").hasClass("hidden")) { return; }
    var current = $(".split.active");
    var next_item = $(current).prev();
    fade_in_element(next_item);
  });
}

/* For Interfaces Section */
function interfaces_sub_nav() {
  $("nav.subnav a").on("click", function(e) {
    var target_section = ".shortlist#" + $(e.target).text().replace(" ", "-");
   if ($(".shortlist.active").is(target_section)) { return; }

    $(".subnav a.active").removeClass("active");
    $(e.target).addClass("active");


    $(".shortlist.active").animate({'opacity' : '0'}, 500, function() {
      $(".shortlist.active").removeClass('active');
      $(target_section).addClass('active');

      $(target_section).animate({'opacity' : '1'}, 500, function() {
      });
    });
  });
}



$(function($) {
  if ($(".front-end").length > 0) {
    front_end_pager();
  } else {
    $(".fade-in").animate({'opacity': '1'}, 800);
  }
  if ($("nav.subnav").length > 0 ) {
    interfaces_sub_nav();
  }
});
