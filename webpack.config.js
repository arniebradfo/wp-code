const path = require('path');
// const webpack = require('webpack');
// import path from 'path';
// import webpack from 'webpack';

// const ASSET_PATH = process.env.ASSET_PATH || '/';


module.exports = {
	mode: 'development',
	entry: {
		"app": './index.js',
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		"json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		"css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		"html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		"ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/wp-content/plugins/wp-code-dev/dist/'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},
	// plugins: [
	// 	// This makes it possible for us to safely use env vars on our code
	// 	new webpack.DefinePlugin({
	// 		'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
	// 	})
	// ]
};
