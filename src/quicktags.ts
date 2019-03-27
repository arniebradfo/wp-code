declare const QTags: any;

// THIS DOESN'T WORK
// $( document ).on( 'wp-before-quicktags-init', e => console.log(e) );
// INTERCEPT INSERT
// console.log(QTags.insertContent);
var callback2 = QTags.TagButton.prototype.callback;
QTags.TagButton.prototype.callback = function (element, canvas, ed) {

	// intercepted
	// create pairity between editors
	// copy 
	console.dir(this);
	console.dir(ed);
	console.dir(canvas);
	console.dir(element);
	this.callback2 = callback2;

	this.callback2(element, canvas, ed);
}

// listen for clicks on toolbar buttons
// create pairity