// gulp 및 패키지 모듈 호출
var gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('html', function () {
    return gulp
        .src('./*.html')
        .pipe(browserSync.reload({
            stream : true
        }));
});

gulp.task('browserSync', ['html'], function () {
    return browserSync.init({
        port : 50003,
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['browserSync','watch']);
