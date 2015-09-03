var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('jscs', function () {
  return gulp.src('lib/**/*.js')
    .pipe(jscs());
});

gulp.task('lint', function () {
  return gulp.src('lib/**/*.js')
    .pipe(jshint());
});

gulp.task('test', function () {
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha({
      globals: ['chai'],
      timeout: 6000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'spec'
    }));
});

gulp.task('default', ['test']);