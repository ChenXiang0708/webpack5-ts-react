const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const utils = require('./utils');
const config = require('../config');

const PUBLIC_PATH =
  process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath;

module.exports = {
	entry: "./src/index",
	output: {
		publicPath: PUBLIC_PATH,
		filename: '[name].js',
		chunkFilename: '[name].min.js',
		path: config.build.assetsRoot
	},
	module: {
		rules: [
			...utils.styleLoaders({
				sourceMap: config.dev.cssSourceMap,
				usePostCSS: true,
			}),
			{
				test: /\.(tsx|ts)?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(html|htm)$/,
				// loader: 'html-loader',
				loader: 'html-withimg-loader',
				options: {
					attrs: ['data-src'],
				},
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]'),
				},
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]'),
				},
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
				},
			},
		]
	},
	externals: {
		// echarts: 'echarts',
		// ReactEcharts: 'echarts-for-react'
	},

	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		//可以全局使用框架,不需要import
		new webpack.ProvidePlugin({
			// CSSModules: 'react-css-modules',
			React: 'react',
			// useSetState: ['ahooks', 'useSetState']
		}),

		new MiniCssExtractPlugin({
			filename: 'style/[name].css'
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			favicon: "./public/favicon.png",
			// filename: 'index.html',
			// inject: true,
			// chunks: ['vendor', 'manifest', filename],
		})
	],
	resolve: {
		// 能够使用户在引入模块时不带扩展 a.js 变成a：
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
		alias: config.base.alias,
		fallback: {
			fs: false,
			setImmediate: false,
			dgram: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty',
		}
	}


}