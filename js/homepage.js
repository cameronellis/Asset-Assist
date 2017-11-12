$(document).ready(function(){
	//show who is logged in
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	
	let user_assets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);	
	
	let numOfAssets = user_assets.length;
	
	// displays number of assets saved to account
	$("#numOfAssetsSection").text("You have " + numOfAssets + " assets.");
	
});