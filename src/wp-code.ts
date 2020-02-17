import PostEditor from "./post-editor";
import wpHtmlMonarchLanguage from "./wp-html.lang";
import './wp-code-styles.css';
import { interceptSwitchEditors, interceptQuickTags, interceptEditor } from "./intercept-editor";

console.log('loaded wp-code plugin')

const wpCode: { // global
    instances: PostEditor[]
} = {
    instances: []
}

interceptSwitchEditors();
interceptQuickTags(settings => {
    console.log('hijacked quicktags and ran wp-code, settings:\n', settings);
    const textarea = document.getElementById(settings.id) as HTMLTextAreaElement;
    wpCode.instances.push(new PostEditor(textarea))
});
interceptEditor((id, settings) => {
    console.log('hijacked editor ', '\nid:\n', id, '\nsettings:\n', settings);
})

monaco.languages.register({ id: 'wpHtml' });
monaco.languages.setMonarchTokensProvider('wpHtml', <monaco.languages.IMonarchLanguage>wpHtmlMonarchLanguage);

// removeQTags();

// // start the post editor
// const textarea: HTMLTextAreaElement = document.querySelector('textarea#content');
// let postEditor: PostEditor;
// if (textarea) postEditor = new PostEditor(textarea);


