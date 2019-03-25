import './public-path';
import * as monaco from 'monaco-editor';

console.log(self)

var editor;
var target = document.createElement("div"); 
var textarea = document.getElementById('content');
target.style = 'width:800px;height:600px;border:1px solid #ccc';
textarea.style = 'height: 100px';
textarea.parentElement.appendChild(target);

editor = monaco.editor.create(target, {
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

