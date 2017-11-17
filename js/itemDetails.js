let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
let indexToDisplay = localStorage.getItem("indexToDisplay");
let usersAssets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
let dataToDisplay = usersAssets[indexToDisplay];

$(document).ready(function(){
	// show who is logged in
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

	$("#itemName").text(dataToDisplay.itemName);
	$("#itemPrice").text("$" + dataToDisplay.itemPrice);
	$("#itemYear").text(dataToDisplay.itemYear);
	$("#itemManufacturer").text(dataToDisplay.itemManufacturer);
	$("#itemMiscNotes").text(dataToDisplay.itemMiscNotes);
	$("#itemImage").attr("src", dataToDisplay.itemPicture);
	$("#itemReceipt").attr("src", dataToDisplay.itemReceipt);
});

function deleteAsset(){
	console.log("Item deleted button");
	// Delete this item from user's assets
	usersAssets.splice(indexToDisplay,1);
	// Update this user's assset list in localStorage
	localStorage.setItem(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
	// navigate back to asset search page
	window.location = "../html/searchForItem.html";
}