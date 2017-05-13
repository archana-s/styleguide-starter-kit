var gulp = require('gulp')

/* Build styleguide */
gulp.task('build:styleguide', function () {
    var concat = require('gulp-concat')
    var postcss = require('gulp-postcss')
    var autoprefixer = require('autoprefixer')
    var customProperties = require('postcss-css-variables')
    var Import = require('postcss-import')
    var styleGuide = require('postcss-style-guide')
    var extend = require('postcss-extend')
    var nano = require('cssnano')
    var livereload = require('gulp-livereload')

    return gulp.src('./src/styles/app.css')
      .pipe(postcss([
          Import,
          extend,
          customProperties({ preserve: true }),
          autoprefixer,
          styleGuide({
              project: '%%project%%',
              dest: 'public/styleguide.html',
              showCode: false,
              themePath: './src/styleguide-template/'
          }),
          nano
      ]))
      .pipe(concat('./public/styleguide.min.css'))
      .pipe(gulp.dest('.'))
      .pipe(livereload())
})

gulp.task('copy:common-files', function() {
  return gulp.src('./src/styles/images/*.*').pipe(gulp.dest('./public/images'));
})

gulp.task('default', function() {
  livereload.listen();
  gulp.watch('src/styles/*.css', ['build:styleguide']);
})
