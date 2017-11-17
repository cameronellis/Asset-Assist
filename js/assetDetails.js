let currentlyLoggedInAs = localStorage.getAsset("currentlyLoggedInAs");
let indexToDisplay = localStorage.getAsset("indexToDisplay");
let usersAssets = JSON.parse(localStorage.getAsset(currentlyLoggedInAs + "_assets"));
let dataToDisplay = usersAssets[indexToDisplay];

$(document).ready(function(){
	// show who is logged in
	let currentlyLoggedInAs = localStorage.getAsset("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getAsset(currentlyLoggedInAs + "_userdata"));
	
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

	$("#assetName").text(dataToDisplay.assetName);
	$("#assetPrice").text("$" + dataToDisplay.assetPrice);
	$("#assetYear").text(dataToDisplay.assetYear);
	$("#assetManufacturer").text(dataToDisplay.assetManufacturer);
	$("#assetMiscNotes").text(dataToDisplay.assetMiscNotes);
	$("#assetImage").attr("src", dataToDisplay.assetPicture);
	$("#assetReceipt").attr("src", dataToDisplay.assetReceipt);
});

function deleteAsset(){
	console.log("Asset deleted button");
	// Delete this asset from user's assets
	usersAssets.splice(indexToDisplay,1);
	// Update this user's assset list in localStorage
	localStorage.setAsset(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
	// navigate back to asset search page
	window.location = "../html/searchForAsset.html";
}
