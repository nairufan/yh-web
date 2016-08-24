var gulp = require("gulp");
var webpack = require("webpack");
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var webpackConfig = require('./webpack.config.js');
var livereload = require('gulp-livereload');
var md5 = require('gulp-md5-plus');
var modRewrite = require('connect-modrewrite');

// process.env.NODE_ENV  product or dev
// 打包之前清除文件里的旧文件
gulp.task('clean', function () {
    return gulp.src('static/build/', {
        read: false
    })
        .pipe(clean());
});

//执行webpack
gulp.task('webpack', function () {
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", 'webpack is  OK!');
    })
});

//启动服务器
gulp.task("connect", function () {
    connect.server({
        port: 8080,
        root: 'static',
        livereload: true,
    });
});

//压缩、增加MD5
gulp.task('addmd5', function (done) {
    gulp.src('build/*.js')
        .pipe(md5(10, './*.html'))
        .pipe(gulp.dest('build'))
        .on('end', done);
});

gulp.task('html', function () {
    gulp.src('./static/*.html')
        .pipe(connect.reload());
});

//监控文件
gulp.task("watch", function () {
    livereload.listen();
    gulp.watch('components/**/*', ['webpack']).on('change', livereload.changed);
    gulp.watch('containers/**/*', ['webpack']).on('change', livereload.changed);
    gulp.watch('less/**/*.less', ['webpack']).on('change', livereload.changed);
    gulp.watch('pages/**/*', ['webpack']).on('change', livereload.changed);
});

gulp.task('default', ['clean', 'webpack'], function () {
    gulp.start(['connect', 'watch', 'html']);
});
