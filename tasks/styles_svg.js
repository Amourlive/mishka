'use strict';

const gulp = require("gulp"),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe(svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            // remove all fill, style and stroke declarations in out shapes
            .pipe(cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {xmlMode: true}
            }))
            // cheerio plugin create unnecessary string '&gt;', so replace it.
            .pipe(replace('&gt;', '>'))
            // build svg sprite
            .pipe(svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg",
                        render: {
                            css: {
                                dest:'sprite.css'
                            }
                        }
                    }
                }
            }))
            .pipe(gulp.dest('public/styles'));
    };
};