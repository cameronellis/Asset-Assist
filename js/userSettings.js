// Navigate away warning on incomplete form when the user clicks the back button
// in their browser or when the user tries to close the window
window.onbeforeunload = function(){
	return "leaving this page will reset the fields";
}