require.config({ paths: { 'vs': './node_modules/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function () {

	monaco.languages.register({
		id: 'wordpressCode'
	});

	monaco.languages.setMonarchTokensProvider('wordpressCode', {

		// https://microsoft.github.io/monaco-editor/monarch.html
		// https://github.com/Microsoft/monaco-languages/blob/a3d4b50888f8ad49d5fc87d6add002b99809f4c9/src/html/html.ts#L67:L205

		defaultToken: '',
		tokenPostfix: '.html',
		ignoreCase: true,

		// The main tokenizer for our languages
		tokenizer: {
			root: [
				[/<!DOCTYPE/, 'metatag', '@doctype'],

				[/(<!--)(\s+)(wp:[\w\-\/]+)/, ['delimiter', '', {token: 'tag', next:'@gutenbergComment'}]],
				[/(<!--)(\s+)(\/wp:[\w\-\/]+)(\s+)(-->)/, ['delimiter', '', 'tag', '', 'delimiter']],

				[/<!--/, 'comment', '@comment'],

				[/(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/, ['delimiter', 'tag', '', 'delimiter']],
				[/(<)(script)/, ['delimiter', { token: 'tag', next: '@script' }]],
				[/(<)(style)/, ['delimiter', { token: 'tag', next: '@style' }]],
				[/(<)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', { token: 'tag', next: '@otherTag' }]],
				[/(<\/)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', { token: 'tag', next: '@otherTag' }]],

				[/(\[)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/\])/, ['delimiter', 'tag', '', 'delimiter']],
				[/(\[)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', { token: 'tag', next: '@otherShortcode' }]],
				[/(\[\/)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', { token: 'tag', next: '@otherShortcode' }]],

				[/[\[<]/, 'delimiter'],
				[/[^<\[]+/], // text
			],

			doctype: [
				[/[^>]+/, 'metatag.content'],
				[/>/, 'metatag', '@pop'],
			],

			comment: [
				[/-->/, 'comment', '@pop'],
				[/[^-]+/, 'comment.content'],
				[/./, 'comment.content']
			],

			gutenbergComment: [
				[/\s/, { token: '', next: '@jsonEmbedded', nextEmbedded: 'text/javascript' }],
				[/[ \t\r\n]+/], // whitespace
				[/\/?-->/, { token: 'delimiter', next: '@pop' }],
			],

			jsonEmbedded:[
				[/\/?-->/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
				[/[^-]+/, '']
			],

			otherTag: [
				[/\/?>/, 'delimiter', '@pop'],
				[/"([^"]*)"/, 'attribute.value'],
				[/'([^']*)'/, 'attribute.value'],
				[/[\w\-]+/, 'attribute.name'],
				[/=/, 'delimiter'],
				[/[ \t\r\n]+/], // whitespace
			],

			otherShortcode: [
				[/\/?\]/, 'delimiter', '@pop'],
				[/"([^"]*)"/, 'attribute.value'],
				[/'([^']*)'/, 'attribute.value'],
				[/[\w\-]+/, 'attribute.name'],
				[/=/, 'delimiter'],
				[/[ \t\r\n]+/], // whitespace
			],


			// -- BEGIN <script> tags handling

			// After <script
			script: [
				[/type/, 'attribute.name', '@scriptAfterType'],
				[/"([^"]*)"/, 'attribute.value'],
				[/'([^']*)'/, 'attribute.value'],
				[/[\w\-]+/, 'attribute.name'],
				[/=/, 'delimiter'],
				[/>/, { token: 'delimiter', next: '@scriptEmbedded', nextEmbedded: 'text/javascript' }],
				[/[ \t\r\n]+/], // whitespace
				[/(<\/)(script\s*)(>)/, ['delimiter', 'tag', { token: 'delimiter', next: '@pop' }]]
			],

			// After <script ... type
			scriptAfterType: [
				[/=/, 'delimiter', '@scriptAfterTypeEquals'],
				[/>/, { token: 'delimiter', next: '@scriptEmbedded', nextEmbedded: 'text/javascript' }], // cover invalid e.g. <script type>
				[/[ \t\r\n]+/], // whitespace
				[/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
			],

			// After <script ... type =
			scriptAfterTypeEquals: [
				[/"([^"]*)"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
				[/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
				[/>/, { token: 'delimiter', next: '@scriptEmbedded', nextEmbedded: 'text/javascript' }], // cover invalid e.g. <script type=>
				[/[ \t\r\n]+/], // whitespace
				[/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
			],

			// After <script ... type = $S2
			scriptWithCustomType: [
				[/>/, { token: 'delimiter', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],
				[/"([^"]*)"/, 'attribute.value'],
				[/'([^']*)'/, 'attribute.value'],
				[/[\w\-]+/, 'attribute.name'],
				[/=/, 'delimiter'],
				[/[ \t\r\n]+/], // whitespace
				[/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
			],

			scriptEmbedded: [
				[/<\/script/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
				[/[^<]+/, '']
			],

			// -- END <script> tags handling


			// -- BEGIN <style> tags handling

			// After <style
			style: [
				[/type/, 'attribute.name', '@styleAfterType'],
				[/"([^"]*)"/, 'attribute.value'],
				[/'([^']*)'/, 'attribute.value'],
				[/[\w\-]+/, 'attribute.name'],
				[/=/, 'delimiter'],
				[/>/, { token: 'delimiter', next: '@styleEmbedded', nextEmbedded: 'text/css' }],
				[/[ \t\r\n]+/], // whitespace
				[/(<\/)(style\s*)(>)/, ['delimiter', 'tag', { token: 'delimiter', next: '@pop' }]]
			],

			// After <style ... type
			styleAfterType: [
				[/=/, 'delimiter', '@styleAfterTypeEquals'],
				[/>/, { token: 'delimiter', next: '@styleEmbedded', nextEmbedded: 'text/css' }], // cover invalid e.g. <style type>
				[/[ \t\r\n]+/], // whitespace
				[/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
			],

			// After <style ... type =
			styleAfterTypeEquals: [
				[/"([^"]*)"/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
				[/'([^']*)'/, { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }],
				[/>/, { token: 'delimiter', next: '@styleEmbedded', nextEmbedded: 'text/css' }], // cover invalid e.g. <style type=>
				[/[ \t\r\n]+/], // whitespace
				[/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
			],

			// After <style ... type = $S2
			styleWithCustomType: [
				[/>/, { token: 'delimiter', next: '@styleEmbedded.$S2', nextEmbedded: '$S2' }],
				[/"([^"]*)"/, 'attribute.value'],
				[/'([^']*)'/, 'attribute.value'],
				[/[\w\-]+/, 'attribute.name'],
				[/=/, 'delimiter'],
				[/[ \t\r\n]+/], // whitespace
				[/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
			],

			styleEmbedded: [
				[/<\/style/, { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }],
				[/[^<]+/, '']
			],

			// -- END <style> tags handling
		},
	});

	var editor = monaco.editor.create(document.getElementById('container'), {
		// theme: 'myCoolTheme',
		value: getCode(),
		language: 'wordpressCode',
		theme: "vs-dark"
	});
});

function getCode() { 
return `<!DOCTYPE html>
	<head>
		<title>Monarch Workbench</title>

		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<!-- a comment -->
		<!-- wp:thing/ {"json":0} -->
		<style>
			body { font-family: Consolas; } /* nice */
		</style>
	</head>

<body>
	[thing]
	[shortcode att="thing" singleAtt]
		<p>html content</p>
	[/shortcode]
	[shorter-code /]

	<!-- wp:namespace/tag-name {"json":"attributes"} -->
		content
	<!-- /wp:namespace/tag-name -->
	<!-- wp:singleTag /-->

	<div class="test">
		<script>
			function() {
				// javascript
				alert("string: "+2);
				window.console.log('things to read');
			};
		<\/script>
		<script type="text/x-dafny">
			class Foo {
				x : int;
				invariant x > 0;
			};
		<\/script>
	</div>
</body>

</html>`;
}
