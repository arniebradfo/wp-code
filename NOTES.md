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


## GUTENBERG: trying to get HESH to save the value changes from the textarea
this is the [TextareaControl](https://wordpress.org/gutenberg/handbook/designers-developers/developers/components/textarea-control/) component
```JS
editor.on('change', function () { 
	editor.save(); 
	wp.data.dispatch( 'core/editor' ).resetBlocks(wp.blocks.parse(editor.getTextArea().value)) // this works

	// // editor.getTextArea().focus();
	// // window.setTimeout(function(){
	// 	editor.save(); 
	// // },10);
	// console.log(Object.keys(editor.getTextArea()).find(
	// 	function(prop) { return prop.startsWith("__reactEventHandlers"); }
	// 	));
	// var reactEventHandlers = Object.keys(editor.getTextArea()).find(
	// 	function(prop) { return prop.startsWith("__reactEventHandlers"); }
	// 	)
		
	// var spoofEvent = {currentTarget:{value: editor.getTextArea().value}};
	// console.log(spoofEvent);
	// console.dir(editor.getTextArea()[reactEventHandlers]);
	// console.dir(editor.getTextArea()[reactEventHandlers].onChange(spoofEvent));
	
	// editor.getTextArea().dispatchEvent(new Event('change', { 'bubbles': true }));
});
```

- `wp.data.select( 'core/edit-post' ).getEditorMode()` is progress
	- observe changes in [data](https://github.com/WordPress/gutenberg/issues/4674#issuecomment-404587928)
	- `wp.data.subscribe(function(){console.log('data change')});`
	- `wp.data.dispatch( 'core/editor' ).resetBlocks(wp.blocks.parse(editor.getTextArea().value))`
