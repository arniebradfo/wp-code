import SimpleEditor from "./simple-editor";
import { interceptFun } from "../utils/intercept";

declare const commentReply;

export default class DiscussionEditor extends SimpleEditor {

    private startDelay: number = 1000; // edit-comment.js:1194 ...fadeOut(200

    constructor(
        public textarea: HTMLTextAreaElement,
        public id: string,
    ) {
        super(textarea, id, false);
        this.remapCommentReply();
    }

    private remapCommentReply() {
        // if (commentReply == null) return; 

        // remapping these here assumes there is only ever one comment reply instance on a page?
        commentReply.open = interceptFun<(comment_id:number, post_id:number, action:'edit'|'replyto') => void>(commentReply.open, null, this.open.bind(this));
        commentReply.send = interceptFun<() => void>(commentReply.send, null, this.send.bind(this));
    }

    private open(comment_id:number, post_id:number, action:'edit'|'replyto') {
        console.log('commentReply.open intercepted', post_id, comment_id, action)
        // window.setTimeout(this.startEditor.bind(this), this.startDelay)
        this.startEditor()
    }

    private send() {
        console.log('commentReply.send intercepted')
        this.stopEditor()
    }

}
