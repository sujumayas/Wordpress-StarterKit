// ===========================================================================
// Dependencies
// ===========================================================================

    var gulp    = require('gulp'),
    stylus      = require('gulp-stylus'),
    nib         = require('nib'),
    rupture     = require('rupture'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    changed     = require('gulp-changed'),
    imagemin    = require('gulp-imagemin'),
    pngmin      = require('gulp-pngmin'),
    plumber     = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    imageResize = require('gulp-image-resize'),
    rename      = require('gulp-rename'),
    iconfont    = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    del         = require('del'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    stylint     = require('gulp-stylint'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    uncss       = require('gulp-uncss'),
    gutil       = require('gulp-util'),
    watchify    = require('watchify'),
    assign      = require('lodash.assign');



// ===========================================================================
// Paths URL
// ===========================================================================

var path = {
    // Stylus to CSS
    stylus: 'stylus',
    // Javascript
    js: 'javascript',
    // Jpg
    jpg: 'images/*.jpg',
    // Png
    png: 'images/*.png',
    // SVG 
    icons: 'svg/icons/**/*.svg',
    // Fonts
    fonts: 'fonts',
    // IMG Source
    imgages: 'images',
    // IMG
    dist_img: '../img',
    // Dist Folder
    dist: '../',
    dist_css: '../',
    dist_js: '../js',
    dist_fonts: '../fonts'
};



// ===========================================================================
// Error Handler
// ===========================================================================

var onError = function(err) {
    gutil.beep();
    console.log(err);
};


// ===========================================================================
// CSS Task
// ===========================================================================

gulp.task('css', function() {
    
    return gulp.src(path.stylus + '/main.styl')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(stylint())
        .pipe(changed(path.dist_css))
        .pipe(stylus({
            'include css': true,
            use: [nib(), rupture()],
            compress: true
        }))
        .pipe(rename({
            basename: 'style'
        }))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.dist_css))
});

/**
 * UNCSS
 */

gulp.task('css:uncss', function() {
    return gulp.src(path.dist_css + '/style.css')
        .pipe(uncss({
                    html: [path.dist + '/**/*.html'],
                    ignore: [
                                // Must Config 
                                // Which clases must not be delted
                                /(#|\.)fancybox(\-[a-zA-Z]+)?/,
                                // Bootstrap selectors added via JS
                                /\w\.in/,
                                ".fade",
                                ".collapse",
                                ".collapsing",
                                /(#|\.)navbar(\-[a-zA-Z]+)?/,
                                /(#|\.)carousel(\-[a-zA-Z]+)?/,
                                /(#|\.)slide(\-[a-zA-Z]+)?/,
                                /(#|\.)dropdown(\-[a-zA-Z]+)?/,
                                /(#|\.)(open)/,
                                // currently only in a IE conditional, so uncss doesn't see it
                                ".close",
                                ".alert-dismissible"
                            ]
                }))
                .pipe(rename({
                    basename: 'style'
                }))
                .pipe(plumber.stop())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(path.dist_css))
});

// ===========================================================================
// Image Tasks
// ===========================================================================

gulp.task('jpg', function() {
    
    return gulp.src(path.jpg)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(path.dist_img))
        .pipe(imagemin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist_img));
});

gulp.task('png', function() {
    
    return gulp.src(path.png)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(changed(path.dist_img))
        .pipe(pngmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist_img));
});

gulp.task('favicon', function(){
    return gulp.src(path.imgages + '/**/*.ico')
        .pipe(gulp.dest(path.dist_img));
});

gulp.task('sprite', function() {
    
    var spriteData =
        gulp.src(path.imgages + '/sprite/**/*.*')
        .pipe(changed(path.imgages + '/sprite/**/*.*'))
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'inc/sprite.styl',
            imgPath: 'sprite.png',
            cssFormat: 'stylus',
            algorithm: 'binary-tree',
            cssTemplate: path.stylus + '/template/stylus.template.mustache',
            cssVarMap: function(sprite) {
                sprite.name = 'spr-' + sprite.name
            }
        }));

    spriteData.img
        .pipe(gulp.dest(path.dist_img));
    spriteData.img
        .pipe(imageResize({
            width: '50%',
            filter: 'Catrom',
            sharpen: true
        }))
        .pipe(rename(function(path) {
            path.basename = "sprite@2x";
        }))
        .pipe(gulp.dest(path.dist_img));
    spriteData.css.pipe(gulp.dest(path.stylus));
});



// ===========================================================================
// JS Tasks
// ===========================================================================

// add custom browserify options here
var customOpts = {
  entries: [path.js + '/main.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

function bundle() {
  return b.bundle()
    // log errors if they happen
    //.on('error', onError)
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist_js))
}


gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

// ===========================================================================
// JS Hint
// ===========================================================================

gulp.task('js-hint', function(cb) {
    
    return gulp.src([path.js + '/inc/*.js', path.js + '/*.js'])
        .pipe(changed(path.js + '/**/*.js'))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(plumber.stop());

    cb(err);
});



// ===========================================================================
// Icon Task
// ===========================================================================

gulp.task('iconfont', function() {
    var fontName = "fonticon";
    return gulp.src(path.icons, {
            base: '../fonts'
            })
            .pipe(changed(path.dist_fonts + '/iconfont'))
            .pipe(iconfontCss({
                fontName: fontName,
                path: 'stylus/template/_icons.css',
                targetPath: '../../../stylus/inc/iconfont.styl',
                fontPath: '../fonts/iconfont/'
            }))
            .pipe(iconfont({
                fontName: fontName
            }))
            .pipe(gulp.dest(path.dist_fonts + '/iconfont'));
});



// ===========================================================================
// Fonts
// ===========================================================================

gulp.task('fonts', function(){
    return gulp.src(path.fonts + '/**/*.*')
        .pipe(gulp.dest(path.dist_fonts));
});



// ===========================================================================
// Clean Task
// ===========================================================================

gulp.task('clean', function(cb) {
    console.log('Cleaning files ...');
    del(['../css', '../js', '../img'], cb)
});



// ===========================================================================
// Watch Tasks
// ===========================================================================

gulp.task('watch', function() {

    gulp.watch(path.stylus + '/**/*.{styl,css}', ['css']);
    gulp.watch(path.js + '/**/*.js', ['js']);

});

// BROWSER SYNC

gulp.task('sync', function() {
    browserSync.init('../**/*', {
        proxy: 'localhost:8888/wordpress'
    });
});



// ===========================================================================
// Tasks
// ===========================================================================

gulp.task('default', ['css', 'js', 'watch', 'sync']);
gulp.task('optimize', ['jpg', 'png']);
gulp.task('images', ['sprite', 'iconfont', 'optimize', 'favicon', 'fonts']);
gulp.task('deploy', ['clean', 'images', 'css', 'js']);
gulp.task('deploy:watch', ['images', 'css', 'js', 'watch', 'sync']);
