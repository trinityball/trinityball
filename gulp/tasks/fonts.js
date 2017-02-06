'use strict';
const gulp = require('gulp');
const size = require('gulp-size');

gulp.task('fonts:semantic', () =>
  gulp.src('src/assets/stylesheets/**/*')
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    .pipe(size({title: 'semantic-fonts'}))
);

gulp.task('fonts:custom', () =>
  gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('.tmp/assets/fonts'))
    .pipe(size({title: 'fonts'}))
);

// 'gulp fonts' -- copies your fonts to the temporary assets directory
gulp.task('fonts', gulp.parallel('fonts:semantic', 'fonts:custom'));
