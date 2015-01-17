function pp_model() {
  function spaces(number) {
    var sp = "";
    for (var i = 0; i < number; i++) {
      sp = sp + " ";
    }
    return sp;
  }
  function recurse_obj(obj, depth) {
    var ret = spaces(depth) + "{";

    depth += 2;
    var number_of_keys = 0;
    for (key in obj) { number_of_keys++; }

    var i = 0;
    for (key in obj) {
      ret += "\n" + spaces(depth) + key + " : ";
      ret += (typeof obj[key] == "object") ? 
        recurse_obj(obj[key], depth) : obj[key];
      i++; if (i < number_of_keys) { ret += ","; }
    }

    depth -= 2
    ret += "\n" + spaces(depth) + "}";
    return ret;
  }

  return recurse_obj(todo_model, 0);
}
$(function() {
  $("section#demo h3").on("click", function(ev) {
    if (!$(ev.target).hasClass('active')) {
      $("section#demo h3.active").removeClass('active');
      $("section#demo section#switcher section.active").removeClass('active');

      var new_tab = $(ev.target).attr('class');
      if (new_tab == 'model') {
        $("section.model").html("<pre class='sh_javascript'>" + pp_model() + "</pre>");
        sh_highlightDocument();
      }

      $("section#demo h3." + new_tab).addClass('active');
      $("section#demo section#switcher section." + new_tab).addClass('active');
    }
  });
});
