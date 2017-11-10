$(document).ready(function(){
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let indexToDisplay = localStorage.getItem("indexToDisplay");
	let usersAssets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
	let dataToDisplay = usersAssets[indexToDisplay];

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
}