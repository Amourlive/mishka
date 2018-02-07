'use strict';

const gulp = require("gulp");
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const through2 = require('through2').obj;
const fs = require('fs');
const combine = require('stream-combiner2').obj;

module.exports = function (options) {
    return function () {
    let eslintResults = {};
    let cacheFilePath = process.cwd() + '/tmp/lintCache.json';
    try {
        eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
    } catch (e) {
    }

    return gulp.src(options.src, {read: false})
        .pipe(gulpif(function (file) {
                eslintResults[file.path] && eslintResults[file.path].mtime == file.stat.mtime.toJSON();
            },
            through2(function (file, enc, callback) {
                file.eslint = eslintResults[file.path].eslint;
                callback(null, file);
            }),
            combine(
                through2(function (file, enc, callback) {
                    file.content = fs.readFileSync(file.path);
                    callback(null, file);
                }),
                eslint(),
                through2(function (file, enc, callback) {
                    eslintResults[file.path] = {
                        eslint: file.eslint,
                        mtime: file.stat.mtime
                    };
                    callback(null, file);
                })
            )
        ))
        .pipe(eslint.format())
        .on('end', function () {
            fs.writeFileSync(cacheFilePath, JSON.stringify((eslintResults)));
            callback();
        });
    };
};