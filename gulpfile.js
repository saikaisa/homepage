const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

// 合并并压缩 CSS 文件
gulp.task('styles', function () {
    return gulp.src('src/css/*.css') // 选择所有 CSS 文件
        .pipe(concat('styles.css')) // 合并为 styles.css
        .pipe(cleanCSS()) // 压缩 CSS
        .pipe(gulp.dest('dist')); // 输出到 dist 目录
});

// 合并并压缩 JavaScript 文件
gulp.task('scripts', function () {
    return gulp.src('src/js/*.js') // 选择所有 JavaScript 文件
        .pipe(concat('main.js')) // 合并为 main.js
        .pipe(uglify()) // 压缩 JavaScript
        .pipe(gulp.dest('dist')); // 输出到 dist 目录
});

// // 移动 HTML 文件到 dist
// gulp.task('html', function () {
//     return gulp.src('src/*.html')
//         .pipe(gulp.dest('dist')); // 移动到 dist 目录
// });

// 定义默认任务，运行所有任务
gulp.task('default', gulp.series('styles', 'scripts'));

// 输入 npx gulp 运行打包
