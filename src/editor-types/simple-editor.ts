import EditorDragResize from "../editor-parts/drag-resize";
import { EDITOR_MIN_HEIGHT } from "../utils/constants";
import './simple-editor.css';
import ScrollEditorOrPage from "../editor-parts/scroll-editor-or-page";

// Loads when there is only a quicktags textarea, with the visual tab
// like comment replies - note even...

export default class SimpleEditor {

    public editor: monaco.editor.IStandaloneCodeEditor;
    public wrapperElement = document.createElement("div");
    public dragResize: EditorDragResize;
    public scrollEditorOrPage: ScrollEditorOrPage;

    private hideCss = 'visually-hidden'; // TODO: import this class name?


    constructor(
        public textarea: HTMLTextAreaElement,
        public id: string,
        startEditorImmediately: boolean = true,
        public lookForResizeHandle: boolean = false
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
        this.scrollEditorOrPage = new ScrollEditorOrPage(this)

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