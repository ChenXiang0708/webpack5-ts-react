const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
const path = require('path');

const baseWebpackConfig = require('./webpack.base.js');
const config = require('../config');
const utils = require('./utils');


const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
          output: {
            // 最紧凑的输出
            beautify: true,
            // 删除所有的注释
            comments: true,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        chunks: 'initial', // 只对入口文件处理
        vendor: {
          // test: /([\\/]node_modules[\\/])|([\\/]lib[\\/])/,
          test: /([\\/]node_modules[\\/])/,
          name: 'vendor',
          chunks: 'all',
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 3,
          chunks: 'async',
          name: 'async-vendors',
        },
      },
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require('./vendor-manifest.json'),
    }),
    // 将css提取到它自己的文件中
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    new BundleAnalyzerPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ],
  devtool: false,
  //选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
  performance: {
    hints: false
  },
});
//是否开启gzip
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
};

//webpack的可视化资源分析工具
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
};

module.exports = webpackConfig;