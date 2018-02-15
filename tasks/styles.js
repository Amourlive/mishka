'use strict';

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const properties = require('postcss-custom-properties');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const atImport = require("postcss-import");
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const focus = require('postcss-focus');
const media = require('postcss-custom-media');
const minmax = require('postcss-media-minmax');
const selectors = require("postcss-custom-selectors");
const nested = require('postcss-nested');
const inlineSvgCss = require('postcss-inline-svg');
const mixins = require('postcss-mixins');
const gcmq = require('gulp-group-css-media-queries');
const url = require("postcss-url");
const rem = require("postcss-pxtorem");
const flexbug = require("postcss-flexbugs-fixes");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {
    let processor= [atImport()
    ,rem()
    ,mixins()
    ,focus()
    ,properties()
    ,autoprefixer()
    ,media()
    ,minmax()
    ,selectors()
    ,nested()
    ,inlineSvgCss()
    ,url()
    ,flexbug()
    ,require('postcss-normalize')];
    return function () {
        return gulp.src(options.src)
            .pipe(plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: 'Styles',
                        message: err.message
                    };
                })
            }))
            .pipe(gulpif(isDevelopment, sourcemaps.init()))
            .pipe(postcss(processor))
            .pipe(gcmq())
            .pipe(gulpif(isDevelopment, sourcemaps.write()))
            .pipe(gulpif(!isDevelopment, cssnano()))
            .pipe(gulpif(!isDevelopment, rev()))
            .pipe(gulp.dest('public/styles'))
            .pipe(gulpif(!isDevelopment, rev.manifest('css.json')))
            .pipe(gulpif(!isDevelopment, gulp.dest('manifest')))
    };

};