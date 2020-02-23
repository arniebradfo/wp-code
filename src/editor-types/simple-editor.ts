import EditorDragResize from "./drag-resize";
import { EDITOR_MIN_HEIGHT } from "../constants";


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
        startEditorImmediately: boolean = true,
        private lookForResizeHandle: boolean = false
    ) {
        // return; // turn off for debug 
        this.createEditor();
        this.stopEditor();
        if (startEditorImmediately)
            this.startEditor();
    }

    createEditor() {
        const textareaHeight = this.textarea.getBoundingClientRect().height
        this.wrapperElement.id = 'wpCode-' + this.id
        this.wrapperElement.classList.add('wpCode-monaco-wrapper')
        console.log(this.wrapperElement, textareaHeight);

        this.wrapperElement.style.height = Math.max(textareaHeight, EDITOR_MIN_HEIGHT) + 'px';

        this.textarea.parentElement.appendChild(this.wrapperElement);
        this.editor = monaco.editor.create(this.wrapperElement, {
            // value: this.textarea.value,
            // language: 'html',
            scrollBeyondLastLine: false,
            language: 'wpHtml',
            theme: 'vs-dark',
        });

        this.editor.onDidChangeModelContent(e => {
            this.textarea.value = this.editor.getValue();
        })

        window.addEventListener('resize', e => this.editor.layout()); // TODO: debounce or throttle
        this.dragResize = new EditorDragResize(this.editor, this.wrapperElement, this.lookForResizeHandle)
    }

    startEditor() {
        console.log('startEditor: ', this.id);
        this.wrapperElement.classList.remove(this.hideCss)
        this.textarea.classList.add(this.hideCss)
        this.editor.setValue(this.textarea.value);
    }

    stopEditor() {
        console.log('stopEditor: ', this.id);
        this.wrapperElement.classList.add(this.hideCss)
        this.textarea.classList.remove(this.hideCss)
    }


}