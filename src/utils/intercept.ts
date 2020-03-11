export function interceptFun<T extends Function>(fun: T, runBefore: T | null = null, runAfter: T | null = null, cancel = false) {
    // TODO: create a custom event for these?
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events

    // https://blakeembrey.com/articles/2014/01/wrapping-javascript-functions/
    // https://stackoverflow.com/a/326693/5648839
    // wish we could just use Typescript's @decorators onFunctions() but we cant, only classes :(

    return function () {

        if (runBefore != null)
            runBefore.apply(this, arguments)

        let returnFun;
        if (!cancel)
            returnFun = fun.apply(this, arguments)

        if (runAfter != null)
            runAfter.apply(this, arguments)

        return returnFun
    }
}

// TODO: interceptFun on this too?
// declare let switchEditors: SwitchEditors;
// export function interceptSwitchEditors() {

//     try {

//         var oldGo = switchEditors.go
//         switchEditors.go = (id, mode) => {
//             console.log(id, mode);
//             oldGo(id, mode);
//         }

//         // this hijacks the SwitchEditors.switchEditors() click event setup in SwitchEditors.init()
//         const oldSwitchEditorTabClass = 'wp-switch-editor'
//         const newSwitchEditorTabClass = oldSwitchEditorTabClass + '-intercepted'
//         let switchEditorTabs = document.querySelectorAll('.' + oldSwitchEditorTabClass)

//         for (let i = 0; i < switchEditorTabs.length; i++) {
//             const tab = switchEditorTabs[i];
//             tab.classList.replace(oldSwitchEditorTabClass, newSwitchEditorTabClass)
//         }

//         document.addEventListener('click', (event) => {
//             var id, mode,
//                 target = event.target as HTMLElement

//             if (target.classList.contains(newSwitchEditorTabClass)) {
//                 id = target.dataset.wpEditorId // .attr('data-wp-editor-id');
//                 mode = target.classList.contains('switch-tmce') ? 'tmce' : 'html';
//                 switchEditors.go(id, mode);
//             }
//         });

//     } catch (error) {

//     }

// }


