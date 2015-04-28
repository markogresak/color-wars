/// <reference path="./typings/tsd.d.ts" />

var gulp = require("gulp");
var browserSync = require("browser-sync");
var p = require("gulp-load-plugins")();

var publicPath = "src/public/**/";
var htmlPath = publicPath + "*.html";
var lessPath = publicPath + "*.less";
var tsPublicPath = publicPath + "*.ts";
var tsServerPath = ["src/*.ts", "src/server/*.ts"];
var serverPort = process.env.PORT || 3000;
var server = p.liveServer.new("dist/index.js");

gulp.task("less", () => {
  gulp.src(lessPath)
    .pipe(p.sourcemaps.init())
    .pipe(p.less())
    .pipe(p.autoprefixer())
    .pipe(p.sourcemaps.write())
    .pipe(gulp.dest("dist/public"))
    .pipe(browserSync.reload({ stream: true }));
});

