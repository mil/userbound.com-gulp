---
title: Gulp for Sitebuilds
categories: blog
date: 2014-12-25
time: 4:00PM
---

[Gulp](http://gulpjs.com), is a tiny library of utility functions (`src`, `dest`, `task`, and `watch`) that plug and play nicely with node streams.  As such, if your a stream fan, or simply have ever used Unix pipes, Gulp will make you feel right at home while helping you to architect sitebuilds.

As far as `Gulpfile`'s go, structure your tasks, or task-generating logic however you wish.  What I found to work for me on the sitebuild for [userbound.com](http://userbound.com) was to break my logic into small `exports`-style modules and let [my Gulpfile](https://github.com/mil/userbound.com-gulp/blob/master/Gulpfile.js) play the role of master `require`-er:

<pre data-language='javascript'>
#!/usr/bin/env node
'use strict';
// Require Modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: '*',
  rename: {
    'underscore': '_',
    'yaml-front-matter': 'yaml_extractor',
    'gulp-front-matter': 'fem',
    'gulp-ruby-sass': 'sass'
  }
});

// Require Globals (vars) and Utils (fns)
var globals = require('./lib/globals')($);
var util    = require('./lib/util')($, globals);
var mutators = require('./lib/mutators')($, globals);

// Require Tasks 
$._.each($.fs.readdirSync('./lib/tasks'), function(module) { 
  require('./lib/tasks/' + module)(gulp, $, util, mutators, globals); 
});
</pre>

This way, I keep my tasks nice, small, and discrete.  [Jekyll](http://jekyllrb.com) for sitebuilds always felt like a hack; but [Gulp](http://gulpjs.com) for sitebuilds feels great.

_Thanks Gulp_.
