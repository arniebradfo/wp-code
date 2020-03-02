import { Quicktags, SwitchEditors, Wp, WpEditorInitialize } from "../../index";

declare let quicktags: Quicktags;
declare let switchEditors: SwitchEditors;
declare const commentReply;
declare const wp: Wp;

// TODO: create a custom event for these?
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
// ...and/or create a wrapper function that intercepts any function? - run it a multiple intervals?s
// https://blakeembrey.com/articles/2014/01/wrapping-javascript-functions/


export function interceptFun<T extends Function>(fun: T, runBefore: T | null = null, runAfter: T | null = null, cancel = false) {
    // https://blakeembrey.com/articles/2014/01/wrapping-javascript-functions/
    // https://stackoverflow.com/a/326693/5648839
    // wish we could just use Typescript's @decorators onFunctions() but we cant, only classes :(

    return function () {

        if (runBefore != null)
            runBefore.apply(this, arguments)

        const returnFun = fun.apply(this, arguments)

        if (runAfter != null)
            runAfter.apply(this, arguments)

        if (cancel) return
        else return returnFun
    }
}


/// DELETE BELOW ///

export function interceptQuickTags(hijackQuickTagsCallback: Quicktags, ) {
    quicktags = hijackQuickTagsCallback
}

export function interceptEditor(editorInitCallback: WpEditorInitialize) {
    // this doesn't seem to run soon enough...
    const oldWpEditorInitialize = wp.editor.initialize
    wp.editor.initialize = (id, settings) => {
        editorInitCallback(id, settings)
        oldWpEditorInitialize(id, settings)
    }
}

export function interceptCommentReply(addcomment: (post_id: number) => void, send: () => void) {
    const oldAddComment = commentReply.addcomment
    commentReply.addcomment = (post_id) => {
        addcomment(post_id)
        oldAddComment(post_id)
    }

    const oldSend = commentReply.send
    commentReply.send = () => {
        send()
        oldSend()
    }
}

export function interceptSwitchEditors() {

    try {

        var oldGo = switchEditors.go
        switchEditors.go = (id, mode) => {
            console.log(id, mode);
            oldGo(id, mode);
        }

        // this hijacks the SwitchEditors.switchEditors() click event setup in SwitchEditors.init()
        const oldSwitchEditorTabClass = 'wp-switch-editor'
        const newSwitchEditorTabClass = oldSwitchEditorTabClass + '-intercepted'
        let switchEditorTabs = document.querySelectorAll('.' + oldSwitchEditorTabClass)

        for (let i = 0; i < switchEditorTabs.length; i++) {
            const tab = switchEditorTabs[i];
            tab.classList.replace(oldSwitchEditorTabClass, newSwitchEditorTabClass)
        }

        document.addEventListener('click', (event) => {
            var id, mode,
                target = event.target as HTMLElement

            if (target.classList.contains(newSwitchEditorTabClass)) {
                id = target.dataset.wpEditorId // .attr('data-wp-editor-id');
                mode = target.classList.contains('switch-tmce') ? 'tmce' : 'html';
                switchEditors.go(id, mode);
            }
        });

    } catch (error) {

    }

}


