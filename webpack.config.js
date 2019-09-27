var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = (env) => {
	const isDev = env === 'development';

	return {
		mode: env, // development | production
		entry: [
			'./src/react/installation-bundle.js'
		],
		output: {
			path: path.resolve(__dirname, 'dist/react'),
			publicPath: './dist/',
			filename: '[name].bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader', 'eslint-loader']
				},
				{
					test: /\.scss$/,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[name]_[local]_[hash:base64:5]',
								},
								url: false,
								sourceMap: isDev
							}
						},
						{
							loader: 'resolve-url-loader',
							options: {
								silent: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDev
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader'
					]
				}
			]
		},
		resolve: {
			extensions: ['*', '.js', '.jsx']
		},
		devtool: 'source-map',
		watch: isDev
	};
};

module.exports = [config];