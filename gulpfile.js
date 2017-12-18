"use strict";

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    babel = require("gulp-babel");

var paths = {
    images: 'src/assets/images/**/*',
    fonts: 'src/assets/fonts/**/*',
    js: 'src/assets/js/*',
    libs: 'src/assets/js/lib/*',
    scss: 'src/assets/scss/styles.scss',
    html: 'src/**/*',
};


gulp.task('clean', function() {
    return del(['build']);
});

// live reload //

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    });

});

// Task for html //

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());

});

// Task for CSS //

gulp.task('css', function() {
    gulp.src(paths.scss)
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(connect.reload());
});

// Task for JS compress //

gulp.task('js', function() {
    return gulp.src(paths.js)
        // .pipe(uglify())
        .pipe(babel())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(connect.reload());
});

gulp.task('libs', function() {
    return gulp.src(paths.libs)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(connect.reload());
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'));
});


// Copy all static fonts
gulp.task('fonts', ['clean'], function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/assets/fonts'));
});



// Watch //
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch(paths.scss, ['css']);
    gulp.watch('src/assets/js/*.js', ['js']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
});
// Default profile //
gulp.task('default', ['connect', 'html', 'css', 'libs', 'js', 'images', 'fonts']);
gulp.task('serve', ['connect', 'html', 'css', 'libs', 'js', 'images', 'fonts', 'watch']);