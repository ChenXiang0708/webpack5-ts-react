'use strict';
require('./check-versions')();

process.env.NODE_ENV = 'production';
process.env.BUILD_MODE = '';

if (!!process.argv[2] && process.argv[2] === 'online') {
  process.env.BUILD_MODE = 'online';
}

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackDllConfig = require('./webpack.dll');

const spinner = ora('构建中...');
spinner.start();

function buildDll() {
  return new Promise((resolve, reject) => {
    webpack(webpackDllConfig, (err, stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false,
        }) + '\n\n'
      );

      if (stats.hasErrors()) {
        console.log(chalk.red('  构建失败并有错误.\n'));
        reject();
        process.exit(1);
      }

      console.log(chalk.cyan('  建立完整的.\n'));
      console.log(
        chalk.yellow(
          '  提示:构建的文件是通过HTTP服务器提供的.\n' +
            "  在file://上打开index.html不起作用.\n"
        )
      );
      resolve();
    });
  });
}

function buildProject(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false,
        }) + '\n\n'
      );

      if (stats.hasErrors()) {
        console.log(chalk.red('  构建失败并有错误.\n'));
        reject();
        process.exit(1);
      }

      console.log(chalk.cyan('  Build complete.\n'));
      console.log(
        chalk.yellow(
          '  提示:构建的文件是通过HTTP服务器提供的.\n' +
            "  在file://上打开index.html不起作用.\n"
        )
      );
      resolve();
    });
  });
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  if (process.env.BUILD_MODE === 'online') {
    buildDll()
      .then(() => {
        return require('./webpack.prod');
      })
      .then(function (config) {
        return buildProject(config);
      });
  } else {
    buildDll()
      .then(() => {
        return require('./webpack.prod');
      })
      .then(function (config) {
        return buildProject(config);
      });
  }
});
