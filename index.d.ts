// / <reference path="./node_modules/monaco-editor/monaco.d.ts" />

// declare module "*.css" {
//     const content: any;
//     export default content;
// }

export interface Wp {
    editor: {
        initialize: WpEditorInitialize,
        remove: (id: string) => void,
        getContent: (id: string) => string // returns editor content
    }
}

export interface WpEditorInitialize {
    (
        id: string,
        settings: {
            tinymce: any | true,
            quicktags: any | true,
        }
    ): void
}

export interface Quicktags {
    (settings: {
        id: string, // the HTML ID of the textarea, required
        buttons: string // Comma separated list of the names of the default buttons to show. Optional.
    }): any
}

export interface SwitchEditors {
    go: (
        id: string, //The id of the editor you want to change the editor mode for. Default: `content`.
        mode: 'toggle' | 'tmce' | 'html' | string, //The mode you want to switch to. Default: `toggle`.
    ) => void,
    // wpautop: (
    //     text: string // The content from the text editor.
    // ) => string, // filtered content.
    // pre_wpautop: (html: string) => string
    // _wp_Autop: (e)
    // _wp_Nop: (e)
}