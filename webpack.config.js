const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	// mode: 'production',

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
	},
	
	entry: {
		"app": './src/index.ts',
		"editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
		// "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
		// "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
		// "html.worker": 'monaco-editor/esm/vs/language/html/html.worker',
		// "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			  }
		]
	},
	plugins: [
		new UglifyJSPlugin()
	],
};
