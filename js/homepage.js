$(document).ready(function(){
	//show who is logged in
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	
	let user_assets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);	
	
	let numOfAssets = user_assets.length;

	let assetsSum = 0;
	
	// displays number of assets saved to account
	$("#numOfAssetsSection").text("Total assets saved: " + numOfAssets);
	
	for(let i = 0; i < numOfAssets; i++) {
		assetsSum += parseInt(user_assets[i].itemPrice);
	}
	
	$("#totalValue").text("Total value of all assets: $" + assetsSum);
});