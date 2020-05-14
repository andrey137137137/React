const gulp = require("gulp"),
  $gp = require("gulp-load-plugins")(),
  del = require("del"),
  cssnext = require("postcss-cssnext"),
  short = require("postcss-short"),
  shortText = require("postcss-short-text"),
  shortBorder = require("postcss-short-border"),
  webpack = require("webpack"),
  webpackConfig = require("./webpack.config.js"),
  browserSync = require("browser-sync").create(),
  pathes = {
    src: "src",
    dest: "public",
    html: {
      src: "/pug",
      dest: "",
    },
    fonts: {
      src: "/fonts",
      dest: "/fonts",
    },
    images: {
      src: "/images",
      dest: "/img",
    },
    svg: {
      src: "/svg",
      dest: "",
    },
    css: {
      src: "/scss",
      dest: "/css",
    },
    js: {
      src: "/js",
      dest: "/js",
    },
  };

for (path in pathes) {
  if (!pathes[path].src) continue;

  pathes[path].src = pathes.src + pathes[path].src;
  pathes[path].dest = pathes.dest + pathes[path].dest;
}

function clean() {
  return del([
    // pathes.dest + "/*",
    pathes.dest + "/*.html",
    "!" + pathes.fonts.dest,
    "!" + pathes.images.dest,
    // "!" + pathes.js.dest,
  ]);
}

function svg() {
  return (
    gulp
      .src(pathes.svg.src + "/*.svg")
      // minify svg
      .pipe(
        $gp.svgmin({
          js2svg: {
            pretty: true,
          },
        }),
      )
      // remove all fill, style and stroke declarations in out shapes
      .pipe(
        $gp.cheerio({
          run: function ($) {
            $("[fill], [stroke], [style], [width], [height]")
              .removeAttr("fill")
              .removeAttr("stroke")
              .removeAttr("style")
              .removeAttr("width")
              .removeAttr("height");
          },
          parserOptions: { xmlMode: true },
        }),
      )
      // cheerio plugin create unnecessary string '&gt;', so replace it.
      .pipe($gp.replace("&gt;", ">"))
      // build svg sprite
      .pipe(
        $gp.svgSprite({
          mode: {
            // symbol: {
            //     render:
            //     {
            //       scss:
            //       {
            //         svgId: "svg-%f",
            //   			dest: '../../../' + pathes.css.src + '/_sprite.scss',
            //   			// template: '../../../' + pathes.css.src + "/templates/_sprite_template.scss"
            //   		}
            //   	}
            // }
            stack: {
              sprite: "../sprite.svg", //sprite file name
            },
          },
        }),
      )
      .pipe(gulp.dest(pathes.svg.dest))
  );
}

function html() {
  var YOUR_LOCALS = {};

  return gulp
    .src(pathes.html.src + "/pages/*.pug")
    .pipe($gp.plumber())
    .pipe(
      $gp.pug({
        locals: YOUR_LOCALS,
        pretty: true,
      }),
    )
    .pipe(gulp.dest(pathes.html.dest));
}

function css() {
  var plugins = [
    // precss(),
    cssnext(),
    // colorAlpha(),
    short(),
    // shortFont(),
    shortText(),
    shortBorder(),
    // minmax(),
    // autoprefixer({browsers: ['last 2 version']}),
    // cssnano()
  ];

  return (
    gulp
      .src(pathes.css.src + "/main.scss")
      .pipe($gp.plumber())
      // .pipe(cssGlobbing())
      .pipe($gp.sass().on("error", $gp.sass.logError))
      .pipe($gp.postcss(plugins))
      // .pipe(autoprefixer({
      //   browsers: ['last 15 versions'],
      //   cascade: false
      // }))
      .pipe($gp.concatCss("bundle.css"))
      // .pipe(minifyCSS())
      .pipe($gp.rename("style.min.css"))
      .pipe(gulp.dest(pathes.css.dest))
  );
}

function js() {
  return (
    gulp
      .src(pathes.js.src + "/*.js")
      // .pipe($gp.sourcemaps.init())
      .pipe($gp.webpack(webpackConfig, webpack))
      // .pipe(concat('script.min.js'))
      .pipe($gp.sourcemaps.write())
      .pipe(gulp.dest(pathes.js.dest))
  );
}

function browser_sync() {
  browserSync.init({
    server: pathes.dest,
    // notify: false
  });
  browserSync.watch(pathes.dest + "/**/*.*", browserSync.reload);
}

function watch() {
  gulp.watch(
    [
      `${pathes.html.src}/*.pug`,
      `${pathes.html.src}/pages/*.pug`,
      `${pathes.svg.dest}/*.svg`,
    ],
    gulp.series(html),
  );
  gulp.watch(`${pathes.svg.src}/*.svg`, gulp.series(svg));
  gulp.watch(`${pathes.css.src}/**/*.scss`, gulp.series(css));
  gulp.watch(pathes.js.src + "/*.js", gulp.series(js));
}

exports.clean = clean;
exports.svg = svg;
exports.html = html;
exports.css = css;
exports.js = js;
exports.watch = watch;
exports.browser_sync = browser_sync;

gulp.task(
  "default",
  gulp.series(
    clean,
    gulp.parallel(html, css, js, svg),
    gulp.parallel(watch, browser_sync),
  ),
);
