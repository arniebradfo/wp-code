import "./quicktags.css";

declare const QTags: any;
declare let quicktags: (
	settings: {
		id: string, // the HTML ID of the textarea, required
		buttons: string   // Comma separated list of the names of the default buttons to show. Optional.
		// Current list of default button names: 'strong,em,link,block,del,ins,img,ul,ol,li,code,more,close';
	}) => any;

function removeQTags() {

	quicktags = hijackQuickTags // TODO: is this a race condition?

	// for (const editorName in QTags.instances) {
	// 	if (QTags.instances.hasOwnProperty(editorName)) {
	// 		const editor = QTags.instances[editorName];
	// 		console.log('removing quicktags instance: ' + editor.id);
	// 		QTags.getInstance(editor.id).remove();
	// 	}
	// }

}

function hijackQuickTags(settings) {
	console.log('hijackQuickTags with settings:\n', settings);
}

export default removeQTags;

// THIS DOESN'T WORK
// $( document ).on( 'wp-before-quicktags-init', e => console.log(e) );

// INTERCEPT INSERT
// console.log(QTags.insertContent);
// var callback2 = QTags.TagButton.prototype.callback;
// QTags.TagButton.prototype.callback = function (element, canvas, ed) {

	// intercepted
	// create pairity between editors
	// copy 
	// console.dir(this);
	// console.dir(ed);
	// console.dir(canvas);
	// console.dir(element);
	// this.callback2 = callback2;

	// this.callback2(element, canvas, ed);
// }

// listen for clicks on toolbar buttons
// create pairity