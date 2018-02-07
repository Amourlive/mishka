'use strict';

const gulp = require("gulp");
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const revReplace = require('gulp-rev-replace');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(newer('public'))
            .pipe(gulpif(!isDevelopment, revReplace({
                manifest: gulp.src('manifest/css.json', {allowEmpty: true})
            })))
            .pipe(gulp.dest('public'));
    };

};