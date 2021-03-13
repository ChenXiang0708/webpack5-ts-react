'use strict';
const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageConfig = require('../package.json');
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob');
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的App文件夹
// const PAGE_PATH = path.resolve(__dirname, '../src/App');
const PAGE_PATH = [
  path.resolve(__dirname, '../src/index.ts'),
  // path.resolve(__dirname, '../src/App/manual'),
  // path.resolve(__dirname, '../src/App/ops'),
];
// 用于生成后的文件,如果文件在key目录下，生成文件会生成value目录
const PAGE_NAME_KEY = {
  clientPages: 'client',
};
// 用于做相应的merge处理
const merge = require('webpack-merge');
const mode = process.env.BUILD_MODE;
let polyfillList = [
  // 'babel-polyfill'
];

function generateFileName(filePath) {
  let key = Object.keys(PAGE_NAME_KEY);
  let filename = [
    filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    ),
  ];
  for (let i = 0; i < key.length; i++) {
    if (filePath.indexOf(key[i]) !== -1) {
      filename.unshift(PAGE_NAME_KEY[key[i]] + '/');
      break;
    }
  }
  return filename.join('');
}

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
  let entryFiles = PAGE_PATH.reduce(
    (pre, path) => [...pre, ...glob.sync(path + '/*/*.ts')],
    []
  );
  if (entryFiles.length === 1) {
    return entryFiles;
  } else {
    let map = {};
    entryFiles.forEach(filePath => {
      let filename = generateFileName(filePath);
      map[filename] = polyfillList.concat(filePath);
    });
    return map;
  }
};

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
//如果pages 下有多个文件夹，说明是多页面应用，filename设置为index.html 即可
exports.htmlPlugin = function () {
  let entryHtml = PAGE_PATH.reduce(
    (pre, path) => [...pre, ...glob.sync(path + '/*/*.html')],
    []
  );
  if (entryHtml.length === 1) {
    let filename = generateFileName(entryHtml[0]);
    let conf = {
      // 文件名称
      template: '!!ejs-compiled-loader!' + entryHtml[0],
      favicon: './src/assets/favicon.ico',
      filename: 'index.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['vendor', 'manifest', filename],
      inject: true,
      // multihtmlCache: true
    };
    return [new HtmlWebpackPlugin(conf)];
  } else {
    let arr = [];
    entryHtml.forEach(filePath => {
      //是否是common目录下的文件
      if (filePath.indexOf('pages/common/') !== -1) {
        return;
      }
      let filename = generateFileName(filePath);
      let conf = {
        // 文件名称
        template: '!!ejs-compiled-loader!' + filePath,
        favicon: './src/assets/favicon.ico',
        filename: filename + '.html',
        // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
        chunks: ['vendor', 'manifest', filename],
        inject: true,
        // multihtmlCache: true
      };
      // 生产环境压缩
      if (process.env.NODE_ENV === 'production') {
        conf = merge(conf, {
          filename: filename + '.html',
          env: 'production',
          mode: mode,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
          },
          chunksSortMode: 'none',
        });
      }
      arr.push(new HtmlWebpackPlugin(conf));
    });
    return arr;
  }
};

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  options = options || {};

  const scssLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  const lessLoader = {
    loader: 'less-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  const styleLoader = {
    loader: 'style-loader',
  };

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
      // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
      importLoaders: 1,
      //根据满足您的正则表达式检查的文件名，为文件启用css模块。
      modules: {
        auto: /\.module\.\w+$/i,
        localIdentName: '[path][name]-[local]-[hash:5]',
      },
    },
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  // 生成加载器字符串，用于提取文本插件
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [styleLoader, cssLoader, postcssLoader]
      : [styleLoader, cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }
    //提取CSS时，该选项被指定
    //(生产构建期间的情况)
    if (options.extract) {
      loaders.shift();
      return [MiniCssExtractPlugin.loader].concat(loaders);
      // return loaders;
    } else {
      return loaders;
      // return ['vue-style-loader'].concat(loaders);
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true,
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

// 为独立样式文件生成加载器
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
      // exclude: [
      //     path.resolve(__dirname, 'node_modules'),
      //     path.resolve(__dirname, 'src/common')
      // ]
    });
  }
  return output;
};

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };
};
