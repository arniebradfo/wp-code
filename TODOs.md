

# TODOs:
- options editor
- need a full-screen mode
- PostEditor extends SimpleEditor
- `.wp-core-ui` and `.monaco-editor` both style with the `.button` class
- scrolling is annoying - monaco seems to eat scroll events

- `wp.data.select( 'core/edit-post' ).getEditorMode()` is progress
	- observe changes in [data](https://github.com/WordPress/gutenberg/issues/4674#issuecomment-404587928)
	- `wp.data.subscribe(function(){console.log('data change')});`
	- `wp.data.dispatch( 'core/editor' ).resetBlocks(wp.blocks.parse(editor.getTextArea().value))`
- build file that exports a finalized plugin

- maybe use a monaco enqueued global of some sort with a separate typescript project. Load:
	- monaco.min.js, possibly reduced to necessary stuff, if possible
	- wp-code.min.js that depends on it. compiled from typescript file.
	- how would this be possible using webpack?

# Software design
- single editor class that is connected/called/setup differently depending on the context
- setup based on:
	- editor load calls


# TADAs
Move todos here to be added to the changelog.
- remove quicktags
- make the add-media buttons work
