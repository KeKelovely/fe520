var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
        	baseDir: "./"
        }
    });

    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("./index.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
