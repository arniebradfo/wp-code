import PostEditor from "./editor-types/post-editor";
import SimpleEditor from "./editor-types/simple-editor";
import wpHtmlMonarchLanguage from "./wp-html.lang";
import './wp-code-styles.css';
import { interceptSwitchEditors, interceptQuickTags, interceptEditor } from "./intercept-editor";

console.log('loaded wp-code plugin')

const wpCode: { // global
    instances: (PostEditor | SimpleEditor)[]
} = {
    instances: []
}

monaco.languages.register({ id: 'wpHtml' });
monaco.languages.setMonarchTokensProvider('wpHtml', <monaco.languages.IMonarchLanguage>wpHtmlMonarchLanguage);

interceptQuickTags(settings => {
    console.log('hijacked quicktags and ran wp-code, settings:\n', settings);
    const textarea = document.getElementById(settings.id) as HTMLTextAreaElement;
    const editorType = settings.id === 'content' ? PostEditor : SimpleEditor;
    wpCode.instances.push(new editorType(textarea, settings.id))
});

// interceptSwitchEditors();
// interceptEditor((id, settings) => console.log('hijacked editor ', '\nid:\n', id, '\nsettings:\n', settings)

// Really wish this worked??
// declare const jQuery;
// const $ = jQuery;
// console.log($(document).on('wp-before-tinymce-init', (event, init) => console.log(event, init)))
// console.log($(document).on('wp-before-quicktags-init', (event, init) => console.log(event, init)))
// console.log($(document).one('wp-before-tinymce-init.text-widget-init', (event, init) => console.log(event, init)))
// $(document).trigger('wp-before-tinymce-init') // ???