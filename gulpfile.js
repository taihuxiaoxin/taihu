const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const del =require('del');

const cssHandler = function(){
    return gulp.src('./src/css/*.css').pipe(autoprefixer()).pipe(cssmin()).pipe(gulp.dest('./dist/css'));
}
const delHandler = function(){
    return del(['./dist']);
}
const jsHandler = function(){
    return gulp.src('./src/js/*.js').pipe(uglify()).pipe(babel()).pipe(gulp.dest('./dist/js'));
}
const htmlHandler = function(){
    return gulp.src('./src/page/*.html').pipe(htmlmin({
        removeAttributeQuotes:true,          // 删除属性中的双引号
        removeComments:true,                 // 删除注释
        removeScriptTypeAttributes:true,     // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes:true,  //删除<style>和<link>的type="text/css" 
        collapseBooleanAttributes:true,      // 布尔属性,只写属性,不写属性值
        collapseWhitespace:true,             // 删除标签之间的空格
        minifyCSS:true,                      // 压缩内部css样式
        minifyJS:true,
    })).pipe(gulp.dest('./dist/page'));
}
const watchHandler = function(){
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/page/*.html',htmlHandler);
}
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHandler,htmlHandler),
    watchHandler,
);
