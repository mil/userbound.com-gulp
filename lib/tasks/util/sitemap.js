'use strict';
// intended to be run after site compiled
// TODO: break subsection and section_entries generation into individual tasks
//       so that this can be tirggered with proper [] deps from 'default'
module.exports = function(gulp, $, util, mutators, globals) {
  gulp.task('sitemap', function() {

    gulp
      .src(util.fs_out("**/*.html"))
      .pipe($.filter(function(page_object) {
        var fp =
          page_object.path.split($.path.resolve(__dirname, '../../../'))[1];

        return fp.match(/\/(consulting|noncommercial|clients|cv)\//);
      }))
      .pipe($.sitemap({ siteUrl: "http://userbound.com" }))
      .pipe(gulp.dest(util.fs_out()));

  });
}
