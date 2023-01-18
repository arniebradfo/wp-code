

# TODOs:
- Horizontal Scrolling
- options editor
- need a full-screen mode
- ajax save
- make individual use cases that extend `SimpleEditor` - make case split
	- comments page
	- discussion comment editor
	- Theme Editor
	- Plugins Editor
	- widget custom html 
	- widget text
	- Customize > additional css
	- textareas everywhere?
	- Gutenberg
	- find more...

# TODO later
- build file that exports a finalized plugin
- maybe use a monaco enqueued global of some sort with a separate typescript project. Load:
	- monaco.min.js, possibly reduced to necessary stuff, if possible
	- wp-code.min.js that depends on it. compiled from typescript file.
	- how would this be possible using webpack?
- Deploy in tandem with HESH. Have a setting to try the v3 beta.
  - automated deployment of each...
- hooks to attach "plugins" for auto formatting

# Software design
- single editor class that is connected/called/setup differently depending on the context
- setup based on:
	- editor load calls


# TADAs
Move TODOs here to be added to the changelog.
- remove quicktags
- make the add-media buttons work
- editor resizing works
- scrolling switches between editor and page
- PostEditor extends SimpleEditor
- css overrides to fix: `.wp-core-ui` and `.monaco-editor` both style with the `.button` class

