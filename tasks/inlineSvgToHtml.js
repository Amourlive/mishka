'use strict';

const gulp = require("gulp");
const fileinclude = require('gulp-file-include');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('public'));
    };
};