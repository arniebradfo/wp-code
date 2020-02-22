import EditorDragResize from "./drag-resize";


// Loads when there is only a quicktags textarea, with the visual tab
// like comment replies

export default class SimpleEditor {

    public editor: monaco.editor.IStandaloneCodeEditor;
    public wrapperElement = document.createElement("div");
    public dragResize: EditorDragResize;

    private hideCss = 'visually-hidden'; // TODO: import this class name?


    constructor(
        public textarea: HTMLTextAreaElement,
        public id: string,
        startEditorImmediately: boolean = true
    ) {
        this.createEditor();
        this.stopEditor();
        if (startEditorImmediately)
            this.startEditor();
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

        window.addEventListener('resize', e => this.editor.layout()); // TODO: debounce or throttle
        this.dragResize = new EditorDragResize(this.editor, this.wrapperElement)
    }

    startEditor() {
        console.log('startEditor: ', this.id);
        // console.log(this.wrapperElement.style.display = '');

        // if (this.isTextTabActive) return
        this.wrapperElement.classList.remove(this.hideCss)
        this.textarea.classList.add(this.hideCss)

        this.editor.setValue(this.textarea.value);

        // TODO: restore selection state and position
    }

    stopEditor() {
        console.log('stopEditor: ', this.id);

        // if (this.isVisualTabActive) return;
        this.wrapperElement.classList.add(this.hideCss)
        this.textarea.classList.remove(this.hideCss)
    }


}