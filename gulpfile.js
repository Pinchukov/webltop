var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    browsersync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require("gulp-notify"),	
    cssnano       = require('gulp-cssnano'),
    rsync         = require('gulp-rsync');



gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: '_site'
		},
		notify: false,
		open: false,
		//tunnel: true,
		//tunnel: "jekyll-webltop", //Demonstration page: http://jekyll-webltop.localtunnel.me
	})
});



gulp.task('sass', function() {
	return gulp.src('assets/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('assets/css'))
	.pipe(gulp.dest('_site/assets/css'))
	.pipe(browsersync.reload( {stream: true} ))
});


gulp.task('js', function() {
	return gulp.src([
		'assets/libs/jquery/jquery.min.js',
		'assets/libs/uikit3/dist/js/uikit.min.js',
		'assets/libs/uikit3/dist/js/uikit-icons.min.js',
		'assets/libs/search-lunr/lunr.min.js',
		'assets/libs/search-lunr/search.js',
		'assets/libs/likely/likely.js',
		'assets/libs/prognroll/prognroll.js',
		'assets/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('assets/js'))
	.pipe(gulp.dest('_site/assets/js'))
	.pipe(browsersync.reload({ stream: true }))
});




gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('assets/'+syntax+'/**/*.'+syntax+'', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch(['assets/libs/**/*.js', 'assets/js/common.js'], ['js']); // Наблюдение за JS файлами в папке js
	gulp.watch(['*.html', '_site/**/*.html'], browsersync.reload) // Наблюдение за HTML файлами в корне проекта
});




gulp.task('default', ['watch']);