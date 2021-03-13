const path = require('path');
const { merge } = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.js');
const utils = require('./utils');
const resolve = dir => path.resolve(__dirname, dir);
const config = require('../config');
process.noDeprecation = true
const devWebpackConfig = merge(baseWebpackConfig, {
	mode: "development",
	devServer: {
		contentBase: resolve('./dist'),
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{
					from: /.*/,
					to: path.posix.join(config.dev.assetsPublicPath, 'index.html'),
				},
			],
		},
		hot: true,
		contentBase: false, // since we use CopyWebpackPlugin.
		compress: true,
		host: config.dev.host,
		port: config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay
			? { warnings: false, errors: true }
			: false,
		// publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true, // necessary for FriendlyErrorsPlugin
		// watchOptions: {
		// 	ignored: [/node_modules/, /lib/],
		// 	poll: config.dev.poll,
		// },
		// headers: {
		// 	'Access-Control-Allow-Origin': '*',
		// },
	},
	devtool: 'eval-cheap-source-map',


})

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port;
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err);
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port;
			// add port to devServer config
			devWebpackConfig.devServer.port = port;

			// Add FriendlyErrorsPlugin
			devWebpackConfig.plugins.push(
				new FriendlyErrorsPlugin({
					compilationSuccessInfo: {
						messages: [
							`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
						],
					},
					onErrors: config.dev.notifyOnErrors
						? utils.createNotifierCallback()
						: undefined,
				})
			);
			resolve(devWebpackConfig);
		}
	});
});