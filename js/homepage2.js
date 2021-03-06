$(document).ready(function(){
	//show who is logged in in the Navigation menu
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	let user_assets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
	let numOfAssets = user_assets.length;
	
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);	
	
	$("#usersFirstName").text("Welcome, " + userData.fName + "!");

	// displays number of assets saved to account
	$("#numOfAssetsSection").text("Total assets saved: " + numOfAssets);

	$(".viewAllAssetsButton").click(function(){
		localStorage.setItem("searchQuery","");
		localStorage.setItem("searchType","viewAllAssets");
		localStorage.setItem("showAssetDeletedAlert","false");
		window.location = "../html/searchResults.html";
	});

	$("#searchForAssetButton").click(function(){
		window.location = "searchForItem.html";
	});
});

// When user clicks outside the navigation menu, close it
$(document).click(function clickOutSideMenuToClose(event) {
    if (!$(event.target).is("a")) {
        $(".collapse").collapse("hide");
    }
});
