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
	$("#itemName").text(assetToDisplay.itemName);
	$("#itemPrice").text("$ " + assetToDisplay.itemPrice);
	$("#itemYear").text(assetToDisplay.itemYear);
	$("#itemManufacturer").text(assetToDisplay.itemManufacturer);
	// item image
	$("#itemPicture").attr("src", assetToDisplay.itemPicture);
	// item receipt
	$("#itemReceipt").attr("src", assetToDisplay.itemReceipt);

	$("#itemMiscDetails").text(assetToDisplay.itemMiscNotes);

});
