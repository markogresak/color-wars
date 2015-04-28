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

gulp.task("tslint", () => {
  // Currently disabled because `tslint` doesn't recognize ES6 module imports.
  return;
  gulp.src("src/**/*.ts")
    .pipe(p.tslint())
    .pipe(p.tslint.report("prose", {
      emitError: true
    }));
});

gulp.task("test", ["tslint"], () => {
  // TODO
});

gulp.task("typescript", () => {
  // Hack until `gulp-typescript` supports projects.
  require('child_process').exec("./node_modules/typescript/bin/tsc -p .");
});

gulp.task("less", () => {
  gulp.src(lessPath)
    .pipe(p.sourcemaps.init())
    .pipe(p.less())
    .pipe(p.autoprefixer())
    .pipe(p.sourcemaps.write())
    .pipe(gulp.dest("dist/public"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy-html", () => {
  gulp.src(htmlPath)
    .pipe(gulp.dest("dist/public"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("server", () => {
  server.start();
  browserSync.init({
    proxy: "localhost:" + serverPort,
    port: 7000
  });
});

gulp.task("default", ["typescript", "less", "copy-html", "server"], () => {
  gulp.watch(htmlPath, ["copy-html"]);
  gulp.watch(lessPath, ["less"]);
  gulp.watch(tsServerPath, [server.start]);
});
