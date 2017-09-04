let gulp        = require('gulp');
let browserSync = require('browser-sync').create();
let sass        = require('gulp-sass');
let minify      = require('gulp-minify');
let cleanCSS    = require('gulp-clean-css');

// Static Server + watching scss/html files
gulp.task('serve', ['minify-css', 'minify-js'], function() {

    browserSync.init({
        server: "./../"
    });

    gulp.watch("./../src/scss/*.scss", ['minify-css']);
    gulp.watch("./../src/js/**/*.js", ['minify-js']);
    gulp.watch("./../index.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./../src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./../src/css"))
        .pipe(browserSync.stream());
});
 
gulp.task('minify-js', function() {
  gulp.src('./../src/js/**/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        ignoreFiles: ['*.min.js'],
        preserveComments: 'some',
        noSource: true
    }))
    .pipe(gulp.dest('./../dist/js/'))
});

gulp.task('minify-css',  ['sass'], () => {
  return gulp.src('./../src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./../dist/css'));
});


gulp.task('default', ['serve']);