import SimpleEditor from "./simple-editor";

// TODO: move these index.d.ts
declare const wpCodeOptions: {
	// inserted via init.php
	publicPath: string;
}
declare let send_to_editor: (html: string) => void; // inserts content into the editor
declare let wpActiveEditor: 'content' | string; // not 100% on what this does

export default class PostEditor extends SimpleEditor {

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
		public textarea: HTMLTextAreaElement,
		public id: string
	) {
		super(textarea, id, false, true);
		this.wrapperElement.classList.add('wpCode-monaco-wrapper--post-editor')

		this.findElements();
		this.attachEditorStateChanges();
		window.addEventListener('load', this.attachRemapAddMedia.bind(this))

		if (this.isTextTabActive)
			this.startEditor();

	}

	findElements() {
		this.textTab = document.getElementById('content-html');
		this.visualTab = document.getElementById('content-tmce');
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

	attachEditorStateChanges() {
		this.textTab.addEventListener('click', e => {
			window.setTimeout(this.startEditor.bind(this), 0);
		});
		this.visualTab.addEventListener('click', e => {
			window.setTimeout(this.stopEditor.bind(this), 0);
		});
	}

}
