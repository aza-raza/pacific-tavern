// 1. Variables
var gulp = require('gulp');
var sass  = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
const image = require('gulp-image');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

// 2. Dépendances

    // sass - scss
    gulp.task('sass', function () {
        return gulp.src('./src/css/**/*.scss')
        //compression par sass
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        // adapte le code pour augmenter un maximum la compatiblité pour les navigateurs
        .pipe(autoprefixer({cascade:false}))
        // change le nom du fichier styles.css en styles.min.css 
        .pipe(rename({extname: ".min.css"}))
        // indique la destination du fichier css
        .pipe(gulp.dest('./dist/css'));
    });

    // html
    gulp.task('htmlDuplicate', function(){
        return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
    });

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "./dist"
            }
        });
    });

    // js
    gulp.task('uglifyJs', function () {
        return pipeline(
            gulp.src('./src/js/*.js'),
            uglify(),
            rename({extname: ".min.js"}),
            gulp.dest('./dist/js/')
        );
    });
    
    // image - compresser
    gulp.task('img', function () {
        gulp.src('./src/img/*')
            .pipe(image())
            .pipe(gulp.dest('./dist/img/'));
    });


// 3. executer tout
gulp.task('execute', gulp.parallel('sass','htmlDuplicate', 'uglifyJs','browser-sync', function () {
    gulp.watch('./src/css/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/*.html', gulp.series('htmlDuplicate'));
    gulp.watch('./src/js/*.js', gulp.series('uglifyJs'));

    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
    gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
    
})); 

// "gulp" dans le terminal au lieu de "gulp execute"
gulp.task('default', gulp.parallel('execute'));