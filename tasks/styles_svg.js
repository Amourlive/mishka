'use strict';

const gulp = require("gulp");
const rename = require("gulp-rename");
const svgStore = require('gulp-svgstore');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(svgStore({inlineSvg: true
    }))
            .pipe(rename("sprite.svg"))
            .pipe(gulp.dest("public/styles"));
    };
};