'use strict';

const gulp = require("gulp");
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(newer('public/styles'))
            .pipe(imagemin([
                imagemin.optipng({optimizationLevel: 3}),
                imagemin.jpegtran({progressive: true})
            ]))
            .pipe(gulp.dest('public/styles'))
            .pipe(webp({quality: 90}))
            .pipe(gulp.dest('public/styles'))
        };
};