import { Quicktags, SwitchEditors, Wp } from "../index";

declare let quicktags: Quicktags;
let switchEditors: SwitchEditors;
declare const wp: Wp;


export function interceptQuickTags(hijackQuickTagsCallback: Quicktags, ) {
    quicktags = hijackQuickTagsCallback
}


export function interceptSwitchEditors() {

    if (switchEditors == null) return;

    var oldGo = switchEditors.go
    switchEditors.go = (id, mode) => {
        console.log(id, mode);
        oldGo(id, mode);
    }

    // this hijacks the SwitchEditors.switchEditors() click event setup in SwitchEditors.init()
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


