'use strict';

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    babel = require('gulp-babel'),
    pug = require('gulp-pug'),
    eslint = require('gulp-eslint'),
    puglint = require('gulp-pug-linter'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    fileinclude = require('gulp-file-include'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    plumber = require('gulp-plumber'),
    wait = require("gulp-wait"),
    postcss = require('postcss'),
    reload = browserSync.reload;

var path = {
    build: {
        pug: 'dist/',
        html: 'dist/',
        js: 'dist/assets/js/',
        css: 'dist/assets/css/',
        img: 'dist/assets/img/',
        fonts: 'dist/assets/fonts/'
    },
    src: {
        pug: 'src/pages/*.pug',
        html: 'src/pages/*.html',
        js: 'src/assets/js/*.js',
        style: 'src/assets/style/*.scss',
        img: 'src/assets/img/**/*.*',
        fonts: 'src/assets/fonts/*.*'

    },
    watch: {
        pug: ['src/pages/*.pug','src/pages/partials/*.pug'],
        html: 'src/pages/*.html',
        js: ['src/assets/js/*.js','src/assets/js/**/*.js'],
        style: ['src/assets/style/*.scss','src/assets/style/**/*.scss'],
        img: 'src/assets/img/**/*.*',
        fonts: 'src/assets/fonts/*.*',
        jslint: ['src/assets/js/*.js','src/assets/js/**/*.js'],
        puglint: ['src/pages/*.pug','src/pages/partials/*.pug']
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: '127.0.0.1',
    port: 8000,
    logPrefix: "SMDM package:"
};

gulp.task('server', ()=> {
    browserSync(config);
});

gulp.task('clean',(cb) => {
    rimraf(path.clean, cb);
});

gulp.task('pug:build', ()=> {
    gulp.src(path.src.pug)
    .pipe(plumber())
    .pipe(fileinclude({
        prefix: '//@',
        basepath: '@file'
    }))
    .pipe(pug({
        pretty: true,
    }))
    .pipe(gulp.dest(path.build.pug))
    .pipe(reload({
        stream: true,
    }));
});


gulp.task('html:build',  () => {
    gulp.src(path.src.html)
        .pipe(plumber()) 
        .pipe(rigger())
        .pipe(fileinclude({
            prefix: '//@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build',  () => {
    gulp.src(path.src.js)
        .pipe(plumber()) 
        .pipe(fileinclude({
            prefix: '//@',
            basepath: '@file'
        }))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('style:build',  () => {
    gulp.src(path.src.style)
        .pipe(wait(500))
        .pipe(sass({
            includePaths: ['.src/assets/style/patrials','.src/assets/style/plugins'],
            outputStyle: 'compressed',
        }))
        //.pipe(postcss([autoprefixer({browsers: ["> 0%"]})]))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image:build',  () => {
    gulp.src(path.src.img) 
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                }],
            }),
        ]))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', () => {
    gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('pug:lint', () => {
    gulp.src(path.watch.puglint)
      .pipe(puglint())
      .pipe(puglint.reporter());
  });

  gulp.task('js:lint', () => {
    gulp.src(path.watch.jslint)
      .pipe(eslint())
      .pipe(eslint.format());
  });

gulp.task('build', [
    'html:build',
    'pug:build',
    'style:build',
    'js:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', () =>{
    watch(path.watch.pug, (event, cb) => {
        gulp.start('pug:build');
    });
    watch(path.watch.html, (event, cb) => {
        gulp.start('html:build');
    });
    watch(path.watch.style, (event, cb) => {
        gulp.start('style:build');
    });
    watch(path.watch.js, (event, cb) => {
        gulp.start('js:build');
    });
    watch(path.watch.img, (event, cb) => {
        gulp.start('image:build');
    });
    watch(path.watch.fonts, (event, cb) => {
        gulp.start('fonts:build');
    });
    watch(path.watch.pug, (event,cb) => {
        gulp.start('pug:lint');
    });
});


gulp.task('default', ['build', 'server', 'watch']);
