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

	if(assetToDisplay.itemManufacturer !== ""){
		$("#itemManufacturer").text(assetToDisplay.itemManufacturer);		
	}
	else{
		$("#itemManufacturer").text("(No Manufacturer Given)");
	}

	// item image
	if(assetToDisplay.itemPicture !== undefined){
		$("#itemPicture").attr("src", assetToDisplay.itemPicture);
	}
	else{
		$("#itemPictureErrorMessage").html("<h4>(No picture given)</h4>");
	}

	// item receipt
	if(assetToDisplay.itemReceipt !== undefined){
		$("#itemReceipt").attr("src", assetToDisplay.itemReceipt);
	}
	else{
		$("#itemReceiptErrorMessage").html("<h4>(No receipt given)</h4>");
	}

	if(assetToDisplay.itemMiscNotes !== ""){
		$("#itemMiscDetails").text(assetToDisplay.itemMiscNotes);
	}
	else{
		$("#itemMiscDetails").html("(No Miscellaneous Notes Given)");	
	}

	let assetDetailsDisplayed = false;

	$("#assetDetailsButton").click(function(){
		if(assetDetailsDisplayed){
			$("#assetDetailsButton").html("<span class='icon glyphicon glyphicon-chevron-down'></span>Click here to show Asset Details");
			assetDetailsDisplayed = false;			
		}
		else{
			$("#assetDetailsButton").html("<span class='icon glyphicon glyphicon-chevron-up'></span>Click here to hide Asset Details");
			assetDetailsDisplayed = true;
		}
	});

});
