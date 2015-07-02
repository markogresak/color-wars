/// <reference path="./typings/tsd.d.ts" />

var gulp = require("gulp");
var browserSync = require("browser-sync");
var p = require("gulp-load-plugins")();
var exec = require('child_process').exec;

var publicPath = "src/public/**/";
var distPath = "dist/"
var staticPaths = [publicPath + "*.html", publicPath + "*.js"]
var lessPath = publicPath + "*.less";
var tsPublicPath = publicPath + "*.ts";
var tsServerPath = ["src/*.ts", "src/server/*.ts"];
var serverPort = process.env.PORT || 3000;
var server = p.liveServer.new(distPath + "index.js");


gulp.task("tslint", () => {
  // Currently disabled because `tslint` doesn't recognize ES6 module imports.
  return;
  gulp.src("src/**/*.ts")
    .pipe(p.plumber())
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
    .pipe(p.plumber())
    .pipe(p.sourcemaps.init())
    .pipe(p.less())
    .pipe(p.autoprefixer())
    .pipe(p.sourcemaps.write())
    .pipe(gulp.dest("dist/public"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copy-static", () => {
  gulp.src(staticPaths)
    .pipe(p.plumber())
    .pipe(gulp.dest("dist/public"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("jspm-install", () => {
  exec("./node_modules/jspm/jspm.js install");
})

gulp.task("server", () => {
  server.start();
  browserSync.init({
    proxy: "localhost:" + serverPort,
    port: 7000
  });
});

gulp.task("clean", () => {
  gulp.src(distPath)
    .pipe(p.plumber(() => {}))
    .pipe(p.clean());
});

gulp.task("build", ["typescript", "less", "copy-static", "jspm-install"]);

gulp.task("rebuild", ["clean", "build"]);

gulp.task("default", ["build", "server"], () => {
  gulp.watch(staticPaths, ["copy-static"]);
  gulp.watch(lessPath, ["less"]);
  gulp.watch(tsPublicPath, ["typescript"]);
  gulp.watch(tsServerPath, [server.start]);
});
