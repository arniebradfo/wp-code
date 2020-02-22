declare const wpCodeOptions: {
	// inserted via init.php
	publicPath: string;
}
declare let send_to_editor: (html: string) => void; // inserts content into the editor
declare let wpActiveEditor: 'content' | string; // not 100% on what this does

const hideCss = 'visually-hidden'

class PostEditor {

	public editor: monaco.editor.IStandaloneCodeEditor;
	public wrapperElement = document.createElement("div");
	textTab: HTMLElement;
	visualTab: HTMLElement;

	public get isVisualEnabled(): boolean {
		// TODO: this is part of a wp.property somewhere?
		return document.getElementById('content-tmce') != null;
	}
	public get isVisualTabActive(): boolean {
		// TODO: this is part of a wp.property somewhere?
		return document.getElementsByClassName('tmce-active')[0] != null;
	}
	public get isTextTabActive(): boolean {
		return !this.isVisualTabActive;
	}

	constructor(
		public textarea?: HTMLTextAreaElement
	) {
		this.findElements();
		this.createEditor();
		this.attachEditorStateChanges();
		this.stopEditor();
		if (this.isTextTabActive)
			this.startEditor();

		window.addEventListener('load', this.attachRemapAddMedia.bind(this))
	}

	findElements() {
		this.textTab = document.getElementById('content-html');
		this.visualTab = document.getElementById('content-tmce');
	}

	createEditor() {
		this.wrapperElement.style.height = this.textarea.style.height || '500px'; // TODO: where does this come from?
		this.textarea.parentElement.appendChild(this.wrapperElement);
		this.editor = monaco.editor.create(this.wrapperElement, {
			// value: this.textarea.value,
			// language: 'html',
			// scrollBeyondLastLine: false,
			language: 'wpHtml',
			theme: 'vs-dark',
		});

		this.editor.onDidChangeModelContent(e => {
			this.textarea.value = this.editor.getValue();
		})

		window.addEventListener('resize', e => this.editor.layout());
		this.attachDragResize(500);
	}

	attachRemapAddMedia() {
		var sendToVisualEditor = send_to_editor;
		var sendToWhichEditor = (html: string) => {
			if (this.isTextTabActive && wpActiveEditor === 'content') {
				// https://stackoverflow.com/a/48764277/5648839
				var selection = this.editor.getSelections()[0];
				var range = new monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn);
				this.editor.executeEdits('wpAddMediaButton', [{ text: html, range: range }])
			} else {
				sendToVisualEditor(html);
			}
		};
		send_to_editor = sendToWhichEditor;
	}


	//#region editor lifecycle // 
	attachEditorStateChanges() {
		this.textTab.addEventListener('click', e => {
			window.setTimeout(this.startEditor.bind(this), 0);
		});
		this.visualTab.addEventListener('click', e => {
			window.setTimeout(this.stopEditor.bind(this), 0);
		});
	}

	startEditor() {
		console.log('startEditor');
		// console.log(this.wrapperElement.style.display = '');

		// if (this.isTextTabActive) return
		this.wrapperElement.classList.remove(hideCss)
		this.textarea.classList.add(hideCss)

		this.editor.setValue(this.textarea.value);

		// TODO: restore selection state and position
	}

	stopEditor() {
		console.log('stopEditor');

		// if (this.isVisualTabActive) return;
		this.wrapperElement.classList.add(hideCss)
		this.textarea.classList.remove(hideCss)
	}
	//#endregion


	//#region Drag Resize //
	public isResizing = false;
	private yStartPosition = 0;
	private newHeight = 0;
	private minEditorHeight = 200;
	private editorHeight = 500;
	private resizeHandle: HTMLElement;

	// attaches a dragger to the bottom right of the theme/plugin editor to control editor height
	private attachDragResize(editorHeightSet: number) {
		this.newHeight = this.editorHeight = parseInt(this.wrapperElement.style.height);
		// this.wrapperElement.style.height = this.editorHeight + 'px';

		this.resizeHandle = document.getElementById('content-resize-handle')
		if (!this.resizeHandle) {
			// if there is no resize handle, make one and append it
			this.resizeHandle = document.createElement('div');
			this.resizeHandle.className = 'wpCode-content-resize-handle';
			this.resizeHandle.id = 'content-resize-handle';
			this.wrapperElement.appendChild(this.resizeHandle);
		}
		this.resizeHandle.addEventListener('mousedown', this.startDragResize.bind(this));
	}

	private handleDragResize_bind = this.handleDragResize.bind(this);
	private handleDragResize(event) {
		this.newHeight = this.editorHeight + (event.pageY - this.yStartPosition);
		this.wrapperElement.style.height = Math.max(this.minEditorHeight, this.newHeight) + 'px';
		this.editor.layout();
	}

	private startDragResize_bind = this.startDragResize.bind(this);
	private startDragResize(event) {
		this.yStartPosition = event.pageY;
		this.isResizing = true;
		document.addEventListener('mousemove', this.handleDragResize_bind);
		document.addEventListener('mouseup', this.completeDragResize_bind);
		event.preventDefault();
	}

	private completeDragResize_bind = this.completeDragResize.bind(this);
	private completeDragResize(event) {
		this.isResizing = false;
		this.editorHeight = Math.max(this.minEditorHeight, this.newHeight);
		document.removeEventListener('mousemove', this.handleDragResize_bind);
		document.removeEventListener('mouseup', this.completeDragResize_bind);
		this.editor.layout();
	}
	//#endregion //
}

export default PostEditor;