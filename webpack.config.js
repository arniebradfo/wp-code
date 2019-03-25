const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	mode: 'development',
	entry: {
		"app": './index.js',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		// publicPath: '/' // will be redefined?
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},
	plugins: [
		new MonacoWebpackPlugin(),
		new LiveReloadPlugin()
	  ]
};
