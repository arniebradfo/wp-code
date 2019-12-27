# TODOs


# Software design
- single editor class that is connected/called/setup differentluy depending on the context
- setup based on:
	- editor load calls


## NOTES
- Options for `wpautop`?
	- __TinyMCE Advanced:__ has an option to _Keep paragraph tags_
		- this option disables `wpautop` content filter and re-implements it in js
		- search for `noAutop` in _mce/wptadv/plugin.js_
		- this causes other problems [apparently](https://wordpress.org/support/topic/plugin-tinymce-advanced-stop-removing-the-ltpgt-and-ltbr-gt-tags-cant-add-html-comments/#topic-1449977-replies)
	- __Gutenberg__ maybe use the gutenberg js version of [`autop`](https://wordpress.org/gutenberg/handbook/designers-developers/developers/packages/packages-autop/) js in conjunction with the disabling the pp `wpautop` content filter
	- Preserved HTML Editor Markup Plus Plugin ?
- Formatting HTML
	- [html tidy](http://www.html-tidy.org/) is [included](http://php.net/manual/en/tidy.examples.basic.php) in some php apparently
	- [js beautify](https://github.com/beautify-web/js-beautify) is what [vs code uses](https://code.visualstudio.com/docs/languages/html#_formatting)
	- replace shortcode `[brackets][/brackets]` with `<@brackets @></@brackets @>`, beautify, and then replace them back.
	- test on [beautifier.io](https://beautifier.io/)
	- beautify for gutenberg-html-comment-json could run selectively in comment blocks as a separate operation

# TADAs
Move todos here to be added to the changelog.
