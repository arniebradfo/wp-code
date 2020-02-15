

# TODOs:
- build file that exports a finalized plugin
- `wp.data.select( 'core/edit-post' ).getEditorMode()` is progress
	- observe changes in [data](https://github.com/WordPress/gutenberg/issues/4674#issuecomment-404587928)
	- `wp.data.subscribe(function(){console.log('data change')});`
	- `wp.data.dispatch( 'core/editor' ).resetBlocks(wp.blocks.parse(editor.getTextArea().value))`

- maybe use a monaco enqueued global of some sort with a separate typescript project. Load:
	- monaco.min.js, possibly reduced to necessary stuff, if possible
	- wp-code.min.js that depends on it. compiled from typescript file.

## trying to get HESH to save the value changes from the textarea
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

# Software design
- single editor class that is connected/called/setup differentluy depending on the context
- setup based on:
	- editor load calls


# TADAs
Move todos here to be added to the changelog.