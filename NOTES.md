# Hacking the classic editor
can override all kinds of default functions by
- loading after editor enqueues
  ```php
  add_action( 'wp_enqueue_editor', 'enque_js_to_override');
  ```
- and overriding exposed wp js globals
  ```js
    quicktags = function (settings) {
        console.log('hijackQuickTags with settings:\n', settings);
    }
  ```

override-able js could is:
- `switchEditors`
- `wp.editor`
    - `wp.editor.initialize(id, settings)`
- `quicktags`
- `editorExpand`

there are also several jquery events we can tap into
