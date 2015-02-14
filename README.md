userbound.com-gulp
==================

_(for those who are interested)_

I've decided to re-architect my site around using Gulp. All the pre-compiled content (Templates, content, sass, images, etc...) lives within the `src/` folder. When `gulp` is run, the `dist/` folder is generated.

My `Gulpfile.js` is very small because my logic is spread out between many small `module.exports`-style modules which are `require`'d in the `Gulpfile.js`.  All `.js` files within `lib/tasks` are automatically `required`. All plugins are `require`'d automatically courtsty of `gulp-load-plugins` underneath the `$` variable

## The `lib/` folder
- `lib/util.js` - Various utility functions used in multiple tasks
- `lib/globals.js` - Defined globals to be used between modules
- `lib/mutators.js` - `gulp-dom` mutator functions used in multiple tasks
- `lib/tasks/*.js` - The tasks within `lib/tasks` should be pretty self-explanatory. I'm using `swig` + `yaml-front-matter` for templating. `markdown` for page posts. And various other things. Please dig in to understand, my biggest module is 67 lines.

## Compiling the Site
Running `gulp` compiles the `src` folder into a `dest` folder.

## Running Tests
I've implemented tests for W3C HTML validation of all the pages.  The `tests` task runs against all the html files in `dist/`. As such, you should run `gulp tests` after everything is compiled (e.g. default task is complete).

Hope this helps out if your trying to write a more maintainable Gulpfile! 
;)
