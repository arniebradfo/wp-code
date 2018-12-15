// import * as monaco from '../node_modules/monaco-editor/esm/vs/editor/editor.api.js';
import './imports';

(<any>self).MonacoEnvironment = {
	getWorkerUrl: function (moduleId:any, label:any) {
		// if (label === 'json') {
		// 	return './json.worker.bundle.js';
		// }
		// if (label === 'css') {
		// 	return './css.worker.bundle.js';
		// }
		// if (label === 'html') {
		// 	return './html.worker.bundle.js';
		// }
		// if (label === 'typescript' || label === 'javascript') {
		// 	return './ts.worker.bundle.js';
		// }
		return '/wp-content/plugins/wordpress-code/dist/editor.worker.bundle.js';
	}
}

setTimeout(() => {
	const textarea = document.getElementById('post-content-1');
	console.log(textarea);
	
	monaco.editor.create(textarea, {
		// value: [
		// 	'from banana import *',
		// 	'',
		// 	'class Monkey:',
		// 	'	# Bananas the monkey can eat.',
		// 	'	capacity = 10',
		// 	'	def eat(self, N):',
		// 	'		\'\'\'Make the monkey eat N bananas!\'\'\'',
		// 	'		capacity = capacity - N*banana.size',
		// 	'',
		// 	'	def feeding_frenzy(self):',
		// 	'		eat(9.25)',
		// 	'		return "Yum yum"',
		// ].join('\n'),
		language: 'html'
	});
}, 5000);


// monaco.editor
console.dir(monaco.languages.json.jsonDefaults );