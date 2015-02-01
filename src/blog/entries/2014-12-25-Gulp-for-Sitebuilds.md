---
title: Gulp for Sitebuilds
categories: blog
date: 2014-12-25
time: 4:00PM
---

In my ideal world, a static site compiler would just be a script or a very simple set of rules transforming some assets into others.  

So I built myself a filesystem scripting layer for running sequential scripting rules over a set of files and combining them in various ways (e.g. with yaml-headers looking like:

<pre class='sh_yaml'>
page:
  scripts: "markdown"

once_page_is_compiled: 
  prepends:  _partials/header.html
  postpends: _partials/footer.html
  scripts:
    - substitute_head
    - minify_html
</pre>

Then I realized making another site-generator was insane. I just wanted something 'web-agnostic'. I researched and found the collective that made the JavaScript oriented makefile helper of sort. _Gulp_.  It's got a tiny API and its built on a thin layer of node streaminess. 

Cool - _thanks Gulp_.
