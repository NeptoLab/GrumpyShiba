var gulp         = require('gulp'),
		htmlmin			 = require('gulp-htmlmin'),
		sass         = require('gulp-sass')(require('sass')),
		browserSync  = require('browser-sync'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify-es').default,
		cleancss     = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		newer        = require('gulp-newer'),
		rename       = require('gulp-rename'),
		responsive   = require('gulp-responsive'),
		del          = require('del')
		critical     = require('critical').stream;

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './docs'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done(); };

// Custom Styles
gulp.task('styles', function() {
	return gulp.src('./sass/**/*.sass')
	.pipe(sass({
		outputStyle: 'expanded',
		includePaths: [__dirname + '/node_modules']
	}))
	.pipe(concat('main.min.css'))
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(gulp.dest('./docs/css'))
	.pipe(browserSync.stream())
});


// Scripts & JS Libraries
gulp.task('scripts', function() {
	return gulp.src('./js/custom.js')
	.pipe(uglify()) // Minify js (opt.)
	.pipe(gulp.dest('./docs/js'))
	.pipe(gulp.src('./node_modules/jquery/dist/jquery.min.js'))
	.pipe(gulp.dest('./docs/js'))
	.pipe(browserSync.reload({ stream: true }));
});

// Responsive Images
var quality = 95; // Responsive images quality

 //Produce @1x images
gulp.task('img-responsive-1x', async function() {
	return gulp.src('./img/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('./docs/img/@1x'))
		.pipe(responsive({
			'**/*': { width: '50%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(gulp.dest('./docs/img/@1x'))
});
// Produce @2x images
gulp.task('img-responsive-2x', async function() {
	return gulp.src('./img/**/*.{png,jpg,jpeg,webp,raw}')
		.pipe(newer('./docs/img/@2x'))
		.pipe(responsive({
			'**/*': { width: '100%', quality: quality }
		})).on('error', function (e) { console.log(e) })
		.pipe(rename(function (path) {path.extname = path.extname.replace('jpeg', 'jpg')}))
		.pipe(gulp.dest('./docs/img/@2x'))
});
gulp.task('img', gulp.series('img-responsive-1x', 'img-responsive-2x', bsReload));

// Clean @*x IMG's
gulp.task('cleanimg', function() {
	return del(['./img/@*'], { force: true })
});

// Code & Reload
gulp.task('code', function() {
	return gulp.src('./*.html')
	.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
	.pipe(gulp.dest('./docs'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('critical', () => {
  return gulp
    .src('docs/*.html')
    .pipe(
      critical({
        base: 'docs/',
        inline: true,
        css: ['docs/css/main.min.css'],
      })
    )
    .pipe(gulp.dest('docs'));
});

gulp.task('watch', function() {
	gulp.watch('./sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch('./js/custom.js', gulp.parallel('scripts'));
	gulp.watch('./*.html', gulp.parallel('code'));
	gulp.watch('./img/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'code', /*'critical',*/ 'browser-sync', 'watch'));
