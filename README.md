# wordpress-code
A Wordpress admin code editor plugin using the Monaco code editor that powers Visual Studio Code.


## Features
- Code Editing In:
	- Traditional editor
	- Edit theme or plugin
	- additional Css in Customize
	- extra html widget
	- Gutenberg...
		- gutenberg block comment + json
		- html block
		- gutenberg, view html mode
		- shortcode backwards compat
- syntax highlighting for 
	- html+shortcodes 
	- html+gutenberg
	- html, css, js, php, other stuff in the the Theme/plugin editor
- settings page for setting your own json file...
- adding themes from the vscode store
- full screen editor
- emmet
- save with command-s
- restore cursor place
- works the same anywhere it is
- only paid, one-time pay?
- user-tracking
- terms of service
- diffing with older revisions
- maybes?
	- linters?
	- disable auto p
	- integration with other plugins
	- detect HESH and warn
- adding vs-code extensions?


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
- maybe use a monaco enqueued global of some sort with a separate typescript project. Load:
	- monaco.min.js, possibly reduced to necessary stuff, if possible
	- wp-code.min.js that depends on it. compiled from typescript file.
	- 
