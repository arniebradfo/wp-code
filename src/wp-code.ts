import PostEditor from "./post-editor";
import wordpressCodeMonarchLanguage from "./wordpress-post.language";

monaco.languages.register({ id: 'wordpressCode' });
monaco.languages.setMonarchTokensProvider('wordpressCode', wordpressCodeMonarchLanguage);

// start the post editor
const textarea: HTMLTextAreaElement = document.querySelector('textarea#content');
let postEditor: PostEditor;
if (textarea) postEditor = new PostEditor(textarea);
