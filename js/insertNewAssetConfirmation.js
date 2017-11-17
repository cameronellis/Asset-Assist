// code to implement accordion behavior for dropdown menu
// Link to code: https://www.w3schools.com/howto/howto_js_accordion.asp

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}

// localStorage - retrieve information from it and populate fields
$(document).ready(function(){
	let currentUser = localStorage.getItem("currentlyLoggedInAs");
	// retrieve list of assets for the user
	let usersAssets = JSON.parse(localStorage.getItem(currentUser + "_assets"));
	// the last element in the list is the latest element to have been inserted
	let assetToDisplay = usersAssets[usersAssets.length - 1];

	// show who is logged in
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

	// Display content in its respective place in the page
	$("#assetName").text(assetToDisplay.assetName);
	$("#assetPrice").text("$ " + assetToDisplay.assetPrice);
	$("#assetYear").text(assetToDisplay.assetYear);
	$("#assetManufacturer").text(assetToDisplay.assetManufacturer);
	// asset image
	$("#assetPicture").attr("src", assetToDisplay.assetPicture);
	// asset receipt
	$("#assetReceipt").attr("src", assetToDisplay.assetReceipt);

	$("#assetMiscDetails").text(assetToDisplay.assetMiscNotes);

});
