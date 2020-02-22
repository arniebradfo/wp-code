export default class EditorDragResize {

    public isResizing = false;
    private yStartPosition = 0;
    private newHeight = 0;
    private minEditorHeight = 200;
    private editorHeight = 500;
    private resizeHandle: HTMLElement;

    constructor(
        public editor: monaco.editor.IStandaloneCodeEditor,
        public wrapperElement: HTMLElement,
    ) {
        this.attachDragResize(500)
    }

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
}