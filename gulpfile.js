'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', function (cb) {
  let called = false;
  return nodemon({
    script: './SERVER/server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      browserSync.reload({ stream: false });
    }, 1000);
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('watch', () => {
  watch('./SERVER/*.js').on('change', browserSync.reload);
  watch('./VIEWS/**/*').on('change', browserSync.reload);
})

gulp.task('default', ['watch', 'browser-sync']);
