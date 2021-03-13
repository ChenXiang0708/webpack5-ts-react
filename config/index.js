'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const alias = require('./alias');

module.exports = {
  base: {
    alias,
  },
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/API': {
        // '/api':匹配项
        target: 'http://192.172.0.21:8081', // 接口的域名
        secure: false, //不检查安全问题。
        // 设置后，可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // 重写路径: 去掉路径中开头的'/api'
          '^/API': '',
        },
      },
      '/KMS': {
        // '/api':匹配项
        target: 'http://192.172.0.27:10001/', // 接口的域名
        secure: false, //不检查安全问题。
        // 设置后，可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // 重写路径: 去掉路径中开头的'/api'
          '^/KMS': '',
        },
      },
      '/MOCK': {
        // '/api':匹配项
        target: 'http://localhost:5000/', // 接口的域名
        secure: false, //不检查安全问题。
        // 设置后，可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          // 重写路径: 去掉路径中开头的'/api'
          '^/MOCK': '',
        }
      },
      // '/api': 'http://192.172.0.21:8081'
      //TODO 使用线上数据
      // '/api':'https://100.163.com'
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8888, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../public/dist'),
    assetsSubDirectory: 'res',
    assetsPublicPath: './',
    // assetsPublicPath: '//kdc.stu.126.net/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: false,
    // devtool: 'cheap-module-eval-source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
