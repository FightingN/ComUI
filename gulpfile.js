const gulp = require("gulp");
const plumber = require("gulp-plumber"); // 发生错误时 阻止gulp退出并输出日志
const rename = require("gulp-rename"); // 输出时重命名文件
const cssnano = require("gulp-cssnano"); // css 代码压缩
const ts = require("gulp-typescript"); // ts转js插件
const tsProject = ts.createProject("./tsconfig.json"); // 读取 ts 配置文件
const sass = require("gulp-sass"); // css预处理器
const clean = require("gulp-clean"); 
const changed = require("gulp-changed"); // 仅编译或打包改变过的文件
const debug = require("gulp-debug");
const eslint = require("gulp-eslint");
const autoprefixer = require("autoprefixer")
const postcss = require("gulp-postcss")

// 打包的名称
const packageName = "miniprogram"

// ts编译成js
gulp.task("build:typescript", () => {
  return gulp.src(["src/**/*.ts"], {base: "src"})
    .pipe(plumber())
    .pipe(changed(packageName, {extension: ".js"}))
    .pipe(debug({title: "编译ts："}))
    .pipe(tsProject())
    .js.pipe(gulp.dest(packageName))
})

// css预处理-sass
gulp.task("build:scss", () => {
  return gulp.src(["src/**/*.scss"], {base: "src"})
    .pipe(plumber())
    .pipe(changed(packageName, {extension: ".wxss"}))
    .pipe(debug({title: "编译scss："}))
    .pipe(sass())
    .pipe(postcss([autoprefixer(["iOS >= 8", "Android >= 4.1"])]))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true}
      })
    )
    .pipe(
      rename(path => {
        path.extname = ".wxss"
      })
    )
    .pipe(gulp.dest(packageName))
})

// 清理输出目录
gulp.task("build:clean", () => {
  return gulp.src(packageName, {read: false})
    .pipe(clean())
});

// eslint 校验代码风格
gulp.task("build:eslint", () => {
  return gulp.src("src/**")
    .pipe(eslint({
      configFile: "./.eslintrc.js"
    }))
    .pipe(eslint.format())
});

// 处理脚本、模板和配置文件
gulp.task("build:main", gulp.series(gulp.parallel("build:scss", "build:typescript"), () => {
  return gulp.src([
    "src/**/*",
    "!src/**/*.scss",
    "!src/**/*.ts",
    "!src/{scripts,scripts/**}"
  ], {base: "src", allowEmpty: true})
    .pipe(plumber())
    .pipe(changed(packageName))
    .pipe(gulp.dest(packageName))
}));

function watch () {
  let watcher = gulp.watch("src/**", gulp.series("build:main"), cb => cb());
  watcher.on("all", (event, path, stats) => {
    console.log(`File ${path} has ${event}, runing tasks...，${stats}`)
  });
  return watcher
}

gulp.task("serve", gulp.series(watch));
gulp.task("build", gulp.series("build:main"));