#!/usr/bin/env node
'use strict';

// Require Modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: '*',
  rename: {
    'autoprefixer-core': 'autoprefixer',
    'browserify': 'browserify',
    'fs-readdir-recursive': 'recursive_readdir',
    'gulp-front-matter': 'fem',
    'gulp-sass': 'sass',
    'swig': 'swig_vendor',
    'vinyl-transform': 'transform',
    'underscore': '_',
    'yaml-front-matter': 'yaml_extractor'
  }
});

// Require Globals (vars) and Utils (fns)
var globals = require('./lib/globals')($);
var util = require('./lib/util')($, globals);
var mutators = require('./lib/mutators')($, globals);

// Require Tasks
$._.each($.recursive_readdir('./lib/tasks'), function(module) {
  require('./lib/tasks/' + module)(gulp, $, util, mutators, globals);
});
