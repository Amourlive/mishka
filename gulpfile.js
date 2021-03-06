'use strict';

const gulp = require("gulp");
const del = require('del');
const run = require('run-sequence');
const browserSync = require("browser-sync").create();

const isDevelopment = !process.env.NODE_ENV || process. s == 'development';

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}
lazyRequireTask('styles', './tasks/styles.js', {
    src: 'frontend/styles/style.css'
});

lazyRequireTask('assets', './tasks/assets.js', {
    src: 'frontend/assets/**'
});

lazyRequireTask('styles:assets', './tasks/styles_assets.js', {
    src: 'frontend/assets/**/*.{png,jpg,svg}'
});

lazyRequireTask('webp', './tasks/webp.js', {
    src: 'frontend/assets/**/*.{png,jpg}'
});

lazyRequireTask('styles:svg', './tasks/styles_svg.js', {
    src: 'frontend/assets/**/icon-*.svg'
});

gulp.task('clean', function () {
    return del('public');
});

lazyRequireTask('lint', './tasks/lint.js', {
    src: 'frontend/**/*.js'
});

lazyRequireTask('inlineSvgToHtml', './tasks/inlineSvgToHtml.js', {
    src: 'frontend/**/*.html'
});

lazyRequireTask('assets', './tasks/assets.js', {
    src: 'frontend/assets/fonts/*.*'
});

gulp.task('watch',function () {
    gulp.watch('frontend/styles/**/*.*',['styles']);
    gulp.watch('frontend/styles/**/*.{png,jpg,svg}', ['styles:assets']);
    gulp.watch('frontend/styles/**/*.{png,jpg}', ['webp']);
    gulp.watch('frontend/styles/**/icon-*.svg', ['styles:svg']);
    gulp.watch('public/styles/**/sprite.svg', ['inlineSvgToHtml']);
    gulp.watch('frontend/**/*.html', ['inlineSvgToHtml']);
    gulp.watch('frontend/assets/fonts/*.*', ['assets']);
});

gulp.task('dev', function (callback) {
    run('build', ['watch', 'serve',], callback)
});

gulp.task('build', function (callback) {
    run('clean', 'styles:svg', ['inlineSvgToHtml', 'styles', 'styles:assets', 'webp', 'assets'], callback);
});

gulp.task('default', ['build']);

gulp.task("serve", function () {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});