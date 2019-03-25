import './global-imports';

// NONE OF THIS WORKs WITH TYPESCRIPT //
// import * as something from 'monaco-editor'
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import  './node_modules/monaco-editor/monaco'
// import * as anything from './node_modules/monaco-editor/monaco';
// import * as monaco from 'monaco-editor';
// import { monaco } from 'monaco-editor';

declare const wpCodeOptions;

console.log(self)

var target = document.createElement("div"); 
var textarea: HTMLTextAreaElement = document.querySelector('textarea#content');
target.style.width = '100';
target.style.height = '600px';
textarea.style.height = '100px';
textarea.parentElement.appendChild(target);

var editor = monaco.editor.create(target, {
	value: textarea.value,
	language: 'html',
	theme: 'vs-dark',
});

console.log(
	'loaded!',
	monaco,
	target,
	editor,
	wpCodeOptions
);
