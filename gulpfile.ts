import path from "path";
import fs from "fs";
import gulp from "gulp";
import transform from "gulp-transform";
import yaml from "js-yaml";
import rename from "gulp-rename";
import del from "del";
import sass from "sass";
import {Worker} from "worker_threads";

const paths = {
  dist: "./dist",
  distAssets: "./dist/assets",
  stylesEntry: "./src/assets/style.scss",
  watchStyles: ["./src/**/*.scss"],
  pages: ["./src/pages/**/*.yml"],
  watchPages: [
    "./src/pages/**/*.yml",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  staticAssets: [
    "./src/assets/**/*.{png,jpg,jpeg,svg}",
    "./src/assets/**/*.{woff,ttf,otf}",
  ]
};

function clean() {
  return del(paths.dist);
}

function staticAssets() {
  return gulp.src(paths.staticAssets)
    .pipe(gulp.dest(paths.distAssets));
}

function pages() {
  return gulp.src(paths.pages)
    .pipe(transform("utf8", (ymlSrc) => {
      const worker = new Worker("./src/build/renderWorker.js", {
        workerData: yaml.load(ymlSrc)
      });
      return new Promise<string>((resolve, reject) => {
        worker.once("message", resolve);
        worker.once("error", reject);
      });
    }))
    .pipe(rename({extname: ".html"}))
    .pipe(gulp.dest(paths.dist));
}

function styles() {
  return new Promise<void>((resolve, reject) => {
    // @ts-ignore
    sass.render({file: paths.stylesEntry, outputStyle: "compressed"}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        fs.mkdirSync(paths.dist, {recursive: true});
        fs.writeFileSync(path.join(paths.dist, "style.css"), res.css, "utf8");
        resolve();
      }
    });
  });
}

function watch() {
  gulp.watch(paths.watchStyles, styles);
  gulp.watch(paths.staticAssets, staticAssets);
  gulp.watch(paths.watchPages, pages);
  // runServer();
}

const build = gulp.series(clean, gulp.parallel(
  styles,
  staticAssets,
  pages
));
const dev = gulp.series(build, watch);

export default dev;
