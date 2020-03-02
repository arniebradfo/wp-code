import SimpleEditor from "./simple-editor";


export default class DiscussionEditor extends SimpleEditor {

    constructor(
        public textarea: HTMLTextAreaElement,
        public id: string,
    ) {
        super(textarea, id, false);
    }

}