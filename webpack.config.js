const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	mode: 'development',
	entry: {
		"app": './entry.js',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		// publicPath: '/' 
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	plugins: [
		new MonacoWebpackPlugin(), // TODO: options
		new LiveReloadPlugin()
	]
};
