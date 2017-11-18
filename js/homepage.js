$(document).ready(function(){
	//show who is logged in in the Navigation menu
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	let user_assets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
	let numOfAssets = user_assets.length;
	let assetsSum = 0;
	
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);	
	
	$("#usersFirstName").text("Welcome, " + userData.fName + "!");

	// displays number of assets saved to account
	$("#numOfAssetsSection").text("Total assets saved: " + numOfAssets);
	
	// Calculate and display total value of all of the assets owned
	for(let i = 0; i < numOfAssets; i++) {
		assetsSum += parseInt(user_assets[i].itemPrice);
	}	
	$("#totalValue").text("Total value of all assets: $" + assetsSum);

	$("#viewAllAssetsButton").click(function(){
		localStorage.setItem("searchQuery","");
		window.location = "../html/searchResults.html"
	});
});