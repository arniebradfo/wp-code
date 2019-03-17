# wordpress-code
A Wordpress admin code editor plugin using the Monaco code editor that powers Visual Studio Code.

## Survey
https://docs.google.com/forms/d/1pSh0T5mVbDIQuagexBKl4mlwFUUd3F4J5A9hhv7i5AM/edit

## Features
- Code Editing In:
	- Classic Editor
	- Edit Theme
	- Edit Plugin
	- Additional Css in Customize
	- HTML widget
	- Gutenberg Blocks
		- Code Editor - gutenberg block comment + json
		- Gutenberg, View HTML mode of each block
		- html block
		- shortcode backwards compat
- Plugin Support:
- syntax highlighting for 
	- html+shortcodes 
	- html+gutenberg
	- html, css, js, php, other stuff in the the Theme/plugin editor
- settings page for setting your own json file... 
	- setting open anywhere but have a page as well.
- adding themes from the vscode store 
- full screen editor 
- emmet / autocomplete
- SAVING
	- save with command-s
	- restore cursor place
	- retain undo tree?
	- ajax save
- REVISION - diffing with older revisions
- Formatting button.
	- format code 
- works the same anywhere it is
- intellisense for shortcodes
- translate into other languages
- Better layout so scrolling doesn't suck
- linters?
### CONTENT SUPPORT
- wp auto p management
- Scripts n styles
	- use less and define global variables and functions
	- js too
	- on global Customize page
	- tabbed interface?
- Global and Post `{%vars%}`
- Content Blocks - with visual button
	- Snippets
	- Define shortcodes - shortcoder plugin
	- Define blocks
### BUSINESS
- only paid, one-time pay?
- user-tracking
- terms of service
- maybes?
	- global find and replace - maybe only across certain content
	- integration with other plugins
	- detect HESH and warn
- adding vs-code extensions?
- copy pricing from:
	https://www.csshero.org/
	https://www.advancedcustomfields.com/


## Useful Links
- process user settings
	- [working with user metadata](https://developer.wordpress.org/plugins/users/working-with-user-metadata/)
	- [update_user_meta()](https://codex.wordpress.org/Function_Reference/update_user_meta)
- AJAX forms
	- [submitting a form in wordpress using ajax](https://teamtreehouse.com/community/submitting-a-form-in-wordpress-using-ajax)
	- [how to handle form submission](http://wordpress.stackexchange.com/questions/60758/how-to-handle-form-submission)
- [wp usage stats](https://wordpress.org/about/stats/)
- [Assets Info](https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/)
- [WP SVN](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/)


## Gutenberg Links
- [Gutenberg Hub, Other links](http://gutenberghub.com/gutenberg-developer-guide/)
- [Extend Blocks](https://wordpress.org/gutenberg/handbook/extensibility/extending-blocks/)
- [Gutenberg API](https://wordpress.org/gutenberg/handbook/)
- [Gutenberg HTML comment syntax](https://wordpress.org/gutenberg/handbook/language/#the-anatomy-of-a-serialized-block)
- [Events or hooks](https://wordpress.org/gutenberg/handbook/extensibility/extending-editor/)
- [`wp.data.getBlockMode()`](https://wordpress.org/gutenberg/handbook/designers-developers/developers/data/data-core-editor/#getblockmode)


## Logo info
https://code.visualstudio.com/blogs/2017/10/24/theicon
https://blogs.msdn.microsoft.com/visualstudio/2017/03/08/iterations-on-infinity/


# TODOs:
- build file that exports a finalized plugin
- `wp.data.select( 'core/edit-post' ).getEditorMode()` is progress
	- observe changes in [data](https://github.com/WordPress/gutenberg/issues/4674#issuecomment-404587928)
	- `wp.data.subscribe(function(){console.log('data change')});`
	- `wp.data.dispatch( 'core/editor' ).resetBlocks(wp.blocks.parse(editor.getTextArea().value))`

- maybe use a monaco enqueued global of some sort with a separate typescript project. Load:
	- monaco.min.js, possibly reduced to necessary stuff, if possible
	- wp-code.min.js that depends on it. compiled from typescript file.
	- 

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
