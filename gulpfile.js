'use strict';

var gulp = require('gulp')
var gulpWebpack = require('gulp-webpack')
var webpack = gulpWebpack.webpack
var uglify = require('gulp-uglifyjs')
var header = require('gulp-header')
var meta = require('./package.json')
var watch = require('gulp-watch')

var banner = ['/**',
              '* Player v${version}',
              '* (c) 2015 ${author}',
              '* Released under the ${license} License.',
              '*/',
              ''].join('\n')
var bannerVars = { 
    version : meta.version,
    author: meta.author,
    license: meta.license
}

gulp.task('watch', function () {
    watch(['lib/**', 'index.js'], function () {
        gulp.start('default')
    })
});
gulp.task('default', function() {
    return gulp.src('index.js')
        .pipe(gulpWebpack({
            output: {
                library: 'Player',
                libraryTarget: 'umd',
                filename: 'player.js'
            },
            resolve: {
                modulesDirectories: ['lib', 'node_modules'],
                extensions: ["", ".js"]
            },
            module: {
                loaders: [{
                    test: /.*?\.tpl$/,
                    loader: 'html-loader',
                }]
            },
            plugins: [
                new webpack.NormalModuleReplacementPlugin(/^comps[\/\\][^\/\\\.]+$/, function(f) {
                    var matches = f.request.match(/^comps[\/\\]([^\/\\\.]+)$/)
                    var cname = matches[1]
                    f.request = 'comps/' + cname + '/' + cname
                    return f
                })
            ]
        }))
        .pipe(header(banner, bannerVars))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify('player.min.js', {
            mangle: true,
            compress: true
        }))
        .pipe(header(banner, bannerVars))
        .pipe(gulp.dest('dist/'))
        .on('end', function () {
            // Note: Necessary, It will be trigger start callback
            gulp.stop(null, true)
        })
});
