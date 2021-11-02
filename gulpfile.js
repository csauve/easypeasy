const gulp = require("gulp");
const del = require("del");
const sass = require("sass");

const paths = {
  dist: "./dist",
  // vendor: [],
  watchStyles: ["./src/**/*.scss"],
  stylesEntry: ["./src/style.scss"],
};

function clean() {
  return del(paths.dist);
}

// function vendor() {
//   return gulp.src(paths.vendor)
//     .pipe(gulp.dest(paths.dist));
// }

function styles() {
  return new Promise((resolve, reject) => {
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

const build = gulp.series(clean, gulp.parallel(styles));

function watch() {
  // gulp.watch(paths.vendor, vendor);
  gulp.watch(paths.watchStyles, styles);
  // gulp.watch(paths.watchScripts, content);
  // runServer();
}

exports.clean = clean;
exports.dev = gulp.series(build, watch);
exports.default = build;
