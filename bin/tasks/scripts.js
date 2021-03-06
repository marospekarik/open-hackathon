import gulp from 'gulp';
import { exec } from 'child_process';

import source from 'vinyl-source-stream';
// Using babelify to use ES6 import/export in .js files
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import browserSync from 'browser-sync';

import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rename from 'gulp-rename';

import config, { getConfig } from '../config';
import bundleLogger from '../utils/bundleLogger';
import handleErrors from '../utils/handleErrors';
import concatenateFiles from '../utils/concatenateFiles';

const envDev = config.args.env === 'dev';

const b = browserify({
  entries: [`${config.src}/scripts/main.${config.extensions.scripts}`],
  extensions: [config.extensions.scripts],
  debug: envDev
});

const bundler = envDev ? watchify(b) : b;

const bundle = (done) => {
  bundleLogger.start();

  return bundler
    // -----------------
    // sourceType: module error, added babelify
    // and used it with transform, also don't forget
    // to catch errors after transform!
    .transform(babelify)
    .on('error', handleErrors)
    // -----------------
    .bundle()
    .on('error', handleErrors)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(envDev ? gutil.noop() : uglify())
    .on('error', handleErrors)
    .pipe(envDev ? gutil.noop() : header(config.banner))
    .pipe(envDev ? gutil.noop() : rename({
      suffix: '.min'
    }))
    .on('end', () => {
      if (envDev) {
        browserSync.reload();
      } else {
        done();
      }
      bundleLogger.end();
    })
    .pipe(gulp.dest(`${config.dist}/scripts`));
};

if (envDev) {
  bundler.on('update', bundle);
}

export function bundleApp(done) {
  if (envDev) {
    bundle();
    done();
  } else {
    bundle(done);
  }
}

export function bundleVendor(done) {
  const updatedConfig = getConfig();

  concatenateFiles({
    src: updatedConfig.vendors,
    dest: `${updatedConfig.dist}/scripts`,
    fileName: 'vendor.js'
  }, () => {
    if (!envDev) {
      const cmd = `./node_modules/.bin/uglifyjs ${updatedConfig.dist}/scripts/vendor.js \
        -o ${updatedConfig.dist}/scripts/vendor.min.js`;

      exec(cmd, (error) => {
        if (error !== null) {
          console.log(`exec error: ${error}`);
        } else {
          done();
        }
      });
    } else {
      done();
    }
  });
}
