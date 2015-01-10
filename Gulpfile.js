#!/usr/bin/env node
// Require Modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: '*',
  rename: {
    "underscore" : "_",
    "yaml-front-matter": "yaml_extractor",
    "gulp-front-matter" : "fem",
    "gulp-ruby-sass" : "sass"
  }
});

// Require Globals (vars) and Utils (fns)
var globals = require('./lib/globals')($);
var util    = require('./lib/util')($, globals);

// Require Tasks 
$._.each($.fs.readdirSync("./lib/tasks"), function(module) { 
  require('./lib/tasks/' + module)(gulp, util, $, globals); 
});

// Default Task definition
gulp.task('default', $._.union(
  ['clean', 'homepage', 'about'],
  globals.section_tasks,
  [ 'assets_pipeline', 'assets_folder', 'subsection_stubs'],
  [ 'webserver', 'watch']
));
