declare const wp: {
    editor: {
        initialize: (
            id: string,
            settings: {
                tinymce: any | true,
                quicktags: any | true,
            }
        ) => void,
        remove: (id: string) => void,
        getContent: (id: string) => string // returns editor content
    }
}

declare let quicktags: (
    settings: {
        id: string, // the HTML ID of the textarea, required
        buttons: string   // Comma separated list of the names of the default buttons to show. Optional.
    }) => any;

declare let switchEditors
declare let SwitchEditors

function interceptEditor() {

    var oldGo = switchEditors.go
    switchEditors.go = (id, mode) => {
        console.log(id, mode);
        oldGo(id, mode)
    }

    const oldSwitchEditorTabClass = 'wp-switch-editor'
    const newSwitchEditorTabClass = oldSwitchEditorTabClass + '-stolen'
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

}

export default interceptEditor;