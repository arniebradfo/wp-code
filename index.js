import './public-path';
import * as monaco from 'monaco-editor';


self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return window.__webpack_public_path__+'json.worker.bundle.js';
		}
		if (label === 'css') {
			return window.__webpack_public_path__+'/css.worker.bundle.js';
		}
		if (label === 'html') {
			return window.__webpack_public_path__+'/html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return window.__webpack_public_path__+'/ts.worker.bundle.js';
		}
		return window.__webpack_public_path__+'/editor.worker.bundle.js';
	}
}


var editor;
var target = document.createElement("div"); 
var textarea = document.getElementById('content');
target.style = 'width:800px;height:600px;border:1px solid #ccc';
textarea.style = 'height: 100px';
textarea.parentElement.appendChild(target);

editor = monaco.editor.create(target, {
	value: textarea.value,
	language: 'html'
});

console.log(
	'loaded!',
	monaco,
	target,
	editor,
	wpCodeOptions
);

