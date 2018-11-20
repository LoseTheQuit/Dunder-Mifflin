'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var maps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');

gulp.task('watch-sass', function() {
    console.log('GULP WATCH');
    gulp.watch(['public/sass/**/*', 'public/js/ng/**/*'], ['minifyCssWATCH', 'concat-scripts']);
    // gulp.start('clean');
    // gulp.watch('public/**/*', ['default']);
});

// gulp.task('watch', function() {
//     console.log('GULP WATCH');
//     gulp.watch('public/js/**/*', ['clean', 'uglify-scripts', 'minifyCss']);
//     gulp.watch('public/sass/**/*', ['clean', 'uglify-scripts', 'minifyCss']);
//     // gulp.watch('public/**/*', ['default']);
// });

// gulp.task('watch', function() {
//     console.log('GULP WATCH');
//     gulp.watch('public/**/*', ['default']);
// });

gulp.task('clean', function() {
    return gulp.src([
        'public/dist',
        'dist',
        'public/css',
        'public/js/app.js'
    ], { read: false }).pipe(clean());
});

gulp.task('concat-scripts', function() {
    gulp.src([
            'public/js/ng/**/*'
        ])
        .pipe(concat('app.js'))
        //this fixed a shorthand javascript error
        .pipe(babel({
            presets: ['es2015'],
            compact: true
        }))
        //this fixed a shorthand javascript error
        .pipe(gulp.dest('public/js'));
});

gulp.task('uglify-scripts', ['concat-scripts'], function() {
    gulp.src('public/js/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compileSass', function() {
    gulp.src('public/sass/**/*')
        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('public/css'))
});


gulp.task('minifyCss', ['compileSass'], function() {
    gulp.src('public/**/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'));
});


// gulp.task('concat-scriptsWATCH', ['clean'], function() {
//     gulp.src([
//             'public/js/**/*'
//         ])
//         .pipe(concat('app.js'))
//         //this fixed a shorthand javascript error
//         .pipe(babel({
//             presets: ['es2015'],
//             compact: true
//         }))
//         //this fixed a shorthand javascript error
//         .pipe(gulp.dest('public/js'));
// });

gulp.task('compileSassWATCH', ['clean'], function() {
    gulp.src('public/sass/**/*')
        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('public/css'))
});

gulp.task('minifyCssWATCH', ['compileSassWATCH'], function() {
    gulp.src('public/**/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('run', function(cb) {
    runSequence('concat-scripts',
        'compileSass',
        'minifyCss',
        'uglify-scripts',
        cb);
});

gulp.task('build', ['run'], function() {
    // return gulp.src(['public/views/**/*', 'public/dist/**/*',
    //         'public/views/**/*', 'public/img/**/*'
    //     ], { base: './' })
    //     .pipe(gulp.dest('dist'));
    return setTimeout(function() {
        gulp.src(['public/views/**/*', 'public/css/**/*',
                'public/js/app.js',
                'public/views/**/*', 'public/img/**/*'
            ], { base: './' })
            .pipe(gulp.dest('dist'))
    }, 2500)
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});