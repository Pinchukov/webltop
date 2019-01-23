var syntax        = 'sass', // выберете используемый синтаксис sass или scss, и перенастройте нужные пути в файле gulp.js и папки в вашего шаблоне wp
		gulpversion   = '4'; // Выберете обязателньо свою версию Gulp: 3 или 4

var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    browsersync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    cache         = require('gulp-cache'),
    cleancss      = require('gulp-clean-css'),
    ftp           = require('vinyl-ftp'),
		imagemin      = require('gulp-imagemin'),
		notify        = require('gulp-notify'),
		pngquant      = require('imagemin-pngquant'),
		gutil         = require('gulp-util' ),
		rename        = require('gulp-rename'),
		rsync         = require('gulp-rsync'),
		sass          = require('gulp-sass'),
		uglify        = require('gulp-uglify');


gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: '_site'
		},
		notify: false,
		open: false,
		//tunnel: true,
		//tunnel: "webltop", //Demonstration page: http://webltop.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('assets/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('assets/css'))
	.pipe(gulp.dest('_site/assets/css'))
	.pipe(browsersync.reload( {stream: true} ))
});


gulp.task('scripts', function() {
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

gulp.task('rsync', function() {
	return gulp.src('_site/**')
	.pipe(rsync({
		root: '_site/',
		hostname: 'user123@webltop.ru',
		destination: 'www/webltop.ru/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('deploy', function() {
	var conn = ftp.create({
			host: '00.000.000.000', // IP or domain
			user: 'ftp-user',
			password: 'pass-ftp-user',
			parallel: 10,
			log: gutil.log
	});
			var globs = [
			'_site/**',
			'_site/.htaccess',
			];
  return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('www/webltop.ru/'));
});

gulp.task('img', function() {
  return gulp.src('images/**/*') // Берем все изображения из папки images
  .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('images-dist')); // Выгружаем 
});


if (gulpversion == 3) {
  gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
	  gulp.watch('assets/'+syntax+'/**/*.'+syntax+'', ['styles']); // Наблюдение за sass файлами в папке sass
	  gulp.watch(['assets/libs/**/*.js', 'assets/js/common.js'], ['scripts']); // Наблюдение за JS файлами в папке js
	  gulp.watch(['*.html', '_site/**/*.html'], browsersync.reload) // Наблюдение за HTML файлами в корне проекта
  });
  gulp.task('default', ['watch']);
}


if (gulpversion == 4) {
  gulp.task('watch', function() {
	  gulp.watch('assets/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles')); // Наблюдение за sass файлами в папке sass
	  gulp.watch(['assets/libs/**/*.js', 'assets/js/common.js'], gulp.parallel('scripts')); // Наблюдение за JS файлами в папке js
	  gulp.watch(['*.html', '_site/**/*.html'], browsersync.reload) // Наблюдение за HTML файлами в корне проекта
  });
  gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
}