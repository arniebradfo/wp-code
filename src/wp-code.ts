import PostEditor from "./post-editor";
import wpHtmlMonarchLanguage from "./wp-html.lang";

monaco.languages.register({ id: 'wpHtml' });
monaco.languages.setMonarchTokensProvider('wpHtml', <monaco.languages.IMonarchLanguage>wpHtmlMonarchLanguage);

// start the post editor
const textarea: HTMLTextAreaElement = document.querySelector('textarea#content');
let postEditor: PostEditor;
if (textarea) postEditor = new PostEditor(textarea);
