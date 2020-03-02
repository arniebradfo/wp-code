import PostEditor from "./editor-types/post-editor";
import SimpleEditor from "./editor-types/simple-editor";
import wpHtmlMonarchLanguage from "./langs/wp-html.lang";
import './wp-code.css';
import { interceptFun } from "./utils/intercept";
import DiscussionEditor from "./editor-types/discussion-editor";
import { SwitchEditors, Quicktags, Wp } from "../index";

declare let quicktags: Quicktags;
declare let switchEditors: SwitchEditors;
declare const commentReply;
declare const wp: Wp;

console.log('loaded wp-code plugin')

const wpCode: { // global
    instances: (SimpleEditor)[]// TODO: make IWpEditor interface for here
} = {
    instances: []
}

monaco.languages.register({ id: 'wpHtml' });
monaco.languages.setMonarchTokensProvider('wpHtml', <monaco.languages.IMonarchLanguage>wpHtmlMonarchLanguage);

const editorTypeMap = {
    'content': PostEditor,
    'replycontent': DiscussionEditor
}

const hijackQuickTags = settings => {
    console.log('hijacked quicktags and ran wp-code, settings:\n', settings);
    const textarea = document.getElementById(settings.id) as HTMLTextAreaElement;
    const editorType = editorTypeMap.hasOwnProperty(settings.id) ? editorTypeMap[settings.id] : SimpleEditor;
    wpCode.instances.push(new editorType(textarea, settings.id))
};

quicktags = interceptFun<(settings) => void>(quicktags, hijackQuickTags, null, true)

// TODO: setup comment switching, possibly in DiscussionEditor
commentReply.addcomment = interceptFun<(post_id) => void>(commentReply.addcomment, (post_id) => console.log('commentReply.addcomment intercepted', post_id));
commentReply.send = interceptFun<() => void>(commentReply.send, () => console.log('commentReply.send intercepted'));

// TODO: intercept switch editors

// TODO: this doesn't seem to run soon enough...
// wp.editor.initialize = interceptFun<(id, settings) => void>(wp.editor.initialize, (id, settings) => console.log(id, settings));
