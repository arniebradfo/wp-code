import SimpleEditor from "../editor-types/simple-editor";
import './scroll-editor-or-page.css';

// TODO: rename to scrollEditor vs scrollPage terminology
// TODO: test on touch?

export default class ScrollEditorOrPage {

    private timing: number = 33;
    private scrollCssClass = 'scrollTarget';

    constructor(
        private wpEditor: SimpleEditor
    ) {
        // this.editor.onDidScrollChange(e => console.log(e)); // only changes 
        this.wpEditor.wrapperElement.addEventListener('wheel', this.maybeScrollPage.bind(this), true)
    }

    getEditorScrolledTo(): ScrolledTo {
        // console.log(
        // this.wpEditor.editor.getScrollHeight(),
        // this.wpEditor.editor.getScrollTop(), 
        // this.wpEditor.editor.getContentHeight(), 
        // this.wpEditor.editor.getLayoutInfo().height, 
        // this.wpEditor.editor.getLayoutInfo().height + this.wpEditor.editor.getScrollTop()
        // );

        if (this.wpEditor.editor.getScrollHeight() > this.wpEditor.editor.getContentHeight()) // at top
            return ScrolledTo.CantScroll;
        else if (this.wpEditor.editor.getScrollTop() === 0)
            return ScrolledTo.Top;
        else if (this.wpEditor.editor.getLayoutInfo().height + this.wpEditor.editor.getScrollTop() === this.wpEditor.editor.getScrollHeight())
            return ScrolledTo.Bottom;
        else
            return ScrolledTo.Middle;
    }

    private maybeScrollPage(event: WheelEvent) {

        const scrolledTo = this.getEditorScrolledTo()
        if (scrolledTo === ScrolledTo.Middle)
            return

        const scrollDirection = event.deltaY > 0 ? ScrollDirection.Down : ScrollDirection.Up;

        if (scrolledTo === ScrolledTo.CantScroll)
            this.scrollPage()
        else if (scrollDirection === ScrollDirection.Down && scrolledTo === ScrolledTo.Bottom)
            this.scrollPage()
        else if (scrollDirection === ScrollDirection.Up && scrolledTo === ScrolledTo.Top)
            this.scrollPage()

        this.maybeScrollEditor()
    }

    private isScrolling: number;
    private maybeScrollEditor() {
        window.clearTimeout(this.isScrolling);
        this.isScrolling = window.setTimeout(this.scrollEditor.bind(this), this.timing);
    }

    private scrollEditor() {
        this.wpEditor.wrapperElement.classList.remove(this.scrollCssClass)
    }
    private scrollPage() {
        this.wpEditor.wrapperElement.classList.add(this.scrollCssClass)
    }

}

enum ScrolledTo {
    CantScroll,
    Top,
    Middle,
    Bottom
}

enum ScrollDirection {
    Up,
    Down
}
