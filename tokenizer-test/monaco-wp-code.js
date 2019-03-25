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
		value: getSampleCode(),
		language: 'wordpressCode',
		theme: "vs-dark",
		wordWrap: "on",
		wrappingIndent: "same"
	});
});

function getSampleCode() { 
return `
<!DOCTYPE html>
<html>

<head>
	<title>Monarch Wordpress Gutenberg Tokenizer Example</title>
</head>

<body>
	<h1>Monarch Wordpress Gutenberg Tokenizer Example</h1>

	<h2>It works with shortcodes!</h2>
	[shortcode att="thing" singleAtt]
		<p>
			Html content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
		</p>
	[/shortcode]
	[shorter-code /]

	<h2>It works with gutenberg comments!</h2>
	<!-- wp:namespace/tag-name { 
			"json":   "attributes", 
			"number": 1000, 
			"bool":   true, 
			"array":  [1,2,"3"], 
			"obj":    {} 
		} -->
		<!-- A normal html comment -->
		<p>
			Html content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
		</p>
	<!-- /wp:namespace/tag-name -->
	<!-- wp:singleTag /-->

	<h2>It works with css style blocks!</h2>
	<style> /* css comment */
		body { 
			font-family: Consolas; 
			color: red;
			font-size: 25px;
		} 
	</style>

	<h2>It works with javascript script blocks!</h2>
	<div class="test">
		<script type="text/javascript">
			function funky() {
				// javascript comment
				var number = 1000;
				var string = "string: ";
				console.log(string + number);
			};
		</script>
	</div>

</body>

</html>
`;
}
