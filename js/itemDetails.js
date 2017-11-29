let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
let indexToDisplay = localStorage.getItem("indexToDisplay");
let usersAssets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
let dataToDisplay = usersAssets[indexToDisplay];
let showAssetEditedAlert = localStorage.getItem("showAssetEditedAlert");

$(document).ready(function(){
	// show who is logged in
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

	$("#itemName").text(dataToDisplay.itemName);
	$("#itemPrice").text("$" + dataToDisplay.itemPrice);
	$("#itemYear").text(dataToDisplay.itemYear);

	if(dataToDisplay.itemManufacturer !== ""){
		$("#itemManufacturer").text(dataToDisplay.itemManufacturer);
	}
	else{
		$("#itemManufacturer").text("(No manufacturer given)");	
	}
	
	if(dataToDisplay.itemMiscNotes !== ""){
		$("#itemMiscNotes").text(dataToDisplay.itemMiscNotes);
	}
	else{
		$("#itemMiscNotes").text("(No miscellaneous notes given)");	
	}

	if(dataToDisplay.itemPicture !== undefined || dataToDisplay.itemPicture !== ""){
		$("#itemImage").attr("src", dataToDisplay.itemPicture);
	}
	else{
		$("#itemImageErrorMessage").html("<h4>(No picture given)</h4>");	
	}

	if(dataToDisplay.itemReceipt !== undefined){
		$("#itemReceipt").attr("src", dataToDisplay.itemReceipt);
	}
	else{
		$("#itemReceiptErrorMessage").html("<h4>(No Receipt Given)</h4>");
	}

	if(showAssetEditedAlert === "true"){
		$("#assetEditedAlert").attr("class","alert alert-info");
		$("#assetEditedAlert").html("<strong>Success!</strong> Asset details edited");
	}
 
    // When user clicks outside the navigation menu, close it
    $(document).click(function clickOutSideMenuToClose(event) {
        if (!$(event.target).is("a")) {
            $(".collapse").collapse("hide");
        }
    });
});

function deleteAsset(){
	localStorage.setItem("showAssetDeletedAlert","true");
	// Delete this item from user's assets
	usersAssets.splice(indexToDisplay,1);
	// Update this user's assset list in localStorage
	localStorage.setItem(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
	// navigate back to asset search page
	window.location = "../html/searchResults.html";
}
