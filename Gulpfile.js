#!/usr/bin/env node
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

// Default Task definition
gulp.task('default', $._.union(
  ['clean', 'homepage', 'about', 'clients'],
  globals.section_tasks,
  [ 'assets_pipeline', 'assets_folder', 'subsection_stubs', 'models_stubs', 'consulting_stubs'],
  [ 'webserver', 'watch']
));
