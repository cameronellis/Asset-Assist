// show who is logged in
let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
  
$(document).ready(function(){
  let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));

  $("#viewAllAssetsButton").click(function(){
    localStorage.setItem("showAssetDeletedAlert","false");
    localStorage.setItem("searchQuery","");
    localStorage.setItem("searchType","viewAllAssets");

    window.location = "../html/searchResults.html";
  });

  // display who is currently logged in
  $("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

  // When the search button is clicked
  $("#searchButton").click(executeBasicSearch);

  $("#advancedSearchButton").click(function(){
    localStorage.setItem("showAssetDeletedAlert","false");
    window.location = "../html/advancedSearch.html";
  });
});

function executeBasicSearch(){
  let searchName = $("#searchName").val();

  // Check if search box is filled
  if(searchName !== ""){
    localStorage.setItem("showAssetDeletedAlert","false");
    // set search query term here
    localStorage.setItem("searchQuery", searchName);
    // set search type to basic
    localStorage.setItem("searchType", "basic");
    // go to search results page
    window.location = "searchResults.html";
  }
  // else search box is not filled
  else {
    // Give input box a red border
    $("#searchNameSection").addClass("has-error");
    // Error Message
    $("#searchNameError").text("Please provide an item name to search");
  }
}

// Reference: https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
$(document).keypress(function(e) {
    if(e.which == 13) {
      executeBasicSearch();
    }
});

// When user clicks outside the navigation menu, close it
$(document).click(function clickOutSideMenuToClose(event) {
    if (!$(event.target).is("a")) {
        $(".collapse").collapse("hide");
    }
});
