---
title: A Map Function for Sass
categories: blog
date: 2015-05-09
time: 3:27PM
footnotes:
    - Luckily however Sass has <a href="http://sass-lang.com/documentation/">excellent documentation</a>, so when search fails, that's a great place to start.
    - Since you can't pass functions as parameters in Sass; in my implementation I use <code>call</code> to accomplish the same effect. The downside is that the function name has to be passed to the final <code>map_function</code> quoted.
    - A map function, given a list and a function name, returns a new list containing the function called against each entry.  For primer on what a map function is.. further than this baseline explanation, refer <a href="http://en.wikipedia.org/wiki/Map_%28higher-order_function%29">here</a>.
---
[Sass](http://sass-lang.com/) doesn't have a built in <code>map</code> function for lists and furthermore online searches on the subject will yield you tons of information about Sass <i>maps</i>... and next to nothing about how to make a <i>map function</i> in Sass<sup>1</sup>.

So here a basic implementation<sup>2</sup> I worked out for a simple map function in Sass<sup>3</sup>:

<pre class='sh_c'>
@function map_function($list, $function_name)
  $return_list: ()

  @for $index from 1 through length($list)
    $call_result: call($function_name, nth($list, $index))
    $return_list: append($return_list, $call_result)

  @return $return_list
</pre>

And for those of you who like all those extra curly brackets, the SCSS equivalent is:

<pre class='sh_c'>
@function map_function($list, $function_name) {
  $return_list: ();
  @for $index from 1 through length($list) {
    $call_result: call($function_name, nth($list, $index));
    $return_list: append($return_list, $call_result);
  }
  @return $return_list;
}
</pre>
