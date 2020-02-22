import PostEditor from "./editor-types/post-editor";
import wpHtmlMonarchLanguage from "./wp-html.lang";
import './wp-code-styles.css';
import { interceptSwitchEditors, interceptQuickTags, interceptEditor } from "./intercept-editor";

console.log('loaded wp-code plugin')

const wpCode: { // global
    instances: PostEditor[]
} = {
    instances: []
}


// Really wish this worked??
declare const jQuery;
const $ = jQuery;
console.log($(document).on('wp-before-tinymce-init', (event, init) => console.log(event, init)))
console.log($(document).on('wp-before-quicktags-init', (event, init) => console.log(event, init)))
// console.log($(document).one('wp-before-tinymce-init.text-widget-init', (event, init) => console.log(event, init)))
$(document).trigger('wp-before-tinymce-init') // ???

// interceptSwitchEditors();
interceptQuickTags(settings => {
    console.log('hijacked quicktags and ran wp-code, settings:\n', settings);
    const textarea = document.getElementById(settings.id) as HTMLTextAreaElement;
    wpCode.instances.push(new PostEditor(textarea, settings.id))
});
// interceptEditor((id, settings) => {
//     console.log('hijacked editor ', '\nid:\n', id, '\nsettings:\n', settings);
// })

monaco.languages.register({ id: 'wpHtml' });
monaco.languages.setMonarchTokensProvider('wpHtml', <monaco.languages.IMonarchLanguage>wpHtmlMonarchLanguage);

// removeQTags();

// // start the post editor
// const textarea: HTMLTextAreaElement = document.querySelector('textarea#content');
// let postEditor: PostEditor;
// if (textarea) postEditor = new PostEditor(textarea);


