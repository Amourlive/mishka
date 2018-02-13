'use strict';

const gulp = require("gulp");
const newer = require('gulp-newer');
const webp = require('gulp-webp');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(newer('public/assets'))
            .pipe(webp({quality: 90}))
            .pipe(gulp.dest('public/assets'))
    };
};