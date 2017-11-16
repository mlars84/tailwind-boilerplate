const paths = require('./package.json').paths
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const tailwindcss = require('tailwindcss')
const browserSync = require('browser-sync').create()

gulp.task('css', () => {
  return gulp
    .src(paths.src.css + '*.css')
    .pipe(
      postcss([tailwindcss(paths.config.tailwind), require('autoprefixer')])
    )
    .pipe(gulp.dest(paths.dist.css))
})

gulp.task('serve', ['css'], () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })
  gulp.watch(paths.src.css + '*.css', ['css'])
  gulp.watch(paths.config.tailwind, ['css'])
  gulp.watch(paths.dist.base + '*.html').on('change', browserSync.reload)
})

gulp.task('default', ['serve'])