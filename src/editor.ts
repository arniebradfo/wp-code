declare const wpCodeOptions;

class PostEditor {

	public standaloneCodeEditor: monaco.editor.IStandaloneCodeEditor;
	public wrapperElement = document.createElement("div");

	constructor(
		public textarea?: HTMLTextAreaElement
	) {		
		// this.wrapperElement.style.width  = '100%';
		// this.wrapperElement.style.height = '600px';
		// this.textarea.style.height = '100px';

		this.textarea.parentElement.appendChild(this.wrapperElement);
		this.standaloneCodeEditor = monaco.editor.create(this.wrapperElement, {
			value: textarea.value,
			language: 'html',
			theme: 'vs-dark',
		});

		this.standaloneCodeEditor.onDidChangeModelContent( (event) => {
			console.log(event);
			this.textarea.value = this.standaloneCodeEditor.getValue();
		})

		window.addEventListener('resize', this.resizeEditor.bind(this));

		this.matchTextAreaHeight();
		this.attachDragResizeCopier();

	}

	resizeEditor(event: Event) {
		console.log(event);
		this.standaloneCodeEditor.layout();
	}

	attachDragResizeCopier() {
		document.getElementById('content-resize-handle').addEventListener('mousedown', (e) => {
			console.log(e);
			
			document.addEventListener('mousemove', this.matchTextAreaHeight.bind(this));
		});
		document.addEventListener('mouseup', (e) => {
			document.removeEventListener('mousemove', this.matchTextAreaHeight.bind(this));
			// editor.refresh(); // TODO: put this somewhere else 
		});
	}

	matchTextAreaHeight() {
		this.wrapperElement.style.height = this.textarea.style.height;
		this.standaloneCodeEditor.layout();

	}

}

const postEditor = new PostEditor(document.querySelector('textarea#content'));

console.log(postEditor);
